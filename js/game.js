// Timer variables
let counter = 0;
let timerElement = document.getElementById("timer");

// Timer for the game
function timer() {
    counter++;
    timerElement.innerHTML = counter;
};



const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"];

const pack = [];

function buildPack() {
    for (let suit of suits){
        for (let rank of ranks) {
            pack.push({
                suit: suit,
                rank: rank,
                img: `${rank}_of_${suit}.png` // Make sure the files are named like this
            })
        }
    }
}

function deal(){
    const index = Math.floor(Math.random() * pack.length)

    const card = pack[index];
    const imgElement = document.querySelector("#CardHolder");
    imgElement.src = "images/" + card.img; // Make sure you have the correct file location

    pack.splice(index,1);
    console.log(pack.length)
}

window.onload = ()=> {
    buildPack();
    deal();
}