<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div>
			<div class="form-group">
				<label for="inputName">Username</label>
				<input
		            type="text" class="form-control"
		            name="email" id="inputEmail" 
		            placeholder="Enter your e-mail" v-model="email"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Password</label>
				<input
		            type="password" class="form-control"
		            name="password" id="inputPassword" 
		            placeholder="Enter your password" v-model="password"/>
			</div>
		    <button class="btn btn-default" v-on:click.prevent="handleLoginSubmit()">Login</button>
		    <br><br>
		    <div class="alert alert-danger" v-if="showSuccess">
				<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
				<strong>{{ errorMessage }}</strong>
			</div>
	    </div>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				email: "",
				password: "",
				errorMessage: "",
				showSuccess: false,
				userToken: undefined				
			}
		},
	    methods: {
            handleLoginSubmit: function(){
                this.login(this.email, this.password);                
			},
	    	login: function(email, password){
	    		console.log("-------------", email, password); 
                axios.post('api/login', {email, password})
	    		.then(response=>{
	    			this.userToken = response.data.access_token;
	    			this.$router.push({path: "/users"});
	    		}).catch(error =>{
	    			alert("Wrong user!");
	    			console.log(error);
	    		})
	    	}
	    },

	}
</script>

<style scoped>	

</style>