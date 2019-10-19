<template>
	<view class="content">
		<view class="form-wrapper">
			<login></login>
			<register></register>
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

			}
		}
	}
</script>

<style>
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

	.form-wrapper {
		position: relative;
		z-index: 1;
	}
</style>
