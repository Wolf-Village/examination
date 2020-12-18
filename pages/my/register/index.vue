<template>
	<view class="register">
		<view class="register-reg">
			您好，请注册
		</view>
		<view class="registerInput">
			<input class="registerInput-input" type="number" value="" placeholder="请输入手机号" v-model="username" maxlength="11"/>
			<input class="registerInput-input" type="text" password value="" placeholder="请输入密码" v-model="password" maxlength="16"/>
			<input class="registerInput-input" type="text" password value="" placeholder="请确认密码" v-model="regpassword" maxlength="16"/>
			<view class="yinsi">
				注册即同意<view style="color: rgb(180,214,252);">《用户使用协议》</view>和<view style="color: rgb(180,214,252);">《隐私协议》</view>
			</view>
			<view type="default" @click="reg" class="registerLog">立即注册</view>
		</view>
		<view style="position: absolute;bottom: 5vh;width: 100vw;text-align: center;">
			如无法登陆，请点击账户<view style="font-weight: 600;display: inline-block;">申诉请求</view>客服协助
		</view>
		
	</view>
</template>

<script>
	import {baseUrl} from '@/api/index.js'
	export default{
		data(){
			return{
				username:'',
				password:'',
				regpassword:'',
			}
		},
		methods:{
			reg(){
				if(this.username == ''){
					uni.showToast({
						title:'手机号不能为空！'
					})
				}else if(this.username < 11){
					uni.showToast({
						title:'手机号不正确！'
					})
				}else if(this.password == ''){
					uni.showToast({
						title:'密码不能为空！'
					})
				}else if(this.password > 6 && this.password <16){
					uni.showToast({
						title:'密码长度在6-16位！'
					})
				}else if(this.regpassword != this.password){
					uni.showToast({
						title:'两次输入密码不一致！'
					})
				}else{
					uni.request({
						// 请求接口
						url:`${baseUrl}/users/register`,
						// 请求方式
						method:'POST',
						data:{username:this.username,password:this.password},
						success(data){
							console.log(data.data)
							if(data.data.code === 0){
								uni.showToast({
									title:'登陆失败 请重试',
									icon:'none'
								});
							}else if(data.data.code === 200){
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

