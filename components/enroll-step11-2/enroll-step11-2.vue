<template>
	<view class="inputorder2-3">
		<!-- <view class="introduce-bg">
			<view class="intro-title">线上优惠购买礼包</view>
			<view class="intro-one">线上购买礼包，享受八折优惠，现场原价有售，线上采购每人限
				购一份优惠礼包。</view>
			<view class="intro-one">礼包需由领队携本人身份证一次性领取。</view>
			<view class="intro-one">礼包领取位置在阿拉善公园园区内［官方文创商品大厅］。具体
				位置可留意官方媒体稍后公布的地图导航或者现场签到处的领取通知。</view>
		</view> -->
		<view class="p-list" v-if="list.length > 0 || matchInsurance.length > 0">
			<view class="p-item flex justify-between" v-for="(item,index) in matchInsurance" :key="index" style="width: 100%;">
				<view class="p-item-left flex flex-direction align-center justify-between">
					<image :src="item.photo" mode=""></image>
					<view class="p-item-left-des">
						单价: ¥ <text>{{item.price}}</text>
					</view>
				</view>
				<view class="p-item-content flex-sub flex flex-direction justify-between">
					<view class="p-item-content-title  flex align-center">
						{{item.name}}
						<text class="cuIcon-info" @click="showMask('open',item)"></text>
					</view>
					<view class="p-item-content-des">
						{{item.description}}
					</view>
					<view class="numbg">
						<!-- :max="item.limitnum" 
						:disabled="item.type == '1'?true:false" -->
						<p-number-box @change="changeNumber" :value="item.num" :step="person" :max="person" :disabled="item.type == '1'?true:false" :mtindex="index" :ismt="true"></p-number-box>
						<!-- <p-number-box @change="changeNumber" :value="item.num" :step="item.limitnum == 0?1:item.limitnum" :max="item.limitnum == 0?999:item.limitnum" :disabled="item.type == '1'?true:false" :mtindex="index" :ismt="true"></p-number-box> -->
					</view>
				</view>
			</view>
			<view class="" style="width: 100%;" v-for="(item,index) in list" :key="item.template">
				<view class="p-item flex justify-between" v-for="(itemm,indexm) in item.module_info" :key="index + indexm">
					<view class="p-item-left flex flex-direction align-center">
						<image :src="itemm.photo" mode=""></image>
						<view class="p-item-left-des">
							单价: ¥ <text>{{itemm.price}}</text> 
						</view>
					</view>
					<view class="p-item-content flex-sub flex flex-direction justify-between">
						<view class="p-item-content-title">
							{{itemm.title}}
							<text class="cuIcon-info" @click="showMask('open',itemm)"></text>
						</view>
						<view class="p-item-content-des">
							{{itemm.description}}
						</view>
						<view class="numbg">
							<p-number-box :min="0" @change="changeNumber" :step="1" :bindex="index" :sindex="indexm" :value="itemm.num" :max="itemm.limitnum"></p-number-box>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="gifNone flex flex-direction align-center justify-center" v-else>
			<image src="../../static/image/gifnone.png" mode="" class="gifnone-img"></image>
			<view class="text-kartGray2 margin-top-sm">
				该比赛无礼包，请点击下一步
			</view>
		</view>
		<view class="p-step-bot flex align-center justify-between">
			<view class="p-btn-prev backroute" @click="backroute"> <text class="cuIcon-back"></text> </view>
			<button class="flex-sub p-btn-submit" @click="setStor">下一步</button>
			
		</view>
		
		<view class="p-mask" :class="maskShow?'maskAnimate':''">
			<view class="p-mask-container">
				<view class="p-mask-title flex align-center justify-center">{{maskCon.title?maskCon.title:maskCon.name}}</view>
				<view class="p-mask-content" v-html="maskCon.content"></view>
				<view class="p-mask-close">
					<text class="cuIcon-close" @click="showMask('close')"></text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
var that
import { costOrders } from '@/utils/api.js';
export default {
	data() {
		return {
			list: [],
			person: 0,
			maskShow: false,
			maskCon: '',
			matchInsurance: []
		};
	},
	props:{
		mid: {
			type: String,
			default: ''
		}
	},
	mounted() {
		that = this
		let matchSetting = uni.getStorageSync('matchSetting')
		let matchInsurance = uni.getStorageSync('matchInsurance')
		let giftBag = uni.getStorageSync('giftBag')
		let insuranceinfo = uni.getStorageSync('insuranceinfo')
		let carInfo = uni.getStorageSync('carInfo')
		let person = 0
		if(!!carInfo){
			carInfo.map((item,index) => {
				item.racer_info.map((iteml,indexl) => {
					person++
				})
			})
			console.log(person);
			that.person = person
		}
		if(!!matchInsurance){
			matchInsurance.map((item,index) => {
				item.limitnum = item.limitnum * 1
				if(!!insuranceinfo){
					insuranceinfo.map((iteml,indexl) => {
						if(item.type == '1'){
							item.num = person
						} else {
							item.num = iteml.num
						}
					})
				}
			})
			console.log(matchInsurance);
			that.matchInsurance = matchInsurance
		}
		if(!!matchSetting){
			let list = matchSetting.extraservice
			list.map((item,index) => {
				item.module_info.map((iteml,indexl) => {
					iteml.limitnum = iteml.limitnum * 1
					if(!!giftBag){
						giftBag.map((itemg,indexg) => {
							// {module:item.module,id: iteml.id,num: iteml.num}
							if(itemg.module == item.module && itemg.id == iteml.id){
								iteml.num = itemg.num
							}
						})
					} else {
						iteml.num = 0
					}
				})
			})
			console.log(list);
			that.list = list
		}
	},
	methods: {
		backroute(){
			that.$emit('backroute')
		},
		changeNumber(e){
			console.log(e);
			if(!e.ismt){
				let { list } = that
				list.map((item,index) => {
					item.module_info.map((iteml,indexl) => {
						if(index == e.bindex && indexl == e.sindex){
							this.$set(iteml,'num',e.value);
						}
					})
				})
				console.log(list);
			} else {
				let { matchInsurance } = that
				matchInsurance.map((item,index) => {
					if(index == e.mtindex){
						this.$set(item,'num',e.value);
					}
				})
				console.log(matchInsurance);
			}
		},
		setStor(e){
			let { list, matchInsurance} = that
			let giftBag = []
			list.map((item,index) => {
				item.module_info.map((iteml,indexl) => {
					giftBag.push({module:item.module,id: iteml.id,num: iteml.num})
				})
			})
			console.log(giftBag);
			uni.setStorageSync('giftBag',giftBag)
			let insuranceinfo = []
			matchInsurance.map((item,index) => {
				insuranceinfo.push({id: item.id,num: item.num})
			})
			console.log(insuranceinfo);
			uni.setStorageSync('insuranceinfo',insuranceinfo)
			let groupInfo = uni.getStorageSync('groupInfo')
			let carInfo = uni.getStorageSync('carInfo')
			groupInfo.car_info = carInfo
			let data = {
				mid: that.mid,
				l_uid: uni.getStorageSync('midUid'),
				insuranceinfo: JSON.stringify(insuranceinfo),
				info: JSON.stringify(giftBag),
				entry_info: JSON.stringify([groupInfo])
			}
			
			uni.setStorageSync('requestData',data)
			that.costOrders(data)
			
		},
		costOrders(data){//提交订单
			console.log('costOrders:',data);
			costOrders(data).then(res => {
				console.log('costOrders', res);
				let response = res.data
				if (response.rspInfo.rspCode == 1000) {
					that.costOrder = response.rspData
					uni.setStorageSync('costData',response.rspData)
					uni.showLoading()
					setTimeout(function(){
						uni.hideLoading()
						that.next()
					},1000)
				}else{
					that.showToast(response.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
			
		},
		prev(){
			this.$emit('steptap',0)
		},
		next(){
			console.log('next');
			this.$emit('steptap',2)
		},
		
		showMask(e,v){
			console.log(e);
			if(e == 'open'){
				this.maskShow = true
				this.maskCon = v
			} else {
				this.maskShow = false
				this.maskCon = ''
			}
		},
	}
};
</script>

<style lang="scss">
// @import "../../static/css/pcommon.css";
.inputorder2-3 {
	.step-bottom {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 999;
		background-color: #FF7A22;
		line-height: 120rpx;
		text-align: center;
		color: #fff;
		font-size: 40rpx;
	}
	.introduce-bg{
		font-size: 20rpx;
		color: #757575;
		line-height: 32rpx;
		.intro-title{
			font-size: 44rpx;
			color: #5B5B5B;
			line-height: 90rpx;
			text-align: center;
		}
		.intro-one{
			margin-bottom: 20rpx;
		}
	}
	.giftbg{
		display: flex;
		align-items: center;
		padding: 30rpx 0;
		border-top: 1px solid #e6e6e6;
		justify-content: space-between;
		.gift-cont{
			width:320rpx;
			.gift-title{
				font-size: 26rpx;
				color: #5B5B5B;
				font-weight: 600;
				line-height: 48rpx;
			}
			.gift-text{
				font-size: 20rpx;
				line-height: 38rpx;
				color: #B7B7B7;
				.huang{
					color: #FF7A22;
					font-size: 22rpx;
				}
			}
		}
	}
	
	.p-item{
		padding: 40rpx 0;
		position: relative;
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1rpx;
			background-color: #CBCBCB;
		}
		.p-item-left{
			border: 1px solid #CFCFCF;
			border-radius: 16rpx;
			image{
				width: 138rpx;
				height: 138rpx;
				margin: 30rpx 14rpx;
			}
			.p-item-left-des{
				font-size: 24rpx;
				color: #7C7C7C;
				width: 100%;
				background: #F0F0F0;
				line-height: 44rpx;
				text-align: center;
				text{
					font-size: 26rpx;
					color: #000;
				}
			}
		}
		.p-item-content{
			margin-left: 20rpx;
			.p-item-content-title{
				font-size: 36rpx;
				color: #000000;
				text{
					font-size: 40rpx;
					color: #666;
					margin-left: 20rpx;
				}
			}
			.p-item-content-des{
				font-size: 26rpx;
				color: #A1A1A1;
			}
			.numbg .uni-numbox{
				width: 100%;
				height: 90rpx;
				.uni-numbox__minus{
					flex: 1;
					width: 100rpx;
				}
				.uni-numbox__value{
					flex: 1;
				}
				.uni-numbox__plus{
					flex: 1;
				}
			}
		}
	}
	.p-step-bot{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		// padding: 20rpx 30rpx;
		font-size: 40rpx;
		text-align: center;
		// line-height: 120upx;
		height: calc(120rpx + constant(safe-area-inset-bottom) / 2);
		height: calc(120rpx + env(safe-area-inset-bottom) / 2);
		padding-bottom: calc(constant(safe-area-inset-bottom) / 2);
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);
		background-color: #fff;
		.p-btn-prev{
			width: 160rpx;
			height: 120rpx;
			line-height: 120rpx;
			font-size: 46rpx;
			color: #fff;
			background: #000;
			// margin-right: 30rpx
		}
		.p-btn-submit{
			font-size: 40rpx;
			height: 120rpx;
			line-height: 120rpx;
			color: #FFFFFF;
			background: #EA5A5C;
			border-radius: 0;
			&::after{
				display: none;
			}
		}
	
	}
	.gifNone{
		padding: 80rpx 0;
		.gifnone-img{
			width: 200rpx;
			height: 200rpx;
		}
	}
	.p-mask{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.9);
		z-index: 9999;
		color: #fff;
		transition: all 0.2s linear;
		transform: translateY(100vh);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		.p-mask-container{
			padding: 80rpx 50rpx 60rpx;
			font-size: 28rpx;
			width: 100%;
			height: calc(100% - 230rpx);
			overflow-y: auto;
			padding-bottom: 100rpx;
			box-sizing: border-box;
			.p-mask-title{
				font-size: 36rpx;
			}
			.p-mask-content{
				padding: 30rpx 0;
				margin: 30rpx 0;
				// border-top: 1rpx solid #fff;
				// border-bottom: 1rpx solid #fff;
				.p-mask-list{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 20rpx 0;
				}
			}
			.p-mask-bot{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.p-mask-close{
				position: fixed;
				left: 50%;
				bottom: 150rpx;
				width: 80rpx;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1rpx solid #fff;
				border-radius: 100%;
				font-size: 40rpx;
				transform: translateX(-40rpx);
			}
		}
	}
	.p-mask.maskAnimate{
		transform: translateY(0);
	}
	.maskAnimate{
		animation: myMask 0.5s 1;
		animation-timing-function: ease;
		animation-fill-mode: forwards;
	}
	
	@keyframes myMask {
		from {
			bottom: 100vh;
		}
	
		to {
			bottom: 0;
		}
	}
}
</style>
