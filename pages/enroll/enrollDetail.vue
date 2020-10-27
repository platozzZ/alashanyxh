<template>
	<view class="enrollDetail" v-if="!!art">
		<view class="banner"><image class="banner-img" :src="art.poster"></image></view>
		<view class="con">
			<view class="container bg-white en-first padding">
				<view class="title text-xxl text-black">{{art.name}}</view>
				<view class="des tetx-sm text-gray margin-top-xs">
					{{art.entrylimitdesc}}
				</view>
				<view class="info flex align-center text-kartGray margin-tb-sm">
					<image :src="art.logo" class="innfo-avatar margin-right-sm"></image>
					<text class="margin-right-sm">{{art.sponsorname}}</text>
					<text class="">{{art.starttime + ' - ' + art.endtime}}</text>
				</view>
				<view class="tag flex align-center flex-wrap " v-if="art.tags.length > 0">
					<view class="cu-tag bg-gray radius" v-for="(item,index) in art.tags" :key="item">{{item}}</view>
					<!-- <view class="cu-tag bg-gray radius">赛事</view>
					<view class="cu-tag bg-gray radius">户外</view>
					<view class="cu-tag bg-gray radius">休闲娱乐</view> -->
				</view>
			</view>
			<view class=" about bg-white" v-if="art.RacerTop.length > 0">
				<view class="title text-xl text-black padding-top-xl padding-bottom-xs padding-lr  flex align-center justify-between">与您相伴
					<view class="flex align-center justify-center text-gray" @click="toAll" v-if="art.RacerTop.length <= 20">全部 <text class="cuIcon-right"></text> </view>
				</view>
				<view class="padding-lr-xs padding-bottom-lg">
					<uni-grid :column="7" :show-border="false">
						<uni-grid-item v-for="(item, index) in art.RacerTop" :index="index" :key="item.plato_id">
							<view class="grid-item-box flex-sub flex align-center justify-center"><image class="image" :src="item.avatar"></image></view>
						</uni-grid-item>
						<uni-grid-item v-if="art.RacerTop.length > 20">
							<view class="grid-item-box flex-sub flex align-center justify-center">
								<view class="about-more flex align-center justify-center" @click="toAll">
									<text class="cuIcon-more"></text>
								</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>
			<view class="hr"></view>
			<view class=" overview bg-white">
				<view class="title text-xl text-black padding-top-xl padding-bottom-xs padding-lr">活动概览</view>
				<view class="ov-con padding-lr padding-bottom">
					<view class="ov-con-chart margin-tb-sm padding-tb flex align-center justify-center">
						<view class="flex flex-direction justify-center ov-con-txt text-df text-black">
							<view class="flex align-center">
								<view class="label">活动时间</view>
								：{{art.starttime + ' - ' + art.endtime}}
							</view>
							<view class="flex align-center">
								<view class="label">主办方</view>
								：{{art.sponsorname}}
							</view>
							<view class="flex align-center">
								<view class="label">电话</view>
								：{{art.telephone}}
							</view>
							<view class="flex align-center">
								<view class="label">举办地点</view>
								：{{art.city}}
							</view>
						</view>
					</view>
					<view class="time response flex align-center justify-center text-center text-df">
						<!-- 距离报名截止时间：15天9小时6分22秒 -->
						距离报名截止时间：
						<uni-countdown 
							class="countdown" 
							:showColon="false"
							color="#000" 
							splitor-color="#A3A3A3" 
							background-color="#fff" 
							:day="gettimes(art.entryendtime*1000,'day')" 
							:hour="gettimes(art.entryendtime*1000,'hours')"  
							:minute="gettimes(art.entryendtime*1000,'minutes')" 
							>
							<!-- :second="gettimes(art.entryendtime*1000,'second')" -->
						</uni-countdown>
					</view>
				</view>
			</view>

			<view class="hr"></view>
			<view class="explain bg-white">
				<view class="padding-lr padding-top"><p-tab :current="current" :values="tabItem" @clickItem="onClickItem"></p-tab></view>
				<view class="padding text-kartBlack ">
					<!-- <view class="tab1" v-html="htmlString" ref="tab1"></view> -->
					<rich-text class="tab1" :nodes="tabContent[current]"></rich-text>
				</view>
			</view>
			<view class="hr"></view>
			<view class="record bg-white">
				<view class="title text-xl text-black padding-top-xl padding-bottom-xs padding-lr">数据</view>
				<view class="record-con padding-lr padding-bottom flex flex-direction">
					<view class="record-con-list flex align-center padding-tb-sm solid-bottom">
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_length}}</view>
							<view class="text-gray text-sm">长度(km)</view>
						</view>
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_slope}}</view>
							<view class="text-gray text-sm">最大坡度(°)</view>
						</view>
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_altitude}}</view>
							<view class="text-gray text-sm">海拔(m)</view>
						</view>
						<view class="flex flex-direction">
							<!-- <view class="text-kartBlack text-xl">47</view>
							<view class="text-gray text-sm">长度(km)</view> -->
						</view>
					</view>
					<view class="record-con-list flex align-center padding-tb-sm">
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_mud}}</view>
							<view class="text-gray text-sm">泥地(%)</view>
						</view>
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_stone}}</view>
							<view class="text-gray text-sm">碎石(%)</view>
						</view>
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_soil}}</view>
							<view class="text-gray text-sm">土路(%)</view>
						</view>
						<view class="record-con-item flex flex-direction">
							<view class="text-kartBlack text-xl">{{art.r_highway}}</view>
							<view class="text-gray text-sm">公路(%)</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="hr"></view>
			<view class="location bg-white">
				<view class="title text-xl text-black padding-top-xl padding-bottom-xs padding-lr">活动地点</view>
				<view class="padding-lr padding-top-xs padding-bottom-xl">
					<map :latitude="art.lat" :longitude="art.lng"></map>
				</view>
			</view>
			<view class="hr"></view>
			<view class="comments bg-white ">
				<view class="title text-xl text-black padding-top-xl padding-bottom-xs padding-lr">评论{{'（' + list.length + '）'}}</view>
				<view class="cu-list menu-avatar comment" v-if="!!list">
					<view class="cu-item" v-for="(item,index) in list" :key="item.plato_id">
						<view class="cu-avatar round" :style="{backgroundImage: 'url(' + item.avatar + ')'}"></view>
						<view class="content">
							<view class="text-kartBlue flex align-center justify-between">
								{{item.name}}
								<view class="flex align-end comment-zan" :class="item.is_like == 0?'text-kartBlack':'text-kartyellow'" @click="addLike(item,index)">
									<image :src="'../../static/image/' + [item.is_like == 0?'zan':'zanfill'] +'.png'" mode="" class="comment-icon"></image>
									{{item.like_count}}
								</view>
							</view>
							<view class="text-kartBlack text-content text-df">
								{{item.content}}
							</view>
							<view class="margin-top-sm flex align-center">
								<view class="text-gray text-sm">{{item.ctime}}</view>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			
			
			<uni-load-more :status="status"></uni-load-more>
			<!-- <view class="article-meta">
			<text class="article-author">{{banner.author_name}}</text>
			<text class="article-text">发表于</text>
			<text class="article-time">{{banner.published_at}}</text>
		</view>
		<view class="article-content">
			<rich-text :nodes="htmlNodes"></rich-text>
		</view> -->
		</view>
	
		<view class="footer">
			<view class="cu-bar tabbar bg-white shadow foot flex-direction">
				<view class="footer-innput response padding">
					<view class="footer-innput-input padding-lr text-df" @click="togglePopup('bottom', 'popup')">说点什么吧…</view>
				</view>
				<view class="footer-bot response flex align-center " v-if="art.match_status.match_status_code == 20">
					<view class="footer-price flex align-center justify-center text-xxl text-kartred">
						<text class="text-price text-sm"></text>{{art.price}}
					</view>
					<view class="footer-btn bg-kartyellow flex-sub flex align-center justify-center text-xl" @click="toStep">
						我要参加
					</view>
				</view>
				<view class="footer-bot response flex align-center justify-center bg-gray text-lg" v-else>
					<!-- {{art.match_status.match_status_msg}} -->
					<rich-text class="" :nodes="art.match_status.match_status_msg"></rich-text>
				</view>
			</view>
		</view>
		
		<uni-popup ref="showpopup" :type="popType" @change="change">
			<form @submit="formSubmit">
			<view class="pop-comment bg-white response flex flex-direction">
				<view class="cu-form-group padding">
					<textarea maxlength="-1" class="uni-textarea" :fixed="true" name="content" placeholder="说点什么吧…" :focus="popFocus"></textarea>
				</view>
				<input type="text" name="type" value="1" hidden />
				<input type="text" name="obj_id" :value="art.mid" hidden />
				<button form-type="submit" class="cu-btn bg-kartyellow margin-bottom margin-lr lg">提交</button>
			</view>
			</form>
		</uni-popup>
		
	</view>
</template>

<script>
var that;
import { getMatchInfo, addComment, addLike, getComment } from '@/utils/api.js';
import WxValidate from '../../common/js/WxValidate.js'
import htmlParser from '@/common/js/html-parser'
export default {
	data() {
		return {
			art: '',
			list: [],
			status: 'more',
			current: 0,
			mid: '',
			tabItem: [],
			tabContent: [],
			popType: 'bottom',
			popFocus: false,
			commentData: {
				obj_id: '',
				type: 1,
				page: 1,
				rows: 10
			},
			// page: 1,
			lastPage: 0,
			latitude: 39.909,
			longitude: 116.39742,
			isFirst: true
		};
	},
	onLoad(option) {
		that = this;
		that.commentData.obj_id = option.id
		that.mid = option.id
		uni.setStorageSync('enrollMid',option.id)
		console.log(that.commentData);
		let data = {
			mid: option.id,
			num: 20
		}
		that.getMatchInfo(data);
		that.initValidate()
		let userInfo = uni.getStorageSync('userInfo')
		that.userInfo = userInfo
		
	},
	onShow() {
		if(!that.isFirst){
			let userInfo = uni.getStorageSync('userInfo')
			that.userInfo = userInfo
		}
		uni.removeStorageSync('carInfo')
		uni.removeStorageSync('formData')
	},
	//上拉加载
	onReachBottom(){
		console.log(that.commentData);
		console.log(that.lastPage);
		console.log(that.commentData.page);
		console.log(that.lastPage >= that.commentData.page);
		if (that.lastPage >= that.commentData.page) {
			that.status = 'loading'
			// let data = that.commentData
			that.getComment(that.commentData)
			return
		}
		that.status = 'noMore'
	},
	methods: {
		getMatchInfo(data){
			getMatchInfo(data).then(res => {
				console.log('getMatchInfo',res.data)
				if(res.data.rspInfo.rspCode == 1000){
					let data = res.data.rspData
					// data.tags.map((item,index) => {
					// 	item.plato_id = that.newGuid()
					// })
					data.RacerTop.map((item,index) => { //无
						item.plato_id = that.newGuid()
					})
					let tabItem = []
					let tabContent = []
					data.matchdetail.map((item,index) => {
						tabItem.push(item.tabname)
						tabContent.push(item.content)
					})
					that.art = data
					that.tabItem = tabItem
					that.tabContent = tabContent
					console.log('that.commentData',that.commentData);
					// let datas = that.commentData
					// datas.obj_id =  that.art.mid
					that.getComment(that.commentData)
				} else {
					that.showToast(res.data.rspInfo.rspDesc)
				}
				// that.essayList = res.data[0];
			}).catch(err => {
				that.showToast(err.rspDesc)
				console.log(err)
			})
		},
		addLike(item,index){
			console.log(item);
			console.log(index);
			
			let data = {
				comment_id: item.id,
				type: 1
			}
			addLike(data).then(res => {
				console.log('addLike',res.data)
				if(res.data.rspInfo.rspCode == 1000){
					that.$set(that.list[index],'is_like',1)
					let count = that.list[index].like_count
					count++
					that.$set(that.list[index],'like_count',count)
					uni.showToast({
						title: '',
						icon: 'success',
						duration: 2000,
						success() {
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
		getComment(data){
			console.log(data);
			getComment(data).then(res => {
				console.log('getComment',res.data)
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
					that.commentData.page++;
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
		addComment(data){
			addComment(data).then(res => {
				console.log('addComment',res.data)
				if(res.data.rspInfo.rspCode == 1000){
					uni.showToast({
						title: '评论成功，进入审核通道',
						icon: 'none',
						duration: 2000,
						success() {
							setTimeout(function(){
								that.commentData.page = 1
								let commentData = {
									obj_id: that.art.mid,
									type: 1,
									page: 1,
									rows: 10
								}
								that.getComment(commentData)
								that.cancel()
							},2000)
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
		formSubmit(e){
			console.log(e);
			let value = e.detail.value
			if (!that.WxValidate.checkForm(value)) {
				const error = that.WxValidate.errorList[0]
				console.log(error)
				that.showToast(error.msg)
				return 
			} else {
				that.addComment(value)
			}
		},
		like(item,index){
			console.log(item);
			console.log(index);
			let data = {
				comment_id: item.id,
				type: 1,
				index: index
			}
			that.addLike(data)
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
		togglePopup(e) {
			console.log(e);
			if (!that.userInfo) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				this.$nextTick(() => {
					this.$refs.showpopup.open();
				});
			}
		},
		cancel() {
			this.$refs.showpopup.close()
		},
		change(e) {
			console.log('是否打开:' + e.show)
			that.$nextTick(() => {  
			    that.popFocus = e.show;  
			});  
		},
		toAll(){
			uni.navigateTo({
				url: './enrollDetailAbout?id=' + that.mid
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
				content: {
					required: true,
				},
				type: {
					required: true,
				},
				obj_id: {
					required: true,
				},
		    }
		    const messages = {
				content: {
					required: '评论不能为空',
				},
				type: {
					required: '缺少参数，请重新打开页面',
				},
				obj_id: {
					required: '缺少参数，请重新打开页面',
				},
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
		},
		gettimes(completeTime, type) {
			var stime = Date.parse(new Date());
			var etime = Date.parse(new Date(completeTime));
			var usedTime = etime - stime; //两个时间戳相差的毫秒数
			var days = Math.floor(usedTime / (24 * 3600 * 1000));
			//计算出小时数
			var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
			var hours = Math.floor(leave1 / (3600 * 1000));
			//计算相差分钟数
			var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
			var minutes = Math.floor(leave2 / (60 * 1000));
			//计算相差秒数
			var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
			var second = Math.floor(leave3 / 1000);
			var time = days + '天' + hours + '时' + minutes + '分' + second + '秒';
			if (type == 'day') {
				return days;
			} else if (type == 'hours') {
				return hours;
			} else if (type == 'minutes') {
				return minutes;
			} else if (type == 'second') {
				return second;
			} else {
				return time;
			}
		},
		toStep(){
			let userInfo = uni.getStorageSync('userInfo')
			let token = uni.getStorageSync('token')
			let phone = uni.getStorageSync('phone')
			if(!userInfo || !token || !phone){
				uni.navigateTo({
					url: '../login/login'
				})
				return
			}
				// uni.navigateTo({
				// 	url: './enrollStepMatch?mid=' + that.art.mid
				// })
			// switch(that.art.type){
			// 	case '10':
			// 		uni.navigateTo({
			// 			url: './enrollStep?mid=' + that.art.mid
			// 		})
			// 	break;
			// 	case '11':
			// 		uni.navigateTo({
			// 			url: './enrollStep11?mid=' + that.art.mid
			// 		})
			// 	break;
			// 	case '20':
			// 		uni.navigateTo({
			// 			url: './enrollStep20?mid=' + that.art.mid
			// 		})
			// 	break;
			// 	case '21':
			// 		uni.navigateTo({
			// 			url: './enrollStep21?mid=' + that.art.mid
			// 		})
			// 	break;
			// 	default:
			// 		uni.navigateTo({
			// 			url: './enrollStep?mid=' + that.art.mid
			// 		})
			// }
			uni.navigateTo({
				url: './enrollStep11?mid=' + that.art.mid
			})
			// if(that.art.enrolltemplate == 11){
			// 	uni.navigateTo({
			// 		url: './enrollStep11?mid=' + that.art.mid
			// 	})
			// } else {
			// 	uni.navigateTo({
			// 		url: './enrollStepMatch?mid=' + that.art.mid
			// 	})
			// }
		}
	
	}
};
</script>

<style lang="scss">
.enrollDetail {
	padding-top: 620rpx;
	.banner {
		width: 100%;
		height: 732rpx;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 0;
		background-color: #ccc;
		.banner-img {
			width: 100%;
			height: 100%;
		}
	}
	.con {
		position: relative;
		z-index: 1;
		width: 100%;
		.container {
			&.en-first {
				border-radius: 40rpx 40rpx 0 0;
				box-shadow: 0 2px 4px 0 rgba(218, 218, 218, 0.5);
				.title {
					line-height: 1.3;
				}
				.info {
					.innfo-avatar {
						width: 30rpx;
						height: 30rpx;
						border-radius: 100%;
					}
				}
				.tag {
					color: #494548;
					.cu-tag {
						margin-bottom: 10rpx;
					}
				}
			}
		}
		.about {
			.about-more{
				width: 74rpx;
				height: 74rpx;
				border-radius: 100%;
				background-color: #F5F5F5;
			}
			.image {
				width: 74rpx;
				height: 74rpx;
				border-radius: 100%;
			}
		}
		.overview {
			.ov-con {
				.ov-con-chart {
					border-radius: 16rpx;
					border: 1rpx solid #c7c7c7;
					width: 100%;

					.ov-con-txt {
						.label {
							width: 120rpx;
							display: inline-block;
							height: 50rpx;
							line-height: 50rpx;
							text-align: justify;
							vertical-align: top;
							color: #a3a3a3;
							position: relative;
							&::after {
								display: inline-block;
								width: 100%;
								content: '';
								height: 0;
							}
						}
					}
				}
				.time {
					width: 100%;
					color: #a3a3a3;
					// letter-spacing: 6rpx;
				}
			}
		}
		.record{
			.record-con{
				.record-con-list{
					.record-con-item{
						width: 25%;
					}
				}
			}
		}
		.location{
			map{
				width: 100%;
				height: 382rpx;
				border-radius: 12rpx;
				border: 1rpx solid #C7C7C7;
			}
		}
		.comments{
			.cu-list{
				.cu-item{
					padding: 30rpx 30rpx 30rpx 102rpx;
					&::after{
						display: none;
					}
					.cu-avatar{
						width: 52rpx;
						height: 52rpx;
					}
					.content{
						.comment-zan{
							height: 28rpx;
							line-height: 28rpx;
							.comment-icon{
								width: 28rpx;
								height: 28rpx;
								margin-right: 10rpx;
							}
						}
					}
				}
			}
		}
		
	}
	.footer{
		height: calc(246rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(246rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		.cu-bar{
			height: calc(246rpx + constant(safe-area-inset-bottom) / 2);
			height: calc(246rpx + env(safe-area-inset-bottom) / 2);
			z-index: 3;
			.footer-innput{
				.footer-innput-input{
					width: 100%;
					height: 66rpx;
					line-height: 66rpx;
					background: #EEEEEE;
					border-radius: 36rpx;
					color: #878787;
				}
			}
			.footer-bot{
				height: 120rpx;
				background: #F5F5F5;
				.footer-price{
					width: 300rpx;
					height: 120rpx;
				}
				.footer-btn{
					height: 100%;
				}
				
			}
		}
	}
	.pop-comment{
		// padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		// padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		textarea{
			background: #EEEEEE;
			padding: 20rpx;
			margin: 0;
			height: 180rpx;
			border-radius: 4rpx;
		}
	}
	
	.hr{
		width: 100%;
		height: 16rpx;
		background-color: #f1f1f1;
	}
}

</style>
