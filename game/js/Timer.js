class Timer {
    constructor(){
        this.minutes = 0;
        this.seconds = 0;
        this.time = "";
    }

    increaseSeconds(){
        if(this.seconds == 59){
            this.seconds = 0
            this.increaseMinutes();
        }else{
            this.seconds++;
        }
    }
    increaseMinutes(){
        this.minutes++;
    }

    isValueInfToNine(type){
        if(type <= 9){
            return "0";
        }else{
            return "";
        }
    }

    setTime(){
        let element = document.getElementById("clock");
        this.increaseSeconds();
        element.innerHTML = this.isValueInfToNine(this.minutes) + this.minutes + " : " + this.isValueInfToNine(this.seconds) + this.seconds;
    }
}