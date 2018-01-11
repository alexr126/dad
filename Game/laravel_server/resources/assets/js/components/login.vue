<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div>
			<div class="form-group">
				<label for="inputEmail">Email</label>
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
	    </div>
		<button class="btn btn-default" v-on:click.prevent="register()">Register</button>
		<registration v-if="registeringUser" :email='email' :password='password' @user-registred="handleRegisterSubmit()" @cancel="cancel"></registration>
		<br><br>
		<div class="alert alert-danger" v-if="showSuccess">
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ errorMessage }}</strong>
		</div>
	</div>
</template>

<script type="text/javascript">
	import Register from './register.vue';
	export default{
		data(){
			return{
				email: "",
				password: "",
				registeringUser: false,
				errorMessage: "",
				showSuccess: false,
			}
		},
	    methods: {
	    	handleLoginSubmit: function(){
                this.login(this.email, this.password);                
			},
	    	login: function(email, password){
	    		console.log(email);
	    		console.log(password);
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
	    	register: function(){
	    		this.registeringUser = true;
	    	},
	    	cancel: function(){
	    		this.registeringUser = false;
	    	},
	    	handleRegisterSubmit: function(){
	    		this.login(this.email, this.password);
	    	},
	    },
	    components: {
	    	'registration': Register,
	    }
	}
</script>

<style scoped>	

</style>