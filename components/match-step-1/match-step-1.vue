<template>
	<view class="inputorder2-1">
		<view class="introduce-bg">
			<view class="intro-one">
				领队负责所有随行人员的物料领取。领队必须携本人身份证，亲临现场。有且只有领队能够一次性领取随行人员所有物料。
			</view>
		</view>
		<form @submit="formSubmit">
			<view class="p-step1-cars" v-if="!!motorCade">
				<view class="p-step1-title">选择所属组织</view>
				<radio-group @change="radioChange" class="radio-group flex align-center margin-bottom-sm ">
					<label class="flex-sub flex align-center justify-center radio-item text-lg" :class="current == '0'?'active':''">
						<radio value="0" :checked="current == '0'" />
						e族大队
					</label>
					<label class="flex-sub flex align-center justify-center radio-item text-lg margin-left" :class="current == '1'?'active':''">
						<radio value="1" :checked="current == '1'" />
						组织/俱乐部
					</label>
				</radio-group>
				<view class="p-step1-picker flex align-center">
					<picker :value="motorIndex" :range="motorCade" :range-key="'e_name'" @change="pickerChange($event)" class="flex-sub">
						<view class="flex align-center justify-between flex-sub">
							{{motorIndex > -1?motorCade[motorIndex].e_name:'请选择车队'}}
							<text class="cuIcon-triangledownfill"></text>
						</view>
					</picker>
					<input v-if="current == 0" name="team_id" :value="motorIndex > -1?motorCade[motorIndex].groupid:''" hidden />
					<input v-if="current == 1" name="club_id" :value="motorIndex > -1?motorCade[motorIndex].groupid:''" hidden />
				</view>
			</view>
			<view class="p-list">
				<view class="p-list-title">
					填写领队信息
				</view>
				<view class="p-item flex align-center justify-between">
					<view class="">姓名</view>
					<input name="l_name" type="text" :value="formData.l_name" class="flex-sub" />
					<view class="p-required">*</view>
				</view>
				<view class="p-item flex align-center justify-between">
					<view class="">身份证</view>
					<input name="l_idcard" type="idcard" maxlength="18" :value="formData.l_idcard" class="flex-sub" />
					<view class="p-required">*</view>
				</view>
				<view class="p-item flex align-center justify-between" style="padding-right: 10upx;">
					<view class="">领队电话</view>
					<input name="l_mobile" type="number" maxlength="11" v-model="phoneData" class="flex-sub" />
					<view class="p-item-btn" :class="!reg?'':'bg-gray'" @click="getPhoneCode">
						{{!reg?'获取验证码':second + 's'}}
					</view>
				</view>
				<view class="p-item flex align-center justify-between">
					<view name="" class="">验证码</view>
					<input name="l_code" type="text" value="" class="flex-sub" />
					<view class="p-required">*</view>
				</view>
				<!-- <view class="p-item flex align-center justify-between">
					<view name="" class="">e族ID</view>
					<input type="text" value="" class="flex-sub" />
					<view class="p-required"></view>
				</view> -->
			</view>
			
			<view class="p-step-bot flex align-center justify-between">
				<view class="p-btn-prev" @click="backroute"> <text class="cuIcon-back"></text> </view>
				<button class="flex-sub p-btn-submit" form-type="submit" >下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
var that
import { getGroup, addMember, getPhoneCode, getClubList } from '@/utils/api.js';
import WxValidate from '../../common/js/WxValidate.js'
import timer from '../../common/js/timer.js'
export default {
	data() {
		return {
			motorIndex: -1,
			motorCade: [],
			current: null,
			phoneData: '',
			second: 60,
			reg: false,
			formData: '',
			
		};
	},
	mounted() {
		console.log(timer);
		that = this
		that.getGroup()
		that.initValidate()
		
	},
	methods: {
		backroute(e){
			that.$emit('backroute')
		},
		getClubList(){
			getClubList().then(res => {
				console.log('getClubList',res.data)
				let art = res.data
				if(res.data.rspInfo.rspCode == 1000){
					that.motorCade = art.rspData
					uni.setStorageSync('motorCade',art.rspData)
					
				} else {
					that.showToast(art.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		getGroup(){
			getGroup().then(res => {
				console.log('getGroup',res.data)
				let art = res.data
				if(res.data.rspInfo.rspCode == 1000){
					that.motorCade = art.rspData
					uni.setStorageSync('motorCade',art.rspData)
					// let formData = uni.getStorageSync('formData')
					// if(!!formData){
					// 	that.phoneData = formData.l_mobile
					// 	that.formData = formData
					// 	art.rspData.map((item,index) => {
					// 		if(item.groupid == formData.group_id){
					// 			that.motorIndex = index
					// 		}
							
					// 	})
					// }
				} else {
					that.showToast(art.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		//获取验证码
		getPhoneCode(){
			console.log('that.phoneData:',that.phoneData);
			console.log('that.tel:',that.tel(that.phoneData));
			if(that.reg || !that.tel(that.phoneData)){
				that.showToast('请输入正确的手机号')
				return
			}
			let data = {mobile: that.phoneData}
			getPhoneCode(data).then(res => {
				console.log('getPhoneCode',res.data)
				let response = res.data
				if(response.rspInfo.rspCode == 1000){
					let time = that.second//获取最初的秒数
					timer.getCode(that, time);　　//调用倒计时函数
					that.reg = true
					
					that.showToast(response.rspInfo.rspDesc)
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		// 添加领队
		addMember(data){
			addMember(data).then(res => {
				console.log('addMember',res.data)
				let response = res.data
				if(response.rspInfo.rspCode == 1000){
					uni.setStorageSync('formData',data)
					uni.setStorageSync('midUid',response.rspData.uid)
					that.showToast(response.rspInfo.rspDesc)
					setTimeout(function(){
						that.$emit('steptap',1)
					},1500)
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		formSubmit(e){
			let value = e.detail.value
			console.log(value)
			if (!that.WxValidate.checkForm(value)) {
				const error = that.WxValidate.errorList[0]
				console.log(error)
				that.showToast(error.msg)
				return false
			} else {
				console.log(value)
				that.addMember(value)
			}
		},
		tel(value) {
		  return /^([1][3,5,6,7,8,9])\d{9}$/.test(value)
		},
		radioChange(e) {
			console.log(e);
			let index = e.detail.value
			if(that.current == index){
				return
			}
			if(index == 0){
				that.getGroup()
			} else {
				that.getClubList()
			}
			that.current = e.detail.value
		},
		pickerChange(e,v) {
			console.log(e);
			console.log('picker发送选择改变，携带值为', e.target.value)
			that.motorIndex = e.detail.value == -1?0:e.detail.value
		},
		showToast(e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true,
				duration: 2000
			})
		}, 
		initValidate(e) {
		    // 验证字段的规则
		    const rules = {
				l_name: {
					required: true,
				},
				l_idcard: {
					required: true,
					idcard: true
				},
				l_mobile: {
					required: true,
					tel: true,
				},
				l_code: {
					required: true,
				}
		    }
		    const messages = {
				l_name: {
					required: '领队姓名不能为空',
				},
				l_idcard: {
					required: '身份证不能为空',
					idcard: '请输入18位的有效身份证'
				},
				l_mobile: {
					required: '手机号不能为空',
					tel: '请输入正确的手机号',
				},
				l_code: {
					required: '验证码不能为空',
				}
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
		},
	}
};
</script>

<style lang="scss">
	// @import "../../static/css/pcommon.css";
.inputorder2-1 {
	.p-step1-cars{
		padding-bottom: 64upx;
		position: relative;
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			width: calc(100% + 120upx);
			left: -60upx;
			height: 14upx;
			background-color: #ECECEC;
		}
		.p-step1-title{
			font-size: 12px;
			color: #262626;
			margin-bottom: 10upx;
		}
		.radio-group{
			.radio-item{
				position: relative;
				height: 80rpx;
				border-radius: 30rpx;
				border: 1rpx solid #E9E9E9;
				padding: 0;
				color: #A7A7A7;
				&.active{
					background-color: #EA5A5C;
					border-color: #EA5A5C;
					color: #fff;
				}
				radio{
					display: none;
				}
			}
		}
		.p-step1-picker{
			border: 1px solid #E9E9E9;
			border-radius: 30upx;
			height: 90upx;
			font-size: 24upx;
			color: #A7A7A7;
			padding: 0 40upx;
			text{
				font-size: 34upx;
			}
		}
	}
	
	.p-list{
		padding: 50upx 0;
		.p-list-title{
			font-size: 24upx;
			color: #262626;
			margin-bottom: 10upx;
		}
		.p-item{
			position: relative;
			color: #A7A7A7;
			width: 100%;
			height: 90upx;
			padding: 0 40upx;
			font-size: 24upx;
			border: 1px solid #E9E9E9;
			border-radius: 30upx;
			margin-bottom: 30upx;
			&:last-child{
				margin: 0;
			}
			// &::after{
			// 	content: '';
			// 	position: absolute;
			// 	left: 0;
			// 	top: 0;
			// 	width: 100%;
			// 	height: 100%;
			// }
			input{
				min-height: 90upx;
				line-height: 90upx;
				padding: 0 20upx;
			}
			.p-required{
				position: relative;
				font-size: 44upx;
				color: #818181;
				height: 40upx;
				line-height: 54upx;
				text-align: right;
			}
			.p-item-btn{
				background: #616161;
				border-radius: 22upx;
				color: #fff;
				font-size: 24upx;
				padding: 18upx 24upx;
			}
			.p-item-btn.bg-gray{
				background-color: rgba(97,97,97,.5);
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
		// height: 160rpx;
		// padding-bottom: 40rpx;
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
	.club-bg{
		font-size: 32rpx;
		line-height: 98rpx;
		text-align: center;
		color: #FF7A22;
		background:url(https://enroll-api.activitysign.com/3/images/daiduibeijing.png) no-repeat center center;
		background-size: 558rpx 98rpx;
	}
	.input-bg{
		.input-one{
			.label{
				font-size: 24rpx;
				color: #a7a7a7;
				padding: 28rpx 0 10rpx;
			}
			.input-cont{
				height: 98rpx;
				width: 100%;
				border:1px solid #F2F2F2;
				border-radius: 30rpx;
				display: flex;
				justify-content: space-between;
				.input{
					padding:25rpx;
					line-height: 48rpx;
					flex:1;
					font-size: 30rpx;
					color: #333;
				}
				.star{
					font-size: 48rpx;
					line-height: 98rpx;
					color: #818181;
					width:80rpx;
					text-align: center;
				}
			}
		}
	}
}
</style>
