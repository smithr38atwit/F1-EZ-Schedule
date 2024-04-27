from datetime import datetime

from pydantic import BaseModel

# ------ Race Calendar ------


class Event(BaseModel):
    event: str
    start_time_track: datetime
    start_time_local: datetime
    end_time_track: datetime
    end_time_local: datetime


class Race(BaseModel):
    round: str
    location: str
    circuit: str
    events: list[Event]


# ------ Driver Standings ------


class DriverStandings(BaseModel):
    name: str
    nationality: str
    team: str
    points: float


# ------ News ------


class Image(BaseModel):
    src: str
    alt: str


class NewsArticle(BaseModel):
    link: str
    image: Image
    title: str
    posted: int
