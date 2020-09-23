<template>
	<view>
		<view class="">
			<view class="p-tabbar-content"></view>
			<!-- bg-enroll -->
			<view class="cu-bar tabbar shadow foot" :class="curPage == 'enroll'?'bg-white':'bg-white'">
				<view class="action" @click="NavChange" data-cur="home">
					<view class='cuIcon-cu-image flex align-center justify-center'>
						<image :src="'/static/image/tabbar/home' + [curPage=='home'?'_cur':''] + '.png'"></image>
					</view>
					<view class="text-sm" :class="curPage=='home'?'text-black':'text-kartgray'">首页</view>
				</view>
				<view class="action" @click="NavChange" data-cur="enroll">
					<view class='cuIcon-cu-image flex align-center justify-center'>
						<image :src="'/static/image/tabbar/enroll' + [curPage == 'enroll'?'_cur':''] + '.png'"></image>
					</view>
					<view class="text-sm" :class="curPage=='enroll'?'text-black':'text-kartgray'">活动</view>
				</view>
				
				<!-- <view class="action text-kartgray add-action" @click="toIndex">
					<image src="../../static/image/tabbar/add.png" mode="widthFix" class="addbtn"></image>
					<view class="add-action-content">
						
					</view>
				</view> -->
				<view class="action" @click="NavChange" data-cur="team">
					<view class='cuIcon-cu-image flex align-center justify-center'>
						<image :src="'/static/image/tabbar/team' + [curPage == 'team'?'_cur':''] + '.png'"></image>
					</view>
					<view class="text-sm" :class="curPage=='team'?'text-black':'text-kartgray'">商城</view>
				</view>
				<view class="action" @click="NavChange" data-cur="my">
					<view class='cuIcon-cu-image flex align-center justify-center'>
						<image :src="'/static/image/tabbar/my' + [curPage == 'my'?'_cur':''] + '.png'"></image>
					</view>
					<view class="text-sm" :class="curPage=='my'?'text-black':'text-kartgray'">我的</view>
				</view>
			</view>
			
	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// PageCur: 'home',
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar
			};
		},
		name: 'sd-tabbar',
		props: {
			curPage: {
				type: String,
				default: ''
			},
			isEnroll: {
				type: Boolean,
				default: false
			},
		},
		mounted(){
			// that = this
			// console.log(this)
			// console.log(this.$props)
		},
		methods: {
			NavChange(e) {
				switch (e.currentTarget.dataset.cur) {
				    case 'home':
						// that.setTitle('首页')
				        uni.reLaunch({
				        	url: '../../pages/index/index'
				        })
				        break;
				    case 'enroll':
				        uni.reLaunch({
				        	url: '../../pages/enroll/enroll'
				        })
				         break;
				    case 'team':
				        uni.navigateTo({
				        	url: '../../pages/mall/mall'
				        })
				         break;
				    case 'my':
				        uni.reLaunch({
				        	url: '../../pages/my/my'
				        })
						break
					default: 
						uni.reLaunch({
							url: '../../pages/index/index'
						})
				} 
			},
			toIndex(){
				uni.navigateTo({
					url: "../../pages/index/index"
				})
			}
			
		}
	}
</script>

<style scoped>
	@import "../../common/css/main.css";
	@import "../../static/css/common.css";
	
	/* 底部导航栏样式 */
	.p-tabbar-content{
		width: 100%;
		height: calc(100upx + env(safe-area-inset-bottom) / 2);
	}
	/* .cu-bar.tabbar .action.add-action::after,.cu-bar.tabbar .action.add-action::before{
		display: none;
	} */
	.cu-bar.tabbar .action.add-action{
		padding: 0;
	}
	.cu-bar.tabbar .action.add-action image{
		width: 90upx;
		height: 90upx;
		position: absolute;
		z-index: 1024;
		border-radius: 50%;
		line-height: 35px;
		font-size: 25px;
		top: -18rpx;
		left: 0;
		right: 0;
		margin: auto;
		padding: 0;
	}
	.cu-bar.tabbar .action.add-action::after{
		width: 120rpx;
		height: 120rpx;
		border-radius: 100%;
		top: -30rpx;
		z-index: 1023;
	}
	.cu-bar.tabbar .action.add-action .add-action-content{
		min-height: 100rpx;
		width: 100%;
	}
	.cu-bar.tabbar .action{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 20upx;
		background-color: rgba(255,255,255,0)!important;
	}
	.cu-bar.tabbar .action .text-sm{
		line-height: 1;
	}
	.cu-bar.tabbar .action .cuIcon-cu-image {
		margin: 0 auto 10upx;
		width: 38upx;
		height: 38upx;
	}
	.cu-bar.tabbar .action .cuIcon-cu-image image {
		width: 38upx;
		height: 38upx;
		display: block;
	}
	.bg-enroll{
		/* background: rgba(45,1,3,0.50); */
		background-color: rgba(255,255,255,.6);
		color: #fff;
	}
	
	.text-sdyellow{
		color: #FABB27;
	}
</style>
