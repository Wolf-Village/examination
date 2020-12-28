<template>
	<view class="ziliaoBody">
		<view class="ziliaoList">
			<view class="list-item">
				<view class="list-left">头像</view>
				<image class="list-image" :src="$store.state.admin.portrait" @click="getPhoto"></image>
			</view>
			<view class="list-item" @click="selfname">
				<view class="list-left">昵称</view>
				<view class="list-center">{{!admin.nickname? '未登录' : admin.nickname}}</view>
			</view>
			<view class="list-item">
				<view class="list-left">性别</view>
				<view class="list-center" style="width: 25vw;">{{!admin.sex? '未登录' : admin.sex}}</view>
			</view>
			<view class="list-item">
				<view class="list-left">账号</view>
				<view class="list-center" style="width: 25vw;">{{!admin.username ? '未登录' :admin.username}}</view>
			</view>
			<view class="list-item">
				<view class="list-left" @click="signature">个性签名</view>
				<view class="list-center" style="width: 25vw;">{{!admin.signature? '未登录' : admin.signature}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../../api/index.js'
	import {
		pathToBase64,
		base64ToPath
	} from '../../../js_sdk/gsq-image-tools/image-tools/index.js'
	export default {
		data() {
			return {
				admin: '',
				username: '',
				nickname: ''
			}
		},
		onShow() {
			// 拿到存储在本地的数据
			const admin = uni.getStorageSync('admin')
			this.admin = admin;
			if (admin != '') {
				const {
					username
				} = admin;
				this.username = username
				console.log(this.username)
			}
		},
		methods: {
			// 获取用户投向信息
			getPhoto() {
				let _this = this;
				uni.chooseImage({ //选择图片
					count: 1,
					sizeType: ["compressed"],
					success(res) {
						var imgsFile = res.tempFilePaths[0]; //获取图片的临时资源
						uni.uploadFile({ //上传代码
							url: "http://8.131.83.251:3981/users/herad", //本地 node.js 服务器地址
							filePath: imgsFile,
							formData: {
								userid: _this.$store.state.admin.userid,
								qianurl: _this.$store.state.admin.portrait
							},
							name: "file", //这个东西有点类似与 form 表单中的 name 值 在后面也需要这个
							success: function(res) {
								let data = JSON.parse(res.data);
								_this.$store.commit("getNewZiliao", {
									portrait: data.imgurl
								})
							}
						})
					}
				})
			},
			open() {
				this.$refs.popup.open()
			},
			selfname() {
				uni.navigateTo({
					url: '/pages/my/ziliao/self'
				})
			},
			bianji() {
				uni.navigateTo({
					url: '/pages/my/ziliao/bianji'
				})
			},
			signature() {
				uni.navigateTo({
					url: '/pages/my/ziliao/signature'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/ziliao/index.less");
</style>
