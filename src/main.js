import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import HelloWorld from "@/components/HelloWorld";
import ServersStatus from "@/components/ServersStatus";
import PictureViewComponent from "@/components/PictureViewComponent";

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/top-secret', component: ServersStatus },
  { path: '/:id', component: PictureViewComponent}
]

const router = new VueRouter({
  routes
})

Vue.config.productionTip = false

export const HTTP = axios.create({
  baseURL: 'https://image-sharing-api.azurewebsites.net'
  // baseURL: 'https://localhost:5001'
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
