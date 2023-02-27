//RESET LOCAL DATA TO AVOID PROBLEMS WITH NEW PARTIES
window.addEventListener("load", () => {
    remove("Number Players");
    remove("Difficulty");
    remove("Players Name");
    checkSoundsSettings();
})
window.addEventListener("DOMContentLoaded", () => {
    emitSound("main_btn");
})
//SET DIFFICULTY OF THE GAME (CARDS NUMBER)
function setGameDifficulty(diff){
    save("Difficulty", diff);
    document.getElementById("difficultySelected").setAttribute("src", "img/settings_cardNumber" + get("Difficulty") + ".png")
    emitSound("hover_settings");
}

//SET THE NUMBER OF THE PLAYERS IN THE GAME
function setPlayerNumber(){
    let nbPlayer = document.getElementById("settingNumberPlayer").value;
    if(nbPlayer < 2){
        nbPlayer = 2;
    }else if(nbPlayer > 5){
        nbPlayer = 5;
    }
    document.getElementById("settingNumberPlayer").value = nbPlayer;
    save("Number Players", nbPlayer);
    generatePlayersName(nbPlayer);
}

//GENERATE PLAYERS NAME FROM THE NUMBER OF PLAYERS
function generatePlayersName(nb){
    let div = document.getElementById("playersNameBox");
    div.innerHTML = '';
    for(let i = 1;i <= nb; i++){
        let element = document.createElement('div');
        element.innerHTML = "<input type='text' value='Player " + i + "' id='playerNameBox" + i +"' class='player-name-input'/>";
        div.appendChild(element);
    }
}

//CHECK IF SETTINGS ARE NOT EMPTY
function checkEmptySetting(){
    if(!get("Number Players")) save("Number Players", 2);
    if(!get("Difficulty")) save("Difficulty", 12);
    setPlayersName();
}

//SET THE PLAYERS NAME
function setPlayersName(){
    remove("Players Name");
    let nb = get("Number Players");
    let tab = [];
    for(let i = 1; i <= nb; i++){
        let name = document.getElementById("playerNameBox"+i.toString()).value;
        tab.push(name);
    }
    save("Players Name", JSON.stringify(tab));
    emitSound("main_btn");
    window.location = "game.html";
}

function setSounds(element){
    if(element.checked){
        save("setSounds", true);
    }else{
        save("setSounds", false);
    }
}

function setMusic(element){
    if(element.checked){
        save("setMusic", "true");
    }else{
        save("setMusic", "false");
    }
}

function checkSoundsSettings(){
    let soundElement = document.getElementById("settingSetSounds");
    let musicElement = document.getElementById("settingSetMusic");

    if(get("setSounds") == "true" || !("setSounds" in localStorage)){
        soundElement.checked = true;
        save("setSounds", true);
    }else{
        soundElement.checked = false;
        save("setSounds", false);
    }

    if(get("setMusic") == "true" || !("setMusic" in localStorage)){
        musicElement.checked = true;
        save("setMusic", "true");
    }else{
        musicElement.checked = false;
        save("setMusic", "false");
    }
}