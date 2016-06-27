import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { configRouter } from './route-config';
import VueTouch from 'vue-touch';
import VueResource from 'vue-resource';
Vue.use(VueTouch);
Vue.use(VueResource);
require('es6-promise').polyfill();

// install router
Vue.use(VueRouter);

// create router
const router = new VueRouter({
  history: false,
  saveScrollPosition: true
});

// configure router
configRouter(router);

// boostrap the app
router.start(App, 'body');

// just for debugging
window.router = router;
