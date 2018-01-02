/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
Vue.prototype.$http = axios;

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);

//Vue.use(VueSocketio, 'http://192.168.10.10:8080');
Vue.use(VueSocketio, 'http://192.168.10.1:8080');

const login = Vue.component('login', require('./components/login.vue'));
const user = Vue.component('user', require('./components/user.vue'));
const department = Vue.component('department', require('./components/departmentList.vue'));
const singleplayer_game = Vue.component('singlegame', require('./components/singleplayer_tictactoe.vue'));
const multiplayerGame = Vue.component('multiplayergame', require('./components/multiplayer_tictactoe.vue'));
const game = Vue.component('game', require('./components/memory.vue'));

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login },
  { path: '/users', component: user },
  { path: '/departments', component: department },
  { path: '/singletictactoe', component: singleplayer_game },
  { path: '/multitictactoe', component: multiplayerGame },
  { path: '/game', component: game }
];

const router = new VueRouter({
  routes:routes
});

const app = new Vue({
  router,
  data:{
    player1:undefined,
    player2: undefined,
    departments: [],
  }
}).$mount('#app');
