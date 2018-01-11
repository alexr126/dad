<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <br>
            <h2>Current Player : {{ currentPlayer }}</h2>
            <p>Set current player name <input v-model.trim="currentPlayer"></p>
            <p><em>Player name replaces authentication! Use different names on different browsers, and don't change it frequently.</em></p>
            <hr>
            <h3 class="text-center">Lobby</h3>
            <p><button class="btn btn-xs btn-success" v-on:click.prevent="createGame">Create a New Game</button></p>
            <hr>
            <h4>Pending games (<a @click.prevent="loadLobby">Refresh</a>)</h4>
            <lobby :games="lobbyGames" @join_game_player="joinPlayer"></lobby>
            <template v-for="game in activeGames">
                <game :game="game"></game>
            </template>
        </div>
    </div>
</template>

<script type="text/javascript">
    import Lobby from './lobby.vue';
    import MemoryGame from './game-memory.vue';

    export default {
        data: function(){
            return {
                title: 'Multiplayer Memory',
                currentPlayer: 'Player X',
                lobbyGames: [],
                activeGames: [],
                socketId: "",
            }
        },
        sockets:{
            connect(){
                console.log('socket connected');
                this.socketId = this.$socket.id;
            },
            disconnect(){
                console.log('socket disconnect');
                this.socketId = "";
            },
            lobby_changed(){
                this.loadLobby();
            },
            my_active_games_changed(){
                this.loadActiveGames();
            },
            my_active_games(games){
                this.activeGames = games;
            },
            my_lobby_games(games){
                this.lobbyGames = games;
            }
        },
        methods: {
            loadLobby(){
                this.$socket.emit('get_my_lobby_games');
            },
            loadActiveGames(){
                this.$socket.emit('get_my_active_games');
            },
            createGame(){
                // For this to work, server must handle (on event) the "create_game" message
                if (this.currentPlayer === "") {
                    alert('Current Player is Empty - Cannot Create a Game');
                }
                else {
                    console.log("I created.");
                    this.$socket.emit('create_game', { playerName: this.currentPlayer, numberPlayer: 2, XAxis: null, YAxis: null});
                }
            },
            joinPlayer(game) {
                console.log(game.playersHash);
                for (let i = 0; i < game.playersHash.size; i++){
                    if (game.playersHash.get(i)[0] === this.currentPlayer) { //ToDo: Fix the error of the PlayersHash.
                        alert('Cannot join a game because your name is the same as Player ' + i+1);
                        return;
                    }
                }
                this.$socket.emit('join_game_player', {gameID: game.gameID, playerName: this.currentPlayer });
            },
            clickPiece(game, index){
                this.$socket.emit('clickOnPiece', )

            },
            close(game){
                // to close a game
            }
        },
        components: {
            'lobby': Lobby,
            'game': MemoryGame,
        },
        mounted() {
            this.loadLobby();
        }

    }
</script>

<style>

</style>