<template>
	<div>
		<div class="jumbotron">
			<h1>{{ title }}</h1>
		</div>

		<div class="alert alert-success" v-if="showSuccess">			 
			<button type="button" class="close-btn" v-on:click="showSuccess=false">&times;</button>
			<strong>{{ successMessage }}</strong>
		</div>

		<image-list :images="images" @delete-click="deleteImage" @activate-click="activateImage" 
			@disable-click="disableImage"  @message="childMessage" ref="imagesListRef">
		</image-list>		

		<image-upload @upload-click="uploadImage">
		</image-upload>

	</div>				
</template>

<script type="text/javascript">

	import ImageList from './imageList.vue';
	//import Upload from './fileUpload.vue';
	import ImageUpload from './imageUpload.vue';
	
	export default {
		data: function(){
			return { 
		        title: 'List Images',
		        showSuccess: false,
		        successMessage: '',
		        currentImage: null,
		        //newImage: null,
		        images: []
			}
		},
	    methods: {
	    	uploadImage: function(image){
	    		//this.currentUser = null;
	            //this.$refs.usersListRef.editingUser = null;
	            this.showSuccess = true;
	            this.successMessage = 'Image Uploaded';
	            this.getImages();
	    	},
	        deleteImage: function(image){
	            axios.delete('api/images/remove/'+image.id)
	                .then(response => {
	                    this.showSuccess = true;
	                    this.successMessage = 'Image Deleted';
	                    this.getImages();
	                });
	        },
	        activateImage: function(image){      
                this.currentImage = image;     
                this.currentImage.active = 1;
                axios.put('api/images/activate/'+this.currentImage.id, this.currentImage)
                    .then(response=>{
                        this.showSuccess = true;
                        this.successMessage = 'Image Activated';
                        Object.assign(this.currentImage, response.data.data);
                        this.currentImage = null;
                        this.imagesListRef.currentImage = null;
                    });
	        },
	        disableImage: function(image){
	        	this.currentImage = image;     
                this.currentImage.active = 0; 
                axios.put('api/images/disable/'+this.currentImage.id, this.currentImage)
                    .then(response=>{
                        this.showSuccess = true;
                        this.successMessage = 'Image Disabled';
                        Object.assign(this.currentImage, response.data.data);
                        this.currentImage = null;
                        this.imagesListRef.currentImage = null;
                    });
	        },
	        /*cancelOperation: function(){	            
	            this.showSuccess = false;
            	if(this.$refs.usersListRef.blockingUser){
            		this.$refs.usersListRef.blockingUser = null;
            		this.currentUser_toBlock = null;
            	}	         
	        },*/
	        getImages: function(){
	            axios.get('api/images')
	                .then(response=>{this.images = response.data.data; });
			},
			childMessage: function(message){
				this.showSuccess = true;
	            this.successMessage = message;
			},
	    },
	    components: {
	    	'image-list': ImageList,
	    	//'file-upload': Upload
	    	'image-upload': ImageUpload
	    },
	    mounted() {
			this.getImages();
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