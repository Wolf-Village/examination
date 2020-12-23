<template>
	<view class="name">
		<view class="name-input">
			<input type="text" v-model="nickname" placeholder="请输入用户昵称" />
		</view>
		<view class="name-input button" @click="confirm">
			确认修改
		</view>
	</view>
</template>
<script>
	import {
		baseUrl
	} from '@/api/index.js'
	export default {
		data() {
			return {
				nickname: "",
			}
		},
		methods: {
			confirm() {
				let _this = this
				const admin = uni.getStorageSync('admin')
				const {
					userid
				} = admin;
				if (admin == '') {
					uni.showToast({
						title: "还未登录，请登录",
						icon: 'none'
					})
				} else if (this.nickname == '') {
					uni.showToast({
						title: "签名不能为空",
						icon: 'none'
					})
				} else {
					uni.request({
						url: `${baseUrl}/users/modify`,
						method: "POST",
						data: {
							userid: userid,
							nickname: this.nickname,
						},
						success(data) {
							if (data.data.code == 200) {
								uni.showToast({
									title: data.data.msg,
									icon: 'none'
								})
								_this.$store.commit('getNewZiliao', {
									nickname: _this.nickname
								})
								uni.navigateTo({
									url: './index'
								})
							} else {
								uni.showToast({
									title: "修改失败"
								})
							}
						}
					})
				}
			}
		}
	}
</script>
<style lang='scss' scoped>
	.name {
		height: 100vh;
		width: 100vw;
		background-color: white;
		padding: 8vh 6vw;
	}

	.name-input {
		margin-left: 5vw;
		height: 7vh;
		line-height: 7vh;
		margin-right: 5vw;

		input {
			float: left;
			height: 7vh;
			padding-left: 2vw;
			width: 80vw;
			border-bottom: 1px solid #DCDFE6;
			padding-left: 2vw;
		}
	}

	.button {
		height: 5vh;
		width: 80vw;
		background-color: rgb(180, 214, 252);
		text-align: center;
		color: white;
		border-radius: 20px;
		margin-top: 10vh;
		line-height: 5vh;
	}
</style>
