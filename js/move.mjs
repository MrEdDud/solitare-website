export class Move {
    constructor(deal) {
        this.deal = deal;
        this.context = document.getElementById("game").getContext("2d");
        this.canvas = document.getElementById("game");
        this.canvas.width = window.innerWidth/1.4;
        this.canvas.height = window.innerHeight/1.5;

        this.tableCards = deal.tableCards;
        this.playerCard = deal.pCards;
        this.storedCards = [[], [], [], []]; // clubs, diamonds, hearts, spades

        this.suitIndex = {
            "clubs": 0, 
            "diamonds": 1, 
            "hearts": 2, 
            "spades": 3
        };
    }

    onCardClick(card) {
        // Moving the card to stored cards
        if (this.canMoveToStore(card)) {
            this.moveToStore(card);
            this.deal.redraw();
        } else if (card.rank === 13) { // If theres an empty column for a king then move the king there
            const emptyColumn = this.tableCards.find(col => col.length === 0);
            if (emptyColumn) {   
                this.moveToEmptyColumn(card, emptyColumn);
                this.deal.redraw();
            }
        } else {
            // Checking each column to see if the card can be moved there
            for (let col = 0; col < this.tableCards.length; col++) {
                if (this.canMoveToColumn(card, this.tableCards[col])) {
                    this.moveToColumn(card, this.tableCards[col]);
                    this.deal.redraw();
                }
            }
        }
    }

    canMoveToStore(card) {
        const index = this.suitIndex[card.suit];
        const storePile = this.storedCards[index];

        if (storePile.length === 0) {
            return card.rank === 1;
        }

        const topCard = storePile[storePile.length - 1];
        return card.rank === topCard.rank + 1;
    }

    moveToStore(card) {
        const index = this.suitIndex[card.suit];
        this.storedCards[index].push(card);

        if (card.isPlayerCard) {
            this.deal.nextCard.hasBeenPlayed = true;
            this.playerCard.pop();
        } else {
            for (let col = 0; col < this.tableCards.length; col++) {
                const column = this.tableCards[col];
                const cardIndex = column.indexOf(card);
                if (cardIndex !== -1) {
                    column.splice(cardIndex, 1);

                    if (column.length > 0) {
                        column[column.length - 1].faceUp = true;
                    }
                    break;
                }
            }
        }
    }

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
        if (card.isPlayerCard) {
            this.deal.nextCard.hasBeenPlayed = true;
            const index = this.playerCard.indexOf(card);
            if (index !== -1) {
                this.playerCard.splice(index, 1)
            }
        } else {
            for (let col = 0; col < this.tableCards.length; col++) {
                const currentColumn = this.tableCards[col];
                const cardIndex = currentColumn.indexOf(card);
                if (cardIndex !== -1) {
                    currentColumn.splice(cardIndex, 1);

                    if (currentColumn.length > 0) {
                        currentColumn[currentColumn.length - 1].faceUp = true;
                    }                   
                    break;
                }
            }
        }

        column.push(card);
    }

    moveToEmptyColumn(card, emptyColumn) {
        if (card.rank === 13) {
            emptyColumn.push(card);

            if (card.isPlayerCard) {
                this.playerCard.pop();
                this.deal.nextCard.hasBeenPlayed = true;
            } else {
                for (let col = 0; col < this.tableCards.length; col++) {
                    const currentColumn = this.tableCards[col];
                    const cardIndex = currentColumn.indexOf(card);
                    if (cardIndex !== -1) {
                        currentColumn.splice(cardIndex, 1);
                        break;
                    }
                }
            }
            return true;
        }
        return false;
    }

    drawStoredCards() {
        const startX = this.canvas.width - 94;
        const startY = 25;
        const gap = 100;

        for (let i = 0; i < this.storedCards.length; i++) {
            const pile = this.storedCards[i];
            if (pile.length > 0) {
                const topCard = pile[pile.length - 1];
                
                const img = new Image();
                img.src = `images/cards/${topCard.img}`;

                img.onload = () => {
                    this.context.drawImage(img, startX, startY + i * gap, img.width, img.height);
                };
            }
        }
    }

    checkWin() {
        const win = this.storedCards.every(cards => cards.length === 13);

        if (win) {
            return true;
        }
    }
}