package main

import (
	"context"
	"fmt"

	"github.com/apache/airflow-client-go/airflow"
)

func main() {
	conf := airflow.NewConfiguration()
	conf.Host = "airflow.ms.home"
	conf.Scheme = "http"
	cli := airflow.NewAPIClient(conf)

	cred := airflow.BasicAuth{
		UserName: "admin",
		Password: "admin",
	}
	ctx := context.WithValue(context.Background(), airflow.ContextBasicAuth, cred)

	variable, _, err := cli.VariableApi.GetVariable(ctx, "foo").Execute()
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(variable)
	}
}
