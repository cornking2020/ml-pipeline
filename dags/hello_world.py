from datetime import datetime

import pendulum
from airflow import DAG
from airflow.decorators import task
from airflow.operators.bash import BashOperator

now = pendulum.now()
# A DAG represents a workflow, a collection of tasks
with DAG(dag_id="hello_world", start_date=now, schedule=None) as dag:
    # Tasks are represented as operators
    hello = BashOperator(task_id="hello", bash_command="echo hello")


    @task()
    def airflow():
        now = datetime.now()
        print(f"运行 Airflow 任务管理：{now.isoformat()}")


    # Set dependencies between tasks
    hello >> airflow()
