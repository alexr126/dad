<template>
	<table class="table table-striped">
	    <thead>
	        <tr>
	            <th>ID</th>
                <th>Nickname</th>
                <th>Name</th>
                <th>Email</th>                
                <th>Admin</th>
                <th>Blocked</th>
                <th>Reason Blocked</th>
                <th>Reason Reactivated</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="user in users"  :key="user.id" :class="{activerow: blockingUser === user}">
	            <td>{{ user.id }}</td>
                <td>{{ user.nickname }}</td>
                <td>{{ user.name }}</td>
            	<td>{{ user.email }}</td>
            	<td>{{ user.admin }}</td>
            	<td v-if="user.blocked">{{ "Yes" }}</td>
                <td v-else>{{ "No" }}</td>
            	<td>{{ user.reason_blocked }}</td>
            	<td>{{ user.reason_reactivated }}</td>
            	<td>{{ user.created_at.date | moment("DD/MM/YYYY HH:mm") }}</td>
            	<td>{{ user.updated_at.date | moment("DD/MM/YYYY HH:mm") }}</td>
	            <td>
	                <a v-if="user.blocked" class="btn btn-xs btn-primary" v-on:click.prevent="unblockUser(user)">Unblock</a>
                    <a v-else class="btn btn-xs btn-danger" v-on:click.prevent="blockUser(user)">Block</a>
                    <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">

	module.exports={
		props: ['users'],
		data: function(){
			return { 
                blockingUser: null,
			}
		},
        methods: {	
            blockUser: function(user) {
                this.blockingUser = user;
                this.$emit('block-click', user);
            },
            unblockUser: function(user) {
                this.$emit('unblock-click', user);
            },
            deleteUser: function(user){
                this.blockingUser = null;
                this.$emit('delete-click', user);
			}
        },		
	}
</script>

<style scoped>
	tr.activerow {
  		background: #123456  !important;
  		color: #fff          !important;
}

</style>