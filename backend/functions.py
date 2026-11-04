from sqlalchemy import Integer, String, Column, create_engine, DateTime, ForeignKey, func
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

    if last_run.roll_no == roll_no:
        session.close()
        return {"code": 403, "msg": "You are supposed to collect the cloth"}

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
            if time_left_in_min < 0:
                continue
            run_dict["remaining"] = time_left_in_min

            response.append(run_dict)
    session.commit()
    session.close()
    return {"code":200 , "runs": response}






def get_today_usage():
    session = Session(engine)
    today = datetime.today().replace(hour=0, minute=0, second=0, microsecond=0)
    today_runs = session.query(Runs).filter(Runs.started_at > today).all()

    if not today_runs:
        return {"code": 404, "msg": "There has been no usage today"}

    response = {}
    for run in today_runs:
        machine = session.get(Machines,run.machine_id)
        block_dict = response.get(machine.block , {})
        block_dict[machine.kind] = block_dict.get(machine.kind,0) + 1
        response[machine.block] = block_dict

    session.close()
    return {"code":200, "usage":response}


def change_service(machine_id, in_service: int):
    session = Session(engine)
    machine = session.get(Machines, machine_id)
    if not machine:
        session.close()
        return {"code": 404, "msg": "Machine doesn't exist"}

    if machine.in_service == 1:

        last_run = session.query(Runs).filter(Runs.machine_id == machine_id).order_by(Runs.id.desc()).first()


        state = "free"
        if last_run:
            state = last_run.status

        if state == "running":
            session.close()
            return {"code": 400, "msg": "Machine is still running"}


    machine.in_service = in_service
    session.commit()
    session.close()
    return {"code":200, "machine":"Changed to " + ("In order" if in_service == 1 else "Out of Order")}




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


