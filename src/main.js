import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

export const HTTP = axios.create({
  baseURL: 'https://localhost:5001/'
})

new Vue({
  render: h => h(App),
}).$mount('#app')
