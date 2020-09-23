<template>
	<view class="inputorder2">
		<view class="bg"></view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="match-status" :style="{height: customBar + 'px'}">
			<view class="match-status-fixed" :style="{height: customBar + 'px'}"></view>
		</view>
		<!-- #endif -->
		<l-file ref="lFile" @up-success="onSuccess"></l-file>
		<view class="p-top-bg">
			<image src="https://zyjd-api.fblife.com/3/img/logo3.png"></image>
		</view>
		<view class="cont">
			<view class="flex flex-direction padding-lr text-lh14 text-kartBlack">
				<text class=" ">* 50人以上团体，可以下载excel表格报名。</text>
				<text class="margin-top-sm ">* 批量报名的组织不代表现场拥有专属营地。</text>
				<!-- <text class="text-gray text-df"></text> -->
			</view>
			<view class="download flex flex-direction align-center text-lg">
				<image src="../../static/image/download.png" mode="" @click="downloadFile"></image>
				下载团队报名表格
			</view>
			
			<view class="upload padding-lr padding-tb-lg flex flex-direction align-center">
				<view class="text-sm">
					表格信息将直接转交保险公司，请务必确保信息的正确有效。由于信息错误产生的问题需自行承担。
				</view>
				<!-- #ifdef MP-WEIXIN -->
				
				<!-- <Attachment mode="create" :canUploadFile="true" :uploadFileUrl="uploadFileUrl" :showProcess="true" @uploadSuccess="uploadSuccess" :attachmentList.sync="attachmentList"></Attachment> -->
				<!-- <button class="cu-btn block margin-top" @tap="onUpload">
					<image src="../../static/image/excel.png" class=""></image>
					上传表格
				</button> -->
				<!-- #endif -->
			</view>
			<!-- <view class="cu-list menu sm-border margin-top-lg">
				<view class="cu-item " @click="callPhone('13011811916')">
					<view class="content">
						客服手机号： 13011811916
					</view>
				</view>
				<view class="cu-item " @click="paste('qiaomai7788')">
					<view class="content">
						客服微信号： qiaomai7788
					</view>
				</view>
			</view> -->
		</view>
		<view class="footer">
			<view class="foot flex align-center justify-between text-white ">
				<view class="foot-prev text-xxl flex align-center justify-center" @click="backRoute"> <text class="cuIcon-back"></text> </view>
				<button class="flex-sub foot-btn text-white" @click="actionSheetTap">联系客服</button>
			</view>
		</view>
		
	</view>
</template>

<script>
var that
import { teamEnroll } from '@/utils/api.js';
import Attachment from '../../components/jin-attachment/jin-attachment.vue';
export default {
    components: {Attachment},
	data() {
		return {
			customBar: this.CustomBar,
			attachmentList: [],
			filePath: '',
			phone: '13011811916',
			wechart: 'qiaomai7788'
		};
	},
	onLoad(e) {
		that = this
		that.mid = e.mid;
		// let input = document.createElement('input')  
		// input.type = 'file'  
		// input.onchange = (event) => {  
		// 	console.log(event)  
		// }  
		// that.$refs.input.$el.appendChild(input)
	},
	onShow() {
		console.log('onShow');
	},
	methods: {
		actionSheetTap() {
			uni.showActionSheet({
				// title:'标题',
				itemList: ['拨打电话', '添加微信'],
				success: (e) => {
					console.log(e.tapIndex);
					switch(e.tapIndex){
						case 0:
							that.callPhone()
							break;
						case 1:
							that.paste()
							break;
						
					}
				}
			})
		},
		callPhone(){
			uni.makePhoneCall({
			    phoneNumber: '13011811916'
			});
		},
		paste() {
			uni.setClipboardData({
				data: 'qiaomai7788',
				success:(res)=>{
					uni.showToast({
						title:'已复制到剪切板，请添加客服微信领取报名表格',
						icon: 'none',
						duration: 3000
					})
				}
			});
		},
		teamEnroll(){
			// let data = that.filePath
			// console.log(data);
			// teamEnroll(data).then(res => {
			// 	console.log('teamEnroll',res.data)
			// 	let response = res.data 
			// 	if(response.rspInfo.rspCode == 1000){
			// 		that.showToast('提交成功')
			// 	} else {
			// 		that.showToast(response.rspInfo.rspDesc)
			// 	}
			// }).catch(err => {
			// 	that.showToast(err.text)
			// 	console.log(err)
			// })
			uni.uploadFile({
				url: 'https://zyjd-api.fblife.com/Gokart/team',
				filePath: that.filePath.url,
				name: 'file',
				success: res => {
					console.log(res);
					let response = res.data 
					if(response.rspInfo.rspCode == 1000){
						that.showToast('提交成功')
					} else {
						that.showToast(response.rspInfo.rspDesc)
					}
					// 上传完成后处理
					// this.$emit('uploadSuccess', res);
					// if (res.statusCode  == 200) {
					// 	this.$set(this.list[index], 'process', 100);
					// 	this.$emit('update:attachmentList', this.list);
					// 	this.$forceUpdate();
					// } else {
						
					// }
				}
			});
			
			// uploadTask.onProgressUpdate(res => {
			// 	//此接口不显示真实进度， 所以需要特殊处理
			// 	if (res.progress < 90) {
			// 		this.$set(this.list[index], 'process', res.progress);
			// 		this.$forceUpdate();
			// 	}
			// });
		},
		backRoute(e){
			uni.navigateBack()
		},
		onSuccess(res) {
			console.log('上传成功回调',JSON.stringify(res));
			uni.showToast({
				title: JSON.stringify(res),
				icon: 'none'
			})
		},
		uploadSuccess(result) {
			console.log(result);
			that.filePath = result[0]
     //        if(result.statusCode == 200) {
     //            //上传成功的回调处理
     //            uni.showToast({
     //                title: '上传成功',
     //                icon: 'success',
					// duration: 1500
     //            });
     //        }else{
     //            uni.showToast({
     //                title: '上传失败',
     //                icon: 'none',
					// duration: 1500
     //            });
     //        }
        },
		downloadFile() {
			uni.downloadFile({
				url: 'https://enroll-web.fblife.com/team/Template.xlsx',//下载地址接口返回
				success: (data) => {
					console.log(data);
					if (data.statusCode === 200) {
						//文件保存到本地
						uni.saveFile({
							tempFilePath: data.tempFilePath, //临时路径
							success: function(res) {
								console.log(res);
								uni.showToast({
									icon: 'none',
									mask: true,
									title: '文件已保存：' + res.savedFilePath, //保存路径
									duration: 1500,
									success() {
										setTimeout(() => {
											//打开文档查看
											uni.openDocument({
												filePath: res.savedFilePath,
												success: function(res) {
													// console.log('打开文档成功');
												}
											});
										}, 1500)
										
									}
								});
							}
						});
					}
				},
				fail: (err) => {
					console.log(err);
					uni.showToast({
						icon: 'none',
						mask: true,
						title: '失败请重新下载',
					});
				},
			});
			return
			// let url = 'https://enroll-web.fblife.com/team/Template.xlsx';
			// let url = 'https://zyjd-api.fblife.com/3/img/logobj.png'
			// this.$refs.lFile.download(url,'local')
			// .then(path=>{
			// 	console.log(path);
			// 	console.log(JSON.stringify(path));
			// 	this.localPath = path;
			// }); 
			const downloadTask = uni.downloadFile({
			    // url: 'https://enroll-web.fblife.com/team/Template.xlsx', 
				url: 'https://zyjd-api.fblife.com/3/img/logobj.png',
			    success: (res) => {
					console.log(res);
			        if (res.statusCode === 200) {
						uni.saveFile({
							tempFilePath: res.tempFilePath,
							success(path) {
								console.log(path);
								uni.showToast({
									title: path.savedFilePath,
									icon: 'none',
									duration: 5000
								})
							}
						})
			            console.log('下载成功');
			        }
			    }
			});
			downloadTask.onProgressUpdate((res) => {
			    console.log('下载进度' + res.progress);
			    console.log('已经下载的数据长度' + res.totalBytesWritten);
			    console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
			
			    // 测试条件，取消下载任务。
			    if (res.progress > 50) {
			        downloadTask.abort();
			    }
			});
			// uni.showLoading({
			// 	title:'下载中'
			// })
			// uni.downloadFile({
			// 	url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
			// 	success: (res) => {
			// 		console.log('downloadFile success, res is', res)
			// 		self.imageSrc = res.tempFilePath;
			// 		uni.hideLoading();
			// 	},
			// 	fail: (err) => {
			// 		console.log('downloadFile fail, err is:', err)
			// 	}
			// })
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

<style lang="scss">
.inputorder2{
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(225deg, #D92C4E 0%, #FF776D 51%, #A457CD 100%);
		z-index: -1;
	}
	width: 100%;
	display: flex;
	flex-direction: column;
	.match-status{
		width: 100%;
		.match-status-fixed{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			// background-color: #D92C4E;
		}
	}
	.p-top-bg{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		// height: 320rpx;
		image{
			width: 114rpx;
			height: 114rpx;
			// max-width: 420rpx;
			// height: auto;
			// #ifdef MP-WEIXIN
			margin: 20rpx 0 60rpx;
			//  #endif
			// #ifndef MP-WEIXIN
			margin: 60rpx 0;
			//  #endif
		}
	}
	.cont {
		width: calc(100% - 60upx);
		padding: 40rpx;
		margin: 0 auto;
		position: relative;
		border-radius: 30rpx;
		background-color: #fff;
		margin-bottom: 30rpx;
		.download{
			padding: 80rpx;
			image{
				width: 200rpx;
				height: 226rpx;
				margin-bottom: 20rpx;
			}
		}
		.upload{
			width: 100%;
			background: #F8F8F8;
			border-radius: 8px;
			.cu-btn{
				width: 200rpx;
				height: 68rpx;
				color: #EA5A5C;
				font-size: 26rpx;
				background-color: #fff;
				image{
					width: 24rpx;
					height: 28rpx;
					margin-right: 10rpx;
				}
			}
		}
	}
	.footer{
		height: calc(120rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
		.foot{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 1;
			background: #fff;
			height: calc(120rpx + constant(safe-area-inset-bottom) / 2);
			height: calc(120rpx + env(safe-area-inset-bottom) / 2);
			padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
			padding-bottom: calc(env(safe-area-inset-bottom) / 2);
			.foot-prev{
				width: 160rpx;
				height: 120rpx;
				background-color: #000;
			}
			.foot-btn{
				font-size: 40rpx;
				height: 120rpx;
				line-height: 120rpx;
				background: #EA5A5C;
				border-radius: 0;
				&::after{
					display: none;
				}
			}
		}
	}
}
</style>
