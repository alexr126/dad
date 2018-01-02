<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>

		<user-list :users="users" @edit-click="editUser" @block-click="blockUser" @unblock-click ="unblockUser" @delete-click="deleteUser" @message="childMessage" ref="usersListRef"></user-list>

		<div class="alert alert-success" v-if="showSuccess">			 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>

		<user-reason-blocked :user="currentUser" @user-saved="saveUser" @user-canceled="cancelOperation" v-if="currentUser"></user-reason-blocked>		
	</div>				
</template>

<script type="text/javascript">
	import UserList from './userList.vue';
	import UserEdit from './userEdit.vue';
	import UserReasonBlocked from './userReasonBlocked.vue';
	
	export default {
		data: function(){
			return { 
		        title: 'List Users',
		        showSuccess: false,
		        successMessage: '',
		        currentUser: null,
		        users: []
			}
		},
	    methods: {
	        editUser: function(user){
	            this.currentUser = user;
	            this.showSuccess = false;
	        },
	        blockUser: function(user){
	        	this.currentUser = user;
	        	console.log(this.$refs.usersListRef.editingUser);
	        	console.log(this.$refs.usersListRef.blockingUser);
	        },
	        unblockUser: function(user){
	        	user.blocked = 0;
	        },
	        deleteUser: function(user){
	            axios.delete('api/users/'+user.id)
	                .then(response => {
	                    this.showSuccess = true;
	                    this.successMessage = 'User Deleted';
	                    this.getUsers();
	                });
	        },
	        saveUser: function(){
	        	if(this.$refs.usersListRef.editingUser != null){
	        		this.currentUser = null;
	            	this.$refs.usersListRef.editingUser = null;
	            	this.showSuccess = true;
	            	this.successMessage = 'User Saved';
	        	} else {
	        		if(this.$refs.usersListRef.blockingUser != null){
	        			this.currentUser.blocked = 1;
						this.currentUser = null;
	            		this.$refs.usersListRef.blockingUser = null;
	            		this.showSuccess = true;
	            		this.successMessage = 'User Saved';
	        		}
	        	}	            
	        },
	        cancelOperation: function(){
	            this.currentUser = null;	            
	            this.showSuccess = false;
	            if(this.$refs.usersListRef.editingUser){
	            	this.$refs.usersListRef.editingUser = null;
	            } else {
	            	if(this.$refs.usersListRef.blockingUser){
	            		this.$refs.usersListRef.blockingUser = null;
	            	}
	            }
	        },
	        getUsers: function(){
	            axios.get('api/users')
	                .then(response=>{this.users = response.data.data; });
			},
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			}
	    },
	    components: {
	    	'user-list': UserList,
	    	'user-edit': UserEdit,
	    	'user-reason-blocked': UserReasonBlocked
	    },
	    mounted() {
			this.getUsers();
			if (this.$root.departments.length === 0) {
				axios.get('api/departments')
  					.then(response=>{
  						this.$root.departments = response.data.data; 
  						this.departments = this.$root.departments;
  					})
  			} else {
  				this.departments = this.$root.departments;
  			}
		}

	}
</script>

<style scoped>	
p {
	font-size: 2em;
	text-align: center;
}
</style>