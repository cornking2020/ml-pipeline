FROM alpine:latest

ENV AIRFLOW_HOME=/airflow
ENV AIRFLOW_VERSION=2.5.1

RUN apk update && apk add py3-pip gcc python3-dev musl-dev build-base linux-headers libffi-dev \
    && pip install "apache-airflow==${AIRFLOW_VERSION}" --constraint "https://raw.githubusercontent.com/apache/airflow/constraints-${AIRFLOW_VERSION}/constraints-$(python --version | cut -d " " -f 2 | cut -d "." -f 1-2).txt" \
# airflow users delete -u admin
# airflow users create --role Admin --username admin --email admin --firstname admin --lastname admin --password admin
ENTRYPOINT ["airflow", "standalone"]