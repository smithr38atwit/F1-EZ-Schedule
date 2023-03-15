from pydantic import BaseModel
from datetime import datetime


class Event(BaseModel):
    event: str
    start_time_track: datetime
    start_time_local: datetime
    end_time_track: datetime
    end_time_local: datetime

class Race(BaseModel):
    round: str
    location: str
    events: list[Event]