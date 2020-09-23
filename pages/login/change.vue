<template>
	<view class="register bg-white">
		<view class="container flex flex-direction align-center justify-center">
			<image src="https://enroll-api.activitysign.com/3/img/logo.png" class="logo"></image>
			<form @submit="formSubmit">
				<view class="form">
					<view class="cu-form-group">
						<input name="phone" v-model="mobile" type="number" maxlength="11" placeholder="请输入手机号" placeholder-class="placeholde"></input>
					</view>
					<view class="cu-form-group code">
						<input name="verifiCode" type="number" placeholder="请输入验证码" placeholder-class="placeholde"></input>
						<button class="cu-btn sendCodeBtn text-kartyellow" @tap.stop.prevent="sendCode" :disabled="!reg && !mobile">
							{{!reg?'获取验证码':second + 's'}}
						</button>
						<!-- <button v-else class="cu-btn sendCodeBtn" disabled>{{!reg?'获取验证码':second + 's'}}</button> -->
					</view>
					<view class="cu-form-group">
						<input name="password" placeholder="请输入密码" password placeholder-class="placeholde"></input>
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<input name="openid" :value="openid" hidden  />
					<!-- #endif -->
					<button form-type="submit" class="zai-btn">立即修改</button>
					<!-- <view class="zai-label margin-tb-xl" @tap.stop.prevent="_navigateBack()">已有账号？去登陆</view> -->
				</view>
			</form>
		</view>
	</view>
</template>

<script>
var that
import { changePwd, captCha } from '@/utils/api.js'
import md5 from '../../common/js/md5.js';
import WxValidate from '../../common/js/WxValidate.js'
import timer from '../../common/js/timer.js'
export default {
	data() {
		return {
			test: '../../static/image/banner2.png',
			list: '',
			openid: uni.getStorageSync('openid'),
			second: 60,
			reg: false,
			mobile: ''
		}
	},
	onLoad(option) {
		that = this
		that.initValidate()
		that.initValidatePhone()
	},
	methods: {
		changePwd(data){
			changePwd(data).then(res => {
				console.log('changePwd',res)
				if (res.data.code == 201) {
					uni.setStorageSync('userInfo',res.data.data)
					uni.setStorageSync('token', res.data.data.token);
					uni.setStorageSync('phone', res.data.data.phone);
					getApp().globalData.userInfo = res.data.data
					getApp().globalData.token = res.data.data.token
					getApp().globalData.phone = res.data.data.phone
					uni.showToast({
						title: '密码修改成功',
						duration: 2000,
						icon: 'success',
						success() {
							uni.reLaunch({
								url: '../index/index'
							})
						}
					});
				} else {
					that.showToast(res.data.message)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		formSubmit(e){
			let value = e.detail.value
			if (!that.WxValidate.checkForm(value)) {
				const error = that.WxValidate.errorList[0]
				console.log(error)
				that.showToast(error.msg)
				return 
			}
			that.changePwd(value)
			console.log(e);
			// let time = that.second//获取最初的秒数
			// timer.getCode(that, time);　　//调用倒计时函数
			// that.reg = true
			
		},
		captCha(data){
			captCha(data).then(res => {
				console.log('captCha',res)
				if(res.data.code == 201){
					uni.showToast({
						title: '发送成功',
						icon: 'success',
						duration: 1000,
						success() {
							let time = that.second//获取最初的秒数
							timer.getCode(that, time);　　//调用倒计时函数
							that.reg = true
						}
					})
				} else {
					that.showToast(res.data.message)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		sendCode(e){
			console.log(that.mobile);
			console.log(that.WxValidatePhone.checkForm({phone: that.mobile}));
			if (!that.WxValidatePhone.checkForm({phone: that.mobile})) {
				const error = that.WxValidatePhone.errorList[0]
				console.log(error)
				that.showToast(error.msg)
				return 
			}
			that.captCha({phone: that.mobile})
		},
		_navigateTo(url){
			console.log(url);
			uni.navigateTo({
				url: url
			})
		},
		_navigateBack(){
			uni.navigateBack()
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
				phone: {
					required: true,
					tel: true,
				},
				password: {
					required: true,
				},
				verifiCode: {
					required: true,
				},
		    }
		    const messages = {
				phone: {
					required: '手机号不能为空',
					tel: '请输入正确的手机号',
				},
				password: {
					required: '请输入密码',
				},
				verifiCode: {
					required: '验证码错误',
				},
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
		},
		initValidatePhone(e) {
		    // 验证字段的规则
		    const rules = {
				phone: {
					required: true,
					tel: true,
				},
				
		    }
		    const messages = {
				phone: {
					required: '手机号不能为空',
					tel: '请输入正确的手机号',
				},
				
		    }
		    // 创建实例对象
		    that.WxValidatePhone = new WxValidate(rules, messages)
		},
	}
}
</script>

<style lang="scss">
page{
	// height: 100%;
	// width: 100vw;
	background-color: #fff;
}
.register{
	// height: 100%;
	// width: 100%;
	.container{
		// height: 100%;
		// width: 100%;
		padding: 100rpx;
		.logo{
			width: 380rpx;
			height: 380rpx;
		}
		.form {
			margin-top: 120rpx;
			width: 100%;
			.cu-form-group{
				background: #fff;
				margin-top: 30rpx;
				border-radius: 100rpx;
				padding: 20rpx 40rpx;
				font-size: 36rpx;
				color: #8799a3;
				border: 1rpx solid #DDDDDD;
				input{
					height: 50rpx;
					line-height: 50rpx;
				}
				&.code{
					padding: 20rpx 0 20rpx 40rpx;
					.sendCodeBtn{
						padding-left: 20rpx;
						padding-right: 40rpx;
						border-left: 1px solid #cdcdcd;
						height: 50rpx;
						border-radius: 0;
						line-height: 24px;
						background: rgba(0,0,0,0);
						font-size: 16px;
						/* color: #333; */
					}
				}
				
			}
			.zai-btn {
				background: #ffcb57;
				color: #fff;
				border: 0;
				border-radius: 100rpx;
				font-size: 36rpx;
				margin-top: 90rpx;
			}
			.zai-label {
				text-align: center;
				font-size: 30rpx;
				color: #8799a3;
			}
		}
	}
}
.placeholde{
	color: #8799a3;
}
</style>
