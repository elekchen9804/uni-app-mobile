<template>
	<view>
		<view class="game-catagory">
			<view class="game-catagory-item" v-for="(catagory, index) in gameCatagory" :key="index">
				{{catagory.DisplayName}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gameCatagory: []

			};
		},
		created() {
			let search = {
				"CategoryKey": "",
				"GameSupplierType": "MGA",
				"IsMobile": false,
				"NameKeyword": ""
			};

			this.$api.getSlotCategories(search).then(res => {
				this.gameCatagory = res.Data;
			}).catch(res => {
				console.log('Fail: ', res)
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
