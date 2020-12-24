<template>
	<view class="loginAll">
		<view class="loginTop">
			选择登录方式
		</view>
		<view class="loginImg">
			<image src="../../../static/my/phone.png" mode=""></image>
		</view>
		<view class="button" @click="login">手机号登录</view>
		<view class="order">
			使用其他方式登录
		</view>
		<view class="orderList">
			<view class="" @click="weixin">
				<image src="../../../static/my/weixin.png" mode=""></image>
			</view>
			<view class="" @click="weibo">
				<image src="../../../static/my/weibo.png" mode=""></image>
			</view><view class="" @click="apple">
				<image src="../../../static/my/apple.png" mode=""></image>
			</view><view class="" @click="QQ">
				<image src="../../../static/my/QQ.png" mode=""></image>
			</view>
		</view>
		<view class="reg" @click="register">
			立即注册
		</view>
		<view class="agreement">
			登录即同意<view style="color: #59ABFF;" @click="xieyi">《用户使用协议》</view>和<view style="color: #59ABFF;">《隐私协议》</view>
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '@/api/index.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
	    components: {
	        uniPopup,
	        uniPopupMessage,
	        uniPopupDialog
	    },
		methods:{
			weixin(){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				      }
				    });
				  }
			});
		},
		login(){
			uni.navigateTo({
			    url: '/pages/my/login/login'
			});
		},
		register(){
			uni.navigateTo({
			    url: '/pages/my/register/index'
			});
		},
		xieyi(){
			uni.navigateTo({
				url:'/pages/my/serve/index'
			})
		}
	}
}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/login/index.less");
</style>
