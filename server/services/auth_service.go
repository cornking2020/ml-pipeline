package services

import (
	"errors"

	"github.com/cornking2020/ml-pipeline/server/middleware"
	"github.com/graphql-go/graphql"
)

// ErrVerifyFail Errors
var (
	ErrVerifyFail = errors.New("username and password do not match")
)

type accessToken struct {
	Value string
}

// MakeJWTToken : Make JWT token
func MakeJWTToken(p graphql.ResolveParams) (interface{}, error) {
	result := new(accessToken)

	// Make token
	claims := new(middleware.CustomClaims)
	claims.ID = 0
	result.Value = claims.GenerateJWT()

	return result, nil
}
