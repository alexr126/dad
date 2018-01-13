<template>
	<div class="jumbotron">
		<h2>Login Administration</h2>
		<div>
			<div class="form-group">
				<label for="inputName">Username</label>
				<input type="text" class="form-control"
		               name="email" id="inputEmail" 
		               placeholder="Administrator e-mail" v-model="email"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Password</label>
				<input type="password" class="form-control"
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
            	if(this.email == "admin@mail.dad"){
                	this.login(this.email, this.password); 
                }else{
                	this.showSuccess = true;
	    			this.errorMessage = 'Access denied!';
                }             
			},
	    	login: function(email, password){
                axios.post('api/login', {email, password})
	    		.then(response=>{
	    			localStorage.setItem('token', response.data.access_token);
	    			//localStorage.setItem('expiration', );
	    			this.$router.push({path: "/users"});
	    		}).catch(error =>{
	    			this.showSuccess = true;
	    			this.errorMessage = 'Credentials are wrong!';
	    			console.log(error);
	    		});
	    	},
	    	/*
	    	fbLogin: function(){
	    		FB.login(function(response){
	    			if(response.status === 'connected'){
	    				localStorage.setItem('token', response.authResponse.accessToken);
	    				FB.api('/me', function(response){
	    					console.log('api ', response);
	    					localStorage.setItem('fbName', response.name);
	    					localStorage.setItem('fbId', response.id);
	    				})
	    			}else if(response.status === 'not_authorized'){
	    				console.log('Couldn\'t log in with fb');
	    			}else{
	    				console.log('You have no FB account');
	    			}
	    		});
	    	},*/
	    },
	}


</script>

<style scoped>	

</style>