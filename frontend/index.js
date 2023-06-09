import getCalendar from "./scripts/race-calendar.js";
import getStandings from "./scripts/standings.js";
import getNews from "./scripts/news.js";


/* ----- Event Listeners ----- */

window.onload = onLoad;
const navButtons = document.querySelectorAll('.nav-button');
for (let element of navButtons) {
    element.addEventListener('click', () => navClick(element));
}
document.getElementById('full-schedule-btn').addEventListener('click', () => document.getElementById('full-schedule').style.height = '100%');
document.getElementById('sched-close-btn').addEventListener('click', () => document.getElementById('full-schedule').style.height = '0');


/* ----- Event Functions ----- */

/**
 * Calls initialization functions 
 */
function onLoad() {
    // Select first tab as default
    document.querySelector("nav a:first-child").click();

    getCalendar();
    getStandings();
    getNews();
}

/**
 * Switches selected nav tab on click
 * @param {Element} element The selected navigation tab
 */
function navClick(element) {
    let navTabs = document.getElementsByClassName("nav-button");
    // Remove selected class from all tabs
    for (let tab of navTabs) {
        tab.classList.remove('selected');
    }
    element.classList.add("selected");
}