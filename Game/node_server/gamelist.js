/*jshint esversion: 6 */

var MemoryGame = require('./gamemodel.js');
var Board = require('./Board.js');
var Piece = require('./Piece.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    //Get a game By ID.
    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    //Create a Game.
    createGame(socketID, playerName, numberPlayer, XAxis, YAxis) {
    	let game = new MemoryGame(this.contadorID, playerName, numberPlayer, XAxis, YAxis);
    	this.contadorID = this.contadorID+1;

        game.playerSockets = new Array();
        game.playerSockets.push(socketID);

        this.games.set(game.gameID, game);

        return game;
    }

    //Join for a Player.
    joinGamePlayer(gameID, playerName, socketID) {
        let game = this.gameByID(gameID);

        if (game == null)
            return null;

        if (game.playerSockets.length == game.numberPlayerXYAxis[0]){
            return "Can't add more players";
        }

        if(game.joinPlayer(playerName) == "OK"){
            game.playerSockets.push(socketID);
            return game;
        }

        return "Error On JoinGamePlayer!";
    }

    //Join for a Bot.
    joinGameBot(gameID, difficulty){
		let game = this.gameByID(gameID);

		if(game == null)
			return null;

        if (game.playerSockets.length == game.numberPlayerXYAxis[0]){
            return "Can't add more bots";
            return;
        }

        if(game.joinBot(difficulty) == "OK"){
            game.playerSockets.push(0);
            return game;
        }

		return "Error On JoinGameBot!";
	}

	//Destroy a game.
    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);

    	if (game == null)
    		return null;

        //If we have a Bot
        if(game.playerSockets[1] == "Bot"){
            if (game.playerSockets[0] == socketID) {
                game.playerSockets[0] = "";
                this.games.delete(gameID);
                return;
            }
            return game;
        }

        //If we have real players
        for (let i = 0; i < game.playerSockets.length; i++) {
            if (game.playerSockets[i] == socketID) {
                game.playerSockets[i] = "";
                break;
            }
        }

		//If all players left, then delete the game.
        for(let i = 0; i < game.playerSockets.length; i++) {
            if (!(game.playerSockets[i] == "")) {
                return game;
            }
        }

        this.games.delete(gameID);
        return game;
    }

    //Get all the Connected Games of a SocketID.
    getConnectedGamesOf(socketID) {
    	let games = [];
    	for(let i = 0; i < this.games.size; i++) {
            let game = this.games.get(i);
            for (let j = 0; j < game.playerSockets.length; j++)
                if (game.playerSockets[j] == socketID)
                    games.push(game);
        }
		return games;
    }

    //Get all the Non-Connected Games of a SocketID
    getLobbyGamesOf(socketID) {
        let games = [];
        for(let i = 0; i < this.games.size; i++) {
            let game = this.games.get(i);
            if(game.playerSockets.length == game.numberPlayerXYAxis[0]) {} //Its already full
            else
                for (let j = 0; j < game.playerSockets.length; j++)
                    if (game.playerSockets[i] != socketID)
                        if (!games.includes(game))
                            games.push(this.games.get(i));
        }
        return games;
    }
}

module.exports = GameList;
