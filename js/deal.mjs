// Import the class and create an instance
import {Card} from './card.mjs';

// Creating an instance of the class
const cards = new Card();

// Building the pack, preloading the cards and dealing the cards
cards.buildPack();
cards.preLoadImages();
let boardsCards = cards.boardCards();
let playersCards = cards.playerCards();

export class Deal {
    constructor(move) {
        // Linking the move class to deal so they share the same data
        this.move = move;

        // Setting up the context
        this.context = document.getElementById("game").getContext("2d");

        // Setting up the arrays for the players cards and board cards and other useful arrays
        this.pCards = playersCards;
        this.bCards = boardsCards;
        this.wastedCards = [];
        this.nextCard = [];

        // A 2D array which will hold every card in every column
        this.tableCards = [[], [], [], [], [], [], []];
    }

    // Drawing the base card
    drawBaseCard() {
        // Setting the image to the back of the card
        this.playerCardImg = new Image();
        this.playerCardImg.src = "images/cards/back_of_black.png";

        // When the image loads then display the card at the top left of the canvas
        this.playerCardImg.onload = () => {
            this.cardWidth = this.playerCardImg.width;
            this.cardHeight = this.playerCardImg.height;
            
            this.context.drawImage(this.playerCardImg, 25, 25, this.cardWidth, this.cardHeight);
        };
    }

    // Dealing the next card to the player
    dealNextCard() {
        // Checks if the next card has not been played
        if (this.nextCard && !this.nextCard.hasBeenPlayed) {
            // Pushes the card to wastedCards so I can recycle the cards later
            this.wastedCards.push(this.nextCard);
            this.drawNextCard(); // Draws the next card
        }
        
        // Checking if there are cards left in the players deck
        if (this.pCards.length > 0) {
            // Getting the next card from the players deck
            this.nextCard = this.pCards.pop();

            // Setting the properties of the next card
            this.nextCard.isPlayerCard = true;
            this.nextCard.faceUp = true;
            this.nextCard.hasBeenPlayed = false;
            
            this.drawNextCard();
        } else {
            // If there are no cards left, reset the players deck with the wasted cards
            this.pCards = this.wastedCards.reverse();
            this.wastedCards = [];
            this.dealNextCard();
        }
    }

    drawNextCard() {
        // Drawing the next card on the canvas when the image loads
        const drawX = 25;
        const drawY = 125;
        let img = new Image();
        img.src = `images/cards/${this.nextCard.img}`;
        img.onload = () => {
            this.context.drawImage(img, drawX, drawY, img.width, img.height);
        };
        // Resetting the shadow
        this.context.shadowColor = "transparent";
    }

    seperateTableCards() {
        let index = 0;

        // Looping through each column and dealing one extra card into it per loop
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                // Checking if the index is less than the length of the boards cards
                if (index < this.bCards.length) {
                    // Sets the card to whatever index is in the boards cards
                    const card = this.bCards[index];
                    card.faceUp = (row === col); // Makes sure the top card is facing up
                    
                    // Pushes the card to the table cards 2D array then increases the index
                    this.tableCards[col].push(card);
                    index++;
                }
            }
        }
    }

    // Dealing the tables cards
    drawTableCards() {
        // Setting the initial position of the cards
        let drawX = 350;
        let drawY = 25;

        // Clears the canvas
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        // Looping through every card in every column
        for (let col = 0; col < this.tableCards.length; col++) {
            for (let row = 0; row < this.tableCards[col].length; row++) {
                // Getting the card and setting up a new image
                const card = this.tableCards[col][row];
                const img = new Image();

                // Setting shadows so the cards are more visible
                this.context.shadowColor = "rgba(0, 0, 0, 0.4)";
                this.context.shadowBlur = 10;
                this.context.shadowOffsetX = 3;
                this.context.shadowOffsetY = 3;

                // Checking if the card is facing up or down then setting the image
                if (card.faceUp) {
                    img.src = `images/cards/${card.img}`;
                } else {
                    img.src = `images/cards/${card.imgBack}`;
                }

                // When the image loads it will draw the image
                img.onload = () => {
                    // Doing "drawX + col * 100" and the same with the y axis to seperate the cards nicely
                    this.context.drawImage(img, drawX + col * 100, drawY + row * 30, img.width, img.height);
                };
            }
        }
    }

    redraw() {
        // Clears the canvas
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        
        // Redraws everything
        this.drawNextCard();
        this.drawTableCards();
        this.drawBaseCard();
        this.move.drawStoredCards();
    }
}