export class Move {
    constructor(deal) {
        // Linking the deal class to move so they share the same data
        this.deal = deal;

        // Setting up the canvas and context
        this.context = document.getElementById("game").getContext("2d");
        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth/1.4;
        this.canvas.height = window.innerHeight/1.5;

        // Getting the tables and players cards and also setting up a 2D array for the stored cards
        this.tableCards = deal.tableCards;
        this.playerCard = deal.pCards;
        this.storedCards = [[], [], [], []]; // The order they get stored: clubs, diamonds, hearts, spades

        // An object which helps to translate suits to a number
        this.suitIndex = {
            "clubs": 0, 
            "diamonds": 1, 
            "hearts": 2, 
            "spades": 3
        };

        // Creating an audio object for when the cards move
        this.cardSound = new Audio("./sounds/play_card.mp3");
    }

    onCardClick(card) {
        let move = false;

        console.log(this.tableCards); // So I can cheat and see every card on the table

        // If theres an empty column for a king then move the king there
        if (card.rank === 13) { 
            // Finding an empty column and setting it to emptyColumn
            const emptyColumn = this.tableCards.find(col => col.length === 0);
            if (emptyColumn) {   
                // Moves the king to the empty column, plays a sound then redraws the canvas
                this.moveToEmptyColumn(card, emptyColumn);
                this.cardSound.play();
                this.deal.redraw();
                let move = true;
            }
        }

        // Checking if we can move the card to storage
        if (this.canMoveToStore(card || card - 1)) {
            // Moves the cards to storage, plays a noise and redraws the canvas
            this.moveToStore(card);
            this.cardSound.play();
            this.deal.redraw();
        } else if (move === false) { // To prevent kings from duplicating
            // Checking each column to see if the card can be moved there
            for (let col = 0; col < this.tableCards.length; col++) {
                if (this.canMoveToColumn(card, this.tableCards[col])) {
                    // Moving the card to the column, playing a sound then redrawing the canvas
                    this.moveToColumn(card, this.tableCards[col]);
                    this.cardSound.play();
                    this.deal.redraw();
                    // Stopping the for loop
                    break;
                }
            }
        }

        this.checkWin();
    }

    canMoveToStore(card) {
        // Setting the index as what suit the card is
        const index = this.suitIndex[card.suit];
        // Setting the pile in storage as whatever suit the card is in storedCards
        const storePile = this.storedCards[index];

        // If there is no cards in storage then only allow the ace cards to move there
        if (storePile.length === 0) {
            return card.rank === 1;
        }

        // Getting the top card from the storage pile
        const topCard = storePile[storePile.length - 1];
        // Returns the cards rank as the top cards rank + 1 to allow only a card that one rank higher to be moved
        return card.rank === topCard.rank + 1 || card.rank === topCard.rank; // I did "|| card.rank === topCard.rank" just incase you accidentally duplicate a card
    }

    moveToStore(card) {
        // Setting the index as what suit the card is
        const index = this.suitIndex[card.suit];
        // Pushing the card to the correct storage
        this.storedCards[index].push(card);

        // Checking if the card is the players card or the boards card
        if (card.isPlayerCard) {
            // Setting the card as played to stop duplication
            this.deal.nextCard.hasBeenPlayed = true;
            // Removing the card
            this.playerCard.pop();
        } else {
            // For each column
            for (let col = 0; col < this.tableCards.length; col++) {
                // Getting the current column from tableCards
                const column = this.tableCards[col];
                // Getting the index of the card
                const cardIndex = column.indexOf(card);
                // Checking if the card exists in this column
                if (cardIndex !== -1) {
                    // Removes the card from the column
                    column.splice(cardIndex, 1);

                    // Checking if the column length is bigger than 0
                    if (column.length > 0) {
                        // Setting the card at the top of the column to show its actual card
                        column[column.length - 1].faceUp = true;
                        break;
                    }
                    break;
                }
            }
        }
    }

    // Helper function which checks if the card is red
    isRed(suit) {
        return suit === "hearts" || suit === "diamonds";
    }

    canMoveToColumn(card, column) {
        // If the column is empty only a king can be moved there
        if (column.length === 0) {
            return card.rank === 13;
        }
        // Getting the top card of the column
        const topCard = column[column.length - 1];
        // Checking for opposite colours
        const isOppositeColour = (this.isRed(card.suit) && !this.isRed(topCard.suit)) || (!this.isRed(card.suit) && this.isRed(topCard.suit));
        // Checking if the card is one rank lower than the top card
        const isOneLower = card.rank === topCard.rank - 1;

        return isOppositeColour && isOneLower;
    }

    moveToColumn(card, column) {
        // Checking if the card is the players or not
        if (card.isPlayerCard) {
            // Setting the card as played to stop duplication
            this.deal.nextCard.hasBeenPlayed = true;
            // Getting the index of the card in the players deck
            const index = this.playerCard.indexOf(card);
            // Checking if the card exists in the players deck
            if (index !== -1) {
                // Removes the players card
                this.playerCard.splice(index, 1)
            }
        } else {
            // For each column check if the card exists and if it does then remove it
            for (let col = 0; col < this.tableCards.length; col++) {
                const currentColumn = this.tableCards[col];
                const cardIndex = currentColumn.indexOf(card);
                if (cardIndex !== -1) {
                    currentColumn.splice(cardIndex, 1);
                    // Checking if the column length is bigger than 0
                    if (currentColumn.length > 0) {
                        // Setting the card at the top of the column to show its actual card
                        currentColumn[currentColumn.length - 1].faceUp = true;
                        break;
                    }                   
                    break;
                }
            }
        }
        // Pushing the card to the column
        column.push(card);
    }

    moveToEmptyColumn(card, emptyColumn) {
        // Checking if the card is a king
        if (card.rank === 13) {
            // Push the card to the empty column
            emptyColumn.push(card);

            // Checking if the card is the players or not
            if (card.isPlayerCard) {
                // Remove the card and set it to being played as true
                this.playerCard.pop();
                this.deal.nextCard.hasBeenPlayed = true;
            } else {
                // For each column check if the card exists and if it does then remove it
                for (let col = 0; col < this.tableCards.length; col++) {
                    const currentColumn = this.tableCards[col];
                    const cardIndex = currentColumn.indexOf(card);
                    if (cardIndex !== -1) {
                        currentColumn.splice(cardIndex, 1);
                        break;
                    }
                }
            }
        }
    }

    drawStoredCards() {
        // Setting the initial position of the cards and the gap inbetween them
        const startX = this.canvas.width - 94;
        const startY = 25;
        const gap = 100;

        // For every card in storage
        for (let i = 0; i < this.storedCards.length; i++) {
            const pile = this.storedCards[i];
            // Checking if the pile is not empty
            if (pile.length > 0) {
                // Getting the top card in the pile
                const topCard = pile[pile.length - 1];
                
                // Creating a new image and setting its source
                const img = new Image();
                img.src = `images/cards/${topCard.img}`;

                // When the image loads the draw img
                img.onload = () => {
                    this.context.drawImage(img, startX, startY + i * gap, img.width, img.height);
                };
            }
        }
    }

    checkWin() {
        // Checking if all the storage piles are complete
        const win = this.storedCards.every(cards => cards.length === 13);
        // If the player has won then return true
        return win;
    }
}