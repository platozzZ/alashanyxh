(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/jin-attachment/jin-attachment"],{"4b7e":function(e,t,n){},"5c5c":function(e,t,n){"use strict";n.r(t);var i=n("cbe3"),o=n("ed8d");for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);n("dee7");var u,s=n("f0c5"),l=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"443fb1aa",null,!1,i["a"],u);t["default"]=l.exports},8074:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("a34a"));function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t,n,i,o,a,u){try{var s=e[a](u),l=s.value}catch(r){return void n(r)}s.done?t(l):Promise.resolve(l).then(i,o)}function u(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var u=e.apply(t,n);function s(e){a(u,i,o,s,l,"next",e)}function l(e){a(u,i,o,s,l,"throw",e)}s(void 0)}))}}var s={props:{attachmentList:{type:Array},mode:{type:String},uploadFileUrl:{type:String,dafault:"#"},showProcess:{type:Boolean,default:!0},header:{type:Object},limit:{type:Number,default:null},fileKeyName:{type:String,default:"file"},canUploadFile:{type:Boolean,default:!1}},computed:{list:function(){return this.attachmentList}},data:function(){return{}},methods:{previewImg:function(t){e.previewImage({current:0,urls:[t]})},downLoad:function(t){e.showModal({title:"确定要下载此附件吗",content:" ",success:function(n){n.confirm&&(e.showLoading({title:"下载中,请稍后"}),console.log(t),e.downloadFile({url:t,success:function(t){t.tempFilePath;e.saveFile({tempFilePath:t.tempFilePath,success:function(t){var n=t.savedFilePath;e.hideLoading(),e.showToast({title:"保存成功，路径为"+n}),e.openDocument({filePath:n,success:function(e){console.log(e)}})}})},fail:function(t){console.log(t),e.hideLoading(),e.showToast({title:"下载失败",icon:"none"})}}),setTimeout((function(){e.hideLoading()}),2e4))}})},deleteItem:function(t){var n=this;e.showModal({title:"提示",content:"确定要删除此项吗？",success:function(e){e.confirm&&(100!=n.list[t].process&&"undefined"!=typeof n.list[t].uploadTask&&n.list[t].uploadTask.abort(),n.list.splice(t,1),n.$forceUpdate(),n.$emit("update:attachmentList",n.list))}})},chooseFile:function(){var t=this;return u(i.default.mark((function n(){var o,a,u,s,l,r,c,f;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(null==t.limit||isNaN(t.limit)){n.next=4;break}if(!(t.list.length>=t.limit)){n.next=4;break}return e.showToast({title:"已达到最大上传数量",icon:"none"}),n.abrupt("return");case 4:if(o=t.canUploadFile,o){n.next=14;break}return n.next=8,e.chooseImage({count:null==t.limit||t.limit-t.list.length>9?9:9-limit,sizeType:["original","compressed"],sourceType:["album"]});case 8:if(a=n.sent,"undefined"!=typeof a[1]){n.next=11;break}return n.abrupt("return");case 11:u=a[1].tempFilePaths,n.next=19;break;case 14:return n.next=16,new Promise((function(e,n){wx.chooseMessageFile({count:null==t.limit||t.limit-t.list.length>9?9:9-limit,type:"file",success:function(t){console.log(t);var n=t.tempFiles;e(n)}})}));case 16:a=n.sent,u=a.map((function(e,t){return e.path})),s=a.map((function(e,t){return e.name}));case 19:for(l in u)r=u[l],"undefined"!=typeof s&&"undefined"!=typeof s[l]?c=s[l]:(c=r.split("/"),c=c[c.length-1]),f=t.list.length,t.list.push({fileName:c,url:r,type:t.isImg(r)?"image":"file",index:f,process:0}),t.$forceUpdate(),t.$emit("uploadSuccess",t.list);case 20:case"end":return n.stop()}}),n)})))()},isImg:function(e){var t=e.lastIndexOf("."),n=e.substr(t+1),i=-1!==["png","jpg","jpeg","bmp","gif","webp","svg","tiff"].indexOf(n.toLowerCase());return i}}};t.default=s}).call(this,n("543d")["default"])},cbe3:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return i}));var o=function(){var e=this,t=e.$createElement;e._self._c},a=[]},dee7:function(e,t,n){"use strict";var i=n("4b7e"),o=n.n(i);o.a},ed8d:function(e,t,n){"use strict";n.r(t);var i=n("8074"),o=n.n(i);for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/jin-attachment/jin-attachment-create-component',
    {
        'components/jin-attachment/jin-attachment-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("5c5c"))
        })
    },
    [['components/jin-attachment/jin-attachment-create-component']]
]);
