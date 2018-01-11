/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
//Vue.prototype.$http = axios;

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';
//import Auth from './packages/auth/Auth.js';

Vue.use(VueRouter);

//Vue.use(VueSocketio, 'http://192.168.10.10:8080');
//Vue.use(VueSocketio, 'http://192.168.10.1:8080');

Vue.use(require('vue-moment'));

const login = Vue.component('login', require('./components/login.vue'));
const user = Vue.component('user', require('./components/user.vue'));
const image = Vue.component('image', require('./components/image.vue'));
Vue.component('logout', require('./components/logout.vue'));

const routes = [
	{ path: '/', redirect: '/login' },
	{ path: '/login', component: login },
  	{ path: '/users', component: user },
  	{ path: '/images', component: image }
];

const router = new VueRouter({
  	routes:routes
});
/*
Router.beforeEach(
	(to, from, next) =>{
		if(Vue.auth.isAuthenticated()){
			
		}
	})
*/


const app = new Vue({
	router,
	data:{
		player1:undefined,
		player2: undefined,
		userToken: undefined		
	},
}).$mount('#app');