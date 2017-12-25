<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<form v-on:submit.prevent="handleLoginSubmit">
			<div class="form-group">
				<label for="inputName">Username</label>
				<input
		            type="text" class="form-control"
		            name="name" id="inputName" 
		            placeholder="Enter your e-mail or nickname" v-model="email"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Password</label>
				<input
		            type="password" class="form-control"
		            name="password" id="inputPassword" 
		            placeholder="Enter your password" v-model="password"/>
			</div>
			<div class="form-group">
		        <button class="btn btn-default">Login</button>
		    </div>
	    </form>
		<button class="btn btn-default" v-on:click.prevent="register()">Register</button>
	</div>
</template>

<script type="text/javascript">
	import Register from './register.vue';
	export default{
		data(){
			return{
				login: {
					email: "",
					password: ""
				}
			}
		},
	    methods: {
	    	handleLoginSubmit: function(){
	    		const loginData = {
	    			grant_type: 'password',
                    client_id: '2',
                    client_secret: 'gzEwHTp7kTbnMFkHKWVH1HCTp9pGa0eUWdD6Rpfb',
                    username: this.login.email,
                    password: this.login.password,
                    scope: ''
	    		}
	    		axios.post('login', loginData)
	    		.then(response=>{
	    			console.log(response.data.data);
	    		})
	    	},
	    	register: function(){
	    		
	    	}
	    },
	    components: {
	    	'registration': Register,
	    }
	}
</script>

<style scoped>	

</style>