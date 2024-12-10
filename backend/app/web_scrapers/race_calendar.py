import re
from datetime import datetime as dt
from datetime import timedelta

import bs4
import pytz
import requests
from app.model import Event, Race
from bs4 import BeautifulSoup
from bs4.element import NavigableString, Tag

url = "https://pitwall.app/"


# Get info for all races for the year
def calendar() -> list[Race]:
    page = requests.get(url + "races")
    soup = BeautifulSoup(page.content, "html.parser")

    races = []
    table = soup.find("tbody")
    for row in table.children:
        if type(row) is NavigableString:
            continue
        race_url = row.find_next("a")["href"]
        race_page = requests.get(url + race_url)
        race_soup = BeautifulSoup(race_page.content, "html.parser")

        data = {}
        info_pane = race_soup.find("div", class_="info-pane-data")

        # Round (ex. 1/24)
        round = info_pane.find("div", text=re.compile("Round")).find_next_sibling().text
        data["round"] = round.split("/")[0]

        # Location
        data["location"] = info_pane.find("div", text=re.compile("Location")).find_next_sibling().text

        # Circuit
        data["circuit"] = info_pane.find("div", text=re.compile("Circuit")).find_next("a").text

        # Events
        timetable = race_soup.find("h3", text=re.compile("Timetable")).find_next("tbody")
        data["events"] = get_events_info(timetable)

        race = Race(**data)
        races.append(race)

    return races


# Find and parse race info
def get_events_info(timetable: Tag) -> list[Event]:
    events = []
    for event in timetable.children:
        if type(event) is NavigableString or len(event.contents) != 7:
            continue

        data = {}

        # Event title
        data["event"] = event.contents[1].text.strip()

        # Start time
        date_str = event.contents[3].text.strip()
        time_str, tz_str = event.contents[5].text.strip().split(" ")
        tz_str = "Europe/Berlin" if tz_str == "CEST" else tz_str
        start_time = dt.strptime(f"{date_str} {time_str}", "%A %B %d, %Y %H:%M")
        try:
            start_time = pytz.timezone(tz_str).localize(start_time)
        except pytz.exceptions.UnknownTimeZoneError:
            print(f"Skipping localization for tz {tz_str}")
        start_time_localized = start_time.astimezone()
        data["start_time_track"] = start_time
        data["start_time_local"] = start_time_localized

        # End time
        duration = 2 if data["event"] == "Race" else 1
        data["end_time_track"] = start_time + timedelta(hours=duration)
        data["end_time_local"] = start_time_localized + timedelta(hours=duration)

        event_data = Event(**data)
        events.append(event_data)

    return events[::-1]


if __name__ == "__main__":
    calendar()
