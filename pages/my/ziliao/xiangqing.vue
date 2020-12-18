<template>
	<view class='body'>
		<view class="body-ni">昵称</view><input type="text" placeholder="请输入昵称" v-model="username"/>
		<view class="body-text">仅支持中英文、数字及'_'</view>
		<view class="baocun" @click="baocun">
			保存
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				username:'',
			}
		},
		methods:{
			baocun(){
			    let username = this.username;
				console.log(username)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/ziliao/index.less");
</style>

