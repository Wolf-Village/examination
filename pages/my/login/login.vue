<template>
	<view class="register">
		<view class="register-reg">
			您好，请登录
		</view>
		<view class="registerInput">
			<input class="registerInput-input" type="number" value="" placeholder="请输入手机号"  v-model="username" maxlength="11"/>
			<input class="registerInput-input" type="text" value="" placeholder="请输入密码"  v-model="password" password maxlength="16"/>
			<view class="yinsi">
				登录即同意<view style="color: rgb(180,214,252);" @click="xieyi">《用户使用协议》</view>和<view style="color: rgb(180,214,252);">《隐私协议》</view>
			</view>
			<view type="default" @click="open" class="registerLog">立即登录</view>
			<uni-popup ref="popup" type="dialog">
			    <uni-popup-dialog type="input" message="成功消息" :duration="2000" :before-close="true" @close="close" @confirm="confirm" content='登录即同意《刷题宝认证服务与隐私协议》《用户隐私协议》《隐私协议》' >
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view style="position: absolute;bottom: 5vh;width: 100vw;text-align: center;">
			如无法登陆，请点击账户<view style="font-weight: 600;display: inline-block;">申诉请求</view>客服协助
		</view>
	</view>
</template>

<script>
	// 引入baseUrl
	import {baseUrl} from '@/api/index.js'
	import { mapState , mapMutations } from 'vuex'
	export default{
		data(){
			return{
				username:'',
				password:''
			}
		},
		methods:{
			getUser(that){
				if(uni.getSystemInfoSync('bfn_userInfo')){
					that.userInfo = uni.getSystemInfoSync('bfn_userInfo');
					console.log('用户信息',that.userInfo)
				}else{
					uni.navigateTo({
						url:'/pages/my/login/index'
					})
				}
			},
			// 取消后事件处理
			close(done){
			    done()
			},
			// 点击确认登录后事件处理
			confirm(done,value){
				uni.navigateBack({
				    delta: 1
				});
				done()
			},
			open(){
			    this.$refs.popup.open()
				if(this.username == ''){
					uni.showToast({
						title:'用户名不能为空',
						icon:'none'
					})
				}else if(this.username < 11){
					uni.showToast({
						title:'用户名不正确',
						icon:'none'
					})
				}else if(this.password == ''){
					uni.showToast({
						title:'密码不能为空',
						icon:'none'
					})
				}else if(this.password > 6 && this.password < 16){
					uni.showToast({
						title:'密码不正确',
						icon:'none'
					})
				}else{
					const userObj = {
						username:this.username,
						password:this.password
					}
					this.$store.dispatch('login',userObj)
				}
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
	@import url("@/pages/my/register/index.less");
</style>

