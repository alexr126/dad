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
		<div class="alert alert-danger" v-if="showError">
			<button type="button" class="close-btn" v-on:click="showError=false">&times;</button>
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
				showError: false,
				user: {
					nickname: "",
					email: "",
					id: null,
					name: ""
				}
			}
		},
	    methods: {
	    	handleLoginSubmit: function(){
                this.login(this.email, this.password);                
			},
	    	login: function(email, password){
                axios.post('api/login', {email, password})
	    		.then(response=>{
	    			this.saveUserInStorage(response.data.access_token, email);
	    			//localStorage.setItem('expiration', );
	    			this.$router.push({path: "/users", props: {user: this.user}});
	    		}).catch(error =>{
	    			this.showError = true;
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
	    	saveUserInStorage: function(token, email){
	    		//guardar o token no localStorage
	    		localStorage.setItem('token', token);
	    	}
	    },
	    components: {
	    	'registration': Register,
	    }
	}
</script>

<style scoped>	

</style>