<template>
    <div>
        <div>
            <h3 class="text-center">{{ title }}</h3>
            <p> Hi, {{currentPlayer}}</p>
            <hr>
            <br>
            <h3 class="text-center">Lobby</h3>
            <p>
                <p>Number of Players <input v-model.trim="numberOfPlayers"></p>
                <p>
                    <p>XAxis  <input v-model.trim="XAxis">  YAxis  <input v-model.trim="YAxis"></p>
                </p>
                <button class="btn btn-xs btn-success" v-on:click.prevent="createGame">Create a New Game</button>
            </p>
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
                currentPlayer: '',
                numberOfPlayers: 2,
                XAxis: 0,
                YAxis: 0,
                lobbyGames: [],
                activeGames: [],
                socketId: "",
            }
        },
        sockets:{
            connect(){
                console.log('Socket Connected : ', this.$socket.id);
                this.socketId = this.$socket.id;
            },
            disconnect(){
                console.log('Socket Disconnect : ', this.$socket.id);
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
            },
            game_changed(game){
                for (let lobbyGame of this.lobbyGames) {
                    if (game.gameID == lobbyGame.gameID) {
                        Object.assign(lobbyGame, game);
                        break;
                    }
                }
                for (let activeGame of this.activeGames) {
                    if (game.gameID == activeGame.gameID) {
                        Object.assign(activeGame, game);
                        break;
                    }
                }
            },
            flip(piece){
                piece.isHidden = !piece.isHidden;
                piece.wasOpen = true;
            },
            play_bot_again(game){
                this.playBotAgain(game);
            },
            check_for_done(game){
                this.checkForDone(game);
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
                if (this.currentPlayer == "") {
                    alert('Current Player is Empty - Cannot Create a Game');
                    return;
                }

                if (isNaN(this.numberOfPlayers) ){
                    alert('numberOfPlayers needs to be a number And filled!');
                    return;
                }

                if(this.numberOfPlayers > 4 || this.numberOfPlayers < 1) {
                    alert('numberOfPlayers needs to be between 2 and 4');
                    return;
                }

                if (isNaN(this.YAxis) || isNaN(this.XAxis) ){
                    alert('YAxis or XAxis needs to be a number');
                    return;
                }else if (this.YAxis*this.XAxis%2 != 0){
                    alert('Put a Table that is pair.');
                    return;
                }else if (this.YAxis * this.XAxis > 80){
                    alert('Put a lower Table.');
                    return;
                }else if (this.YAxis * this.XAxis < 2 && !(this.XAxis == 0 && this.YAxis == 0)){
                    alert('Put a Higher Table.');
                    return;
                }
                console.log("---", this.currentPlayer);
                this.$socket.emit('create_game', { playerName: this.currentPlayer, numberPlayer: this.numberOfPlayers, XAxis: this.XAxis, YAxis: this.YAxis});
            },
            joinPlayer(game) {
                for (let i = 0; i < game.arrayPlayers.length; i++){
                    if (game.arrayPlayers[i] === this.currentPlayer) {
                        alert('Cannot join a game because your name is the same as a Player');
                        return;
                    }
                }
                this.$socket.emit('join_game_player', {gameID: game.gameID, playerName: this.currentPlayer });
            },
            joinBot(game, difficulty) {
                if(difficulty == 0){
                    alert("Select a Difficulty!");
                    return;
                }
                this.$socket.emit('join_game_bot', {gameID: game.gameID, difficulty: difficulty});
            },
            clickPiece(game, key){
                this.$socket.emit('click_on_piece', {gameID: game.gameID, key: key });
                // this.flip(game.boardClass.board[key]);
            },
            close(game){
                this.$socket.emit('remove_game', {gameID : game.gameID});
            },
            playBotAgain(game){
                this.$socket.emit('play_that_bot', {gameID : game.gameID});
            },
            checkForDone(game){
                this.$socket.emit('check_for_done', {gameID : game.gameID});
            }
        },
        components: {
            'lobby': Lobby,
            'game': MemoryGame,
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem('token');
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.get('api/user/').then(response=>{
                this.currentPlayer = response.data.nickname;
            });
            this.loadLobby();
        }

    }
</script>

<style>

</style>