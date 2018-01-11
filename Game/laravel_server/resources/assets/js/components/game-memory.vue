<template>
    <div class="gameseparator">
        <div>
            <h2 class="text-center">Game {{game.gameID}}</h2>
            <br>
        </div>
        <div class="game-zone-content">
            <div class="alert" :class="alerttype">
                <strong>{{ message }} &nbsp;&nbsp;&nbsp;&nbsp;<a v-show="game.gameEnded" v-on:click.prevent="closeGame">Close Game</a></strong>
            </div>
            <div class="board">
                <div v-for="(piece, key) of game.boardClass.board" >
                    <img v-bind:src="pieceImageURL(piece)" v-on:click="clickPiece(piece)">
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
            return {

            }
        },
        computed: {
            message(){
                if(this.game.gameEnded){
                    let winnerNumber = 0;
                    let winnerName = 0;
                    this.game.playersHash.forEach(function (item, key, mapObj){ // The Map : PlayerName and gameValue
                        if(winnerNumber < item[1]){
                            winnerNumber = item[1];
                            winnerName = item[0];
                        }
                    });
                    return this.successMessage = "Winner is " + winnerName + " With " + winnerNumber;
                }
                //return "Player" + this.game.playersHash.get(this.game.currentValue - 1)[0] + "Played";
                return "Error... Check.";
            },
            alerttype(){
                if(this.game.gameEnded){
                    return "alert-success";
                }
                return "alert-info";
            }
        },
        methods: {
            closeGame (){
                console.log(this.game);
                this.$emit('close-game', { gameID : this.game.gameID });
            },
            pieceImageURL: function (piece) {
                if(piece.isHidden)
                    return piece.pathHidden;
                else
                    return piece.pathFlip;
            },
            clickPiece: function(piece) {
                this.$emit('clickPiece', { gameID: this.game.gameID, piece: piece });
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