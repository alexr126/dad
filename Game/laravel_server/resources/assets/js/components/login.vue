<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div>
			<form v-on:submit.prevent="handleLoginSubmit()">
				<div class="form-group">
					<label for="inputName">Username</label>
					<input
			            type="text" class="form-control"
			            name="user" id="inputName" 
			            placeholder="Enter your e-mail or nickname" v-model="user"/>
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
				user: "",
				password: "",
				currentUser: null,
				registeringUser: false,
				errorMessage: "",
				showSuccess: false,
			}
		},
	    methods: {
	    	handleLoginSubmit: function(){
	    		axios.get('api/users/nickname/'+this.user)
    			.then(response=>{
    				if(response.data.data.length == 0){
    					axios.get('api/users/email/'+this.user)
    						.then(response=>{
    							if(response.data.data.length == 0){
    								this.showSuccess = true;
    								this.errorMessage = 'Credentials are wrong!'; 
    							}else{
    								this.login(this.user, this.password);
    							}
    						})
    				}else{
    					this.login(response.data.data[0].email, this.password);
    				}
    			})		
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
	    	},
	    	login: function(email, password){
	    		axios.post('api/login', {email, password})
	    		.then(response=>{
	    			this.$router.push({path: "/users"});	    			
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