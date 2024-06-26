import get from "./api.js";


/**
 * Retrieves drivers current standings data from API and renders it
 */
async function getStandings() {
    // Fetch standings data from API
    let data = await get('standings');
    if (!data) return;

    // WDC leader info
    const name = data[0]['name'];
    let first = name.substring(0, name.indexOf(' '));
    let last = name.substring(name.indexOf(' ') + 1);
    first = first.charAt(0) + '.';
    let el = document.getElementById('leader-name');
    el.classList.remove('loader');
    el.textContent = `${first} ${last}`;
    let points = data[0]['points'];
    if (points % 1 == 0) {
        points = Math.trunc(points);
    }
    el = document.getElementById('leader-pts');
    el.classList.remove('loader');
    el.textContent = `${points} pts`;
    el = document.getElementById('leader-team');
    el.classList.remove('loader');
    el.textContent = data[0]['team'];

    // Create table from standings data
    const table = document.createElement('table');
    table.className = 'standings-table events scroll';

    for (let i = 1; i < data.length; i++) {
        const tr = table.insertRow();
        tr.className = 'event';

        // Pos
        const td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(i + 1));

        // Name
        const td2 = tr.insertCell();
        const name = data[i]['name'];
        let first = name.substring(0, name.indexOf(' '));
        let last = name.substring(name.indexOf(' ') + 1);
        first = first.charAt(0) + '.';
        td2.appendChild(document.createTextNode(`${first} ${last}`));

        // Team
        const td3 = tr.insertCell();
        td3.appendChild(document.createTextNode(data[i]['team']));

        // Points
        const td4 = tr.insertCell();
        let points = data[i]['points'];
        if (points % 1 == 0) {
            points = Math.trunc(points);
        }
        td4.appendChild(document.createTextNode(points));
    }

    const standings = document.getElementById('standings');
    standings.removeChild(document.getElementById('loader-table'))
    standings.appendChild(table);
}


export default getStandings