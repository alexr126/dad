<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>

		<user-list :users="users" @block-click="blockUser" @unblock-click ="unblockUser" @delete-click="deleteUser" @message="childMessage" 
		ref="usersListRef"></user-list>

		<div class="alert alert-success" v-if="showSuccess">			 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>

		<user-reason-blocked :user="currentUser" @user-blocked="saveUser" @user-canceled="cancelOperation" v-if="currentUser"></user-reason-blocked>	

		<user-reason-reactivated :user="currentUser" @user-unblocked="saveUser" @user-canceled="cancelOperation" v-if="currentUser"></user-reason-reactivated>	

		<user-reason-removed :user="currentUser" @user-removed="saveUser" @user-canceled="cancelOperation" v-if="currentUser"></user-reason-removed>
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
		        currentUser: null,
		        users: []
			}
		},
	    methods: {
	        blockUser: function(user){
	        	this.currentUser = user;
	        	this.showSuccess = false;
	        },
	        unblockUser: function(user){
	        	this.currentUser = user;
	        	this.showSuccess = false;
	        },
	        deleteUser: function(user){
	            this.currentUser = user;
	        	this.showSuccess = false;
	        },
	        saveUser: function(){
        		if(this.$refs.usersListRef.blockingUser != null){
					this.currentUser = null;
            		this.$refs.usersListRef.blockingUser = null;
            		this.showSuccess = true;
            		this.successMessage = 'User Blocked';
        		}	 
        		if(this.$refs.usersListRef.unblockingUser != null){
					this.currentUser = null;
            		this.$refs.usersListRef.unblockingUser = null;
            		this.showSuccess = true;
            		this.successMessage = 'User Unblocked';
        		}       	
        		if(this.$refs.usersListRef.removingUser != null){
					this.currentUser = null;
            		this.$refs.usersListRef.removingUser = null;
            		this.showSuccess = true;
            		this.successMessage = 'User Removed';
            		this.getUsers();
        		}	            
	        },
	        cancelOperation: function(){
	            this.currentUser = null;	            
	            this.showSuccess = false;
            	if(this.$refs.usersListRef.blockingUser){
            		this.$refs.usersListRef.blockingUser = null;
            	}	  
            	if(this.$refs.usersListRef.unblockingUser){
            		this.$refs.usersListRef.unblockingUser = null;
            	}  
            	if(this.$refs.usersListRef.removingUser){
            		this.$refs.usersListRef.removingUser = null;
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
	    	'user-reason-blocked': UserReasonBlocked,
	    	'user-reason-reactivated': UserReasonReactivated,
	    	'user-reason-removed': UserReasonRemoved
	    },
	    mounted() {
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