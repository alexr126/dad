<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div class="form-group">
			<label for="inputName">Name</label>
			<input
	            type="text" class="form-control"
	            name="name" id="inputName" 
	            placeholder="E-mail/Nickname"/>
		</div>
		<div class="form-group">
			<label for="inputName">Passord</label>
			<input
	            type="password" class="form-control"
	            name="password" id="inputPassword" 
	            placeholder="Passord"/>
		</div>
		<div class="form-group">
	        <a class="btn btn-default" v-on:click.prevent="login()">Login</a>
	        <a class="btn btn-default" v-on:click.prevent="register()">Register</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
	    methods: {
	        login: function(){
	        	console.log("User Loged In!");
	            console.log(this.user);
	            /*axios.post('api/users/'+this.user.id, this.user)
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.user, response.data.data);
	                });*/
	        },
	        register: function(){
	        	console.log("Register User!");
	        	
	        }
	    }
	}
</script>

<style scoped>	

</style>