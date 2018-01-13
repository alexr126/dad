<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>
		<label>Name: {{user.name}}</label>
		<br>
		<label>Nickname: {{user.nickname}}</label>
		<br>
		<label>Email: {{user.email}}</label>
		<br>
		<hr>
		<div class="alert alert-success" v-if="showSuccess"> 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>
		<button v-on:click="currentUser=user">Edit Profile</button>
		<user-edit :user="currentUser" @user-saved="savedUser" @user-canceled="cancelEdit" v-if="currentUser"></user-edit>				
	</div>				
</template>

<script type="text/javascript">
	import UserEdit from './userEdit.vue';
	
	export default {
		data: function(){
			return { 
		        title: 'List Users',
		        showSuccess: false,
		        successMessage: '',
		        currentUser: null,
		        userToken: undefined,
		        user: {
		        	name: "",
		        	email: "",
		        	nickname: "",
		        	id: null
		        }
			}
		},
	    methods: {
	        editUser: function(user){
	            this.currentUser = user;
	            this.showSuccess = false;
	        },
	        savedUser: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'User Saved';
	        },
	        cancelEdit: function(){
	            this.currentUser = null;
	            this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = false;
	        },
	    },
	    components: {
	    	'user-edit': UserEdit
	    },
	    mounted() {
	    	this.userToken = localStorage.getItem('token');
	    	
	    	axios.defaults.headers.common['Authorization'] = "Bearer "+ this.userToken;
            axios.defaults.headers.common['Accept'] = 'application/json';
            axios.get('api/user/').then(response=>{
            	console.log(response);
            	this.user.name = response.data.name;
            	this.user.email = response.data.email;
            	this.user.nickname = response.data.nickname;
            	this.user.id = response.data.id;
            });
		}

	}
</script>

<style scoped>	
p {
	font-size: 2em;
	text-align: center;
}
</style>