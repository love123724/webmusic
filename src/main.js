import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import store from './store';

import toast from './components/common/toast/index'

Vue.use(toast)

import FastClick from 'fastclick';
import VueLazyLoad from "vue-lazyload";


Vue.use(VueLazyLoad,{
  loading:require("./assets/img/loading/placeholder.png")
})

Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
