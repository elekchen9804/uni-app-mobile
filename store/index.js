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
		userId: "",
		userBalance: "",
		// 存储token
		Authorization: uni.getStorageSync('Authorization') ? uni.getStorageSync('Authorization') : ''

	},
	mutations: {
		// 修改token，并将token存入localStorage
		changeLogin(state, user) {
			state.Authorization = user.Authorization;
			uni.setStorageSync('Authorization', user.Authorization);
		},
		login(state, userId) {
			state.userId = userId;
			state.hasLogin = true;
		},
		logout(state) {
			state.userId = "";
			state.hasLogin = false;
		},
		changeUserBalnce(state, balance) {
			state.userBalance = balance;
		}
	}
})

export default store
