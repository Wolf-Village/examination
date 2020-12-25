<template>
	<view class="text-xxl">
		<view class="">
			您答对了<text class="text-green">{{this.true}}</text>道题
		</view>
		<view class="">
			您答错了<text class="text-red">{{this.false}}</text>道题
		</view>
		<view class="">
			结算分数为{{this.true*2}}分
		</view>
		<view class="">
			{{this.true*2>60? '及格':'不及格'}}
		</view>
		<button class="bg-blue margin-lr" @click="outTo">退出</button>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				true: 0,
				false: 0
			}
		},
		onLoad(option) {
			this.true = option.true
			this.false = option.false
		},
		methods:{
			outTo:function(){
				uni.switchTab({
					url:'./index'
				})
			}
		}
	}
</script>

<style>
</style>
