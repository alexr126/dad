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

var MemoryGame = require('./gamemodel.js');
var GameList = require('./gamelist.js');

app.listen(8080, function(){
	console.log('listening on *:8080');
});

// ------------------------
// Estrutura dados - server
// ------------------------

let games = new GameList();

io.on('connection', function (socket) {
    console.log('client has connected');

    socket.on('create_game', function (data){
    	let game = games.createGame(socket.id, data.playerName, data.numberPlayer, data.XAxis, data.YAxis);
		socket.join(game.gameID);
		socket.emit('my_active_games_changed'); // Notifications to the client
        io.emit('lobby_changed');
    });

    socket.on('join_game_player', function (data){
        let game = games.joinGamePlayer(data.gameID, data.playerName, socket.id);
        socket.join(game.gameID);
        io.to(game.gameID).emit('my_active_games_changed');
        io.emit('lobby_changed');
    });

    socket.on('join_game_bot', function (data){
        let game = games.joinGameBot(data.gameID, "Bot", data.difficulty);
        socket.join(game.gameID);
        io.to(game.gameID).emit('my_active_games_changed');
        io.emit('lobby_changed');
    });

    socket.on('remove_game', function (data){
    	games.removeGame(data.gameID, socket.id);
    	socket.emit('my_active_games_changed');
    });

    socket.on('clickOnPiece', function (data){
        let game = games.gameByID(data.gameID);

        if (game === null) {
            socket.emit('invalid_play', {'type': 'Invalid_Game', 'game': null});
            return;
        }

        let numPlayer = 0;
        for(let i = 0; i < game.playerSockets.size; i++){
        	if(game.playerSockets.get(i)[0] === socket.id)
        		numPlayer = i + 1;
		}

        if (numPlayer === 0) {
            socket.emit('invalid_play', {'type': 'Invalid_Player', 'game': game});
            return;
        }
        if (game.clickPiece(numPlayer, data.index)) //ToChange
            io.to(game.gameID).emit('game_changed', game);
        else {
            socket.emit('invalid_play', {'type': 'Invalid_Play', 'game': game});
            return;
        }
    });

    socket.on('get_game', function (data){
        socket.emit('game_changed', games.gameByID(data.gameID));
    });

    socket.on('get_my_active_games', function (){
        socket.emit('my_active_games', games.getConnectedGamesOf(socket.id));
    });

    socket.on('get_my_lobby_games', function (){
        socket.emit('my_lobby_games', games.getLobbyGamesOf(socket.id));
    });
});
