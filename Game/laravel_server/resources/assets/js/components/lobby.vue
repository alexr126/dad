<template>
	<table class="table table-striped">
	    <thead>
	        <tr>
	            <th>ID</th>
	            <th>Player 1</th>
	            <th>Actions</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="game in games"  :key="game.gameID">
	            <td>{{ game.gameID }}</td>
	            <td>{{ game.playerOne}}</td>
	            <td>
	                <a class="btn btn-xs btn-primary" v-on:click.prevent="join(game)">Join</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['games'],
        methods: {
		    //Join a game
            join(game) {
            	this.$emit('join_game_player', game);
            },
        },		
	}
</script>

<style scoped>

</style>