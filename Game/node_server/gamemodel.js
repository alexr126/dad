/*jshint esversion: 6 */

var Board = require('./Board.js');
var Piece = require('./Piece.js');

class MemoryGame {
    constructor(ID, playerName, numberPlayer, XAxis, YAxis) {
        this.gameID = ID;
        this.playerOne = playerName;
        this.playerTwo = '';
        this.playerThree = '';
        this.playerFour = '';
        this.arrayPlayers = [];
        this.arrayPlayers.push(this.playerOne);
        this.arrayScore = [];
        this.arrayScore.push(0);
        this.numberPlayerXYAxis = [];
        this.numberPlayerXYAxis.push(numberPlayer, XAxis, YAxis);
        this.flippedPieces = [];
        this.successMessage = '';
        this.failMessage = '';
        this.currentMove = 0;
        this.winner = 0;
        this.currentPlayerPlaying = 1; //Current player playing.
        this.timer = null;
        this.possibleDifficulty = null;
        this.isGameEnded = false;
        this.isGameStarted = false;
        this.showFailure = false;
        this.showSuccess = true;

        //Creation of Board
        if(XAxis == 0 || YAxis == 0)
            this.boardClass = new Board(playerName,numberPlayer);
        else
            this.boardClass = new Board(playerName,numberPlayer, XAxis, YAxis);
    }

    //Join for everyone. Should never be called outside.
    join(playerName){
        if(this.arrayPlayers.size == this.numberPlayerXYAxis[0])
            return "Max Size.";
        for(let i = 0 ; i < this.arrayPlayers.length; i++) {
            if (this.arrayPlayers[i] == playerName)
                return "This already exists.";
        }

        this.arrayPlayers.push(playerName);
        this.arrayScore.push(0);

        switch(this.arrayPlayers.length){
            case 2:
                this.playerTwo = playerName;
                break;
            case 3:
                this.playerThree = playerName;
                break;
            case 4:
                this.playerFour = playerName;
                break;
            default:
                return "Error";
        }
        if(this.arrayPlayers.length == this.numberPlayerXYAxis[0]) {
            this.isGameStarted = true;
        }
        return "OK";
    }

    //Join for a Player. this function should be called instead of *join()*
    joinPlayer(playerName){
        return this.join(playerName);
    }

    //Join for a Bot. this function should be called instead of *join()*
    joinBot(difficulty){
        this.possibleDifficulty = difficulty;
        return this.join("Bot");
    }

    //Shows the image on each square of the board. Check if it needs to be used.
    pieceImageURL(key) {
        return this.boardClass.board[key].imagePath();
    }

    /* Click a Piece on the Board
     * Returns:
     * 1 -- If it is not possible to press
     * 2 -- If the Player can play again
     * 3 -- If the Game is complete
     * 4 -- Default Return
     */
    clickPieceM(piece) {
        if(!piece.isHidden) {
            if (this.isGameEnded)
                if (!this.isGameStarted)
                    return;
        }

        //ToDo: piece.flip();
        piece.isHidden = !piece.isHidden;
        piece.wasOpen = true;

        this.flippedPieces.push(piece); //This "flippedPieces" is a way to see both clicked pieces. (Push adds a node)

        this.currentMove++; //Counter, for the number of moves each player has.

        //If the player only played ONE piece, we need to let him play the other!
        if(this.currentMove != 2){
            //Nothing happens! The current player can play another piece!
            return piece;
        }else{
            //We need to check now if there is 2 equal pieces.
            console.log("I call checkValuesAreEqual to the Stand.", this.flippedPieces);
            this.checkValuesAreEqualM();

            //Reset Array and Counter
            //this.flippedPieces = [];
            this.currentMove = 0;

            //On the end, we need to check if the game is complete!
            console.log("I Passed here.", this.boardClass.board);
            if(this.isBoardCompleteM()) {
                this.isGameEnded = true;
                this.showSuccess = true;
                let playerOrdered = new Array();
                playerOrdered = this.arrayPlayers;
                let scoreOrdered = new Array();
                scoreOrdered = this.arrayScore;
                let auxVariable;
                do {         //Bubble Sort
                    auxVariable = false;
                    for (let j = 0; j < scoreOrdered.length - 1; j++) {
                        if (scoreOrdered[j] < scoreOrdered[j+1]) {
                            let tempScore = scoreOrdered[j];
                            scoreOrdered[j] = scoreOrdered[j + 1];
                            scoreOrdered[j + 1] = tempScore;

                            let tempPlayer = playerOrdered[j];
                            playerOrdered[j] = playerOrdered[j + 1];
                            playerOrdered[j + 1] = tempPlayer;

                            auxVariable = true;
                        }
                    }
                } while (auxVariable);

                if (scoreOrdered[0] == scoreOrdered[1]){
                    this.winner = 0;
                    this.successMessage = "There has been a Tie.";
                }

                for(let i = 0; i < this.arrayPlayers; i++) {
                    if (playerOrdered[0] == this.arrayPlayers[i]) {
                        this.successMessage = "Winner is '" + playerOrdered[0] + "' With " + scoreOrdered[0] + "Points!";
                        this.winner = i+1;
                        break;
                    }
                }
            }
        }
        return piece;
    }

    //Creating a new instance of the game. PROB won't be used!.
    restartGame(){
        this.boardClass = new Board(this.numberPlayerXYAxis[0], this.numberPlayerXYAxis[1], this.numberPlayerXYAxis[2]);
        this.showSuccess = false;
        this.showFailure = false;
        this.successMessage = '';
        this.failMessage = '';
        this.currentPlayerPlaying = 1;
        this.gameEnded = false;
        //this.startGame = false;
        this.flippedPieces = [];
        this.currentMove = 0;
        for(let i = 0; i < this.arrayScore.length; i++)
            this.arrayScore[i] = 0;

        this.winner = 0;
        this.currentPlayerPlaying = 1; //Current player playing.
        this.timer = null;
        this.isGameEnded = false;
        this.isGameStarted = false;
    }

    //Function that checks if the two pieces on "flippedPieces" are equal.
    checkValuesAreEqualM(){
        //They are equal

        if(this.flippedPieces[0].trueValue == this.flippedPieces[1].trueValue){

            this.arrayScore[this.currentPlayerPlaying-1] = this.arrayPlayers[this.currentPlayerPlaying-1]+1;

            //The player need to play again!
            //this.successMessage = 'Player '+ this.playersHash.get(this.currentPlayerPlaying - 1)[0]+' has Played. Play again!';
            this.successMessage = 'Player ' + this.arrayPlayers[this.currentPlayerPlaying - 1]+ ' has Played. Play again!';
            this.showSuccess = true;

            //Reset Array and Counter
            this.flippedPieces = [];
            this.currentMove = 0;

            //If its the bots turn, then play again
            if(this.currentPlayerPlaying == 2 && this.arrayPlayers[1] == 'Bot'){
                this.playBot(this.possibleDifficulty);
            }

            console.log("1---");
            return;

        //If they aren't, we need to re-change to the original Board!
        }else{
            this.timer = setTimeout(() => {
                this.clearTimer();

                this.flippedPieces[0].isHidden = !this.flippedPieces[0].isHidden; //ToDo:Flip.
                this.flippedPieces[0].wasOpen = true;
                this.flippedPieces[1].isHidden = !this.flippedPieces[1].isHidden; //ToDo:Flip.
                this.flippedPieces[1].wasOpen = true;

                //Lets change the player.
                this.successMessage = this.arrayPlayers[this.currentPlayerPlaying-1] + ' has Played';
                this.showSuccess = true;
                this.currentPlayerPlaying = this.currentPlayerPlaying % this.arrayPlayers.size + 1;

                //Reset Array and Counter
                this.flippedPieces = [];
                this.currentMove = 0;

                if(this.currentPlayerPlaying == 2 && this.arrayPlayers[this.currentPlayerPlaying-1] == 'Bot'){
                    this.playBot(this.possibleDifficulty);
                }
                console.log("2");
            }, 1000);
        }
    }

    //Returns True if the Board is completely turned Over, False otherwise.
    isBoardCompleteM(){
        this.boardClass.board.forEach(function(element) {
            if (element.isHidden == true) {
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

        //There isn't any piece? Ok... randomize.
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
                //If there is opened piece with the same value, then pick it as well.
                this.clickPiece(boardOpenArray[i]);
                return;
            }
        }

        //There isn't any piece? Ok... randomize.
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

module.exports = MemoryGame;
