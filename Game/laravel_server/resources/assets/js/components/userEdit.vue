<template>
	<div class="jumbotron">
	    <h2>Edit User</h2>
	    <div class="form-group">
	        <label for="inputName">Name</label>
	        <input
	            type="text" class="form-control" v-model="user.name"
	            name="name" id="inputName" 
	            placeholder="Fullname"/>
	    </div>
	    <div class="form-group">
	        <label for="inputNickname">Nickname</label>
	        <input
	            type="text" class="form-control" v-model="user.nickname"
	            name="nickname" id="inputNickname"
	            placeholder="Nickname"/>
	    </div>
	    <div class="form-group">
	        <label for="inputEmail">Email</label>
	        <input
	            type="email" class="form-control" v-model="user.email"
	            name="email" id="inputEmail"
	            placeholder="Email address"/>
	    </div>
	    <div class="form-group">
	        <label for="inputEmail">New Password</label>
	        <input
	            type="password" class="form-control" v-model="password"
	            name="password" id="inputPassword"
	            placeholder="New Password"/>
	    </div>
	    <div class="form-group">
	        <label for="inputEmail">Confirme Password</label>
	        <input
	            type="password" class="form-control" v-model="passwordRetype"
	            name="passwordRetype" id="inputPasswordRetype"
	            placeholder="Confirme Password"/>
	    </div>
	    <div class="form-group">
	        <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
	        <a class="btn btn-default" v-on:click.prevent="cancelEdit()">Cancel</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
		data: function(){
			return{
				password: "",
				passwordRetype: "",
			}
		},
	    methods: {
	        saveUser: function(){
	        	if(this.password == this.passwordRetype){
	        		this.user.password = this.password;
	        	}
	        	axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');
            	axios.defaults.headers.common['Accept'] = 'application/json';
	            axios.put('api/users/'+this.user.id, this.user)
                .then(response=>{
                	// Copy object properties from response.data.data to this.user
                	// without creating a new reference
                	Object.assign(this.user, response.data.data);
                	this.$emit('user-saved', this.user)
                });   
	        },
	        cancelEdit: function(){
	        	axios.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');;
            	axios.defaults.headers.common['Accept'] = 'application/json';
	        	axios.get('api/users/'+this.user.id)
                .then(response=>{
                	// Copy object properties from response.data.data to this.user
                	// without creating a new reference
                	Object.assign(this.user, response.data.data);
                	this.$emit('user-canceled', this.user);
                });
	        }
		}
	}
</script>

<style scoped>	

</style>