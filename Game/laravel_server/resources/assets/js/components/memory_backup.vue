<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <h2>Current Player : {{ currentPlayer }} </h2>
            <h2>Current Move : {{ currentMove }} </h2>
            <br>
        </div>
        <div class="game-zone-content">       
            <div class="alert alert-success" v-if="showSuccess">
                <button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
                <strong>{{ successMessage }} &nbsp;&nbsp;&nbsp;&nbsp;
                    <a v-show="startGame" v-on:click.prevent="restartGame">Start Game</a>
                    <a v-show="gameEnded" v-on:click.prevent="restartGame">Restart</a>
                </strong>
            </div>

            <div class="board">
                <div v-for="(piece, key) of boardClass.board" >
                    <img v-bind:src="pieceImageURL(key)" v-on:click="clickPiece(piece)">
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>


<script type="text/javascript">
    export default {
        data: function(){
            return{
                title: 'Memory',
                showSuccess: true,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                currentValue: 1, //Current player playing. 
                currentMove: 0,
                gameEnded: false,
                boardClass: new Board(2),
                openValue: [], //Do the board with classes. There is only need for one board
                               // And, on the server, We should have the "boardDone" ready to go!
                startGame: true, //Just for the start, to look pretty! (Will be needed, stay!)
            }
        },
        methods: {
            pieceImageURL: function (key) { //To show the image on each square of the board.
                return this.boardClass.board[key].imagePath();
            },
            clickPiece: function(piece) { //When a player clicks a piece.
                //Validations on Console. Explore it!
                console.log('Clicked on ');
                console.log(piece);
                
                //If the game already ended OR if the piece is already clicked/Opened, then do nothing.
                if(!piece.isHidden || this.gameEnded || this.startGame) return;
                
                piece.flip();

                //This "openValue" is a way to see both clicked pieces. (Push adds a node)
                this.openValue.push(piece);
                
                //Counter, for the number of moves each player has.
                this.currentMove++;

                console.log(this.currentMove + "-- CurrentMove"); 

                //If the player only played ONE piece, we need to let him play the other!
                if(this.currentMove == 2){
                    
                    //We need to check now if there is 2 equal pieces.
                    this.checkValuesAreEqual();
                    
                    console.log("checked if values are equal.");
                    //Lets restart the counter!
                    this.currentMove = 0;

                    //Reset the array!
                    this.openValue = [];

                    //On the end, we need to check if the game is complete!
                    if(this.isBoardComplete()){
                        this.gameEnded = true;
                        this.showSuccess = true;
                        let winner = 0;
                        let winnerName = 0; //this is a number now.
                        this.boardClass.playersHash.forEach(function (item, key, mapObj){
                            if(winner < item[1]){
                                winner = item[1];
                                winnerName = item[0];
                            }        
                        });
                        console.log("DONEEEEEEEEEEEEEEEEEEEEEEEEEEee");
                        this.successMessage = "Winner is " + winnerName + " With " + winner;
                    }
                }else{
                    //Nothing happens! The current player can play another piece!
                }
            },
            restartGame:function(){ // We are restarting the game. We are sorting the current array, like the teacher said: "Com Randoms, façam um re-order do array. Apanhem 2 posições, e troquem uma com a outra". 
                console.log('restartGame / startGame');
                this.boardClass = new Board(2, 4, 4); //Board : NumberOfPlayers, XAxis and YAxis
                console.log(this.boardClass)              
                this.showSuccess = false;
                this.showFailure = false;
                this.successMessage = '';
                this.failMessage = '';
                this.currentValue = 1;
                this.gameEnded = false;
                this.startGame = false;
            },
            checkValuesAreEqual: function(){ //Checking if both pieces are equal. No need to validation, since this function is only called IF there are 2 numbers on "OpenValue"
                console.log("Checking if Pieces are equal.");
                if(this.openValue[0].trueValue == this.openValue[1].trueValue){ //They are equal
                    console.log("they are equal");
                    
                    //Object.assign(this.boardBefore, this.board);
                    
                    //console.log(this.boardBefore);
                    console.log(this.boardClass);
                    
                    //Lets set the playersHash. Set receives the index , and then the value to change.
                    let arrayAux = new Array();
                    arrayAux.push(this.boardClass.playersHash.get(this.currentValue - 1)[0]); //Lets add the Name
                    arrayAux.push(this.boardClass.playersHash.get(this.currentValue - 1)[1] + 1); //Lets add the Result

                    this.boardClass.playersHash.set(this.currentValue - 1, arrayAux);

                    //The player need to play again!
                    this.successMessage = 'Player '+ this.currentValue +' has Played. Play again!';
                    this.showSuccess = true;

                    //If its the bots turn, then play again. (player 2)
                    if(this.currentValue == 2){
                        //Lets restart the counter!
                        this.currentMove = 0;

                        //Reset the array!
                        this.openValue = [];

                        this.playBot(4);
                    }

                }else{ //If they aren't, we need to re-change to the original Board!

                    this.timer = setTimeout(() => {

                        console.log("Inside Timeout -------------");

                        this.clearTimer();

                        this.openValue[0].flip();
                        this.openValue[1].flip();

                        console.log(this.boardClass.board);

                        //Lets change the player.
                        this.successMessage = 'Player '+ this.currentValue +' has Played';
                        this.showSuccess = true;
                        this.currentValue = (this.currentValue == 1)? 2 : 1; //Change player //Do :     this.currentValue%MAX_PLAYERS+1 
                        
                        //Reset the array!
                        console.log(' ----------- reset 3 ');
                        this.openValue = [];
                        //Lets restart the counter!
                        this.currentMove = 0;
                        if(this.currentValue == 2){
                            console.log("Execute the bot.");
                            

                            this.playBot(4);
                        }
                    }, 500);
                }
            },
            isBoardComplete: function(){ //Checking if the board is completely "Open".
                let returnValue = true;
                this.boardClass.board.forEach(function(element) {
                    if (element.isHidden == true) {
                        returnValue = false;
                        console.log(returnValue);
                        return;
                    }
                });
                console.log(returnValue);
                return returnValue;
            },
            playBot: function(dificulty){
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
            },
            playBotDificultyOne: function(){
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
            },
            playBotDificultyTwo: function(){
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

                console.log(boardArray);
                for(let i = 0; i < boardArray.length; i++){
                    if(boardArray[i].wasOpen) boardOpenArray.push(boardArray[i]);
                }
                console.log(boardOpenArray);
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
                console.log("Randomize.");
                do{
                    playOne = Math.floor(Math.random() * boardArray.length);
                    playTwo = Math.floor(Math.random() * boardArray.length);
                }while(playOne == playTwo || !boardArray[playOne].isHidden || !boardArray[playTwo].isHidden);
                this.clickPiece(boardArray[playOne]);
                this.clickPiece(boardArray[playTwo]);
            },
            playBotDificultyThree: function(){
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

                console.log(boardArray);
                for(let i = 0; i < boardArray.length; i++){
                    if(boardArray[i].wasOpen) boardOpenArray.push(boardArray[i]);
                }
                console.log(boardOpenArray);
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
                 //We do a first piece... and pray To god. xD
                do{
                    playOne = Math.floor(Math.random() * boardArray.length);
                }while(!boardArray[playOne].isHidden);
                this.clickPiece(boardArray[playOne]);

                for(let i = 0; i < boardOpenArray.length; i++){
                    if(boardArray[playOne].trueValue == boardOpenArray[i].trueValue && boardArray[playOne] != boardOpenArray[i]){
                        //If there is opend piece with the same value, then pick it as well.
                        this.clickPiece(boardOpenArray[i]);
                        console.log("There is 1 piece.");
                        return;
                    }
                }

                //There isnt any piece? Ok... randomize.
                do{
                    playTwo = Math.floor(Math.random() * boardArray.length);
                }while(!boardArray[playTwo].isHidden || playOne == playTwo);
                this.clickPiece(boardArray[playTwo]);
                console.log("Random");
                return;
            },
            playBotDificultyFour: function(){
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

                console.log(boardArray);
                for(let i = 0; i < boardArray.length; i++){
                    if(boardArray[i].wasOpen) boardOpenArray.push(boardArray[i]);
                    else boardNotPlayed.push(boardArray[i]);
                }
                console.log(boardOpenArray);
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
                 //We do a first piece... and pray To god. xD
                do{
                    playOne = Math.floor(Math.random() * boardNotPlayed.length);
                }while(!boardNotPlayed[playOne].isHidden);
                this.clickPiece(boardNotPlayed[playOne]);

                for(let i = 0; i < boardOpenArray.length; i++){
                    if(boardNotPlayed[playOne].trueValue == boardOpenArray[i].trueValue && boardNotPlayed[playOne] != boardOpenArray[i]){
                        //If there is opend piece with the same value, then pick it as well.
                        this.clickPiece(boardOpenArray[i]);
                        console.log("There is 1 piece.");
                        return;
                    }
                }

                //There isnt any piece? Ok... randomize.
                do{
                    playTwo = Math.floor(Math.random() * boardNotPlayed.length);
                }while(!boardNotPlayed[playTwo].isHidden || playOne == playTwo);
                this.clickPiece(boardNotPlayed[playTwo]);
                console.log("Random");
                return;
            },
            clearTimer(){
                clearTimeout(this.timer);
                this.timer = null;
            }
        },
        computed:{
            currentPlayer: function(){ //For the lols (Seriously tho, upgrade this Z >:()
                return 'Player '+this.currentValue;
            }
        },
        mounted(){
            //Do something! :V
        }
    }

    class Board{
        constructor(numberOfPlayers, xAxis, yAxis){ // https://stackoverflow.com/questions/3220721/javascript-pattern-for-multiple-constructors
            this.board = [];
            this.numberOfPlayers = numberOfPlayers;
            this.playersHash = new Map();

            let arr = new Array();
            for(let i = 0; i < numberOfPlayers ; i++){
                arr.push("Player " + (i+1));
                arr.push(0);
                this.playersHash.set(i, arr);
                arr = new Array();
            }

            console.log("Entered on Board.");
            if (xAxis===undefined){ // We don't want to go for custom board!
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
</script>

<style> 

</style>