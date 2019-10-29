<template>
	<view>
		<view class="div form-group">
			<input class="login_account" type="text" v-model="account" placeholder="帐号"></m-input>
			<!-- <span class="clear-btn" ng-click="loginParams.account = ''">x</span> -->
		</view>
		<view class="div form-group">
			<input class="login_password" type="password" v-model="password" placeholder="密码"></m-input>
			<!-- <span class="pw-hide-btn" ng-click="showLoginPassword = !showLoginPassword">
				<i class="fa fa-eye" aria-hidden="true" ng-show="showLoginPassword"></i>
				<i class="fa fa-eye-slash" aria-hidden="true" ng-show="!showLoginPassword"></i>
			</span> -->
		</view>
		<!-- <view class="div form-group form-links">
			<span class="remember-account-btn" ng-click="storeUserAccount = !storeUserAccount" ng-cloak>
				<i class="fa fa-circle-o" aria-hidden="true" ng-show="!storeUserAccount"></i>
				<i class="fa fa-check-circle" aria-hidden="true" ng-show="storeUserAccount"></i>
				記住帳號
			</span>
			<span class="forget-btn" ng-click="lineChatClick()">忘記密碼 ?</span>
		</view> -->
		<button @tap="bindLogin">登入</button>



		<!-- <view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view> -->
		<!-- <view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<text>|</text>
			<navigator url="../pwd/pwd">忘记密码</navigator>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import mInput from '../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		props: {
			backpage: {
				type: String,
				default: ''
			},
			backtype: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				userToken: '',
				positionTop: 0
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login', 'changeLogin']),
			bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				/**
				 * 下面简单模拟下服务端的处理
				 * 检测用户账号密码是否在已注册的用户列表中
				 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
				 */
				const data = {
					"Account": this.account,
					"Password": this.password
				};

				uni.showLoading({
					title: '加载中'
				});

				// 获得数据 
				this.$api.accountLogin(data).then(res => {
					// 寫入登入相關資料
					this.userToken = 'Bearer ' + res.Data.Token;
					this.changeLogin({
						Authorization: this.userToken
					});
					this.login(this.account);

					uni.hideLoading();

					//  三種轉跳情境 
					// uni.redirectTo for 一般 pages
					// uni.switchTab for other tabBar pages
					// uni.switchTab for main pages
					var redirectConfition = [{
							backtype: '1',
							action: 'redirectTo'
						},
						{
							backtype: '2',
							action: 'switchTab'
						},
						{
							backtype: '',
							action: ''
						}
					];

					for (let i = 0; i < redirectConfition.length; i++) {
						if (this.backtype == '') {
							uni.switchTab({
								url: '/pages/main/main'
							});
						}

						if (this.backtype == redirectConfition[i].backtype) {
							uni[redirectConfition[i].action]({
								url: this.backpage
							});
						}
					}

				}).catch(res => {
					// 失败进行的操作
					console.log('Fail: ', res)
				})
			}
		},
		onReady() {
		}
	}
</script>

<style>
	input {
		width: 55%;
		height: 11.5vw;
		margin: 0 auto 10px;
		padding-left: 18%;
		padding-right: 15%;
		padding-top: 0%;
		font-size: 3.5vw;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 20vw;
		-webkit-border-radius: 20vw;
		-moz-border-radius: 20vw;
		background-position: 9% center;
		background-repeat: no-repeat;
	}

	button {
		width: 86%;
		height: 11.5vw;
		margin: 0 auto 10px;
		padding-left: 18%;
		padding-right: 15%;
		padding-top: 6%;
		font-size: 3.5vw;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 20vw;
		-webkit-border-radius: 20vw;
		-moz-border-radius: 20vw;
		/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#fd1c31+2,ff1599+100 */
		background: #fd1c31;
		/* Old browsers */
		/* FF3.6-15 */
		/* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to right, #fd1c31 2%, #ff1599 100%);
		/* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fd1c31', endColorstr='#ff1599', GradientType=1);
		/* IE6-9 */
		color: #ffffff;
		padding: 0;
		font-size: 4.2vw;
		background-color: rgba(155, 155, 155, 0.7);
		margin-bottom: 25px;
		margin-top: 10px;
	}

	button.active {
		/* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a0683d+2,684023+100 */
		background: #a0683d;
		/* Old browsers */
		/* FF3.6-15 */
		/* Chrome10-25,Safari5.1-6 */
		background: linear-gradient(to right, #a0683d 2%, #684023 100%);
		/* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#a0683d', endColorstr='#684023', GradientType=1);
		/* IE6-9 */
		color: #ffffff;
	}

	.remember-account-btn {
		display: block;
	}

	.login_account {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/login/icon_account.png");
		background-size: 9%;
	}

	.login_password {
		background-image: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/login/icon_password.png");
		background-size: 9%;
	}

	.form-links .remember-account-btn {
		width: 48%;
		padding-left: 7%;
		display: inline-block;
		text-align: left;
		vertical-align: top;
	}

	.form-links .forget-btn {
		width: 48%;
		padding-right: 7%;
		display: inline-block;
		line-height: 8vw;
		text-align: right;
	}
</style>
