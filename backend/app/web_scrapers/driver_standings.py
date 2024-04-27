from datetime import datetime as dt

import requests
from app.model import DriverStandings
from bs4 import BeautifulSoup

url = f"https://www.formula1.com/en/results.html/{dt.today().year}/drivers.html"


# Scrapes drivers standings data from F1 website
def standings():
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    # Find first table on page (which contains drivers standings data) and parse through
    table = soup.find_all("table")
    standings: list[DriverStandings] = []
    if len(table) != 0:
        # Split each table row into desired data
        for row in soup.find("tbody").find_all("tr"):
            data: list[str] = row.text.split("\n\n")
            name = data[2].split()
            row_data = {}
            row_data["name"] = f"{name[0]} {name[1]}"
            row_data["nationality"] = data[3].strip()
            row_data["team"] = data[4].strip()
            row_data["points"] = float(data[5].strip())

            row = DriverStandings(**row_data)
            standings.append(row)

    return standings


if __name__ == "__main__":
    standings()
