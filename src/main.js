import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

export const HTTP = axios.create({
  baseURL: 'http://image-sharing-api.azurewebsites.net'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
