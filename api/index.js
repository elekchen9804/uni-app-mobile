import request from '@/common/request.js'

const api = {}
const VERSION = 'V1'

// 大圖輪播
api.getSlideShow = params =>
	request.globalRequest(`${VERSION}/Cdn/GetSlideShow`, 'POST', params, 0)

// 取得遊戲導航清單
api.gameNavigationSort = params =>
	request.globalRequest(`${VERSION}/GameNavigationSort/GetGameNavigationSort`, 'POST', params, 0)

// 取得電子遊戲分類清單 
api.getSlotCategories = params =>
	request.globalRequest(`${VERSION}/Game/GetSlotCategories`, 'POST', params, 0)

// 取得電子遊戲入口清單 
api.getSlotGames = params => 
	request.globalRequest(`${VERSION}/Game/GetSlotGames`, 'POST', params, 0)

// 取得跑馬燈
api.getMarquee = params =>
	request.globalRequest(`${VERSION}/Marquee/GetLastMarquee`, 'POST', params, 0)

// 登入
api.accountLogin = params =>
	request.globalRequest(`${VERSION}/Account/Login`, 'POST', params, 0)

// 取得自己的帳戶余額
api.getUserBalance = params =>
	request.globalRequest(`${VERSION}/Account/GetMyBalance`, 'POST', params, 1)

export default api
