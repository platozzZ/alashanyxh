<template>
	<view><web-view @message="message" :src="Url"></web-view></view>
</template>

<script>
	var that
	import { payApp, payH5 } from '../../common/js/pay.js'
	export default{
		data(){
			return{
				Url:""
			}
		},
		onLoad(option) {
			console.log(option);
			that = this
			if(option.title){
				uni.setNavigationBarTitle({
					title: option.title
				})
			}
			let url = decodeURIComponent(option.weburl);
			let weburl = JSON.parse(url) + '&channel=zyjd' + '&phone=' + uni.getStorageSync('phone') + '&openid=' + uni.getStorageSync('openid') + '&statusbar=' + this.StatusBar + '&isMini=true';
			console.log(url);
			console.log(weburl);
			this.Url= weburl
		},
		methods: {
			message(event){
				console.log(event);
				console.log('接收到消息',event.detail.data)
				let data = event.detail.data
				// uni.showModal({
				// 	title: '接收到消息',
				// 	content: event.detail.data
				// })
				// this.toPay(event.detail.data)
				that.toPay(data)
			},
			toPay(data){
				console.log('toPayData',data)
				let msg = data[0]
				console.log('toPayData -msg',msg)
				let orderInfo
				let orderData = msg.datas
				console.log('orderData:',orderData)
				if(msg.type == 'wxpay'){
					orderInfo = {}
					orderInfo.appid = orderData.appId
					orderInfo.noncestr = orderData.nonceStr
					orderInfo.package = orderData.packageValue
					orderInfo.partnerid = orderData.partnerId
					orderInfo.prepayid = orderData.prepayId
					orderInfo.timestamp = orderData.timestamp
					orderInfo.sign = orderData.sign
				} else {
					orderInfo = ''
					orderInfo = orderData
				}
				console.log('orderInfo:',orderInfo)
				console.log(typeof(orderInfo))
				payApp(that,msg.type,orderInfo,msg.pay_name)
			}
		},
	
	}
</script>
