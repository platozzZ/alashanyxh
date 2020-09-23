<template>
	<view class="order">
		<view class="nav-container ">
			<scroll-view scroll-x class="nav solid-bottom solid-top bg-white " scroll-with-animation>
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index == TabCur ? 'cur' : ''" v-for="(item, index) in tabItem" :key="index" @tap="tabSelect(item,index)">
						{{ item.title }}
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-card article no-card" v-if="list.length > 0">
			<view class="cu-item padding-tb" v-for="(item,index) in list" :key="item.l_orderid" @click.stop="toDetail(item.l_orderid)">
				<view class="title flex align-center justify-between">
					<view class="text-cut order-title flex-sub text-lg text-black">{{item.l_matchname}}</view>
					<view class="order-status text-right text-sm" 
						:class="item.l_orderstatus==20?'text-olive':item.l_orderstatus==30?'text-gray':'text-kartyellow'">
						{{getStatus(item.l_orderstatus)}}
					</view>
				</view>
				<view class="content">
					<esay-loadimage class="order-image margin-right-sm"
						:imgheight="150"
						:scroll-top="scrollTop"
						:open-transition="true"
						:image-src="item.logo"
						mode="aspectFill">
					</esay-loadimage>
					<view class="desc">
						<view class="">报名人数：{{item.l_count}}人</view>
						<view class="">活动时间：{{item.starttime}} 至 {{item.endtime}}</view>
						<view class="text-price"> {{item.l_charge}}</view>
					</view>
				</view>
				<view class="order-bot flex align-center justify-end margin-top-sm padding-lr" v-if="item.l_orderstatus == 10">
					<button class="cu-btn sm line-gray" @click.stop="toCancel(item.l_orderid)">取消</button>
					<button class="cu-btn sm line-kartyellow margin-left" @click.stop="toPay(item.l_orderid)">去支付</button>
					<!-- <view class="button"
						  v-if="item.l_orderstatus==10"
						  :data-orderid="item.l_orderid"
						  @click="cancelor">取消</view>
					<view class="button button-red"
						  v-if="item.l_orderstatus==10"
						  :data-orderid="item.l_orderid"
						  @click="gopay">去支付</view> -->
				</view>
			</view>
			
			<uni-load-more :status="status"></uni-load-more>
		</view>
		<view class="emptyContainer tet-lg text-black" v-else>
			暂无更多数据
		</view>
	</view>
</template>

<script>
var that
import { getOrderList, cancelOrder } from '@/utils/api.js'
export default {
	data() {
		return {
			test: '../../static/image/banner2.png',
			TabCur: 0,
			tabItem: [{title: '全部',id: 1}, {title: '待支付',id: 2}, {title: '已支付',id: 3}, {title: '已取消',id: 4}],
			list: [],
			status: 'more',
			scrollTop: 0,
            statustext: [
				{status: 10,text: '未支付'}, 
				{status: 20,text: '支付完成'}, 
				{status: 30,text: '已取消'}
			],
			orderData: {
				page: 1,
				rows: 10, 
				type: 1 ,
			},
			lastPage: 0,
			isFirst: true
		}
	},
	onLoad(option) {
		that = this
		console.log(getApp().globalData);
		that.getOrderList(that.orderData)
	},
	onShow() {
		console.log('onShow');
		console.log(that.isFirst);
		if(!that.isFirst){
			
			let orderData = {
				page: 1,
				rows: 10, 
				type: 1 ,
			}
			that.getOrderList(orderData)
		}
	},
	// 下拉刷新
	onPullDownRefresh() {
		that.orderData.page = 1
		console.log(that.orderData);
		that.getOrderList(that.orderData)
	},
	//上拉加载
	onReachBottom(){
		console.log(that.orderData);
		if (that.lastPage >= that.orderData.page) {
			that.getOrderList(that.orderData)
			return
		}
		that.status = 'noMore'
		// if(that.page!=that.lastPage){
		// 	that.loadMore()
		// }
	},
	methods: {
		getOrderList(data){
			getOrderList(data).then(res => {
				console.log('getOrderList',res)
				if(res.data.rspInfo.rspCode == 1000){
					let art = res.data.rspData
					that.lastPage = art.last_page
					if (data.page == 1) {
						that.list = []
					}
					that.list = that.list.concat(art.list)
					uni.stopPullDownRefresh();
					that.orderData.page++;
					if(art.list.length == 0 || data.page == art.last_page){
						that.status = 'noMore';
						return
					}
					that.status = 'more';
				} else {
					that.showToast(res.data.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		cancelOrder(data){
			cancelOrder(data).then(res => {
				console.log('cancelOrder',res)
				if(res.data.rspInfo.rspCode == 1000){
					uni.showToast({
						title: '取消成功',
						icon: 'success',
						success() {
							setTimeout(function(){
								that.orderData.page = 1
								console.log(that.orderData);
								that.getOrderList(that.orderData)
							},1500)
						}
					})
					
				} else {
					that.showToast(res.data.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		tabSelect(item,index){
			if(that.TabCur == index){
				return
			}
			that.TabCur = index;
			// let { orderData } = that
			that.orderData.type = item.id
			that.orderData.page = 1
			let data = {
				page: 1,
				rows: 10, 
				type: item.id
			}
			that.getOrderList(data)
			
		},
		toDetail(id){
			uni.navigateTo({
				url: './orderDetail?id=' + id
			})
		},
		toPay(e){
			uni.navigateTo({
				url: '../pay/pay?id=' + e + '&from=order'
			})
		},
		toCancel(e){
			uni.showModal({
				title: "提示",
				content: "确定要取消订单吗？",
				success(res) {
					if(res.confirm){
						let data = {
							orderid: e
						}
						that.cancelOrder(data)
					}
				}
			})
		},
		onPageScroll({ scrollTop }) {
		    that.scrollTop = scrollTop;
		},
		getStatus(e) {
		    var data = that.statustext.filter(r => r.status == e)
		    return data[0].text
		},
		
		newGuid() {
			let s4 = function() {
				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
			};
			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
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
.order{
	.nav-container{
		height: 90rpx;
		.nav{
			position: fixed;
			z-index: 1024;
			.cu-item{
				position: relative;
				&.cur{
					border: 0;
					&::after{
						position: absolute;
						bottom: 0;
						left: 25%;
						box-sizing: border-box;
						width: 50%;
						height: 6rpx;
						background-color: #F9C623;
						border-radius: 10rpx;
						// border-bottom: 6rpx solid #F9C623;
						border-radius: inherit;
						content: " ";
						// transform: scale(.5);
						transform-origin: 0 0;
						pointer-events: none
					}
				}
			}
		}
	}
	.cu-card{
		>.cu-item{
			margin-top: 20rpx;
			&:first-child{
				margin-top: 0;
			}
			.title{
				padding: 0 30rpx 30rpx;
				font-weight: normal;
				.order-title{
					font-weight: 550;
				}
				.order-status{
					width: 120rpx;
					// color: #e43c3c;
					// font-size: 32rpx;
					&.list-status20 {
						color: #45d64b;
					}
					&.list-status30 {
						color: #adb5ad;
					}
				}
			}
			.content{
				// padding-top: 20rpx;
				.order-image{
					width: 150rpx;
					height: 150rpx;
				}
				.desc{
					
					>view{
						color: #666;
						font-size: 26rpx;
						line-height: 1.4;
					}
				}
			}
			.order-bot{
				
			}
		}
	}
	.emptyContainer{
		position: fixed;
		top: 40%;
		left: 50;
		width: 100%;
		text-align: center;
		
	}
}
</style>
