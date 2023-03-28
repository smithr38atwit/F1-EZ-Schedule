import getCalendar from "./scripts/race-calendar.js";


/* ----- Event Listeners ----- */
window.onload = onLoad;
const navButtons = document.querySelectorAll('.nav-button');
for (let element of navButtons) {
    element.addEventListener('click', () => navClick(element));
}


/* ----- Event Functions ----- */
function onLoad() {
    // Select first tab as default
    document.querySelector("nav a:first-child").click();

    getCalendar();
}

// Switch selected nav tab on click
function navClick(element) {
    let navTabs = document.getElementsByClassName("nav-button");
    // Remove selected class from all tabs
    for (let tab of navTabs) {
        tab.classList.remove('selected');
    }
    element.classList.add("selected");
}