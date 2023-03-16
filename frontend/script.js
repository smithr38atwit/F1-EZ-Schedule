const api = "http://127.0.0.1:8000";

async function getCalendar() {
    const response = await fetch(api + "/calendar", { method: "GET" });
    console.debug(`GET ${api}/calendar: `)
    const data = await response.json();
    console.debug(data);

    let completed_races = []; upcoming_races = [];
    data.forEach(race => {
        let end_dt = Date.parse(race["events"][0].end_time_local);
        let current_dt = Date.now()

        if (end_dt < current_dt) {
            completed_races.push(race);
        } else {
            upcoming_races.push(race);
        }
    });
    let next_race = upcoming_races[0]
    console.debug("Next race: ", next_race);

    const start = new Date(next_race["events"][0]["start_time_local"]);
    const end = new Date(next_race["events"][0]["end_time_local"]);
    document.querySelector(".location").textContent = next_race["location"];
    document.querySelector(".date-time span:nth-child(1)").textContent = start.toDateString();
    document.querySelector(".date-time span:nth-child(2)").textContent = start.toLocaleTimeString();
    document.querySelector(".date-time span:nth-child(3)").textContent = end.toLocaleTimeString();

    for (let i = 1; i < next_race["events"]; i++) {
        let event = next_race["events"][i];
        let event_start = new Date(event["start_time_local"]);
        let event_end = new Date(event["end_time_local"]);
        document.querySelector(`#event${i} h4`).textContent = event["event"];
        document.querySelector(`#event${i} span:nth-child(1)`).textContent = event_start.toDateString();
        document.querySelector(`#event${i}span:nth-child(2)`).textContent = event_start.toLocaleTimeString();
        document.querySelector(`#event${i} span:nth-child(3)`).textContent = event_end.toLocaleTimeString();
    }
}