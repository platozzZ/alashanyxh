(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-mySetting"],{"06af":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.mySetting .cu-list.menu > .cu-item.arrow[data-v-a6fa4b9c]::before{color:#333}.mySetting .footer[data-v-a6fa4b9c]{height:calc(%?100?% + constant(safe-area-inset-bottom) / 2);height:calc(%?100?% + env(safe-area-inset-bottom) / 2);padding-bottom:calc(constant(safe-area-inset-bottom) / 2);padding-bottom:calc(env(safe-area-inset-bottom) / 2)}.mySetting .footer .foot[data-v-a6fa4b9c]{z-index:0}.mySetting .pop-modal[data-v-a6fa4b9c]{width:80vw;border-radius:%?20?%}.mySetting .pop-modal .pop-input[data-v-a6fa4b9c]{border-bottom:%?1?% solid #e6e6e6;height:%?70?%;line-height:%?70?%}.mySetting .showAvatar[data-v-a6fa4b9c]{position:fixed;top:-1000px;left:-1000px}',""]),t.exports=e},3387:function(t,e,n){"use strict";n.r(e);var a=n("569e"),o=n("8130");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("fb29");var s,r=n("f0c5"),u=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"a6fa4b9c",null,!1,a["a"],s);e["default"]=u.exports},"569e":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uniPopup:n("5af3").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"mySetting"},[n("v-uni-view",{staticClass:"cu-list menu sm-border solid-top"},[n("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeAvatar.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"content"},[n("v-uni-text",{staticClass:"text-black"},[t._v("修改头像")])],1)],1),n("v-uni-view",{staticClass:"cu-item arrow",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toggle.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"content"},[n("v-uni-text",{staticClass:"text-black"},[t._v("修改密码")])],1)],1)],1),n("v-uni-view",{staticClass:"footer"},[n("v-uni-view",{staticClass:"cu-bar tabbar bg-white shadow foot justify-center bg-kartyellow text-lg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.modalTap.apply(void 0,arguments)}}},[t._v("退出登录")])],1),n("v-uni-view",{class:{showAvatar:!t.showAvatar}},[n("avatar",{ref:"avatar",attrs:{quality:"1"},on:{upload:function(e){arguments[0]=e=t.$handleEvent(e),t.myUpload.apply(void 0,arguments)},hide:function(e){arguments[0]=e=t.$handleEvent(e),t.hideAvatar.apply(void 0,arguments)}}})],1),n("uni-popup",{ref:"popup",attrs:{id:"popup",type:"center"}},[n("v-uni-form",{on:{submit:function(e){arguments[0]=e=t.$handleEvent(e),t.pwdSubmit.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"pop-modal bg-white padding-tb padding-lr-xl text-center flex flex-direction"},[n("v-uni-view",{staticClass:"title text-xl padding-bottom"},[t._v("修改密码")]),n("v-uni-input",{staticClass:"pop-input padding-bottom-sm margin-top text-lg",attrs:{name:"oldPassword",placeholder:"请输入原始密码"}}),n("v-uni-input",{staticClass:"pop-input padding-bottom-sm margin-top text-lg",attrs:{name:"password",placeholder:"请输入密码"}}),n("v-uni-input",{attrs:{name:"user_id",type:"text",value:t.userInfo.user_id,hidden:!0}}),n("v-uni-button",{staticClass:"cu-btn bg-kartyellow round  margin-top-xl lg",attrs:{"form-type":"submit"}},[t._v("立即提交")])],1)],1)],1)],1)},i=[]},8130:function(t,e,n){"use strict";n.r(e);var a=n("bd93"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},"9a1c":function(t,e,n){var a=n("06af");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("bd9264c2",a,!0,{sourceMap:!1,shadowMode:!1})},bd93:function(t,e,n){"use strict";var a=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o,i=n("da42"),s=a(n("e5da")),r=a(n("bc85")),u={components:{avatar:r.default},data:function(){return{password:"",oldPassword:"",url:"https://enroll-api.activitysign.com/3/img/avatar.png",test:"../../static/image/banner2.png",list:"",userInfo:"",userData:"",isFirst:!0,showAvatar:!1}},onLoad:function(t){o=this;var e=uni.getStorageSync("userInfo");e&&(o.userInfo=e),o.initValidate()},onShow:function(){console.log("onShow")},methods:{myUpload:function(t){console.log(t);var e={avatar:t.base64,user_id:o.userInfo.user_id};(0,i.updateAvatar)(e).then((function(t){if(console.log("updateAvatar",t),201==t.data.code){o.showToast(t.data.data);var e=o,n=e.userInfo;n.avatar=t.data.status,uni.setStorageSync("userInfo",n)}else o.showToast(t.data.data)})).catch((function(t){o.showToast(t.text),console.log(t)}))},toggle:function(t){o.$refs.popup.open()},cancel:function(){o.$refs.popup.close()},showToast:function(t){uni.showToast({title:t,icon:"none",mask:!0,duration:2e3})},changeAvatar:function(t){console.log(t),o.$nextTick((function(){console.log(o.$refs),o.$refs.avatar.fChooseImg("",{selWidth:"350upx",selHeight:"350upx",inner:!1,canRotate:!1})}))},hideAvatar:function(t){console.log(t),o.showAvatar=t},changPwd:function(t){(0,i.updateAvatar)(t).then((function(t){console.log("changPwd",t),201==t.data.code?(o.showToast(t.data.data),o.cancel()):o.showToast(t.data.message)})).catch((function(t){o.showToast(t.text),console.log(t)}))},pwdSubmit:function(t){console.log(t);var e=t.detail.value;if(!o.WxValidate.checkForm(e)){var n=o.WxValidate.errorList[0];return console.log(n),void o.showToast(n.msg)}o.changPwd(e)},logOut:function(){(0,i.logOut)().then((function(t){console.log("logOut",t),200==t.data.code?(uni.removeStorageSync("token"),uni.removeStorageSync("userInfo"),uni.removeStorageSync("phone"),uni.showToast({title:t.data.data,duration:2e3,icon:"none",success:function(){setTimeout((function(){uni.navigateBack()}),2e3)}})):o.showToast(t.data.data)})).catch((function(t){o.showToast(t.text),console.log(t)}))},modalTap:function(t){uni.showModal({title:"提示",content:"确定退出登录吗？",success:function(t){t.confirm&&o.logOut()}})},_navigateTo:function(t){console.log(t),uni.navigateTo({url:t})},initValidate:function(t){var e={password:{required:!0},oldPassword:{required:!0},user_id:{required:!0}},n={password:{required:"密码不能为空"},oldPassword:{required:"原始密码不能为空"},user_id:{required:"未知错误，请刷新页面重试"}};o.WxValidate=new s.default(e,n)}}};e.default=u},e5da:function(t,e,n){"use strict";var a=n("4ea4");n("4160"),n("a630"),n("c975"),n("fb6a"),n("d3b7"),n("4d63"),n("ac1f"),n("25f0"),n("3ca3"),n("5319"),n("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("d4ec")),i=a(n("bee2")),s=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,o.default)(this,t),Object.assign(this,{data:{},rules:e,messages:n}),this.__init()}return(0,i.default)(t,[{key:"__init",value:function(){this.__initMethods(),this.__initDefaults(),this.__initData()}},{key:"__initData",value:function(){this.form={},this.errorList=[]}},{key:"__initDefaults",value:function(){this.defaults={messages:{required:"这是必填字段。",email:"请输入有效的电子邮件地址。",tel:"请输入正确的手机号码。",url:"请输入有效的网址。",date:"请输入有效的日期。",dateISO:"请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。",number:"请输入有效的数字。",digits:"只能输入数字。",idcard:"请输入18位的有效身份证。",equalTo:this.formatTpl("输入值必须和 {0} 相同。"),contains:this.formatTpl("输入值必须包含 {0}。"),minlength:this.formatTpl("最少要输入 {0} 个字符。"),maxlength:this.formatTpl("最多可以输入 {0} 个字符。"),rangelength:this.formatTpl("请输入长度在 {0} 到 {1} 之间的字符。"),min:this.formatTpl("请输入不小于 {0} 的数值。"),max:this.formatTpl("请输入不大于 {0} 的数值。"),range:this.formatTpl("请输入范围在 {0} 到 {1} 之间的数值。"),minlength1:""}}}},{key:"__initMethods",value:function(){var t=this;t.methods={required:function(e,n){if(!t.depend(n))return"dependency-mismatch";if("number"===typeof e)e=e.toString();else if("boolean"===typeof e)return!0;return e.length>0},email:function(e){return t.optional(e)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)},tel:function(e){return t.optional(e)||/^([1][3,5,6,7,8,9])\d{9}$/.test(e)},url:function(e){return t.optional(e)||/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)},date:function(e){return t.optional(e)||!/Invalid|NaN/.test(new Date(e).toString())},dateISO:function(e){return t.optional(e)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)},number:function(e){return t.optional(e)||/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e){return t.optional(e)||/^\d+$/.test(e)},idcard:function(e){return t.optional(e)||/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(e)},equalTo:function(e,n){return t.optional(e)||e===t.data[n]},contains:function(e,n){return t.optional(e)||e.indexOf(n)>=0},minlength:function(e,n){return t.optional(e)||e.length>=n},maxlength:function(e,n){return t.optional(e)||e.length<=n},rangelength:function(e,n){return t.optional(e)||e.length>=n[0]&&e.length<=n[1]},min:function(e,n){return t.optional(e)||e>=n},max:function(e,n){return t.optional(e)||e<=n},range:function(e,n){return t.optional(e)||e>=n[0]&&e<=n[1]}}}},{key:"addMethod",value:function(t,e,n){this.methods[t]=e,this.defaults.messages[t]=void 0!==n?n:this.defaults.messages[t]}},{key:"isValidMethod",value:function(t){var e=[];for(var n in this.methods)n&&"function"===typeof this.methods[n]&&e.push(n);return-1!==e.indexOf(t)}},{key:"formatTpl",value:function(t,e){var n=this;return 1===arguments.length?function(){var e=Array.from(arguments);return e.unshift(t),n.formatTpl.apply(this,e)}:(void 0===e||(arguments.length>2&&e.constructor!==Array&&(e=Array.from(arguments).slice(1)),e.constructor!==Array&&(e=[e]),e.forEach((function(e,n){t=t.replace(new RegExp("\\{"+n+"\\}","g"),(function(){return e}))}))),t)}},{key:"depend",value:function(t){switch(typeof t){case"boolean":t=t;break;case"string":t=!!t.length;break;case"function":t=t();default:t=!0}return t}},{key:"optional",value:function(t){return!this.methods.required(t)&&"dependency-mismatch"}},{key:"customMessage",value:function(t,e){var n=this.messages[t],a="object"===typeof n;if(n&&a)return n[e.method]}},{key:"defaultMessage",value:function(t,e){var n=this.customMessage(t,e)||this.defaults.messages[e.method],a=typeof n;return"undefined"===a?n="Warning: No message defined for ".concat(e.method,"."):"function"===a&&(n=n.call(this,e.parameters)),n}},{key:"formatTplAndAdd",value:function(t,e,n){var a=this.defaultMessage(t,e);this.errorList.push({param:t,msg:a,value:n})}},{key:"checkParam",value:function(t,e,n){this.data=n;var a=null!==n[t]&&void 0!==n[t]?n[t]:"";for(var o in e)if(this.isValidMethod(o)){var i={method:o,parameters:e[o]},s=this.methods[o](a,i.parameters);if("dependency-mismatch"===s)continue;if(this.setValue(t,o,s,a),!s){this.formatTplAndAdd(t,i,a);break}}}},{key:"setView",value:function(t){this.form[t]={$name:t,$valid:!0,$invalid:!1,$error:{},$success:{},$viewValue:""}}},{key:"setValue",value:function(t,e,n,a){var o=this.form[t];o.$valid=n,o.$invalid=!n,o.$error[e]=!n,o.$success[e]=n,o.$viewValue=a}},{key:"checkForm",value:function(t){for(var e in this.__initData(),this.rules)this.setView(e),this.checkParam(e,this.rules[e],t);return this.valid()}},{key:"valid",value:function(){return 0===this.size()}},{key:"size",value:function(){return this.errorList.length}},{key:"validationErrors",value:function(){return this.errorList}}]),t}(),r=s;e.default=r},fb29:function(t,e,n){"use strict";var a=n("9a1c"),o=n.n(a);o.a}}]);