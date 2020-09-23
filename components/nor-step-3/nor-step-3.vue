<template>
	<view class="inputorder4">
		<view class="introduce-bg">
			<view class="intro-one">
				请仔细核对相关数据。
				<text class="huang">付款后，无法退款和修改。</text> 
			</view>
		</view>
		<view class="listone" v-for="(item, index) in costOrder.info" :key="index">
			<view class="price">
				{{item.price == '0'?'免费':'单价:￥' + item.price}}
			</view>
			<view class="one-cont">
				<view class="one-cont-top">{{item.num}}</view>
				<view class="one-cont-middle">
					<view class="middle-text">{{item.name}}</view>
				</view>
			</view>
			<view class="allprice">{{'总计 ¥' + item.charge}}</view>
		</view>
		<!-- <view class="zongprice">
			<view class="zongin">
				<view class="price-icon">合计：¥</view>
				<view class="num">{{costOrder.free}}</view>
			</view>
		</view> -->
		<view class="duty-bg">
			<view class="duty-title">免责声明:（点击下面提交按钮将代表同意下方声明）</view>
			<view class="duty-cont">
				<image class="duty-icon" src="https://enroll-api.activitysign.com/3/images/inputorder2/chenggong.png" mode=""></image>
				<view class="contin">本人已阅读越野e族《2020阿拉善英雄会免责协议》并自愿参加越野e族英雄会，对本人或将有较大的 人身财产第三方赔偿等风险非常清楚并认可</view>
			</view>
		</view>
		<view class="step-bottom">
			<view class="sub-left flex-sub flex align-center justify-between">
				<view class="left-num">{{'¥ ' + costOrder.free}}</view>
				<view class="left-but text-df" @click="showMask('open')">明细 <text class="cuIcon-right"></text></view>
			</view>
			<view class="sub-but flex flex-direction align-center justify-center" @click="saveOrders">
				<view class="sub-text text-white">立即支付</view>
				<view class="sub-exrt text-white">支付成功后，不能退款</view>
			</view>
		</view>
		<view class="p-mask" :class="maskShow?'maskAnimate':''">
			<view class="p-mask-container">
				<view class="p-mask-title">费用明细</view>
				<view class="p-mask-content">
					<view class="p-mask-list" v-for="(item, index) in costOrder.info" :key="item.name">
						<view class="">
							{{item.name}}
						</view>
						<view class="">
							{{'￥' + item.price + ' × ' + item.num}}
						</view>
					</view>
				</view>
				<view class="p-mask-bot">
					<view class="">实付款</view>
					<view class="" style="color: #ff0000;">{{'¥ ' + costOrder.free}}</view>
				</view>
				<view class="p-mask-close">
					<text class="cuIcon-close" @click="showMask('close')"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
var that
import { costOrders, saveOrders } from '@/utils/api.js';
export default {
	data() {
		return {
			mid:'',
			l_uid: '',
			costOrder: '',
			maskShow: false,
			requestData: '',
			orderId: ''
		};
	},
	mounted(e) {
		that = this
		let costData = uni.getStorageSync('costData')
		let requestData = uni.getStorageSync('requestData')
		if(!!requestData){
			that.requestData = requestData	
		}
		if(!!costData){
			that.costOrder = costData	
		} else {
			if(!!requestData){
				that.costOrders(requestData)
			} else {
				let groupInfo = uni.getStorageSync('groupInfo')
				let carInfo = uni.getStorageSync('carInfo')
				let formData = uni.getStorageSync('formData')
				groupInfo.car_info = carInfo
				let data = {
					group_id: formData.group_id,
					mid: that.$route.query.mid,
					l_uid: uni.getStorageSync('midUid'),
					insuranceinfo: JSON.stringify(uni.getStorageSync('insuranceinfo')),
					info: JSON.stringify(uni.getStorageSync('giftBag')),
					entry_info: JSON.stringify([groupInfo])
				}
				that.requestData = data
				uni.setStorageSync('requestData',requestData)
				that.costOrders(data)
			}
		}
	},
	methods: {
		backroute(e){
			console.log('backRoute');
			uni.navigateBack()
		},
		costOrders(data){//提交订单
			console.log('costOrders:',data);
			costOrders(data).then(res => {
				console.log('costOrders', res);
				let response = res.data
				if (response.rspInfo.rspCode == 1000) {
					that.costOrder = response.rspData
					
				}else{
					that.showToast(response.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
			
		},
		saveOrders(){//
			let data = that.requestData
			saveOrders(data).then(res => {
				console.log('saveOrders', res);
				let response = res.data
				if (response.rspInfo.rspCode == 1000) {
					that.orderId = response.rspData.data
					uni.redirectTo({
						url: '../pay/pay?id=' + response.rspData.data
					})
				}else{
					that.showToast(response.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
			
		},
		toPay(e){
			
		},
		showMask(e){
			console.log(e);
			if(e == 'open'){
				this.maskShow = true
			} else {
				this.maskShow = false
			}
		},
		showToast(e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true,
				duration: 2000
			})
		},
	}
};
</script>

<style lang="scss">
.inputorder4 {
	.introduce-bg {
		font-size: 20rpx;
		color: #757575;
		line-height: 32rpx;
		.intro-one {
			margin-bottom: 20rpx;
			.huang {
				color: #001B00;
			}
		}
	}
	.listone {
		display: flex;
		font-size: 24rpx;
		padding: 30rpx 0;
		border-bottom: 1px solid #e6e6e6;
		color: #606060;
		align-items: center;
		justify-content: space-between;
		.price {
			width: 160rpx;
			text-align: left;
		}
		.one-cont {
			flex: 1;
			text-align: center;
			.one-cont-top {
				font-size: 64rpx;
				color: #000;
			}
			.one-cont-middle {
				display: flex;
				align-items: center;
				justify-content: center;
				line-height: 48rpx;
				width: 100%;
				.middle-text {
					font-size: 36rpx;
					color: #333;
					width: auto;
					// width: 148rpx;
					// text-align: right;
				}
				.middle-modify {
					// display: inline-block;
					margin-left: 20rpx;
					width: 32rpx;
					height: 32rpx;
				}
			}
			.bottom-click {
				font-size: 16rpx;
				color: #959595;
			}
		}
		.allprice {
			width: 160rpx;
			text-align: right;
		}
	}
	
	.duty-bg {
		.duty-title {
			font-size: 24rpx;
			color: #353535;
			line-height: 32rpx;
			padding: 20rpx 0;
		}
		.duty-cont {
			display: flex;
			.duty-icon {
				width: 30rpx;
				height: 30rpx;
				margin: 6rpx 10rpx 0 0;
			}
			.contin {
				flex: 1;
				font-size: 24rpx;
				color: #868686;
				line-height: 34rpx;
			}
		}
	}
	.step-bottom{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		background-color: #f4f4f4;
		height: calc(120rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		.sub-left{
			padding: 0 21px 0 26px;
			.left-num{
				font-size: 40rpx;
				// line-height: 60px;
				color: #616161;
			}
			
		}
		.sub-but{
			width: 280rpx;
			height: 120rpx;
			text-align: center;
			background: #EA5A5C;
			view{
				line-height: 1.3;
			}
			.sub-text{
				font-size: 40rpx;
			}
			.sub-exrt{
				font-size: 16rpx;
			}
		}
	}
	.p-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.9);
		z-index: 9999;
		color: #fff;
		transition: all 0.2s linear;
		transform: translateY(100vh);
		display: flex;
		flex-direction: column;
		justify-content: center;
		.p-mask-container{
			padding: 30rpx;
			font-size: 28rpx;
			width: 100%;
			padding-bottom: 100rpx;
			box-sizing: border-box;
			.p-mask-content{
				padding: 30rpx 0;
				margin: 30rpx 0;
				border-top: 1rpx solid #fff;
				border-bottom: 1rpx solid #fff;
				.p-mask-list{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 0;
				}
			}
			.p-mask-bot{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.p-mask-close{
				position: fixed;
				left: 50%;
				bottom: 150rpx;
				width: 80rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1rpx solid #fff;
				border-radius: 100%;
				font-size: 40rpx;
				transform: translateX(-40rpx);
			}
		}
	}
	.p-mask.maskAnimate{
		transform: translateY(0);
	}
	.maskAnimate{
		animation: myMask 0.5s 1;
		animation-timing-function: ease;
		animation-fill-mode: forwards;
	}
	
	@keyframes myMask {
		from {
			bottom: 100vh;
		}
	
		to {
			bottom: 0;
		}
	}
}
</style>
