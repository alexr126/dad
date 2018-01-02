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
		    <button class="btn btn-default" v-on:click.prevent="LoginSubmit()">Login</button>
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
			}
		},
	    methods: {
	    	LoginSubmit: function(){
	    		axios.get('api/users/nickname/'+this.user)
    			.then(response=>{
    				if(response.data.data.length == 0){
    					axios.get('api/users/email/'+this.user)
    						.then(response=>{
    							if(response.data.data.length == 0){
    								this.showSuccess = true;
    								this.errorMessage = 'Credentials are wrong!'; 
    							}else{
    								if(response.data.data[0].admin == 1){
    									this.login(this.user, this.password);
    								}
    								else{
			    						this.showSuccess = true;
										this.errorMessage = 'This is restricted area. Only Administrators are allowed!';
									} 
			    				}
    						})
    				}else{
    					if(response.data.data[0].admin == 1){
    						this.login(response.data.data[0].email, this.password);
    					}else{
    						this.showSuccess = true;
							this.errorMessage = 'This is restricted area. Only Administrators are allowed!'; 
    					}
    				}
    			})

	    	},
	    	login: function(email, password){
	    		axios.post('api/login', {email, password})
	    		.then(response=>{
	    			console.log(response);
	    		})
	    	}
	    },

	}
</script>

<style scoped>	

</style>