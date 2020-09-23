<template>
	<view class="container"  v-if="!!art">
		<!-- 头部 -->
		<uni-nav-bar fixed="true" status-bar="true" @clickRight="pSearch">
			<!-- <block slot="left">
				<view class="city flex align-center justify-start">
					<picker @change="bindPickerChange" :value="cityIndex" :range="cityArr" class="picker-header"></picker>
					<view class="city-text flex-sub text-cut">
						<text class="uni-nav-bar-text ">{{ cityArr[cityIndex] }}</text>
					</view>
					<uni-icons type="arrowdown" color="#333333" size="16" />
				</view>
			</block> -->
			<block slot="default">
				<image src="https://zyjd-api.fblife.com/3/img/logo2.png" class="p-logo"></image>
			</block>
			<!-- #ifdef H5 -->
			<!-- <block slot="right">
				<view class="flex align-center justify-end"><uni-icons type="search" color="#333333" size="22" /></view>
			</block> -->
			<!-- #endif -->
		</uni-nav-bar>
		<!-- <block> -->
		<!-- 轮播图 -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in art.banner" :key="item.plato_id" @tap="_navigateTo('./cmsDetail',item.cf_id)">
				<image :src="item.cf_image" mode="widthFix"></image>
				<view class="swiper-text padding-lr text-cut">{{ item.cf_title }}</view>
				<view class="swiper-shodwn"></view>
			</swiper-item>
		</swiper>
		<!-- nav grid -->
		<!-- <view class="p-index-tab bg-white padding-tb padding-lr-sm">
			<view class="grid text-center col-4">
				<view class="" v-for="(item,index) in tablist" :key="index" @click="snavTo(item)">
					<view class="grid-item-box">
						<image class="image" :src="'../../static/image/snav/' + item.route + '.png'" mode=""></image>
						<text class="text margin-top-sm">{{ item.title }}</text>
					</view>
				</view>
			</view>
		</view> -->
		<!-- <view class="">
			{{this_url}}
		</view> -->
		<!-- 广告图 -->
		<view class="p-adv padding bg-white" @click="_navigateTo('../team/team')" style="display: none;" v-if="!!art && art.ad"><image class="" :src="art.ad.img_url"></image></view>
		<!-- 赛事广告 -->
		<view class="p-adv-ss bg-white" v-if="!!art && art.match.length > 0">
			<view class="cu-card">
				<view class="cu-item shadow">
					<view class="cu-list">
						<view class="cu-item flex align-center justify-between padding-tb-xs" v-for="(item, index) in art.match" :key="item.plato_id" @tap="_navigateTo('../enroll/enrollDetail',item.mid)">
							<view class="flex flex-direction align-center justify-between p-card-left padding-lr">
								<view class="flex flex-direction align-center">
									<view class="p-card-left-title text-ellipsis text-black">{{item.name}}</view>
									<!-- <view class="p-card-left-title">公开赛</view> -->
								</view>
								<image src="../../static/image/adv-border.png" mode=""></image>
							</view>
							<view class="content flex-sub flex flex-direction justify-between padding-lr">
								<view class="p-content-title text-lg">{{item.shortname}}</view>
								<view class="text-sm text-gray text-ellipsis">{{item.intro}}</view>
							</view>
							<view class="action">
								<view class="p-adv-ss-btn flex flex-direction align-center justify-center margin-right">
									<image src="../../static/image/adv-btn-bg.png" mode=""></image>
									<view class="text-sm">立即</view>
									<view class="text-sm">报名</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 推送 -->
		<view class="p-container margin-top-sm bg-white" v-if="!!art && art.news.length > 0">
			<view class="p-container-title flex justify-between align-center padding-top padding-lr">
				重点推送
				<!-- <image src="../../static/image/moredb.png" mode="" class="more"></image> -->
			</view>
			<view class="cu-list menu sm-border">
				<view class="cu-item" v-for="(item, index) in art.news" :key="item.plato_id" @tap="_navigateTo('./cmsDetail',item.news_id)">
					<view class="content flex flex-direction justify-between">
						<view class="title response ">
							<view class="text-ellipsis title">
								<image src="../../static/image/hot.png" mode="" class="hot"></image>
								{{item.title}}
							</view>
						</view>
						<view class="des flex align-center text-sm text-gray">
							<image :src="item.photo" mode="" class="p-item-avatar"></image>
							<text class="margin-lr-xs">{{item.nauthor}}</text>
							{{item.nsendtime}}
						</view>
					</view>
					<image :src="item.nimages" mode="" class="p-item-img"></image>
				</view>
			</view>
		</view>
		<!-- 最新活动 -->
		<view class="p-container margin-top-sm bg-white" v-if="!!art && art.activty.length > 0">
			<view class="p-container-title flex justify-between align-center padding-top padding-lr">
				最新活动
				<!-- <image src="../../static/image/moredb.png" mode="" class="more"></image> -->
			</view>
			<view class="flex flex-wrap justify-between padding">
				<view class="p-activity" v-for="(item, index) in art.activty" :key="item.plato_id" @tap="_navigateTo('../enroll/enrollDetail',item.mid)">
					<!-- <view class="p-activity-content"> -->
					<image class="p-activity-img" :src="item.poster"></image>
					<view class="p-activity-container padding-lr-sm">
						<view class="p-activity-head text-sm flex align-end">
							<view class="head bg-white flex align-center justify-center margin-right-xs">
								<image :src="item.avatar"  class=""></image>
							</view>
							{{item.users_name}}
						</view>
						<view class="p-activity-title text-df text-cut">{{item.name}}</view>
						<!-- <view class="p-activity-des text-sm text-cut">机场路国际汽车城二期161-1机场路国际汽车城二期</view> -->
						<view class="p-activity-price text-sm text-kartred">{{item.price + '元起'}}</view>
					</view>

					<!-- </view> -->
				</view>
			</view>
		</view>
		<!-- 推荐场地 -->
		<!-- <view class="p-container margin-top-sm bg-white" v-if="!!art && art.field.length > 0">
			<view class="p-container-title flex justify-between align-center padding-top padding-lr">
				推荐场地
			</view>
			<scroll-view class="scroll-view_H padding padding-top-sm" scroll-x="true">
				<view 
					class="scroll-view-item_H p-area margin-right-sm" 
					v-for="(item, index) in art.field" 
					:key="item.plato_id" 
					@tap="_navigateTo('../area/areaDetail',item.id)"
				>
					<view class="p-area-block flex flex-direction">
						<image :src="item.logo" mode="" class="p-area-img"></image>
						<view class="p-area-con padding-lr">
							<view class="p-area-logo text-lg flex align-center justify-center"><text class="cuIcon-locationfill  text-kartyellow"></text></view>
							<view class="p-area-title padding-top-sm text-ellipsis text-white flex justify-center">{{item.title}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view> -->
		<!-- list -->
		<view class="p-container margin-top-sm bg-white">
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" :class="index == TabCur ? 'cur' : ''" v-for="(item, index) in cmsType" :key="item.id" @tap="tabSelect(item,index)" :data-id="index">
					{{ item.title }}
				</view>
			</scroll-view>
			<view class="" v-if="cmsList.length > 0">
				<cms-item v-for="(item, index) in cmsList" :options="item" @click="_navigateTo('./cmsDetail',item.id)" :key="item.plato_id"></cms-item>
				<uni-load-more :status="status"></uni-load-more>
			</view>
			<view class="cms-none flex align-center justify-center" v-else>
				暂无更多数据
			</view>
		</view>
		<!-- </block> -->
		<!-- <p-table :columns="columns" :list="data"></p-table> -->
		<sd-tabbar :curPage="'home'"></sd-tabbar>
	</view>
</template>

<script>
var that;
import { getIndex, getCmsType, getCmsListNew, getCmsList } from '@/utils/api.js';
import mediaItem from './news-item.nvue';
export default {
	components: {
		mediaItem
	},
	data() {
		return {
			art: '',
			test: '../../static/image/banner2.png',
			city: '北京',
			cityArr: ['北京', '上海上海上海上海', '广州', '深圳', '天津', '重庆'],
			cityIndex: 0,
			TabCur: 0,
			idCur: null,
			scrollLeft: 0,
			cmsType: [{ id: 999, num: 1, title: '最新' }],
			cmsList: [],
			page: 1,
			lastPage: 0,
			status: 'more',
			this_url: '',
			href: 'https://uniapp.dcloud.io/component/README?id=uniui',
			data: [
				{
					name: 'John Brown',
					age: 18,
					address: 'New York No. 1 Lake Park',
					id: "1",

				}
			],
			columns: [
				{
					title: "ID",
					key: "id"
				},
				{
					title: 'Name',
					key: 'name'
				},
				{
					title: 'Age',
					key: 'age'
				},
				{
					title: 'Address',
					key: 'address'
				}
			],
		};
	},
	created() {
		
	},
	mounted() {
		that = this;
		// #ifdef H5
		if(!uni.getStorageSync('isWeixin')){
			that.getIndex()
			return
		}
		let _url = window.location.href
		let url_openid = this.getParam(_url,'openid')
		this.this_url = _url
		console.log('url_openid:',url_openid);
		// alert('url_openid:' + url_openid)
		if(!!url_openid){
			uni.setStorageSync('openid',url_openid)
			that.getIndex()
			return
		}
		// console.log('getOpenid:',getOpenid);
		let openid = uni.getStorageSync('openid')
			that.getIndex()
		console.log('openid:',openid);
		// alert('openid:' + openid)
		if(!openid){
			this.$getopenid(_url)
		}
		// #endif
		// #ifdef MP-WEIXIN
		getApp().newPromise().then(function (res) {
		    console.log('newPromise:',res);
		    if (res.code == 200){
			that.getIndex()
				
		    }else{
		        console.log(res.data);
		    }
		});
		// #endif
	},
	//上拉加载
	onReachBottom(){
		console.log(that.lastPage);
		console.log(that.page);
		console.log(that.lastPage >= that.page);
		if (that.lastPage >= that.page) {
			if(that.TabCur == 0){
				that.getCmsListNew(that.page)
			} else {
				that.getCmsList(that.idCur,that.page)
			}
			return
		}
		that.status = 'noMore'
	},
	methods: {
		getIndex(){
			getIndex().then(res => {
				console.log('getIndex', res);
				if(res.data.rspInfo.rspCode == 1000){
					let data =res.data.rspData
					data.banner.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					data.match.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					data.news.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					data.field.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					data.activty.map((item,index) => {
						item.plato_id = that.newGuid()
					})
					console.log(data);
					that.art = data
					that.getCmsType();
					that.getCmsListNew(that.page)
					// that.getTestList(1)
				}
				// that.swiperList = res.data;
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		
		getCmsType() {
			getCmsType().then(res => {
				console.log('getCmsType', res);
				that.cmsType = that.cmsType.concat(res.data);
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		getTestList(page){
			getTestList(page).then(res => {
				console.log('getTestList', res);
					let art = res.data.data
					art.map((item,index) => {
						item.plato_id = that.newGuid()
						if (item.nimages_type > 1) {
							// console.log(val.nimages_type);
							let _imgArr = item.nimages.split(',');
							item.image_list = _imgArr;
						}
					})
					that.lastPage = res.data.last_page;
					if (page == 1) {
						that.cmsList = []
					}
					that.cmsList = that.cmsList.concat(art)
					uni.stopPullDownRefresh();
					that.page++;
					if(art.length == 0){
						that.status = 'noMore';
						return
					}
					that.status = 'more';
					
				// } else {
					// that.showToast(res.data.rspInfo.rspDesc)
				// }
				// that.cmsType = that.cmsType.concat(res.data);
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		getCmsListNew(page){
			getCmsListNew(page).then(res => {
				console.log('getCmsListNew', res);
				// if(res.data.rspInfo.rspCode == 1000){
					let art = res.data.data
					// let list = res.data.rspData.list
					art.map((item,index) => {
						item.plato_id = that.newGuid()
						if (item.nimages_type > 1) {
							// console.log(val.nimages_type);
							let _imgArr = item.nimages.split(',');
							item.image_list = _imgArr;
						}
					})
					// that.list = art.list
					
					that.lastPage = res.data.last_page;
					if (page == 1) {
						that.cmsList = []
					}
					that.cmsList = that.cmsList.concat(art)
					uni.stopPullDownRefresh();
					that.page++;
					if(art.length == 0){
						that.status = 'noMore';
						return
					}
					that.status = 'more';
					
				// } else {
					// that.showToast(res.data.rspInfo.rspDesc)
				// }
				// that.cmsType = that.cmsType.concat(res.data);
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		getCmsList(id,page){
			getCmsList(id,page).then(res => {
				console.log('getCmsList', res);
				let art = res.data.data
				art.map((item,index) => {
					item.plato_id = that.newGuid()
					if (item.nimages_type > 1) {
						// console.log(val.nimages_type);
						let _imgArr = item.nimages.split(',');
						item.image_list = _imgArr;
					}
				})
				that.lastPage = res.data.last_page;
				if (page == 1) {
					that.cmsList = []
				}
				that.cmsList = that.cmsList.concat(art)
				uni.stopPullDownRefresh();
				that.page++;
				if(art.length == 0 || page == res.data.last_page){
					that.status = 'noMore';
					return
				}
				that.status = 'more';
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		showToast(e) {
			uni.showToast({
				title: e,
				icon: 'none',
				mask: true,
				duration: 2000
			})
		}, 
		newGuid() {
			let s4 = function() {
				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
			};
			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
		},
		snavTo(item){
			console.log(item);
			if(item.route == 'order'){
				uni.navigateTo({
					url: '../order/order'
				})
			} else {
				uni.navigateTo({
					url: '../indexTab/' + item.route
				})
			}
		},
		toRank(){
			uni.navigateTo({
				url: '../indexTab/ranklist'
			})
		},
		bindPickerChange(e) {
			console.log(e);
			that.cityIndex = e.detail.value;
		},
		//获取url地址栏参数值
		getParam(path, name) {
	        var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	        if (reg.test(path))
	        return unescape(RegExp.$2.replace(/\+/g, " "));
	        return "";
        },
		tabSelect(e,i) {
			// console.log(e);
			console.log(i);
			
			that.scrollLeft = (i - 1) * 60;
			if(that.TabCur == i){
				return
			}
			that.TabCur = i;
			that.page = 1
			that.idCur = e.id
			if(i == 0){
				that.getCmsListNew(1)
			} else {
				that.getCmsList(e.id,1)
			}
		},
		goDetail(item){
			uni.navigateTo({
				url: "./cmsDetail?id=" + item.id
			})
		},
		_navigateTo(url,id){
			uni.navigateTo({
				url: url + '?id=' + id
			})
		},
		
	},
	onShareAppMessage(res) {
		console.log(res);
	    if (res.from === 'button') {// 来自页面内分享按钮
	      console.log(res.target)
	    }
	    return {
	      title: '阿拉善英雄会报名',
	      path: '/pages/index/index'
	    }
	}
};
</script>

<style lang="scss">
.container {
	.city {
		position: relative;
		// width: 120rpx;
		.picker-header {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			/* font-size: 14px;
			line-height: 24px; */
		}
		
		.city-text{
			max-width: 120rpx;
			.uni-nav-bar-text {
				font-size: 32rpx;
				color: #545454;
				margin-right: 5rpx;
			}
		}
	}
	.p-logo {
		width: 248rpx;
		height: 52rpx;
		display: block;
	}
	.screen-swiper{
		.swiper-text{
			position: absolute;
			width: 100%;
			text-align: center;
			color: #fff;
			bottom: 40rpx;
			z-index: 10;
		}
		.swiper-shodwn{
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			background-image: linear-gradient(180deg,hsla(0,0%,100%,.1) 0,rgba(0,0,0,.1) 50%,rgba(0,0,0,.7) 80%,rgba(0,0,0,.8));
		}
	}
	.p-index-tab {
		.grid-item-box {
			flex: 1;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: space-between;
			padding: 10rpx 0;
			.image {
				width: 70rpx;
				height: 70rpx;
			}
			.text {
				font-size: 20rpx;
				color: #8c8c8c;
				line-height: 1.3;
			}
		}
	}
	.p-adv {
		image {
			width: 100%;
			height: 74rpx;
			border-radius: 10rpx;
			display: block;
		}
	}
	.p-adv-ss {
		.cu-card {
			.cu-item {
				height: 150rpx;
				box-shadow: 0 0 8rpx rgba(26, 26, 26, 0.2);
				.cu-list {
					.cu-item {
						.p-card-left {
							width: 210rpx;
							height: 110rpx;
							font-size: 32rpx;
							color: #303030;
							border-right: 1px solid #e5e5e5;
							.p-card-left-title {
								line-height: 40rpx;
								font-weight: 500;
							}
							image {
								width: 100%;
								height: 6rpx;
							}
						}
						.content {
							height: 110rpx;
							font-size: 32rpx;
							color: #656565;
							.p-content-title {
								line-height: 40rpx;
							}
							.text-sm {
								line-height: 32rpx;
							}
						}
						.p-adv-ss-btn {
							position: relative;
							color: #fff;
							width: 78rpx;
							height: 78rpx;
							view {
								position: relative;
								z-index: 1;
								line-height: 30rpx;
							}
							image {
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								z-index: 0;
							}
						}
					}
				}
			}
		}
	}
	.p-container {
		.p-container-title {
			font-size: 40rpx;
			color: #000000;
			.more {
				width: 32rpx;
				height: 32rpx;
			}
		}
		.cu-list {
			.cu-item {
				padding: 20rpx 30rpx;
				.p-item-img {
					width: 224rpx;
					height: 162rpx;
					border-radius: 8rpx;
				}
				.content {
					width: calc(100vw - 304rpx);
					margin-right: 20rpx;
					height: 162rpx;
					.title {
						font-size: 34rpx;
						color: #292929;
						line-height: 44rpx;
						.hot {
							width: 32rpx;
							height: 32rpx;
							vertical-align: -2rpx;
							margin-right: 8rpx;
						}
					}
					.des {
						.p-item-avatar {
							width: 36rpx;
							height: 36rpx;
							border-radius: 100%;
						}
					}
				}
			}
		}

		.p-activity {
			width: calc(50% - 10rpx);
			border-radius: 8rpx;
			margin-bottom: 20rpx;
			box-shadow: 0 0 8rpx rgba(26, 26, 26, 0.2);
			// width: ;
			.p-activity-img {
				width: 100%;
				height: 208rpx;
			}
			.p-activity-container {
				padding-bottom: 10rpx;
				.p-activity-head {
					color: #6e6e6e;
					margin-top: -54rpx;
					.head {
						position: relative;
						width: 84rpx;
						height: 84rpx;
						border-radius: 100%;
						background-color: #fff;
						image {
							width: 64rpx;
							height: 64rpx;
							border-radius: 100%;
						}
					}
				}
				.p-activity-title {
					color: #202020;
				}
			}
		}

		.scroll-view_H {
			white-space: nowrap;
			width: 100%;
			.scroll-view-item_H {
				display: inline-block;
				width: 270rpx;
				height: 360rpx;
				&:last-child {
					margin-right: 0;
				}
				&:nth-child(3n+0){
					background: #CDBFCA;
				}
				&:nth-child(3n+2){
					background: #A7ABBD;
				}
				&:nth-child(3n+1){
					background: #A8C8A5;
				}
				.p-area-block {
					// display: block;
					.p-area-img {
						width: 100%;
						height: 240rpx;
					}
					.p-area-con {
						position: relative;
						height: 120rpx;
						.p-area-logo {
							position: absolute;
							top: -26rpx;
							left: 30rpx;
							width: 52rpx;
							height: 52rpx;
							background-color: #fff;
							border-radius: 100%;
							// z-index: 1;
						}
						.p-area-title {
							white-space: normal;
							line-height: 36rpx;
							padding-top: 32rpx;
							font-weight: 500;
							font-size: 30rpx;
						}
					}
				}
			}
		}

		.nav {
			.cu-item {
				font-size: 32rpx;
				color: #898989;
				&.cur {
					font-size: 34rpx;
					border: 0;
					color: #060606;
				}
			}
		}
		.cms-none{
			min-height: 300rpx;
		}
		.Cms {
			width: 100%;
			min-height: 240rpx;
			overflow: auto;
			.Cms-content {
				width: 100%;
				position: relative;
				border-bottom: 1rpx solid rgba(205, 205, 205, 0.5);
				&.Cms-top-type {
					flex-direction: column;
					align-items: flex-start;
					justify-content: space-between;
					.Cms-top {
						display: flex;
						width: 100%;
						flex-direction: column;
						align-items: flex-start;
						justify-content: flex-start;
						margin-bottom: 20rpx;
						.Cms-top-title {
							width: 100%;
							font-size: 34rpx;
							font-weight: 400;
							text-overflow: -o-ellipsis-lastline;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							line-clamp: 2;
							-webkit-box-orient: vertical;
							color: #000;
						}
						.Cms-top-img {
							width: 100%;
							height: 150rpx;
							display: flex;
							justify-content: space-between;
							padding-top: 20rpx;
							.Cms-top-imglist {
								flex: 1;
								height: 75px;
								margin-right: 8px;
								&:last-child {
									margin-right: 0;
								}
							}
						}
					}
					.Cms-bottom-user {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding-top: 10rpx;
						width: 100%;
						.Cms-left-txt1 {
							font-size: 24rpx;
							color: #8d8d8d;
							margin-left: 10rpx;
						}
						.Cms-left-usericon1 {
							width: 24rpx;
							height: 24rpx;
							border-radius: 50%;
						}
					}
				}
				.Cms-left {
					min-height: 150rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin-right: 20rpx;
					.Cms-left-title {
						width: 100%;
						font-size: 34rpx;
						font-weight: 400;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						color: #000;
						line-height: 1.4;
					}
					.Cms-left-user {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						paddinng-top: 10rpx;
					}
					.Cms-left-usericon {
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
					}
					.Cms-left-txt {
						font-size: 24rpx;
						color: #8d8d8d;
						margin-left: 10rpx;
						margin-right: 20rpx;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.Cms-right {
					width: 208rpx;
					height: 156rpx;
				}
			}
		}
	}

	.p-tabbar-content {
		width: 100%;
		height: calc(100rpx + env(safe-area-inset-bottom) / 2);
	}
}
</style>
