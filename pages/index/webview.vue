<template>
	<web-view :src="Url"></web-view>
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
			let url = decodeURIComponent(option.webUrl);
			console.log(url)
			// let weburl = JSON.parse(url) + '&channel=zyjd' + '&phone=' + uni.getStorageSync('phone') + '&openid=' + uni.getStorageSync('openid') + '&statusbar=' + this.StatusBar + '&isMini=true';
			// console.log(url);
			// console.log(weburl);
			this.Url= url
		},
		methods: {
			
		},
	
	}
</script>

<style>
</style>
