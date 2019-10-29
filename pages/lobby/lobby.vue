<!-- 遊戲大廳內頁 -->
<template>
	<view>
		<game-lobby :kindName="kindName"></game-lobby>
	</view>
</template>

<script>
	import gameLobby from '../../components/game-lobby.vue'
	export default {
		components: {
			gameLobby
		},
		data() {
			return {
				lobbyTitle: '',
				kindName: ''
			}
		},
		onLoad(e) {
			// 接收轉跳的導頁資訊與類型
			this.kindName = e.kindName;
			this.lobbyTitle = this.kindName;
			uni.setNavigationBarTitle({
				title: this.lobbyTitle
			})
		},
		methods: {

		}
	}
</script>

<style>

</style>
