(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mall/mall"],{"0017":function(t,n,o){"use strict";o.r(n);var a=o("780f"),e=o.n(a);for(var l in a)"default"!==l&&function(t){o.d(n,t,(function(){return a[t]}))}(l);n["default"]=e.a},"780f":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;o("bb67");var a,e={data:function(){return{Url:""}},onLoad:function(n){console.log(n),a=this,console.log(this.StatusBar),t.setNavigationBarTitle({title:"商城"}),console.log(t.getStorageSync("openid"));var o="https://mini-shop.fblife.com/#/?channel=zyjd&phone="+t.getStorageSync("phone")+"&statusbar="+this.StatusBar+"&openid="+t.getStorageSync("openid")+"&isMini=true";console.log(o),this.Url=o},methods:{message:function(n){console.log(n),console.log("接收到消息",n.detail.data);var o=n.detail.data;t.showModal({title:"接收到消息",content:"data:"+JSON.stringify(o)}),alert("接收到消息:"+JSON.stringify(o)),a.toPay(o)},toPay:function(n){console.log("toPayData",n);var o=n[0];console.log("toPayData -msg",o);var a=o.datas;console.log("orderData:",a),alert("接收到消息toPay:"+JSON.stringify(n)),t.showModal({title:"接收到消息",content:"data:"+JSON.stringify(a)})}}};n.default=e}).call(this,o("543d")["default"])},9952:function(t,n,o){"use strict";var a;o.d(n,"b",(function(){return e})),o.d(n,"c",(function(){return l})),o.d(n,"a",(function(){return a}));var e=function(){var t=this,n=t.$createElement;t._self._c},l=[]},ac43:function(t,n,o){"use strict";(function(t){o("61ae");a(o("66fd"));var n=a(o("e12f"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])},e12f:function(t,n,o){"use strict";o.r(n);var a=o("9952"),e=o("0017");for(var l in e)"default"!==l&&function(t){o.d(n,t,(function(){return e[t]}))}(l);var i,r=o("f0c5"),c=Object(r["a"])(e["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],i);n["default"]=c.exports}},[["ac43","common/runtime","common/vendor"]]]);