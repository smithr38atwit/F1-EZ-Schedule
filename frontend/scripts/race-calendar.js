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
    let nextRace = upcoming_races[0]
    console.debug("Next race: ", nextRace);

    // Set location and race date elements to data

    const dateOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric' };
    const start = new Date(nextRace["events"][0]["start_time_local"]);

    const country = document.querySelector(".country")
    country.classList.remove('loader');
    country.textContent = nextRace["location"];

    const circuit = document.querySelector(".circuit")
    circuit.classList.remove('loader');
    circuit.textContent = nextRace["circuit"];

    const date = document.querySelector(".date")
    date.classList.remove('loader');
    date.textContent = start.toLocaleDateString(undefined, dateOptions);

    const time = document.querySelector(".time")
    time.classList.remove('loader');
    time.textContent = start.toLocaleTimeString(undefined, timeOptions);

    // Set elements for each event to data

    let name, eventDate, eventTime;
    for (let i = 1; i < nextRace["events"].length; i++) {
        let event = nextRace["events"][i];
        let eventStart = new Date(event["start_time_local"]);

        name = document.querySelector(`.event:nth-child(${i}) .event-name`)
        name.classList.remove('loader');
        name.textContent = event["event"];

        eventDate = document.querySelector(`.event:nth-child(${i}) .event-date`)
        eventDate.classList.remove('loader');
        eventDate.textContent = eventStart.toLocaleDateString(undefined, dateOptions);

        eventTime = document.querySelector(`.event:nth-child(${i}) .event-time`)
        eventTime.classList.remove('loader');
        eventTime.textContent = eventStart.toLocaleTimeString(undefined, timeOptions);
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