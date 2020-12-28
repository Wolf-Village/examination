<template>
	<view class="register">
		<view class="register-reg">
			您好，请注册
		</view>
		<view class="registerInput">
			<input class="registerInput-input" value="" placeholder="请输入邮箱" v-model="username" />
			<input type="text" placeholder="验证码" v-model="code" />
			<button type="default" style="width: 30vw;" @click="sendcode" :disabled="isdisabled">{{disabledtext}}</button>
			<input class="registerInput-input" type="text" password value="" placeholder="请输入密码" v-model="password" maxlength="16" />
			<input class="registerInput-input" type="text" password value="" placeholder="请确认密码" v-model="regpassword" maxlength="16" />
			<view class="yinsi">
				注册即同意<view style="color: #59ABFF;">《用户使用协议》</view>和<view style="color: #59ABFF;">《隐私协议》</view>
			</view>
			<view type="default" @click="reg" class="registerLog">立即注册</view>
		</view>
		<view style="position: absolute;bottom: 5vh;width: 100vw;text-align: center;">
			如无法登陆，请点击账户<view style="font-weight: 600;display: inline-block;">申诉请求</view>客服协助
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
				username: '',
				password: '',
				regpassword: '',
				code: "",
				isdisabled: false,
				disabledtext: "发送验证码"
			}
		},
		methods: {
			sendcode() {
				var _this = this;
				_this.isdisabled = true;
				_this.disabledtext = "正在发送，请稍等";
				var num = 60;
				uni.request({
					// 请求接口
					url: `${baseUrl}/users/getlma`,
					// 请求方式
					method: 'POST',
					data: {
						username: _this.username
					},
					success(data) {
						// console.log(data.data)
						if (data.data.code === 0) {
							uni.showToast({
								title: '发送失败 请重试',
								icon: 'none'
							});
						} else if (data.data.code === 200) {
							var numli = setInterval(() => {
								if (num == 0) {
									_this.isdisabled = false;
									clearInterval(numli)
									_this.disabledtext = "发送验证码";
									return;
								}
								_this.disabledtext = num + "秒后可重试";
								num -= 1;
							}, 1000)
						}
					}
				})
			},
			reg() {
				if (this.username == '') {
					uni.showToast({
						title: '手机号不能为空！',
						icon: 'none'
					})
				} else if (this.username < 11) {
					uni.showToast({
						title: '手机号不正确！',
						icon: 'none'
					})
				} else if (this.password == '') {
					uni.showToast({
						title: '密码不能为空！',
						icon: 'none'
					})
				} else if (this.password > 6 && this.password < 16) {
					uni.showToast({
						title: '密码长度在6-16位！',
						icon: 'none'
					})
				} else if (this.regpassword != this.password) {
					uni.showToast({
						title: '两次输入密码不一致！',
						icon: 'none'
					})
				} else {
					var _this = this;
					uni.request({
						// 请求接口
						url: `${baseUrl}/users/register`,
						// 请求方式
						method: 'POST',
						data: {
							username: _this.username,
							password: _this.password,
							code: _this.code
						},
						success(data) {
							// console.log(data.data)
							if (data.data.code === 0) {
								uni.showToast({
									title: '注册失败 请重试',
									icon: 'none'
								});
							} else if (data.data.code === 200) {
								uni.navigateTo({
									url: '/pages/my/login/login'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/register/index.less");
</style>
