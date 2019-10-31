<template>
	<view>
		<uni-notice-bar single="true" show-icon="true" background-color="transparent" color="#5b5b5b" :text="newsContent"></uni-notice-bar>
	</view>
</template>

<script>
	import {uniNoticeBar} from '@dcloudio/uni-ui'
	export default {
		components: {uniNoticeBar},
		data() {
			return {
				newsContent: ''
			};
		},
		created() {
			this.$api.getMarquee().then(res => {
				this.newsContent = res.Data.join(' ');
			}).catch(res => {
				console.log('Fail: ', res)
			})
		},
		methods: {}
	}
</script>

<style>
	
</style>
