<template>
	<view class="">
		<!-- <view class="padding-lr padding-top"><p-tab :current="current" :values="tabItem" @clickItem="onClickItem"></p-tab></view> -->
		<scroll-view scroll-x class="bg-white nav text-center solid-top solid-bottom">
			<view class="cu-item" :class="index==TabCur?'text-kartyellow cur':''" v-for="(item,index) in tabItem" :key="index" @tap="tabSelect(item.groupid,index)">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="cu-list menu sm-border">
			<view class="cu-item" v-for="(item,index) in list" :key="item.plato_id">
				<view class="content">
					
					<image :src="item.avatar" class="avatar"></image>
					{{item.racername + ' / ' + item.club}}
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</view>
	</view>
</template>

<script>
var that;
import { getRacerList, getRacerGroup } from '@/utils/api.js';
import htmlParser from '@/common/js/html-parser'
export default {
	data() {
		return {
			mid: '',
			art: '',
			list: [],
			status: 'more',
			TabCur: 0,
			tabItem: [],
			list: [],
			lastPage: 0,
			page: 1,
		};
	},
	onLoad(option) {
		that = this;
		console.log(option);
		that.mid = option.id
		let data = {
			mid: option.id,
		}
		that.getRacerGroup(data)
		// let data = {
		// 	mid: option.id,
		// 	page: 1,
		// 	rows: 20
		// }
		// that.getRacerList(data);
		
	},
	//上拉加载
	onReachBottom(){
		if (that.lastPage >= that.page) {
			that.status = 'loading'
			let data = {
				mid: that.mid,
				page: that.page,
				rows: 20,
				group_id: that.tabItem[that.TabCur].groupid,
				
			}
			that.getRacerList(data)
			return
		}
		that.status = 'noMore'
	},
	methods: {
		getRacerGroup(data){
			getRacerGroup(data).then(res => {
				console.log('getRacerGroup',res.data)
				if(res.data.rspInfo.rspCode == 1000){
					let list = res.data.rspData
					// let tabItem = []
					// list.map((item,index) => {
					// 	tabItem.push(item.name)
					// })
					that.tabItem = list
					let datas = {
						mid: data.mid,
						page: 1,
						rows: 20,
						group_id: list[0].groupid
					}
					that.getRacerList(datas)
				} else {
					that.showToast(res.data.rspInfo.rspDesc)
				}
				// that.essayList = res.data[0];
			}).catch(err => {
				that.showToast(err.rspDesc)
				console.log(err)
			})
		},
		getRacerList(data){
			getRacerList(data).then(res => {
				console.log('getRacerList',res.data)
				if(res.data.rspInfo.rspCode == 1000){
					let art = res.data.rspData
					art.list.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					that.lastPage = art.last_page
					if (data.page == 1) {
						that.list = []
					}
					that.list = that.list.concat(art.list)
					uni.stopPullDownRefresh();
					that.page++;
					if(art.list.length == 0 || data.page == art.last_page){
						that.status = 'noMore';
						return
					}
					that.status = 'more';
				} else {
					that.showToast(res.data.rspInfo.rspDesc)
				}
				// that.essayList = res.data[0];
			}).catch(err => {
				that.showToast(err.rspDesc)
				console.log(err)
			})
		},
		
		tabSelect(id,index) {
			console.log(id);
			console.log(index);
			that.TabCur = index;
			let datas = {
				mid: that.mid,
				page: 1,
				rows: 20,
				group_id: id
			}
			that.getRacerList(datas)
			// this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		},
		newGuid() {
			let s4 = function() {
				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
			};
			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
		},
		onClickItem(e) {
			if (that.current !== e.currentIndex) {
				that.current = e.currentIndex
			}
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
};
</script>

<style>
.cu-list.menu>.cu-item{
	padding-top: 20rpx;
	padding-bottom: 20rpx;
}
.cu-list.menu>.cu-item .content>image.avatar{
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
}
</style>
