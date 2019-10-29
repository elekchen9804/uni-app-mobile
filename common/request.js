import config from './config.js'
import store from '../store/index.js'

const request = {}
const headers = {}

// #ifdef H5
const platformType = 'Mobile';
const deviceType = 'Other';
// #endif

if (uni.getSystemInfoSync().platform == "ios") {
	const platformType = 'App';
	const deviceType = 'iOS';
}

if (uni.getSystemInfoSync().platform == "android") {
	const platformType = 'App';
	const deviceType = 'Android';
}

request.globalRequest = (url, method, data, power) => {
	// 平台判斷的 header 值先拿掉
	headers['Content-Type'] = 'application/json';
	// headers['PlatformType'] = platformType;
	// headers['DeviceType'] = deviceType;

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
		url: config.siteUrl + url,
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
