<template>
	<view>
		<view class="search">
			<!-- <form ng-submit="gamelist(1)">
				<div class="form-group">
					<input type="text" placeholder="@Resources.Common.Search_Game" ng-model="gamesearch" />
					<button id="search-btn" type="submit"><i class="fa fa-search"></i></button>
				</div>
			</form>
			<select ng-model="selectCategories" ng-change="changeCategories()" ng-cloak>
				<option ng-repeat-start="sort in sorts" value="{{sort.CategoryKey}}">{{sort.DisplayName}}</option>
				<option class="sub-option" ng-repeat-end ng-repeat="cate in sort.ChildList" value="{{cate.CategoryKey}}"> -
					{{cate.DisplayName}}</option>
			</select> -->

			<picker mode="multiSelector" @change="search" @columnchange="bindMultiPickerColumnChange" :value="categoryIndex" :range="categoryArray"
			 range-key="DisplayName">
				<view class="uni-input">{{categoryArray[0][categoryIndex[0]]['DisplayName']}}，{{categoryArray[1][categoryIndex[1]]['DisplayName']}}</view>
			</picker>
			<view v-for="(value, index) in searchParams" :key="index">
				{{index}} : {{value}}
			</view>
		</view>
		<!-- @scroll="scroll" 滾動事件 -->
		<scroll-view class="game-list" scroll-y="true" @scrolltolower="lower" :style="{ height: windowHeight}">
			<view class="li" v-for="(game, index) in showGames" :key="index">
				<view class="pic" @tap="toGame('/Account/LoginToAg?lunchGame=SB58&gamecategory=17')">
					<img lazy-load="true" :src="`${cdn1Url}${game.ButtonImagePath}`" :data-index="index" @error="handleError(index)">
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
				totalCount: '',
				windowHeight: '',
				categoryArray: [
					[{
						CategoryKey: '',
						DisplayName: '载入中',
						ChildList: null
					}],
					[{
						CategoryKey: '',
						DisplayName: '全部',
						ChildList: null
					}]
				],
				categoryIndex: [0, 0],
				categoryParams: {
					CategoryKey: '1',
					GameSupplierType: this.gameType,
					IsMobile: true,
					NameKeyword:''
				},
				searchParams: {
					CategoryKey: '1',
					GameSupplierType: '',
					IsMobile: true,
					NameKeyword: '',
					take: 1000
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
				return `Multimedia/${this.gameType}/default.jpg`;
			}
		},
		created() {
			this.showLoading();
			// 讓 scroll-view 有高度 , 否則無法觸發 scroll 事件
			try {
				const res = uni.getSystemInfoSync();
				this.windowHeight = res.windowHeight + 'px';
			} catch (e) {
				console.log('Get system info fail');
			}

			// 分類初始化
			this.categoryParams.GameSupplierType = this.gameType;
			// 取得分類資料後
			this.$api.getSlotCategories(this.categoryParams).then(res => {
				this.categoryArray[0] = res.CateList;
				this.categoryArray[1] = this.categoryArray[1].concat(this.categoryArray[0][0]['ChildList']);
				this.addFirstChildCategoryItem(0, 0);
				// 更新資料到畫面
				this.$forceUpdate();
			}).catch(res => {
				console.log('Fail: ', res)
			})
			// 設定子分類的第一項

			this.searchParams.GameSupplierType = this.gameType;
			this.search();
		},
		methods: {
			showLoading(){
				uni.showLoading({
					title: '加载中'
				});
			},
			search(){
				this.showLoading();
				this.showGames = this.totalGames = [];
				
				this.$api.getSlotGames(this.searchParams).then(res => {
					this.totalCount = res.TotalCount;
					this.totalGames = res.Games;
					this.loadGames();
					this.$forceUpdate();
					uni.hideLoading();
				}).catch(res => {
					console.log('Fail: ', res)
				})
			},
			loadGames() {
				if (this.pageIndex > this.totalCount) {
					return;
				}

				let addItems = this.totalGames.splice(this.pageIndex, this.take);
				this.showGames = this.showGames.concat(addItems);
				this.pageIndex = this.pageIndex + this.take;
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
				// 到底就再入更多遊戲
				this.loadGames();
			},
			handleError(index) {
				this.showGames[index].ButtonImagePath = this.defaultImgPath;
			},
			addFirstChildCategoryItem(columnIndex, valueIndex) {
				this.categoryArray[1][0]['CategoryKey'] = this.categoryArray[columnIndex][valueIndex]['CategoryKey'];
			},
			bindMultiPickerColumnChange(e) {
				// 列 0: 大分類
				// 列 1: 子分類
				console.log('修改的列为：' + e.detail.column + '，值为：' + e.detail.value)

				// 如果是列 0 改動 > assign ChildList 到 列 1
				// 如果是列 1 改動 > 取得	CategoryKey
				if (e.detail.column === 0) {
					let newCategoryArray = [];
					newCategoryArray.push(this.categoryArray[1][0]);
					newCategoryArray = newCategoryArray.concat(this.categoryArray[0][e.detail.value]['ChildList']);
					this.categoryArray[1] = newCategoryArray;
					this.addFirstChildCategoryItem(0, e.detail.value);
					console.log('e.detail.value: ', e.detail.value);
					this.searchParams.CategoryKey = this.categoryArray[1][0]['CategoryKey'];
				} else {
					this.searchParams.CategoryKey = this.categoryArray[1][e.detail.value]['CategoryKey'];
				}

				// 更改 index
				this.categoryIndex[e.detail.column] = e.detail.value;
				this.$forceUpdate();
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
