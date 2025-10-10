// Declaring screen width and height constants
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Declaring image path constant
const image = "../images/cards.png";

// Declaring fall time constant
const fallTime = 10000;

// Function to create a falling card effect
function createFallingCard() {
    // Declaring a constant to make the card into an element
    const card = document.createElement("img");

    // Setting the cards source image and class name for styling
    card.src = image;
    card.className = "falling-card";

    // Setting a random x position for the card and a set y position above the screen for the card
    card.style.left = Math.random() * screenWidth + "px";
    card.style.top = -128 + "px";

    // Adding the card to the page
    document.body.appendChild(card);

    // Arrow function to make sure the card is deleted after 10000ms
    setTimeout(() => {
        document.body.removeChild(card);
    }, fallTime);
}

// Set interval to create falling cards every 500ms
setInterval(createFallingCard, 500);



// Getting the button through it's ID and waiting for the user to click it
const expandButton = document.getElementById("expand-container");
expandButton.addEventListener("click", expandContainer);

// Expand the container when the any of the "GAME" links are clicked
function expandContainer() {
    // Creating constants for both the container and its styling
    const container = document.querySelector(".container");
    const containerStyle = document.querySelector(".container-style");

    // Removes all of the login content
    containerStyle.innerHTML = ""

    // Replacing the old old container + styling with the container + styling for the game
    container.classList.replace("container", "container-game");
    containerStyle.classList.replace("container-style", "container-game-style");

    // Setting a timer before the page changes
    setTimeout(() => {window.location.href = "game.html"}, 1000);
};