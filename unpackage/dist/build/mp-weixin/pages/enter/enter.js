(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/enter/enter"],{"0f9d":function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e,a=n("71ae"),r={data:function(){return{data:"",list:[{title:"会员报名",info:"阿拉善英雄会会员观光报名，有营地留宿",route:"../enroll/enrollStepMatch",mid:"278"},{title:"普通观光报名",info:"阿拉善英雄会普通观光报名，无需进入营地驻扎",route:"../enroll/enrollNor",mid:"277"},{title:"赛事报名",info:"T3接力赛、牧马人攀岩赛",route:"../enroll/enroll"},{title:"团体报名",info:"越野e族大队/版主/领主批量报名",route:"../enroll/enrollWord"}],maskShow:!1,customBar:this.CustomBar}},mounted:function(t){e=this,e.getNotice()},onShow:function(){console.log("onShow"),t.removeStorageSync("carInfo"),t.removeStorageSync("formData")},methods:{_navigateTo:function(o,n){var e=t.getStorageSync("userInfo"),a=t.getStorageSync("token"),r=t.getStorageSync("phone");e&&a&&r?(console.log(o),console.log(!n),n?t.navigateTo({url:o+"?mid="+n}):t.navigateTo({url:o})):t.navigateTo({url:"../login/login"})},getNotice:function(){(0,a.getNotice)().then((function(t){console.log("getNotice",t);var o=t.data;"1000"==o.rspInfo.rspCode?e.data=o.rspData:e.showToast(o.rspInfo.rspDesc)})).catch((function(t){e.showToast(t.text),console.log(t)}))},showMask:function(t,o){console.log(t),"open"==t?(this.maskShow=!0,this.maskCon=o):(this.maskShow=!1,this.maskCon="")},showToast:function(o){t.showToast({title:o,icon:"none",mask:!0,duration:2e3})}}};o.default=r}).call(this,n("543d")["default"])},"1bbf":function(t,o,n){"use strict";n.r(o);var e=n("9fa0"),a=n("3bf8");for(var r in a)"default"!==r&&function(t){n.d(o,t,(function(){return a[t]}))}(r);n("335e");var i,u=n("f0c5"),c=Object(u["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);o["default"]=c.exports},"335e":function(t,o,n){"use strict";var e=n("3ab3"),a=n.n(e);a.a},"3ab3":function(t,o,n){},"3bf8":function(t,o,n){"use strict";n.r(o);var e=n("0f9d"),a=n.n(e);for(var r in e)"default"!==r&&function(t){n.d(o,t,(function(){return e[t]}))}(r);o["default"]=a.a},"62d1":function(t,o,n){"use strict";(function(t){n("61ae");e(n("66fd"));var o=e(n("1bbf"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,n("543d")["createPage"])},"9fa0":function(t,o,n){"use strict";n.d(o,"b",(function(){return a})),n.d(o,"c",(function(){return r})),n.d(o,"a",(function(){return e}));var e={sdTabbar:function(){return n.e("components/sd-tabbar/sd-tabbar").then(n.bind(null,"c706"))}},a=function(){var t=this,o=t.$createElement;t._self._c},r=[]}},[["62d1","common/runtime","common/vendor"]]]);