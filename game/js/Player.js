class Player{
    constructor(name){
        this.name = name;
        this.score = 0;
    }
    
    increaseScore(value){
        this.score += value;
    }

    getName(){
        return this.name;
    }
    getScore(){
        return this.score;
    }
}