// 
let expandButton = document.getElementById("expand-container");
// 
expandButton.addEventListener("click", expandContainer);

// Expand the container when the any of the "GAME" links are clicked
function expandContainer() {
    const container = document.querySelector(".container-style");
    console.log(container);
    container.classList.replace("container-style", "container-expanded");
    console.log(container);
    setTimeout(() => {window.location.href = "game.html"}, 3000);
};

// Timer variables
let counter = 0;
let timerElement = document.getElementById("timer");

// Timer for the game
function timer() {
    counter++;
    timerElement.innerHTML = counter;
};