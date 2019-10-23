<template>
	<view>
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					 :duration="duration">
						<swiper-item v-for="(item,index) in slideImgs" :key="index">
							<view class="swiper-item">
								<image :src="item.Url" mode="widthFix"></image>
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
				slideImgs: [{
						"Id": 1233,
						"Sort": 0,
						"Link": null,
						"Url": "https://cdn2.0a0s.com/Web.Portal/AN005/Upload/SlideShow/cc0c33dc6e884e079d97af3a6964f34a.jpg",
					},
					{
						"Id": 1234,
						"Sort": 1,
						"Link": null,
						"Url": "https://cdn2.0a0s.com/Web.Portal/AN005/Upload/SlideShow/c9152303e1df49bdb3e4035e613611ff.jpg"
					},
					{
						"Id": 1235,
						"Sort": 2,
						"Link": null,
						"Url": "https://cdn2.0a0s.com/Web.Portal/AN005/Upload/SlideShow/5596aea175174f4abfe85182dc6469e7.jpg"
					},
				],
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500
			};
		},
		created() {
			// this.$api.getSlideShow().then(res => {
			// 	this.slideImgs = res.Data.length === 0 ? this.slideImgs : res.Data;
			// }).catch(res => {
			// 	console.log('Fail: ', res)
			// })
		},
		methods: {}
	}
</script>

<style>
	.swiper{
		height:110px;
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
