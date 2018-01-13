/*jshint esversion: 6 */

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import VueSocketio from 'vue-socket.io';

Vue.use(VueRouter);

//Vue.use(VueSocketio, 'http://192.168.10.10:8080');
Vue.use(VueSocketio, 'http://192.168.10.1:8080');

const login = Vue.component('login', require('./components/login.vue'));
const user = Vue.component('user', require('./components/user.vue'));
const singleplayer_game = Vue.component('singlegame', require('./components/singleplayer_memory.vue'));
const multiplayer_game = Vue.component('multigame', require('./components/multiplayer_memory.vue'));
const game = Vue.component('game', require('./components/memory_backup.vue'));
Vue.component('logout', require('./components/logout.vue'));


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: login, meta: { forVisitors: true} },
  { path: '/users', component: user, meta: {requireAuth: true} },
  { path: '/singlememory', component: singleplayer_game, meta: {requireAuth: true} },
  { path: '/multimemory', component: multiplayer_game, meta: {requireAuth: true} },
  { path: '/game', component: game, meta: {requireAuth: true} } //tests
];


const router = new VueRouter({
  routes:routes
});
//proteger router-link
router.beforeEach(
  (to, from, next) =>{
    if(to.meta.forVisitors){
      this.userToken = localStorage.getItem('token');
      if(this.userToken != null){
        next({
          path: '/users'
        })    
      }else next();
      }else if(to.meta.requireAuth){
        this.userToken = localStorage.getItem('token');
        if(this.userToken == null){
          next({
          path: '/login'
        })    
      }else next();
    }else next();
  });

const app = new Vue({
  router,
  data:{
    player1:undefined,
    player2: undefined,
    userToken: localStorage.getItem('token'),
  }
}).$mount('#app');

