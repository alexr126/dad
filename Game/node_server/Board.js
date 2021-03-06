
var Piece = require('./Piece.js');

class Board{
    constructor(playerName, numberOfPlayers, xAxis, yAxis){
        this.board = [];
        this.numberOfPlayers = numberOfPlayers;

        if (xAxis == undefined){ // We don't want to go for custom board!
            this._constructWithNumberOfPlayers(numberOfPlayers);
        }else{
            this._constructWithXAxisAndYAxis(numberOfPlayers, xAxis, yAxis);
        }
    }

    _constructWithNumberOfPlayers(numberOfPlayers){
        if (numberOfPlayers == 1 || numberOfPlayers == 2){ //Board needs to be 4x4
            this.board = this.createBoard(4, 4);
        } else if(numberOfPlayers == 3){ //Board needs to be 4*6
            this.board = this.createBoard(4, 6);
        } else if(numberOfPlayers == 4){ //Board needs to be 6*6
            this.board = this.createBoard(6, 6);
        }else{
            return;
        }
    }

    _constructWithXAxisAndYAxis(numberOfPlayers, xAxis, yAxis){
        if(xAxis*yAxis%2 === 0){
            this.board = this.createBoard(xAxis, yAxis);
        }else if(xAxis*yAxis > 80){
            this.board = this.createBoard(8,10);
        }else{
            return; //Error
        }
    }

    createBoard(x, y){

        let size = x*y;
        let board = new Array(size);

        //We have the board now. We need to populate it with the Pieces.
        let trueValue = 0;
        let counter = 0;

        /*let arrayOfPieces = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40];

        for (var i = arrayOfPieces.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arrayOfPieces[i];
            arrayOfPieces[i] = arrayOfPieces[j];
            arrayOfPieces[j] = temp;
        }*/

        //Do SMTH .
        for(let i = 0; i < size; i++){
            board[i] = new Piece(trueValue);
            counter++;
            if(counter === 2) { counter=0; trueValue++; }
        }

        for(let i = 0; i < 250 ; i++){
            let positionOne = Math.floor(Math.random() * (size));
            let positionTwo = Math.floor(Math.random() * (size));

            let temp = board[positionOne];
            board[positionOne] = board[positionTwo];
            board[positionTwo] = temp;
        }
        return board;
    }
}

module.exports = Board;
