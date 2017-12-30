<template>
	<div class="jumbotron">
		<h2>Register</h2>
		<form v-on:submit.prevent="handleRegisterSubmit">
			<div class="form-group">
				<label for="inputName">Name</label>
				<input
		            type="text" class="form-control"
		            name="name" id="inputName" 
					v-model="name"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Nickname</label>
				<input
		            type="text" class="form-control"
		            name="nickname" id="inputNickname" 
		            v-model="nickname"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">E-mail</label>
				<input
		            type="text" class="form-control"
		            name="email" id="inputEmail" 
		            v-model="email"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Password</label>
				<input
		            type="password" class="form-control"
		            name="password" id="inputPassword" 
		            v-model="password"/>
			</div>
			<div class="form-group">
				<label for="inputPassword">Reenter Password</label>
				<input
		            type="password" class="form-control"
		            name="passwordRetype" id="inputPasswordRetype"
		            v-model="passwordRetype"/>
			</div>
			<div class="form-group">
				<button class="btn btn-default">Register</button>
		    </div>
	    </form>
	    <button class="btn btn-default" v-on:click="cancel">Cancel</button>
	</div>

</template>

<script type="text/javascript">
	module.exports={
		data(){
			return{
				name: '',
				nickname: '',
				email: '',
				password: '',
				passwordRetype: ''
			}
		},
		methods: {
			handleRegisterSubmit: function(){
				var passwordRetype = this.passwordRetype;
				var password = this.password;

				if(password == passwordRetype){
					var user ={
						name: this.name,
						nickname: this.nickname,
						email: this.email,
						password
					}
					axios.post('api/users', user)
					.then(response=>{
						this.$emit('user-registred', user);
					})
				}else{
					console.log('Error: passwords does not match!');
				}
			},
			cancel: function(){
				this.$emit('cancel');
			}
		}
	}

</script>

<style scoped>	

</style>