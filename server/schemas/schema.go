package schemas

import (
	"github.com/cornking2020/ml-pipeline/server/middleware"
	"github.com/graphql-go/graphql"
)

// New : Make new GraphQL schema
func New() (graphql.Schema, error) {
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    rootQuery,
		Mutation: rootMutation,
	})
	if err != nil {
		return schema, err
	}

	return schema, nil
}

var rootQuery = graphql.NewObject(graphql.ObjectConfig{
	Name:        "Query",
	Description: "RootQuery",
	Fields: graphql.Fields{
		"workload": &graphql.Field{
			Type:        workloadQuery(),
			Description: "Query for workload",
			Resolve:     middleware.TokenCheck,
		},
	},
})

var rootMutation = graphql.NewObject(graphql.ObjectConfig{
	Name:        "Mutation",
	Description: "RootMutation",
	Fields: graphql.Fields{
		"auth": &graphql.Field{
			Type:        authMutation(),
			Description: "Authorization",
			Resolve:     NextResolve,
		},
		"workload": &graphql.Field{
			Type:        workloadMutation(),
			Description: "Workload",
			Resolve:     NextResolve,
		},
	},
})

// NextResolve : return empty struct for relay
func NextResolve(p graphql.ResolveParams) (interface{}, error) {
	return struct{}{}, nil
}
