import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	baseUrl
} from '@/api/index.js'
export default new Vuex.Store({
	state: {
		admin: uni.getStorageSync("admin") ? uni.getStorageSync("admin") : ""
	},
	mutations: {
		getLogin(state, data) {
			state.admin = data
			// console.log(data)
		},
		getOutLogin(state) {
			state.admin = ''
		},
		getNewZiliao(state,data){
			var ziliao = {...state.admin,...data}
			state.admin = ziliao
			console.log(ziliao)
			uni.setStorage({
				key: 'admin',
				data: ziliao
			})
		}
	},
	actions: {
		login({
			commit
		}, layer) {
			// console.log(layer)
			uni.request({
				// 请求接口
				url: `${baseUrl}/users/login`,
				// 请求方式
				method: 'POST',
				data: layer,
				success({
					data
				}) {
					// console.log(data)
					if (data.code == 0) {
						uni.showToast({
							title: '登陆失败 请重试',
							icon: 'none'
						});
					} else if (data.code == 200) {
						commit('getLogin', data.data)
						uni.setStorage({
							key: 'admin',
							data: data.data
						})
						uni.switchTab({
							url: '/pages/my/index'
						})
					}
				}
			})
		},
		outLogin({
			commit
		}) {
			uni.clearStorage('admin')
			commit('getOutLogin')
		}
	}
});
