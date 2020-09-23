<template>
	<view><web-view @message="message" :src="Url"></web-view></view>
</template>

<script>
	var that
	import { jsApipay, payH5 } from '../../common/js/pay.js'
	export default{
		data(){
			return{
				Url:""
			}
		},
		onLoad(option) {
			console.log(option);
			that = this
			
			console.log(this.StatusBar);
			uni.setNavigationBarTitle({
				title: '商城'
			})
			console.log( uni.getStorageSync('openid'));
			// #ifdef H5
			let Url = 'https://sd-shop.fblife.com/#/?channel=zyjd&phone=' + uni.getStorageSync('phone') + '&statusbar=' + this.StatusBar + '&openid=' + uni.getStorageSync('openid') + '&isMini=true';
			console.log(Url);
			window.location.href = Url
			// #endif
			// #ifndef H5
			// let miniUrl = 'http://192.168.0.180:8081/#/?channel=zyjd&phone=' + uni.getStorageSync('phone') + '&statusbar=' + this.StatusBar + '&openid=' + uni.getStorageSync('openid') + '&isMini=true'
			let miniUrl = 'https://mini-shop.fblife.com/#/?channel=zyjd&phone=' + uni.getStorageSync('phone') + '&statusbar=' + this.StatusBar + '&openid=' + uni.getStorageSync('openid') + '&isMini=true'
			console.log(miniUrl);
			this.Url= miniUrl
			// #endif
		},
		methods: {
			message(event){
				console.log(event);
				console.log('接收到消息',event.detail.data)
				let data = event.detail.data
				uni.showModal({
					title: '接收到消息',
					content: 'data:' + JSON.stringify(data) 
				})
				alert('接收到消息:' + JSON.stringify(data))
				that.toPay(data)
			},
			toPay(data){
				console.log('toPayData',data)
				let msg = data[0]
				console.log('toPayData -msg',msg)
				let orderInfo
				let orderData = msg.datas
				// let fromPage = msg.fromPage
				console.log('orderData:',orderData)
				alert('接收到消息toPay:' + JSON.stringify(data))
				uni.showModal({
					title: '接收到消息',
					content: 'data:' + JSON.stringify(orderData) 
				})
				// if(msg.type == 'wxpay'){
				// 	orderInfo = {}
				// 	orderInfo.appid = orderData.appId
				// 	orderInfo.noncestr = orderData.nonceStr
				// 	orderInfo.package = orderData.packageValue
				// 	orderInfo.partnerid = orderData.partnerId
				// 	orderInfo.prepayid = orderData.prepayId
				// 	orderInfo.timestamp = orderData.timestamp
				// 	orderInfo.sign = orderData.sign
				// } else {
				// 	orderInfo = ''
				// 	orderInfo = orderData
				// }
				// console.log('orderInfo:',orderInfo)
				// console.log(typeof(orderInfo))
				// jsApipay(that,orderData)
				// alert('111')
				// uni.requestPayment({
				//     provider: msg.type='wx'?'wxpay':'alipay',//alipay / wxpay
				//     orderInfo: orderInfo, //微信、支付宝订单数据
				//     success: function (res) {
				//         console.log('success:' + JSON.stringify(res));
				// 		uni.showModal({
				// 			title: '支付成功回调',
				// 			content: 'success:' + JSON.stringify(res) 
				// 		})
				//     },
				//     fail: function (err) {
				// 		uni.showModal({
				// 			title: '支付失败回调',
				// 			content: 'err:' + JSON.stringify(err) 
				// 		})
				//         console.log('fail:' + JSON.stringify(err));
				//     }
				// });
				// uni.showModal({
				// 	title: '接收到消息',
				// 	content: 'data:' + JSON.stringify(data) 
				// })
				// alert('toPay')
			}
		},
	}
</script>
