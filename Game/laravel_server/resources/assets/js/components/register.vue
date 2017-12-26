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
		            name="password" id="inputPassword"/>
			</div>
			<div class="form-group">
				<button class="btn btn-default">Register</button>
		    </div>
	    </form>
	</div>

</template>

<script type="text/javascript">
	module.exports={
		data(){
			return{
				name: '',
				nickname: '',
				email: '',
				password: ''
			}
		},
		methods: {
			handleRegisterSubmit: function(){
				console.log(1);
			}
		}
	}

</script>

<style scoped>	

</style>