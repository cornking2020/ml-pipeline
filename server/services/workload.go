package services

import (
	"github.com/cornking2020/ml-pipeline/database"
	"github.com/graphql-go/graphql"
)

type WorkloadService struct {
	workloads []*database.Workload
}

func SaveOrCreateWorkload(p graphql.ResolveParams) (interface{}, error) {
	workload := new(database.Workload)
	parseWorkload(workload, p)

	return workload, nil

}

func GetWorkloads(p graphql.ResolveParams) (interface{}, error) {
	workload := new(database.Workload)
	parseWorkload(workload, p)

	return workload, nil
}

func DeleteWorkload(p graphql.ResolveParams) (interface{}, error) {
	workload := new(database.Workload)
	parseWorkload(workload, p)

	return workload, nil
}

func parseWorkload(workload *database.Workload, p graphql.ResolveParams) {
	if p.Args["id"] != nil {
		workload.ID = p.Args["id"].(uint64)
	}

	if p.Args["title"] != nil {
		workload.Title = p.Args["title"].(string)
	}

	if p.Args["workload_type"] != nil {
		workload.WorkloadType = p.Args["workload_type"].(uint64)
	}
}
