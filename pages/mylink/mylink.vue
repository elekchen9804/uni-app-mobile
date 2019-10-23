<template>
	<view>
		<view class="btn-row">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin'])
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				uni.navigateTo({
					url: '../login/login',
				});
			},
			bindLogout() {
				this.logout();
				/**
				 * 如果需要强制登录跳转回登录页面
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../login/login',
					});
				}
			}
		}
	}
</script>

<style>
	button {
		width: 80%;
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
