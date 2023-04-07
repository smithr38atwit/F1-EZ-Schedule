const api = "http://127.0.0.1:9000/";


/**
 * Displays a popup snackbar with the desired message and type
 * @param {string} message The message to display in the snackbar
 * @param {string} type The css class to apply to the snackbar
 */
function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.add(type, 'show');
    setTimeout(() => snackbar.classList.remove(type, 'show'), 3000);
}


/**
 * Gets data from backend 
 * @param {string} path The route of the desired endpoint
 * @returns JSON data retrieved from API
 */
async function get(path) {
    let data;
    try {
        const response = await fetch(api + path, { method: "GET" });
        console.debug(`GET ${api + path}: `)
        data = await response.json();
        console.debug(data);
    } catch (error) {
        showSnackbar('Could not retrieve data', 'warning')
        console.debug(error);
        return false;
    }
    return data;
}


export default get;