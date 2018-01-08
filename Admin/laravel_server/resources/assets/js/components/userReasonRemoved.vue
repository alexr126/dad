<template>
	<div class="jumbotron">
	    <h2>Removal Reason</h2>

	    <div class="form-group">
	        <label for="inputReasonRemoved"></label>
	        <input
	            type="text" class="form-control"
	            name="name" id="inputReasonRemoved" 
	            placeholder="ReasonRemoved"/>
	    </div>

	    <div class="form-group">
	        <a class="btn btn-default" v-on:click.prevent="removeUser()">Remove</a>
	        <a class="btn btn-default" v-on:click.prevent="cancelOperation()">Cancel</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
	    methods: {
	        removeUser: function(){
	            /*axios.delete('api/users/remove/'+user.id)
	                .then(response => {
	                    this.showSuccess = true;
	                    this.successMessage = 'User Deleted';
	                    this.getUsers();
	                });*/
                axios.delete('api/users/remove/'+this.user.id)
                .then(response=>{
                	Object.assign(this.user, response.data.data);
                	this.$emit('user-removed', this.user)
                });
	        },
	        cancelOperation: function(){
	        	axios.get('api/users/'+this.user.id)
	                .then(response=>{
	                	Object.assign(this.user, response.data.data);
	                	this.$emit('user-canceled', this.user);
	                });
	        }
		}
	}
</script>

<style scoped>	

</style>