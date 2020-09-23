// export function getUrlKey(name){
//     return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
// }
const getOpenid = (url) => {
	console.log('url:',url);
	// alert('url:' + url);
	console.log('window.location.href:',window.location.href);
	// alert('window.location.href:' + window.location.href);
	let backUrl = encodeURIComponent(url);
	console.log("https://zyjd-api.fblife.com/pay/getOpenid?back_url=" + backUrl);
	// alert("https://enroll-api.activitysign.com/pay/getOpenid?back_url=" + backUrl)
	window.location.href="https://zyjd-api.fblife.com/pay/getOpenid?back_url=" + backUrl
}

module.exports = getOpenid