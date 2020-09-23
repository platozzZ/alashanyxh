<template>
	<view class="orderDetail">
		<view class="bg flex flex-direction padding">
			<view class="order-status text-right text-sm " 
				:class="art.l_orderstatus==20?'text-olive':art.l_orderstatus==30?'text-gray':'text-kartyellow'">
				{{getStatus(art.l_orderstatus)}}
			</view>
			<view class="order-content flex align-start padding-top-sm">
				<image class="logo margin-right-sm" :src="art.logo"></image>
				<view class="content">
					<view class="title text-lg">{{art.l_matchname}}</view>
					<view class="item">
						活动时间：<text class="text-df">{{art.y_starttime}} - {{art.y_endtime}}</text>
					</view>
					<view class="item">
						活动地点：<text class="text-df">{{art.city}}</text>
					</view>
					<view class="item">
						订单总额：<text class="text-df text-kartyellow text-price"> {{art.l_charge}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu sm-border">
			<view class="cu-item">
				<view class="content text-lg">
					联系人姓名：<text class="text-df">{{art.l_name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content text-lg">
					联系人电话：<text class="text-df">{{art.l_mobile}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content text-lg">
					数量：<text class="text-df">{{art.l_count}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content text-lg">
					备注：<text class="text-df">{{!art.l_extra?'无':art.l_extra}}</text>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top-sm">
			<view class="action">
				<text class="cuIcon-titles margin-right-xs text-kartyellow"></text>其他信息
			</view>
		</view>
		<view class="padding bg-white">
			<view class="flex align-center text-lg">订单编号：<text class="text-df">{{art.l_orderid}}</text></view>
			<view class="flex align-center text-lg">下单时间：<text class="text-df">{{art.l_ordertime}}</text></view>
		</view>
		<!-- <view class="order-footer">
			<view class="order-foot flex ">
				
			</view>
		</view> -->
	</view>
</template>

<script>
var that
import { getOrderDetail } from '@/utils/api.js'
export default {
	data() {
		return {
			art: '',
            statustext: [
				{status: 10,text: '未支付'}, 
				{status: 20,text: '支付完成'}, 
				{status: 30,text: '已取消'}
			],
			orderId: ''
		}
	},
	onLoad(option) {
		that = this
		console.log(getApp().globalData);
		that.orderId = option.id
		let data = {
			order_id: option.id
		}
		that.getOrderDetail(data)
	},
	methods: {
		getOrderDetail(data){
			getOrderDetail(data).then(res => {
				console.log('getOrderDetail',res)
				if(res.data.rspInfo.rspCode == 1000){
					that.art = res.data.rspData
				} else {
					that.showToast(res.data.rspInfo.rspDesc)
				}
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		getStatus(e) {
		    var data = that.statustext.filter(r => r.status == e)
		    return data[0].text
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
.orderDetail{
	.bg{
		background-color: #3b3b3b;
		color: #fff;
		.order-content{
			.logo{
				width: 128rpx;
				height: 128rpx;
				border-radius: 100%;
			}
			.content{
				.title{
					font-weight: 600;
				}
				.item{
					font-size: 30rpx;
				}
			}
		}
	}
}
</style>
