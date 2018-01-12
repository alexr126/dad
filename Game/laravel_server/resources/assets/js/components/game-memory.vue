<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{game.gameID}}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="bg-info">
                <h3>Players On the game: </h3>
                <div v-for="(player, key) in game.arrayPlayers" >
                    <h5> {{key}} : {{player}}</h5>
                </div>
            </div>
            <div class="alert" :class="alert_type">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp; <a v-show="game.isGameEnded" v-on:click.prevent="closeGame">Close Game</a></strong>
            </div>
            <div class="board">
                <div v-for="(piece, key) of game.boardClass.board" >
                    <img v-bind:src="pieceImageURL(key)" v-on:click="clickPiece(key)">
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['game'],
        data: function(){
            return {}
        },
        computed: {
            ownPlayerNumber(){
                switch(this.$parent.socketId) {
                    case this.game.playerSockets[0]:
                        return 1;
                    case this.game.playerSockets[1]:
                        return 2;
                    case this.game.playerSockets[2]:
                        return 3;
                    case this.game.playerSockets[3]:
                        return 4;
                    default:
                        return 0;
                }
            },
            message(){
                console.log("1", this.game);
                if (!this.game.isGameStarted) {
                    return "Game has not started yet";

                } else if (this.game.gameEnded) {
                    let playerOrdered = new Array();
                    playerOrdered = this.game.arrayPlayers;
                    let scoreOrdered = new Array();
                    scoreOrdered = this.game.arrayScore;
                    let auxVariable;
                    do{         //Bubble Sort
                        auxVariable = false;
                        for (let j = 0; j < scoreOrdered.length-1; j++) {
                            if (scoreOrdered[j] < scoreOrdered[j]){
                                var tempScore = scoreOrdered[j];
                                scoreOrdered[j] = scoreOrdered[j+1];
                                scoreOrdered[j+1] = tempScore;

                                var tempPlayer = playerOrdered[j];
                                playerOrdered[j] = playerOrdered[j+1];
                                playerOrdered[j+1] = tempPlayer;

                                auxVariable = true;
                            }
                        }
                    }while (auxVariable);
                    if(scoreOrdered[0] == scoreOrdered[1]) //ToDo: IFThere is time, do it better.
                        return this.successMessage = "There has been a Tie.";

                    return this.successMessage = "Winner is " + playerOrdered[0] + " With " + scoreOrdered[0];
                } else {
                    if (this.game.currentPlayerPlaying == this.ownPlayerNumber) {
                        return "It's your turn";
                    } else {
                        return "It's '" + this.game.arrayPlayers[this.game.currentPlayerPlaying - 1] + "' turn";
                    }
                }
            },
            alert_type(){
                if (!this.game.isGameStarted) {
                    return "alert-warning";
                } else if (this.game.gameEnded) {
                    if (this.game.winner == this.ownPlayerNumber) {
                        return "alert-success";
                    } else if (this.game.winner == 0) {
                        return "alert-info";
                    }
                    return "alert-danger";
                }
                if (this.game.currentPlayerPlaying == this.ownPlayerNumber) {
                    return "alert-success";
                } else {
                    return "alert-info";
                }

            }
        },
        methods: {
            closeGame (){
                this.$emit('close-game', { gameID : this.game.gameID });
            },
            pieceImageURL: function (key) {
                this.pathToImage(this.game.boardClass.board[key]);
            },
            clickPiece: function (key) {
                if (!this.game.isGameEnded && this.game.isGameStarted){
                    if(this.game.currentPlayerPlaying != this.ownPlayerNumber){
                        alert("Not your Turn");
                    } else {
                        if(this.game.boardClass.board[key].isHidden) {
                            this.$parent.clickPiece(this.game, key);
                            this.pieceImageURL(key);
                        }
                        else
                            alert("You cant press One that is already Opened. Select another one!");
                    }
                }
                else{
                    alert("Game has not started Or Has ended!");
                }
            },
            pathToImage(piece){
                if(piece.isHidden){
                    return piece.pathHidden;
                }
                return piece.pathFlip;
            }

        }
    }
</script>

<style scoped>
    .gameseparator{
        border-style: solid;
        border-width: 2px 0 0 0;
        border-color: black;
    }
</style>