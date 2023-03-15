from datetime import datetime

from airflow import DAG
from airflow.decorators import task
from airflow.operators.bash import BashOperator

# A DAG represents a workflow, a collection of tasks
with DAG(dag_id="demo", start_date=datetime(2023, 1, 1), schedule="*/1 * * * *") as dag:
    # Tasks are represented as operators
    hello = BashOperator(task_id="hello", bash_command="echo hello")


    @task()
    def airflow():
        now = datetime.now()
        print(f"运行 Airflow 任务管理：{now.isoformat()}")


    # Set dependencies between tasks
    hello >> airflow()
