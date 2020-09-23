<template>
	<view class="pay">
		<view class="cu-bar bg-white solid-bottom solid-top">
			<view class="action text-black">{{art.l_matchname}}</view>
		</view>
		<view class="padding flex align-center bg-white text-red text-xl">
			<text class="text-price">{{art.l_charge}}</text>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">选择支付方式</view>
		</view>
		<view class="pay-radio">
			<radio-group @change="radioChange" class="block">
				<!-- #ifdef H5 -->
				<!--  v-if="!isWeixin" -->
				<!-- <label class="cu-form-group">
					<view class="title flex align-center">
						<image class="pay-logo margin-right-xs" src="https://zyjd-api.fblife.com/images/payment_alipay.png" mode=""></image>
						支付宝
					</view>
					<radio value="ali" />
				</label> -->
				<!-- #endif -->
				<label class="cu-form-group">
					<view class="title flex align-center">
						<image class="pay-logo margin-right-xs" src="https://zyjd-api.fblife.com/images/payment_wechat.png" mode=""></image>
						微信
					</view>
					<radio value="wx" checked="true"/>
				</label>
			</radio-group> 
		</view>
	
		<view class="pay-footer">
			<button class="pay-foot flex align-center justify-center cu-btn bg-red lg" @click="toPay">
				去支付 ¥{{ art.l_charge }}
			</button>
		</view>
	</view>
</template>

<script>
var that
import { getActivityDetail, getOrderInfo } from '@/utils/api.js'
import { miniPay, jsApipay } from '../../common/js/pay.js'

export default {
	data() {
		return {
			art: '',
			orderId: '',
			payStatus: 'wx',
			isWeixin: false,
			openid: uni.getStorageSync('openid'),
			isFrom: ''
		}
	},
	onLoad(option) {
		that = this
		that.orderId = option.id
		that.isFrom = option.from
		console.log(that.openid);
		let isWeixin = uni.getStorageSync('isWeixin')
		console.log(isWeixin);
		that.isWeixin = isWeixin
		let data = {
			order_id: option.id
		}
		that.getActivityDetail(data)
	},
	methods: {
		getActivityDetail(data){
			getActivityDetail(data).then(res => {
				console.log('getActivityDetail',res)
				let response = res.data
				if(response.rspInfo.rspCode == 1000){
					that.art = response.rspData
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		toPay(){
			let channel
			// #ifdef MP-WEIXIN
			channel = 'wx_mini'
			// #endif
			// #ifdef H5
			if(that.isWeixin){
				channel = 'wx_pub'
			} else {
				channel = that.payStatus == 'ali'?'alipay_wap':'wx_wap'
			}
			// #endif
			let data = {
				openid: that.openid,
				order_id: JSON.stringify([that.orderId]),
				channel: channel,
				charge: that.art.l_charge,
			};
			that.getOrderInfo(data)
		},
		getOrderInfo(data){
			console.log('getOrderInfo-data',data);
			getOrderInfo(data).then(res => {
				console.log('getOrderInfo',res)
				let response = res.data
				if(response.rspInfo.rspCode == 1000){
					let orderInfo = response.rspData
					// #ifdef MP-WEIXIN
					miniPay(that,orderInfo)
					console.log('MP-WEIXIN');
					// #endif
					// #ifdef H5
					console.log('H5');
					if(that.isWeixin){
						jsApipay(that,orderInfo)
					} else {
						if(data.channel == 'wx_wap'){
							window.location.href = orderInfo.mweb_url
						} else {
							console.log('alipay:',orderInfo.alipay);
							let routerData = this.$router.resolve({	//打开新页面，将form表单传过去，在新窗口打开。
								path: './apply',							
								query:{htmls: orderInfo.alipay}				
							});
							console.log(routerData);
							window.open(routerData.href,'_blank');
						}
					}
					// #endif
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		
		payResult(e){
			if(that.isFrom == 'order'){
				const pages = getCurrentPages(); // 当前页面
				const curPage = pages[pages.length - 1]; // 当前页面
				const beforePage = pages[pages.length - 2]; // 前一个页面
				console.log(beforePage);
				// #ifdef H5
				beforePage.isFirst = false
				// #endif
				// #ifdef MP-WEIXIN
				beforePage.$vm.isFirst = false
				// #endif
				uni.navigateBack()
				return
			}
			uni.redirectTo({
				url: '../order/order'
			})
			// if(e == 'success'){
			// 	uni.redirectTo({
			// 		url: '../inputorder2-pay-result/inputorder2-pay-result?id=' + that.orderid
			// 	})
			// } else {
			// 	uni.redirectTo({
			// 		url: '../order/order'
			// 	})
			// }
		},
		radioChange(e){
			console.log(e);
			that.payStatus = e.detail.value
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
}
</script>

<style lang="scss">
.pay{
	.pay-radio{
		.cu-form-group{
			.title{
				.pay-logo{
					width: 46rpx;
					height: 46rpx;
				}
			}
		}
	}
	.pay-footer{
		width: 100%;
		height: calc(100rpx + env(safe-area-inset-bottom) / 2);
		.pay-foot{
			position: fixed;
			bottom: 0;
			left: 0;
			border-radius: 0;
			width: 100%;
			height: 100rpx;
		}
	}
}
</style>
