<template>
	<view class="mySetting">
		<view class="cu-list menu sm-border solid-top">
			 <!-- @click="_navigateTo('./cropper')" -->
			<view class="cu-item arrow" @click="changeAvatar">
				<view class="content">
					<text class="text-black">修改头像</text>
				</view>
			</view>
			<view class="cu-item arrow" @click="toggle">
				<view class="content">
					<text class="text-black">修改密码</text>
				</view>
			</view>
		</view>
		<!-- <view class="myset-bot">
			<view class="myset-btn">
				退出登录
			</view>
		</view> -->
		<view class="footer">
			<view class="cu-bar tabbar bg-white shadow foot justify-center bg-kartyellow text-lg" @click="modalTap">
				退出登录
			</view>
		</view>
		<view class="" :class="{'showAvatar':!showAvatar}">
			<avatar @upload="myUpload" quality="1" ref="avatar" @hide="hideAvatar"></avatar>
		</view>
		<uni-popup id="popup" ref="popup" :type="'center'">
			<form @submit="pwdSubmit">
				<view class="pop-modal bg-white padding-tb padding-lr-xl text-center flex flex-direction">
					<view class="title text-xl padding-bottom">修改密码</view>
						<input name="oldPassword" placeholder="请输入原始密码" class="pop-input padding-bottom-sm margin-top text-lg" />
						<input name="password" placeholder="请输入密码" class="pop-input padding-bottom-sm margin-top text-lg" />
						<input name="user_id" type="text" :value="userInfo.user_id" hidden />
						<button form-type="submit" class="cu-btn bg-kartyellow round  margin-top-xl lg">立即提交</button>
					
				</view>
			</form>
		</uni-popup>

	</view>
</template>

<script>
var that
import { updateAvatar, logOut } from '@/utils/api.js'
import WxValidate from '../../common/js/WxValidate.js'
import avatar from "../../components/yq-avatar/yq-avatar.vue";
export default {
	components:{
		avatar
	},
	data() {
		return {
			password: '',
			oldPassword: '',
			url: 'https://enroll-api.activitysign.com/3/img/avatar.png',
			test: '../../static/image/banner2.png',
			list: '',
			userInfo: '',
			userData:'',
			isFirst: true,
			showAvatar: false
		}
	},
	onLoad(option) {
		that = this
		let userInfo = uni.getStorageSync('userInfo');
		if(!!userInfo){
			that.userInfo = userInfo
		}
		that.initValidate()
	},
	onShow() {
		console.log('onShow');
	},
	methods: {
		myUpload(rsp) {
			console.log(rsp);
			let data = {
				avatar: rsp.base64,
				user_id: that.userInfo.user_id,
			}
			updateAvatar(data).then(res => {
				console.log('updateAvatar', res);
				if(res.data.code == 201){
					that.showToast(res.data.data)
					let { userInfo } = that
					userInfo.avatar = res.data.status;
					uni.setStorageSync('userInfo',userInfo);
				}else{
					that.showToast(res.data.data)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		
		toggle(type) {
			that.$refs.popup.open()
		},
		cancel() {
			that.$refs.popup.close();
		},
		showToast(e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true,
				duration: 2000
			})
		}, 
		changeAvatar(e){
			console.log(e);
			// that.showAvatar = true
			// that.$refs.avatarpopup.open()
			that.$nextTick(() => {
			console.log(that.$refs);
				that.$refs.avatar.fChooseImg('',{
					selWidth: '350upx', selHeight: '350upx', inner: false, canRotate: false
				});
			});
		},
		hideAvatar(e){
			console.log(e);
			that.showAvatar = e
		},
		changPwd(data){
			updateAvatar(data).then(res => {
				console.log('changPwd', res);
				if(res.data.code == 201){
					that.showToast(res.data.data)
					that.cancel()
				}else{
					that.showToast(res.data.message)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		pwdSubmit(e){
			console.log(e);
			let value = e.detail.value
			if (!that.WxValidate.checkForm(value)) {
				const error = that.WxValidate.errorList[0]
				console.log(error)
				that.showToast(error.msg)
				return 
			} else {
				that.changPwd(value)
			}
		},
		logOut(){
			logOut().then(res => {
				console.log('logOut', res);
				if(res.data.code == 200){
					uni.removeStorageSync('token');
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('phone');
					uni.showToast({
						title: res.data.data,
						duration: 2000,
						icon: 'none',
						success() {
							setTimeout(function(){
								uni.navigateBack()
							},2000)
						}
					});
				}else{
					that.showToast(res.data.data)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		modalTap (e) {
			uni.showModal({
				title: "提示",
				content: "确定退出登录吗？",
				success(res){
					if(res.confirm){
						that.logOut()
					}
				},
			})
		},
		_navigateTo(url){
			console.log(url);
			uni.navigateTo({
				url: url
			})
			// that.guanzhu = 1
		},
		initValidate(e) {
		    // 验证字段的规则
		    const rules = {
				password: {
					required: true,
				},
				oldPassword: {
					required: true,
				},
				user_id: {
					required: true,
				},
		    }
		    const messages = {
				password: {
					required: '密码不能为空',
				},
				oldPassword: {
					required: '原始密码不能为空',
				},
				user_id: {
					required: '未知错误，请刷新页面重试',
				},
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
		},
	}
}
</script>

<style lang="scss">
.mySetting{
	.cu-list{
		&.menu{
			>.cu-item{
				&.arrow{
					&::before{
						color: #333;
					}
				}
			}
		}
	}
	.footer{
		height: calc(100rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(100rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		.foot{
			z-index: 0;
		}
	}
	.pop-modal{
		width: 80vw;
		border-radius: 20rpx;
		.title{
			
		}
		.pop-input{
			border-bottom: 1rpx solid #e6e6e6;
			height: 70rpx;
			line-height: 70rpx;
		}
	}
	.showAvatar{
		position: fixed;
		top: -1000px;
		left: -1000px;
	}
}
</style>
