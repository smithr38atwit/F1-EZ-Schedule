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
            data = row.contents
            name = data[1].find_next("a").contents
            row_data = {}
            row_data["name"] = f"{name[0].text} {name[2].text}"
            row_data["nationality"] = data[2].text
            row_data["team"] = data[3].text
            row_data["points"] = float(data[4].text)

            row = DriverStandings(**row_data)
            standings.append(row)

    return standings


if __name__ == "__main__":
    standings()
