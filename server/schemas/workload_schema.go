package schemas

import (
	"github.com/cornking2020/ml-pipeline/server/services"
	"github.com/graphql-go/graphql"
)

var workloadType = graphql.NewObject(graphql.ObjectConfig{
	Name:        "Workload",
	Description: "Workload information",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type:        graphql.Int,
			Description: "Workload ID",
		},
		"title": &graphql.Field{
			Type:        graphql.NewNonNull(graphql.String),
			Description: "Workload Title",
		},
		"workload_type": &graphql.Field{
			Type:        graphql.NewNonNull(graphql.String),
			Description: "Workload Type",
		},
	},
})

func workloadQuery() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name:        "WorkloadQuery",
		Description: "Query for workload",
		Fields: graphql.Fields{
			"getWorkload": &graphql.Field{
				Type:        graphql.NewList(workloadType),
				Description: "Get member information",
				Resolve:     services.GetWorkloads,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type:        graphql.Int,
						Description: "Query Id",
					},
					"title": &graphql.ArgumentConfig{
						Type:        graphql.String,
						Description: "Title",
					},
					"workload_type": &graphql.ArgumentConfig{
						Type:        graphql.String,
						Description: "Workload Type",
					},
				},
			},
		},
	})
}

func workloadMutation() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "WorkloadMutation",
		Fields: graphql.Fields{
			"saveOrCreateWorkload": &graphql.Field{
				Type: workloadType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type:        graphql.Int,
						Description: "Query Id",
					},
					"title": &graphql.ArgumentConfig{
						Type:        graphql.NewNonNull(graphql.String),
						Description: "Workload title",
					},
					"workload_type": &graphql.ArgumentConfig{
						Type:        graphql.String,
						Description: "Workload type",
					},
				},
				Resolve: services.SaveOrCreateWorkload,
			},
			"deleteWorkload": &graphql.Field{
				Type: workloadType,
				Args: graphql.FieldConfigArgument{
					"id": &graphql.ArgumentConfig{
						Type:        graphql.NewNonNull(graphql.Int),
						Description: "Query Id",
					},
				},
				Resolve: services.DeleteWorkload,
			},
		},
	})
}
