// Import the class and create an instance
import {Card} from './card.mjs';

const cards = new Card();

// Building the pack and dealing the cards
cards.buildPack();
cards.preLoadImages();
let boardsCards = cards.boardCards();
let playersCards = cards.playerCards();

export class Deal {
    // Setting up the players cards
    constructor() {
        this.pCards = playersCards;
        this.bCards = boardsCards;
        this.nextCard = null;
        this.context = document.getElementById("game").getContext("2d");

        this.wastedCards = [];
        this.nextCard = [];

        this.tableCards = [[], [], [], [], [], [], []];
    }

    // Dealing the next card to the player
    dealNextCard() {
        // Checking if there are cards left in the players deck
        if (this.pCards.length > 0) {
            // Getting the next card from the players deck and putting it in the wasted cards array
            this.nextCard = this.pCards.pop();
            this.wastedCards.push(this.nextCard);

            // Drawing the next card on the canvas
            const drawX = 25;
            const drawY = 125;
            let img = new Image();
            img.src = `images/cards/${this.nextCard.img}`;
            img.onload = () => {
                this.context.drawImage(img, drawX, drawY, img.width, img.height);
            };
        } else {
            // If there are no cards left, reset the players deck with the wasted cards
            this.pCards = this.wastedCards.reverse();
            this.wastedCards = [];
        }
    }

    seperateTableCards() {
        let index = 0;

        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                if (index < this.bCards.length) {
                    const card = this.bCards[index];
                    card.faceUp = (row === col); // Makes sure the top card is facing up
                    
                    this.tableCards[col].push(card);
                    index++;
                }
            }
        }
    }

    // Dealing the tables cards
    drawTableCards() {
        let drawX = 350;
        let drawY = 25;

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        for (let col = 0; col < this.tableCards.length; col++) {
            for (let row = 0; row < this.tableCards[col].length; row++) {
                const card = this.tableCards[col][row];
                const img = new Image();

                // Setting shadow for the cards so they are more visible
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

                img.onload = () => {
                    this.context.drawImage(img, drawX + col * 100, drawY + row * 30, img.width, img.height);
                };
            }
        }
    }
}