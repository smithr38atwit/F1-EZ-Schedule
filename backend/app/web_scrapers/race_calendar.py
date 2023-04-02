import bs4
from bs4 import BeautifulSoup
import requests
from datetime import datetime as dt
from app.model import Event, Race


url = 'https://www.formula1.com/en/racing/2023.html'

# Get info for all races for the year
def calendar() -> list[Race]:
    page = requests.get(url) # Request HTML page
    soup = BeautifulSoup(page.content, 'html.parser') # Parse HTML with beautiful soup
    link_elements = soup.select('a[data-roundtext]') # use CSS selector to find all link elements with attribute 'data-roundtext'

    races = []
    # get data for each race
    for link in link_elements:
        data = {}
        data['round'] = link['data-roundtext']
        data['location'] = link['data-racecountryname']
        events, circuit = get_events_info('https://www.formula1.com' + link['href'])
        data['circuit'] = circuit
        data['events'] = events

        race = Race(**data)
        races.append(race)

    return races

# Find and parse race info
def get_events_info(url: str) -> tuple[list[Event], str]:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    time_table = soup.find('div', class_='f1-race-hub--timetable-listings') # find first div with given class name

    events = []
    # pull data from all child tags of timetable div
    for event in time_table.children:
        if type(event) is bs4.element.Tag:
            data = {}
            data['event'] = soup.select(f".{event['class'][1]} p")[1].text

            start_time = dt.strptime(event['data-start-time']+event['data-gmt-offset'], '%Y-%m-%dT%H:%M:%S%z') # ex) '2023-03-04T18:00:00' + '+03:00'
            data['start_time_track'] = start_time
            data['start_time_local'] = start_time.astimezone()
            
            end_time = dt.strptime(event['data-end-time']+event['data-gmt-offset'], '%Y-%m-%dT%H:%M:%S%z')
            data['end_time_track'] = end_time
            data['end_time_local'] = end_time.astimezone()

            event_data = Event(**data)
            events.append(event_data)
            
    circuit = soup.select('.f1-race-hub--timetable-links-wrapper p')[0].text
    return (events, circuit)


# if running this file independently, run main()
if __name__ == '__main__':
    calendar()