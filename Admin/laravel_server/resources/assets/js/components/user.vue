<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>

		<user-list :users="users" @block-click="blockUser" @unblock-click ="unblockUser" @delete-click="deleteUser" @message="childMessage" 
			ref="usersListRef">
		</user-list>

		<div class="alert alert-success" v-if="showSuccess">			 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>

		<user-reason-blocked :user="currentUser_toBlock" @user-blocked="saveUser" @user-canceled="cancelOperation" v-if="currentUser_toBlock">
		</user-reason-blocked>	

		<user-reason-reactivated :user="currentUser_toUnblock" @user-unblocked="saveUser" @user-canceled="cancelOperation" 
			v-if="currentUser_toUnblock">			
		</user-reason-reactivated>	

		<user-reason-removed :user="currentUser_toRemove" @user-removed="saveUser" @user-canceled="cancelOperation" v-if="currentUser_toRemove">
		</user-reason-removed>
	</div>				
</template>

<script type="text/javascript">
	import UserList from './userList.vue';
	import UserReasonBlocked from './userReasonBlocked.vue';
	import UserReasonReactivated from './userReasonReactivated.vue';
	import UserReasonRemoved from './userReasonRemoved.vue';
	
	export default {	
		data: function(){
			return { 
		        title: 'List Users',
		        showSuccess: false,
		        successMessage: '',
		        currentUser_toBlock: null,
		        currentUser_toUnblock: null,
		        currentUser_toRemove: null,
		        users: [],
		        userToken: undefined
			}
		},
	    methods: {
	        blockUser: function(user){
	        	this.currentUser_toBlock = user;
	        	this.showSuccess = false;
	        },
	        unblockUser: function(user){
	        	this.currentUser_toUnblock = user;
	        	this.showSuccess = false;
	        },
	        deleteUser: function(user){
	            this.currentUser_toRemove = user;
	        	this.showSuccess = false;
	        },
	        saveUser: function(){
        		if(this.$refs.usersListRef.blockingUser != null){
					this.currentUser_toBlock = null;
            		this.$refs.usersListRef.blockingUser = null;
            		this.showSuccess = true;
            		this.successMessage = 'User Blocked';
        		}	 
        		if(this.$refs.usersListRef.unblockingUser != null){
					this.currentUser_toUnblock = null;
            		this.$refs.usersListRef.unblockingUser = null;
            		this.showSuccess = true;
            		this.successMessage = 'User Unblocked';
        		}       	
        		if(this.$refs.usersListRef.removingUser != null){
					this.currentUser_toRemove = null;
            		this.$refs.usersListRef.removingUser = null;
            		this.showSuccess = true;
            		this.successMessage = 'User Removed';
            		this.getUsers();
        		}	            
	        },
	        cancelOperation: function(){	            
	            this.showSuccess = false;
            	if(this.$refs.usersListRef.blockingUser){
            		this.$refs.usersListRef.blockingUser = null;
            		this.currentUser_toBlock = null;
            	}	  
            	if(this.$refs.usersListRef.unblockingUser){
            		this.$refs.usersListRef.unblockingUser = null;
            		this.currentUser_toUnblock = null;
            	}  
            	if(this.$refs.usersListRef.removingUser){
            		this.$refs.usersListRef.removingUser = null;
            		this.currentUser_toRemove = null;
            	}        
	        },
	        getUsers: function(){
	        	var auth = "Bearer "+ this.userToken;
	        	axios.defaults.headers.common['Authorization'] = auth;
	        	axios.defaults.headers.common['Accept'] = 'application/json';
	            axios.get('api/users')
                .then(response=>{
            		this.users = response.data.data; 
                }).catch(errors=>{
                	console.log(errors);
                });
			},
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			}
	    },
	    components: {
	    	'user-list': UserList,
	    	'user-reason-blocked': UserReasonBlocked,
	    	'user-reason-reactivated': UserReasonReactivated,
	    	'user-reason-removed': UserReasonRemoved
	    },
	    mounted() {
	    	this.userToken = localStorage.getItem('token');
			this.getUsers();
			/*if (this.$root.departments.length === 0) {
				axios.get('api/departments')
  					.then(response=>{
  						this.$root.departments = response.data.data; 
  						this.departments = this.$root.departments;
  					})
  			} else {
  				this.departments = this.$root.departments;
  			}*/
		}

	}
</script>

<style scoped>	
p {
	font-size: 2em;
	text-align: center;
}
</style>