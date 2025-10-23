// Importing the class
import {Deal} from './deal.mjs';

// Creating instances of the deal classes
const deal = new Deal();

class Game {
    // Setting up the canvas and timer elements
    constructor() {
        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth/1.4;
        this.canvas.height = window.innerHeight/1.5;
        this.context = this.canvas.getContext("2d");
        
        this.seconds = 1;
        this.timerElement = document.getElementById("timer");

        // Setting up the players card image and position
        this.playerCardImg = new Image();
        this.playerCardImg.src = "images/cards/back_of_black.png";
        this.pCardX = 25;
        this.pCardY = 25;
    }

    // Timer for the game
    timerCount() {
        this.timerElement.innerHTML = `00:${seconds}`;
        this.seconds++;
    }

    // Drawing the base cards
    drawBaseCard() {
        this.playerCardImg.onload = () => {
            this.cardWidth = this.playerCardImg.width;
            this.cardHeight = this.playerCardImg.height;

            this.context.drawImage(this.playerCardImg, this.pCardX, this.pCardY, this.cardWidth, this.cardHeight);
        };
    }

    // Checking if the card has been clicked
    isCardClicked(mouseX, mouseY) {
        return mouseX >= this.pCardX &&
               mouseX <= this.pCardX + this.cardWidth &&
               mouseY >= this.pCardY &&
               mouseY <= this.pCardY + this.cardHeight;
    }

    dealPlayerCards() {
        // Adding event listeners for mouse movement
        this.canvas.addEventListener("mousemove", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            // Changing the cursor to pointer when hovering over the card
            if (mouseX >= this.pCardX && mouseX <= this.pCardX + this.cardWidth && mouseY >= this.pCardY && mouseY <= this.pCardY + this.cardHeight) {
                this.canvas.style.cursor = "pointer";
            } else {
                this.canvas.style.cursor = "default";
            }
        });  
        // Adding event listener for mouse click
        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            // Deals the next card when its clicked
            if (this.isCardClicked(mouseX, mouseY)) {
                deal.dealNextCard();
            }
        });   
    }
}

// Creating an instance of the game class and starting the game
const game = new Game();

game.drawBaseCard();
game.dealPlayerCards();