(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-register"],{"31fd":function(e,t,n){"use strict";var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,i=n("da42"),r=(o(n("989c")),o(n("e5da"))),d=o(n("5929")),s={data:function(){return{test:"../../static/image/banner2.png",list:"",openid:uni.getStorageSync("openid"),second:60,reg:!1,mobile:""}},onLoad:function(e){a=this,a.initValidate(),a.initValidatePhone()},methods:{toRegister:function(e){(0,i.toRegister)(e).then((function(e){console.log("toRegister",e),201==e.data.code?(uni.setStorageSync("userInfo",e.data.data),uni.setStorageSync("token",e.data.data.token),uni.setStorageSync("phone",e.data.data.phone),getApp().globalData.userInfo=e.data.data,getApp().globalData.token=e.data.data.token,getApp().globalData.phone=e.data.data.phone,uni.showToast({title:"注册成功",duration:2e3,icon:"success",success:function(){uni.reLaunch({url:"../index/index"})}})):a.showToast(e.data.message)})).catch((function(e){a.showToast(e.text),console.log(e)}))},formSubmit:function(e){var t=e.detail.value;if(!a.WxValidate.checkForm(t)){var n=a.WxValidate.errorList[0];return console.log(n),void a.showToast(n.msg)}a.toRegister(t),console.log(e)},captCha:function(e){(0,i.captCha)(e).then((function(e){console.log("captCha",e),201==e.data.code?uni.showToast({title:"发送成功",icon:"success",duration:1e3,success:function(){var e=a.second;d.default.getCode(a,e),a.reg=!0}}):a.showToast(e.data.message)})).catch((function(e){a.showToast(e.text),console.log(e)}))},sendCode:function(e){if(console.log(a.mobile),console.log(a.WxValidatePhone.checkForm({phone:a.mobile})),!a.WxValidatePhone.checkForm({phone:a.mobile})){var t=a.WxValidatePhone.errorList[0];return console.log(t),void a.showToast(t.msg)}a.captCha({phone:a.mobile})},_navigateTo:function(e){console.log(e),uni.navigateTo({url:e})},_navigateBack:function(){uni.navigateBack()},showToast:function(e){uni.showToast({title:e,icon:"none",mask:!0,duration:2e3})},initValidate:function(e){var t={name:{required:!0},phone:{required:!0,tel:!0},password:{required:!0},verifiCode:{required:!0}},n={name:{required:"请输入用户名"},phone:{required:"手机号不能为空",tel:"请输入正确的手机号"},password:{required:"请输入密码"},verifiCode:{required:"验证码错误"}};a.WxValidate=new r.default(t,n)},initValidatePhone:function(e){var t={phone:{required:!0,tel:!0}},n={phone:{required:"手机号不能为空",tel:"请输入正确的手机号"}};a.WxValidatePhone=new r.default(t,n)}}};t.default=s},"32f5":function(e,t,n){"use strict";var o=n("e215"),a=n.n(o);a.a},"5ffc":function(e,t,n){"use strict";n.r(t);var o=n("ec30"),a=n("99de");for(var i in a)"default"!==i&&function(e){n.d(t,e,(function(){return a[e]}))}(i);n("32f5");var r,d=n("f0c5"),s=Object(d["a"])(a["default"],o["b"],o["c"],!1,null,"dfd3f168",null,!1,o["a"],r);t["default"]=s.exports},6672:function(e,t,n){var o=n("24fb");t=o(!1),t.push([e.i,'@charset "UTF-8";\n/**\n * 这里是uni-app内置的常用样式变量\n *\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\n *\n */\n/**\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\n *\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */uni-page-body[data-v-dfd3f168]{background-color:#fff}.register .container[data-v-dfd3f168]{padding:%?30?% %?100?% %?60?%}.register .container .logo[data-v-dfd3f168]{width:%?380?%;height:%?380?%}.register .container .form[data-v-dfd3f168]{margin-top:%?100?%;width:100%}.register .container .form .cu-form-group[data-v-dfd3f168]{background:#fff;margin-top:%?30?%;border-radius:%?100?%;padding:%?20?% %?40?%;font-size:%?36?%;color:#8799a3;border:%?1?% solid #ddd}.register .container .form .cu-form-group uni-input[data-v-dfd3f168]{height:%?50?%;line-height:%?50?%}.register .container .form .cu-form-group.code[data-v-dfd3f168]{padding:%?20?% 0 %?20?% %?40?%}.register .container .form .cu-form-group.code .sendCodeBtn[data-v-dfd3f168]{padding-left:%?20?%;padding-right:%?40?%;border-left:1px solid #cdcdcd;height:%?50?%;border-radius:0;line-height:24px;background:transparent;font-size:16px\n  /* color: #333; */}.register .container .form .zai-btn[data-v-dfd3f168]{background:#ffcb57;color:#fff;border:0;border-radius:%?100?%;font-size:%?36?%;margin-top:%?60?%}.register .container .form .zai-label[data-v-dfd3f168]{text-align:center;font-size:%?30?%;color:#8799a3}.placeholde[data-v-dfd3f168]{color:#8799a3}body.?%PAGE?%[data-v-dfd3f168]{background-color:#fff}',""]),e.exports=t},"99de":function(e,t,n){"use strict";n.r(t);var o=n("31fd"),a=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=a.a},e215:function(e,t,n){var o=n("6672");"string"===typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);var a=n("4f06").default;a("2f04949a",o,!0,{sourceMap:!1,shadowMode:!1})},ec30:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"register bg-white"},[n("v-uni-view",{staticClass:"container flex flex-direction align-center justify-center"},[n("v-uni-image",{staticClass:"logo",attrs:{src:"https://enroll-api.activitysign.com/3/img/logo.png"}}),n("v-uni-form",{on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.formSubmit.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"form"},[n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-input",{attrs:{name:"name",type:"text",placeholder:"请输入用户名","placeholder-class":"placeholde"}})],1),n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-input",{attrs:{name:"phone",type:"number",maxlength:"11",placeholder:"请输入手机号","placeholder-class":"placeholde"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}})],1),n("v-uni-view",{staticClass:"cu-form-group"},[n("v-uni-input",{attrs:{name:"password",placeholder:"请输入密码",password:!0,"placeholder-class":"placeholde"}})],1),n("v-uni-view",{staticClass:"cu-form-group code"},[n("v-uni-input",{attrs:{name:"verifiCode",type:"number",placeholder:"请输入验证码","placeholder-class":"placeholde"}}),n("v-uni-button",{staticClass:"cu-btn sendCodeBtn text-kartyellow",attrs:{disabled:!e.reg&&!e.mobile},on:{click:function(t){t.stopPropagation(),t.preventDefault(),arguments[0]=t=e.$handleEvent(t),e.sendCode.apply(void 0,arguments)}}},[e._v(e._s(e.reg?e.second+"s":"获取验证码"))])],1),n("v-uni-button",{staticClass:"zai-btn",attrs:{"form-type":"submit"}},[e._v("立即注册")])],1)],1)],1)],1)},i=[]}}]);