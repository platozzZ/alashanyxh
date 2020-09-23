<template>
	<view>
		<view class="pop-content pop-car pop-inputorder2-addcar" :style="{paddingTop: customBar + 15 + 'px'}">
			<view class="addcarbg">
				<form @submit="addSubmit">
					<scroll-view class="trys" scroll-y>
						<view class="title-bg">
							<!-- 保险预定 -->
							填写车辆信息
							<view class="close flex align-center justify-center" @click="close">
								<image class="" src="https://enroll-api.activitysign.com/3/images/inputorder2/close.png"></image>
							</view>
						</view>
						<!-- <view class="cont-p">1.阿拉善英雄会报名免费。但为安全保障，推荐每位 参与者购买保险。</view>
						<view class="cont-p">2.本表单收集保险预订信息。保险自愿购买，不购买 保险的人员无需在表中填写。</view>
						<view class="cont-p">
							3.表中填写的每人将按照120/人购买保险。xxxx保 险为阿拉善英雄会专业定制承保。
							<text class="orange">[ 保险细则条款 ]</text>
						</view>
						<view class="cont-p">4.大漠壮丽，风险与存。为了安全保障，推荐每个参 加人员填写表单，购买保险。</view> -->
						<view class="carinfo-bg">
							<view class="car-card-bg">
								<!-- <view class="card-left">京</view> -->
								<picker class="card-left flex align-center justify-center" @change="bindPickerChange" :value="courtryIndex" :range="courtryItem" name="dq">
									<view class="">{{courtryItem[courtryIndex]}}</view>
								</picker>
								<input name="carcode" type="text" maxlength="6" v-model="carCode" @input="carCodeInput" class="card-input" placeholder="请输入车牌号" />
								<input name="carnumbber" type="text" :value="courtryItem[courtryIndex] + carCode" hidden />
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
								<view class="input-one" v-for="(item,index) in matchSetting" :key="item.role">
									<view class="one-title">
										<image class="one-img" src="https://enroll-api.activitysign.com/3/images/inputorder2/jiashi.png" mode=""></image>
										<view class="one-titl">{{item.role}}</view>
										<view class="one-warning" v-if="errIndex == index && item.required == '1'">*{{errInfo}}</view>
									</view>
									<view class="one-input-bg" v-if="!!userinfo">
										<view class="one-in" v-for="(iteml, indexl) in userinfo" :key="iteml.desc">
											<view class="label">{{iteml.desc}}：</view>
											<input class="one-inpu" :name="iteml.field" type="text" v-model="carData[index].userinfo[indexl].value" :placeholder="'请输入'+iteml.desc" />
										</view>
										<view class="one-in" v-for="(itemc, indexc) in usercards" :key="itemc.desc">
											<view class="label">{{itemc.desc}}：</view>
											<input class="one-inpu" :name="itemc.field" type="text" v-model="carData[index].usercards[indexc].value" placeholder="港澳台/国外友人请现场报名" />
										</view>
										
										<view class="one-in" v-for="(iteme, indexe) in userextra" :key="iteme.title" style="display: none;">
											<view class="concat-list" v-if="iteme.type=='text'">
												<view class="label">{{iteme.title}}：</view>
												<input type="text" class="concat-input" v-model="iteme.value" placeholder-class="pla" :placeholder="'请输入'+iteme.title" />
											</view>
											<view class="concat-list" v-if="iteme.type=='textarea'">
												<view class="label">{{iteme.title}}：</view>
												<textarea class="textarea" v-model="iteme.value" placeholder-class="pla" :placeholder="'请输入'+iteme.title" /> 
											</view>
											<view class="concat-list"  v-if="iteme.type=='radio'">
												<view class="label">{{iteme.title}}：</view>
												<view class="choosed">
													<radio-group  @change="radiocheck" :data-index="indexe">
														<view v-for="(ite,index2) in iteme.item" :key="index2"><label class="radio"><radio :value="ite.value" />{{ite.name}}</label></view>
													</radio-group>
												</view>
											</view>
											<view class="concat-list" v-if="iteme.type=='checkbox'">
												<view class="label">{{iteme.title}}：</view>
												<view class="choosed">
													<checkbox-group @change="checkboxcheck" :data-index="indexe">
														<view v-for="(ite,index2) in iteme.item" :key="index2"><label class="checkbox"><checkbox :value="ite.value" />{{ite.name}}</label></view>
													</checkbox-group>
												</view>
											</view>
											<view class="concat-list" v-if="iteme.type=='time'">
												<view class="label">{{iteme.title}}：</view>
												<input type="text" class="concat-input" :data-index = 'indexe' disabled @click="showtime" v-model="iteme.value" placeholder-class="pla" :placeholder="'请选择'+iteme.title" />
											</view>
											<view class="concat-list" v-if="iteme.type=='picload'">
												<view class="label">{{iteme.title}}：</view>
												<view class="choosedimg">
													<!-- <view v-if="poster.length==0" class="add-head-pic inline" @click="uploadpic">
														<image class="imgdefault" src="https://enroll-api.activitysign.com/3/images/add-icon.png" mode=""></image>
													</view> -->
													<image class="img-top" :data-index="indexe" :src="iteme.value" @click="uploadpic" mode="aspectFill"></image>
												</view>
											</view>
										</view>
										
									</view>
								</view>
								
							</view>
							<!-- <view class="sub" style="margin-top: 50rpx;" @click="addSubmit">确定</view> -->
							<button class="sub" style="margin-top: 50rpx;" form-type="submit">确定</button>
							<!-- <button form-type="reset">Reset</button> -->
						</view>
						
					</scroll-view>
				
				</form>
			</view>
		</view>
	</view>
</template>

<script>
var that
import { getOrderSign, checkMember } from '@/utils/api.js';
import {carCx, citys} from '../../common/js/carCx.js' 
import WxValidate from '../../common/js/WxValidate.js'
export default {
	data() {
		return {
			carCx,
			courtryItem: citys,
			courtryIndex:0,
			carArray: [[],[]],
			carIndex: [-1,-1],
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
			plIndex: [-1,-1,-1],
			uids: [],
			carCode: '',
			storageData: {
				
			},
			submitData: {},
			entryInfo: {},
			carInfo: [],
			racerInfo: [],
			isRequest: [],
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
		}
	},
	mounted(){
		that = this
		that.getOrderSign()
		that.initValidate()
		console.log(that.pIndex);
		console.log(that.isAdd);
		console.log(that.mid)
		let carArray = that.carArray
		carArray[0] = carCx[0]
		carArray[1] = carCx[1][0]
		that.carArray = carArray
		let matchSetting = uni.getStorageSync('matchSetting')
		that.matchSetting = matchSetting.usercargroups.carSetting[that.pIndex].setting
		console.log(that.matchSetting);
		
		let carInfo = uni.getStorageSync('carInfo')
		console.log(carInfo);
		that.carInfo = carInfo
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
		// console.log(that.carArray);
	},
	methods: {
		carCodeInput(e){
			console.log(e);
			setTimeout(function(){
				let val = e.detail.value;
				if (/[^a-zA-Z0-9]/g.test(val)) { // 先过滤不需要的字符，只保留数字和字母
					val = val.replace(/[^a-zA-Z0-9]/g, '');
				}
				console.log(val);
				if (!/^[A-Z\d]+$/.test(val)) {// 再进行转换，小写转为大写
					val = val.toUpperCase();
				}
				console.log(val);
				that.carCode = val
			},3)
			// return val; // 最后输出值，要保证输入框的值和value绑定的值一致
			// that._timer = setTimeout(()=>{
				
			// },3)
			
		},
		bindPickerChange(e) {
			that.courtryIndex = e.target.value;
		},
		getOrderSign(){//得到活动详情
			console.log(that);
			console.log(that.mid)
			let data = {mid: that.mid}
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
			let storageData = {
				pindex: that.pIndex,
				carIndex: that.carIndex, //车型
				plIndex: that.plIndex, //排量
				courtryIndex: that.courtryIndex, //车牌归属地
				...value
			}
			console.log('storageData:',storageData);
			that.storageData = storageData
			console.log(that.carData);
			let isReturn = false
			let isBreak = false
			let { carInfo, carData } = that
			for(let i=0; i< carData.length; i++){
				for(let j=0; j<carData[i].userinfo.length; j++){
					console.log(i,j);
					console.log(carData[i].userinfo[j].value);
					if(carData[i].required == '1' && !carData[i].userinfo[j].value){
						that.showToast(carData[i].userinfo[j].show)
						return;
					} else if(carData[i].userinfo[j].field == 'mobile'){
					console.log(that.tel(carData[i].userinfo[j].value));
						if(!that.tel(carData[i].userinfo[j].value)){
							that.showToast('请输入正确的手机号')
							isReturn = true
							return;
						}
					}
				}
				for(let j=0; j<carData[i].usercards.length; j++){
					if(!carData[i].usercards[j].value){
						that.showToast(carData[i].usercards[j].show)
						isReturn = true
						return;
					}
					if(carData[i].usercards[j].field == 'idcard'){
						console.log(carData[i].usercards[j].value);
					console.log(that.idcard(carData[i].usercards[j].value));
						if(!that.idcard(carData[i].usercards[j].value)){
							that.showToast('请输入正确的身份证号')
							isReturn = true
							return;
						}
					}
				}
				if(isReturn){
					return
				}
				let data = {
					userinfo: JSON.stringify(carData[i].userinfo),
					usercards: JSON.stringify(carData[i].usercards),
					userextra: JSON.stringify(carData[i].userextra),
				}
				that.checkMember(data,i)
			}
		},
		checkMember(data,i){//得到活动详情
			data.mid = that.mid
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
			let newArr = []
			newArr = value.map(item => {
				if(item == -1){
					return 0
				}
				return item
			})
			// console.log(newArr);
			that.carIndex = newArr
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
			// that.carData = []
			// that.$emit('showPopups', false)
			that.storageData = {}
		},
		setStorageSyncs(e,v){
			console.log('setStorageSync:',e);
			console.log('setStorageSync:',v);
			uni.setStorageSync(e,v)
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
				margin:40rpx auto 0;
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
				padding:0 40rpx 60rpx;
				margin-top: -6rpx;
				border-radius: 40rpx 40rpx 0 0;
				.input-one{
					padding-top: 54rpx;
					position: relative;
					.close-input{
						width:60rpx;
						height: 60rpx;
						position: absolute;
						right:0;
						top:64rpx;
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
							color: #FF7A22;
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
								width:120rpx;
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
					border-radius: 14rpx;
					font-size: 36rpx;
					margin: 0 auto;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
