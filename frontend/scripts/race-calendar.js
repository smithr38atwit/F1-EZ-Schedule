const api = "http://127.0.0.1:9000";

async function getCalendar() {
    // Fetch calendar data from API
    let data;
    try {
        const response = await fetch(api + "/calendar", { method: "GET" });
        console.debug(`GET ${api}/calendar: `)
        data = await response.json();
        console.debug(data);
    } catch (error) {
        alert("Could not get event data")
        console.debug(error);
        return;
    }

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
}

export default getCalendar;