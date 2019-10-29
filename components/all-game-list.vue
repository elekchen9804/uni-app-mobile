<template>
	<view class="home-navigation">
		<view class="game-tab navigation-sort">
			<view class="li" v-for="(nav, index) in gameNavigationSort" :key="index" @tap="changeSelected(nav)" :class="[nav.NavigationKindName ,selected == nav.NavigationKind ? 'active' :'' ]">
				<view class="span">{{nav.NavigationKindName}}</view>
			</view>
		</view>

		<view v-for="(nav, index) in gameNavigationSort" :key="nav.NavigationKind" v-show="selected == nav.NavigationKind"
		 :class="['game-list','navigation-sort', nav.NavigationKindName]">
			<view :class="['li',game.Name]" @tap="toLobby(game)" v-for="(game, index) in nav.NavigationSortList" :key="game.Name">
				<view class="span">{{game.Name}}</view>
				<view class="div">立即游戏</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	
	export default {		
		data() {
			return {
				gameNavigationSort: [],
				selected: '',
				loading: true
			};
		},
		computed: mapState(['hasLogin']),
		created() {

			this.$api.gameNavigationSort().then(res => {
				this.gameNavigationSort = res.NavigationInfos;
				this.selected = this.gameNavigationSort[2].NavigationKind;
			}).catch(res => {
				console.log('Fail: ', res)
			})

		},
		methods: {
			changeSelected(nav) {
				this.selected = nav.NavigationKind;
			},
			onSelected(nav) {
				return scope.selected == nav.NavigationKind;
			},
			toLobby(game) {
				// 有大廳就轉跳內部大廳
				if (game.Url && game.Url.indexOf('Account') === -1) {
					uni.navigateTo({
						url: `../lobby/lobby?kindName=${game.Name}`
					});
				} else {
					if (!this.hasLogin) {
						
					}
					const gameUrl = this.$config.siteUrl + game.Url;
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
				}
			}
		}
	}
</script>

<style>
	.home-navigation {
		position: relative;
		margin-top: 2%;
		height: 51vh;
		max-height: 390px;
		overflow: hidden;
		font-size: 0;
	}

	.home-navigation::before {
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		content: "︾";
		background-color: #ffffff;
		width: 24.5%;
		height: 18px;
		font-size: 3.5vw;
		text-align: center;
		line-height: normal;
		padding-top: 2px;
		color: #bb8845;
		z-index: 5;
		box-shadow: 0 -0.026667rem 0.213333rem #f7e1b8;
		border-radius: 0 0 0 2vw;
	}

	.game-tab {
		position: absolute;
		height: auto;
		width: 27%;
		height: 51vh;
		max-height: 390px;
		padding: 0;
		margin: 0;
		font-size: 0;
		border-radius: 2vw;
		-webkit-border-radius: 2vw;
		-moz-border-radius: 2vw;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
	}

	.game-tab::before {
		position: absolute;
		content: "";
		display: block;
		width: 90%;
		height: 100%;
		z-index: 0;
		left: 0;
		background-color: #ffffff;
		border-radius: 2vw 0px 0px 2vw;
		-webkit-border-radius: 2vw 0px 0px 2vw;
		-moz-border-radius: 2vw 0px 0px 2vw;
		overflow: hidden;
	}

	.game-tab .li {
		position: relative;
		width: 90%;
		font-size: 3.5vw;
		height: 4.5vh;
		max-height: 65px;
		padding-top: 4.85714vh;
		text-align: right;
		background-color: #ffffff;
		color: #756048;
		text-align: center;
	}

	.game-tab .li .span {
		padding-top: 0;
	}

	.game-tab .li:last-child {
		border-bottom: none;
		margin-bottom: 18px;
		border-radius: 0px 0px 0px 2vw;
		-webkit-border-radius: 0px 0px 0px 2vw;
		-moz-border-radius: 0px 0px 0px 2vw;
	}

	.game-tab .li:last-child.active {
		border-radius: 0;
		-webkit-border-radius: 0;
		-moz-border-radius: 0;
	}

	.game-tab .li:first-child {
		border-radius: 2vw 0px 0px 0px;
		-webkit-border-radius: 2vw 0px 0px 0px;
		-moz-border-radius: 2vw 0px 0px 0px;
	}

	.game-tab .li::after {
		position: absolute;
		content: "";
		display: block;
		bottom: 0;
		left: 0;
		right: 0;
		height: 1px;
		width: 80%;
		background-color: #f1f1f1;
		margin: auto;
		z-index: 2;
	}

	.game-tab .li::before {
		position: absolute;
		left: 0;
		top: 0;
		content: "";
		width: 100%;
		height: 100%;
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_sport_ac.png");
		background-size: 25%;
		background-position: center 15%;
		background-repeat: no-repeat;
	}

	.game-tab .li:hover {
		text-decoration: none;
	}

	.game-tab .li.active {
		text-decoration: none;
		color: #ffffff;
		box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
		-webkit-box-shadow: 1px 1px 3px rgba(2, 1, 1, 0.5);
		-moz-box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
		/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#8c582f+0,422917+100 */
		background: #8c582f;
		/* Old browsers */
		/* FF3.6-15 */
		/* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom, #8c582f 0%, #422917 100%);
		/* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#8c582f', endColorstr='#422917', GradientType=0);
		/* IE6-9 */
	}

	.game-tab .li.active::after {
		width: 0;
		height: 0;
		right: -1.41667vh;
		top: 50%;
		margin-top: -1.0625vh;
		left: auto;
		border-style: solid;
		border-width: 1.21429vh 0 1.21429vh 1.7vh;
		background-color: transparent;
		border-color: transparent transparent transparent #643f22;
	}

	.game-tab .li.active::before {
		margin-left: 0;
		border: none;
	}

	.game-tab .li.Hot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Hot_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Slot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Slot_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Live::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Live_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Board::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Board_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Fish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Fish_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Lottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Lottery_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Sport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Sport_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.ESport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_ESport_ac.png") !important;
		background-size: 32%;
	}

	.game-tab .li.Slot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/icon_Slot_ac.png") !important;
		background-size: 40%;
	}

	.game-list {
		position: absolute;
		min-width: auto;
		min-height: auto;
		display: inline-block;
		width: 72%;
		margin-left: 28%;
		height: 51vh;
		padding: 0;
		margin-bottom: 0;
		font-size: 0;
		overflow: hidden;
		overflow-y: auto;
		transition: transform 300ms ease;
		-ms-transform: translate3d(0, 0.2vh, 0);
		transform: translate3d(0, 0.2vh, 0);
		-webkit-overflow-scrolling: touch;
	}

	.game-list .li {
		position: relative;
		border-radius: 6px;
		overflow-y: auto;
		height: 15.98vh;
		max-height: 122.2px;
		margin-bottom: 1.76vw;
		text-indent: -999999999px;
		min-width: auto;
		display: inline-block;
		color: #ffffff;
	}

	.game-list .li i.event {
		background: none;
		margin: 0;
		bottom: 10px;
		padding: 1px 7px;
		left: 8px;
		width: auto;
		height: auto;
		background-color: #01a357;
		border-radius: 5px;
		font-size: 10px;
		box-shadow: 1px 2px 5px #000000cf;
		-webkit-box-shadow: 1px 2px 5px #000000cf;
		-moz-box-shadow: 1px 2px 5px #000000cf;
		animation: event 0.5s infinite alternate ease;
	}

	.game-list .li i.event::before {
		content: "event";
	}

	.game-list .li i.event::after {
		position: absolute;
		content: "";
		width: 0;
		height: 0;
		left: 0;
		right: 0;
		margin: auto;
		bottom: -5px;
		border-style: solid;
		border-width: 5px 2px 0 7px;
		border-color: #01a357 transparent transparent transparent;
	}

	.game-list .li.hot::before {
		animation: none;
		background-color: transparent;
	}

	.game-list .li.hot .span::before {
		position: absolute;
		content: "hot";
		left: -22.4vmin;
		top: -10.4vmin;
		background-color: #d80000;
		-ms-transform: rotate(-45deg);
		transform: rotate(-45deg);
		width: 100%;
		text-shadow: none;
		padding: 7px 0 0;
		box-shadow: 1px 2px 5px #000000cf;
		-webkit-box-shadow: 1px 2px 5px #000000cf;
		-moz-box-shadow: 1px 2px 5px #000000cf;
		z-index: 1;
	}

	.game-list .li.new::after {
		display: none;
	}

	.game-list .li.new .span::after {
		position: absolute;
		content: "new";
		left: -22.4vmin;
		top: -10.4vmin;
		background-color: #009bd8;
		-ms-transform: rotate(-45deg);
		transform: rotate(-45deg);
		width: 100%;
		text-shadow: none;
		padding: 7px 0 0;
		box-shadow: 1px 2px 5px #000000cf;
		-webkit-box-shadow: 1px 2px 5px #000000cf;
		-moz-box-shadow: 1px 2px 5px #000000cf;
	}

	.game-list .li .span {
		position: absolute;
		font-size: 3vmin;
		line-height: 4vmin;
		width: 50%;
		right: 2%;
		top: 33%;
		padding-top: 5px;
		border-top: 1px solid #ffffff;
		text-shadow: 0px 0px 5px #000000;
		text-align: center;
	}

	.game-list ..li::before {
		left: auto;
		right: 2%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/AgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BbinaSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/BbinaSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.Cq9Html {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/Cq9Html.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FsHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/FsHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GaHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/GaHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GnsHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/GnsHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GpiHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/GpiHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GpiFlash {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/GpiFlash.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.HabaHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/HabaHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.IsbHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/IsbHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.JdbHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/JdbHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.LgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/LgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.MgaHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/MgaHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.MgaFlash {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/MgaFlash.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.MwHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/MwHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.MwSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/MwSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.NeHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/NeHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PngHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PngHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PrgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PrgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PrgFlash {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PrgFlash.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtaHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PtaHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtaFlash {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PtaFlash.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtsHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PtsHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/SgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SgFlash {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/SgFlash.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.RtHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/RtHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.TpgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/TpgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AeSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/AeSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.JpSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/JpSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.RtgSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/RtgSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.QtSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/QtSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PsSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/PsSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.Pg1Slot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/Pg1Slot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GanSlot {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Slot/GanSlot.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AllBetReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/AllBetReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AgBr {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/AgBr.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BbinaLive {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/BbinaLive.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BgReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/BgReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.EBetReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/EBetReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.EvoReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/EvoReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GdReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/GdReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GpiLive {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/GpiLive.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.HgaReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/HgaReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.OgaReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/OgaReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtaReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/PtaReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtaLive {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/PtaLive.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.MgaReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/MgaReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SaReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/SaReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SbLive {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/SbLive.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SunbetReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/SunbetReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.WmReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/WmReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.RyReal {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Live/RyReal.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.City761Board {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/City761Board.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.JdbBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/JdbBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.KgHtml {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/KgHtml.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.LegBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/LegBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.JsBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/JsBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.VgBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/VgBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.NwBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/NwBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FgBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/FgBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.KyBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/KyBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.LcBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/LcBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.T365Board {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/T365Board.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.YgBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/YgBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AsBoard {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Board/AsBoard.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.City761Fish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/City761Fish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AgHsr {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/AgHsr.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BbFish30 {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/BbFish30.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BbFish38 {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/BbFish38.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.Cq9Fish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/Cq9Fish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FsFishBeauty {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/FsFishBeauty.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FsFishThunder {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/FsFishThunder.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FsFishBird {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/FsFishBird.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FsFishHappy {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/FsFishHappy.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.FsFishEveryDay {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/FsFishEveryDay.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GnsFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/GnsFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.JdbFishMoney {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/JdbFishMoney.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.JdbFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/JdbFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.Jdb2Fish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/Jdb2Fish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.MwFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/MwFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PgFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/PgFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.Pg2Fish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/Pg2Fish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/PtFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PtsFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/PtsFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.UgFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/UgFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.TpgFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/TpgFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.QtFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/QtFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.Qt2Fish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/Qt2Fish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.RtgFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/RtgFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.PsFish {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/PsFish.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BbinaLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/BbinaLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.IgLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/IgLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.IgLotto {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/IgLotto.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.IgaLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/IgaLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.IgaLotto {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/IgaLotto.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.LxLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/LxLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.VrLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/VrLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AplLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/AplLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.G1Lottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/G1Lottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.G1aLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/G1aLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/GbLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GblLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/GblLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SgwLottery {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/SgwLottery.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SingSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/SingSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AgSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/AgSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BbinaSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/BbinaSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.CmdSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/CmdSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.IboSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/IboSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.HLSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/HLSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.ImaSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/ImaSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.M8Sport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/M8Sport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SabaaSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/SabaaSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SababSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/SababSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SV388Sport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/SV388Sport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.HRBSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/HRBSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.ZfbSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/ZfbSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.E88Sport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/E88Sport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/GbSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbsSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/GbsSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.QtSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/QtSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.BtiSport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/BtiSport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.EsbEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/EsbEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SabaESport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/SabaESport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.HcEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/HcEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.CmdEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/CmdEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SabaaEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/SabaaEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.E88Esport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/E88Esport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/GbEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbsEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/GbsEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.LeEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/LeEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AviaEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/AviaEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.more {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/more.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.EsbEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/EsbEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SabaESport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/SabaESport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.HcEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/HcEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.CmdEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/CmdEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.SabaaEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/SabaaEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.E88Esport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/E88Esport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/GbEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.GbsEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/GbsEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.LeEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/LeEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list .li.AviaEsport {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/AviaEsport.jpg");
		background-size: 100% 100%;
	}

	.game-list.Hot li {
		width: 32%;
		text-indent: 0;
		padding: 4% 1%;
		font-size: 3.4vw;
		max-height: 120.25px;
		height: 15.725vh;
		margin-bottom: 1.7vh;
		background-color: #ffffff;
		border-radius: 2vw;
		-webkit-border-radius: 2vw;
		-moz-border-radius: 2vw;
		text-align: center;
		vertical-align: top;
		overflow: hidden;
	}

	.game-list.Hot .li::before {
		display: none;
	}

	.game-list.Hot .li:nth-child(3n + 2) {
		margin: 0 2%;
	}

	.game-list.Hot li img {
		width: auto;
		height: 70%;
		margin-bottom: 10%;
	}

	.game-list.Hot li .span {
		position: relative;
		display: block;
		width: 100%;
		text-shadow: none;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #5b5b5b;
		top: 0;
		border: 0;
	}

	.game-list.Sport .li,
	.game-list.Fish .li,
	.game-list.Lottery .li,
	.game-list.ESport .li,
	.game-list.Slot .li,
	.game-list.Live .li,
	.game-list.Board .li {
		width: 49%;
	}

	.game-list.Sport .li:nth-child(odd),
	.game-list.Fish .li:nth-child(odd),
	.game-list.Lottery .li:nth-child(odd),
	.game-list.ESport .li:nth-child(odd),
	.game-list.Slot .li:nth-child(odd),
	.game-list.Live .li:nth-child(odd),
	.game-list.Board .li:nth-child(odd) {
		margin-right: 2%;
	}

	.game-list.Sport .li .div,
	.game-list.Fish .li .div,
	.game-list.Lottery .li .div,
	.game-list.ESport .li .div,
	.game-list.Slot .li .div,
	.game-list.Live .li .div,
	.game-list.Board .li .div {
		font-size: 3vmin;
		background-color: rgba(255, 255, 255, 0.25);
		display: inline-block;
		height: 6vmin;
		line-height: 6vmin;
		padding: 0 8%;
		border-radius: 50px;
		position: absolute;
		right: 2%;
		bottom: 5px;
		text-shadow: 0px 0px 5px #000000;
	}

	.game-list.Fish,
	.game-list.Lottery,
	.game-list.ESport {
		font-size: 0;
	}

	.game-list.Fish .li,
	.game-list.Lottery .li,
	.game-list.ESport .li {
		margin-bottom: 1.6vw;
	}

	.game-list.Fish .li:first-child,
	.game-list.Fish .li:nth-child(2),
	.game-list.Lottery .li:first-child,
	.game-list.Lottery .li:nth-child(2),
	.game-list.ESport .li:first-child,
	.game-list.ESport .li:nth-child(2) {
		width: 100%;
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Fish/1.jpg");
		background-size: 100% 100%;
	}

	.game-list.Fish .li:first-child::before,
	.game-list.Fish .li:nth-child(2)::before,
	.game-list.Lottery .li:first-child::before,
	.game-list.Lottery .li:nth-child(2)::before,
	.game-list.ESport .li:first-child::before,
	.game-list.ESport .li:nth-child(2)::before {
		top: 2%;
		width: 25%;
		padding-bottom: 15%;
	}

	.game-list.Fish .li:first-child .span,
	.game-list.Fish .li:nth-child(2) .span,
	.game-list.Lottery .li:first-child .span,
	.game-list.Lottery .li:nth-child(2) .span,
	.game-list.ESport .li:first-child .span,
	.game-list.ESport .li:nth-child(2) .span {
		width: 35%;
		font-size: 3.5vmin;
		top: 39%;
	}

	.game-list.Fish .li:nth-child(2),
	.game-list.Lottery .li:nth-child(2),
	.game-list.ESport .li:nth-child(2) {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/fish/2.jpg");
		background-size: 100% 100%;
	}

	.game-list.Fish .li:nth-child(2)::before,
	.game-list.Fish .li:nth-child(2) .span,
	.game-list.Fish .li:nth-child(2) div,
	.game-list.Lottery .li:nth-child(2)::before,
	.game-list.Lottery .li:nth-child(2) .span,
	.game-list.Lottery .li:nth-child(2) div,
	.game-list.ESport .li:nth-child(2)::before,
	.game-list.ESport .li:nth-child(2) .span,
	.game-list.ESport .li:nth-child(2) div {
		left: 2%;
		right: auto;
	}

	.game-list.Lottery {
		font-size: 0;
	}

	.game-list.Lottery .li:first-child {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/1.jpg");
		background-size: 100% 100%;
	}

	.game-list.Lottery .li:nth-child(2) {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Lottery/2.jpg");
		background-size: 100% 100%;
	}

	.game-list.Sport {
		font-size: 0;
	}

	.game-list.Sport .li:nth-child(even) {
		margin-right: 2%;
	}

	.game-list.Sport .li:nth-child(odd) {
		margin-right: 0;
	}

	.game-list.Sport .li:first-child,
	.game-list.Sport .li:nth-child(2),
	.game-list.Sport .li:nth-child(3) {
		width: 100%;
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/1.jpg");
		background-size: 100% 100%;
	}

	.game-list.Sport .li:first-child::before,
	.game-list.Sport .li:nth-child(2)::before,
	.game-list.Sport .li:nth-child(3)::before {
		top: 2%;
		width: 25%;
		padding-bottom: 15%;
	}

	.game-list.Sport .li:first-child .span,
	.game-list.Sport .li:nth-child(2) .span,
	.game-list.Sport .li:nth-child(3) .span {
		width: 35%;
		font-size: 3.5vmin;
		top: 39%;
	}

	.game-list.Sport .li:first-child::before,
	.game-list.Sport .li:first-child .span,
	.game-list.Sport .li:first-child .div,
	.game-list.Sport .li:nth-child(2)::before,
	.game-list.Sport .li:nth-child(2) .span,
	.game-list.Sport .li:nth-child(2) .div,
	.game-list.Sport .li:nth-child(3)::before,
	.game-list.Sport .li:nth-child(3) .span,
	.game-list.Sport .li:nth-child(3) .div {
		left: 2%;
		right: auto;
	}

	.game-list.Sport .li:nth-child(2) {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/2.jpg");
		background-size: 100% 100%;
	}

	.game-list.Sport .li:nth-child(2)::before,
	.game-list.Sport .li:nth-child(2) .span,
	.game-list.Sport .li:nth-child(2) .div {
		left: auto;
		right: 2%;
	}

	.game-list.Sport .li:nth-child(3) {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/Sport/3.jpg");
		background-size: 100% 100%;
	}

	.game-list.ESport .li:first-child {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/1.jpg");
		background-size: 100% 100%;
	}

	.game-list.ESport .li:nth-child(2) {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Lobby/ESport/2.jpg");
		background-size: 100% 100%;
	}

	.game-list.Fish .li:first-child.hot .span:before,
	.game-list.Fish .li:first-child.new .span:before,
	.game-list.Lottery .li:first-child.hot .span:before,
	.game-list.Lottery .li:first-child.new .span:before,
	.game-list.ESport .li:first-child.hot .span:before,
	.game-list.ESport .li:first-child.new .span:before {
		left: -53vmin;
		top: -12vmin;
	}

	.game-list.Fish .li:nth-child(2).hot .span:before,
	.game-list.Fish .li:nth-child(2).new .span:before,
	.game-list.Lottery .li:nth-child(2).hot .span:before,
	.game-list.Lottery .li:nth-child(2).new .span:before,
	.game-list.ESport .li:nth-child(2).hot .span:before,
	.game-list.ESport .li:nth-child(2).new .span:before {
		left: -11vmin;
		top: -12vmin;
	}

	.game-list.Fish .li:nth-child(2) i.event,
	.game-list.Lottery .li:nth-child(2) i.event,
	.game-list.ESport .li:nth-child(2) i.event {
		right: 8px;
		left: auto;
	}

	.game-list.Sport .li:first-child.hot .span:before,
	.game-list.Sport .li:first-child.new .span:before,
	.game-list.Sport .li:nth-child(2).hot .span:before,
	.game-list.Sport .li:nth-child(2).new .span:before,
	.game-list.Sport .li:nth-child(3).hot .span:before,
	.game-list.Sport .li:nth-child(3).new .span:before {
		left: -11vmin;
		top: -12vmin;
	}

	.game-list.Sport .li:first-child i.event,
	.game-list.Sport .li:nth-child(2) i.event,
	.game-list.Sport .li:nth-child(3) i.event {
		right: 8px;
		left: auto;
	}

	.game-list.Sport .li:nth-child(2).hot .span:before,
	.game-list.Sport .li:nth-child(2).new .span:before {
		left: -53vmin;
	}

	.game-list.Sport .li:nth-child(2) i.event {
		left: 8px;
		right: auto;
	}

	.game-list.Hot.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.Slot.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.Live.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.Board.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.Fish.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.Lottery.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.Sport.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list.ESport.ng-hide {
		-ms-transform: translate3d(100vw, 0.2vh, 0);
		transform: translate3d(100vw, 0.2vh, 0);
		height: 50px;
		overflow: hidden;
	}

	.game-list .li {
		text-indent: 0;
	}

	.game-list ..li::before {
		position: absolute;
		right: 2%;
		top: 1%;
		background-position: center center;
		content: "";
		width: 40%;
		margin: 0 5%;
		padding-bottom: 25%;
		background-repeat: no-repeat;
		display: inline-block;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/more.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/AgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.BbinaSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/BbinaSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.Cq9Html::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/Cq9Html.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FsHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/FsHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GaHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/GaHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GnsHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/GnsHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GpiHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/GpiHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GpiFlash::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/GpiFlash.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.HabaHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/HabaHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.IsbHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/IsbHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.JdbHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/JdbHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.LgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/LgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.MgaHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/MgaHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.MgaFlash::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/MgaFlash.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.MwHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/MwHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.MwSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/MwSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.NeHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/NeHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PngHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PngHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PrgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PrgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PrgFlash::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PrgFlash.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtaHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PtaHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtaFlash::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PtaFlash.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtsHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PtsHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/SgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SgFlash::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/SgFlash.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.RtHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/RtHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.TpgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/TpgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AeSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/AeSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.JpSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/JpSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.RtgSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/RtgSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.QtSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/QtSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PsSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/PsSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.Pg1Slot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/Pg1Slot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GanSlot::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Slot/GanSlot.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/more.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.City761Board::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/City761Board.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.JdbBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/JdbBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.KgHtml::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/KgHtml.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.LegBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/LegBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.JsBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/JsBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.VgBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/VgBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.NwBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/NwBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FgBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/FgBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.KyBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/KyBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.LcBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/LcBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.T365Board::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/T365Board.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.YgBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/YgBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AsBoard::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Board/AsBoard.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/more.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AllBetReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/AllBetReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AgBr::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/AgBr.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.BbinaLive::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/BbinaLive.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.BgReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/BgReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.EBetReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/EBetReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.EvoReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/EvoReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GdReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/GdReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GpiLive::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/GpiLive.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.HgaReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/HgaReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.OgaReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/OgaReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtaReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/PtaReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtaLive::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/PtaLive.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.MgaReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/MgaReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SaReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/SaReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SbLive::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/SbLive.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SunbetReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/SunbetReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.WmReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/WmReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.RyReal::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Live/RyReal.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/more.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.SingSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/SingSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.AgSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/AgSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.BbinaSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/BbinaSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.CmdSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/CmdSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.IboSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/IboSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.HLSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/HLSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.ImaSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/ImaSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.M8Sport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/M8Sport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.SabaaSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/SabaaSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.SababSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/SababSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.SV388Sport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/SV388Sport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.HRBSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/HRBSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.ZfbSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/ZfbSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.E88Sport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/E88Sport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.GbSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/GbSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.GbsSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/GbsSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.QtSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/QtSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.BtiSport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/BtiSport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.EsbEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/EsbEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.SabaESport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/SabaESport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.HcEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/HcEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.CmdEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/CmdEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.SabaaEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/SabaaEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.E88Esport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/E88Esport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.GbEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/GbEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.GbsEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/GbsEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.LeEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/LeEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.AviaEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Sport/AviaEsport.png") !important;
		background-size: auto 100%;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/more.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.EsbEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/EsbEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SabaESport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/SabaESport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.HcEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/HcEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.CmdEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/CmdEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SabaaEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/SabaaEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.E88Esport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/E88Esport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GbEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/GbEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GbsEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/GbsEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.LeEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/LeEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AviaEsport::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/ESport/AviaEsport.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/more.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.BbinaLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/BbinaLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.IgLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/IgLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.IgLotto::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/IgLotto.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.IgaLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/IgaLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.IgaLotto::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/IgaLotto.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.LxLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/LxLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.VrLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/VrLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AplLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/AplLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.G1Lottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/G1Lottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.G1aLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/G1aLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GbLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/GbLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GblLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/GblLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.SgwLottery::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Lottery/SgwLottery.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.more::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/more.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.City761Fish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/City761Fish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.AgHsr::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/AgHsr.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.BbFish30::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/BbFish30.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.BbFish38::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/BbFish38.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.Cq9Fish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/Cq9Fish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FsFishBeauty::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/FsFishBeauty.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FsFishThunder::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/FsFishThunder.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FsFishBird::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/FsFishBird.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FsFishHappy::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/FsFishHappy.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.FsFishEveryDay::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/FsFishEveryDay.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.GnsFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/GnsFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.JdbFishMoney::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/JdbFishMoney.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.JdbFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/JdbFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.Jdb2Fish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/Jdb2Fish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.MwFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/MwFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PgFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/PgFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.Pg2Fish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/Pg2Fish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/PtFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PtsFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/PtsFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.UgFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/UgFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.TpgFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/TpgFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.QtFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/QtFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.Qt2Fish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/Qt2Fish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.RtgFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/RtgFish.png") !important;
		background-size: 100% auto;
	}

	.game-list .li.PsFish::before {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/game_logo/logo_c/Fish/PsFish.png") !important;
		background-size: 100% auto;
	}
</style>
