import Vue from 'vue'
import App from './App'
import store from './store'
import * as filters from './common/js/showTime.js'
// import getopenid from './common/getopenid.js'

// #ifdef H5
import getopenid from './common/js/getopenid.js'
Vue.prototype.$getopenid = getopenid
import wx from './components/jweixin-module/lib/index.js'
Vue.prototype.$wx = wx
// Vue.prototype.$getopenid = getopenid
// #endif

//全局filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
