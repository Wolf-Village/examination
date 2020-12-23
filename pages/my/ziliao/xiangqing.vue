<template>
	<view class='body'>
		<view class="body-ni">昵称</view><input type="text" placeholder="请输入昵称" v-model="nickname"/>
		<view class="body-text">仅支持中英文、数字及'_'</view>
		<view class="baocun" @click="baocun">
			保存
		</view>
	</view>
</template>

<script>
import {baseUrl} from '../../../api/index.js'
	export default{
		data(){
			return {
				nickname:'',
			}
		},
		methods:{
			baocun(){
			    let nickname = this.nickname;
				console.log(nickname)
				uni.request({
					url:`${baseUrl}/users/modify`,
					method:'POST',
					data:{nickname:this.nickname},
					success(data){
						console.log(data.data.code)
						if(data.data.code === 0){
							uni.showToast({
								title:'修改失败 请重试',
								icon:'none'
							})
						}else if(data.data.code === 200){
								uni.navigateTo({
								title:'修改成功',
								icon:'none'
								})
							}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/ziliao/index.less");
</style>

