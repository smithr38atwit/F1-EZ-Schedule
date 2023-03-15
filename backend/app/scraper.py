import bs4
from bs4 import BeautifulSoup
import requests
from datetime import datetime as dt
from model import *

# Find links to all races for the year
def get_races(url: str) -> list[Race]:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    link_elements = soup.select('a[data-roundtext]')

    races = []
    for link in link_elements:
        data = {}
        data['round'] = link['data-roundtext']
        data['location'] = link['data-racecountryname']
        data['events'] = get_events_info('https://www.formula1.com' + link['href'])

        race = Race(**data)
        races.append(race)

    return races

# Find and parse race info
def get_events_info(url: str) -> list[Event]:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    time_table = soup.find('div', class_='f1-race-hub--timetable-listings')

    events = []
    for event in time_table.children:
        if type(event) is bs4.element.Tag:
            #print(event.attrs)
            data = {}
            data['event'] = event['class'][1][3:] # event['class']=['row', 'js-event'] -> [1]='js-event' -> [3:]='event'

            start_time = dt.strptime(event['data-start-time']+event['data-gmt-offset'], '%Y-%m-%dT%H:%M:%S%z') # ex) '2023-03-04T18:00:00' + '+03:00'
            data['start_time_track'] = start_time
            data['start_time_local'] = start_time.astimezone()
            
            end_time = dt.strptime(event['data-end-time']+event['data-gmt-offset'], '%Y-%m-%dT%H:%M:%S%z')
            data['end_time_track'] = end_time
            data['end_time_local'] = end_time.astimezone()

            event_data = Event(**data)
            events.append(event_data)
            
    events.reverse()
    return events

def main():
    url = 'https://www.formula1.com/en/racing/2023.html'
    race_calendar = get_races(url)
    return

if __name__ == '__main__':
    main()