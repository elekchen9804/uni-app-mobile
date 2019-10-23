<!-- 使用者資訊 -->
<template>
	<view>
		<view>帳號: {{userId}}</view>
		<view>餘額: {{userBalance}}</view>
		<button class="refresh" @tap="openPopup">刷新</button>
		<uni-popup ref="popup" type="center">
			<view class="title">一鍵取回彈窗</view>
			<view>
				很多內容很多內容很多內容很多內容<br>
				很多內容很多內容很多內容很多內容<br>
				很多內容很多內容很多內容很多內容<br>
				很多內容很多內容很多內容很多內容<br>
				很多內容很多內容很多內容很多內容<br>
				很多內容很多內容很多內容很多內容<br>
				很多內容很多內容很多內容很多內容<br>
			</view>
			
			<button @click="closePopup">关闭弹出层</button>
		</uni-popup>
	</view>
</template>

<script>
	import {uniPopup} from '@dcloudio/uni-ui';
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
		computed: mapState(['userId', 'userBalance']),
		methods: {
			...mapMutations(['changeUserBalnce'])
		},
		created() {
			this.$api.getUserBalance().then(res => {
				// 获得数据 
				this.changeUserBalnce(res.Balance);
			}).catch(res => {
				// 失败进行的操作
				console.log('Fail: ', res)
			})
		},
		methods: {
			openPopup() {
				this.$refs.popup.open()
			},
			closePopup() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style>
.refresh {}
width:10upx;
</style>
