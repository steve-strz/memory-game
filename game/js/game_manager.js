window.addEventListener("load", () => {
    loadGame();
    if(get("setMusic") == "true"){
        let element = document.getElementById("pressMusicTips");
        element.style.display = "block";
    }
})
window.addEventListener("DOMContentLoaded", () => {
    //Create timer
    let timer = new Timer();
    setTime(timer);
})
document.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    var audioMusic = new Audio("sounds/background_game_sound.mp3")
    if(charStr === "m" && !isMusicPlayed && get("setMusic") == "true"){
        audioMusic.volume = 0.1;
        audioMusic.play();
        isMusicPlayed = true;
    }
};

let isMusicPlayed = false;
let tabCards = [];
let tabPlayersObject = [];
let pickedCards = [];
let canPick = false;
let cardsNumber = get("Difficulty")*2;
let playerTurn = 0;
let cardsCache = [];
let rewardPoints = 10;

async function loadGame(){

    //get players name
    let tabPlayersName = [];
    tabPlayersName = JSON.parse(get("Players Name"));

    //create players
    let parentElement = document.getElementById("playerList");

    for(let i = 0; i < get("Number Players"); i++){
        let playerObject = new Player(tabPlayersName[i])

        let element1 = document.createElement("div");
        let element2 = document.createElement("div");

        element1.id = "playerId_" + i;
        element2.id = "playerId_" + i + "_score";

        element1.classList.add("players-list-element");
        element2.classList.add("players-list-element-score");

        element1.innerHTML = playerObject.getName();
        element2.innerHTML = playerObject.getScore();

        element1.appendChild(element2);
        parentElement.appendChild(element1);
        
        tabPlayersObject[i] = playerObject;
    }

    //Create cards
    let nb = get("Difficulty");
    let parent = document.getElementById("cardsContent");

    for(let i = 1; i <= nb; i++){
        let cardObjet1 = new Card(i, 1, "card_game_back", "card_game_"+i);
        let cardObjet2 = new Card(i, 2, "card_game_back", "card_game_"+i);

        tabCards.push(cardObjet1);
        tabCards.push(cardObjet2);
    }

    tabCards.sort(() => Math.random() -0.5);
    console.log(tabCards);

    for(let i = 0; i < tabCards.length; i++){
        let element = document.createElement("div");
        let html = "<img src='img/" + tabCards[i].getBackFace() + ".png' width=100% onclick='cardChecker(this)' id='" + tabCards[i].getIdAndPair() + "'/>"

        element.classList.add("card");
        element.id = tabCards[i].getIdAndPair();
        element.innerHTML = html;
        
        parent.appendChild(element);
        await timer(100);
    }
    let element = document.getElementById("playerTurnText");
    element.innerHTML = tabPlayersObject[playerTurn].getName();
    canPick = true;
}


async function cardChecker(cardSent){
    if(canPick == true){
        let card = cardSent.id;
        
        let i = 0;
        while(tabCards[i].getIdAndPair() != card){
            i++
        }
        
        if(tabCards[i] != pickedCards[0]){
            playSound("pick_card.wav")
            cardsCache.push(cardSent, tabCards[i].getBackFace());
            showCards(cardSent, tabCards[i].getFrontFace());
            cardSent.classList.remove("card-rotate2-class")
            if(pickedCards.length > 0){
                canPick = false;
                pickedCards.push(tabCards[i]);
                if(pickedCards[0].getId() == pickedCards[1].getId()){
                    setTimeout(async () => {
                        disableCard(pickedCards[0]);
                        disableCard(pickedCards[1]);
                        increaseScore();
                        checkCardsNumber();
                        cardsCache = [];
                        pickedCards = [];
                        playSound("success_card.wav");
                        await timer(400);
                        canPick = true;
                    }, 1000)
                }else{
                    setTimeout(async() => {
                        hideCard(cardsCache);
                        playSound("wrong_cards.wav")
                        await timer(400);
                        nextTurn();
                        pickedCards = [];
                        canPick = true;
                    }, 1000)
                }
            }else{
                pickedCards.push(tabCards[i]);
            }
            console.log(pickedCards)
        }
    }
}

function disableCard(cardToDisable){
    let card = document.getElementById(cardToDisable.getIdAndPair());
    card.classList.add("card-found");
    card.children[0].setAttribute("onclick", "");
}

function nextTurn(){
    let element = document.getElementById("playerTurnText");
    if(playerTurn == (get("Number Players")-1)){
        playerTurn = 0;
    }else{
        playerTurn++;
    }
    element.innerHTML = tabPlayersObject[playerTurn].getName();
}

function increaseScore(){
    tabPlayersObject[playerTurn].increaseScore(rewardPoints);
    rewardPoints++;
    refreshScoreboard();
}

function refreshScoreboard(){
    for(let i = 0; i < tabPlayersObject.length; i++){
        let element = document.getElementById("playerId_" + i.toString() + "_score");
        element.innerHTML = tabPlayersObject[i].getScore();
    }
}

function checkCardsNumber(){
    cardsNumber -= 2;
    if(cardsNumber == 0){
        let winner;
        let score = 0;
        let element = document.getElementById("endGameContent");
        for(let i = 0; i < tabPlayersObject.length ; i++){
            if(tabPlayersObject[i].getScore() > score){
                score = tabPlayersObject[i].getScore();
                winner = tabPlayersObject[i].getName();
            }
        }
        console.log(winner);
        playSound("success.wav");
        document.getElementById("gamePlatform").style.display = "none";
        element.children[0].children[1].innerHTML = "THE WINNER IS <br/>" + winner;
        element.children[0].children[2].innerHTML = "Total time : " + document.getElementById("clock").innerHTML;
        element.style.display = "flex";
    }
}

async function showCards(cardSent, frontFace){
    cardSent.classList.add("card-rotate-show1-class")
    await timer(130);
    cardSent.classList.remove("card-rotate-show1-class")
    cardSent.setAttribute("src", "img/" + frontFace + ".png");
    cardSent.classList.add("card-rotate-show2-class")
    await timer(130);
    cardSent.classList.remove("card-rotate-show2-class")
}

async function hideCard(cardsToHide){
    cardsToHide[0].classList.add("card-rotate-hide1-class")
    cardsToHide[2].classList.add("card-rotate-hide1-class")
    await timer(130);
    cardsToHide[0].classList.remove("card-rotate-hide1-class")
    cardsToHide[2].classList.remove("card-rotate-hide1-class")
    cardsToHide[0].setAttribute("src", "img/" + cardsToHide[1] + ".png");
    cardsToHide[2].setAttribute("src", "img/" + cardsToHide[3] + ".png");
    cardsToHide[0].classList.add("card-rotate-hide2-class")
    cardsToHide[2].classList.add("card-rotate-hide2-class")
    await timer(130);
    cardsToHide[0].classList.remove("card-rotate-hide2-class")
    cardsToHide[2].classList.remove("card-rotate-hide2-class")
    cardsCache = [];
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function playSound(sound){
    if(get("setSounds") == "true"){
        let audio = new Audio("sounds/" + sound);
        audio.volume = 0.1;
        audio.play();
    }
}

function setTime(timer){
    setTimeout(() => {
        timer.setTime();
        setTime(timer);
    }, 1000)
}