// Declaring screen width and height constants
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Declaring image path constant
const image = "../images/cards.png";

// Declaring fall time constant
const fallTime = 10000;

// Function to create a falling card effect
function createFallingCard() {
    const card = document.createElement("img");
    card.src = image;
    card.className = "falling-card";
    card.style.left = Math.random() * screenWidth + "px";
    card.style.top = -128 + "px";

    document.body.appendChild(card);

    setTimeout(() => {
        document.body.removeChild(card);
    }, fallTime);
}

// Set interval to create falling cards every 500 milliseconds
setInterval(createFallingCard, 500);