// Importing the Card class
import {Card} from './card.mjs';

// Using the buildPack method to create a pack of cards
const cards = new Card();
cards.buildPack();

// Declaring screen width and height constants
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

// Declaring fall time constant
const fallTime = 10000;

// Function to create a falling card effect
function createFallingCard() {
    // Declaring image path constant
    const index = Math.floor(Math.random() * cards.pack.length)
    const image = `images/cards/${cards.pack[index].img}`;
    
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

    // Card is deleted after 10000ms
    setTimeout(() => {document.body.removeChild(card)}, fallTime);
}

// Set interval to create falling cards every 500ms
setInterval(createFallingCard, 500);
