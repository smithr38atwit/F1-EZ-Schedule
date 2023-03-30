const api = "http://127.0.0.1:9000";

async function getStandings() {
    // Fetch standings data from API
    let data;
    try {
        const response = await fetch(api + "/standings", { method: "GET" });
        console.debug(`GET ${api}/standings: `)
        data = await response.json();
        console.debug(data);
    } catch (error) {
        alert("Could not get event data")
        console.debug(error);
        return;
    }

    // Create table from standings data
    const table = document.createElement('table');
    table.className = 'events';

    for (let i = 2; i <= data.length; i++) {
        const tr = table.insertRow();

        // Pos
        const td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(i));

        // Name
        const td2 = tr.insertCell();
        const name = data[i]['name'];
        let first = name.substring(0, str.indexOf(' '));
        let last = name.substring(str.indexOf(' ') + 1);
        first = first.charAt(0) + '.';
        td2.appendChild(document.createTextNode(`${first} ${last}`));

        // Team

        // Points
    }
}

export default getStandings