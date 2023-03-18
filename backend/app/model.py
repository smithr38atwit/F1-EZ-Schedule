from pydantic import BaseModel
from datetime import datetime


# Events during race weekend (e.g. practice, quali, race)
class Event(BaseModel):
    event: str
    start_time_track: datetime
    start_time_local: datetime
    end_time_track: datetime
    end_time_local: datetime

# Grand Prix / full race weekend
class Race(BaseModel):
    round: str
    location: str
    circuit: str
    events: list[Event]