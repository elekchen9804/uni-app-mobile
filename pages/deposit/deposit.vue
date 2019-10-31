<template>
	<view>
		<deposit></deposit>
	</view>
</template>

<script>
	import deposit from '../../components/deposit.vue'
	export default {
		components: {
			deposit
		},
		data() {
			return {

			}
		},
		onShow() {
			// 登入檢查，沒登入就停止
			let pageInfo = getCurrentPages(),
				loginRes = this.$checkLogin(pageInfo, '2');
				
			if (!loginRes) {
				return false;
			}
		}
	}
</script>

<style>

</style>
