package services

import (
	"fmt"
	"log"
	"os"
	"os/exec"

	"github.com/cornking2020/ml-pipeline/database"
	"github.com/graphql-go/graphql"
)

type WorkloadService struct {
	workloads []*database.Workload
}

func SaveOrCreateWorkload(p graphql.ResolveParams) (interface{}, error) {
	workload := new(database.Workload)
	parseWorkload(workload, p)

	out, err := exec.Command("pwd").Output()
	log.Println(out)

	if err != nil {
		log.Println(err)
	}

	airflowCmd := exec.Command("kubectl", "apply", "-f", fmt.Sprintf("%s/Documents/projects/ml-pipeline/k8s/airflow-argocd.yml", os.Getenv("HOME")))
	err = airflowCmd.Run()

	if err != nil {
		log.Println(err)
	}

	jupyterCmd := exec.Command("kubectl", "apply", "-f", fmt.Sprintf("%s/Documents/projects/ml-pipeline/k8s/jupyter-argocd.yml", os.Getenv("HOME")))
	err = jupyterCmd.Run()

	if err != nil {
		log.Println(err)
	}

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

	airflowCmd := exec.Command("kubectl", "delete", "-f", fmt.Sprintf("%s/Documents/projects/ml-pipeline/k8s/airflow-argocd.yml", os.Getenv("HOME")))
	err := airflowCmd.Run()

	if err != nil {
		log.Fatal(err)
	}

	jupyterCmd := exec.Command("kubectl", "delete", "-f", fmt.Sprintf("%s/Documents/projects/ml-pipeline/k8s/jupyter-argocd.yml", os.Getenv("HOME")))
	err = jupyterCmd.Run()

	if err != nil {
		log.Fatal(err)
	}

	return workload, nil
}

func parseWorkload(workload *database.Workload, p graphql.ResolveParams) {
	if p.Args["id"] != nil {
		workload.ID = uint64(p.Args["id"].(int))
	}

	if p.Args["title"] != nil {
		workload.Title = p.Args["title"].(string)
	}
}
