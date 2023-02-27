//NAVIGATION FROM PAGE X(hiddenPage) TO PAGE Y (viewPage)
function goTo(hiddenPage, viewPage){
    document.getElementById(hiddenPage).classList.add("fadeout");

    setTimeout(() => {
        document.getElementById(hiddenPage).style.display = "none";
        document.getElementById(viewPage).style.display = "block";
    }, 500)

    document.getElementById(viewPage).classList.add("fadein"); 

    setTimeout(() =>{
        document.getElementById(hiddenPage).classList.remove("fadeout");
        document.getElementById(viewPage).classList.remove("fadein");
    }, 1000)
    emitSound("main_btn");
}

//NAVIGATION FROM PPAGE Y(viewPage) TO PAGE X(hiddenPage)
function backTo(hiddenPage, viewPage){
    document.getElementById(hiddenPage).classList.add("fadeout");

    setTimeout(() => {
        document.getElementById(viewPage).style.display = "block";
        document.getElementById(hiddenPage).style.display = "none";
    }, 500)

    document.getElementById(viewPage).classList.add("fadein"); 

    setTimeout(() =>{
        document.getElementById(viewPage).classList.remove("fadein"); 
        document.getElementById(hiddenPage).classList.remove("fadeout");
    }, 1000)
    emitSound("main_btn");
}

//NAVIGATION BETWEEN PARTY SETTINGS
let step = 1;

function setSettingsStep(direction){
    if(direction == "back" && step > 1){
        step--;

        //Back to previous setting
        document.getElementById("partySettingsForm" + (step+1).toString()).style.display = "none";
        document.getElementById("partySettingsForm" + step.toString()).style.display = "block";

        //Change visual step sphere
        document.getElementById("sphere" + (step+1).toString()).classList.replace("party-settings-stepbar-sphere-big", "party-settings-stepbar-sphere-little")
        document.getElementById("sphere" + step.toString()).classList.replace("party-settings-stepbar-sphere-little", "party-settings-stepbar-sphere-big")

    }else if(direction == "up" && step < 3){
        step++;

        //Go to next setting
        document.getElementById("partySettingsForm" + (step-1).toString()).style.display = "none";
        document.getElementById("partySettingsForm" + step.toString()).style.display = "block";

        //Change visual step sphere
        document.getElementById("sphere" + (step-1).toString()).classList.replace("party-settings-stepbar-sphere-big", "party-settings-stepbar-sphere-little")
        document.getElementById("sphere" + step.toString()).classList.replace("party-settings-stepbar-sphere-little", "party-settings-stepbar-sphere-big");
    }
    emitSound("steps_btn");
}

function restartGame(){
    window.location.reload(true);
}

function quit(){
    window.location = "home.html";
}

function emitSound(type){
    if(get("setSounds") == "true"){
        if(type == "main_btn"){
            var audio = new Audio("sounds/btn_sound.wav")
            audio.volume = 0.1;
            audio.play();
        }else if(type == "steps_btn"){
            var audio = new Audio("sounds/steps_btn_sound.wav")
            audio.volume = 0.1;
            audio.play();
        }
    }
}
