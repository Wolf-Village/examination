<template>
	<view class="practice">
		<view class="top">专项练习</view>
		<view class="margin-top" v-for='(item,index) in imgList' :key='index' @click="toSubject(item.title)" >
			<image :src="item.imgUrl"></image>
			<view >{{item.title}}</view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
			imgList:[{
				title:'HTML',
				imgUrl:'/static/practice/006.png',
			},{
				title:'CSS',
				imgUrl:'/static/practice/007.png',
			},{
				title:'JavaScript',
				imgUrl:'/static/practice/009.png',
			},{
				title:'jQuery',
				imgUrl:'/static/practice/008.png',
			},{
				title:'AJAX',
				imgUrl:'/static/practice/013.png',
			},{
				title:'ES6',
				imgUrl:'/static/practice/012.png',
			},{
				title:'Vue',
				imgUrl:'/static/practice/011.png',
			},{
				title:'React',
				imgUrl:'/static/practice/010.png',
			},{
				title:'Node',
				imgUrl:'/static/practice/node.png',
			},{
				title:'Webpack',
				imgUrl:'/static/practice/webpack.png',
			},
			]
		};
  },
  methods: {
    toSubject: function(myclass) {
			console.log(myclass)
      uni.navigateTo({
        url: `./practice?myclass=${myclass}`
      });
    }
  }
};
</script>

<style scoped lang="less">
	.practice{
		width: 100vw;
		height: 100vh;
	}
	.top{
		height: 6vh;
		width: 100%;
		line-height: 6vh;
		padding-left: 5vw;
		background-color: white;
		margin: 1vh 0vw;
		box-shadow: 1px 1px 3px 0px darkgrey;
	}
	.margin-top{
		background-color: white;
		width: 43vw;
		height: 6vh;
		margin: 2vh 0vw 0vh 5vw;
		float: left;
		box-shadow: 1px 1px 3px 0px darkgrey;
		image{
			width: 8vw;
			height: 8vw;
			margin: 0px;
			float: left;
			margin: 9px;
		}
		view{
			float: left;
			line-height: 6vh;
			height: 6vh;
		}
	}
</style>
