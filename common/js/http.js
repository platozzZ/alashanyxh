// const commonUrl = "/api"; //公共路径 
const commonUrl = "http://home-api.fblife.com"; //正式
// const commonUrl = "http://sns.fblife.com"; //测试 

// post请求封装
var postRequest = (url, data, loadingtext, show) => {
		if(show){
			uni.showLoading({
				mask:true,
			   title: loadingtext || '加载中'
			})
		}
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "POST",
            header: {
                'Content-Type': 'application/json',
				'Authorization':uni.getStorageSync('token'),
				'X-Requested-With':'XMLHttpRequest'
				 // token: uni.getStorageSync("token"),
				// phone: uni.getStorageSync("comephone"),
				// channel: uni.getStorageSync("channel")
            },
            success: function(res) {
                //返回什么就相应的做调整
                if (res.statusCode == 200) {
					resolve(res.data);
                } else {
					console.log(222222,res)
                    // 请求服务器成功，但是由于服务器没有数据返回，此时无code。会导致这个空数据
                    //接口后面的then执行
                    // 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
                    //不会被阻断在那里执行不下去！
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            },
			complete:function(e){
				uni.hideLoading()
			}
        });
    });
    return promise;
}

//七牛云请求token
// post请求封装
var qiniuPostRequest = (url, data, loadingtext, show) => {
		if(show){
			uni.showLoading({
				mask:true,
			   title: loadingtext || '加载中'
			})
		}
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url:  url,
            data: postData,
            method: "POST",
            header: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: function(res) {
                //返回什么就相应的做调整
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            },
			complete:function(e){
				uni.hideLoading()
			}
        });
    });
    return promise;
}
// get请求封装
var getRequest = (url, data,show) => {
	if(show){
		uni.showLoading({
			mask:true,
		   title: loadingtext || '加载中'
		})
	}
    var promise = new Promise((resolve, reject) => {
        var that = this;
        var postData = data;
        uni.request({
            url: commonUrl + url,
            data: postData,
            method: "GET",
            dataType: "json",
            header: {
                "content-type": "application/json",
				"Authorization":uni.getStorageSync('token')
            },
            success: function(res) {
                if (res.statusCode == 200) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
            error: function(e) {
                reject("网络出错");
            },
			complete:function(e){
				uni.hideLoading()
			}
        });
    });
    return promise;
}

module.exports = {
    post: postRequest,
    get: getRequest,
	qiniuPost:qiniuPostRequest
};



