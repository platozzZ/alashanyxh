export function jsApipay(that,data){
	console.log(data);
	that.$wx.config({
		debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		appId: data.appId, // 必填，公众号的唯一标识
		timestamp: data.timeStamp, // 必填，生成签名的时间戳
		nonceStr: data.nonceStr, // 必填，生成签名的随机串
		signature: data.paySign, // 必填，签名，见附录1
		jsApiList: ["chooseWXPay","updateAppMessageShareData","updateTimelineShareData"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
	});
	that.$wx.ready(function() {
		console.log('jweixin.ready');
		that.$wx.checkJsApi({
			jsApiList: ['chooseWXPay',"updateAppMessageShareData","updateTimelineShareData"], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			success: function(res) {
				console.log('checkjsapi Success')
				console.log(res);
			},
			fail:function(res) {
				console.log('res')
				console.log(res);
			}
		});
		that.$wx.chooseWXPay({
			timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
			package: 'prepay_id=' + data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			paySign: data.paySign, // 支付签名
			success:function(res) {
				// 支付成功后的回调函数
				console.log('paysuccess')
				console.log(res)
				that.payResult('success')
				
			},
			cancel: function(r) {
				console.log('paycancel')
				console.log(r)
				that.payResult('cancel')
			},
			fail:function(res) {
				that.payResult('fail')
				console.log('payfail')
				console.log(res)
			}
		});
	});
	
	that.$wx.error(function(res) {
		console.log('error')
		console.log(res)
		uni.showToast({
			icon: 'none',
			title: '支付失败了',
			duration: 4000
		});
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
			/*alert("config信息验证失败");*/
	});
}

export function miniPay(that,data){
	uni.requestPayment({
		provider: 'wxpay',
		timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
		nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
		package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
		signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
		paySign: data.paySign, // 支付签名
		success: function (res) {
			console.log('success:' + JSON.stringify(res));
			that.payResult('success')
		},
		fail: function (err) {
			that.payResult('fail')
			console.log('fail:' + JSON.stringify(err));
		}
	});
}

export function h5Pay(that,data){
	// uni.requestPayment({
	// 	provider: 'wxpay',
	// 	timeStamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
	// 	nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
	// 	package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
	// 	signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
	// 	paySign: data.paySign, // 支付签名
	// 	success: function (res) {
	// 		console.log('success:' + JSON.stringify(res));
	// 		that.payResult('success')
	// 	},
	// 	fail: function (err) {
	// 		that.payResult('fail')
	// 		console.log('fail:' + JSON.stringify(err));
	// 	}
	// });
}
