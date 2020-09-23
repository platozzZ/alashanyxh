<template>
	<view class="enroll">
		<!-- 头部 -->
		<!-- <uni-nav-bar fixed="true" status-bar="true" :title="'活动'"></uni-nav-bar> -->
		<view class="cu-list menu sm-border">
			<view class="cu-item" v-for="(item,index) in list" :key="item.plato_id" @click="toDetail(item.mid)">
				<view class="content flex flex-direction">
					<view class="title flex align-center">
						<text class="text-blue tag padding-right-xs margin-right-xs">{{item.type_name}}</text>
						<text class="text-cut flex-sub text-lg enroll-title">{{item.name}}</text>
						
					</view>
					
					<view class="imgbox margin-tb-sm">
						<image :src="item.poster" lazy-load fade-show class="imgbox-img"></image>
						
					</view>
					<view class="bot flex align-center justify-between text-sm text-kartGray margin-top-xs padding-right-xs">
						<!-- <view class="flex align-center">
							<image :src="item.avatar" class="bot-avatar margin-right-xs"></image>
							{{item.u_name + '丨发起人'}}
						</view>
						<view class="flex align-center">
							<image :src="iteml" class="bot-avatar stack" v-for="(iteml,indexl) in item.u_avatar" :key="item.plato_id + indexl"></image>
						</view> -->
						<view class="flex align-center">
							<!-- <image :src="test" class="info-avatar"></image> -->
							<text class="cuIcon-location margin-right-xs"></text>
							{{item.address}}
						</view>
					</view>
					<view class="info flex align-center justify-between text-sm text-gray margin-top-xs">
						<view class="flex align-center">
							<!-- <image :src="test" class="info-avatar"></image> -->
							<text class="cuIcon-time margin-right-xs"></text>
							<!-- 2019.10.1-10.4 -->
							{{item.starttime + '-' + item.endtime}}
						</view>
						<view class="flex align-center text-kartred">
							<!-- <image :src="test" class="info-avatar"></image> -->
							<text class="cuIcon-recharge margin-right-xs"></text>
							{{item.pricestr + '元'}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<uni-load-more :status="status"></uni-load-more>
		
		
		<sd-tabbar :curPage="'enroll'"></sd-tabbar>
	</view>
</template>

<script>
var that
import { getActivity } from '@/utils/api.js'
export default {
	data() {
		return {
			test: '../../static/image/banner2.png',
			list: [],
			status: 'more',
			pages: {
				page: 1,
				rows: 10
			},
			lastPage: 0
		}
	},
	onLoad(option) {
		that = this
		that.getActivity(that.pages)
		
	},
	// 下拉刷新
	onPullDownRefresh() {
		// that.intPage();
		that.pages.page = 1
		console.log(that.pages);
		that.getActivity(that.pages)
	},
	//上拉加载
	onReachBottom(){
		console.log(that.lastPage);
		console.log(that.pages);
		console.log(that.pages.page);
		console.log(that.lastPage >= that.pages.page);
		if (that.lastPage >= that.pages.page) {
			that.getActivity(that.pages)
			return
		}
		that.status = 'noMore'
		// if(that.page!=that.lastPage){
		// 	that.loadMore()
		// }
	},
	methods: {
		getActivity(data){
			console.log(data);
			getActivity(data).then(res => {
				console.log('getActivity',res.data)
				if(res.data.rspInfo.rspCode == 1000){
					let list = res.data.rspData.list
					list.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					// that.list = list
					
					that.lastPage = res.data.rspData.last_page;
					if (data.page == 1) {
						that.list = []
					}
					that.list = that.list.concat(list)
					uni.stopPullDownRefresh();
					// uni.hideLoading();
					that.pages.page++;
					if(list.length == 0){
						that.status = 'noMore';
						return
					}
					that.status = 'more';
				}
				// that.essayList = res.data[0];
			}).catch(err => {
				console.log(err)
			})
		},
		newGuid() {
			let s4 = function() {
				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
			};
			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
		},
		toDetail(id){
			console.log(id);
			uni.navigateTo({
				url: './enrollDetail?id=' + id
			})
			// that.guanzhu = 1
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
.enroll{
	.cu-list{
		.cu-item{
			padding: 30rpx;
			.content{
				width: 100%;
				.title{
					width: 100%;
					.tag{
						letter-spacing: 3rpx;
						font-size: 40rpx;
						border-right: 1rpx solid #C1C1C1;
						line-height: 1;
					}
					.enroll-title{
						font-weight: 500;
					}
				}
				.info{}
				.imgbox{
					.imgbox-img{
						width: 100%;
					}
				}
				.bot{
					.bot-avatar{
						width: 28rpx;
						height: 28rpx;
						border-radius: 100%;
						border: 1rpx solid #fff;
						&.stack{
							margin-right: -10rpx;
						}
					}
				}
			}
		}
	}
}
</style>
