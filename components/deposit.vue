<template>
	<view>
		<view class="list">
			<view class="li transaction">
				<view class="a">交易记录</view>
			</view>
			<view class="li onlineWithdrawal">
				<view class="a">线上取款</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		created() {

		},
		methods: {}
	}
</script>

<style>
	.list {
		margin: 0;
		padding: 0 0 4% 0;
		text-align: left;
		font-size: 0;
		width: 100%;
	}

	.list .li {
		background-color: rgba(255, 255, 255, .95);
		border-radius: 2vw;
		box-shadow: 1px 0 10px rgba(85, 85, 85, .1);
		-webkit-box-shadow: 1px 0 10px rgba(85, 85, 85, .1);
		-moz-box-shadow: 1px 0 10px rgba(85, 85, 85, .1);
		display: inline-block;
		width: 30.3333%;
		margin: 1.5%;
		list-style: none;
		margin-bottom: 4%;
		padding: 2%;
		text-align: center;
		height: auto;
		background-image: none;
	}

	.list .li .a {
		color: #756048;
		display: block;
		font-size: 3vw;
		width: 100%;
		height: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0;
	}
	.list .li .a:before {
	    display: block;
	    content: "";
	    background-position: center center;
	    background-repeat: no-repeat;
	    width: 100%;
	    padding-bottom: 60%;
	}
	
	.list .li.transaction .a:before {
	    background-image: url('https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/Financial/icon1/transaction.png');
	    background-size: 60%;
	}
	
	.list .li.onlineWithdrawal .a:before {
	    background-image: url('https://cdn1.0a0s.com/Web.Mobile/_Common/Content/images/Financial/icon1/Online_Withdrawal.png');
	    background-size: 60%;
	}
</style>
