<template>
	<view class="collectBody">
		<view class="collectBody-title">
			累计收藏{{productList.length}}道
		</view>
		<view class="collectBody-list" v-for="(item,index) in productList"  :key='index' :text='item.id'>		
			<uni-collapse accordion="true">
				<uni-collapse-item  showAnimation='true' :title="item.name + '( '+ item.answer +' )'">
					<view class="list-body">
						<view class="list-left" v-for="(items,indexs) in item.options" :key='indexs'>
							<view class="list-content">
							    {{items.title}}
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>				
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
		productList: [],
		userid:'9',
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
	getList() {			
		const admin = uni.getStorageSync('admin')
		const sign = admin.sign;
		const _this = this;
	  	uni.request({
			url:`${baseUrl}/problem/test`,					
			method: 'POST',
		  	data:{data:sign},
			success(data){
				var newdata = data.data.data.map(item => {
					item.options = JSON.parse(item.options)
					return item
				})
	  			_this.productList = newdata;
				},					
	  		});
		},
  }
}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/collect/index");
</style>