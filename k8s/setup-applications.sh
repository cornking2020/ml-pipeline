#!/usr/bin/env bash

helm repo add apache-airflow https://airflow.apache.org
helm upgrade --cleanup-on-fail \
  --install airflow apache-airflow/airflow \
  --namespace airflow \
  --create-namespace \
  -f airflow.value.yml

microk8s kubectl config set-context --current --namespace=airflow

helm repo add jupyterhub https://jupyterhub.github.io/helm-chart/

helm upgrade --cleanup-on-fail \
  --install jupyterhub jupyterhub/jupyterhub \
  --namespace jupyterhub \
  --create-namespace \
  --values jupyter.value.yml

helm repo add rstudio https://helm.rstudio.com
helm upgrade  --cleanup-on-fail \
  --install rstudio rstudio/rstudio-workbench \
  --namespace rstudio \
  --create-namespace \
  --values rstudio.value.yml
