/*jshint esversion: 6 */

var MemoryGame = require('./gamemodel.js');

class GameList {
	constructor() {
        this.contadorID = 0;
        this.games = new Map();
    }

    gameByID(gameID) {
    	let game = this.games.get(gameID);
    	return game;
    }

    createGame(socketID, playerName, numberPlayer, XAxis, YAxis) {
    	this.contadorID = this.contadorID+1;
    	let game = new MemoryGame(this.contadorID, playerName, numberPlayer, XAxis, YAxis);
        game.playerSockets = new Map(); // We will have a HashMap of Sockets.
		let array = new Array();
		array.push(socketID, playerName);
        game.playerSockets.set(game.playerSockets.size, array);
        this.games.set(game.gameID, game);
    	return game;
    }

    joinGameBot(gameID, difficulty){
		let game = this.gameByID(gameID);

		if(game===null)
			return null;

		let array = new Array();
		array.push(0, "Bot");
		game.playerSockets.set(game.playerSockets.size, array);

		game.joinBot(difficulty);	//Need correction.
	}

    joinGamePlayer(gameID, playerName, socketID) {
    	let game = this.gameByID(gameID);

    	if (game===null)
    		return null;

    	if(game.boardClass.playersHash.size === game.playerSockets.size){
    		console.log("Can't add more players");
    		return;
		}

		let array = new Array();
    	array.push(socketID, playerName);
    	game.playerSockets.set(game.playerSockets.size, array);

    	game.joinPlayer(playerName);
    	return game;
    }

    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);

    	if (game===null)
    		return null;

    	//If we have a bot
		if(game.playerSockets.get(1)[1] === "Bot"){				//Remember. HashMap<value, [socketID, PlayerName]>
            if (game.playerSockets.get(0)[0] === socketID) {
                game.playerSockets.set(0, "");
                this.games.delete(gameID);
                return;
            }
            return game;
        }
        //If we have real players
		for (let i = 0; i < game.playerSockets.size; i++) {
			if (game.playerSockets.get(i)[0] === socketID) {
				game.playerSockets.get(i)[1] = "";
			}
		}

        for(let i = 0; i < game.playerSockets.size; i++) {
            if (!(game.playerSockets.get(i)[1] === "")) {
				return game;
            }
        }

        this.games.delete(gameID);
        return game;
    }

    getConnectedGamesOf(socketID) {
    	let games = [];
    	for(let i = 0; i < this.games.size; i++) {
            for (let j = 0; j < this.games.get(i).playerSockets.size; j++) {
	            if (this.games.get(i).playerSockets.get(j)[0] === socketID)
	            	games.push(this.games.get(i));
			}
		}
		return games;
    }

    getLobbyGamesOf(socketID) {
        let games = [];
        for(let i = 0; i < this.games.size; i++) {
            for (let j = 0; j < this.games.get(i).playerSockets.size; j++) {
                if (this.games.get(i).playerSockets.get(j)[0] !== socketID)
                    games.push(this.games.get(i));
            }
        }
        return games;
    }
}

module.exports = GameList;
