<template>
	<view>
		<view class="game-tab navigation-sort" v-for="(nav, index) in gameNavigationSort" :key="index" @tap="changeSelected(nav)">
			<view>
				{{nav.NavigationKindName}}
			</view>
		</view>
		<view v-for="(nav, index) in gameNavigationSort" :key="nav.NavigationKind" class="game-list navigation-sort" v-show="selected == nav.NavigationKind"
		 ng-cloak>
			<view class="game-item" :class="game.Name" v-for="(game, index) in nav.NavigationSortList" :key="game.Name">
				{{game.NameCn}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gameNavigationSort: [],
				selected: ''
			};
		},
		created() {

			this.gameNavigationSort = [{
				"NavigationKind": 12,
				"NavigationKindName": "Sport",
				"NavigationSortList": [{
					"Name": "BtiSport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "Bti_Sport",
					"Url": "/Account/LoginToBti",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "BTI體育",
					"NameCn": "BTI体育",
					"NameEn": "BTI Sport",
					"NameTh": "BTI Sport",
					"ImageFileName": "8dbb425ec9c14d8d9d907a0753d77f24.png"
				}, {
					"Name": "CmdSport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "CMD_Sports",
					"Url": "/Account/LoginToCmd?isMobile=true",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "CMD 體育",
					"NameCn": "CMD 体育",
					"NameEn": "CMD Sports",
					"NameTh": "CMD Sports",
					"ImageFileName": "9d8bb4470c63439091129f2b8de749c7.png"
				}, {
					"Name": "SabaaSport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "SABAA_Sports",
					"Url": "/Account/LoginToSabaa",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "SABA 體育",
					"NameCn": "SABA 体育",
					"NameEn": "SABA Sports",
					"NameTh": "SABA Sports",
					"ImageFileName": "4e3893fa10764056911d27635652ac3e.png"
				}, {
					"Name": "BbinaSport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "BBINA_Sports",
					"Url": "/Account/LoginToBbina?gameKind=4",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "BB 體育",
					"NameCn": "BB 体育",
					"NameEn": "BB Sports",
					"NameTh": "BB Sports",
					"ImageFileName": "BbSport.png"
				}, {
					"Name": "ImaSport",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "IMA_Sport",
					"Url": "/Account/LoginToIma?gameCode=IMSB\u0026isMobile=true",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "IM 體育",
					"NameCn": "IM 体育",
					"NameEn": "IM Sports",
					"NameTh": "IM Sports",
					"ImageFileName": "90c0c8798dc54d47a1aeb4162a7b8323.png"
				}, {
					"Name": "GbSport",
					"IsHot": false,
					"IsNew": true,
					"IsEvent": false,
					"LangKey": "Gb_Sport",
					"Url": "/Account/LoginToGb?isMobile=true\u0026gameType=Sports",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "GB 體育",
					"NameCn": "GB 体育",
					"NameEn": "GB Sports",
					"NameTh": "GB Sports",
					"ImageFileName": "25e4af28155f4b038353ef60e21e71d3.png"
				}, {
					"Name": "AgSport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "AG_Sports",
					"Url": "/Account/LoginToAg?lunchGame=TASSPTA\u0026gamecategory=86\u0026isMobile=true",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "AG 體育",
					"NameCn": "AG 体育",
					"NameEn": "AG Sport",
					"NameTh": "AG Sport",
					"ImageFileName": "4cdc8010de3a4b39b3de231b3442359c.png"
				}]
			}, {
				"NavigationKind": 17,
				"NavigationKindName": "ESport",
				"NavigationSortList": [{
					"Name": "CmdEsport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "CMD_ESports",
					"Url": "/Account/LoginToCmd?isMobile=true\u0026view=v3",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "CMD 電競",
					"NameCn": "CMD 电竞",
					"NameEn": "CMD ESports",
					"NameTh": "CMD ESports",
					"ImageFileName": "62058fe8b9594e468b1f7b1590318ba8.png"
				}, {
					"Name": "SabaaEsport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "SABAA_Esports",
					"Url": "/Account/LoginToSabaa",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "沙巴電競",
					"NameCn": "沙巴电竞",
					"NameEn": "SABA ESports",
					"NameTh": "SABA ESports",
					"ImageFileName": "661b69fe874d44be86bee75026bfc267.png"
				}, {
					"Name": "EsbEsport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "ESB_Sport",
					"Url": "/Account/LoginToEsb?gameCode=esportsbull\u0026isMobile=true",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "ESB 電競",
					"NameCn": "ESB 电竞",
					"NameEn": "ESB Esports",
					"NameTh": "ESB Esports",
					"ImageFileName": "f667e5fadafa49f8be9c592f4ceb2128.png"
				}, {
					"Name": "GbEsport",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "Gb_Esport",
					"Url": "/Account/LoginToGb?isMobile=true\u0026gameType=Esports",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "GB 電競",
					"NameCn": "GB 电竞",
					"NameEn": "GB Esport",
					"NameTh": "GB Esport",
					"ImageFileName": "2865a1f6b7734629b6432bff78e78a6c.png"
				}, {
					"Name": "AviaEsport",
					"IsHot": false,
					"IsNew": true,
					"IsEvent": false,
					"LangKey": "AVIA_Esports",
					"Url": "/Account/LoginToAvia",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "泛亞電競",
					"NameCn": "泛亚电竞",
					"NameEn": "AVIA ESports",
					"NameTh": "AVIA ESports",
					"ImageFileName": "5450294c9aed4a60b4201154f96c9acc.png"
				}]
			}, {
				"NavigationKind": 10,
				"NavigationKindName": "Live",
				"NavigationSortList": [{
					"Name": "AgBr",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "AG_Live",
					"Url": "/Account/LoginToAg?lunchGame=0\u0026gamecategory=16",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "AG 真人",
					"NameCn": "AG 真人",
					"NameEn": "AG Live",
					"NameTh": "AG Live",
					"ImageFileName": "AgBr.png"
				}, {
					"Name": "EBetReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "EBET_Live",
					"Url": "/Account/LoginToEBet",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "EBET 真人",
					"NameCn": "EBET 真人",
					"NameEn": "EBET Live",
					"NameTh": "EBET Live",
					"ImageFileName": "EBetReal.png"
				}, {
					"Name": "SaReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "SA_Live",
					"Url": "/Account/LoginToSa",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "SA 真人",
					"NameCn": "SA 真人",
					"NameEn": "SA Live",
					"NameTh": "SA Live",
					"ImageFileName": "6b3b42d001f345499acee060cd66fd79.png"
				}, {
					"Name": "BgReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "BG_Live",
					"Url": "/Account/LoginToBgVideo",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "BG 真人",
					"NameCn": "BG 真人",
					"NameEn": "BG Live",
					"NameTh": "BG Live",
					"ImageFileName": "BgReal.png"
				}, {
					"Name": "OgaReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "OGA_Live",
					"Url": "/Account/LoginToOga",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "OG 真人",
					"NameCn": "OG 真人",
					"NameEn": "OG Live",
					"NameTh": "OG Live",
					"ImageFileName": "841aeae4b0a84e28bd7f4b91ed5758a9.png"
				}, {
					"Name": "SunbetReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "SUNBET_Live",
					"Url": "/Account/LoginToSunbet?provider=SB\u0026isMobile=true",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "申博真人",
					"NameCn": "申博真人",
					"NameEn": "SB Live",
					"NameTh": "SB Live",
					"ImageFileName": "9afe0b1d093243dea7a7d2117f82202e.png"
				}, {
					"Name": "MgaReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "MGA_Casino",
					"Url": "/Account/LoginToMga?gameKind=1\u0026gameType=NMGENM00",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "MG 真人",
					"NameCn": "MG 真人",
					"NameEn": "MG Live",
					"NameTh": "MG Live",
					"ImageFileName": "d3b1f9734a71440086a72319f40fb132.png"
				}, {
					"Name": "AllBetReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "AB_Live",
					"Url": "/Account/LoginToAllBet?isMobile=true",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "AB 真人",
					"NameCn": "AB 真人",
					"NameEn": "AB Live",
					"NameTh": "AB Live",
					"ImageFileName": "AllBetReal.png"
				}, {
					"Name": "BbinaLive",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "BBINA_Live",
					"Url": "/Account/LoginToBbina?gameKind=1",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "BB 真人",
					"NameCn": "BB 真人",
					"NameEn": "BB Live",
					"NameTh": "BB Live",
					"ImageFileName": "BbVideo.png"
				}, {
					"Name": "PtaReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "PTA_Live",
					"Url": "/Account/LoginToPta?gameKind=1\u0026gameType=",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "PT 真人",
					"NameCn": "PT 真人",
					"NameEn": "PT Live",
					"NameTh": "PT Live",
					"ImageFileName": "21a571ee8c32409aaae4ec0b851e0294.png"
				}, {
					"Name": "HgaReal",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "HGA_Live",
					"Url": "/Account/LoginToHga",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "HG 真人",
					"NameCn": "HG 真人",
					"NameEn": "HG Live",
					"NameTh": "HG Live",
					"ImageFileName": "b920b24fa9da478981f58e41e63a03ab.png"
				}]
			}, {
				"NavigationKind": 9,
				"NavigationKindName": "Slot",
				"NavigationSortList": [{
					"Name": "AgHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": true,
					"LangKey": "AG_Casino",
					"Url": "/Lobby/AGHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "AG 電子",
					"NameCn": "AG 电子",
					"NameEn": "AG Casino",
					"NameTh": "AG Casino",
					"ImageFileName": "AgHtml.png"
				}, {
					"Name": "MgaHtml",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "MGA_Casino",
					"Url": "/Lobby/MGAHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "MG 電子",
					"NameCn": "MG 电子",
					"NameEn": "MGA Casino",
					"NameTh": "MGA Casino",
					"ImageFileName": "MgHtml.png"
				}, {
					"Name": "Cq9Html",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "CQ9_Casino",
					"Url": "/Lobby/CQ9Html",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "傳奇電子",
					"NameCn": "传奇电子",
					"NameEn": "CQ9 Casino",
					"NameTh": "CQ9 Casino",
					"ImageFileName": "7e48605219ea41c68250142a7d017039.png"
				}, {
					"Name": "PtaHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "PTA_Casino",
					"Url": "/Lobby/PTAHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "PT 電子",
					"NameCn": "PT 电子",
					"NameEn": "PT Casino",
					"NameTh": "PT Casino",
					"ImageFileName": "b9d496507faa495988538cadc31e9fc0.png"
				}, {
					"Name": "JdbHtml",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "JDB_Casino",
					"Url": "/Lobby/JDBHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "JDB 電子",
					"NameCn": "JDB 电子",
					"NameEn": "JDB Casino",
					"NameTh": "JDB Casino",
					"ImageFileName": "d1c7732100884a1ba0d23a81205e96ba.png"
				}, {
					"Name": "MwSlot",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "MW_Casino",
					"Url": "/Lobby/MWHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "MW 電子",
					"NameCn": "MW 电子",
					"NameEn": "MW Casino",
					"NameTh": "MW Casino",
					"ImageFileName": "MwSlot.png"
				}, {
					"Name": "SgHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "SG_Casino",
					"Url": "/Lobby/SGHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "SG 電子",
					"NameCn": "SG 电子",
					"NameEn": "SG Casino",
					"NameTh": "SG Casino",
					"ImageFileName": "SgHtml.png"
				}, {
					"Name": "IsbHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": true,
					"LangKey": "ISB_Casino",
					"Url": "/Lobby/ISBHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "ISB 電子",
					"NameCn": "ISB 电子",
					"NameEn": "ISB Casino",
					"NameTh": "ISB Casino",
					"ImageFileName": "IsbHtml.png"
				}, {
					"Name": "GnsHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "GNS_Casino",
					"Url": "/Lobby/GNSHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "GNS 電子",
					"NameCn": "GNS 电子",
					"NameEn": "GNS Casino",
					"NameTh": "GNS Casino",
					"ImageFileName": "e8deddd92b6c48cf89c1b63e363f96d1.png"
				}, {
					"Name": "NeHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "NETENT_Casino",
					"Url": "/Lobby/NETENTHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "NE 電子",
					"NameCn": "NE 电子",
					"NameEn": "NE Casino",
					"NameTh": "NE Casino",
					"ImageFileName": "NeHtml.png"
				}, {
					"Name": "BbinaSlot",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "BBINA_Casino",
					"Url": "/Account/LoginToBbina?gameKind=2",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "BB 電子",
					"NameCn": "BB 电子",
					"NameEn": "BB Casino",
					"NameTh": "BB Casino",
					"ImageFileName": "BbSlot.png"
				}, {
					"Name": "TpgHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "TPG_Casino",
					"Url": "/Lobby/TPGHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "TPG 電子",
					"NameCn": "TPG 电子",
					"NameEn": "TPG Casino",
					"NameTh": "TPG Casino",
					"ImageFileName": "4847b559782143088b916387373a9314.png"
				}, {
					"Name": "PrgHtml",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": true,
					"LangKey": "PRG_Casino",
					"Url": "/Lobby/PRGHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "PP 王者電子",
					"NameCn": "PP 王者电子",
					"NameEn": "PP Casino",
					"NameTh": "PP Casino",
					"ImageFileName": "PrgHtml.png"
				}]
			}, {
				"NavigationKind": 14,
				"NavigationKindName": "Lottery",
				"NavigationSortList": [{
					"Name": "VrLottery",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "VR_Lottery",
					"Url": "/Account/LoginToVr",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "VR 競速彩票",
					"NameCn": "VR 竞速彩票",
					"NameEn": "VR Racing",
					"NameTh": "VR Racing",
					"ImageFileName": "eaaec2d54d6d42b4b2a837aae66b138c.png"
				}, {
					"Name": "G1Lottery",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "G1_Lottery",
					"Url": "/Account/LoginToG1?isMobile=true\u0026gameId=7",
					"UrlActionType": 4,
					"IsEmbedded": false,
					"NameTw": "G1 彩票",
					"NameCn": "G1 彩票",
					"NameEn": "G1 Lottery",
					"NameTh": "G1 Lottery",
					"ImageFileName": "fe27a89519f74c44b3f2cc1d9e25fb4a.png"
				}, {
					"Name": "IgaLottery",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "IGA_Lottery",
					"Url": "/Account/LoginToIga?gameCode=imlotto10000\u0026isMobile=true",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "IG 彩票",
					"NameCn": "IG 彩票",
					"NameEn": "IG Lottery",
					"NameTh": "IG Lottery",
					"ImageFileName": "ec4962f452674677b45dfe1470035263.png"
				}, {
					"Name": "GbLottery",
					"IsHot": true,
					"IsNew": true,
					"IsEvent": false,
					"LangKey": "GB_Lottery",
					"Url": "/Lobby/GbHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "GB 彩票",
					"NameCn": "GB 彩票",
					"NameEn": "Gb Lottery",
					"NameTh": "Gb Lottery",
					"ImageFileName": "9f2b222c8a0c4137bc3d0b2fdd3dd595.png"
				}, {
					"Name": "SgwLottery",
					"IsHot": false,
					"IsNew": true,
					"IsEvent": false,
					"LangKey": "SGW_Lottery",
					"Url": "/Account/LoginToSgw?isMobile=true",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "SGW 彩票",
					"NameCn": "SGW 彩票",
					"NameEn": "SGW Lottery",
					"NameTh": "SGW Lottery",
					"ImageFileName": "bb3f79c52dba418da3401a127461523d.png"
				}]
			}, {
				"NavigationKind": 13,
				"NavigationKindName": "Board",
				"NavigationSortList": [{
					"Name": "KyBoard",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "KY_Board",
					"Url": "/Lobby/KYHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "KY開元棋牌",
					"NameCn": "KY开元棋牌",
					"NameEn": "KY Card Games",
					"NameTh": "KY Card Games",
					"ImageFileName": "37d4c972b59949ad916711c0ab600075.png"
				}, {
					"Name": "LegBoard",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "Leg_Board",
					"Url": "/Lobby/LEGHtml",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "樂遊棋牌",
					"NameCn": "乐游棋牌",
					"NameEn": "LEG Board",
					"NameTh": "LEG Board",
					"ImageFileName": "98378dcafa4f4fca90df854e5b5c0cd3.png"
				}, {
					"Name": "JdbBoard",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "Jdb_Board",
					"Url": "/Lobby/JDBBoard",
					"UrlActionType": 3,
					"IsEmbedded": false,
					"NameTw": "JDB 奪寶棋牌",
					"NameCn": "JDB 夺宝棋牌",
					"NameEn": "JDB Board",
					"NameTh": "JDB Board",
					"ImageFileName": "d598ca9ae3b44c3aac30160e34c10e12.png"
				}]
			}, {
				"NavigationKind": 11,
				"NavigationKindName": "Fish",
				"NavigationSortList": [{
					"Name": "AgHsr",
					"IsHot": true,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "AG_Fish",
					"Url": "/Account/LoginToAg?LunchGame=6\u0026Gamecategory=36",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "AG 捕魚王",
					"NameCn": "AG 捕鱼王",
					"NameEn": "AG Fish",
					"NameTh": "AG Fish",
					"ImageFileName": "AgHsr.png"
				}, {
					"Name": "JdbFish",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "JDB_Fish",
					"Url": "/Account/LoginToJdb?GameId=7001\u0026GameType=7",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "JDB 龍王捕魚",
					"NameCn": "JDB 龙王捕鱼",
					"NameEn": "JDB Dragon Fishing",
					"NameTh": "JDB Dragon Fishing",
					"ImageFileName": "JdbFish.png"
				}, {
					"Name": "Jdb2Fish",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "JDB_Fish2",
					"Url": "/Account/LoginToJdb?GameId=7002\u0026GameType=7",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "JDB 龍王捕魚2",
					"NameCn": "JDB 龙王捕鱼2",
					"NameEn": "JDB Dragon Fishing II",
					"NameTh": "JDB Dragon Fishing II",
					"ImageFileName": "Jdb2Fish.png"
				}, {
					"Name": "JdbFishMoney",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "JDB_Fish_Money",
					"Url": "/Account/LoginToJdb?GameId=7003\u0026GameType=7",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "JDB 財神捕魚",
					"NameCn": "JDB 财神捕鱼",
					"NameEn": "JDB Cai Shen Fishing",
					"NameTh": "JDB Cai Shen Fishing",
					"ImageFileName": "4b36852282dc4067b6864f6a7822fac8.png"
				}, {
					"Name": "MwFish",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "MW_Fish",
					"Url": "/Account/LoginToMw?GameId=1051",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "MW 千炮捕魚",
					"NameCn": "MW 千炮捕鱼",
					"NameEn": "MW Fish",
					"NameTh": "MW Fish",
					"ImageFileName": "52fdd8d69eeb41bca5a8c6bb5572d1b2.png"
				}, {
					"Name": "Cq9Fish",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "CQ9_Fish",
					"Url": "/Account/LoginToCq9?gameHall=cq9\u0026gameType=fish\u0026gameCode=AB1\u0026gameTech=html5",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "CQ9 皇金漁場",
					"NameCn": "CQ9 皇金渔场",
					"NameEn": "CQ9 Paradise",
					"NameTh": "CQ9 Paradise",
					"ImageFileName": "Cq9Fish.png"
				}, {
					"Name": "GnsFish",
					"IsHot": false,
					"IsNew": false,
					"IsEvent": false,
					"LangKey": "GNS_Fish",
					"Url": "/Account/LoginToGns?GameId=M4-0075\u0026isFish=true",
					"UrlActionType": 2,
					"IsEmbedded": false,
					"NameTw": "GNS 尋寶捕魚王",
					"NameCn": "GNS 寻宝捕鱼王",
					"NameEn": "Sea Raider",
					"NameTh": "Sea Raider",
					"ImageFileName": "GnsFish.png"
				}]
			}];
			// this.$api.gameNavigationSort().then(res => {
			// 	this.gameNavigationSort = res.Data.length === 0 ? this.gameNavigationSort : res.Data;
			// }).catch(res => {
			// 	console.log('Fail: ', res)
			// })

			this.selected = this.gameNavigationSort[0].NavigationKind;
		},
		methods: {
			changeSelected(nav) {
				this.selected = nav.NavigationKind;
			}
		}
	}
</script>

<style>
	.uni-margin-wrap {
		height: 100%;
		margin: 0 0upx;
	}

	.swiper-item {
		display: block;
		line-height: 400upx;
		text-align: center;
	}

	.swiper-image {
		width: 100%;
		height: 400upx;
	}

	uni-image {
		width: 100%;
	}

	.game-tab,
	.game-item{
		display: inline-block;
		vertical-align: top;
	}
</style>
