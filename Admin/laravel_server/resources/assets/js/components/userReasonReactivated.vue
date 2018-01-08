<template>
	<div class="jumbotron">
	    <h2>Reactivation Reason</h2>

	    <div class="form-group">
	        <label for="inputReasonReactivated"></label>
	        <input
	            type="text" class="form-control" v-model="user.reason_reactivated"
	            name="name" id="inputReasonReactivated" 
	            placeholder="ReasonReactivated"/>
	    </div>

	    <div class="form-group">
	        <a class="btn btn-default" v-on:click.prevent="unblockUser()">Unblock</a>
	        <a class="btn btn-default" v-on:click.prevent="cancelOperation()">Cancel</a>
	    </div>
	</div>
</template>

<script type="text/javascript">
	module.exports={
		props: ['user'],
	    methods: {
	        unblockUser: function(){
	        	this.user.blocked = 0;
	        	this.user.reason_blocked = null;
	            axios.put('api/users/unblock/'+this.user.id, this.user)
	                .then(response=>{
	                	Object.assign(this.user, response.data.data);
	                	this.$emit('user-unblocked', this.user)
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