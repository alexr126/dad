/*jshint esversion: 6 */

var app = require('http').createServer();

// CORS TRIALS
// var app = require('http').createServer(function(req,res){
// 	// Set CORS headers
// 	res.setHeader('Access-Control-Allow-Origin', 'http://dad.p6.dev');
// 	res.setHeader('Access-Control-Request-Method', '*');
// 	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	res.setHeader('Access-Control-Allow-Headers', req.header.origin);
// 	if ( req.method === 'OPTIONS' ) {
// 		res.writeHead(200);
// 		res.end();
// 		return;
// 	}
// });

var io = require('socket.io')(app);

var GameList = require('./gamelist.js');
var MemoryGame = require('./gamemodel.js');
var Board = require('./Board.js');
var Piece = require('./Piece.js');


app.listen(8080, function(){
	console.log('listening on *:8080');
});

// ------------------------
// Estrutura dados - server
// ------------------------

let games = new GameList();

io.on('connection', function (socket) {
    console.log('client has connected');

    /* Create a Game. Needs:
     * -- SocketID @NotNull
     * -- PlayerName @NotNull
     * -- NumberOfPlayers @Nullable
     * -- XAxis @Nullable If NumberOfPlayers != null
     * -- YAxis @Nullable If NumberOfPlayers != null
     */
    socket.on('create_game', function (data){
    	let game = games.createGame(socket.id, data.playerName, data.numberPlayer, data.XAxis, data.YAxis);

        socket.join(game.gameID);
		socket.emit('my_active_games_changed'); // Notifications to the client

        io.emit('lobby_changed');
    });

    /* Function for a Player to join a game. Needs:
     * -- GameID @NotNull
     * -- PlayerName @NotNull
     * -- SocketID @NotNull
     */
    socket.on('join_game_player', function (data){
        let game = games.joinGamePlayer(data.gameID, data.playerName, socket.id);

        socket.join(game.gameID);

        io.to(game.gameID).emit('my_active_games_changed');
        io.emit('lobby_changed');
    });

    /* Function for a Bot to join a game. Needs:
     * -- GameID @NotNull
     * -- Difficulty Of the Bot @NotNull
     */
    socket.on('join_game_bot', function (data){
        let game = games.joinGameBot(data.gameID, data.difficulty);

        socket.join(game.gameID);

        io.to(game.gameID).emit('my_active_games_changed');
        io.emit('lobby_changed');
    });

    /* Function to Remove a Person from a game or the hole game. Needs:
     *  -- GameID @NotNull
     *  -- SocketID @NotNull
     */
    socket.on('remove_game', function (data){
    	games.removeGame(data.gameID, socket.id);

    	socket.emit('my_active_games_changed');
    });

    /* Function to get a Specific Game. Needs:
     * -- GameID @NotNull
     */
    socket.on('get_game', function (data){
        socket.emit('game_changed', games.gameByID(data.gameID));
    });

    /* Function to get a list of Active Game by a User. Needs:
     * -- SocketID @NotNull
     */
    socket.on('get_my_active_games', function (){
        socket.emit('my_active_games', games.getConnectedGamesOf(socket.id));
    });

    /* Function to get list of lobby Game available for a User. Needs:
     * -- SocketID @NotNull
     */
    socket.on('get_my_lobby_games', function (){
        socket.emit('my_lobby_games', games.getLobbyGamesOf(socket.id));
    });

    /* Function to Play. Needs:
     * GameID @NotNull
     * Index @NotNull
     */
    socket.on('click_on_piece', function (data){
        let game = games.gameByID(data.gameID);

        if (game == null)
            return;

        let numPlayer = 0;
        for (let i = 0; i < game.playerSockets.length; i++)
        	if (game.playerSockets[i] == socket.id)
                numPlayer = i + 1;

        if (numPlayer == 0) {
            socket.emit('invalid_play', {'type': 'Invalid_Player', 'game': game});
            return;
        }

        if(game.clickPieceM(data.key)) {
            io.to(game.gameID).emit('game_changed', game);
        }

        if(game.currentMove == 2){
            console.log("Its me! I'm on second move.");
            if(!game.checkValuesAreEqualM()){
                console.log("Its me! I didn't choose equal.");
                const timerA = setTimeout(() => {
                    console.log("Its me! I did enter Timer.1");
                    game.hideClickedPieces();
                    io.to(game.gameID).emit('game_changed', game);
                    if(game.currentPlayerPlaying == 2 && game.arrayPlayers[game.currentPlayerPlaying - 1] == "Bot"){
                        //Bot time.
                        console.log("Bot Time!");
                        io.to(game.gameID).emit('play_bot_again', game);
                        //game.getFinalComplete();
                    }
                }, 300);
            }
        } else {
            //game.getFinalComplete();
            return;
        }
    });

    socket.on('play_that_bot', function (data) {
        let game = games.gameByID(data.gameID);

        if (game == null)
            return;
        if(game.isGameEnded == true){
            return;
        }
        if(game.currentPlayerPlaying == 2 && game.arrayPlayers[game.currentPlayerPlaying - 1] == "Bot") {
            if(game.playBot(game.possibleDifficulty) == false){
                console.log("Bot : I got false");
                io.to(game.gameID).emit('game_changed', game);
                console.log("Bot : He didn't choose equal.");
                const timerB = setTimeout(() => {
                    console.log("Bot : I did enter Timer.2");
                    game.hideClickedPieces();
                    console.log("Bot : I Hidden Pieces. Going to change.");
                    io.to(game.gameID).emit('game_changed', game);
                    return;
                }, 300);
            }else{
                io.to(game.gameID).emit('game_changed', game);
                console.log("Bot : I Managed to Win! Go again.");
                if(game.getFinalComplete() == false) {
                    io.to(game.gameID).emit('play_bot_again', game);
                }else{
                    game = game.getFinalComplete();
                }
                io.to(game.gameID).emit('game_changed', game);
                return;
            }
        }else {
            console.log("ASD")
            if(!game.getFinalComplete() == false) {
                game = game.getFinalComplete();
            }
            io.to(game.gameID).emit('game_changed', game);
            return;
        }
    })

    socket.on('check_if_finished', function (data) {
        let game = games.gameByID(data.gameID);

        if (game == null)
            return;
        if(game.isGameEnded == true){
            return;
        }

        game.getFinalComplete();
    })
});
