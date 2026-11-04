from urllib import response
from sqlalchemy import Integer, String, Column, create_engine, DateTime, ForeignKey
from sqlalchemy.orm import Session, declarative_base
from datetime import datetime, date, timedelta


DB_PATH = "./laundry.db"
engine = create_engine(f"sqlite:///{DB_PATH}")
Base = declarative_base()

class Machines(Base):
    __tablename__ = "machines"
    id = Column(Integer, primary_key=True)
    name = Column(String)
    kind = Column(String)
    block = Column(String)
    cycle_minutes = Column(Integer)
    in_service = Column(Integer)


class Runs(Base):
    __tablename__ = "runs"
    id = Column(Integer, primary_key=True)
    machine_id = Column(Integer, ForeignKey("machines.id"))
    roll_no = Column(String)
    started_at = Column(DateTime , default=datetime.now())
    ends_at = Column(DateTime)
    collected_at = Column(DateTime, nullable=True)
    status = Column(String)


def get_all_machines(block=None, kind=None):
    session = Session(engine)
    machines = session.query(Machines)
    if block:
        machines = machines.filter(Machines.block == block)
    if kind:
        machines = machines.filter(Machines.kind == kind)

    machines = machines.all()

    response = []

    for machine in machines:
        state = "out of order"

        if machine.in_service == 1:

            last_run = session.query(Runs).filter(Runs.machine_id == machine.id).order_by(Runs.id.desc()).first()
            if last_run is None:
                state = "free"
            elif last_run.status == "running":
                if last_run.ends_at > datetime.now():
                    state = "running"
                else:
                    state = "waiting for pickup"
            else:
                state = "free"
        response.append({
            "id": machine.id,
            "name": machine.name,
            "block": machine.block,
            "kind": machine.kind,
            "state": state
        })

    session.close()

    return response


def collect_cloth(machine_id,roll_no):
    session = Session(engine)
    machine = session.get(Machines,machine_id)
    if not machine:
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}
    last_run =  session.query(Runs).filter(Runs.machine_id == machine_id).order_by(Runs.id.desc()).first()

    if not last_run:
        session.close()
        return {"code": 404, "msg": "No run exist for this machine"}



    if last_run.roll_no != roll_no:
        session.close()
        return {"code": 403, "msg": "You are not allowed to collect someone else cloth"}

    if last_run.status != "running":
        session.close()
        return {"code": 400, "msg": "The cloth has been already collected"}

    if last_run.ends_at > datetime.now():
        session.close()
        return {"code": 400, "msg": "The run hasn't finished yet"}

    last_run.status = "collected"
    last_run.collected_at = datetime.now()
    response = {"code": 200 , "run":run_to_dict(last_run)}
    session.commit()
    session.close()
    return response


def clear_machine(machine_id,roll_no):
    session = Session(engine)
    machine = session.get(Machines, machine_id)
    if not machine:
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}
    last_run = session.query(Runs).filter(Runs.machine_id == machine_id).order_by(Runs.id.desc()).first()

    if not last_run:
        session.close()
        return {"code": 404, "msg": "No run exist for this machine"}

    if last_run.roll_no != roll_no:
        session.close()
        return {"code": 403, "msg": "You are not allowed to collect someone else cloth"}

    if last_run.status != "running":
        session.close()
        return {"code": 400, "msg": "The cloth has been already collected"}

    if last_run.ends_at > datetime.now():
        session.close()
        return {"code": 400, "msg": "The run hasn't finished yet"}

    if last_run.ends_at + timedelta(minutes=15) > datetime.now():
            session.close()
            return {"code": 400, "msg": "The picking time has not ran out yet"}
    last_run.status = "cleared"
    response = {"code": 200, "run": run_to_dict(last_run)}
    session.commit()
    session.close()
    return response


def get_running_runs(roll_no):
    session = Session(engine)
    runs = session.query(Runs).filter(Runs.roll_no == roll_no).order_by(Runs.id.desc()).all()

    response = []

    for run in runs:
        if run.status == "running":
            run_dict = run_to_dict(run)
            machine = session.get(Machines,run.machine_id)
            run_dict["machine_name"] = machine.name
            time_left = run.ends_at - datetime.now()
            time_left_in_min = time_left.total_seconds() // 60
            run_dict["remaining"] = time_left_in_min

            response.append(run_dict)
    session.commit()
    session.close()
    return {"code":200 , "runs": response}


def get_machine_state(machine: Machines, last_run:Runs):
    if machine.in_service == 1:
        if last_run.status == "running":
            if last_run.ends_at > datetime.now():
                return "running"
            else:
                return "waiting for pickup"
        else:
            return "free"

    return "Out of Order"


def run_to_dict(run : Runs):
    return {
        "id":run.id,
        "machine_id":run.machine_id,
        "roll_no":run.roll_no,
        "started_at":run.started_at,
        "ends_at":run.ends_at,
        "collected_at":run.collected_at,
        "status":run.status
    }

def get_machine_by_id(id):   #E2 gets one machine by its id, along with its last 5 runs | Sarang
    session = Session(engine)
    print(id)
    machine =  session.get(Machines,id)
    if not machine:
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}
    last_5_runs = session.query(Runs).filter(Runs.machine_id==id).order_by(Runs.ends_at.desc()).limit(5)
    dict_run = []
    for run in last_5_runs:
        dict_run.append(run_to_dict(run))
    response ={
        "id": machine.id,
        "name": machine.name,
        "kind": machine.kind,
        "block": machine.block,
        "cycle_minutes": machine.cycle_minutes,
        "in_service": machine.in_service,
        "last_5_runs": dict_run
    }
    print(response)
    session.close()
    return {"machine": response, "code": 200}

def start_machine(id,machine_id,roll_no,collected_at,status): #E5, The function checks if given id is available and starts the machine | Sarang
    session = Session(engine)
    machine = session.get(Machines,id)
    started_at = datetime.now()
    last_run =  session.query(Runs).filter(Runs.machine_id == id).order_by(Runs.id.desc()).first()
    if not machine:
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}
    if last_run and get_machine_state(machine,last_run) != "free":
        session.close()
        return {"code": 400, "msg": "Machine is not available for use"}

    ends_at = started_at + timedelta(minutes=machine.cycle_minutes)
    run = Runs(machine_id=machine_id,roll_no=roll_no,ends_at=ends_at,collected_at=collected_at,status="running",started_at=started_at)
    session.add(run)
    response = {
        "machine_id":machine_id,
        "roll_no":roll_no,
        "ends_at":ends_at,
        "collected_at":collected_at,
        "status":"running",
        "started_at":started_at
    }
    session.commit()
    session.close()
    return response

def get_machines_that_need_attention(): #E9, the function gets all the machines that need attention due to being out of order or not being cleared after waiting for pickup for 15 mins, Sarang
    session = Session(engine)
    machines = session.query(Machines)
    response =[]
    for machine in machines:
        print(machine.in_service)

        if machine.in_service == 0:
            response.append({
                "id": machine.id,
                "name": machine.name,
                "block": machine.block,
                "kind": machine.kind,
                "state": "Out of Order"
            })
            continue
        last_run = session.query(Runs).filter(Runs.machine_id == machine.id).order_by(Runs.id.desc()).first()
        if last_run:
            machine_state=get_machine_state(machine,last_run)

            if machine_state == "waiting for pickup" and last_run.ends_at + timedelta(minutes=15) > datetime.now():
                machine_state = "Waiting for pickup for more than 15 mins"
                response.append({
                    "id": machine.id,
                    "name": machine.name,
                    "block": machine.block,
                    "kind": machine.kind,
                    "state": machine_state
                })
    return response

def add_a_machine(name,block,kind,cycle_minutes): #E3, Add a machines a machine with proper api checks and starts machine in service
    session = Session(engine)
    block = block.lower()
    kind = kind.lower()
    blocks= ["a","b","c","d"]
    kinds =["washer","dryer"]
    if cycle_minutes < 20 or cycle_minutes > 90:
        session.close()
        return {"code": 422, "msg": "Cycle minutes should be between 20 and 90"}
    elif block not in blocks:
        session.close()
        return {"code": 422, "msg": "Invalid block"}
    elif kind not in kinds:
        session.close()
        return {"code": 422, "msg": "Invalid kind of machine"}
    elif name and block and kind and cycle_minutes:
        machine = Machines(name=name, block=block, kind=kind, cycle_minutes=cycle_minutes, in_service=1)
        session.add(machine)
        response ={
            "name": machine.name,
            "block": machine.block,
            "kind": machine.kind,
            "cycle_minutes": machine.cycle_minutes,
            "in_service": machine.in_service
        }
        session.commit()
        session.close()
        return {"code":200,"machine":response}
    else:
        session.close()
        return {"code": 422, "msg": "Missing or Empty field"}
