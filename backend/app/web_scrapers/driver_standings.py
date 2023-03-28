import bs4
from bs4 import BeautifulSoup
import requests

url = 'https://www.formula1.com/en/results.html/2023/drivers.html'

def standings():
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    table = soup.find('tbody')
    for tr in table.children:
        if type(tr) is not bs4.element.Tag:
            continue
        


if __name__ == '__main__':
    standings()