class Piece{
    constructor(trueValue){
        this.isHidden = true; //true = Hidden.
        this.wasOpen = false; //If it was opened.
        this.trueValue = trueValue; //Its true value
        this.pathHidden = 'img/' + 'hidden' + '.png';
        this.pathFlip = 'img/' + String(this.trueValue) + '.png';
    }

    //To show the image on each square of the board.
    imagePath() {
        if(this.isHidden == true)
            return this.pathHidden;
        else
            return this.pathFlip;
    }

    flip(){
        this.isHidden = !this.isHidden;
        this.wasOpen = true;
    }
}

module.exports = Piece;