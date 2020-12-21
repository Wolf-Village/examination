<template>
	<view class="ziliaoBody">
		<view class="ziliaoList">
			<view class="list-item">
				<view class="list-left">头像</view>
				<image class="list-image" src="../../../static/my/head.png" @click="getPhoto"></image>
				<image class="list-right" src="../../../static/my/jiantou.png" mode=""></image>
			</view>
			<view class="list-item">
				<view class="list-left">昵称</view>
				<view class="list-center" @click="nicheng">温暖的派大星</view>
				<image class="list-right" src="../../../static/my/jiantou.png" mode=""></image>
			</view>
			<view class="list-item">
				<view class="list-left">性别</view>
				<view class="list-center" style="width: 25vw;">男</view>
				<image class="list-right" src="../../../static/my/jiantou.png" mode=""></image>
			</view>
			<view class="list-item">
				<view class="list-left">手机号</view>
				<view class="list-center" style="width: 25vw;">{{this.admin == '' ? '未登录' :this.username}}</view>
				<image class="list-right" src="../../../static/my/jiantou.png" mode=""></image>
			</view>
			<view class="list-item">
				<view class="list-left">密码</view>
				<view class="list-center" style="width: 25vw;">************</view>
				<image class="list-right" src="../../../static/my/jiantou.png" mode=""></image>
			</view>
			<view class="list-item">
				<view class="list-left">地址</view>
				<view class="list-center" style="width: 25vw;">北京市</view>
			</view>
			<view class="list-item">个人简介</view>
		</view>
		<view class="goOut">
			退出登录
		</view>
	</view>
</template>

<script>
import {baseUrl} from '../../../api/index.js'
import { pathToBase64, base64ToPath } from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		data() {
			return {
				admin:'',
				username:'',
				nickname:''
			}
		},
		onShow(){
			// 拿到存储在本地的数据
			const admin = uni.getStorageSync('admin')
			this.admin = admin;
			if(admin != ''){
				const {username} = admin;
				this.username = username
				console.log(this.username)
			}
		},
		methods: {
			// 获取用户投向信息
			getPhoto() {
			        let id = uni.getStorageSync('userid').id
			        uni.chooseImage({
						// 请求接口
						url:`${baseUrl}/user/hard`,
						method:'POST',
						// 从相册中选择
						sourceType: ['album'],
						data:{userid:id},
						success:(res) => {
						            pathToBase64(res.tempFilePaths[0])
						            .then(base64 => {
						              // console.log(base64)
						              uni.request({
						                url: `${baseUrl}/user/heard`,
						                method: 'POST',
						                name: 'file',
						                data: {
						                  userid: id,
						                  image: base64
						                },
						                success: (data) => {
						                  console.log('上传头像', data.statusCode)
						                  if (data.code === 404) {
						                    this.$store.dispatch('userInfo', data.user)
						                    uni.setStorageSync('userid', data.user)
						                  } else {
						                    uni.showToast({
						                      title: '上传失败',
						                      icon: 'none'
						                    })
						                  }
						                }
						              })
						            })
						          }
			        })
			},
			open(){
			    this.$refs.popup.open()
			},
			nicheng(){
				uni.navigateTo({
					url:'/pages/my/ziliao/xiangqing'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/ziliao/index.less");
</style>

