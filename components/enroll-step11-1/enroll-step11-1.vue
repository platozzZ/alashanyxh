<template>
	<view class="inputorder2-2">
		<view class="introduce-bg">
			<!-- <view class="intro-one">填写报名车辆和保险人员信息。如果领队需要领取车贴和购买保险，需要在本表中再次填写信息。</view> -->
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
			<view class="" v-for="(item,index) in carInfo" :key="index">
				<view class="addcar-button" @click="showPopup(true,index)" v-if="!item.carnumbber">
					<image class="add-but" src="https://enroll-api.activitysign.com/3/images/inputorder2/tianjia.png"></image>
					<view class="addcarin-text">添加人员信息</view>
				</view>
				<view class="addcar-one justify-center" v-else>
					<view class="p-addcar-container flex align-center justify-center">
						<view class="number">{{index+1}}</view>
						<view class="addcar-one-cont flex flex-direction justify-between">
							<view class="car-card">
								<view class="card-text">{{item.carnumbber}}</view>
								<!-- <image class="card-modify" src="https://enroll-api.activitysign.com/3/images/inputorder2/xiepinglun.png"></image> -->
							</view>
							<view class="p-addcar-item" v-for="(iteml,indexl) in item.racer_info" :key="iteml.racername">
								{{iteml.role}}<text>{{iteml.racername}}</text>
							</view>
							<!-- <view class="p-addcar-item">领航<text>王大力</text></view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="p-step-bot flex align-center justify-between">
			<view class="p-btn-prev" @click="backroute"> <text class="cuIcon-back"></text> </view>
			<button class="flex-sub p-btn-submit" @click="next">下一步</button>
		</view>
		
		<uni-popup ref="popup1" type="bottom">
			<view class="add-man-k">
				<self-inputorder2-addcar 
					@carinfo="carinfo" 
					:mid="mid" 
					:isAdd="isAdd" 
					:pIndex="pIndex" 
					@close="close1" 
					:matchSet="matchSetting"
					:carInfo="carInfo"
					v-if="showPop"
				/>
			</view>
		</uni-popup>
		<!-- this.hackReset = false;
					@showPopups="showPopups"
		  this.$nextTick(() => {
		       this.hackReset = true;
		  }) -->
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
			// groupList: [],
			groupCur: 0,
			groupid: '',
			// matchSetting: '',
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
				car_info: [
					// {
					// 	brand: "",
					// 	model: "",
					// 	displacement: "",
					// 	color: "",
					// 	carnumbber: "",
					// 	racer_info: []
					// }
				]
			}
		};
	},
	watch: {
		// groupList(value){
		// 	console.log(value);
		// 	this.handelGroup(value)
		// },
		// matchSetting(value){
		// 	console.log(value);
		// 	this.handelMatch(value)
		// }
	},
	props:{
		groupList: {
			type: Array,
			default: () => []
		},
		matchSetting: {
			type: Object,
			default: () => {}
		},
		mid: {
			type: String,
			default: ''
		}
	},
	mounted(){
		that = this
		console.log('mounted');
		console.log(that.groupList);
		console.log(that.matchSetting);
		console.log(that.mid);
		that.handelGroup(that.groupList)
		that.handelMatch(that.matchSetting)
		// uni.showLoading()
		// let groupList = uni.getStorageSync('groupList')
		// this.groupid = groupList[0].groupid
		// let groupInfo = this.groupInfo
		// groupInfo.group_id = groupList[0].groupid
		// groupInfo.group_name = groupList[0].name
		// groupInfo.group_price = groupList[0].price
		// uni.setStorageSync('groupInfo',groupInfo)
		// this.groupInfo = groupInfo
		// let matchSetting = uni.getStorageSync('matchSetting')
		// that.matchSetting = matchSetting
		
	},
	methods: {
		backroute(e){
			that.$emit('backroute')
		},
		choosezu(e){
			console.log(this.$refs);
			console.log(this.$refs.popup1);
			console.log(e)
			that.groupCur = e
			that.groupid = that.groupList[e].groupid
			let { groupInfo} = that
			// let arr = []
			groupInfo.group_id = that.groupList[e].groupid
			groupInfo.group_name = that.groupList[e].name
			groupInfo.group_price = that.groupList[e].price
			uni.setStorageSync('groupInfo',groupInfo)
		},
		showPopup(isadd,index){
			that.pIndex = index
			that.isAdd = isadd
			console.log(that.pIndex);
			console.log(that.isAdd);
			that.showPop = false
			that.$nextTick(function(){
				that.showPop = true
				that.$refs.popup1.open()
			})
			
		},
		close1() {
			this.$refs.popup1.close();
		},
		prev(){
			this.$emit('steptap',0)
		},
		next(){
			for(let i = 0; i< that.carInfo.length; i++){//item.carnumbber
				if(!that.carInfo[i].carnumbber){
					that.showToast('请添加车辆与人员')
					return
				}
			}
			this.$emit('steptap',1)
		},
		handelGroup(value){
			this.groupid = value[0].groupid
			let groupInfo = this.groupInfo
			groupInfo.group_id = value[0].groupid
			groupInfo.group_name = value[0].name
			groupInfo.group_price = value[0].price
			uni.setStorageSync('groupInfo',groupInfo)
			this.groupInfo = groupInfo
		},
		handelMatch(value){
			console.log(value);
			let { entryInfo } = this
			let obj = {
				brand: "",
				model: "",
				displacement: "",
				color: "",
				carnumbber: "",
				racer_info: []
			}
			let carInfo = new Array(value.usercargroups.carSetting.length)
			
			value.usercargroups.carSetting.map((item,index) => {
				carInfo.splice(index,1,obj)
			})
			let carSetting = value.usercargroups.carSetting
			carInfo.map((item,index) => {
				item.racer_info = new Array(carSetting[index].setting.length)
				carSetting[index].setting.map((iteml,indexl) => {
					let racerObj = {
						racerid: "",
						racername: "",
						roleid: iteml.roleid,
						required: iteml.required,
						role: iteml.role
					}
					item.racer_info.splice(indexl,1,racerObj)
				})
			})
			console.log('carInfo:',carInfo);
			
			this.carInfo = carInfo
			// let carinfo = uni.getStorageSync('carInfo')
			// console.log(carinfo);
			// if(!!carinfo && carinfo.length == carInfo.length){
			// 	that.carInfo = carinfo
			// 	return
			// }
			uni.setStorageSync('carInfo',carInfo)
			setTimeout(function(){
				uni.hideLoading()
			},100)
		},
		carinfo(e){
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
			padding:30rpx 0 26rpx;
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
				border: 1px solid #EA5A5C;
				box-shadow: 0 0 3px 0 rgba(234,90,92,0.31);
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
			// margin-bottom: 20rpx;
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
				line-height: 30rpx;
				.car-card{
					color: #313131;
					display: flex;
					align-items: center;
					.card-text{
						font-size: 38rpx;
						color: #313131;
						line-height: 1;
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
					display: flex;
					align-items: center;
					line-height: 1;
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
