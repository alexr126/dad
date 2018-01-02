<template>
	<div class="jumbotron">
	    <h2>Blocking Reason</h2>

	    <div class="form-group">
	        <label for="inputReasonBlocked"></label>
	        <input
	            type="text" class="form-control" v-model="user.reason_blocked"
	            name="name" id="inputReasonBlocked" 
	            placeholder="ReasonBlocked"/>
	    </div>

	    <div class="form-group">
	        <a class="btn btn-default" v-on:click.prevent="saveUser()">Save</a>
	        <a class="btn btn-default" v-on:click.prevent="cancelOperation()">Cancel</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
	    methods: {
	        saveUser: function(){
	            axios.put('api/users/'+this.user.id, this.user)
	                .then(response=>{
	                	// Copy object properties from response.data.data to this.user
	                	// without creating a new reference
	                	Object.assign(this.user, response.data.data);
	                	this.$emit('user-saved', this.user)
	                });
	        },
	        cancelEdit: function(){
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