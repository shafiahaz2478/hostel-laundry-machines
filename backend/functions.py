
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
    started_at = Column(DateTime, default=datetime.now)
    ends_at = Column(DateTime)
    collected_at = Column(DateTime, nullable=True)
    status = Column(String)


Base.metadata.create_all(engine)


# e1
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

 



# part e3,

def add_machine(name, block, kind, cycle_minutes):
    session = Session(engine)

    machine = Machines(
     name=name,
     block=block,
     kind=kind,
     cycle_minutes=cycle_minutes,
    in_service=1
    )
    session.add(machine)
    session.commit()
    session.refresh(machine)
    response = {
     "id": machine.id,
    "name": machine.name,
     "block": machine.block,
    "kind": machine.kind,
     "cycle_minutes": machine.cycle_minutes,
    "in_service": machine.in_service
    }
    session.close()
    return response

