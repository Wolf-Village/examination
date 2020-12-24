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
		getNewZiliao(state, data) {
			var ziliao = {
				...state.admin,
				...data
			}
			state.admin = ziliao
			console.log(ziliao)
			uni.setStorage({
				key: 'admin',
				data: ziliao
			})
		},
		// 收藏
		getCollection(state, {
			type,
			id
		}) {
			let newAdmin;
			if (state.admin != '') {
				newAdmin = JSON.parse(JSON.stringify(state.admin))
			} else {
				newAdmin = JSON.parse(JSON.stringify(uni.getStorageSync('admin')))
			}
			if (type == 'add') {
				newAdmin.sign.push(id)
			}
			if (type == 'delete') {
				newAdmin.sign = newAdmin.sign.filter(item => item !== id)
			}
			state.admin = newAdmin
			uni.setStorageSync('admin', newAdmin)
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
						data.data.sign = JSON.parse(data.data.sign)
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


		},
		// 收藏
		collection({
			commit
		}, layer) {
			const {
				topicsListId,
				userid,
				collectionType
			} = layer
			uni.request({
				url: baseUrl + '/collection',
				method: 'POST',
				data: {
					id: topicsListId,
					userid,
					type: collectionType
				},
				success: ({
					data
				}) => {
					uni.showToast({
						title: data.msg,
						icon: 'none'
					})
					commit('getCollection', {
						type: collectionType,
						id: topicsListId
					})
				}

			})
		}

	}
});