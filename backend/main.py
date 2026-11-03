from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import functions


app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173"],
                   allow_methods=["*"],
                   allow_headers=["*"])


@app.patch("/collect/{machine_id}")
def collect(machine_id: str, roll_no: str):
    response = functions.collect_cloth(machine_id, roll_no)
    code = response["code"]
    if code == 200:
        return response["run"]
    raise HTTPException(code, detail=response["msg"])


@app.patch("/clear/{machine_id}")
def clear(machine_id: str, roll_no: str):
    response = functions.clear_machine(machine_id, roll_no)
    code = response["code"]
    if code == 200:
        return response["run"]
    raise HTTPException(code, detail=response["msg"])

@app.get("/runs/{roll_no}")
def running_run(roll_no: str):
    response = functions.get_running_runs(roll_no)
    code = response["code"]
    if code == 200:
        return response["runs"]
    raise HTTPException(code, detail=response["msg"])

