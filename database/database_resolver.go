package database

import (
	"github.com/Akkadius/spire/http/request"
	"github.com/Akkadius/spire/internal/encryption"
	"github.com/Akkadius/spire/models"
	"github.com/Akkadius/spire/util"
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	gocache "github.com/patrickmn/go-cache"
	"github.com/sirupsen/logrus"
	"os"
	"time"
)

// database resolver is used to dynamically resolve to external database instances that users
// have defined in the connections database
// when the users request comes in; a middleware function will lookup their database info
// from the memory pool of connections and re-use it if found, re-establish if not found or
// return an error if credentials no longer work
type DatabaseResolver struct {
	connections           *Connections                 // local connections
	remoteDatabases       map[string]map[uint]*gorm.DB // remote databases only used when Spire resolves connections defined by users
	logger                *logrus.Logger
	crypt                 *encryption.Encrypter
	cache                 *gocache.Cache
	contentConnectionName string
}

func NewDatabaseResolver(
	connections *Connections,
	logger *logrus.Logger,
	crypt *encryption.Encrypter,
	cache *gocache.Cache,
) *DatabaseResolver {
	return &DatabaseResolver{
		connections:           connections,
		remoteDatabases:       map[string]map[uint]*gorm.DB{},
		logger:                logger,
		crypt:                 crypt,
		cache:                 cache,
		contentConnectionName: os.Getenv("MYSQL_EQEMU_CONTENT_DB_CONNECTION_NAME"),
	}
}

func (d *DatabaseResolver) Get(model models.Modelable, c echo.Context) *gorm.DB {
	user := request.GetUser(c)
	if user.ID > 0 {
		return d.ResolveUserEqemuConnection(model, user)
	}

	return d.connections.EqemuDb()
}

func (d *DatabaseResolver) GetSpireDb() *gorm.DB {
	return d.connections.SpireDb()
}

func (d *DatabaseResolver) GetEqemuDb() *gorm.DB {
	return d.connections.EqemuDb()
}

func (d *DatabaseResolver) GetEncKey(userId uint) string {
	return fmt.Sprintf("%v-%v", util.GetEnv("APP_KEY", ""), userId)
}

func (d *DatabaseResolver) ResolveUserEqemuConnection(model models.Modelable, user models.User) *gorm.DB {

	// use default otherwise key off of another connection type
	connectionType := "default"
	if model.Connection() == d.contentConnectionName {
		connectionType = model.Connection()
	}

	// init nested map if not set
	_, ok := d.remoteDatabases[connectionType]
	if !ok {
		d.remoteDatabases[connectionType] = map[uint]*gorm.DB{}
	}

	// If we don't have a user
	if user.ID == 0 {
		return d.connections.EqemuDb()
	}

	// fetch connection id from memory first if exists
	connectionId := uint(0)
	connectionIdKey := fmt.Sprintf("active-connection-%v-%v", user.ID, connectionType)
	cachedConn, found := d.cache.Get(connectionIdKey)
	if found {
		connectionId = cachedConn.(uint)

		// If existing connection exists, return it
		if _, ok := d.remoteDatabases[connectionType][connectionId]; ok {
			fmt.Println("Returning cached lookup")
			err := d.remoteDatabases[connectionType][connectionId].DB().Ping()
			if err != nil {
				d.logger.Printf("Debug: MySQL ping err [%v]", err)
			}
			return d.remoteDatabases[connectionType][connectionId]
		}
	}

	// get servers from database
	var conn models.UserServerDatabaseConnection
	relationships := models.UserServerDatabaseConnection{}.Relationships()
	query := d.GetSpireDb().Model(&models.UserServerDatabaseConnection{})
	for _, relationship := range relationships {
		query = query.Preload(relationship)
	}

	query.Where("user_id = ? and active = 1", user.ID).First(&conn)

	// if we don't have an active connection
	// this will then fallback to the locally defined eqemu instance
	if conn.ID == 0 {

		// set default local to connection pool for default fallback
		d.remoteDatabases[connectionType][conn.ID] = d.connections.EqemuDb()

		// add connection id to memory
		d.cache.Set(connectionIdKey, conn.ServerDatabaseConnection.ID, 10*time.Minute)

		return d.connections.EqemuDb()
	}

	// check if we found a connection from the database
	if conn.ID > 0 {

		// add connection id to memory
		d.cache.Set(connectionIdKey, conn.ServerDatabaseConnection.ID, 10*time.Minute)

		// If existing connection exists, return it
		if _, ok := d.remoteDatabases[connectionType][conn.ServerDatabaseConnection.ID]; ok {
			err := d.remoteDatabases[connectionType][conn.ServerDatabaseConnection.ID].DB().Ping()
			if err != nil {
				d.logger.Printf("Debug: MySQL ping err [%v]", err)
			}

			return d.remoteDatabases[connectionType][conn.ServerDatabaseConnection.ID]
		}
	}

	// eqemu server default
	dbUsername := conn.ServerDatabaseConnection.DbUsername
	dbPassword := d.crypt.Decrypt(conn.ServerDatabaseConnection.DbPassword, d.GetEncKey(user.ID))
	dbHost := conn.ServerDatabaseConnection.DbHost
	dbPort := conn.ServerDatabaseConnection.DbPort
	dbName := conn.ServerDatabaseConnection.DbName

	// content connection
	if model.Connection() == d.contentConnectionName && conn.ServerDatabaseConnection.ContentDbUsername != "" {
		dbUsername = conn.ServerDatabaseConnection.ContentDbUsername
		dbPassword = d.crypt.Decrypt(conn.ServerDatabaseConnection.ContentDbPassword, d.GetEncKey(user.ID))
		dbHost = conn.ServerDatabaseConnection.ContentDbHost
		dbPort = conn.ServerDatabaseConnection.ContentDbPort
		dbName = conn.ServerDatabaseConnection.ContentDbName
	}

	// init nested map if not set
	_, ok = d.remoteDatabases[connectionType]
	if !ok {
		d.remoteDatabases[connectionType] = map[uint]*gorm.DB{}
	}

	// create new connection since we don't have one
	dsn := fmt.Sprintf(
		"%v:%v@tcp(%v:%v)/%v?charset=utf8&parseTime=True&loc=Local&timeout=1s",
		dbUsername,
		dbPassword,
		dbHost,
		dbPort,
		dbName,
	)

	// open connection
	mysql, err := gorm.Open("mysql", dsn)
	if err != nil {
		d.logger.Printf("Debug: MySQL err [%v]", err)
	}

	// set params
	mysql.DB().SetConnMaxLifetime(time.Minute * 3)
	mysql.DB().SetMaxIdleConns(util.GetIntEnv("MYSQL_MAX_IDLE_CONNECTIONS", "10"))
	mysql.DB().SetMaxOpenConns(util.GetIntEnv("MYSQL_MAX_OPEN_CONNECTIONS", "150"))
	mysql.LogMode(util.GetBoolEnv("MYSQL_QUERY_LOGGING", "false"))

	// cache instance pointer to memory
	d.remoteDatabases[connectionType][conn.ServerDatabaseConnection.ID] = mysql

	return mysql
}
