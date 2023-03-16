package middleware

import (
	"errors"
	"time"

	"github.com/cornking2020/ml-pipeline/constants"
	"github.com/golang-jwt/jwt"
	"github.com/graphql-go/graphql"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var jwtSecret = []byte("jwt-secret")

type (
	jwtExtractor func(echo.Context) (string, error)
)

// CustomClaims : information in JWT token
type CustomClaims struct {
	jwt.StandardClaims
	ID uint64
}

// Errors
var (
	ErrJWTMissing = errors.New("missing_or_malformed_jwt")
	ErrJWTInvalid = errors.New("invalid_or_expired_jwt")
)

// GenerateJWT : Make JWT Token
func (claims *CustomClaims) GenerateJWT() string {
	// The expiresTime is 120 minutes
	var expiresTime = time.Now().Add(time.Duration(120) * time.Minute).Unix()
	claims.StandardClaims.ExpiresAt = expiresTime

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	t, _ := token.SignedString(jwtSecret)

	return t
}

// GetEchoContext Get echo.context
func GetEchoContext(p graphql.ResolveParams) (echo.Context, error) {

	echoContext := p.Context.Value(EchoContextKey)
	if echoContext == nil {
		return nil, ErrJWTMissing
	}
	c, ok := echoContext.(echo.Context)
	if !ok {
		c.Logger().Debug(ErrJWTMissing)
		return nil, ErrJWTMissing
	}
	return c, nil
}

// TokenCheck : JWT Token Check
func TokenCheck(p graphql.ResolveParams) (interface{}, error) {
	// Get echo.context
	c, err := GetEchoContext(p)
	if err != nil {
		return nil, err
	}

	// Check
	extractor := jwtFromHeader(echo.HeaderAuthorization, "Bearer")
	auth, err := extractor(c)
	if err != nil {
		c.Logger().Debug(ErrJWTMissing, zap.Error(err))
		return nil, ErrJWTMissing
	}

	token, err := customParse(auth, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			c.Logger().Debug(ErrJWTInvalid, zap.Error(err))
			return nil, ErrJWTInvalid
		}
		return jwtSecret, nil
	})
	if err != nil {
		c.Logger().Debug(ErrJWTInvalid, zap.Error(err))
		return nil, ErrJWTInvalid
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		c.Logger().Debug(ErrJWTInvalid, zap.Error(err))
		return nil, ErrJWTInvalid
	}
	c.Set(constants.CurrentUser, claims.ID)

	return claims, nil
}

func jwtFromHeader(header string, authScheme string) jwtExtractor {
	return func(c echo.Context) (string, error) {
		auth := c.Request().Header.Get(header)
		l := len(authScheme)
		if len(auth) > l+1 && auth[:l] == authScheme {
			return auth[l+1:], nil
		}

		return "", ErrJWTMissing
	}
}

func customParse(tokenString string, keyFunc jwt.Keyfunc) (*jwt.Token, error) {
	var claims jwt.Claims = &CustomClaims{}
	parser := new(jwt.Parser)

	return parser.ParseWithClaims(tokenString, claims, keyFunc)
}
