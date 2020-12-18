<template>
	<view class="collectBody">
		<view class="collectBody-title" @click="shoucang">
			累计收藏 道
		</view>
		<view class="collectBody-list" v-for='(item,index) in lists' :keys='index' :text='item.id'>
				<uni-swipe-action>
				    <uni-swipe-action-item :right-options="options" @click="cancel(item.id)" @change="change">
						<uni-collapse accordion="true">
						    <uni-collapse-item :title="item.name + '( '+ item.gudge +' )'" showAnimation='true' >
						        <view class="list-body">
						        	<view class="list-left">
						        		<view class="list-content">
						        			A、{{item.a}}
											{{index}}
						        		</view>
						        		<view class="list-content">
						        			B、{{item.b}}
						        		</view>
						        		<view class="list-content">
						        			C、{{item.c}}
						        		</view>
						        		<view class="list-content">
						        			D、{{item.d}}
						        		</view>
						        	</view>
						        </view>
						    </uni-collapse-item>
						</uni-collapse>
				    </uni-swipe-action-item>
				</uni-swipe-action>	
			</view>				
		</view>
	</view>
</template>
<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import {baseUrl} from '@/api/index.js'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
export default {
	components: {uniCollapse,uniCollapseItem},
	
  data(){
    return {
		uid:'2',
		lists:[
			{
				name:'在 css 选择器当中，优先级排序正确的是  ',
				a:'id选择器>标签选择器>类选择器',
				b:'标签选择器>类选择器>id选择器',
				c:'类选择器>标签选择器>id选择器',
				d:'id选择器>类选择器>标签选择器',
				gudge:'A'
			},
			{
				name:'在 css 选择器当中，优先级排序正确的是  ',
				a:'id选择器>标签选择器>类选择器',
				b:'标签选择器>类选择器>id选择器',
				c:'类选择器>标签选择器>id选择器',
				d:'id选择器>类选择器>标签选择器',
				gudge:'C'
			},
			{
				name:'下列定义的 css 中，哪个权重是最低的？',
				a:'#game .name',
				b:'#game .name span',
				c:'#game div',
				d:'#game div.name',
				gudge:'A'
			},
			{
				name:'关于HTML语义化，以下哪个说法是正确的？',
				a:'语义化的HTML有利于机器的阅读，如PDA手持设备、搜索引擎爬虫；但不利于人的阅读',
				b:'Table 属于过时的标签，遇到数据列表时，需尽量使用 div 来模拟表格',
				c:'语义化是HTML5带来的新概念，此前版本的HTML无法做到语义化',
				d:'header、article、address都属于语义化明确的标签',
				gudge:'B'
			},
			{
				name:'下列说法正确的有',
				a:'visibility:hidden;所占据的空间位置仍然存在，仅为视觉上的完全透明；',
				b:'display:none;不为被隐藏的对象保留其物理空间；',
				c:'visibility:hidden;与display:none;两者没有本质上的区别；',
				d:'visibility:hidden;产生reflow和repaint（回流与重绘）；',
				gudge:'D'
			}
		],
		options:[
			{
				text: '取消',
				style: {
					backgroundColor: '#007aff'
				}
			}, {
				text: '删除',
				style: {
					backgroundColor: '#dd524d'
				}
			}
		  ]
    }
  },
  methods:{
	  shoucang(){
		  uni.request({
		  	// 请求接口
		  	url:`${baseUrl}/users/collection`,
		  	// 请求方式
		  	method:'POST',
		  	data:{userid:this.userid,id:this.id,type:this.type},
		  	success(data){
		  		console.log(data)
		  		uni.navigateTo({
		  			url: '/pages/my/login/login'
		  		})
		  	}
		  })
	  }
  }
}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/collect/index");
</style>