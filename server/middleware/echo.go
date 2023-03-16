package middleware

import (
	"context"

	"github.com/labstack/echo/v4"
)

type Values struct {
	m map[string]string
}

func (v Values) Get(key string) string {
	return v.m[key]
}

// EchoContextKey : for Echo context
const EchoContextKey string = "e"

// EchoContext : For accessing echo.context from the resolver
func EchoContext(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		ctx := context.WithValue(c.Request().Context(), EchoContextKey, c)
		c.SetRequest(c.Request().WithContext(ctx))

		return next(c)
	}
}
