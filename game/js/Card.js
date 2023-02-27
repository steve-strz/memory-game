class Card{
    constructor(id, pair, backFace, frontFace){
        this.id = id;
        this.pair = pair;
        this.backFace = backFace;
        this.frontFace = frontFace;
    }

    getId(){
        return this.id;
    }
    getPair(){
        return this.pair;
    }
    getIdAndPair(){
        return this.id + "_" + this.pair;
    }
    getBackFace(){
        return this.backFace;
    }
    getFrontFace(){
        return this.frontFace;
    }
}