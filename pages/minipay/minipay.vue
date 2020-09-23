<template>
	<view class="">
		
	</view>
</template>

<script>
var that
import { jsApipay, payH5 } from '../../common/js/pay.js'
export default{
	data(){
		return{
			// Url:""
		}
	},
	onLoad(option) {
		that = this
		console.log(option.data);
		let data = JSON.parse(decodeURIComponent(option.data));
		console.log(data);
		that.pay(data)
	},
	methods: {
		pay(data){
			const pages = getCurrentPages(); // 当前页面
			const curPage = pages[pages.length - 1]; // 当前页面
			const beforePage = pages[pages.length - 2]; // 前一个页面
			console.log(curPage);
			console.log(beforePage);
			console.log('pay:',data);
			uni.requestPayment({
			    provider: 'wxpay',
			    timeStamp: data.timeStamp,
			    nonceStr: data.nonceStr,
			    package: data.package,
			    signType: 'MD5',
			    paySign: data.paySign,
			    success: function (res) {
			        console.log('success:' + JSON.stringify(res));
					that.goOrder('success')
			    },
			    fail: function (err) {
			        console.log('fail:' + JSON.stringify(err));
					that.goOrder('fail')
			    }
			});
		},
		goOrder(e){
			uni.showLoading()
			let _phone = uni.getStorageSync('Phone')
			let _thisUrl = 'https://sd-shop.fblife.com/'
			// let _thisUrl = 'http://192.168.0.180:8081/'
			let urls = _thisUrl + '#/?channel=zyjd&fromfb=5' + '&phone=' + _phone + '&statusbar=' + this.StatusBar + '&openid=' + uni.getStorageSync('openid');
			
			console.log('goOrder-urls:',urls);
			let webUrl = encodeURIComponent(JSON.stringify(urls))
			uni.redirectTo({
				url: '../mall/mall?weburl=' + webUrl + '&title=订单'
			});
		}
	}
}
</script>

<style>
</style>
