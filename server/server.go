package server

import (
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Run Server
func Run() {
	server := echo.New()
	initializeServer(server)
	initializeRouter(server)

	server.Logger.Fatal(server.Start("127.0.0.1:9090"))
}

func initializeServer(e *echo.Echo) {
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))
	e.Use(middleware.Recover())
	e.Use(middleware.Logger())
	e.TLSServer.ReadTimeout = 30 * time.Second
	e.TLSServer.WriteTimeout = 30 * time.Second
}
