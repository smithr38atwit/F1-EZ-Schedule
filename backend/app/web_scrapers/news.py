import requests
from app.model import NewsArticle
from bs4 import BeautifulSoup

url = "https://www.formula1.com/en/latest/all.news.html"


# Scrapes latest news data from F1 website
def news():
    page = requests.get(url)
    soup = BeautifulSoup(page.content, "html.parser")

    # Select first 10 news link elements
    news: list[NewsArticle] = []
    news_elements = soup.select(".f1-latest-listing--grid-item>a", limit=10)
    # Parse data for each news element
    for element in news_elements:
        data = {}
        data["link"] = "https://www.formula1.com" + element["href"]
        img = element.find("img")
        data["image"] = {"src": img["data-src"], "alt": img["alt"]}
        title = element.select_one("p:nth-child(2)")
        element.select_one("p:nth-child(2)")
        data["title"] = title.text
        data["posted"] = getTimePosted(data["link"])

        news.append(NewsArticle(**data))

    return news


# Follows link to news article and retrieves the time posted data
def getTimePosted(link: str) -> int:
    page = requests.get(link)
    soup = BeautifulSoup(page.content, "html.parser")

    return int(soup.find("time")["datetime"])


if __name__ == "__main__":
    news()
