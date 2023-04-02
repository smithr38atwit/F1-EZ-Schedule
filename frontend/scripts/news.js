import get from "./api.js";


async function getNews() {
    // Fetch news data from API
    let data = await get('news');
    if (!data) return;

    for (let article of data) {
        let posted = (Date.now() - article['posted']) / 3600000
    }
}

export default getNews