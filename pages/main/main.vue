<template>
	<view class="content">
		<slide-banner></slide-banner>
		<view v-if="hasLogin">
			<view class="title">
				您好 {{userId}}，您已成功登录。
			</view>
			<account-info></account-info>
		</view>
		<view v-if="!hasLogin">
			<view class="title">
				您好 游客。
			</view>
		</view>
		<all-game-list></all-game-list>
		<button type="primary" @tap="openOut">從外部開啟網址</button>
		<button type="default" @tap="openIn">從內部開啟網址</button>
	</view>
</template>

<script>
	import slideBanner from '../../components/slide-banner.vue'
	import allGameList from '../../components/all-game-list.vue'
	import accountInfo from '../../components/account-info.vue'
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			slideBanner,
			allGameList,
			accountInfo
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userId']),
		methods:{
			openOut() {
				// 從外部瀏覽器開啟網址 https://www.html5plus.org/doc/zh_cn/runtime.html
				// #ifdef APP-PLUS		
				plus.runtime.openURL('https://www.yahu911.com/', function(res) {
					console.log(res);
				});
				// #endif
			},
			openIn() {
				// 從外部瀏覽器開啟網址
				// #ifdef APP-PLUS		
				plus.runtime.openWeb('https://www.yahu911.com/', function(res) {
					console.log(res);
				});
				// #endif
			}
		},
		onLoad() {
			if (!this.hasLogin) {
				// uni.showModal({
				// 	title: '未登录',
				// 	content: '您未登录，需要登录后才能继续',
				// 	/**
				// 	 * 如果需要强制登录，不显示取消按钮
				// 	 */
				// 	showCancel: !this.forcedLogin,
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			/**
				// 			 * 如果需要强制登录，使用reLaunch方式
				// 			 */
				// 			if (this.forcedLogin) {
				// 				uni.reLaunch({
				// 					url: '../login/login'
				// 				});
				// 			} else {
				// 				uni.navigateTo({
				// 					url: '../login/login'
				// 				});
				// 			}
				// 		}
				// 	}
				// });
			}
		}
	}
</script>

<style>
	.title {
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul {
		font-size: 30upx;
		color: #8f8f94;
		margin-top: 50upx;
	}

	.ul>view {
		line-height: 50upx;
	}
</style>
