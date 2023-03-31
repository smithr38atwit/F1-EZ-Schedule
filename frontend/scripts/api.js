const api = "http://127.0.0.1:9000/";


function showSnackbar(message, type) {
    const snackbar = document.getElementById('snackbar');
    snackbar.textContent = message;
    snackbar.classList.add(type, 'show');
    setTimeout(() => snackbar.classList.remove(type, 'show'), 3000);
}

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