import get from "./api.js";


async function getNews() {
    // Fetch news data from API
    let data = await get('news');
    if (!data) return;

    const latestNews = document.getElementById('latest-news');
    const otherNews = document.getElementById('other-news');

    for (let i = 0; i < data.length; i++) {
        const article = data[i];
        let posted = Math.round((Date.now() - article['posted']) / 3600000);

        if (i === 0) {
            // Create link element as article container
            const container = document.createElement('a');
            container.href = article['link'];
            container.classList.add('large-news');
            container.target = '_blank';
            container.rel = 'noopener noreferrer';

            // Create image element
            const image = document.createElement('img');
            image.src = article['image']['src'];
            image.alt = article['image']['alt'];
            container.appendChild(image);

            // Create container for text content
            const text = document.createElement('div');
            text.classList.add('large-news-text');

            // Create 'new article' text
            const newText = document.createElement('span');
            newText.classList.add('special');
            newText.textContent = 'New';
            text.appendChild(newText);

            // Create time posted text
            const postedText = document.createElement('span');
            postedText.classList.add('dark');
            postedText.textContent = `${posted} Hours Ago`;
            text.appendChild(postedText);

            // Create article title
            const title = document.createElement('p');
            title.textContent = article['title'];
            text.appendChild(title);

            container.appendChild(text);
            latestNews.appendChild(container);
            continue;
        }

        // Create link element as article container
        const container = document.createElement('a');
        container.href = article['link'];
        container.classList.add('small-news');
        container.target = '_blank';
        container.rel = 'noopener noreferrer';

        // Create image element
        const image = document.createElement('img');
        image.src = article['image']['src'];
        image.alt = article['image']['alt'];
        container.appendChild(image);

        // Create container for text content
        const text = document.createElement('div');
        text.classList.add('small-news-text');

        // Create article title
        const title = document.createElement('p');
        title.textContent = article['title'];
        text.appendChild(title);

        // Create time posted text
        const postedText = document.createElement('div');
        postedText.classList.add('dark', 'posted');
        postedText.textContent = `${posted} Hours Ago`;
        text.appendChild(postedText);

        container.appendChild(text);
        otherNews.appendChild(container);
    }
}

export default getNews