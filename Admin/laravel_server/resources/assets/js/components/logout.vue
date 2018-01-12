<template>
	<div>
		<button class="btn btn-default" v-on:click.prevent='logoutHandler'>Logout</button>
	</div>
</template>

<script type="text/javascript">
	export default{
		methods: {
			logoutHandler: function() {
				var fbName = localStorage.getItem('fbName')
				if(!fbName){
					var token = localStorage.getItem('token');
					var auth = "Bearer "+ token;
		        	axios.defaults.headers.common['Authorization'] = auth;
		        	axios.defaults.headers.common['Accept'] = 'application/json';
		            axios.post('api/logout')
	                .then(response=>{
	                	localStorage.removeItem('token');
	                	//localStorage.removeItem('expiration');
	            		this.$router.push({path: "/login"});
	                }).catch(errors=>{
	                	console.log(errors);
	                });
	            }else{
	            	//logout do face :(
	            	FB.logout();
	            }
			}
		},
		mounted(){
			//Facebook
			/*window.fbAsyncInit = function() {
	            FB.init({
	                appId      : '1550868334967839',
	                cookie     : true,
	                xfbml      : true,
	                version    : 'v2.11'
	            });
	            FB.getLoginStatus(function(response){
	            	if(response.status === 'connected'){
	    				console.log('Mounted: logged in with fb');
	    			}else if(response.status === 'not_authorized'){
	    				console.log('Couldn\'t log in with fb');
	    			}else{
	    				console.log('You are not logged in with Facebook');
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
	        }(document, 'script', 'facebook-jssdk'));*/
			//Facebook
		}
	}
</script>