export class Card {
    // Setting up the suits, ranks, and pack array
    constructor() {
        this.suit = ["hearts", "diamonds", "clubs", "spades"];
        this.rank = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];
        this.pack = [];
    }
    
    // Making the pack of cards and putting them in the pack array
    buildPack() {
        for (let suits of this.suit){
            for (let ranks of this.rank) {
                this.pack.push({
                    suit: suits,
                    rank: ranks,
                    img: `${ranks}_of_${suits}.png`,
                    imgBack: `back_of_black.png`
                })
            }
        }
        // Returning the pack of cards so I can use it for my background animation
        return this.pack;
    }

    // Dealing 28 cards to the board
    boardCards() {
        // Array to hold the 28 cards dealt to the board
        this.tableCards = [];

        // Dealing 28 cards to the board
        for (let i = 0; i < 28; i++) {
            this.index = Math.floor(Math.random() * this.pack.length)
            this.card = this.pack[this.index];
            this.tableCards.push(this.card);
            this.pack.splice(this.index,1);
        }
        // Returning the tables cards
        return this.tableCards;
    }

    playerCards() {
        // Making the rest of the pack the players cards
        this.playersCards = this.pack;

        // Shuffling the cards for the player
        for (let i = this.playersCards.length; i > 0; i--) {
            this.index = Math.floor(Math.random() * i);
            [this.playersCards[i - 1], this.playersCards[this.index]] = [this.playersCards[this.index], this.playersCards[i - 1]];
        }
        // Returning the players cards
        return this.playersCards;
    }

    // Preloads the images to prevent wierd z-index problems
    preLoadImages() {
        this.image = {};

        this.pack.forEach(card => {
            const img = new Image();
            img.src = `images/cards/${card.img}`;
            this.image[card.img] = img;

            const imgBack = new Image();
            imgBack.src = `images/cards/${card.imgBack}`;
            this.image[card.imgBack] = imgBack;
        });
    }
}