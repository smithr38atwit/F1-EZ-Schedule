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

    document.querySelector(".location").textContent = next_race["location"];
    document.querySelector(".date-time span:nth-child(3)").textContent;
}