<template>
	<div>
		<button class="btn btn-default" v-on:click.prevent='logoutHandler'>Logout</button>
	</div>
</template>

<script type="text/javascript">
	export default{
		methods: {
			logoutHandler: function() {
				var token = localStorage.getItem('token');
				var auth = "Bearer "+ token;
	        	axios.defaults.headers.common['Authorization'] = auth;
	        	axios.defaults.headers.common['Accept'] = 'application/json';
	            axios.post('api/logout')
                .then(response=>{
                	localStorage.removeItem('token');
                	localStorage.removeItem('userData');
                	//localStorage.removeItem('expiration');
            		this.$router.push({path: "/login"});
                }).catch(errors=>{
                	console.log(errors);
                });
			}
		}
	}
</script>