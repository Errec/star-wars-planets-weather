// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetAlert from 'vue-sweetalert'
import helpersPlugin from './helpers/helpersPlugin.js'

Vue.config.productionTip = false

Vue.use(VueSweetAlert)
Vue.use(VueAxios, axios)
Vue.use(helpersPlugin)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
