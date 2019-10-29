<template>
	<view>
		<scroll-view class="game-list" :scroll-top="scrollTop" scroll-y="true" @scrolltolower="lower" @scroll="scroll" :style="{ height: windowHeight}">
			<view class="li" v-for="(game, index) in showGames" :key="index">
				<view class="pic" @tap="toGame('/Account/LoginToAg?lunchGame=SB58&gamecategory=17')">
					<!-- <img lazy-load="true" :src="`${cdn1Url}${game.ButtonImagePath}`" @error="this.src = `${cdn1Url}Multimedia/${gameType}/default.jpg`"> -->
					<img lazy-load="true" :src="`${cdn1Url}${game.ButtonImagePath}`" :data-index="index" @error="handleError">
				</view>
				<view class="text">{{game.DisplayName}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cdn1Url: this.$config.cdn1Url,
				totalGames: [],
				showGames: [],
				take: 15,
				pageIndex: 0,
				scrollTop: 0,
				windowHeight: '',
				old: {
					scrollTop: 0
				}
			};
		},
		props: {
			kindName: {
				type: String,
				default: ''
			}
		},
		computed: {
			gameType() {
				// get gameSupplierType
				const removeStringList = ['slot', 'html', 'flash', 'board', 'sport', 'lottery', 'real', 'esport'];
				let kindName = this.kindName.toLowerCase(),
					gameType = '';

				removeStringList.forEach(function(value) {
					let hasMatchString = kindName.search(value) !== -1;

					if (hasMatchString) {
						gameType = kindName.replace(value, '');
						return;
					}
				});

				return gameType.toUpperCase();
			},
			defaultImgPath() {
				return `${this.cdn1Url}Multimedia/${this.gameType}/default.jpg`;
			}
		},
		onLoad() {

		},
		created() {
			try {
				const res = uni.getSystemInfoSync();
				this.windowHeight = res.windowHeight + 'px';			
			} catch (e) {
				console.log('Get system info fail');
			}

			let params = {
				CategoryKey: '1',
				GameSupplierType: this.gameType,
				IsMobile: true,
				NameKeyword: '',
				take: 200
			};

			this.$api.getSlotGames(params).then(res => {
				this.totalGames = res.Games;
				this.loadGames();
			}).catch(res => {
				console.log('Fail: ', res)
			})



			// this.$api.getSlotCategories().then(res => {
			// 	this.gameCatagory = res.Data;
			// }).catch(res => {
			// 	console.log('Fail: ', res)
			// })
		},
		onPageScroll: {

		},
		methods: {
			loadGames() {
				let addItems = this.totalGames.splice(this.pageIndex, this.take);
				this.showGames = this.showGames.concat(addItems);
				this.pageIndex++;
			},
			toGame(url) {
				const gameUrl = $config.siteUrl + game.Url;
				// 直連入口就另開
				// #ifdef H5
				window.open(gameUrl);
				// #endif

				// 從內部Webview開啟網址
				// #ifdef APP-PLUS		
				plus.runtime.openWeb(gameUrl, function(res) {
					console.log(res);
				});
				// #endif
			},
			lower(e) {
				this.loadGames();
			},
			handleError(evt) {
				console.log(evt.target.dataset);
				const index = evt.target.dataset.index;
				this.showGames[index].src = this.defaultImgPath;
			}
		}
	}
</script>

<style>
	.game-list {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		height: ;
	}

	.game-list .li {
		display: inline-block;
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
