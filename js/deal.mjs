// Import the class and create an instance
import {Card} from './card.mjs';
const cards = new Card();

// Building the pack and dealing the cards
cards.buildPack();
let boardsCards = cards.boardCards();
let playersCards = cards.playerCards();

export class Deal {
    // Setting up the players cards
    constructor() {
        this.pCards = playersCards;
        this.nextCard = null;
        this.context = document.getElementById("game").getContext("2d");

        this.wastedCards = [];
        this.nextCard = [];
    }

    // Dealing the next card to the player
    dealNextCard() {
        // Checking if there are cards left in the players deck
        if (this.pCards.length > 0) {
            // Getting the next card from the players deck and putting it in the wasted cards array
            this.nextCard = this.pCards.pop();
            this.wastedCards.push(this.nextCard);

            // Drawing the next card on the canvas
            this.drawX = 25;
            this.drawY = 125;
            this.img = new Image();
            this.img.src = `images/cards/${this.nextCard.img}`;
            this.img.onload = () => {
                this.context.drawImage(this.img, this.drawX, this.drawY, this.img.width, this.img.height);
            };
        } else {
            // If there are no cards left, reset the players deck with the wasted cards
            this.pCards = this.wastedCards.reverse();
            this.wastedCards = [];
        }
    }

    dealTableCards() {
        // To be implemented: dealing cards to the table
    }
}