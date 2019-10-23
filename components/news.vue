<template>
	<view>
		<uni-notice-bar show-icon="true" single="true" background-color="transparent" color="#5b5b5b" text="我是跑馬燈我是跑馬燈我是跑馬燈我是跑馬燈我是跑馬燈我是跑馬燈我是跑馬燈我是跑馬燈我是跑馬燈"></uni-notice-bar>
	</view>
</template>

<script>
	import {uniNoticeBar} from '@dcloudio/uni-ui'
	export default {
		components: {uniNoticeBar},
		data() {
			return {
				newsContent: '143431241234123431412341234124123431243141341324'
			};
		},
		created() {
			this.$api.getSlideShow().then(res => {
				this.slideImgs = res.Data.length === 0 ? this.slideImgs : res.Data;
			}).catch(res => {
				console.log('Fail: ', res)
			})
		},
		methods: {}
	}
</script>

<style>
	
</style>
