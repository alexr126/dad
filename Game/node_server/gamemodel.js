/*jshint esversion: 6 */

class MemoryGame {
    constructor(ID, playerName, numberPlayer, XAxis, YAxis) {
        this.numberPlayerXYAxis = new Array();
        this.numberPlayerXYAxis.push(numberPlayer, XAxis, YAxis);
        this.playerOne = playerName //ToDo : Change this. The Map isn't showing, Ask them might help Z.
        this.gameID = ID;
        this.showSuccess = true;
        this.showFailure = false;
        this.successMessage = '';
        this.failMessage = '';
        this.currentValue = 1; //Current player playing.
        this.currentMove = 0;
        this.gameEnded = false;

        //Creation of Board
        if(XAxis == undefined && YAxis == undefined)
            this.boardClass = new Board(playerName,numberPlayer);
        else
            this.boardClass = new Board(playerName,numberPlayer, XAxis, YAxis);

        this.playersHash = this.createPlayersHash(playerName);
        this.flippedPieces = new Array();
        this.startGame = true;
        this.timer = null;
        this.possibleDifficulty = null;
    }

    /*Creates the Players Hash, containing :
     * Key : Integer, Starting from 0, which is Player 1, till 3, Player 4.
     * Value : A Array, Which contains :
        * Position 0 : NameOfThePlayer - Name of the Player. Default is "Player " + (Key+1)
        * Position 1 :           Score - Score of the Player. Starts on 0.
     */
    createPlayersHash(playerName){
        let playersHash = new Map();
        let arr = [];
        for(let i = 0; i < this.numberPlayerXYAxis[0] ; i++){
            if(i == 0){
                arr.push(playerName);
            }else{
                arr.push("Player " + (i+1));
            }
            arr.push(0);
            playersHash.set(i, arr);
            arr = new Array();
        }
        return playersHash;
    }

    getFirstPlayer(){
        console.log(this.playersHash.get(0)[0]);
        return this.playersHash.get(0)[0];
    }

    //Join for everyone. Should never be called outside.
    join(playerName){
        let check = 0;
        for(let i = 1; i < this.playersHash.size; i++){
            let playerJoining = this.playersHash.get(i);
            if(playerJoining[0] == 'Player ' + i+1){
                playerJoining[0] = playerName;
                check = i;
                break;
            }
        }
        if(check == this.playersHash.size){
            this.startGame = true;
        }
    }

    //Join for a Player. this function should be called instead of *join()*
    joinPlayer(playerName){
        this.join(playerName);
    }

    //Join for a Bot. this function should be called instead of *join()*
    joinBot(difficulty){
        this.possibleDifficulty = difficulty;
        this.join("Bot");
    }

    //Shows the image on each square of the board. Check if it needs to be used.
    pieceImageURL(key) {
        return this.boardClass.board[key].imagePath();
    }

    //Click a Piece on the Board
    clickPiece(piece) {

        //If the game already ended OR if the piece is already clicked/Opened, then do nothing.
        if(!piece.isHidden || this.gameEnded || this.startGame) return;
        
        piece.flip();

        this.flippedPieces.push(piece); //This "flippedPieces" is a way to see both clicked pieces. (Push adds a node)
        
        this.currentMove++; //Counter, for the number of moves each player has.

        //If the player only played ONE piece, we need to let him play the other!
        if(this.currentMove != 2){
            //Nothing happens! The current player can play another piece!            
        }else{
            //We need to check now if there is 2 equal pieces.
            this.checkValuesAreEqual();

            //Reset Array and Counter
            //this.flippedPieces = [];
            this.currentMove = 0;

            //On the end, we need to check if the game is complete!
            if(this.isBoardComplete()){
                this.gameEnded = true;
                this.showSuccess = true;
                let winnerNumber = 0;
                let winnerName = 0;
                this.playersHash.forEach(function (item, key, mapObj){
                    if(winnerNumber < item[1]){
                        winnerNumber = item[1];
                        winnerName = item[0];
                    }        
                });
                this.successMessage = "Winner is '" + winnerName + "' With " + winnerNumber + "Points!";
            }
        }
    }

    //Creating a new instance of the game. PROB won't be used!.
    restartGame(){
        this.boardClass = new Board(this.numberPlayerXYAxis[0], this.numberPlayerXYAxis[1], this.numberPlayerXYAxis[2]);
        this.showSuccess = false;
        this.showFailure = false;
        this.successMessage = '';
        this.failMessage = '';
        this.currentValue = 1;
        this.gameEnded = false;
        this.startGame = false;
    }

    //Function that checks if the two pieces on "flippedPieces" are equal.
    checkValuesAreEqual(){
        //They are equal
        if(this.flippedPieces[0].trueValue === this.flippedPieces[1].trueValue){

            //Lets set the playersHash. Set receives the index , and then the value to change.
            let arrayAux = new Array();  // The Map : PlayerName and gameValue 
            arrayAux.push(this.playersHash.get(this.currentValue - 1)[0]); //Lets add the Name to the array
            arrayAux.push(this.playersHash.get(this.currentValue - 1)[1] + 1); //Lets add the Result to the array
            this.playersHash.set(this.currentValue - 1, arrayAux);

            //The player need to play again!
            this.successMessage = 'Player '+ this.playersHash.get(this.currentValue - 1)[0]+' has Played. Play again!';
            this.showSuccess = true;

            //Reset Array and Counter
            this.flippedPieces = [];
            this.currentMove = 0;

            //If its the bots turn, then play again
            if(this.currentValue === 2 && this.playersHash.get(1)[0] === 'Bot'){
                this.playBot(this.possibleDifficulty);
            }

        //If they aren't, we need to re-change to the original Board!
        }else{
            this.timer = setTimeout(() => {

            this.clearTimer();

            this.flippedPieces[0].flip();
            this.flippedPieces[1].flip();

            //Lets change the player.
            this.successMessage = 'Player '+ this.currentValue +' has Played';
            this.showSuccess = true;
            this.currentValue = this.currentValue % this.playersHash.size + 1;

            //Reset Array and Counter
            this.flippedPieces = [];
            this.currentMove = 0;

            if(this.currentValue === 2 && this.playersHash.get(1)[0] === 'Bot'){
                this.playBot(this.possibleDifficulty);
            }
        }, 1000);
        }
    }

    //Returns True if the Board is completely turned Over, False otherwise.
    isBoardComplete(){
        this.boardClass.board.forEach(function(element) {
            if (element.isHidden === true) {
                return false;
            }
        });
        return true;
    }

    playBot(difficulty){
        switch(difficulty){
            case 1:
                this.playBotDifficultyOne();
                break;
            case 2:
                this.playBotDifficultyTwo();
                break;
            case 3:
                this.playBotDifficultyThree();
                break;
            case 4:
                this.playBotDifficultyFour();
                break;
            default:
                break;     
        }
    }

    playBotDifficultyOne(){
        let playOne, playTwo;
        let boardArray = new Array();
        for(let i = 0; i < this.boardClass.board.length; i++){
            if(this.boardClass.board[i].isHidden) boardArray.push(this.boardClass.board[i]);
        }
        do{
            playOne = Math.floor(Math.random() * boardArray.length);
            playTwo = Math.floor(Math.random() * boardArray.length);
        }while(playOne == playTwo || !boardArray[playOne].isHidden || !boardArray[playTwo].isHidden);
        this.clickPiece(boardArray[playOne]);
        this.clickPiece(boardArray[playTwo]);
        return;
    }

    playBotDifficultyTwo(){
        let playOne, playTwo;
        let boardArray = new Array();
        let boardOpenArray = new Array();
        for(let i = 0; i < this.boardClass.board.length; i++){
            if(this.boardClass.board[i].isHidden) boardArray.push(this.boardClass.board[i]); 
        }
        if(boardArray.length == 0) return;
        if(boardArray.length == 2){
            this.clickPiece(boardArray[0]);
            this.clickPiece(boardArray[1]);
            return;
        }

        for(let i = 0; i < boardArray.length; i++){
            if(boardArray[i].wasOpen) boardOpenArray.push(boardArray[i]);
        }
        if(boardOpenArray.length > 1){
            for(let i = 0; i < boardOpenArray.length; i++){
                for(let j = i + 1; j < boardOpenArray.length; j++){
                    if(boardOpenArray[i].trueValue == boardOpenArray[j].trueValue){
                        //Means that there is two pieces that were once opened and they have equal trueValue
                        this.clickPiece(boardOpenArray[i]);
                        this.clickPiece(boardOpenArray[j]);
                        console.log("there is 2 pieces.");
                        return;
                    }
                }
            }
        }//This means that we don't have enough pieces that were found To combine.
        do{
            playOne = Math.floor(Math.random() * boardArray.length);
            playTwo = Math.floor(Math.random() * boardArray.length);
        }while(playOne == playTwo || !boardArray[playOne].isHidden || !boardArray[playTwo].isHidden);
        this.clickPiece(boardArray[playOne]);
        this.clickPiece(boardArray[playTwo]);
    }

    playBotDifficultyThree(){
        let playOne, playTwo;
        let boardArray = new Array();
        let boardOpenArray = new Array();
        for(let i = 0; i < this.boardClass.board.length; i++){
            if(this.boardClass.board[i].isHidden) boardArray.push(this.boardClass.board[i]); 
        }
        if(boardArray.length == 0) return;
        if(boardArray.length == 2){
            this.clickPiece(boardArray[0]);
            this.clickPiece(boardArray[1]);
            return;
        }

        for(let i = 0; i < boardArray.length; i++){
            if(boardArray[i].wasOpen) boardOpenArray.push(boardArray[i]);
        }

        if(boardOpenArray.length > 1){
            for(let i = 0; i < boardOpenArray.length; i++){
                for(let j = i + 1; j < boardOpenArray.length; j++){
                    if(boardOpenArray[i].trueValue == boardOpenArray[j].trueValue){
                        //Means that there is two pieces that were once opend and they have equal trueValue
                        this.clickPiece(boardOpenArray[i]);
                        this.clickPiece(boardOpenArray[j]);
                        console.log("there is 2 pieces.");
                        return;
                    }
                }
            }
        }//This means that we don't have enough pieces that were found To combine.
        do{ //Play 1st piece
            playOne = Math.floor(Math.random() * boardArray.length);
        }while(!boardArray[playOne].isHidden);
        this.clickPiece(boardArray[playOne]);

        //Check for the piece.
        for(let i = 0; i < boardOpenArray.length; i++){
            if(boardArray[playOne].trueValue == boardOpenArray[i].trueValue && boardArray[playOne] != boardOpenArray[i]){
                //If there is opend piece with the same value, then pick it as well.
                this.clickPiece(boardOpenArray[i]);
                return;
            }
        }

        //There isnt any piece? Ok... randomize.
        do{ //Play 2nd piece
            playTwo = Math.floor(Math.random() * boardArray.length);
        }while(!boardArray[playTwo].isHidden || playOne == playTwo);
        this.clickPiece(boardArray[playTwo]);
        return;
    }

    playBotDifficultyFour(){
        let playOne, playTwo;
        let boardArray = new Array();
        let boardOpenArray = new Array();
        let boardNotPlayed = new Array();
        for(let i = 0; i < this.boardClass.board.length; i++){
            if(this.boardClass.board[i].isHidden) boardArray.push(this.boardClass.board[i]); 
        }

        if(boardArray.length == 0) return;
        
        if(boardArray.length == 2){
            this.clickPiece(boardArray[0]);
            this.clickPiece(boardArray[1]);
            return;
        }

        for(let i = 0; i < boardArray.length; i++){
            if(boardArray[i].wasOpen) boardOpenArray.push(boardArray[i]);
            else boardNotPlayed.push(boardArray[i]);
        }

        if(boardOpenArray.length > 1){
            for(let i = 0; i < boardOpenArray.length; i++){
                for(let j = i + 1; j < boardOpenArray.length; j++){
                    if(boardOpenArray[i].trueValue == boardOpenArray[j].trueValue){
                        //Means that there is two pieces that were once opend and they have equal trueValue
                        this.clickPiece(boardOpenArray[i]);
                        this.clickPiece(boardOpenArray[j]);
                        return;
                    }
                }
            }
        }//This means that we don't have enough pieces that were found To combine.
        do{ //Play 1st piece
            playOne = Math.floor(Math.random() * boardNotPlayed.length);
        }while(!boardNotPlayed[playOne].isHidden);
        this.clickPiece(boardNotPlayed[playOne]);

        for(let i = 0; i < boardOpenArray.length; i++){
            if(boardNotPlayed[playOne].trueValue == boardOpenArray[i].trueValue && boardNotPlayed[playOne] != boardOpenArray[i]){
                //If there is opend piece with the same value, then pick it as well.
                this.clickPiece(boardOpenArray[i]);
                return;
            }
        }

        //There isnt any piece? Ok... randomize.
        do{ //Play 2nd piece
            playTwo = Math.floor(Math.random() * boardNotPlayed.length);
        }while(!boardNotPlayed[playTwo].isHidden || playOne == playTwo);
        this.clickPiece(boardNotPlayed[playTwo]);
        return;
    }

    clearTimer(){
        clearTimeout(this.timer);
        this.timer = null;
    }
}

class Board{
    constructor(playerName, numberOfPlayers, xAxis, yAxis){
        this.board = [];
        this.numberOfPlayers = numberOfPlayers;
        /*this.playersHash = new Map();

        let arr = [];
        for(let i = 0; i < numberOfPlayers ; i++){
            if(i == 0){
                arr.push(playerName);
            }else{
                arr.push("Player " + (i+1));
            }
            arr.push(0);
            this.playersHash.set(i, arr);
            arr = new Array();
        }*/

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

module.exports = MemoryGame;
