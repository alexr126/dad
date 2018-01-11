/*jshint esversion: 6 */

var MemoryGame = require('./gamemodel.js');

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

        game.playerSockets = new Map();
		let array = new Array();
		array.push(socketID, playerName);
        game.playerSockets.set(game.playerSockets.size, array); //game.playerSockets.size *WILL* start at 0.
        this.games.set(game.gameID, game);
        console.log("---->game.playerSockets : ", game.playerSockets)
        return game;
    }

    //Join for a Player.
    joinGamePlayer(gameID, playerName, socketID) {
        let game = this.gameByID(gameID);

        if (game == null)
            return null;

        if (game.playersHash.size == game.playerSockets.size){
            alert("Can't add more players");
            return;
        }

        let array = new Array();
        array.push(socketID, playerName);
        game.playerSockets.set(game.playerSockets.size, array);

        game.joinPlayer(playerName);
        return game;
    }

    //Join for a Bot.
    joinGameBot(gameID, difficulty){
		let game = this.gameByID(gameID);

		if(game == null)
			return null;

        if (game.playersHash.size == game.playerSockets.size){
            alert("Can't add more bots");
            return;
        }

		let array = new Array();
		array.push(0, "Bot");
		game.playerSockets.set(game.playerSockets.size, array);

		game.joinBot(difficulty);
		return game;
	}

	//Destroy a game.
    removeGame(gameID, socketID) {
    	let game = this.gameByID(gameID);

    	if (game == null)
    		return null;

    	//If we have a bot
		if(game.playerSockets.get(1)[1] === "Bot"){ //Remember. HashMap<value, [socketID, PlayerName]>
            if (game.playerSockets.get(0)[0] == socketID) {
                game.playerSockets.set(0, "");
                this.games.delete(gameID);
                return;
            }
            return game;
        }
        //If we have real players
		for (let i = 0; i < game.playerSockets.size; i++) {
			if (game.playerSockets.get(i)[0] == socketID) {
				game.playerSockets.get(i)[1] = "";
				break;
			}
		}

		//If all players left, then delete the game.
        for(let i = 0; i < game.playerSockets.size; i++) {
            if (!(game.playerSockets.get(i)[1] == "")) {
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
            for (let j = 0; j < game.playerSockets.size; j++) {
	            if (game.playerSockets.get(j)[0] == socketID) {
                    games.push(game);
                    break;
                }
			}
		}
		return games;
    }

    //Get all the Non-Connected Games of a SocketID
    getLobbyGamesOf(socketID) {
        let games = [];
        for(let i = 0; i < this.games.size; i++) {
            let game = this.games.get(i);
            if(game.playerSockets.size == game.playersHash.size) {} //Its already full
            else {
                for (let j = 0; j < game.playerSockets.size; j++) {
                    if (game.playerSockets.get(j)[0] != socketID) {
                        if (!games.includes(game))
                            games.push(this.games.get(i));
                    }
                }
            }
        }
        return games;
    }
}

module.exports = GameList;
