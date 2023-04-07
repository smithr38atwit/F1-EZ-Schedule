import get from "./api.js";


async function getCalendar() {
    // Fetch calendar data from API
    let data = await get('calendar');
    if (!data) return;

    // Sort races into completed (races ends before current date) and upcoming (race ends after current date)
    let completed_races = [];
    let upcoming_races = [];
    data.forEach(race => {
        let end_dt = Date.parse(race["events"][0].end_time_local);
        let current_dt = Date.now();

        if (end_dt < current_dt) {
            completed_races.push(race);
        } else {
            upcoming_races.push(race);
        }
    });
    // Next race is first in upcoming races list
    let next_race = upcoming_races[0]
    console.debug("Next race: ", next_race);

    // Set location and race date elements to data
    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const start = new Date(next_race["events"][0]["start_time_local"]);
    document.querySelector(".country").textContent = next_race["location"];
    document.querySelector(".circuit").textContent = next_race["circuit"];
    document.querySelector(".date").textContent = start.toLocaleDateString(undefined, dateOptions);
    document.querySelector(".time").textContent = start.toLocaleTimeString(undefined, timeOptions);

    // Set elements for each event to data
    for (let i = 1; i < next_race["events"].length; i++) {
        let event = next_race["events"][i];
        let event_start = new Date(event["start_time_local"]);
        document.querySelector(`.event:nth-child(${i}) .event-name`).textContent = event["event"];
        document.querySelector(`.event:nth-child(${i}) .event-date`).textContent = event_start.toLocaleDateString(undefined, dateOptions);
        document.querySelector(`.event:nth-child(${i}) .event-time`).textContent = event_start.toLocaleTimeString(undefined, timeOptions);
    }

    makeFullSchedule(data);
}

function makeFullSchedule(races) {
    for (let race of races) {
        // Create race info

        const container = document.createElement('article');
        container.classList.add('race-container');

        const raceInfo = document.createElement('div');
        raceInfo.classList.add('race-info', 'full-left');

        const round = document.createElement('div');
        round.classList.add('dark', 'round-num');
        round.textContent = race['round'];
        raceInfo.appendChild(round);

        const country = document.createElement('div');
        country.classList.add('country');
        country.textContent = race['location'];
        raceInfo.appendChild(country);

        const circuit = document.createElement('div');
        circuit.classList.add('dark');
        circuit.textContent = race['circuit'];
        raceInfo.appendChild(circuit);

        container.appendChild(raceInfo);

        // Create grand prix events info

        const table = document.createElement('table');
        table.classList.add('events', 'full-right');

        const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric' };
        for (let event of race['events']) {
            const tr = document.createElement('tr')
            tr.classList.add('event');

            const name = document.createElement('td');
            name.classList.add('event-name');
            name.textContent = event["event"];
            tr.appendChild(name);

            const event_start = new Date(event["start_time_local"]);

            const date = document.createElement('td');
            date.classList.add('event-date');
            date.textContent = event_start.toLocaleDateString(undefined, dateOptions);
            tr.appendChild(date);

            const time = document.createElement('td');
            time.classList.add('event-time');
            time.textContent = event_start.toLocaleTimeString(undefined, timeOptions);
            tr.appendChild(time)

            table.appendChild(tr);
        }

        container.appendChild(table);
        document.getElementById('full-schedule-content').appendChild(container);
    }
}

export default getCalendar;