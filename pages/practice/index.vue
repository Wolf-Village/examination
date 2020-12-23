<template>
	<view class="flex flex-wrap justify-around bor">
		<view class="margin-top flex radius padding-lr align-center width40" v-for='(item,index) in imgList' :key='index' :style="{background:item.bgCoclor }" @click="toSubject(item.title)" >
			<image class="radius margin-tb-sm margin-right" :src="item.imgUrl"></image>
			<view  class="radius">{{item.title}}</view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {
			imgList:[{
				title:'html',
				imgUrl:'/static/practice/006.png',
				bgCoclor:'#f37b1d'
			},{
				title:'css',
				imgUrl:'/static/practice/007.png',
				bgCoclor:'#fbbd08'
			},{
				title:'js',
				imgUrl:'/static/practice/009.png',
				bgCoclor:'#8dc63f'
			},{
				title:'jq',
				imgUrl:'/static/practice/008.png',
				bgCoclor:'#39b54a'
			},{
				title:'ajax',
				imgUrl:'/static/practice/013.png',
				bgCoclor:'#1cbbb4'
			},{
				title:'es6',
				imgUrl:'/static/practice/012.png',
				bgCoclor:'#0081ff'
			},{
				title:'vue',
				imgUrl:'/static/practice/011.png',
				bgCoclor:'#6739b6'
			},{
				title:'react',
				imgUrl:'/static/practice/010.png',
				bgCoclor:'#9c26b0'
			},{
				title:'node',
				imgUrl:'/static/practice/node.png',
				bgCoclor:'#e03997'
			},{
				title:'webpack',
				imgUrl:'/static/practice/webpack.png',
				bgCoclor:'#a5673f'
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
	.width40{
		width: 40vw;
		image{
			width: 10vw;
			height:10vw;
		}
	}
</style>
