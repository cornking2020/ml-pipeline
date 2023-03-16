package schemas

import (
	"github.com/cornking2020/ml-pipeline/server/services"
	"github.com/graphql-go/graphql"
)

var tokenType = graphql.NewObject(graphql.ObjectConfig{
	Name: "accessToken",
	Fields: graphql.Fields{
		"value": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
		},
	},
})

func authMutation() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "JWT",
		Fields: graphql.Fields{
			"makeToken": &graphql.Field{
				Type: tokenType,
				Args: graphql.FieldConfigArgument{
					"code": &graphql.ArgumentConfig{
						Type: graphql.NewNonNull(graphql.String),
					},
				},
				// Make JWT Token resolver
				Resolve: services.MakeJWTToken,
			},
		},
	})
}
