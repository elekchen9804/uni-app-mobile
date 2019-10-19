import Vue from 'vue'
import App from './App'
//import VueI18n from './node_modules/vue-i18n' 
import messages from './common/lang.js'
import store from './store'

import request from './common/request.js'
import url from './common/config.js'
import api from './api/index.js'

Vue.config.productionTip = false
//Vue.use(VueI18n)

Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url


App.mpType = 'app'
//Vue.prototype.$i18n = i18n

const app = new Vue({
	store,
	...App
})
app.$mount()
