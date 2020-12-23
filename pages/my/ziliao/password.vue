<template>
	<view class="name">
		<view class="name-input">
			<input type="text" value="" password maxlength="16" placeholder="请输入旧密码"  v-model="oldpassword"/>
		</view>
		<view class="name-input">
			<input type="text" value=""password maxlength="16" placeholder="请输入新密码" v-model="newpassword"/>
		</view>
		<view class="name-input">
			<input type="text" value="" password maxlength="16" placeholder="请确认密码"  v-model="repnewpassword"/>
		</view>
		<view class="name-input button" @click="confirm">
			提交修改
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '@/api/index.js'
	export default {
		data() {
			return {
				newpassword:'',
				oldpassword:'',
				repnewpassword:'',
			}
		},
		methods: {
			confirm(){
				const admin = uni.getStorageSync('admin')
				const {userid} = admin
				// console.log(userid)
				if(admin == ''){
					uni.showToast({
						title:'请登录账号',
						icon:'none'
					})
				}else if(this.oldpassword == ''){
					uni.showToast({
						title:'旧密码不能为空',
						icon:'none'
					})
				}else if(this.newpassword == ''){
					uni.showToast({
						title:'新密码不能为空',
						icon:'none'
					})
				}else if(this.newpassword > 6 && this.newpassword <16){
					uni.showToast({
						title:'密码长度在6-16位！',
						icon:'none'
					})
				}else if(this.repnewpassword !== this.newpassword){
					uni.showToast({
						title:'新密码不能为空',
						icon:'none'
					})
				}else{
					uni.request({
						url:`${baseUrl}/users/replace`,
						method:'POST',
						data:{
							userid:userid,
							oldpassword:this.oldpassword,
							newpassword:this.newpassword,
						},
						success(data){
							if(data.data.code == 200){
								uni.showToast({
									title:'修改成功'
								})
								uni.navigateTo({
									
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
	.name{
		height: 100vh;
		width: 100vw;
		background-color: white;
		padding: 8vh 6vw;
	}
	.name-input{
		margin-left:5vw;
		height: 7vh;
		line-height: 7vh;
		margin-right: 5vw;			
		input{
			float: left;
			height: 7vh;
			padding-left: 2vw;
			width: 80vw;
			border-bottom: 1px solid  #DCDFE6;
			padding-left: 2vw;
		}
	}
	.button{
		height: 5vh;
		width: 80vw;
		background-color: rgb(180,214,252);
		text-align: center;
		color: white;
		border-radius: 20px;
		margin-top: 10vh;
		line-height: 5vh;
	}
</style>

