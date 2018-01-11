<template>
	<div class="jumbotron">
		<h2>Login</h2>
		<div>
			<div class="form-group">
				<label for="inputName">Username</label>
				<input type="text" class="form-control"
		               name="email" id="inputEmail" 
		               placeholder="Enter your e-mail" v-model="email"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Password</label>
				<input type="password" class="form-control"
		               name="password" id="inputPassword" 
		               placeholder="Enter your password" v-model="password"/>
			</div>
		    <button class="btn btn-default" v-on:click.prevent="handleLoginSubmit()">Login</button>
		    <br><br>
	    	<div class="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">
	    		<button v-on:click.prevent="fbLogin()">Login</button>
	    	</div>
		    
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
	    	fbLogin: function(){
	    		FB.login(function(response){
	    			if(response.status === 'connected'){
	    				console.log('Login: logged in with fb');
	    				console.log(response.authResponse.accessToken);
	    				FB.api('/me', function(response){
	    					console.log('API ', response);
	    				})
	    			}else if(response.status === 'not_authorized'){
	    				console.log('Couldn\'t log in with fb');
	    			}else{
	    				console.log('You have no FB account');
	    			}
	    		});
	    	},
	    },
	    mounted(){
	    //FACEBOOK
	    	//init sdk
    		window.fbAsyncInit = function() {
	            FB.init({
	                appId      : '1550868334967839',
	                cookie     : true,
	                xfbml      : true,
	                version    : 'v2.11'
	            });
	            FB.getLoginStatus(function(response){
	            	if(response.status === 'connected'){
	    				console.log('Mounted: logged in with fb');
	    				console.log(response.authResponse.accessToken);
	    				FB.api('/me', function(response){
	    					console.log('API ', response);
	    				})
	    			}else if(response.status === 'not_authorized'){
	    				console.log('Couldn\'t log in with fb');
	    			}else{
	    				console.log('You have no FB account');
	    			}
	            });
	            FB.AppEvents.logPageView();   
	        };

	        (function(d, s, id){
	            var js, fjs = d.getElementsByTagName(s)[0];
	            if (d.getElementById(id)) {return;}
	            js = d.createElement(s); js.id = id;
	            js.src = "https://connect.facebook.net/en_US/sdk.js";
	            fjs.parentNode.insertBefore(js, fjs);
	        }(document, 'script', 'facebook-jssdk'));
	        //button div
	        (function(d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = 'https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v2.11&appId=1550868334967839';
				fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
	    //FACEBOOK

	    }
	}


</script>

<style scoped>	

</style>