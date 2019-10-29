import Vue from 'vue'
import App from './App'
//import VueI18n from './node_modules/vue-i18n' 
import messages from './common/lang.js'
import store from './store'

import request from './common/request.js'
import url from './common/config.js'
import api from './api/index.js'
import config from './common/config.js'

Vue.config.productionTip = false
//Vue.use(VueI18n)

Vue.prototype.$store = store
Vue.prototype.$request = request
Vue.prototype.$api = api
Vue.prototype.$url = url
Vue.prototype.$config = config

// 可供全域調用的登入檢查
Vue.prototype.checkLogin = function(pageInfo, backtype) {
	let isLogin = uni.getStorageSync('Login'),
		backpage = parsePath(pageInfo) || '';
		
	// 沒登入就導去登入頁 
	// backpage
	if (!isLogin) {
		uni.navigateTo({
			url: '/pages/login/login?backpage=' + backpage + '&backtype=' + backtype
		});
		return false;
	}
	return isLogin;

	function parsePath(pageInfo) {
		let currentPagePath = pageInfo[pageInfo.length - 1].route;
		return `/${currentPagePath}`;
	}
}

App.mpType = 'app'
//Vue.prototype.$i18n = i18n

const app = new Vue({
	store,
	...App
})
app.$mount()
