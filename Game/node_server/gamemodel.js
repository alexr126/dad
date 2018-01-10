/*jshint esversion: 6 */

class MemoryGame {
    constructor(ID, player1Name, numberPlayer, XAxis, YAxis) {
        this.gameID = ID;
        this.player1 = player1Name;
        this.playerTurn = 1;
        this.showSuccess = true;
        this.showFailure = false;
        this.successMessage = '';
        this.failMessage = '';
        this.currentValue = 1; //Current player playing. 
        this.currentMove = 0;
        this.gameEnded = false;

        if(XAxis == undefined && YAxis == undefined)
            this.boardClass = new Board(playerName,numberPlayer);
        else
            this.boardClass = new Board(playerName,numberPlayer, XAxis, yAxis);

        this.flipedPieces = [];
        this.startGame = true;
        this.timer = null;
        this.possibleDifficulty = null;
    }

    joinPlayer(playerName){
        this.join(playerName);
    }

    joinBot(difficulty){
        this.possibleDifficulty = difficulty;
        this.join("Bot");
    }

    join(playerName){
        let check = 0;
        for(let i = 1; i < this.boardClass.playersHash.size; i++){
            let playerJoining = this.boardClass.playersHash.get(i); // The Map : PlayerName and gameValue
            if(playerJoining[0] == 'Player ' + i+1){
                playerJoining[0] = playerName;
                check = i;
                break;
            }
        }
        if(i == this.boardClass.playersHash.size){
            this.gameStarted = true;
        }
    }

    pieceImageURL(key) { //To show the image on each square of the board.
        return this.boardClass.board[key].imagePath();
    }
    clickPiece(piece) { //When a player clicks a piece.

        console.log("Clicked on piece. ------", piece);
        //If the game already ended OR if the piece is already clicked/Opened, then do nothing.
        if(!piece.isHidden || this.gameEnded || this.startGame) return;
        
        piece.flip();

        this.openValue.push(piece); //This "openValue" is a way to see both clicked pieces. (Push adds a node)
        
        this.currentMove++; //Counter, for the number of moves each player has.

        console.log("CurrentMove ---------", this.currentMove); 

        //If the player only played ONE piece, we need to let him play the other!
        if(this.currentMove != 2){
            //Nothing happens! The current player can play another piece!            
        }else{
            //We need to check now if there is 2 equal pieces.
            this.checkValuesAreEqual();
            
            this.currentMove = 0; //Lets restart the counter!

            this.openValue = []; //Reset the array!

            //On the end, we need to check if the game is complete!
            if(this.isBoardComplete()){
                this.gameEnded = true;
                this.showSuccess = true;
                let winnerNumber = 0;
                let winnerName = 0; //this is a number now.
                this.boardClass.playersHash.forEach(function (item, key, mapObj){ // The Map : PlayerName and gameValue 
                    if(winnerNumber < item[1]){
                        winnerNumber = item[1];
                        winnerName = item[0];
                    }        
                });
                this.successMessage = "Winner is " + winnerName + " With " + winnerNumber;
            }
        }
    }
    restartGame(){ //restarting game. Creating a new instance of the game. PROB won't be used!.
        console.log('restartGame / startGame');
        this.boardClass = new Board(2); //Board : NumberOfPlayers, XAxis and YAxis
        console.log(this.boardClass)              
        this.showSuccess = false;
        this.showFailure = false;
        this.successMessage = '';
        this.failMessage = '';
        this.currentValue = 1;
        this.gameEnded = false;
        this.startGame = false;
    }
    checkValuesAreEqual(){ //Checking if both pieces are equal. No need to validation, since this function is only called IF there are 2 numbers on "OpenValue"
        console.log("Checking if Pieces are equal. Piece one : " + this.openValue[0].trueValue + " , Piece two : " + this.openValue[1].trueValue);
        if(this.openValue[0].trueValue == this.openValue[1].trueValue){ //They are equal
            console.log("they are equal ----------" , this.boardClass);

            //Lets set the playersHash. Set receives the index , and then the value to change.
            let arrayAux = new Array();  // The Map : PlayerName and gameValue 
            arrayAux.push(this.boardClass.playersHash.get(this.currentValue - 1)[0]); //Lets add the Name to the array
            arrayAux.push(this.boardClass.playersHash.get(this.currentValue - 1)[1] + 1); //Lets add the Result to the array

            this.boardClass.playersHash.set(this.currentValue - 1, arrayAux);

            //The player need to play again!
            this.successMessage = 'Player '+ this.currentValue +' has Played. Play again!';
            this.showSuccess = true;

            //Lets restart the counter!
            this.currentMove = 0;

            //Reset the array!
            this.openValue = [];

            //If its the bots turn, then play again
            if(this.currentValue == 2 && this.boardClass.playersHash.get(1)[0] == 'Bot'){
                this.playBot(this.possibleDifficulty);
            }

        }else{ //If they aren't, we need to re-change to the original Board!
            console.log("They aren't equal.");
            this.timer = setTimeout(() => {

            console.log("Inside Timeout -------------");

            this.clearTimer();

            this.openValue[0].flip();
            this.openValue[1].flip();

            console.log(this.boardClass.board);

            //Lets change the player.
            this.successMessage = 'Player '+ this.currentValue +' has Played';
            this.showSuccess = true;
            this.currentValue = this.currentValue % this.boardClass.playersHash.size() + 1; 
            
            this.openValue = []; //Reset the array!
            
            this.currentMove = 0; //Lets restart the counter!

            if(this.currentValue == 2 && this.boardClass.playersHash.get(1)[0] == 'Bot'){
                console.log("Execute the bot.");

                this.playBot(this.possibleDifficulty);
            }
        }, 1000);
        }
    }
    isBoardComplete(){ //Checking if the board is completely "Open".
        this.boardClass.board.forEach(function(element) {
            if (element.isHidden == true) {
                return false;
            }
        });
        return true;
    }
    playBot(dificulty){
        switch(dificulty){
            case 1:
                this.playBotDificultyOne();
                break;
            case 2:
                this.playBotDificultyTwo();
                break;
            case 3:
                this.playBotDificultyThree();
                break;
            case 4:
                this.playBotDificultyFour();
                break;
            default:
                break;     
        }
    }
    playBotDificultyOne(){
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
    playBotDificultyTwo(){
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
        do{
            playOne = Math.floor(Math.random() * boardArray.length);
            playTwo = Math.floor(Math.random() * boardArray.length);
        }while(playOne == playTwo || !boardArray[playOne].isHidden || !boardArray[playTwo].isHidden);
        this.clickPiece(boardArray[playOne]);
        this.clickPiece(boardArray[playTwo]);
        return;
    }
    playBotDificultyThree(){
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
    playBotDificultyFour(){
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
}
    class Board{
        constructor(playerName, numberOfPlayers, xAxis, yAxis){
            this.board = [];
            this.numberOfPlayers = numberOfPlayers;
            this.playersHash = new Map();

            let arr = new Array();
            for(let i = 0; i < numberOfPlayers ; i++){
                if(i == 0){
                    arr.push(playerName);
                }else{
                    arr.push("Player " + (i+1));
                }
                arr.push(0);
                this.playersHash.set(i, arr);
                arr = new Array();
            }

            if (xAxis===undefined){ // We don't want to go for custom board!
            //https://stackoverflow.com/questions/3220721/javascript-pattern-for-multiple-constructors
                this._constructWithNumberOfPlayers(numberOfPlayers);
            }else{
                this._constructWithXAxisAndYAxis(numberOfPlayers, xAxis, yAxis);            
            }
        }

        _constructWithNumberOfPlayers(numberOfPlayers){
            console.log(this.numberOfPlayers);
            if (this.numberOfPlayers == 1 || this.numberOfPlayers == 2){
                //Board needs to be 4x4
                this.board = this.createBoard(4, 4);
            } else if(this.numberOfPlayers == 3){
                //Board needs to be 4*6
                this.board = this.createBoard(4, 6);
            } else if(this.numberOfPlayers == 4){
                //Board needs to be 6*6
                this.board = this.createBoard(6, 6);
            }else{
                return;
            }
        }

        _constructWithXAxisAndYAxis(numberOfPlayers, xAxis, yAxis){
            if(xAxis*yAxis%2 == 0){
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
                if(counter == 2) { counter=0; trueValue++; }
            }
            for(let i = 0; i < 250 ; i++){
                let positionOne = Math.floor(Math.random() * (size - 0 + 1 - 1 )) + 0;
                let positionTwo = Math.floor(Math.random() * (size - 0 + 1 - 1 )) + 0;

                let temp = board[positionOne];
                board[positionOne] = board[positionTwo];
                board[positionTwo] = temp;
            }
            console.log(board);
            return board;
        }
    }

    class Piece{
        constructor(trueValue){
            console.log("new Piece!");
            this.isHidden = true; //true = Hidden.
            this.wasOpen = false; //If it was opened.
            this.trueValue = trueValue;
            this.pathHidden = 'img/' + 'hidden' + '.png';
            this.pathFlip = 'img/' + String(this.trueValue) + '.png';
        }
        imagePath() { //To show the image on each square of the board.
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
