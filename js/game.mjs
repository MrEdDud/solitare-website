// Importing the class
import {Deal} from './deal.mjs';
import {Move} from './move.mjs';

const deal = new Deal();
const move = new Move(deal);

deal.move = move;

class Game {
    // Setting up the canvas and timer elements
    constructor() {
        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth/1.4;
        this.canvas.height = window.innerHeight/2;
        this.context = this.canvas.getContext("2d");

        // Setting up the time variables        
        this.minutesElement = document.getElementById("minutes");
        this.secondsElement = document.getElementById("seconds");
        this.seconds = 0;

        // Setting up the card image and position
        this.playerCardImg = new Image();
        this.playerCardImg.src = "images/cards/back_of_black.png";
        this.cardWidth = this.playerCardImg.width;
        this.cardHeight = this.playerCardImg.height;
        this.pCardX = 25;
        this.pCardY = 25;
    }

    // Timer for the game
    timerCount() {
        this.seconds++;
        this.secondsElement.innerHTML = this.timerDisplay(this.seconds % 60);
        this.minutesElement.innerHTML = this.timerDisplay(parseInt(this.seconds / 60));
    }

    // Displays the timer numbers correctly
    timerDisplay(time){
        this.timeString = time + "";
        if (this.timeString.length < 2) {
            return "0" + this.timeString;
        } else {
            return this.timeString;
        }
    }

    // Checking if the card has been clicked
    isCardClicked(mouseX, mouseY, cardX, cardY) {
        return mouseX >= cardX &&
               mouseX <= cardX + this.cardWidth &&
               mouseY >= cardY &&
               mouseY <= cardY + this.cardHeight;
    }

    // Logic for changing the mouse to a pointer when hovering over the dealing 
    mouseChange() {
        // Adding event listeners for mouse movement
        this.canvas.addEventListener("mousemove", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            // Changing the cursor to pointer when hovering over the card
            if (this.isCardClicked(mouseX, mouseY, this.pCardX, this.pCardY)) {
                this.canvas.style.cursor = "pointer";
            } else {
                this.canvas.style.cursor = "default";
            }
        });  
    }

    // Logic for dealing the players next card
    dealNextCard(removeTheCard) {
        // Adding event listener for mouse click
        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            // Deals the next card when its clicked
            if (this.isCardClicked(mouseX, mouseY, this.pCardX, this.pCardY)) {
                deal.dealNextCard(removeTheCard);
            }
        });  
    }

    // Logic for changing the mouse to a pointer + allowing the user to click the cards to move them
    playCards() {
        // Adding event listeners for mouse movement
        this.canvas.addEventListener("mousemove", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // For all the boards cards
            for (let col = 0; col < deal.tableCards.length; col++) {
                for (let row = 0; row < deal.tableCards[col].length; row++) {
                    const cardX = 350 + col * 100;
                    const cardY = 25 + row * 30;

                    // Changing the cursor to pointer when hovering over the card
                    if (this.isCardClicked(mouseX, mouseY, cardX, cardY)) {
                        this.canvas.style.cursor = "pointer";
                    }
                }
            }
            
            // For the players cards
            const cardX = 25;
            const cardY = 125;
            // If the cursor is over these coordinates then change the icon to a pointer
            if (this.isCardClicked(mouseX, mouseY, cardX, cardY)) {
                this.canvas.style.cursor = "pointer";
            }
        }); 

        // Adding event listeners for mouse clicks
        this.canvas.addEventListener("click", (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            const cardX = 25;
            const cardY = 125;

            let clickedACard = null;

            // Looping through all the cards in each column on the table
            for (let col = 0; col < deal.tableCards.length; col++) {
                for (let row = 0; row < deal.tableCards[col].length; row++) {
                    const card = deal.tableCards[col][row];
                    const cardX = 350 + col * 100;
                    const cardY = 25 + row * 30;

                    // If the card is facing up and has been clicked then it will move the card
                    if (card.faceUp && this.isCardClicked(mouseX, mouseY, cardX, cardY)) {
                        clickedACard = card;
                        break;
                    }
                }
            }

            // If the players card has been clicked then deal the next card in their deck
            if (this.isCardClicked(mouseX, mouseY, cardX, cardY)) {
                clickedACard = deal.nextCard;
            }

            // Moves the card when clicked on
            if (clickedACard) {
                move.onCardClick(clickedACard);
            }
        });
    }

    // Logic for the win condition
    winner() {
        // If the player has won then reset the timer
        if (move.checkWin()) {
            clearInterval(this.timerCount());

            // Getting the data for the leaderboards
            const leaderboardData = { 
                name: sessionStorage.getItem("loggedInUser"),
                time: `${this.minutesElement.innerHTML}:${this.secondsElement.innerHTML}`,
            }

            // Sending the leaderboard data to local storage
            const leaderboardStr = JSON.stringify(leaderboardData);
            localStorage["leaderboard_" + leaderboardData.name] = leaderboardStr;

            // Stopping all clicks
            this.canvas.style.pointerEvents = "none";
        }
    }
}

// A function that starts the game when the button is pressed
window.startGame = function() {
    // Creating an instance of the game class and starting the game
    const game = new Game();

    // Calling all the neccassary methods
    deal.drawBaseCard();
    deal.seperateTableCards();

    // Making sure both move.mjs and deal.mjs use the same cards
    move.tableCards = deal.tableCards;
    move.playerCard = deal.pCards;

    deal.drawTableCards();
    game.mouseChange();
    game.dealNextCard();
    game.playCards();
    
    game.winner();

    // Sets the game timer to run every second
    setInterval(()=>game.timerCount(), 1000)      
};