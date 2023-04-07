from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.model import *
from app.web_scrapers.race_calendar import calendar
from app.web_scrapers.driver_standings import standings
from app.web_scrapers.news import news


app = FastAPI()

# CORS(Cross Origin Resource Sharing) allows the JavaScript on the frontend to send requests to the backend
origins = [
    "http://127.0.0.1:5500" # origin when hosting with Live Server
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# Root endpoint for testing/pinging
@app.get('/')
async def read_root():
    return {'message': 'Server is running'}

# Calls race schedule scraper
@app.get('/calendar')
def get_current_calendar():
    return calendar()

# Calls drivers standings scraper
@app.get('/standings')
def get_driver_standings():
    return standings()

# Calls latest news scraper
@app.get('/news')
def get_recent_news():
    return news()