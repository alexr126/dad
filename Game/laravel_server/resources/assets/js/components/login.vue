<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div>
			<form v-on:submit="handleLoginSubmit()">
				<div class="form-group">
					<label for="inputName">Username</label>
					<input
			            type="text" class="form-control"
			            name="email" id="inputName" 
			            placeholder="Enter your e-mail or nickname" v-model="email"/>
				</div>
				<div class="form-group">
					<label for="inputPassword">Password</label>
					<input
			            type="password" class="form-control"
			            name="password" id="inputPassword" 
			            placeholder="Enter your password" v-model="password"/>
				</div>
			    <button class="btn btn-default">Login</button>
		    </form>
	    </div>
		<button class="btn btn-default" v-on:click.prevent="register()">Register</button>
		<registration v-if="registeringUser" :user='currentUser' @user-registred="handleRegisterSubmit" @cancel="cancel"></registration>
	</div>
</template>

<script type="text/javascript">
	import Register from './register.vue';
	export default{
		data(){
			return{
				email: "",
				password: "",
				currentUser: null,
				registeringUser: false
			}
		},
	    methods: {
	    	handleLoginSubmit: function(){
	    		this.login(this.email, this.password);	    		
	    	},
	    	register: function(){
	    		this.registeringUser = true;
	    	},
	    	cancel: function(){
	    		this.registeringUser = false;
	    	},
	    	handleRegisterSubmit: function(user){
	    		this.currentUser = user;
	    		this.login(user.email, user.password);

	    		//this.login
	    	},
	    	login: function(email, password){
	    		this.$http.post('api/login', {email, password})
	    		.then(response=>{
	    			console.log(response);
	    		})
	    	}
	    },
	    components: {
	    	'registration': Register,
	    }
	}
</script>

<style scoped>	

</style>