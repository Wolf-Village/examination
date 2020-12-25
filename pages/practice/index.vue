<template>
	<view>
		<view class="top margin-tb bg-white padding">专项练习</view>
		<view class=" flex justify-around flex-wrap">
			<view class="shadow bg-white margin-top flex padding-lr padding-tb-sm align-center " v-for='(item,index) in imgList'
			 :key='index' @click="toSubject(item.name)">
				<image class="margin-right-sm" :src="item.imgUrl"></image>
				<view>{{item.title}}</view>
			</view>
		</view>
		<view class="top margin-tb bg-white padding">模拟考试</view>
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-grey lg" @click="randClick">点击进入模拟考试</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [{
					title: 'HTML',
					name: "html",
					imgUrl: '/static/practice/006.png',
				}, {
					title: 'CSS',
					name: "css",
					imgUrl: '/static/practice/007.png',
				}, {
					title: 'JavaScript',
					name: 'js',
					imgUrl: '/static/practice/009.png',
				}, {
					title: 'jQuery',
					name: "jq",
					imgUrl: '/static/practice/008.png',
				}, {
					title: 'AJAX',
					name: "ajax",
					imgUrl: '/static/practice/013.png',
				}, {
					title: 'ES6',
					name: "es6",
					imgUrl: '/static/practice/012.png',
				}, {
					title: 'Vue',
					name: 'vue',
					imgUrl: '/static/practice/011.png',
				}, {
					title: 'React',
					name: 'react',
					imgUrl: '/static/practice/010.png',
				}, {
					title: 'Node',
					name: 'node',
					imgUrl: '/static/practice/node.png',
				}, {
					title: 'Webpack',
					name: 'webpack',
					imgUrl: '/static/practice/webpack.png',
				}, ]
			};
		},
		methods: {
			// 进入练习页面
			toSubject: function(myclass) {
				uni.navigateTo({
					url: `./practice?myclass=${myclass}`
				});
			},
			// 进入随机练习题
			randClick: function(){
				uni.navigateTo({
					url: './practice'
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.top {
		width: 100%;
		border-left: 4px solid #2caeff;
	}

	.margin-top {
		background-color: white;
		width: 43vw;
		// box-shadow: 1px 1px 3px 0px darkgrey;

		image {
			width: 8vw;
			height: 8vw;
		}
	}
</style>
