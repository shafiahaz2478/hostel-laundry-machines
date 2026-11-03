from urllib import response
from sqlalchemy import Integer, String, Column, create_engine, DateTime, ForeignKey
from sqlalchemy.orm import Session, declarative_base
from datetime import datetime, date


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

    if last_run.status == "free":
        session.close()
        return {"code": 400, "msg": "The cloth has been already collected"}

    if last_run.ends_at > datetime.now():
        session.close()
        return {"code": 400, "msg": "The run hasn't finished yet"}

    last_run.status = "free"
    last_run.collected_at = datetime.now()
    response = {"code": 200 , "run":run_to_dict(last_run)}
    session.commit()
    session.close()
    return response


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

def get_machine_by_id(id):   #E2 gets one machine by its id, along with its last 5 runs
    session = Session(engine)
    machine =  session.get(Machines,id)
    if not machine:
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}
    last_5_runs = session.query(Runs).filter(Runs.machine_id==id).order_by(Runs.ends_at.desc()).limit(5)
    response ={
        "id": machine.id,
        "name": machine.name,
        "kind": machine.kind,
        "block": machine.block,
        "cycle_minutes": machine.cycle_minutes,
        "in_service": machine.in_service,
        "last_5_runs": last_5_runs
    }
    session.close()
    return {"machine": response, "code": 200}

def start_machine(roll_no,id):
    session = Session(engine)
    machine = session.get(Machines,id)
    last_run =  session.query(Runs).filter(Runs.machine_id == id).order_by(Runs.id.desc()).first()
    if not machine or get_machine_state(machine,last_run):
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}
    run = Runs(name=name, type=type,location=location,water_every_days=water_every_days,adopted_by= None)


