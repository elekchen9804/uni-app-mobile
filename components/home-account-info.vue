<!-- 使用者資訊 -->
<template>
	<view class="account-info">
		<view class="info-title">
			您好，
			<view class="span" v-if="!hasLogin">请登录</view>
			<view class="span" v-if="hasLogin">{{userId}}</view>
			<view class="account-center" @tap="toMylink">个人中心</view>
		</view>
		<view class="info-body">
			<view class="balance">
				<view class="span">中心钱包</view>
				<block v-if="!hasLogin">
					<button type="button" @tap="toLogin">登录查看</button>
				</block>
				<block v-if="hasLogin">
					<span @tap="openAccountModal()">
						$ {{userBalance}}
						<i class="fa fa-refresh"></i>
					</span>
				</block>
			</view>
			<view class="link-group">
				<view class="li deposit">
					<view class="a" @tap="toDeposit()">存款</view>
				</view>
				<view class="li withdraw">
					<view class="a" @tap="toWithdraw()">提款</view>
				</view>
				<view class="li promotion">
					<view class="a" @tap="toPromotion()">优惠</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="title">一鍵取回彈窗</view>
			<view>
				很多內容很多內容很多內<br>
				很多內容很多內容很多內<br>
				很多內容很多內容很多內<br>
				很多內容很多內容很多內<br>
			</view>

			<button @click="closePopup">关闭弹出层</button>
		</uni-popup>
	</view>
</template>

<script>
	import {
		uniPopup
	} from '@dcloudio/uni-ui';
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {

			};
		},
		components: {
			uniPopup
		},
		computed: mapState(['hasLogin', 'userId', 'userBalance']),
		methods: {
			...mapMutations(['changeUserBalnce'])
		},
		created() {
			// this.$api.getUserBalance().then(res => {
			// 	// 获得数据 
			// 	this.changeUserBalnce(res.Balance);
			// }).catch(res => {
			// 	// 失败进行的操作
			// 	console.log('Fail: ', res)
			// })
		},
		methods: {
			toMylink() {
				if (this.hasLogin) {
					uni.switchTab({
						url: '/pages/mylink/mylink'
					});
				} else {
					this.toLogin()
				}
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			toDeposit() {
				if (this.hasLogin) {
					uni.switchTab({
						url: '/pages/deposit/deposit'
					})
				} else {
					this.toLogin()
				}
			},
			toWithdraw() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: '/pages/Withdraw/Withdraw'
					})
				} else {
					this.toLogin()
				}
			},
			toPromotion() {
				if (this.hasLogin) {
					uni.navigateTo({
						url: '/pages/Promotion/Promotion'
					})
				} else {
					this.toLogin()
				}
			},
			openAccountModal() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	.account-info {
		overflow: hidden;
		border-radius: 2vw;
		-webkit-border-radius: 2vw;
		-moz-border-radius: 2vw;
		background-color: #fff;
		box-shadow: 0 4px 8px 0 rgba(90, 90, 90, .1);
	}

	.info-title {
		/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#8c582f+0,422917+100 */
		background: #8c582f;
		/* Old browsers */
		/* FF3.6-15 */
		/* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to bottom, #8c582f 0%, #422917 100%);
		/* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#8c582f', endColorstr='#422917', GradientType=0);
		/* IE6-9 */
		background-size: auto 100%;
		color: #ffffff;
		padding: 1% 3%;
		font-size: 3.5vw;
	}

	.account-center {
		float: right;
		border: 1px solid #f1d892;
		color: #f1d892;
		font-size: 3vw;
		padding: 0 6px;
		border-radius: 20vw;
		-webkit-border-radius: 20vw;
		-moz-border-radius: 20vw;
		margin-top: -1px;
	}

	.info-body {
		padding: 2vw 2%;
		font-size: 0;
	}

	.info-body>view {
		display: inline-block;
		vertical-align: middle;
		font-size: 3.7vw;
		text-align: center;
	}

	.info-body .balance {
		width: 32%;
	}

	.info-body .balance span {
		color: #999999;
	}

	.info-body .balance span:last-of-type {
		display: block;
		line-height: 5vw;
		font-size: 4vw;
		color: #ad8965;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.info-body .balance button {
		width: 70px;
		height: 18px;
		line-height: 18px;
		color: #756048;
		border: 1px solid #756048;
		background-color: transparent;
		border-radius: 20vw;
		-webkit-border-radius: 20vw;
		-moz-border-radius: 20vw;
		font-size: 3vw;
	}

	.info-body .link-group {
		width: 59%;
		border-left: 2px dotted #c2c2c2;
		padding: 0;
		padding-left: 3%;
		margin: 0;
		font-size: 0;
	}

	.info-body .link-group .li {
		position: relative;
		list-style: none;
		display: inline-block;
		width: 33%;
		font-size: 3.5vw;
		background-position: center top;
		background-repeat: no-repeat;
	}

	.info-body .link-group .li .a {
		display: block;
		width: 100%;
		color: #756048;
		padding-top: 40%;
	}

	.info-body .link-group .li .a:hover {
		text-decoration: none;
	}

	.info-body .link-group .li.deposit {
		background-image: url("../static/img/icon_deposit.png");
		background-size: 40%;
	}

	.info-body .link-group .li.withdraw {
		background-image: url("../static/img/icon_withdraw.png");
		background-size: 40%;
	}

	.info-body .link-group .li.promotion {
		background-image: url("../static/img/icon_promotion.png");
		background-size: 40%;
	}
</style>
