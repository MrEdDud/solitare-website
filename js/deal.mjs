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

    // Dealing the tables cards
    dealTableCards() {
        let index = 0;
        let drawX = 125;
        let drawY = 125;
        let img = new Image();

        for (let col = 0; col < 7; col++) {
            for (let row = 0; row <= col; row++) {
                if (index < this.bCards.length) {
                    this.tableCards[col].push(this.bCards[index]);
                    img.src = `images/cards/${this.tableCards[col][row]}`;
                    console.log(img.src);
                    img.onload = () => {
                        this.context.drawImage(img, drawX, drawY, img.width, img.height);
                    }
                    index++;
                }
            }
        }

        console.log(this.tableCards)
    }
}