<template>
	<table class="table table-striped">
	    <thead>
	        <tr>
	            <th>ID</th>
                <th>Face</th>
                <th>Active</th>
                <th>Path</th>                
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
	        </tr>
	    </thead>
	    <tbody>
	        <tr v-for="image in images"  :key="image.id">
	            <td>{{ image.id }}</td>
                <td>{{ image.face }}</td>
                <td v-if="image.active">{{ "Yes" }}</td>
                <td v-else>{{ "No" }}</td>
                <td>{{ image.path }}</td>
            	<td>{{ image.created_at.date | moment("DD/MM/YYYY HH:mm") }}</td>
            	<td>{{ image.updated_at.date | moment("DD/MM/YYYY HH:mm") }}</td>
	            <td>
                    <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteImage(image)">Delete</a>
	            </td>
	        </tr>
	    </tbody>
	</table>
</template>

<script type="text/javascript">

	module.exports={
		props: ['images'],
		data: function(){
			return { 

			}
		},
        methods: {
            deleteImage: function(image){
                this.$emit('delete-click', image);
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