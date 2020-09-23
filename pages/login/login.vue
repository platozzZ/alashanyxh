<template>
	<view class="login bg-white">
		
		<view class="container flex flex-direction align-center justify-center">
			<image src="https://enroll-api.activitysign.com/3/img/logo.png" class="logo"></image>
			<form @submit="formSubmit">
				<view class="form">
					<view class="cu-form-group">
						<input name="name" placeholder="请输入用户名" placeholder-class="placeholde"></input>
					</view>
					<view class="cu-form-group">
						<input name="password" placeholder="请输入密码" password placeholder-class="placeholde"></input>
					</view>
					<input type="text" name="openid" :value="openid" hidden />
					<button form-type="submit" class="zai-btn">立即登录</button>
					<view class="zai-label margin-tb-sm" @tap.stop.prevent="_navigateTo('./change')">忘记密码？</view>
					<view class="zai-label register" @tap.stop.prevent="_navigateTo('./register')">还没有账号？点此注册</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
var that
import { toLogin } from '@/utils/api.js'
import WxValidate from '../../common/js/WxValidate.js'
export default {
	data() {
		return {
			test: '../../static/image/banner2.png',
			list: '',
			openid: ''
		}
	},
	onLoad(option) {
		that = this
		that.initValidate()
		let openid = uni.getStorageSync('openid')
		if(!!openid){
			that.openid = openid
		}
	},
	methods: {
		toLogin(data){
			toLogin(data).then(res => {
				console.log('toLogin',res)
				if(res.data.code == 201){
					// avatar: "http://home-api.fblife.com/images/groups/202006/BqPU29OLgw74418.png"
					// name: "plato"
					// phone: "18911262211"
					// token: "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9ob21lLWFwaS5mYmxpZmUuY29tXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTU5ODI3MTIwNCwiZXhwIjoxNTk5NDgwODA0LCJuYmYiOjE1OTgyNzEyMDQsImp0aSI6Im9TZzhNTzVxSlVJaDhPMUsiLCJzdWIiOjE1NiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImd1YXJkIjoiYXBpIn0.88zwmurbPJfsBA1w4eCnPI5Rkr0D2prjEXNguDgDvVM"
					// token_end_time: 1598291364
					// user_id: 156
					// user_type: 3,
					uni.setStorageSync('userInfo',res.data.data)
					uni.setStorageSync('token', res.data.data.token);
					uni.setStorageSync('phone', res.data.data.phone);
					getApp().globalData.userInfo = res.data.data
					getApp().globalData.token = res.data.data.token
					getApp().globalData.phone = res.data.data.phone
					
					uni.showToast({
						title: '登录成功',
						duration: 3000,
						icon: 'success',
						success() {
							const pages = getCurrentPages(); // 当前页面
							const curPage = pages[pages.length - 1]; // 当前页面
							const beforePage = pages[pages.length - 2]; // 前一个页面
							console.log(beforePage);
							// isFirst
							beforePage.isFirst = false
							setTimeout(function(){
								uni.navigateBack()
							},2000)
						}
					});
					// if(!res.data.phone){
					// 	//未绑定手机号
					// 	uni.navigateTo({
					// 		url: '../login/loginPhone'
					// 	});
					// 	return;
					// }
				} else {
					that.showToast(res.data.message)
				}
				// that.essayList = res.data[0];
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
			that.toLogin(value)
			console.log(e);
			
		},
		_navigateTo(url){
			console.log(url);
			uni.navigateTo({
				url: url
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
		initValidate(e) {
		    // 验证字段的规则
		    const rules = {
				name: {
					required: true,
				},
				password: {
					required: true,
				},
		    }
		    const messages = {
				name: {
					required: '请输入用户名',
				},
				password: {
					required: '请输入密码',
				},
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
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
.login{
	// height: 100%;
	// width: 100%;
	.container{
		// height: 100%;
		// width: 100%;
		padding: 100rpx ;
		.logo{
			width: 380rpx;
			height: 380rpx;
		}
		.form {
			margin-top: 160rpx;
			width: 100%;
			.cu-form-group{
				background: #fff;
				margin-top: 30rpx;
				border-radius: 100rpx;
				padding: 20rpx 40rpx;
				font-size: 36rpx;
				color: #94afce;
				border: 1rpx solid #DDDDDD;
				input{
					height: 50rpx;
					line-height: 50rpx;
				}
			}
			// .zai-input {
			// 	background: #e2f5fc;
			// 	margin-top: 30rpx;
			// 	border-radius: 100rpx;
			// 	padding: 20rpx 40rpx;
			// 	font-size: 36rpx;
			// 	color: #94afce;
			// 	line-height: 90rpx;
			// 	height: 90rpx;
			// }
			.zai-btn {
				background: #ffcb57;
				color: #fff;
				border: 0;
				border-radius: 100rpx;
				font-size: 36rpx;
				margin-top: 90rpx;
			}
			.zai-label {
				font-size: 30rpx;
				color: #8799a3;
				text-align: right;
				&.register{
					position: fixed;
					bottom: 0;
					left: 0;
					width: 100%;
					line-height: 80rpx;
					text-align: center;
					padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
					padding-bottom: calc(env(safe-area-inset-bottom) / 2);
				}
			}
		}
	}
}
.placeholde{
	color: #8799a3;
}
</style>
