package server

import (
	"log"
	"net/http"

	"github.com/cornking2020/ml-pipeline/server/middleware"
	"github.com/cornking2020/ml-pipeline/server/schemas"
	"github.com/graphql-go/handler"
	"github.com/labstack/echo/v4"
)

func initializeRouter(e *echo.Echo) {
	// Health check
	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})

	// GraphQL with jwt
	e.Use(middleware.EchoContext)
	e.Any("/graphql", func(c echo.Context) error {
		graphQLHandler().ServeHTTP(c.Response(), c.Request())
		return nil
	})
}

func graphQLHandler() *handler.Handler {
	qlSchema, err := schemas.New()
	if err != nil {
		log.Panic(err)
	}
	return handler.New(&handler.Config{
		Schema:     &qlSchema,
		Pretty:     true,
		Playground: true,
	})
}
