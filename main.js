import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)

Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
