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

def start_machine(roll_no):
    session = Session(engine)
    machine = session.get(Machines,id)