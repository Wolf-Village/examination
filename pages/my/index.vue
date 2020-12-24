<template>
	<view class="myAll">
		<view class="myTop">
			<view class="myTop-heade">
				<view class="myTop-image">
					<image src="../../static/my/zhuce.png" mode="" @click="login"></image>
				</view>
				<view class="mYTopHL">
					<text>{{admin == '' ? '未登录' :admin.username}}</text>
				</view>
				<view class="myTupHh">
					立即预测考试通过率
				</view>
			</view>
		</view>
		<view class="myList">
			<view class="myList-collect">
				<view style="margin: 7px 0px;" @click="ziliao" class="collect-view">
					个人信息
				</view>
				<view class="" @click="collect" class="collect-view">
					我的收藏
				</view>
				<view class="" @click="serve" class="collect-view">
					服务协议
				</view>
				<view class="" @click="fankui" class="collect-view">
					帮助与反馈
				</view>
				<view class="collect-view" style="margin: 7px 0px;text-align: center;padding-left: 0px;" @click="open">
					退出
				</view>
				<uni-popup ref="popup" type="dialog">
				    <uni-popup-dialog type="input" message="成功消息" content='是否确认退出登录' :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
	    components: {
	        uniPopup,
	        uniPopupMessage,
	        uniPopupDialog
	    },
		data() {
			return {
				username:''
			}
		},
		computed:{
			...mapState(['admin'])
		},
		methods: {
			login(e){
				uni.navigateTo({
				    url: '/pages/my/login/index'
				});
			},
			collect(){
				uni.navigateTo({
					url:'/pages/my/collect/index'
				})
			},
			ziliao(){
				uni.navigateTo({
					url:'/pages/my/ziliao/index'
				})
			},
			fankui(){
				uni.navigateTo({
					url:'/pages/my/fankui/index'
				})
			},
			serve(){
				uni.navigateTo({
					url:'/pages/my/serve/index'
				})
			},
			open(){
			    this.$refs.popup.open()
			},
			 close(done){
			    done()
			},
			confirm(done,value){
				uni.switchTab({
					url:'/pages/home/home'
				})
				uni.clearStorage('admin')
				this.admin = '';
				this.username=''
			    done()
			}
		}
	}
</script>

<style lang="less" scoped>
	.myAll{
		// width: 100%;
		.myTop{
			height: 8rem;
			width: 100%;
			background-color:white;
			.myTop-heade{
				position: absolute;
				left: 2rem;
				top: 1.5rem;
				.myTop-image{
					height: 4rem;
					width: 4rem;
					border: 1px solid red;
					text-align: center;
					border-radius: 50%;
					image{
						width: 3.4rem;
						height: 3.4rem;
						margin-top: 2px;
					}
				}
				.mYTopHL{
					position: absolute;
					top: 1rem;
					width: 29rem;
					left: 5rem;
				}
				.myTupHh{
					position: absolute;
					    top: 2.4rem;
					    width: 29rem;
					    left: 5rem;
					    font-size: 13px;
					    color: gray;
				}
			}
		}
		.myList{
			position: relative;
			height: 20rem;
			width: 100%;
			.myList-collect{
				width: 100%;
				position: absolute;
				.collect-view{
					height: 3rem;
					line-height: 3rem;
					padding-left: 10%;
					background-color: white;
					margin: 1px 0px;
				}
			}
		}
	}
</style>
