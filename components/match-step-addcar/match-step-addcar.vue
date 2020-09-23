<template>
	<view>
		<view class="pop-content pop-car pop-inputorder2-addcar" :style="{paddingTop: customBar + 15 + 'px'}">
			<view class="addcarbg">
				<form @submit="addSubmit">
					<scroll-view class="trys" scroll-y>
						<view class="title-bg">
							保险预定
							<view class="close flex align-center justify-center" @click="close">
								<image class="" src="https://enroll-api.activitysign.com/3/images/inputorder2/close.png"></image>
								
							</view>
						</view>
						<view class="cont-p">1.阿拉善英雄会报名免费。但为安全保障，推荐每位 参与者购买保险。</view>
						<view class="cont-p">2.本表单收集保险预订信息。保险自愿购买，不购买 保险的人员无需在表中填写。</view>
						<view class="cont-p">
							3.表中填写的每人将按照120/人购买保险。xxxx保 险为阿拉善英雄会专业定制承保。
							<text class="orange">[ 保险细则条款 ]</text>
						</view>
						<view class="cont-p">4.大漠壮丽，风险与存。为了安全保障，推荐每个参 加人员填写表单，购买保险。</view>
						<view class="carinfo-bg">
							<view class="car-card-bg">
								<picker class="card-left flex align-center justify-center" @change="bindPickerChange" :value="courtryIndex" :range="courtryItem" name="dq">
									<view class="uni-input">{{courtryItem[courtryIndex]}}</view>
								</picker>
								<input name="carcode" type="text" v-model="carcode" class="card-input" placeholder="请输入车牌号" />
								<input name="carnumbber" type="text" :value="courtryItem[courtryIndex] + carcode" hidden />
							</view>
							<view class="card-type-bg">
								<view class="card-brand card-brand1 flex align-center">
									<view class="label text-sm">车型：</view>
									<picker class="brand-input flex align-center text-cut" mode="multiSelector" @change="carChange" @columnchange="carColumnChange" :value="carIndex" :range="carArray">
										<view class="uni-input elp1 flex align-center text-sm">
											{{carIndex[0] == -1?'请选择车型':carArray[1][carIndex[1]]}}
										</view>
									</picker>
									<input name="brand" :value="carArray[0][carIndex[0]]" hidden></input>
									<input name="model" :value="carArray[1][carIndex[1]]" hidden></input>
								</view>
								<view class="card-brand flex align-center">
									<view class="label text-sm">排量：</view>
									<picker class="brand-input flex align-center text-cut" mode="multiSelector" @change="plChange" :value="plIndex" :range="plArray" name="pl">
										<view class="uni-input elp1 flex align-center text-sm">
											{{plIndex[0] == -1?'请选择排量':plArray[0][plIndex[0]] + '.' + plArray[1][plIndex[1]] + plArray[2][plIndex[2]]}}
											<!-- {{plArray[0][plIndex[0]] + '.' + plArray[1][plIndex[1]] + plArray[2][plIndex[2]]}} -->
										</view>
									</picker>
									<input name="displacement" :value="plArray[0][plIndex[0]] + '.' + plArray[1][plIndex[1]] + plArray[2][plIndex[2]]" hidden></input>
									<input name="displacement1" :value="plArray[0][plIndex[0]]" hidden></input>
									<input name="displacement2" :value="plArray[1][plIndex[1]]" hidden></input>
									<input name="displacement3" :value="plArray[2][plIndex[2]]" hidden></input>
								</view>
							</view>
						</view>
						<view class="cont-input-bg">
							<view class="inp-bg">
								<view class="input-one" v-for="(item,index) in list" :key="index">
									<view class="p-delete flex align-center justify-center text-white" v-if="index > 0" @click="deleteList(index)">
										<text class="cuIcon-close"></text>
									</view>
									<view class="one-title">
										<image class="one-img" src="https://enroll-api.activitysign.com/3/images/inputorder2/jiashi.png" mode=""></image>
										<view class="one-titl">{{index==0?'赛手':'乘客' + index}}</view>
										<view class="one-warning padding-left-xs" v-if="errIndex == index">{{'*' + errInfo}}</view>
									</view>
									<view class="one-input-bg">
										<view class="one-in">
											<view class="label">姓名：</view>
											<input class="one-inpu" v-model="list[index].name" type="text" placeholder="请输入姓名" />
										</view>
										<view class="one-in">
											<view class="label">手机号：</view>
											<input class="one-inpu" v-model="list[index].mobile" type="number" maxlength="11" placeholder="请输入手机号" />
										</view>
										<view class="one-in">
											<view class="label">身份证号：</view>
											<input class="one-inpu" v-model="list[index].idcard" type="idcard" placeholder="请输入身份证号" />
										</view>
									</view>
								</view>
							</view>
							<view class="p-add margin-top flex align-center justify-center" v-if="list.length < 5">
								<view class="p-add-icon flex align-center justify-center text-white" @click="add">
									<text class="cuIcon-add"></text>
								</view>
							</view>
							<button class="sub" style="margin-top: 50rpx;" form-type="submit">确定</button>
						</view>
						
					</scroll-view>
				
				</form>
			</view>
		</view>
	</view>
</template>

<script>
var that
import { getOrderSign, checkMember20 } from '@/utils/api.js';
import {carCx, citys} from '../../common/js/carCx.js' 
import WxValidate from '../../common/js/WxValidate.js'
export default {
	data() {
		return {
			courtryItem: citys,
			courtryIndex:0,
			carArray: [[],[]],
			carIndex: [0,0],
			userinfo:[],
			userextra:[],
			usercards: [],
			matchSetting: [],
			matchInfoDatas: '',
			carData: [],
			errIndex: null,
			errInfo: '',
			plArray:[
				[0,1,2,3,4,5,6,7,8],
				[0,1,2,3,4,5,6,7,8,9],
				['T','L']
			],
			plIndex: [2,0,0],
			uids: [],
			carcode: '',
			storageData: {
				
			},
			submitData: {},
			entryInfo: {},
			carInfo: [],
			racerInfo: [],
			isRequest: [],
			list: [],
			customBar: this.CustomBar

		};
	},
	props: {
		pIndex: {
			type: Number,
			default: 0
		},
		isAdd: {
			type: Boolean,
			default: false
		},
		mid: {
			type: String,
			default: ''
		},
		
	},
	beforeCreate() {
	},
	mounted(){
		that = this
		// that.getOrderSign()
		that.initValidate()
		console.log(that.pIndex);
		console.log(that.isAdd);
		console.log(carCx);
		let carArray = [[],[]]
		carArray[0] = carCx[0]
		carArray[1] = carCx[1][0]
		that.carArray = carArray
		console.log(this.carArray);
		that.list = []
		that.add()
		// {
		// 	brand: "",
		// 	model: "",
		// 	displacement: "",
		// 	color: "",
		// 	carnumbber: "",
		// 	racer_info: [
		// 		{
		// 			racerid: "",//用户ID
		// 			racername: "",
		// 			roleid: '',// 身份ID
		// 		}
		// 	],
		// }
		let carInfo = uni.getStorageSync('carInfo')
		console.log(carInfo);
		if(!!carInfo){
			that.carInfo = carInfo
		}
		// let storageData = uni.getStorageSync('storageData')
		// let storageData = uni.getStorageSync('carTop' + that.pIndex)
		// console.log('mounted-storageData:',storageData);
		// if(!that.isAdd && storageData.pindex == that.pIndex){
		// 	that.carIndex = storageData.carIndex
		// 	that.plIndex = storageData.plIndex
		// 	that.courtryIndex = storageData.courtryIndex
		// 	that.storageData = storageData
		// 	carArray[1] = carCx[1][that.carIndex[0]]
		// 	that.carArray = carArray
		// } else {
		// 	console.log(storageData);
		// 	// that.carIndex = [-1,-1]
		// 	// that.plIndex = [-1,-1,-1]
		// 	// that.courtryIndex = 0
		// }
	},
	onShow() {
		console.log('onShow');
	},
	methods: {
		bindPickerChange(e) {
			that.courtryIndex = e.target.value;
		},
		getOrderSign(){//得到活动详情
			console.log(that.$route.query)
			let data = {mid: that.$route.query.mid}
			getOrderSign(data).then(res => {
				console.log('getOrderSign:',res);
				let response = res.data
				if (response.rspInfo.rspCode == 1000) {
					that.matchInfoDatas = response.rspData;
					let userinfo =  response.rspData.userinfo.map(r =>{
						var data = {"field":r.field,"desc":r.desc,"value":'',show:r.desc+'不能为空'};
						return data;
					});
					let usercards = response.rspData.usercards.map(r =>{
						var data = {"field":r.field,"desc":r.desc,"value":'',show:r.desc+'不能为空'};
						return data;
					});
					let userextra = response.rspData.userextra.map(r =>{
						let data
						if(r.type!="picload"){
							data = {
								"title":r.title,
								"type":r.type,
								"validate":r.validate,
								"item":r.item,
								"value":"",
								show:r.title+'不能为空',
							};
						}else{
							data = {
								"title":r.title,
								"type":r.type,
								"validate":r.validate,
								"item":r.item,
								"value":"https://enroll-api.activitysign.com/3/images/add-icon.png",
								show:r.title+'不能为空'};
						}
						return data;
					})
					this.userinfo = userinfo
					this.usercards = usercards
					this.userextra = userextra
					console.log('userinfo:',userinfo);
					console.log('usercards:',usercards);
					console.log('userextra:',userextra);
					let len = that.matchSetting.length
					let carData = []
					let deepClone = function (obj) {
						let _tmp = JSON.stringify(obj);//将对象转换为json字符串形式
						let result = JSON.parse(_tmp);//将转换而来的字符串转换为原生js对象
						return result;
					};
					let isRequest = []
					for(let i = 0; i < len; i++){
						let item = {userinfo: deepClone(userinfo),usercards: deepClone(usercards),userextra: deepClone(userextra),required: that.matchSetting[i].required}
						carData.push(item)
						isRequest.push(-1)
					}
					
					console.log('isRequest:',isRequest);
					that.isRequest = isRequest
					console.log('carData:',carData);
					// console.log('setStorageSync');
					if(!that.isAdd){
						let carDatas = uni.getStorageSync('carData' + that.pIndex)
						that.carData = carDatas
					} else {
						that.carData = carData
						// uni.setStorageSync('carData' + that.pIndex,carData)
						that.setStorageSyncs('carData' + that.pIndex,carData)
						
					}
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		addSubmit(e){
			let value = e.detail.value
			if (!that.WxValidate.checkForm(value)) {
				const error = this.WxValidate.errorList[0]
				console.log(error)
				this.showToast(error.msg)
				return 
			}
			console.log(e);
			// that.submitData = value
			let { carInfo, carData, list } = that
			let storageData = {
				pindex: that.pIndex,
				carIndex: that.carIndex, //车型
				plIndex: that.plIndex, //排量
				courtryIndex: that.courtryIndex, //车牌归属地
				...value,
				list: list
			}
			console.log('storageData:',storageData);
			that.storageData = storageData
			let isReturn = false
			let isBreak = false
			console.log(list);
			for(let i=0;i<list.length;i++){
				if(!list[i].name || !list[i].idcard || !list[i].mobile){
					// that.showToast('请正确填写信息')
					that.errIndex = i
					that.errInfo = '请正确填写信息'
					return
				} else if(!that.idcard(list[i].idcard)){
					that.errIndex = i
					that.errInfo = '请输入正确的身份证号'
					return
				} else if(!that.tel(list[i].mobile)){
					that.errIndex = i
					that.errInfo = '请输入正确的手机号'
					return
				} else {
					that.errIndex = null
					that.errInfo = ''
					
				}
			}
			let data = {userinfo: JSON.stringify(list),mid: that.mid}
			console.log(data);
			
			that.checkMember20(data)
		},
		checkMember20(data){
			console.log(data);
			checkMember20(data).then(res => {
				console.log('checkMember', res);
				let response = res.data
				if(response.rspInfo.rspCode == 1000){
					let {carInfo, entryInfo, storageData, matchSetting, carData, isRequest } = that
					let caritem = {
						brand: "",
						model: "",
						displacement: "",
						color: "",
						carnumbber: "",
						racer_info: [],
					}
					// let racerinfo = {
					// 	racerid: "",//用户ID
					// 	racername: "",
					// 	roleid: '',// 身份ID
					// }
					caritem.brand = storageData.brand
					caritem.carnumbber = storageData.carnumbber
					caritem.displacement = storageData.displacement
					caritem.model = storageData.model
					response.rspData.map((item,index) => {
						storageData.list.map((iteml,indexl) => {
							if(iteml.idcard == item.idcard){
								if(indexl == 0){
									caritem.racer_info.push({racerid: item.uid,roleid: '3',racername: iteml.name,role:'赛手'})
								} else {
									caritem.racer_info.push({racerid: item.uid,roleid: '4',racername: iteml.name,role:'乘客'})
								}
							}
						})
					})
					carInfo.push(caritem)
					// if(that.isAdd){
					// 	carInfo.push(caritem)
						
					// } else {
					// 	carInfo.splice(carInfo,that.pIndex,caritem)
					// }
					that.carInfo = carInfo
					
					uni.setStorageSync('carInfo',carInfo)
					console.log(carInfo);
					that.$emit('carinfos',carInfo)
					// that.$emit('isnexts',true)
					that.close()
				} else {
					that.showToast(response.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		checkMember(data,i){//
			data.mid = that.$route.query.mid
			console.log(data);
			console.log(i);
			checkMember(data).then(res => {
				console.log('checkMember', res);
				let response = res.data
				if (response.rspInfo.rspCode == 1000) {
					that.errIndex = null
					let {carInfo, entryInfo, storageData, matchSetting, carData, isRequest } = that
					carInfo[that.pIndex].brand = storageData.brand
					carInfo[that.pIndex].carnumbber = storageData.carnumbber
					carInfo[that.pIndex].displacement = storageData.displacement
					carInfo[that.pIndex].model = storageData.model
					carInfo[that.pIndex].racer_info.map((item,index) => {
						if(index == i){
							item.racerid = response.rspData.uid
							item.racername = carData[i].userinfo[0].value
							// item.roleid = matchSetting[index].roleid
							// item.required = matchSetting[index].required
						}
					})
					console.log(carInfo);
					that.carInfo = carInfo
					uni.setStorageSync('carInfo',carInfo)
					isRequest.splice(i,1,i)
					console.log(isRequest);
					that.isRequest = isRequest
					if(isRequest.includes(-1)){
						return
					} else {
						// let storageData = that.storageData
						that.setStorageSyncs('carTop' + that.pIndex,storageData)
						console.log('storageData:',storageData);
						// that.setStorageSyncs('carTop' + that.pIndex,that.storageData)
						that.setStorageSyncs('carData' + that.pIndex,that.carData)
						that.$emit('carinfo',carInfo)
						that.$emit('isnexts',true)
						that.close()
					}
				}else{
					that.errIndex = i
					that.errInfo = response.rspInfo.rspDesc
					that.showToast(response.rspInfo.rspDesc)
				}
			})
			.catch(err => {
				that.showToast(err.text)
				console.log(err);
			});
		},
		carChange(e) {
			console.log(e)
			let value = e.detail.value
			
			that.carIndex = value
		},
		carColumnChange(e) {
			// console.log(e)
			that.carIndex[e.detail.column] = e.detail.value
			switch (e.detail.column) {
				case 0: //拖动第1列
					that.carArray[1] = carCx[1][e.detail.value]
					that.carIndex.splice(1, 1, 0)
					break
			}
		},
		plChange(e){
			console.log(e);
			let value = e.detail.value
			let newArr = []
			newArr = value.map(item => {
				if(item == -1){
					return 0
				}
				return item
			})
			console.log(newArr);
			that.plIndex = newArr
		},
		close() {
			that.$emit('close');
			that.storageData = {}
		},
		setStorageSyncs(e,v){
			console.log('setStorageSync:',e);
			console.log('setStorageSync:',v);
			uni.setStorageSync(e,v)
		},
		add(){
			let item = {name: '',idcard: '',mobile: ''}
			that.list.push(item)
		},
		deleteList(i){
			console.log(i);
			uni.showModal({
				title: '提示',
				content: '确定删除吗？',
				success(res) {
					if(res.confirm){
						uni.showLoading()
						setTimeout(function(){
							that.list.splice(i,1)
							uni.hideLoading()
						},1000)
					}
				}
			})
		},
		tel(value) {
		  return  /^([1][3,5,6,7,8,9])\d{9}$/.test(value)
		},
		idcard(value) {
			return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
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
				carcode: {
					required: true,
					minlength: 6,
					maxlength: 6
				},
				brand: {
					required: true,
				},
				model: {
					required: true,
				},
				displacement1: {
					required: true,
				},
				displacement2: {
					required: true,
				},
				displacement3: {
					required: true,
				},
		    }
		    const messages = {
				carcode: {
					required: '车牌号不能为空',
					minlength: '请输入正确的车牌号',
					maxlength: '请输入正确的车牌号'
				},
				brand: {
					required: '请选择车型',
				},
				model: {
					required: '请选择车型',
				},
				displacement1: {
					required: '请选择排量',
				},
				displacement2: {
					required: '请选择排量',
				},
				displacement3: {
					required: '请选择排量',
				},
				
		    }
		    // 创建实例对象
		    that.WxValidate = new WxValidate(rules, messages)
		},
	}
};
</script>

<style lang="scss">
// @import '@/common/style/style.scss';
// @import "../../static/css/pcommon.css";
.pop-content {
	height: 100vh;
	/*#ifdef H5*/
	// height: 80vh;
	/*#endif*/
	background: rgba(0, 0, 0, 0.7);
	box-sizing: border-box;
	position: relative;
	z-index: 999;
	padding: 30rpx 35rpx;
	.addcarbg {
		height: 100%;
		overflow: auto;
		.trys{
			height: 100%;
		}
	}
}
	.pop-inputorder2-addcar{
		.addcarbg{
			.title-bg{
				font-size: 36rpx;
				color: #FFFFFF;
				text-align: center;
				line-height:100rpx;
				color:#fff;
				position: relative;
				.close{
					position: absolute;
					right:20rpx;
					top:20rpx;
					width:60rpx;
					height: 60rpx;
					image{
						width: 30rpx;
						height: 30rpx;
					}
				}
			}
			.cont-p{
				padding:0 60rpx;
				color: #fff;
				font-size: 24rpx;
				line-height: 30rpx;
				margin-bottom: 16rpx;
				.orange{
					color:  #FF7A22;
				}
			}
			.carinfo-bg{
				width:644rpx;
				height: 278rpx;
				margin:100rpx auto 0;
				overflow: hidden;
				background:url(https://enroll-api.activitysign.com/3/images/inputorder2/whitecar.png) no-repeat center top;
				background-size: 644rpx 278rpx;
				.car-card-bg{
					margin:28rpx 0 14rpx 210rpx;
					border: 1px solid #DEDEDE;
					border-radius: 16rpx;
					width:350rpx;
					height: 80rpx;
					display: flex;
					overflow: hidden;
					.card-left{
						width:150rpx;
						font-size: 32rpx;
						color: #000;
						text-align: center;
						line-height: 80rpx;
						border-right:1px solid #DEDEDE;
						.uni-input{
							padding: 0;
						}
					}
					.card-input{
						font-size: 30rpx;
						color: #333;
						height: 80rpx;
						line-height: 80rpx;
						padding:0 20rpx;
					}
				}
				.card-type-bg{
					border: 1px solid #DEDEDE;
					margin-left: 60rpx;
					border-radius: 16rpx;
					width:498rpx;
					height: 80rpx;
					display: flex;
					.card-brand{
						width: 50%;
						font-size: 24rpx;
						color: #666;
						&.card-brand1{
							border-right:1px solid #DEDEDE;
						}
						.label{
							width: 90rpx;
							text-align: right;
						}
						.brand-input{
							width: calc(100% - 100rpx);
							height: 60rpx;
							line-height: 60rpx;
							font-size: 28rpx;
							color: #777;
							.uni-input{
								width:100%;
								height: 60rpx;
								padding: 0;
							}
						}
					}
				}
			}
			.cont-input-bg{
				background-color: #fff;
				padding:0 40rpx 120rpx;
				margin-top: -6rpx;
				border-radius: 40rpx;
				position: relative;
				overflow: hidden;
				.input-one{
					padding-top: 54rpx;
					position: relative;
					.p-delete{
						width:60rpx;
						height: 60rpx;
						position: absolute;
						right:0;
						top: 74rpx;
						border-radius: 50%;
						background-color: #999;
					}
					.one-title{
						display: flex;
						padding-left:20rpx;
						line-height: 54rpx;
						height: 54rpx;
						align-items: center;
						.one-img{
							width:54rpx;
							height: 54rpx;
						}
						.one-titl{
							font-size: 36rpx;
							color: #282828;
							padding:0 15rpx 0 8rpx;
						}
						.one-warning{
							font-size: 22rpx;
							color: #303976;
						}
					}
					.one-input-bg{
						margin-top: -10rpx;
						border-radius: 30rpx;
						border: 2px solid #F2F2F2;
						box-shadow: 0 0 16rpx 0 rgba(224,224,224,0.50);
						.one-in{
							border-bottom: 1rpx solid #F2F2F2;
							height: 90rpx;
							padding:0 32rpx;
							display: flex;
							align-items: center;
							.label{
								font-size: 28rpx;
								color: #818181;
								// width:140rpx;
							}
							.one-inpu{
								height: 90rpx;
								flex:1;
								font-size: 28rpx;
								color: #818181;
							}
						}
						.no-border{
							border: 0;
						}
					}
				}
				.add-button{
					width: 110rpx;
					display: block;
					height: 110rpx;
					margin:70rpx auto 50rpx;
				}
				.sub{
					width: 100%;
					height: 90rpx;
					display: block;
					text-align: center;
					line-height: 90rpx;
					background: #616161;
					font-size: 36rpx;
					position: absolute;
					bottom: 0;
					left: 0;
					border-radius: 0;
					color: #FFFFFF;
					&::after{
						border-radius: 0;
					}
				}
				.p-add{
					
					.p-add-icon{
						width: 112rpx;
						height: 112rpx;
						// padding: 40rpx;
						border-radius: 50%;
						background-color: #999;
						font-size: 80rpx;
					}
				}
			}
		}
	}
</style>
