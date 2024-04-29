# F1 EZ Schedule App

The F1 EZ App is simple, elegant solution to checking the latest and most fital info in Formula 1. It provides an easy way to see when the next race is, the current drivers standings, and the latest news.

*All information displayed is scraped from [the official Formula 1 website](https://www.formula1.com/).*

## Setup

Run setup.ps1 or:

1. Create a virtual environment with `python -m venv .venv` (Python 3.11 is recommended)
2. Activate virtual environment
3. Install required packages with `pip install -r backend/requirements.txt`

## Running

### Back end

Simply run main.py to start the uvicorn server.

### Front end

It is recommended to host the front end with vscode, using the Live Server extension. If another method is used, the IP address and port number must be added to the list of origins in api.py.

## Demo

https://github.com/smithr38atwit/F1-EZ-Schedule/assets/54961768/eb67a2d6-dc9b-4b8e-8791-fcc56b4eeff3
