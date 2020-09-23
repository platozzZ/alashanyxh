<template>
	<view class="my">
		<view class="container">
			<view class="head bg-white flex align-center justify-center margin-lr" v-if="!userInfo">
				<view class="head-con flex flex-direction align-center padding-tb-sm" @click="_navigateTo('../login/login')">
					<image src="https://enroll-api.activitysign.com/3/img/avatar.png" class="head-avatar"></image>
					<view class="text-lg text-black margin-top-xs">去登陆</view>
				</view>
			</view>
			<view class="head bg-white flex flex-direction padding-tb-sm  margin-lr" v-else>
				<view class="head-content flex align-end">
					<image :src="userInfo.avatar" class="avatar margin-left margin-right-sm"></image>
					
					<!-- <avatar
						selWidth="200rpx" selHeight="200rpx" @upload="myUpload" :avatarSrc="userInfo.avatar"
						avatarStyle="width: 120rpx; height: 120rpx; border-radius: 10rpx;" class="avatar margin-left margin-right-sm">
					</avatar> -->
					<view class="text-xl text-black">{{userInfo.phone}}</view>
				</view>
				<view class="info flex align-center justify-between margin-top" v-if="!!userData">
					<view class="flex-sub item flex flex-direction align-center">
						<view class="text-xl text-black">{{userData.count}}</view>
						<view class="text-sm text-gray margin-top-xs">圈子</view>
					</view>
					<view class="flex-sub item flex flex-direction align-center">
						<view class="text-xl text-black">{{userData.comment}}</view>
						<view class="text-sm text-gray margin-top-xs">回复</view>
					</view>
					<view class="flex-sub item flex flex-direction align-center">
						<view class="text-xl text-black">{{userData.follow}}</view>
						<view class="text-sm text-gray margin-top-xs">关注</view>
					</view>
					<view class="flex-sub item flex flex-direction align-center">
						<view class="text-xl text-black">{{userData.fans}}</view>
						<view class="text-sm text-gray margin-top-xs">粉丝</view>
					</view>
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu margin-top-xl">
				<view class="cu-item arrow" @click="_navigateTo('../order/order')">
					<view class="content">
						<text class="text-kartBlack">活动订单</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="_navigateTo('../mall/mall')">
					<view class="content">
						<text class="text-kartBlack">商城管理</text>
					</view>
				</view>
				<view class="cu-item arrow" @click="_navigateTo('./mySetting')">
					<view class="content">
						<text class="text-kartBlack">系统设置</text>
					</view>
				</view>
			</view>
		</view>
		
		<sd-tabbar :curPage="'my'"></sd-tabbar>
	</view>
</template>

<script>
var that
import { getCmsDetail, getUserCount } from '@/utils/api.js'
import avatar from "../../components/yq-avatar/yq-avatar.vue";
export default {
	components:{
		avatar
	},
	data() {
		return {
			test: '../../static/image/banner2.png',
			list: '',
			userInfo: '',
			userData:'',
			isFirst: true
		}
	},
	onLoad(option) {
		that = this
		console.log(getApp().globalData);
		let userInfo = uni.getStorageSync('userInfo');
		if(!!userInfo){
			that.userInfo = userInfo
			that.getUserCount(userInfo.user_id)
		}
	},
	onShow() {
		console.log('onShow');
		console.log(that.isFirst);
		if(!that.isFirst){
			let userInfo = uni.getStorageSync('userInfo');
			// console.log(userInfo);
			// console.log(!!userInfo);
			that.userInfo = userInfo
			if(!!userInfo){
				that.getUserCount(userInfo.user_id)
			}
		}
		that.isFirst = false
	},
	methods: {
		 myUpload(rsp) {
			that.userInfo.avatar = rsp.path; //更新头像方式一
			//rsp.avatar.imgSrc = rsp.path; //更新头像方式二
		},
		getUserCount(id){
			getUserCount(id).then(res => {
				console.log('getUserCount',res)
				if(res.data.code == 201){
					that.userData = res.data.data;
				} else {
					that.showToast(res.data.status)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		showToast(e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true,
				duration: 2000
			})
		}, 
		_navigateTo(url){
			let userInfo = uni.getStorageSync('userInfo')
			let token = uni.getStorageSync('token')
			let phone = uni.getStorageSync('phone')
			if(!userInfo || !token || !phone){
				uni.navigateTo({
					url: '../login/login'
				})
				return
			}
			
			uni.navigateTo({
				url: url
			})
		},
		toShop(){
			
		}
		
	}
}
</script>

<style lang="scss">
.my{
	.container{
		padding-top: 30%;
		.head{
			position: relative;
			// width: 100%;
			border-radius: 10rpx;
			.head-con{
				margin-top: -80rpx;
				.head-avatar{
					width: 160rpx;
					height: 160rpx;
					border-radius: 10rpx;
				}
			}
			.head-content{
				margin-top: -80rpx;
				.avatar{
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
				}
				view{
					line-height: 1.4;
				}
			}
			.info{
				.item{
					position: relative;
					&::after{
						content: "";
						position: absolute;
						width: 100%;
						height: 50%;
						left: 0;
						top: 25%;
						border-right: 1rpx solid #a1a1a1;
					}
					&:last-child{
						&::after{
							display: none;
						}
					}
					view{
						line-height: 1.3;
					}
				}
			}
		}
	}
	// .cu-list.menu>.cu-item.arrow:before
	.cu-list{
		&.menu{
			.cu-item{
				&::after{
					left: 30rpx;
					width: calc(200% - 30rpx);
				}
				&.arrow{
					&::before{
						color: #929292;
					}
				}
			}
		}
	}
}
</style>
