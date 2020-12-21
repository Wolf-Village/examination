<template>
	<view>
		<view class="margin-xl cardbox shadow bg-white radius padding-sub ">
			<view class="cu-avatar xl round bg-grey" style="background-image:url(http://8.131.83.251:3981/img/upload/default.png);"></view>
			<view class="padding">考试类型：前端考试</view>
			<view class="padding">考试标准：</view>
			<view class="padding">合格标准：90分及格</view>
			<view class="padding">出题规则：根据北极星工作室技术部出题规则</view>
			<view class="text-xs padding">
				<text class="text-gray">计分规则：考试不能修改答案，每错1题扣10分，错题累计超过5道，考试不通过。</text>
			</view>
		</view>
		<view class="margin-xl">
			<view class="padding flex flex-direction">
				<button class="cu-btn round bg-blue lg" @click="toExamination">开始考试</button>
				<button class="cu-btn round bg-red margin-tb-sm lg">考前练习</button>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		methods: {
			toExamination(){
				uni.navigateTo({
					url:'./examination'
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.cardbox {
		height: 80vw;
		position: relative;
		padding-top: 5vw;
		margin-top: 5vh;
		.cu-avatar {
			position: absolute;
			left: 50%;
			top: 0;
			transform: translate(-50%, -50%);
		}
	}
</style>
