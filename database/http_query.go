package database

import (
	"fmt"
	"github.com/Akkadius/spire/models"
	"github.com/jinzhu/gorm"
	"github.com/labstack/echo/v4"
	"strconv"
	"strings"
	"unicode"
)

const (
	equalDelimiter   = "__"
	likeDelimiter    = "_like_"
	selectDelimiter  = "."
	whereDelimiter   = "."
	linksDelimiter   = ","
	orderByDelimiter = "."
)

const (
	equal            = "_eq_"
	greaterThan      = "_gt_"
	greaterThanEqual = "_gte_"
	lesserThan       = "_lt_"
	lesserThanEqual  = "_lte_"
)

const defaultLimit = 10000

func (d *DatabaseResolver) QueryContext(model models.Modelable, c echo.Context) *gorm.DB {
	query := d.Get(model, c).Model(&model)

	// selects
	selectParam := c.QueryParam("select")
	selects := make([]string, 0)
	for _, selectString := range strings.Split(selectParam, selectDelimiter) {
		if len(selectString) == 0 {
			continue
		}

		selects = append(selects, selectString)
	}

	if len(selects) > 0 {
		query = query.Select(selects)
	}

	// where filters
	whereParam := c.QueryParam("where")
	for _, filter := range strings.Split(whereParam, whereDelimiter) {
		if len(filter) == 0 {
			continue
		}

		// parse where field = value
		wheres := strings.Split(filter, equalDelimiter)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v = ?", wheres[0]), wheres[1])
		}

		// parse where field like '%value%'
		wheres = strings.Split(filter, likeDelimiter)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v like ?", wheres[0]), fmt.Sprintf("%%%v%%", wheres[1]))
		}

		// parse where [value > x]
		wheres = strings.Split(filter, greaterThan)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v > ?", wheres[0]), wheres[1])
		}

		// parse where [value < x]
		wheres = strings.Split(filter, lesserThan)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v < ?", wheres[0]), wheres[1])
		}

		// parse where [value >= x]
		wheres = strings.Split(filter, greaterThanEqual)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v >= ?", wheres[0]), wheres[1])
		}

		// parse where [value <= x]
		wheres = strings.Split(filter, lesserThanEqual)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v <= ?", wheres[0]), wheres[1])
		}

		// parse where [value = x]
		wheres = strings.Split(filter, equal)
		if len(wheres) > 1 {
			query = query.Where(fmt.Sprintf("%v = ?", wheres[0]), wheres[1])
		}

	}

	// order
	orderByParam := c.QueryParam("orderBy")
	if len(orderByParam) > 0 {
		orderDirection := "asc"
		orderDirectionParam := c.QueryParam("orderDirection")
		if len(orderDirectionParam) > 0 {
			orderDirection = orderDirectionParam
		}

		// parse where [value = x]
		orders := strings.Split(orderByParam, orderByDelimiter)
		for _, order := range orders {
			query = query.Order(fmt.Sprintf("%v %v", order, orderDirection))
		}
	}

	// QueryContext limit
	queryParamLimit := c.QueryParam("limit")
	queryLimit := defaultLimit
	if len(queryParamLimit) > 0 {
		l, err := strconv.Atoi(queryParamLimit)
		if err != nil {
			d.logger.Warn(err)
		}
		queryLimit = l
	}
	query = query.Limit(queryLimit)

	// assocations
	links := c.QueryParam("includes")
	for _, association := range strings.Split(links, linksDelimiter) {
		if len(association) == 0 {
			continue
		}

		// this will take in a number and will only load as many levels as specified in the include
		// 1 - 1 level deep of relationships
		// 2 - 2 levels deep of relationships etc.
		if isInt(association) {
			rLevels, err := strconv.Atoi(association)
			if err != nil {
				d.logger.Warn(err)
			}
			for _, relation := range model.Relationships() {
				if strings.Contains(relation, ".") {
					relations := strings.Split(relation, ".")

					relationToLoad := ""
					for i := 0; i < rLevels; i++ {
						if i >= len(relations) {
							break
						}

						if i > 0 {
							relationToLoad += "."
						}

						relationToLoad += relations[i]
					}

					query = query.Preload(relationToLoad)

					continue
				}

				query = query.Preload(relation)
			}
			continue
		}

		if len(association) > 0 && association != "all" {
			query = query.Preload(association)
		}

		if association == "all" {
			for _, relation := range model.Relationships() {
				query = query.Preload(relation)
			}
		}
	}

	return query
}

func isInt(s string) bool {
	for _, c := range s {
		if !unicode.IsDigit(c) {
			return false
		}
	}
	return true
}
