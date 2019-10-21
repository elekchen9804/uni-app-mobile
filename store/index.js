import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		forcedLogin: false,
		hasLogin: uni.getStorageSync('Login'),
		userId: uni.getStorageSync('UserId'),
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
			uni.setStorageSync('Login', true);
			uni.setStorageSync('UserId', userId);
		},
		logout(state) {
			state.userId = "";
			state.hasLogin = false;
			uni.setStorageSync('Login', false);
			uni.setStorageSync('UserId', '');
		},
		changeUserBalnce(state, balance) {
			state.userBalance = balance;
		}
	}
})

export default store
