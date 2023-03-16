from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.model import *
from app.scraper import calendar


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


@app.get('/')
async def read_root():
    return {'message': 'Server is running'}

@app.get('/calendar')
def get_current_calendar():
    return calendar()