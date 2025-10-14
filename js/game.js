// 28 CARDS ON THE TABLE
// REST IN THE DECK
// ONLY KING CAN BE PLACED ON EMPTY SPOTS
// CARDS CAN BE PLACED IN DESCENDING ORDER AND ALTERNATING COLORS

// Timer variables
let seconds = 1;
let timerElement = document.getElementById("timer");

// Timer for the game
function timer() {
    timerElement.innerHTML = `00:${seconds}`;
    seconds++;
};



function deal(){
    const index = Math.floor(Math.random() * pack.length)

    const card = pack[index];
    const imgElement = document.querySelector("#CardHolder");
    imgElement.src = "images/cards/" + card.img;

    pack.splice(index,1);
    console.log(pack.length)
}



window.onload = ()=> {
    setInterval(timer, 1000);
    buildPack();
    deal();
}