<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			// 登入檢查，沒登入就停止
			let pageInfo = getCurrentPages(),
				loginRes = this.$checkLogin(pageInfo, '1');
				
			if (!loginRes) {
				return false;
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
