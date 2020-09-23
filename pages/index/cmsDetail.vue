<template>
	<view class="container">
		<!-- 头部 -->
		<uni-nav-bar left-icon="arrowleft" fixed="true" status-bar="true" @clickLeft="back" title="文章详情">
			<!-- <block slot="default">
				<image src="../../static/image/logogray.png" mode="widthFix" class="p-logo"></image>
			</block> -->
		</uni-nav-bar>
		<view class="" v-if="!!essayList">
			
		<view class="cms-box bg-white padding-tb-sm padding-lr">
			<view class="cmsDetailheader padding-top-sm">{{ essayList.ntitle }}</view>
			<view class="cmsDetailsend flex align-center justify-between margin-top margin-bottom-sm">
				<view class="flex align-center">
					<image class="cd-icon margin-right-sm" :src="essayList.photo" mode="scaleToFill" :data-id="essayList.user_id"  @tap.stop.prevent="homePage"></image>
					<view class="cms-zsendbox flex flex-direction justify-center">
						<view class="cms-nau text-df text-cut">{{ essayList.nauthor }}</view>
						<view class="cms-nautx text-gray text-sm" v-if="essayList.nsendtime">{{ essayList.nsendtime | showTime }}</view>
					</view>
				</view>
				<!-- <view class="cms-gz text-df bg-kartyellow padding-lr-sm" v-if="guanzhu == 0" @tap.stop.prevent="guanZhu">关注</view>
				<view class="cms-ygz text-df bg-gray padding-lr-sm" v-else>已关注</view> -->
			</view>
			<!-- <view class="cmsContent" v-html="essayList.ncontent"></view> -->
			<rich-text v-if="!!essayList.ncontent" class="cmsContent" :nodes="essayList.ncontent|formatRichText"></rich-text>
		</view>
		
		<!-- 推荐新闻 -->
		<view class="hr"></view>
		<view class="title text-xl padding-lr padding-top bg-white text-black">
			相关新闻
		</view>
		<view class="cu-card article no-card">
			<view class="cu-item" v-for="(item, index) in cmsNewslist" :key="item.plato_id" @tap.stop.prevent="goCmsdetail(item.id)">
				<view class="content">
					<!-- <image :src="item.logo" class="area-avatar"></image> -->
					<image class="area-avatar" v-if="item.nimages_type == 1" :src="item.nimages" mode=""></image>
					<image class="area-avatar" v-if="item.nimages_type > 1" :src="item.nimages[0]" mode=""></image>
					<view class="desc text-sm">
						<view class="area-title text-lg text-black text-ellipsis">{{item.ntitle}}</view>
						<view class="flex justify-between align-center">
							<view class="area-info text-cut text-kartGray2">{{item.nauthor}}</view>
							<view class="area-info text-cut text-gray">{{item.nsendtime | showTime}}</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		
		<view class="hr"></view>
		<view class="title text-xl padding-lr padding-top bg-white text-black">
			评论
		</view>
		<view class="comments bg-white">
			<view class="cu-list menu-avatar comment" v-if="!!commentList">
				<view class="cu-item" v-for="(item,index) in commentList" :key="item.plato_id">
					<view class="cu-avatar round" :style="{backgroundImage: 'url(' + item.user_photo + ')'}"></view>
					<view class="content">
						<view class="text-kartBlue  flex align-center justify-between">
							{{item.user_name}}
							<view class="flex align-end comment-zan" :class="item.is_like == 0?'text-kartBlack':'text-kartyellow'" @click="like('list',item,index)">
								<image :src="'../../static/image/' + [item.is_like == 0?'zan':'zanfill'] +'.png'" mode="" class="comment-icon"></image>
								{{item.likesnum}}
							</view>
						</view>
						<view class="text-kartBlack text-content text-df">
							{{item.content}}
						</view>
						<view class="margin-top-sm flex align-center">
							<view class="text-gray text-sm">{{item.create_time}}</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<uni-load-more :status="status"></uni-load-more>
		
		<view class="footer">
			<view class="cu-bar tabbar bg-white shadow foot padding-lr text-xxl">
				<view class="footer-innput-input padding-lr margin-left text-df" @click="togglePopup('bottom', 'popup')">说点什么吧…</view>
				
				<!-- <image src="../../static/image/zan.png" class="footer-img margin-right"></image> -->
				<image src="../../static/image/zan.png" class="footer-img margin-right" v-if="essayList.is_like == 0" @click="like('field')"></image>
				<image src="../../static/image/zanfill.png" class="footer-img margin-right" v-else></image>
				<!-- <image src="../../static/image/collect.png" class="footer-img "></image> -->
				<!-- <text class="cuIcon-favor text-gray margin-right"></text> -->
			</view>
		</view>
		
		</view>
		
		<uni-popup ref="areapopup" :type="popType" @change="change">
			<form @submit="commentSubmit">
			<view class="pop-comment bg-white response flex flex-direction">
				<view class="cu-form-group padding">
					<textarea maxlength="-1" class="uni-textarea" :fixed="true" :focus="focusPop" placeholder="说点什么吧…" name="content"></textarea>
				</view>
				<input name="news_id" :value="cmsId" hidden />
				<input name="reply_id" value="0" hidden />
				<input name="user_id" :value="userInfo.user_id" hidden />
				<input name="user_name" :value="userInfo.name" hidden />
				<input name="user_photo" :value="userInfo.avatar" hidden />
				<button form-type="submit" class="cu-btn bg-kartyellow margin-bottom margin-lr lg">提交</button>
			</view>
			</form>
		</uni-popup>
		
		
		
	</view>
</template>

<script>
var that
import { getCmsDetail, getCmsDetailList, getCommentList, commentAdd, changeLikes } from '@/utils/api.js'
import WxValidate from '../../common/js/WxValidate.js'
export default {
	data() {
		return {
			test: '../../static/image/banner2.png',
			essayList: '',
			cmsNewslist: [],
			commentList: [],
			
			status: 'more',
			page: 1,
			lastPage: 0,
			popType: 'bottom',
			cmsId: '',
			guanzhu: 0,
			userInfo: '',
			focusPop: false
		}
	},
	onLoad(option) {
		that = this
		that.cmsId = option.id
		that.getCmsDetail(option.id);
		that.initValidate()
		let userInfo = uni.getStorageSync('userInfo')
		that.userInfo = userInfo
	},
	//上拉加载
	onReachBottom(){
		console.log(that.lastPage);
		console.log(that.page);
		console.log(that.lastPage >= that.page);
		if (that.lastPage >= that.page) {
			that.status = 'loading'
			// let data = that.commentData
			that.getCommentList(that.cmsId,that.page)
			return
		}
		that.status = 'noMore'
	},
	methods: {
		getCmsDetail(id){
			getCmsDetail(id).then(res => {
				console.log('getCmsDetail',res)
				that.essayList = res.data[0];
				that.getCmsDetailList(id)
				that.getCommentList(id,1)
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		getCmsDetailList(id){
			getCmsDetailList(id).then(res => {
				console.log('getCmsDetailList',res)
				let list = res.data
				list.map((item,index) => {
					item.plato_id = that.newGuid()
					if (item.nimages_type > 1) {
						let _imgArr = item.nimages.split(',');
						item.nimages = _imgArr;
					}
				})
				that.cmsNewslist = list;
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		getCommentList(id,page){
			getCommentList(id,page).then(res => {
				console.log('getCommentList',res)
				let art = res.data
				art.data.map((item,index) => {
					item.plato_id = that.newGuid()
				})
				that.lastPage = art.last_page;
				if (page == 1) {
					that.commentList = []
				}
				that.commentList = that.commentList.concat(art.data)
				uni.stopPullDownRefresh();
				that.page++;
				if(art.length == 0 || page == art.last_page){
					that.status = 'noMore';
					return
				}
				that.status = 'more';
				// that.cmsNewslist = list;
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		commentAdd(data){
			commentAdd(data).then(res => {
				console.log('commentAdd',res)
				if(res.data.statusCode == 200){
					uni.showToast({
						title: '评论成功，进入审核通道',
						icon: 'none',
						duration: 2000,
						success() {
							setTimeout(function(){
								// that.page = 1
								// let fieldData = {
								// 	field_id: that.filedId,
								// 	type: that.current,
								// 	page: 1
								// }
								// that.getFieldList(fieldData)
								that.cancel()
							},2000)
						}
					})
				} else {
					that.showToast(res.data.message)
				}
				// that.essayList = res.data[0];
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		commentSubmit(e){
			console.log(e);
			let value = e.detail.value
			if (!that.WxValidate.checkForm(value)) {
				const error = that.WxValidate.errorList[0]
				console.log(error)
				that.showToast(error.msg)
				return 
			}
			that.commentAdd(value)
		},
		changeLikes(data){
			changeLikes(data).then(res => {
				console.log('changeLikes',res)
				console.log(data);
				if(res.data.statusCode == 200){
					if(data.type == 3){
						that.$set(that.essayList,'is_like',1)
					} else {
						that.$set(that.commentList[data.index],'is_like',1)
						let count = that.commentList[data.index].like_count
						count++
						that.$set(that.commentList[data.index],'like_count',count)
					}
					uni.showToast({
						title: '',
						icon: 'success',
						duration: 2000,
						success() {
						}
					})
				} else {
					that.showToast(res.data.message)
				}
				// that.essayList = res.data[0];
			}).catch(err => {
				that.showToast(err.text)
				console.log(err)
			})
		},
		like(e,v,i){
			console.log(e);
			console.log(v);
			console.log(i);
			if(e == 'field'){
				let data = {
					news_id: that.cmsId,
					type: "likes",
					user_id: that.userInfo.user_id
				}
				that.changeLikes(data)
			} else {
				let data = {
					news_id: v.comment_id,
					type: "likes",
					user_id: that.userInfo.user_id,
					index: i
				}
				that.changeLikes(data)
			}
		},
		newGuid() {
			let s4 = function() {
				return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1);
			};
			return (s4() + s4() + '-' + s4() + '-4' + s4().substr(0, 3) + '-' + s4() + '-' + s4() + s4() + s4()).toUpperCase();
		},
		initValidate(e) {
		    // 验证字段的规则
		    const rules = {
				content: {
					required: true,
				},
				news_id: {
					required: true,
				},
				reply_id: {
					required: true,
				},
				user_id: {
					required: true,
				},
				user_name: {
					required: true,
				},
				user_photo: {
					required: true,
				},
		    }
		    const messages = {
				content: {
					required: '评论框不能为空',
				},
				news_id: {
					required: '未知错误，请刷新页面重试',
				},
				reply_id: {
					required: '未知错误，请刷新页面重试',
				},
				user_id: {
					required: '未知错误，请刷新页面重试',
				},
				user_name: {
					required: '未知错误，请刷新页面重试',
				},
				user_photo: {
					required: '未知错误，请刷新页面重试',
				},
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
		},
		togglePopup(e) {
			console.log(e);
			if (!that.userInfo) {
				uni.navigateTo({
					url: '../login/login'
				});
				
			} else {
				this.$refs.areapopup.open();
				
			}
		},
		cancel() {
			that.$refs.areapopup.close();
		},
		change(e) {
			console.log(e);
			console.log('是否打开:' + e.show);
			that.$nextTick(() => {  
			    that.focusPop = e.show;  
			});  
		},
		guanZhu(){
			that.guanzhu = 1
		},
		goCmsdetail(id) {
			uni.redirectTo({
				url: './cmsDetail?id=' + id
			});
		},
		back(){
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
	},
	filters: {
		/**
		 * 处理富文本里的图片宽度自适应
		 * 1.去掉img标签里的style、width、height属性
		 * 2.img标签添加style属性：max-width:100%;height:auto
		 * 3.修改所有style里的width属性为max-width:100%
		 * 4.去掉<br/>标签
		 * @param html
		 * @returns {void|string|*}
		 */
		formatRichText (html) { //控制小程序中图片大小
			console.log(html);
			let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
				match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
				match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
				match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
				return match;
			});
			newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
				match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
				return match;
			});
			newContent = newContent.replace(/<br[^>]*\/>/gi, '');
			newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
			return newContent;
		}	
	}
}
</script>
<style scoped>
	.cmsContent /deep/ p{
		margin: 0;
		padding: 0;
	}
	.cmsContent /deep/ img{
		max-width: 100%;
		width: 100%;
		display: block;
	}
</style>
<style lang="scss">
.container{
	.p-logo{
		width: 348rpx;
		height: 38rpx;
	}
	.cms-box{
		.cmsDetailheader{
			font-size: 48rpx;
			color: #000000;
			font-weight: 600;
			line-height: 1.3;
		}
		.cmsDetailsend{
			.cd-icon{
				width: 78rpx;
				height: 78rpx;
				border-radius: 100%;
				
			}
			.cms-zsendbox{
				.cms-nau{
					line-height: 50rpx;
					color: #000;
				}
				.cms-nautx{
					line-height: 1;
				}
			}
			.cms-gz,.cms-ygz{
				border-radius: 8rpx;
			}
		}
		.cmsContent {
		    width: 100%;
		    height: auto;
		    overflow: auto;
			
			
		}
		
	}
	
	.cu-card{
		.cu-item{
			padding: 30rpx 0;
			position: relative;
			&::after{
				position: absolute;
				top: 0;
				left: 15px;
				box-sizing: border-box;
				width: calc(200% - 60px);
				height: 200%;
				border-bottom: 1upx solid #ddd;
				border-radius: inherit;
				content: " ";
				transform: scale(.5);
				transform-origin: 0 0;
				pointer-events: none
				
			}
			&:last-child{
				&::after{
					display: none;
				}
			}
			.content{
				.area-avatar{
					width: 216rpx;
					height: 160rpx;
					border-radius: 8rpx;
					border: 1rpx solid  #E5E5E5;
				}
				.desc{
					width: calc(100% - 226rpx);
					view{
						line-height: 1.3;
					}
					.area-title{
						font-weight: 500;
					}
				}
			}
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
	
	.footer{
		height: calc(114rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(114rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		.cu-bar{
			height: calc(114rpx + constant(safe-area-inset-bottom) / 2);
			height: calc(114rpx + env(safe-area-inset-bottom) / 2);
			z-index: 3;
			.footer-innput-input{
				// width: 100%;
				flex: 1;
				height: 66rpx;
				line-height: 66rpx;
				background: #EEEEEE;
				border-radius: 36rpx;
				color: #878787;
			}
			.footer-img{
				width: 38rpx;
				height: 38rpx;
				margin-left: 30rpx;
			}
		}
	}
	.pop-comment{
		// width: 90vw;
		// border-radius: 10rpx;
		// overflow: hidden;
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
	.hr {
		width: 100%;
		height: 16rpx;
		background-color: #f1f1f1;
	}
}
</style>
