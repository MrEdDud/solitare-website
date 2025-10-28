// Selecting all the stuff inside <tr> tags except for the first ones as they are the titles
const rows = document.querySelectorAll(".scores tr:not(:first-child)");
const entries = [];

// For every entry in local storage
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // If the key starts with leaderboard then we can use it
    if (key.startsWith("leaderboard_")) {
        // Parses the information from local storage and puts it into value
        const value = JSON.parse(localStorage.getItem(key));
        // If the value has a name and time then push it into the entries array
        if (value && value.name && value.time) {
            entries.push(value);
        }
    }
}

// For each row change the name and time to the ones selected
rows.forEach((row, index) => {
        const name = row.children[0];
        const time = row.children[1];
        const entry = entries[index];

        if (entry) {
            name.textContent = entry.name;
            time.textContent = entry.time;
        }
    }); 