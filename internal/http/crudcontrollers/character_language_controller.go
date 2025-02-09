package crudcontrollers

import (
	"fmt"
	"github.com/Akkadius/spire/internal/auditlog"
	"github.com/Akkadius/spire/internal/database"
	"github.com/Akkadius/spire/internal/http/routes"
	"github.com/Akkadius/spire/internal/models"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net/http"
	"strconv"
	"strings"
)

type CharacterLanguageController struct {
	db       *database.DatabaseResolver
	logger   *logrus.Logger
	auditLog *auditlog.UserEvent
}

func NewCharacterLanguageController(
	db *database.DatabaseResolver,
	logger *logrus.Logger,
	auditLog *auditlog.UserEvent,
) *CharacterLanguageController {
	return &CharacterLanguageController{
		db:       db,
		logger:   logger,
		auditLog: auditLog,
	}
}

func (e *CharacterLanguageController) Routes() []*routes.Route {
	return []*routes.Route{
		routes.RegisterRoute(http.MethodGet, "character_language/:id", e.getCharacterLanguage, nil),
		routes.RegisterRoute(http.MethodGet, "character_languages", e.listCharacterLanguages, nil),
		routes.RegisterRoute(http.MethodGet, "character_languages/count", e.getCharacterLanguagesCount, nil),
		routes.RegisterRoute(http.MethodPut, "character_language", e.createCharacterLanguage, nil),
		routes.RegisterRoute(http.MethodDelete, "character_language/:id", e.deleteCharacterLanguage, nil),
		routes.RegisterRoute(http.MethodPatch, "character_language/:id", e.updateCharacterLanguage, nil),
		routes.RegisterRoute(http.MethodPost, "character_languages/bulk", e.getCharacterLanguagesBulk, nil),
	}
}

// listCharacterLanguages godoc
// @Id listCharacterLanguages
// @Summary Lists CharacterLanguages
// @Accept json
// @Produce json
// @Tags CharacterLanguage
// @Param includes query string false "Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names"
// @Param where query string false "Filter on specific fields. Multiple conditions [.] separated Example: col_like_value.col2__val2"
// @Param whereOr query string false "Filter on specific fields (Chained ors). Multiple conditions [.] separated Example: col_like_value.col2__val2"
// @Param groupBy query string false "Group by field. Multiple conditions [.] separated Example: field1.field2"
// @Param limit query string false "Rows to limit in response (Default: 10,000)"
// @Param page query int 0 "Pagination page"
// @Param orderBy query string false "Order by [field]"
// @Param orderDirection query string false "Order by field direction"
// @Param select query string false "Column names [.] separated to fetch specific fields in response"
// @Success 200 {array} models.CharacterLanguage
// @Failure 500 {string} string "Bad query request"
// @Router /character_languages [get]
func (e *CharacterLanguageController) listCharacterLanguages(c echo.Context) error {
	var results []models.CharacterLanguage
	err := e.db.QueryContext(models.CharacterLanguage{}, c).Find(&results).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": err})
	}

	return c.JSON(http.StatusOK, results)
}

// getCharacterLanguage godoc
// @Id getCharacterLanguage
// @Summary Gets CharacterLanguage
// @Accept json
// @Produce json
// @Tags CharacterLanguage
// @Param id path int true "Id"
// @Param includes query string false "Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names"
// @Param select query string false "Column names [.] separated to fetch specific fields in response"
// @Success 200 {array} models.CharacterLanguage
// @Failure 404 {string} string "Entity not found"
// @Failure 500 {string} string "Cannot find param"
// @Failure 500 {string} string "Bad query request"
// @Router /character_language/{id} [get]
func (e *CharacterLanguageController) getCharacterLanguage(c echo.Context) error {
	var params []interface{}
	var keys []string

	// primary key param
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Cannot find param [Id]"})
	}
	params = append(params, id)
	keys = append(keys, "id = ?")

	// key param [lang_id] position [2] type [smallint]
	if len(c.QueryParam("lang_id")) > 0 {
		langIdParam, err := strconv.Atoi(c.QueryParam("lang_id"))
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": fmt.Sprintf("Error parsing query param [lang_id] err [%s]", err.Error())})
		}

		params = append(params, langIdParam)
		keys = append(keys, "lang_id = ?")
	}

	// query builder
	var result models.CharacterLanguage
	query := e.db.QueryContext(models.CharacterLanguage{}, c)
	for i, _ := range keys {
		query = query.Where(keys[i], params[i])
	}

	// grab first entry
	err = query.First(&result).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	// couldn't find entity
	if result.ID == 0 {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Cannot find entity"})
	}

	return c.JSON(http.StatusOK, result)
}

// updateCharacterLanguage godoc
// @Id updateCharacterLanguage
// @Summary Updates CharacterLanguage
// @Accept json
// @Produce json
// @Tags CharacterLanguage
// @Param id path int true "Id"
// @Param character_language body models.CharacterLanguage true "CharacterLanguage"
// @Success 200 {array} models.CharacterLanguage
// @Failure 404 {string} string "Cannot find entity"
// @Failure 500 {string} string "Error binding to entity"
// @Failure 500 {string} string "Error updating entity"
// @Router /character_language/{id} [patch]
func (e *CharacterLanguageController) updateCharacterLanguage(c echo.Context) error {
	request := new(models.CharacterLanguage)
	if err := c.Bind(request); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			echo.Map{"error": fmt.Sprintf("Error binding to entity [%v]", err.Error())},
		)
	}

	var params []interface{}
	var keys []string

	// primary key param
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Cannot find param [Id]"})
	}
	params = append(params, id)
	keys = append(keys, "id = ?")

	// key param [lang_id] position [2] type [smallint]
	if len(c.QueryParam("lang_id")) > 0 {
		langIdParam, err := strconv.Atoi(c.QueryParam("lang_id"))
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": fmt.Sprintf("Error parsing query param [lang_id] err [%s]", err.Error())})
		}

		params = append(params, langIdParam)
		keys = append(keys, "lang_id = ?")
	}

	// query builder
	var result models.CharacterLanguage
	query := e.db.QueryContext(models.CharacterLanguage{}, c)
	for i, _ := range keys {
		query = query.Where(keys[i], params[i])
	}

	// grab first entry
	err = query.First(&result).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": fmt.Sprintf("Cannot find entity [%s]", err.Error())})
	}

	// save top-level using only changes
	diff := database.ResultDifference(result, request)
	err = query.Session(&gorm.Session{FullSaveAssociations: false}).Updates(diff).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": fmt.Sprintf("Error updating entity [%v]", err.Error())})
	}

	// log update event
	if e.db.GetSpireDb() != nil && len(diff) > 0 {
		// build ids
		var ids []string
		for i, _ := range keys {
			param := fmt.Sprintf("%v", params[i])
			ids = append(ids, fmt.Sprintf("%v", strings.ReplaceAll(keys[i], "?", param)))
		}
		// build fields updated
		var fieldsUpdated []string
		for k, v := range diff {
			fieldsUpdated = append(fieldsUpdated, fmt.Sprintf("%v = %v", k, v))
		}
		// record event
		event := fmt.Sprintf("Updated [CharacterLanguage] [%v] fields [%v]", strings.Join(ids, ", "), strings.Join(fieldsUpdated, ", "))
		e.auditLog.LogUserEvent(c, "UPDATE", event)
	}

	return c.JSON(http.StatusOK, request)
}

// createCharacterLanguage godoc
// @Id createCharacterLanguage
// @Summary Creates CharacterLanguage
// @Accept json
// @Produce json
// @Param character_language body models.CharacterLanguage true "CharacterLanguage"
// @Tags CharacterLanguage
// @Success 200 {array} models.CharacterLanguage
// @Failure 500 {string} string "Error binding to entity"
// @Failure 500 {string} string "Error inserting entity"
// @Router /character_language [put]
func (e *CharacterLanguageController) createCharacterLanguage(c echo.Context) error {
	characterLanguage := new(models.CharacterLanguage)
	if err := c.Bind(characterLanguage); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			echo.Map{"error": fmt.Sprintf("Error binding to entity [%v]", err.Error())},
		)
	}

	err := e.db.Get(models.CharacterLanguage{}, c).Model(&models.CharacterLanguage{}).Create(&characterLanguage).Error
	if err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			echo.Map{"error": fmt.Sprintf("Error inserting entity [%v]", err.Error())},
		)
	}

	// log create event
	if e.db.GetSpireDb() != nil {
		// diff between an empty model and the created
		diff := database.ResultDifference(models.CharacterLanguage{}, characterLanguage)
		// build fields created
		var fields []string
		for k, v := range diff {
			fields = append(fields, fmt.Sprintf("%v = %v", k, v))
		}
		// record event
		event := fmt.Sprintf("Created [CharacterLanguage] [%v] data [%v]", characterLanguage.ID, strings.Join(fields, ", "))
		e.auditLog.LogUserEvent(c, "CREATE", event)
	}

	return c.JSON(http.StatusOK, characterLanguage)
}

// deleteCharacterLanguage godoc
// @Id deleteCharacterLanguage
// @Summary Deletes CharacterLanguage
// @Accept json
// @Produce json
// @Tags CharacterLanguage
// @Param id path int true "id"
// @Success 200 {string} string "Entity deleted successfully"
// @Failure 404 {string} string "Cannot find entity"
// @Failure 500 {string} string "Error binding to entity"
// @Failure 500 {string} string "Error deleting entity"
// @Router /character_language/{id} [delete]
func (e *CharacterLanguageController) deleteCharacterLanguage(c echo.Context) error {
	var params []interface{}
	var keys []string

	// primary key param
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		e.logger.Error(err)
	}
	params = append(params, id)
	keys = append(keys, "id = ?")

	// key param [lang_id] position [2] type [smallint]
	if len(c.QueryParam("lang_id")) > 0 {
		langIdParam, err := strconv.Atoi(c.QueryParam("lang_id"))
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{"error": fmt.Sprintf("Error parsing query param [lang_id] err [%s]", err.Error())})
		}

		params = append(params, langIdParam)
		keys = append(keys, "lang_id = ?")
	}

	// query builder
	var result models.CharacterLanguage
	query := e.db.QueryContext(models.CharacterLanguage{}, c)
	for i, _ := range keys {
		query = query.Where(keys[i], params[i])
	}

	// grab first entry
	err = query.First(&result).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	err = query.Limit(10000).Delete(&result).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Error deleting entity"})
	}

	// log delete event
	if e.db.GetSpireDb() != nil {
		// build ids
		var ids []string
		for i, _ := range keys {
			param := fmt.Sprintf("%v", params[i])
			ids = append(ids, fmt.Sprintf("%v", strings.ReplaceAll(keys[i], "?", param)))
		}
		// record event
		event := fmt.Sprintf("Deleted [CharacterLanguage] [%v] keys [%v]", result.ID, strings.Join(ids, ", "))
		e.auditLog.LogUserEvent(c, "DELETE", event)
	}

	return c.JSON(http.StatusOK, echo.Map{"success": "Entity deleted successfully"})
}

// getCharacterLanguagesBulk godoc
// @Id getCharacterLanguagesBulk
// @Summary Gets CharacterLanguages in bulk
// @Accept json
// @Produce json
// @Param Body body BulkFetchByIdsGetRequest true "body"
// @Tags CharacterLanguage
// @Success 200 {array} models.CharacterLanguage
// @Failure 500 {string} string "Bad query request"
// @Router /character_languages/bulk [post]
func (e *CharacterLanguageController) getCharacterLanguagesBulk(c echo.Context) error {
	var results []models.CharacterLanguage

	r := new(BulkFetchByIdsGetRequest)
	if err := c.Bind(r); err != nil {
		return c.JSON(
			http.StatusInternalServerError,
			echo.Map{"error": fmt.Sprintf("Error binding to bulk request: [%v]", err.Error())},
		)
	}

	if len(r.IDs) == 0 {
		return c.JSON(
			http.StatusOK,
			echo.Map{"error": fmt.Sprintf("Missing request field data 'ids'")},
		)
	}

	err := e.db.QueryContext(models.CharacterLanguage{}, c).Find(&results, r.IDs).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, results)
}

// getCharacterLanguagesCount godoc
// @Id getCharacterLanguagesCount
// @Summary Counts CharacterLanguages
// @Accept json
// @Produce json
// @Tags CharacterLanguage
// @Param includes query string false "Relationships [all] for all [number] for depth of relationships to load or [.] separated relationship names"
// @Param where query string false "Filter on specific fields. Multiple conditions [.] separated Example: col_like_value.col2__val2"
// @Param whereOr query string false "Filter on specific fields (Chained ors). Multiple conditions [.] separated Example: col_like_value.col2__val2"
// @Param groupBy query string false "Group by field. Multiple conditions [.] separated Example: field1.field2"
// @Param limit query string false "Rows to limit in response (Default: 10,000)"
// @Param page query int 0 "Pagination page"
// @Param orderBy query string false "Order by [field]"
// @Param orderDirection query string false "Order by field direction"
// @Param select query string false "Column names [.] separated to fetch specific fields in response"
// @Success 200 {array} models.CharacterLanguage
// @Failure 500 {string} string "Bad query request"
// @Router /character_languages/count [get]
func (e *CharacterLanguageController) getCharacterLanguagesCount(c echo.Context) error {
	var count int64
	err := e.db.QueryContext(models.CharacterLanguage{}, c).Count(&count).Error
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": err})
	}

	return c.JSON(http.StatusOK, echo.Map{"count": count})
}