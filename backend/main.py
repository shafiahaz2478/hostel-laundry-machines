from urllib import response

from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import functions

class Machine(BaseModel):
    name: str
    block: str
    kind: str
    cycle_minutes: int
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

@app.get("/machines/{id}")
def get_machine_by_id(id: int): #E2
    response = functions.get_machine_by_id(id=id)
    code = response["code"]
    if code == 200:
        return response["machine"]
    raise HTTPException(code, detail=response["msg"])

@app.post("/machines")
def add_machine(machine:Machine): #E3
    response = functions.add_a_machine(machine.name,machine.block,machine.kind,machine.cycle_minutes)
    code = response["code"]
    if code == 200:
        return response["machine"]
    raise HTTPException(code,detail=response["msg"])

@app.get("/machines")
def get_all_machines(block=None,kind=None): #E1
    if block not in ["a","b","c","d",None]:
        raise HTTPException(status_code=422, detail="Invalid block")
    if kind not in ["washer","dryer",None]:
        raise HTTPException(status_code=422, detail="Invalid kind of machine")
    response = functions.get_all_machines(block=block,kind=kind)
    return response

@app.get("/attention")
def get_machines_needing_attention(): #E9
    response = functions.get_machines_that_need_attention()
    return response

@app.post("/runs/{machine_id}")
def starting(machine_id,roll_no):
    response = functions.start_machine(machine_id=machine_id,roll_no=roll_no)
    code = response["code"]
    if code == 200:
        return response["run"]
    raise HTTPException(code, detail=response["msg"])
@app.get("/usage")
def usage():
    response = functions.get_today_usage()
    code = response["code"]
    if code == 200:
        return response["usage"]
    raise HTTPException(code, detail=response["msg"])

@app.patch("/service/{machine_id}")
def changeservice(machine_id: str, in_service: int):
    response = functions.change_service(machine_id, in_service)
    code = response["code"]
    if code == 200:
        return response["machine"]

    raise HTTPException(code, detail=response["msg"])
