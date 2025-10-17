// Declaring screen width and height constants
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
const pack = [];

function buildPack() {
    for (let suit of suits){
        for (let rank of ranks) {
            pack.push({
                suit: suit,
                rank: rank,
                img: `${rank}_of_${suit}.png`
            })
        }
    }
}

buildPack();

// Declaring fall time constant
const fallTime = 10000;

// Function to create a falling card effect
function createFallingCard() {
    // Declaring image path constant
    const index = Math.floor(Math.random() * pack.length)
    const image = `../images/cards/${pack[index].img}`;
    
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
    setTimeout(() => {document.body.removeChild(card)}, fallTime);
}

// Set interval to create falling cards every 500ms
setInterval(createFallingCard, 500);