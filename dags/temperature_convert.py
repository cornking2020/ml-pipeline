import json
from typing import Dict

import pendulum
import requests
from airflow.datasets import Dataset
from airflow.decorators import dag, task

SRC = Dataset(
    "https://www.ncei.noaa.gov/access/monitoring/climate-at-a-glance/global/time-series/globe/land_ocean/ytd/12/1880-2022.json"
)
now = pendulum.now()


@dag(start_date=now, schedule=None, catchup=False)
def etl():
    @task()
    def retrieve(src: Dataset) -> dict:
        resp = requests.get(url=src.uri)
        response_data = resp.json()
        return response_data["data"]

    @task()
    def to_fahrenheit(temps: Dict[int, float]) -> Dict[int, float]:
        ret: Dict[int, float] = {}
        for year, celsius in temps.items():
            ret[year] = float(celsius) * 1.8 + 32

        return ret

    @task()
    def load(fahrenheit: Dict[int, float]) -> Dataset:
        filename = "/tmp/fahrenheit.json"
        s = json.dumps(fahrenheit)
        f = open(filename, "w")
        f.write(s)
        f.close()

        return Dataset(f"file:///{filename}")

    data = retrieve(SRC)
    temperature = to_fahrenheit(data)
    load(temperature)


etl()
