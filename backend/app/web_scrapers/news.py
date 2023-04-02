from bs4 import BeautifulSoup
import requests
from app.model import NewsArticle


url = 'https://www.formula1.com/en/latest/all.news.html'

def news():
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')

    news: list[NewsArticle] = []
    news_elements = soup.select('.f1-latest-listing--grid-item>a', limit=10)
    for element in news_elements:
        data = {}
        data['link'] = 'https://www.formula1.com' + element['href']
        img = element.find('img')
        data['image'] = { 'src': img['data-src'], 'alt':  img['alt'] }
        title = element.select_one('p:nth-child(2)')
        element.select_one('p:nth-child(2)')
        data['title'] = title.text
        data['posted'] = getTimePosted(data['link'])

        news.append(NewsArticle(**data))

    return news

def getTimePosted(link: str) -> int:
    page = requests.get(link)
    soup = BeautifulSoup(page.content, 'html.parser')

    return int(soup.find('time')['datetime'])

if __name__ == '__main__':
    news()