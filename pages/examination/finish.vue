<template>
	<view class="text-xxl">
		<view class="result">
			<view class="result_left">
				<!--  -->
				<vusSphereProgress :percent="trueTitle * 2" :color="['#8799a3','#39b54a','#8dc63f']"></vusSphereProgress>
				<view class="text-center margin-top-sm lines-green">正确</view>
			</view>
			<view class="result_content">
				<view class="text-pink text-center margin-top font">{{ trueTitle * 2 }}分</view>
				<view class="text-center margin-top color">{{ trueTitle * 2 > 60 ? '及格' : '不及格' }}</view>
			</view>
			<view class="result_left">
				<vusSphereProgress :percent="falseTitle * 2" :color="['#8799a3','#f43f3b','#ec008c']"></vusSphereProgress>
				<view class="text-center margin-top-sm color">错误</view>
			</view>
		</view>
		<button class="bg-blue margin-lr margin-top-xl" @click="outTo">退出</button>
	</view>
</template>

<script>
	import vusSphereProgress from '../../components/vus-sphere-progress/vus-sphere-progress.vue';
export default {
	components: {
		vusSphereProgress
	},
	data() {
		return {
			trueTitle: 0,
			falseTitle: 0,
		};
	},
	onLoad(option) {
		let trueNum = 0;
		let falseNum = 0;
		let time = setInterval(() => {
			if(option.true > trueNum){
				trueNum = trueNum + 5;
				this.trueTitle = trueNum;
			}else{
				clearInterval(time);
			}
		},30)
		let time2 = setInterval(() => {
			if(option.false > falseNum){
				falseNum = falseNum + 5;
				this.falseTitle = falseNum;
			}else{
				clearInterval(time2);
			}
		},30)
	},
	methods: {
		outTo: function() {
			uni.switchTab({
				url: './index'
			});
		}
	}
};
</script>

<style scoped>
.result {
	width: 100%;
	display: flex;
	height: 200px;
	margin-top: ;
}
.result_left {
	padding-top: 4rem;
	padding-left: 1rem;
	box-sizing: border-box;
	width: 32%;
	height: 200px;
	overflow: hidden;
}
.result_content {
	width: 36%;
}
.result_right {
	width: 32%;
}
.font {
	font-size: 3rem;
}
.margin-top {
	margin-top: 2rem;
}
.color{
	color: red;
}
</style>
