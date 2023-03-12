#!/usr/bin/env bash

helm repo add apache-airflow https://airflow.apache.org
helm upgrade --cleanup-on-fail \
  --install airflow apache-airflow/airflow \
  --namespace airflow \
  --create-namespace \
  -f airflow.value.yml

#Default Webserver (Airflow UI) Login credentials:
#    username: admin
#    password: admin
#Default Postgres connection credentials:
#    username: postgres
#    password: postgres
#    port: 5432

kubectl config set-context --current --namespace=airflow

helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/

helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --namespace jupyterhub \
  --create-namespace \
  --values jupyter.value.yml

kubectl config set-context --current --namespace=jupyterhub
#    username: admin
#    password: admin

helm repo add rstudio https://helm.rstudio.com
helm upgrade --cleanup-on-fail \
  --install rstudio rstudio/rstudio-workbench \
  --namespace rstudio \
  --create-namespace \
  --values rstudio.value.yml

kubectl config set-context --current --namespace=rstudio
