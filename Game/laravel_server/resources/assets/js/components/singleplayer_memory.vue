<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br/>
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
        data: function () {
            return {
                title: 'Memory',
                showSuccess: true,
                showFailure: false,
                successMessage: '',
                failMessage: '',
                playerOne: "Insert..",
                currentMove: 0,
                gameEnded: false,
                boardClass: new Board(1),
                openValue: [],
                startGame: true,
            }
        },
        methods: {
            pieceImageURL: function (key) { //To show the image on each square of the board.
                return this.boardClass.board[key].imagePath();
            },
            clickPiece: function (piece) { //When a player clicks a piece.

                //If the game already ended OR if the piece is already clicked/Opened, then do nothing.
                if (!piece.isHidden || this.gameEnded || this.startGame) return;

                console.log(this.openValue.size);

                piece.flip();

                //This "openValue" is a way to see both clicked pieces. (Push adds a node)
                this.openValue.push(piece);

                //Counter, for the number of moves each player has.
                this.currentMove++;

                //If the player only played ONE piece, we need to let him play the other!
                if (this.currentMove === 2) {

                    //We need to check now if there is 2 equal pieces.
                    this.checkValuesAreEqual();

                    console.log("checked if values are equal.");
                    //Lets restart the counter!
                    this.currentMove = 0;

                    //Reset the array!
                    //this.openValue = [];

                    //On the end, we need to check if the game is complete!
                    if (this.isBoardComplete()) {
                        this.gameEnded = true;
                        this.showSuccess = true;
                    }
                    return;
                }
                //Nothing happens! The current player can play another piece!

            },
            restartGame: function () { // We are restarting the game. We are sorting the current array, like the teacher said: "Com Randoms, façam um re-order do array. Apanhem 2 posições, e troquem uma com a outra".
                this.boardClass = new Board(1); //Board : NumberOfPlayers, XAxis and YAxis
                this.showSuccess = false;
                this.showFailure = false;
                this.successMessage = '';
                this.failMessage = '';
                this.gameEnded = false;
                this.startGame = false;
            },
            checkValuesAreEqual: function () { //Checking if both pieces are equal. No need to validation, since this function is only called IF there are 2 numbers on "OpenValue"
                console.log("Checking if Pieces are equal.");
                if (this.openValue[0].trueValue === this.openValue[1].trueValue) { //They are equal
                    console.log("they are equal-----" , this.boardClass);

                    //Lets restart the counter!
                    this.currentMove = 0;

                    //Reset the array!
                    this.openValue = [];

                } else { //If they aren't, we need to re-change to the original Board!

                    this.timer = setTimeout(() => {

                        this.clearTimer();

                        console.log(this.openValue[0]);
                        this.openValue[0].flip();
                        this.openValue[1].flip();

                        console.log(this.boardClass.board);

                        //Reset the array!
                        this.openValue = [];

                        //Lets restart the counter!
                        this.currentMove = 0;

                    }, 500);
                }
            },
            isBoardComplete: function () { //Checking if the board is completely "Open".
                let returnValue = true;
                this.boardClass.board.forEach(function (element) {
                    if (element.isHidden == true) {
                        returnValue = false;
                        console.log(returnValue);
                        return;
                    }
                });
                console.log(returnValue);
                return returnValue;
            },
            clearTimer() {
                clearTimeout(this.timer);
                this.timer = null;
            }
        }
    }
    class Board{
        constructor(numberPlayers, xAxis, yAxis){ // https://stackoverflow.com/questions/3220721/javascript-pattern-for-multiple-constructors
            this.board = [];

            if (xAxis===undefined){ // We don't want to go for custom board!
                this._constructWithNumberOfPlayers();
            }else{
                this._constructWithXAxisAndYAxis(xAxis, yAxis);
            }
        }

        _constructWithNumberOfPlayers(){
            this.board = this.createBoard(4, 4);
        }

        _constructWithXAxisAndYAxis(xAxis, yAxis){
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

    class Piece {
        constructor(trueValue) {
            this.isHidden = true; //true = Hidden.
            this.wasOpen = false; //If it was opened.
            this.trueValue = trueValue;
            this.pathHidden = 'img/' + 'hidden' + '.png';
            this.pathFlip = 'img/' + String(this.trueValue) + '.png';
        }

        imagePath() { //To show the image on each square of the board.
            if (this.isHidden)
                return this.pathHidden;
            else
                return this.pathFlip;
        }

        flip() {
            this.isHidden = !this.isHidden;
            this.wasOpen = true;
        }
    }
</script>

<style>	
    
</style>