<template>
	<view>
		<view class="switch-wrapper" :class="{'isRegisterView':isRegisterView}">
			<view class="div account-box login-page">
				<view class="form">
					<!-- 導頁資訊傳入 login 組件 -->
					<login :backpage="backpage" :backtype="backtype"></login>
					<view class="back-link" @tap="toHome">先去逛逛</view>
				</view>
				<view class="div to-register switch-btn" @tap="switchTab">
					<view class="span">注册新用户</view>
				</view>
			</view>
			<view class="div reg-box">
				<view class="div to-login switch-btn" @tap="switchTab">
					<view class="span">返回登录</view>
				</view>
				<view class="form">
					<register></register>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<!-- <view id="bg-video">
			<video src="../../static/video/bg.mp4" muted="true" :controls="false" objectFit="fill" autoplay="ture" loop="true"></video>
		</view> -->
		<!-- #endif -->
	</view>
</template>

<script>
	import login from '../../components/login.vue'
	import register from '../../components/register.vue'

	export default {
		components: {
			login,
			register
		},
		data() {
			return {
				isRegisterView: false,
				backpage: '',
				backtype: ''
			}
		},
		onLoad(e) {
			// 接收轉跳的導頁資訊與類型
			this.backpage = e.backpage;
			this.backtype = e.backtype;
		},
		methods: {
			switchTab() {
				this.isRegisterView = !this.isRegisterView;
			},
			toHome() {
				uni.switchTab({
				    url: '/pages/main/main'
				});
			}
		}
	}
</script>

<style>
	page {
		background: url('../../static/img/login_bg.jpg') no-repeat center top;
		background-size: cover;
	}

	/* 背景影片 */
	#bg-video {
		position: fixed;
		z-index: 0;
		top: 0;
		left: 0;
		right: 0;
		width: auto;
		height: 100%;
		opacity: 0.4;
	}

	#bg-video video {
		display: block;
		width: auto;
		height: 100%;
	}

	.switch-wrapper {
		position: relative;
		width: 92%;
		height: 62vh;
		margin: 0 auto;
		padding-top: 20%;
		overflow: hidden;
		color: #ffffff;
	}

	.switch-wrapper input:-webkit-autofill,
	.switch-wrapper input:-webkit-autofill:hover,
	.switch-wrapper input:-webkit-autofill:focus,
	.switch-wrapper input:-webkit-autofill:active {
		-webkit-box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0.6) inset !important;
		/*淡淡的白*/
		transition: background-color 5000s ease-in-out 0s !important;
		/*透明*/
		-webkit-text-fill-color: #fff !important;
		/*字體顏色*/
	}

	.switch-wrapper a {
		color: #ffffff;
		text-align: center;
		width: 100%;
	}

	.switch-wrapper::before {
		position: fixed;
		content: "";
		display: block;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		z-index: -1;
		background: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/login_bg.jpg");
		background-size: 100% 100%;
		background-position: center top;
	}

	.switch-wrapper.isRegisterView .account-box {
		transform: translate3d(-100%, 0, 0);
	}

	.switch-wrapper.isRegisterView .reg-box {
		transform: translate3d(0, 0, 0);
	}

	.switch-wrapper .form-control {
		border-color: transparent;
		outline: 0;
		box-shadow: none;
	}

	.switch-wrapper .form-control:focus {
		border-color: transparent;
		outline: 0;
		box-shadow: none;
	}

	.switch-wrapper>.div {
		display: inline-block;
		vertical-align: top;
		width: 100%;
		height: 100%;
		font-size: 0;
		border-radius: 4px;
	}

	.switch-wrapper>.div>view {
		height: 100%;
	}

	.switch-wrapper>.div>.form {
		display: inline-block;
		vertical-align: top;
		width: 85%;
		margin: 0;
		padding: 0 0 5vh 0;
		font-size: 3.8vw;
		overflow-y: auto;
	}

	.switch-wrapper>.div>.form:before {
		width: 100%;
		height: 12vh;
		line-height: 12vh;
		display: block;
		content: "登录";
		color: #ffffff;
		font-size: 5vw;
		text-align: center;
	}

	.switch-wrapper>.reg-box.div>.form:before {
		content: "注册";
	}

	.switch-wrapper>.div>.form .form-group {
		position: relative;
		margin: 0;
	}

	.switch-wrapper>.div>.form .form-group:active .span.clear-btn,
	.switch-wrapper>.div>.form .form-group:focus .span.clear-btn {
		display: block;
	}

	.switch-wrapper>.div>.form input::-webkit-input-placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input:-ms-input-placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input::-ms-input-placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input::-webkit-input-placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input:-ms-input-placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input::placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input::-webkit-input-placeholder {
		color: transparent;
	}

	.switch-wrapper>.div>.form input+.span {
		position: absolute;
		width: 10%;
		right: 12%;
		top: 0;
		height: 11vw;
		line-height: 11vw;
		font-size: 4.5vw;
		opacity: 0.5;
		z-index: 2;
		text-align: center;
		display: none;
	}

	.switch-wrapper>.div>.form label {
		position: absolute;
		left: 25%;
		height: 100%;
		line-height: 11vw;
		font-weight: normal;
		font-size: 3.5vw;
		z-index: 99;
		width: 60%;
		text-align: left;
	}

	.switch-wrapper>.div>.form label.active {
		top: 1.5vw;
		opacity: 0.5;
		height: auto;
		line-height: normal;
	}

	.switch-wrapper>.div>.form .span i {
		font-size: 4vw;
	}

	.switch-wrapper>.div>.form .span i.ng-hide {
		display: none;
	}

	.switch-wrapper>.div>.form .span.pw-hide-btn {
		display: block;
	}

	.switch-wrapper .switch-btn {
		display: inline-block;
		vertical-align: top;
		color: #ffffff;
		width: 7%;
		padding: 5% 4%;
		font-size: 4.2vw;
		padding-top: 15vh;
		height: 80%;
		text-align: center;
	}

	.switch-wrapper .account-box {
		position: relative;
		z-index: 1;
		padding: 0;
		transition: transform 300ms ease;
		transform: translate3d(0, 0, 0);
	}

	.switch-wrapper .account-box i {
		font-size: 4vw;
	}

	.switch-wrapper .account-box>.form {
		margin: 0;
		border-radius: 12px 0 12px 12px;
		background-color: rgba(255, 255, 255, 0.3);
	}


	.switch-wrapper .account-box .to-register::before {
		content: "";
		display: inline-block;
		width: 100%;
		padding-bottom: 100%;
		background: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/login/icon_register.png") no-repeat;
		background-size: 100%;
	}

	.switch-wrapper .account-box>.switch-btn {
		border-radius: 0 12px 12px 0;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.switch-wrapper .account-box .back-link {
		color: #fff;
		text-align: center;
		width: 100%;
	}

	.switch-wrapper .reg-box {
		width: 100%;
		margin-top: -62vh;
		transition: transform 300ms ease;
		transform: translate3d(100%, 0, 0);
	}

	.switch-wrapper .reg-box .scroll-arrow {
		position: absolute;
		text-align: center;
		left: 5%;
		bottom: 3%;
		font-size: 15px;
		line-height: 30px;
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 50px;
		color: #ffffff;
		background-color: rgba(158, 158, 158, 0.7);
		opacity: 0.6;
		animation: jump 0.5s infinite alternate ease;
	}

	.switch-wrapper .reg-box .scroll-arrow::before {
		content: "v";
	}

	.switch-wrapper .reg-box .switch-content {
		display: inline-block;
		vertical-align: top;
		width: 85%;
		margin: 0;
		padding: 0 0 5vh 0;
		font-size: 3.8vw;
		overflow-y: auto;
		border-radius: 0 12px 12px 12px;
		background-color: rgba(0, 0, 0, 0.4);
		-webkit-overflow-scrolling: touch;
	}

	.switch-wrapper .reg-box #ui-datepicker-div {
		z-index: 99;
	}

	.switch-wrapper .reg-box form {
		border-radius: 0 12px 12px 12px;
	}

	.switch-wrapper .reg-box form:before {
		width: 100%;
		height: 12vh;
		line-height: 12vh;
		display: block;
		content: "注册";
		color: #fff;
		font-size: 5vw;
		text-align: center;
	}

	.switch-wrapper .reg-box form .form-group {
		margin: 0;
	}

	.switch-wrapper .reg-box form .form-group input {
		margin: 0 auto 10px;
		background-position: 9% center;
		background-repeat: no-repeat;
		background-color: rgba(255, 255, 255, 0.3);
	}

	.switch-wrapper .reg-box form .form-group .control-div {
		position: relative;
	}

	.switch-wrapper .reg-box form .form-group .agreement {
		padding: 0;
		margin-top: -15px;
	}

	.switch-wrapper .reg-box form .form-group.sex {
		padding: 10px 0 15px;
	}

	.switch-wrapper .reg-box form .form-group.sex>label {
		position: relative;
		left: 10%;
		width: auto;
		line-height: normal;
		display: inline-block;
	}

	.switch-wrapper .reg-box form .form-group.sex>.control-div {
		display: inline-block;
	}

	.switch-wrapper .reg-box form .form-group.sex>.control-div>label {
		top: auto;
		position: relative;
		width: auto;
		line-height: normal;
	}

	.switch-wrapper .reg-box form .form-group.sex>.control-div>label input {
		position: relative;
		width: 15px;
		height: auto;
		margin: 0;
		padding: 0;
		margin-right: 8px;
		vertical-align: middle;
	}

	.switch-wrapper .reg-box form .form-group .agreement label {
		position: relative;
		width: 85%;
		margin-left: -15%;
		margin-right: 0;
		padding: 10px 0 15px;
		display: inline-block;
		height: auto;
	}

	.switch-wrapper .reg-box form .form-group .agreement input {
		width: 15px;
		height: 15px;
		margin: 0;
		padding: 0;
		padding-left: 0;
		vertical-align: middle;
	}

	.switch-wrapper .reg-box form .form-group .agreement a {
		color: #f9eb05;
		width: auto;
	}

	.switch-wrapper .reg-box form .description {
		position: relative;
		font-size: 3.2vw;
		width: 70%;
		left: 0;
		right: 0;
		margin: -5px auto 5px auto;
	}

	.switch-wrapper .reg-box form .captcha {
		position: relative;
	}

	.switch-wrapper .reg-box form .captcha input {
		color: #ffffff;
	}

	.switch-wrapper .reg-box form .captcha img {
		position: absolute;
		top: 30%;
		right: 12%;
	}

	.switch-wrapper .reg-box form .captcha #get-captcha {
		position: absolute;
		top: 0;
		left: 0;
	}

	.switch-wrapper .reg-box form .captcha #get-captcha i {
		display: none;
	}

	.switch-wrapper .reg-box .to-login::before {
		content: "";
		display: inline-block;
		width: 100%;
		padding-bottom: 100%;
		background: url("https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/login/icon_login.png") no-repeat;
		background-size: 105%;
	}

	.switch-wrapper .reg-box>.switch-btn {
		border-radius: 12px 0 0 12px;
		background-color: rgba(255, 255, 255, 0.2);
	}
</style>
