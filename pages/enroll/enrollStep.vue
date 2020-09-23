<template>
	<view class="inputorder2">
		<view class="bg"></view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="match-status" :style="{height: customBar + 'px'}">
			<view class="match-status-fixed" :style="{height: customBar + 'px'}"></view>
		</view>
		<!-- #endif -->
		<view class="p-top-bg">
			<image :src="matchInfo.bj_logo"></image>
			<!-- <image src="https://rdata-image.fblife.com/public/20200731/584403_o_1eeicgcil11j912m7ji6112v187q10.jpg" mode="widthFix"></image> -->
		</view>
		<view class="cont" v-if="showContainer">
			<view class="steps-bg">
				<view  v-for="(item,index) in stepItems" :key="item.name"  :class="{'stepone':true,'steponecur':index==current}">
					<view class="stepone-top">
						{{index+1}}
						<image v-if="index<current" class="right" src="https://enroll-api.activitysign.com/3/images/right.png" mode=""></image>
					</view>
					<view class="stepone-text">{{item.name}}</view>
				</view>
			</view>
			<self-inputorder2-1 @steptap="steptap" @backroute="backroute" v-if="current==0"></self-inputorder2-1>
			<self-inputorder2-2 @steptap="steptap" v-if="current==1"></self-inputorder2-2>
			<self-inputorder2-3 @steptap="steptap" v-if="current==2"></self-inputorder2-3>
			<self-inputorder2-4 @steptap="steptap" v-if="current==3"></self-inputorder2-4>
			
		</view>
	</view>
</template>

<script>
var that
import { getEnrollInfo } from '@/utils/api.js';
export default {
	data() {
		return {
			current: 0,
			matchInfo: '',
			stepItems:[
				{ 
					name:'添加领队',
				},{
					name:'添加车辆',
				},{
					name:'选择礼包',
				},{
					name:'支付付款',
				},
			],
			mid:'',
			l_uid: '',
			cars: [],
			maskShow: false,
			customBar: this.CustomBar,
			showContainer: false
		};
	},
	onLoad(e) {
		that = this
// console.log(getApp().globalData);
		that.mid = e.mid;
		let data = {
			mid: e.mid
		}
		that.getEnrollInfo(data)
	},
	methods: {
		getEnrollInfo(data){
			getEnrollInfo(data).then(res => {
				console.log('getEnrollInfo',res.data)
				let response = res.data 
				if(res.data.rspInfo.rspCode == 1000){
					that.matchInfo = response.rspData
					that.showContainer = true
					uni.setStorageSync('matchInfoLogo',response.rspData.bj_logo)
					uni.setStorageSync('groupList',response.rspData.match_group)
					uni.setStorageSync('matchSetting',response.rspData.match_setting)
					uni.setStorageSync('matchInsurance',response.rspData.match_insurance)
					
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		backroute(e){
			console.log('backRoute');
			uni.navigateBack()
		},
		steptap(e){
			console.log(e)
			this.current = e;
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
.inputorder2{
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(225deg, #D92C4E 0%, #FF776D 51%, #A457CD 100%);
		z-index: -1;
	}
	width: 100%;
	display: flex;
	flex-direction: column;
	.match-status{
		width: 100%;
		.match-status-fixed{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			// background-image: linear-gradient(225deg, #D92C4E 0%, #FF776D 51%, #A457CD 100%);
		}
	}
	.p-top-bg{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		// height: 320rpx;
		image{
			width: 114rpx;
			height: 114rpx;
			// #ifdef MP-WEIXIN
			margin: 20rpx 0 60rpx;
			//  #endif
			// #ifndef MP-WEIXIN
			margin: 60rpx 0;
			//  #endif
		}
	}
	.cont {
		flex: 1;
		width: calc(100% - 60upx);
		// min-height: 80vh;
		padding: 44rpx 60rpx 150rpx;
		margin: 0 auto;
		position: relative;
		border-radius: 66rpx 66rpx 0 0;
		z-index: 99;
		background-color: #fff;
		.steps-bg {
			display: flex;
			justify-content: space-between;
			padding-bottom: 30rpx;
			.stepone {
				width: 100rpx;
				font-size: 22rpx;
				color: #c4c4c4;
				.stepone-top {
					width: 88rpx;
					position: relative;
					height: 88rpx;
					border-radius: 50%;
					background-color: #ececec;
					font-size: 48rpx;
					color: #fff;
					text-align: center;
					margin-bottom: 18rpx;
					line-height: 88rpx;
					font-weight: 600;
					.right {
						position: absolute;
						width: 48rpx;
						height: 34rpx;
						left: 50%;
						top: 50%;
						transform: translate(-50%,-50%);
					}
				}
				.stepone-text {
					font-size: 22rpx;
				}
			}
			.steponecur {
				.stepone-top {
					background-color: #616161;
				}
				.stepone-text {
					color: #616161;
				}
			}
			.heng {
				line-height: 88rpx;
				color: #ececec;
			}
		}
	
	}
	
}
</style>
