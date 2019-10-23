<template>
	<view>
		<view class="div form-group withdrawal-password">
			<input type="text" v-model="account" placeholder="推荐人"></m-input>
		</view>
		<view class="div form-group withdrawal-password">
			<input type="password" placeholder="会员帐号"></m-input>
		</view>
		<view class="div form-group withdrawal-password">
			<input type="password" placeholder="会员密码"></m-input>
		</view>
		<view class="div form-group withdrawal-password">
			<input type="password" placeholder="确认密码"></m-input>
		</view>
		<view class="div form-group withdrawal-password">
			<input type="password" placeholder="取款密码"></m-input>
		</view>
		<view class="div form-group withdrawal-password">
			<input type="password" placeholder="手机号码"></m-input>
		</view>
		<view class="div form-group withdrawal-password">
			<input type="password" placeholder="会员密码"></m-input>
		</view>
		<button>立即注册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.form {
		width: 100%;
		background: transparent;
	}

	.form .has-account {
		display: none;
	}

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

	.form-group.withdrawal-password input {
		background-image: url('https://cdn1.0a0s.com/Web.Mobile/_Common/Content/Views/CustomStyleVersion/images/V3/Home/login/icon_password.png');
		background-size: 7%;
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
</style>
