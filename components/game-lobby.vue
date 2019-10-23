<template>
	<view>
		<view class="game-list">
			<!-- v-for="(game, index) in games" :key="index" -->
			<view class="li">
				<view class="pic" @tap="toGame('/Account/LoginToAg?lunchGame=SB58&gamecategory=17')">
					<img src="https://cdn1.0a0s.com/Multimedia/AG/ac09b3d90c79408cab566b8ecac46d3b.jpg">
				</view>
				<view class="text">魅惑魔女</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				games: []

			};
		},
		created() {
			this.$api.getSlotCategories(search).then(res => {
				this.gameCatagory = res.Data;
			}).catch(res => {
				console.log('Fail: ', res)
			})
		},
		methods: {
			toGame(url) {

				// #ifdef H5
				window.open(url);
				// #endif

				// 從內部Webview開啟網址
				// #ifdef APP-PLUS		
				plus.runtime.openWeb(url, function(res) {
					console.log(res);
				});
				// #endif
			}
		}
	}
</script>

<style>
	.game-list .li {
		width: 30%;
		margin: 1.6%;
		color: #4a4a4a;
		background-color: rgba(255, 255, 255, .95);
		border-radius: 2vw;
		box-shadow: 1px 0 10px rgba(85, 85, 85, .1);
		-webkit-box-shadow: 1px 0 10px rgba(85, 85, 85, .1);
		-moz-box-shadow: 1px 0 10px rgba(85, 85, 85, .1);
		padding: 1% 0;
		text-align: center;
	}

	.game-list .li .pic {
		display: inline-block;
		z-index: 1;
		width: 80%;
		padding: 5% 0 2%;
		border-radius: 0;
	}

	.game-list .li .pic img {
		position: relative;
		width: 100%;
		margin-bottom: 5px;
	}

	.game-list .li .text {
		margin-bottom: 8px;
	}
</style>
