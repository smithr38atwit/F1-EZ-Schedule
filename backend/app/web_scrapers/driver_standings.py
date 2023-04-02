from bs4 import BeautifulSoup
import requests
from app.model import DriverStandings

url = 'https://www.formula1.com/en/results.html/2023/drivers.html'

def standings():
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    table = soup.find_all('table')
    standings: list[DriverStandings] = []
    if len(table) != 0:
        for row in soup.find('tbody').find_all('tr'):
            data: list[str] = row.text.split('\n\n')
            name = data[2].split()
            row_data = {}
            row_data['name'] = f'{name[0]} {name[1]}'
            row_data['nationality'] = data[3].strip()
            row_data['team'] = data[4].strip()
            row_data['points'] = float(data[5].strip())

            row = DriverStandings(**row_data)
            standings.append(row)

    return standings


if __name__ == '__main__':
    standings()