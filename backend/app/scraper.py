import pandas as pd
from bs4 import BeautifulSoup
import requests
import re

def get_links(url: str) -> list[str]:
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    link_elements = soup.select("a[data-roundtext]")
    race_links = [('https://www.formula1.com' + link['href']) for link in link_elements]
    return race_links

def get_info(url: str):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

def main():
    url = 'https://www.formula1.com/en/racing/2023.html'
    info = []
    for link in get_links(url):
        info.append(get_info(link))

if __name__ == '__main__':
    main()