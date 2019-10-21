<!-- 遊戲大廳內頁 -->
<template>
	<view>
		<game-lobby></game-lobby>
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
				lobbyTitle: ''
			}
		},
		methods: {

		},
		onLoad: function(option) {
			this.lobbyTitle = option.Name;
			uni.setNavigationBarTitle({
				title: this.lobbyTitle
			})
		}
	}
</script>

<style>

</style>
