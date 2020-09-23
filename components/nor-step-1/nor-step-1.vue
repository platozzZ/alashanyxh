<template>
	<view class="inputorder2-2">
		<view class="introduce-bg">
			<view class="intro-one">填写报名车辆和保险人员信息。如果领队需要领取车贴和购买保险，需要在本表中再次填写信息。</view>
			<view class="intro-one">每车赠送一套车贴，车贴根据车辆数量自动分发。按照往年规则，贴有车贴的车辆才可以进入阿拉善梦想公园园区。（以现场实际规则为准）</view>
		</view>
		<view class="choosezu-bg" v-if="groupList.length > 0">
			<view class="choosezu-title">选择组别</view>
			<view class="choosezu-cont">
				<view class="choosezu-one" v-for="(item,index) in groupList" :key="item.name"  @click="choosezu(index)" :class="groupCur == index?'choosezu-one-cur':''">
					<view class="choose-top">{{item.name}}</view>
					<view class="choose-bot">{{item.price + '元'}}</view>
				</view>
			</view>
		</view>
		<view class="" v-if="carInfo.length > 0">
			<view class="addcar-one justify-center" v-for="(item,index) in carInfo" :key="index" >
				<view class="p-delete flex align-center justify-center text-white" @click="deleteList(index)">
					<text class="cuIcon-close"></text>
				</view>
				<view class="p-addcar-container flex align-center justify-center">
					<view class="number">{{index+1}}</view>
					<view class="addcar-one-cont flex flex-direction justify-between">
						<view class="car-card">
							<view class="card-text">{{item.carnumbber}}</view>
							<!-- <image class="card-modify" src="https://enroll-api.activitysign.com/3/images/inputorder2/xiepinglun.png"></image> -->
						</view>
						<view class="p-addcar-item" v-for="(iteml,indexl) in item.racer_info" :key="iteml.racername" v-if="indexl<1">
							{{iteml.role}}<text>{{iteml.racername}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="addcar-button" @click="showPopup(true)">
			<image class="add-but" src="https://enroll-api.activitysign.com/3/images/inputorder2/tianjia.png"></image>
			<view class="addcarin-text">添加人员信息</view>
		</view>
		<view class="p-step-bot flex align-center justify-between">
			<view class="p-btn-prev" @click="backroute"> <text class="cuIcon-back"></text> </view>
			<button class="flex-sub p-btn-submit" @click="next">下一步</button>
		</view>
		
		<uni-popup ref="popup1" type="bottom" v-id="showPop">
			<view class="add-man-k"><match-step-addcar @carinfos="carinfos" :mid="mid" :isAdd="isAdd" :pIndex="pIndex" @close="close1" /></view>
		</uni-popup>
		
	</view>
</template>

<script>
var that
import { getGroup, addMember, getPhoneCode } from '@/utils/api.js';
export default {
	data() {
		return {
			pIndex: null,
			isAdd: true,
			formData: '',
			groupList: [],
			groupCur: 0,
			groupid: '',
			matchSetting: '',
			carList: '',
			groupInfo: {
				group_id: "",
				group_name: "",
				group_price: "",
			},
			carInfo: [],
			isnext: false,
			showPop: false,
			entryInfo: {
				group_id: "",
				group_name: "",
				group_price: "",
				car_info: []
			}
		};
	},
	props:{
		matchInfo: {
			type: Object,
			default() {
				return {}
			}
		},
		mid: {
			type: String,
			default: ''
		}
	},
	watch: {
		entryInfo(value){
			console.log(value);
		}
	},
	mounted(){
		that = this
		console.log(that.matchInfo);
		let { entryInfo, groupInfo } = that
		that.carInfo = uni.getStorageSync('carInfo')
		let groupList = uni.getStorageSync('groupList')
		if(groupList.length > 0){
			that.groupList = groupList
			that.groupid = groupList[0].groupid
			
			groupInfo.group_id = groupList[0].groupid
			groupInfo.group_name = groupList[0].name
			groupInfo.group_price = groupList[0].price
			console.log('groupInfo:',groupInfo);
			
			that.groupInfo = groupInfo
		}
			uni.setStorageSync('groupInfo',groupInfo)
		
	},
	methods: {
		backroute(e){
			that.$emit('backroute')
		},
		choosezu(e){
			that.groupCur = e
			that.groupid = that.groupList[e].groupid
			let { entryInfo, groupInfo} = that
			// let arr = []
			groupInfo.group_id = that.groupList[e].groupid
			groupInfo.group_name = that.groupList[e].name
			groupInfo.group_price = that.groupList[e].price
			// entryInfo.car_info = new Array()
			uni.setStorageSync('groupInfo',groupInfo)
		},
		showPopup(isadd,index){
			console.log(that.matchInfo);
			that.isAdd = isadd
			that.pIndex = index
			console.log(that.pIndex);
			console.log(that.isAdd);
			that.showPop = true
			that.$nextTick(function(){
				that.$refs.popup1.open()
			})
		},
		close1() {
			this.$refs.popup1.close();
			that.showPop = false
		},
		deleteList(index){
			console.log(index);
			uni.showModal({
				title: '提示',
				content: '确定删除吗？',
				success(res) {
					if(res.confirm){
						uni.showLoading()
						setTimeout(function(){
							let list = that.carInfo
							list.splice(index,1)
							that.carInfo = list
							uni.setStorageSync('carInfo',list)
							uni.hideLoading()
						},500)
					}
				}
			})
		},
		prev(){
			this.$emit('steptap',0)
		},
		next(){
			console.log(that.carInfo.length);
			if(that.carInfo.length == 0){
				that.showToast('请添加车辆与人员')
				return
			}
			this.$emit('steptap',1)
		},
		carinfos(e){
			console.log(e);
			that.carInfo = e
		},
		isnexts(v){
			that.isnext = e
		},
		showToast(e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true,
				duration: 2000
			})
		},
		// change(e){
		// 	console.log(e);
		// }
	}
};
</script>

<style lang="scss">
	// @import "../../static/css/pcommon.css";
.inputorder2-2 {
	.choosezu-bg{
		.choosezu-title{
			font-size: 28rpx;
			color: #797979;
			padding:50rpx 0 26rpx;
		}
		.choosezu-cont{
			display: flex;
			justify-content:space-between;
			flex-wrap: wrap;
			.choosezu-one{
				padding:30rpx 0;
				width:262rpx;
				// height: 76rpx;
				text-align: center;
				border: 1px solid #D1D1D1;
				border-radius: 6rpx;
				margin-bottom: 12rpx;
				color: #808080;
				line-height: 36rpx;
				font-size: 28rpx;
				.choose-bot{
					font-size: 24rpx;
				}
			}
			.choosezu-one-cur{
				color: #616161;
				border: 1px solid #616161;
				box-shadow: 0 0 3px 0 rgba(0,0,0,0.31);
			}
		}
	}
	.uni-popup{
		z-index: 999999;
	}
	.step-bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background-color: #FF7A22;
		line-height: 120rpx;
		text-align: center;
		color: #fff;
		font-size: 40rpx;
	}
	.introduce-bg{
		font-size: 20rpx;
		color: #757575;
		line-height: 32rpx;
		.intro-one{
			margin-bottom: 20rpx;
		}
	}
	.leader-info{
		margin: 0 auto;
		width:538rpx;
		height: 182rpx;
		background: url(https://enroll-api.activitysign.com/3/images/inputorder2/lingdui.png) no-repeat center center;
		background-size: 538rpx 182rpx;
		.leader-name{
			padding:0 24rpx;
			line-height: 82rpx;
			font-size: 32rpx;
			color: #616161;
			.label{
				font-size: 28rpx;
				color: #838383;
				
			}
		}
		.leader-text{
			line-height: 32rpx;
			padding:10rpx 24rpx;
			font-size: 24rpx;
			color: #505050;
		}
	}
	.addcar-button{
		height: 250rpx;
		width:562rpx;
		margin:60rpx auto;
		background:url(https://enroll-api.activitysign.com/3/images/inputorder2/cheliang.png) no-repeat center center;
		background-size: 562rpx 250rpx;
		.add-but{
			width:72rpx;
			height: 72rpx;
			margin:40rpx 0 0 300rpx;
		}
		.addcarin-text{
			font-size: 24rpx;
			line-height: 50rpx;
			padding-left: 254rpx;
			color: #FFFFFF;
		}
	}
	.addcar-one{
		height: 250rpx;
		width:562rpx;
		margin:60rpx auto;
		background:url(https://enroll-api.activitysign.com/3/images/inputorder2/qiche.png) no-repeat center center;
		background-size: 562rpx 250rpx;
		display: flex;
		align-items: center;
		position: relative;
		.p-delete{
			width:60rpx;
			height: 60rpx;
			position: absolute;
			right:0;
			top: -30rpx;
			border-radius: 50%;
			background-color: #999;
		}
		.p-addcar-container{
			height: 100%;
			padding: 36rpx 0 96rpx 50rpx;
			.number{
				width:66rpx;
				height: 66rpx;
				background: #D9D9D9;
				border-radius: 50%;
				text-align: center;
				line-height: 66rpx;
				font-size: 44rpx;
				color: #fff;
				// margin-left: 120rpx;
				margin-right: 20rpx;
			}
			.addcar-one-cont{
				width:250rpx;
				height: 100%;
				font-size: 24rpx;
				color: #939393;
				line-height: 32rpx;
				.car-card{
					font-size: 36rpx;
					color: #313131;
					display: flex;
					align-items: center;
					height: 48rpx;
					.card-text{
						font-size: 36rpx;
						color: #313131;
					}
					.card-modify{
						margin-left: 12rpx;
						width: 28rpx;
						height: 28rpx;
					}
				}
				.p-addcar-item {
					font-size: 24upx;
					color: #939393;
					text {
						color: #000000;
						margin-left: 30rpx;
					}
				}
				.car-man{
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					flex-direction: row;
					.man-one{
						height: 32rpx;
						min-width: 48rpx;
					}
				}
			}
		}
		
	}

	.p-step-bot{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		font-size: 40rpx;
		text-align: center;
		height: calc(120rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		background-color: #fff;
		.p-btn-prev{
			width: 160rpx;
			height: 120rpx;
			line-height: 120rpx;
			font-size: 46rpx;
			color: #fff;
			background: #000;
			// margin-right: 30rpx
		}
		.p-btn-submit{
			font-size: 40rpx;
			height: 120rpx;
			line-height: 120rpx;
			color: #FFFFFF;
			background: #EA5A5C;
			border-radius: 0;
			&::after{
				display: none;
			}
		}
	
	}
}
</style>
