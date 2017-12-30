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
                    <img v-bind:src="pieceImageURL(key)" v-on:click="clickPiece(key)">
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
                boardClass: new Board(2,2,4),
                openValue: [], //Do the board with classes. There is only need for one board
                               // And, on the server, We should have the "boardDone" ready to go!
                startGame: true, //Just for the start, to look pretty! (Will be needed, stay!)
            }
        },
        methods: {
            pieceImageURL: function (key) { //To show the image on each square of the board.
                /*if(piece == '0'){
                    return 'img/' + 'hidden' + '.png';
                }else{
                    let imgSrc = String(piece);
                    return 'img/' + imgSrc + '.png';       
                }*/
                return this.boardClass.board[key].imagePath();

            },
            clickPiece: function(index) { //When a player clicks a piece.
                //Validations on Console. Explore it!
                console.log('Clicked on ' + index);
                console.log(this.boardClass.board);
                
                //If the game already ended OR if the piece is already clicked/Opened, then do nothing.
                if(!this.boardClass.board[index].isHidden || this.gameEnded || this.startGame) 
                    return;
                
                this.boardClass.board[index].flip();
                // this.boardClass.board[index].value = this.boardClass.board[index].trueValue;

                //This "openValue" is a way to see both clicked pieces. (Push adds a node)
                this.openValue.push(this.boardClass.board[index]);
                
                //Counter, for the number of moves each player has.
                this.currentMove++;

                //If the player only played ONE piece, we need to let him play the other!
                if(this.currentMove == 2){
                    
                    //We need to check now if there is 2 equal pieces.
                    this.checkValuesAreEqual();
                    
                    //Lets restart the counter!
                    this.currentMove = 0;

                    //Reset the array!
                    this.openValue = [];

                    //On the end, we need to check if the game is complete!
                    if(this.isBoardComplete()){
                        this.gameEnded = true;
                        this.showSuccess = true;
                        this.successMessage = 'Check who won.' //Seriously, check who won! Should be done on server, by having 2 arrays or smth! Do it Z 
                    }
                }else{
                    //Nothing happens! The current player can play another piece!
                }
            },
            restartGame:function(){ // We are restarting the game. We are sorting the current array, like the teacher said: "Com Randoms, façam um re-order do array. Apanhem 2 posições, e troquem uma com a outra". 
                console.log('restartGame / startGame');
                this.boardClass = new Board(2);               
                this.showSuccess = false;
                this.showFailure = false;
                this.successMessage = '';
                this.failMessage = '';
                this.currentValue = 1;
                this.gameEnded = false;
                this.startGame = false;
            },
            checkValuesAreEqual:function(){ //Checking if both pieces are equal. No need to validation, since this function is only called IF there are 2 numbers on "OpenValue"
                console.log("Checking if Pieces are equal.");
                if(this.openValue[0].trueValue == this.openValue[1].trueValue){ //They are equal
                    console.log("they are equal");
                    
                    //Object.assign(this.boardBefore, this.board);
                    
                    //console.log(this.boardBefore);
                    console.log(this.boardClass.board);
                    
                    //The player need to play again!
                    this.successMessage = 'Player '+ this.currentValue +' has Played. Play again!';
                    this.showSuccess = true;

                }else{ //If they aren't, we need to re-change to the original Board!
                    //Timeout first..
                    //sleep(1000); [SetTimeout(asd)! On Server] CleatTimeout check them all! ToDo:  
                    console.log("They aren't equal.");
                    
                    // Object.assign(this.board, this.boardBefore);
                    this.openValue[0].flip();
                    this.openValue[1].flip();

                    console.log(this.boardClass.board);
                    
                    //Lets change the player.
                    this.successMessage = 'Player '+ this.currentValue +' has Played';
                    this.showSuccess = true;
                    this.currentValue = (this.currentValue == 1)? 2 : 1; //Change player //Do :     this.currentValue%MAX_PLAYERS+1 
                }
            },
            isBoardComplete:function(){ //Checking if the board is completely "Open".
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
        constructor(numberOfPlayersOrXAxis, yAxis, size){ // https://stackoverflow.com/questions/3220721/javascript-pattern-for-multiple-constructors
        console.log("Entered on Board.");
        if (yAxis===undefined){ // We don't want to go for custom board!
            this.constructWithNumberOfPlayers(numberOfPlayersOrXAxis);
        }else{
            this.constructWithXAxisAndYAxis(numberOfPlayersOrXAxis, yAxis, size);            
            }
        }

        constructWithNumberOfPlayers(numberOfPlayers){
            this.board = [];
            this.numberOfPlayers = numberOfPlayers;

            console.log(this.numberOfPlayers);
            if (this.numberOfPlayers == 1 || this.numberOfPlayers == 2){
                //Board needs to be 4x4
                this.board = this.createBoard(4, 4, 16);
            } else if(this.numberOfPlayers == 3){
                //Board needs to be 4*6
                this.board = this.createBoard(4, 6, 24);
            } else if(this.numberOfPlayers == 4){
                //Board needs to be 6*6
                this.board = this.createBoard(6, 6, 36);
            }else{
                return;
            }
        }

        constructWithXAxisAndYAxis(xAxis, yAxis, size){
            this.board = this.createBoard(this.xAxis, this.yAxis, size);
        }
        
        createBoard(x, y, size){
            let board = new Array(size);
            //We have the board now. We need to populate it with the Pieces.
            let trueValue = 0;
            let counter = 0;
            for(let i = 0; i < size; i++){
                board[i] = new Piece(trueValue);
                counter++;
                if(counter == 2) { counter=0; trueValue++; }
            }
            for(let i = 0; i < 100 ; i++){
                let positionOne = Math.floor(Math.random() * (size - 0 + 1 - 1 )) + 0;
                let positionTwo = Math.floor(Math.random() * (size - 0 + 1 - 1 )) + 0;

                let temp = board[positionOne];
                board[positionOne] = board[positionTwo];
                board[positionTwo] = temp;
            }
            console.log(board);
            console.log(x + "__" + y + "__" + size + "!" );
            return board;
        }
    }

    class Piece{
        constructor(trueValue){
            console.log("new Piece!");
            this.isHidden = true; //true = Hidden.
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
        }
    }
</script>

<style> 

</style>