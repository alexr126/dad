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
	        <tr v-for="user in users"  :key="user.id" :class="{activerow: editingUser === user}">
	            <td>{{ user.id }}</td>
                <td>{{ user.nickname }}</td>
                <td>{{ user.name }}</td>
            	<td>{{ user.email }}</td>
            	<td>{{ user.admin }}</td>
            	<td>{{ user.blocked }}</td>
            	<td>{{ user.reason_blocked }}</td>
            	<td>{{ user.reason_reactivated }}</td>
            	<td>{{ user.created_at }}</td>
            	<td>{{ user.updated_at }}</td>
	            <td>
	                <a class="btn btn-xs btn-primary" v-on:click.prevent="editUser(user)">Edit</a>
	                <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">
	// Component code (not registered)
	module.exports={
		props: ['users'],
		data: function(){
			return { 
				editingUser: null
			}
		},
        methods: {
            editUser: function(user){
                this.editingUser = user;
                this.$emit('edit-click', user);
            },		
            deleteUser: function(user){
                this.editingUser = null;
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