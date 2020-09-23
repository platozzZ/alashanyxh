<template>
	<view class="sd">
		<image src="https://zyjd-api.fblife.com/3/img/logobj.png" class="bg"></image>
		<!-- #ifdef MP-WEIXIN -->
		<view class="match-status" :style="{height: customBar + 'px'}">
			<view class="match-status-fixed" :style="{height: customBar + 'px'}"></view>
		</view>
		<!-- #endif -->
		<view class="container padding-lr flex flex-direction align-center">
			<image src="https://zyjd-api.fblife.com/3/img/logotop.png" class="sd-logo margin-bottom-xl"></image>
			<view class="sd-notice" @click="showMask('open')">
				[ 报名须知 ]
			</view>
			<view class="sd-list">
				<view 
					class="sd-item flex align-center flex-direction justify-center margin-top padding-sm text-white text-cut" 
					v-for="(item,index) in list" 
					:key="index"
					@click="_navigateTo(item.route,item.mid)"
				>
					<view class="title text-xxl text-lh13">
						{{item.title}}
					</view>
					<view class="info text-sm text-lh13">
						{{item.info}}
					</view>
				</view>
			</view>
		</view>
		<view class="p-mask" :class="maskShow?'maskAnimate':''">
			<view class="p-mask-container">
				<view class="p-mask-title p-flex p-align-center p-justify-center">报名须知</view>
				<view class="p-mask-content">
					<rich-text :nodes="data.notice"></rich-text>
				</view>
				<view class="p-mask-close">
					<text class="cuIcon-close" @click="showMask('close')"></text>
				</view>
			</view>
		</view>
		<!-- <view class="cu-tabbar-height"></view> -->
		<sd-tabbar curPage="enroll" :isEnroll="true"></sd-tabbar>
	</view>
</template>

<script>
import { getNotice } from '@/utils/api.js';
var that
export default {
	data() {
		return {
			data: '',
			list: [
				{title: '会员报名',info: '阿拉善英雄会会员观光报名，有营地留宿',route: '../enroll/enrollStepMatch',mid: '278'},
				{title: '普通观光报名',info: '阿拉善英雄会普通观光报名，无需进入营地驻扎',route: '../enroll/enrollNor',mid: '277'},
				{title: '赛事报名',info: 'T3接力赛、牧马人攀岩赛',route: '../enroll/enroll'},
				{title: '团体报名',info: '越野e族大队/版主/领主批量报名',route: '../enroll/enrollWord'},
			],
			maskShow: false,
			customBar: this.CustomBar
		}
	},
	mounted(e) {
		that = this
		that.getNotice()
	},
	onShow() {
		console.log('onShow');
		// this.getindex()
		uni.removeStorageSync('carInfo')
		uni.removeStorageSync('formData')
	},
	methods: {
		_navigateTo(url,id){
			let userInfo = uni.getStorageSync('userInfo')
			let token = uni.getStorageSync('token')
			let phone = uni.getStorageSync('phone')
			if(!userInfo || !token || !phone){
				uni.navigateTo({
					url: '../login/login'
				})
				return
			}
			console.log(url);
			console.log(!id);
			if(!id){
				uni.navigateTo({
					url: url
				})
				return
			}
			uni.navigateTo({
				url: url + '?mid=' + id
			})
			
		},
		getNotice(){
			getNotice().then(res => {
				console.log('getNotice', res);
				let art = res.data
				if(art.rspInfo.rspCode == '1000'){
					that.data = art.rspData
				} else {
					that.showToast(art.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		showMask(e,v){
			console.log(e);
			if(e == 'open'){
				this.maskShow = true
				this.maskCon = v
			} else {
				this.maskShow = false
				this.maskCon = ''
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
}
</script>

<style lang="scss">
	
page,body{
	width: 100%;
	height: 100vh;
}
.sd{
	.bg{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.match-status{
		width: 100%;
		.match-status-fixed{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
		}
	}
	.container{
		padding: 60rpx 0;
		.sd-logo{
			width: 444rpx;
			height: 470rpx;
		}
		.sd-notice{
			font-size: 36rpx;
			color: #F6FBFC;
		}
	}
	.sd-list{
		.sd-item{
			width: 560rpx;
			height: 120rpx;
			background: rgba(255,255,255,0.40);
			border-radius: 4px;
		}
	}
	.p-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.8);
		z-index: 9999;
		color: #fff;
		transition: all 0.2s linear;
		transform: translateY(100vh);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		&.maskAnimate{
			transform: translateY(0);
		}
		.p-mask-container{
			padding: 80rpx 50rpx 60rpx;
			font-size: 28rpx;
			width: 100%;
			position: relative;
			top: 70rpx;
			left: 0;
			height: calc(100% - 300rpx);
			overflow-y: auto;
			padding-bottom: 30rpx;
			box-sizing: border-box;
			.p-mask-title{
				font-size: 36rpx;
			}
			.p-mask-content{
				padding: 30rpx 0;
				margin: 30rpx 0;
				color: #fff;
			}
			.p-mask-list{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx 0;
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
