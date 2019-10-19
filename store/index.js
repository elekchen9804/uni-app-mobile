import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: false,
		userName: "",
		// 存储token
		Authorization: uni.getStorageSync('Authorization') ? uni.getStorageSync('Authorization') : ''
	},
	mutations: {
		// 修改token，并将token存入localStorage
		changeLogin(state, user) {
			state.Authorization = user.Authorization;
			uni.setStorageSync('Authorization', user.Authorization);
		},
		login(state, userName) {
			state.userName = userName || '新用户';
			state.hasLogin = true;
		},
		logout(state) {
			state.userName = "";
			state.hasLogin = false;
		}
	}
})

export default store