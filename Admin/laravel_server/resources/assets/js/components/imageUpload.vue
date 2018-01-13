<template>
	<div class="jumbotron">

	    <h2>Upload Image</h2>

	    <form method="POST" enctype="multipart/form-data" id="formImage">

		    <div class="form-group">
		        <label for="inputFace">Face:</label>
		        <select class="form-control" id="inputFace" name="inputFace">
		        	<option value="tile">Tile</option>
		        	<option value="hidden">Hidden</option>
		        </select>
		    </div>

		    <div class="form-group">
		    	<label for="inputImage">Image:</label>
		    	<input v-on:change="onFileChange" type="file" accept="image/*" class="form-control" name="image" id="inputImage" 
		    		placeholder="Image"/> 
		    </div>

		    <div class="form-group">
		        <a class="btn btn-default" v-on:click.prevent="uploadImage()">Upload</a>
		        <a class="btn btn-default" v-on:click.prevent="cancel()">Cancel</a>
		    </div>

		</form>

	</div>
</template>

<script type="text/javascript">
	module.exports={
		data(){
			return{
				image:''
			}
		},
		props: [],
	    methods: {
	    	onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
	        uploadImage: function(){		
	        	var form = document.getElementById('formImage');
	        	var formData = new FormData(form);
	        	console.log(formData);
	            axios.post('api/images/upload', formData)
	                .then(response=>{
	                	console.log("------------------", response);
	                	//Object.assign(this.image, response.data.data);
	                	this.$emit('upload-click', this.image)
	                })
	                .catch(error=>{
	                	console.log(error);
	                });	              
	        },
	        cancel: function(){
	        	this.image = '';
	        }
		}
	}
</script>

<style scoped>	

</style>