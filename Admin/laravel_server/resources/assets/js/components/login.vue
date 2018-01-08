<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div>
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
		    <button class="btn btn-default" v-on:click.prevent="login()">Login</button>
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
				user: "",
				email: "",
				password: "",
				errorMessage: "",
				showSuccess: false,
				isAuth: false,
			}
		},
	    methods: {
	    	login: function(){
	    		axios.post('api/login', {
	    			email: this.email,
	    			password: this.password
				})
	    		.then(response=>{
	    			this.$router.push({path: "/users"});

	    		}).catch(error =>{
	    			console.log(error);
	    		})
	    	}
	    },

	}
</script>

<style scoped>	

</style>