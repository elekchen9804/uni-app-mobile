<!-- 使用者資訊 -->
<template>
	<view>
		<view>帳號: {{userId}}</view>
		<view>餘額: {{userBalance}}</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	
	export default {
		data() {
			return {

			};
		},
		computed: mapState(['userId', 'userBalance']),
		methods: {
			...mapMutations(['changeUserBalnce'])
		},
		created() {
			this.$api.getUserBalance().then(res => {
				// 获得数据 
				this.changeUserBalnce(res.Balance);
			}).catch(res => {
				// 失败进行的操作
				console.log('Fail: ', res)
			})
		}
	}
</script>

<style>

</style>
