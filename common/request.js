import urlConfig from './config.js'
import store from '../store/index.js'

const request = {}
const headers = {}

request.globalRequest = (url, method, data, power) => {
	headers['Content-Type'] = 'application/json'
	/* 权限判断 是否需要 token */

	switch (power) {
		case 0:
			headers['Authorization'] = ''
			break;
		case 1:
			headers['Authorization'] = `${store.state.Authorization}`
			break;
		default:
			break;
	}

	return uni.request({
		url: urlConfig + url,
		method,
		data: data,
		dataType: 'json',
		header: headers
	}).then(res => {
		let resp = res[1];
		if (resp.statusCode === 200) {
			return resp.data
		} else {		
			throw resp
		}
	}).catch(parmas => {
		switch (parmas.statusCode) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				uni.showToast({
					title: parmas.data.ErrorMessage,
					icon: 'none'
				})
				return Promise.reject()
				break
		}
	})
}

export default request
