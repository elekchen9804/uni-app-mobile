<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					 :duration="duration">
						<swiper-item v-for="(item,index) in slideImgs" :key="index">
							<view class="swiper-item">
								<image :src="cdn2Url + item.Url" mode="widthFix"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				slideImgs: [],
				cdn2Url: this.$config.cdn2Url,
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500
			};
		},
		computed: {

		},
		created() {
			this.$api.getSlideShow().then(res => {
				this.slideImgs = res.Data.length === 0 ? this.slideImgs : res.Data;
			}).catch(res => {
				console.log('Fail: ', res)
			})
		},
		methods: {}
	}
</script>

<style>
	.swiper {
		height: 110px;
	}

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
</style>
