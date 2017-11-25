/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Users from './components/usersList.vue';
import UserEdit from './components/userEdit.vue';

Vue.component('example', require('./components/Example.vue'));

const app = new Vue({
    el: '#app',
    data: {
        title: 'List Users',
        editingUser: false,
        showSuccess: false,
        showFailure: false,
        successMessage: '',
        failMessage: '',
        currentUser: null,
        users: [],
    },
    components: {
        'users': Users,
        'user-edit': UserEdit
    },
    methods: {
        editUser: function(user){
            this.currentUser = user;
            this.editingUser = true;
            this.showSuccess = false;
        },
          
        deleteUser: function(user){
            axios.delete('api/users/'+ user.id)
                .then(response => {
                    this.showSuccess = true;
                    this.successMessage = 'User Deleted';
                    this.getUsers();
                });
            this.$emit('delete-click', user);
        },
        saveUser: function(){
            this.editingUser = false;            
            axios.put('api/users/'+this.currentUser.id,this.currentUser)
                .then(response=>{
                    this.showSuccess = true;
                    this.successMessage = 'User Saved';
                    // Copies response.data.data properties to this.currentUser
                    // without changing this.currentUser reference
                    Object.assign(this.currentUser, response.data.data);
                    this.currentUser = null;
                    this.editingUser = false;
                });
        },
        cancelEdit: function(){
            this.showSuccess = false;
            this.editingUser = false;
            axios.get('api/users/'+this.currentUser.id)
                .then(response=>{
                    console.dir (this.currentUser);
                    // Copies response.data.data properties to this.currentUser
                    // without changing this.currentUser reference
                    Object.assign(this.currentUser, response.data.data); 
                    console.dir (this.currentUser);
                    this.currentUser = null;
                });
        },
        getUsers: function(){
            axios.get('api/users')
                .then(response=>{this.users = response.data.data;});
        }
    },
    mounted() {
        this.getUsers();
        axios.get('api/departments')
            .then(response=>{this.departments = response.data.data; });
    }
});
