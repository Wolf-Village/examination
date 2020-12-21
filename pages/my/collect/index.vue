<template>
	<view class="collectBody">
		<view class="collectBody-title" @click="shoucang">
			累计收藏 道
		</view>
		<uni-list class="collectBody-list" v-for="(item,index) in productList"  :key='index' :text='item.id'>		
			    <uni-list-item>
					<!--  :title="item.author_name" :note="item.title" -->
					<!-- <uni-swipe-action> -->
					    <uni-swipe-action-item :right-options="options" @click="cancel(item.id)" @change="change">
							<uni-collapse accordion="true">
							    <uni-collapse-item :title="item.name + '( '+ item.gudge +' )'" showAnimation='true' >
							        <view class="list-body">
							        	<view class="list-left">
							        		<view class="list-content">
												ssssss
							        			A、{{item.id}}
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
					<!-- </uni-swipe-action>	 -->
				</uni-list-item>	  		 
			</uni-list>
			</view>				
		</view>
</template>
<script>
import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
import {baseUrl} from '@/api/index.js'
import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
export default {
	components: {uniCollapse,uniCollapseItem,uniList,uniListItem},
	
  data(){
    return {
		// uid:'2',
		productList: [],
		id:'',
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
	onLoad() {
		this.getList();
	},
	methods:{
		 //  shoucang(){
			//   uni.request({
			// 	// 请求接口
			// 	url:`${baseUrl}/users/collection`,
			// 	// 请求方式
			// 	method:'POST',
			// 	data:{id:this.id},
			// 	success(data){
			// 		console.log(data.data.code)
			// 		uni.navigateTo({
			// 			url: '/pages/my/login/login'
			// 		})
			// 	}
			//   })
	  // },
	getList() {			
	  	uni.request({
			url:`${baseUrl}/users/collection`,					
			method: 'POST',
		  	data:{id:this.id},
			success(data){
	  			console.log(data);
	  			this.productList = data;
				},					
	  		});
		},
  }
}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/collect/index");
</style>