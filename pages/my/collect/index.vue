<template>
	<view class="collectBody">
		<view class="collectBody-title">
			累计收藏{{productList.length}}道
		</view>
		<view class="collectBody-list" v-for="(item,index) in productList" :key='index' :text='item.id'>
			<uni-collapse accordion="true">
				<uni-collapse-item class="collectTitle" :title="item.name + '( '+ answer[item.answer]  +' )'">
					<view class="list-body">
						<view class="list-left" v-for="(items,indexs) in item.options" :key='indexs'>
							<view class="list-content">
								{{items.title}}
							</view>
						</view>
						<!-- 收藏按钮 -->
						 <view class='cu-tag line-red round margin-tr fr xl' @click="onClick(index,item.id)">取消收藏</view>
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
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	import {
		baseUrl
	} from '@/api/index.js'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniFav
		},

		data() {
			return {
				productList: [],
				userid: '9',
				answer: {
					0: 'A',
					1: 'B',
					2: 'C',
					3: 'D',
					4: 'E',
					5: 'F',
					true: '√',
					false: '×',
				},
				admin: uni.getStorageSync('admin') || ''
			}
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				const admin = uni.getStorageSync('admin')
				const sign = JSON.stringify(admin.sign);
				console.log(sign)
				const _this = this;
				uni.request({
					url: `${baseUrl}/problem/test`,
					method: 'POST',
					data: {
						data: sign
					},
					success(data) {
						var newdata = data.data.data.map(item => {
							item.options = JSON.parse(item.options)
							return item
						})
						_this.productList = newdata;
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 取消收藏
			onClick:function(index,id){
				this.productList.splice(index,1)
				const userid = uni.getStorageSync('admin').userid
				const favObj = {
					topicsListId:id,
					userid,
					collectionType:'delete'
				}
				this.$store.dispatch('collection',favObj)
			}
		}
	}
</script>

<style lang="less" scoped>
	@import url("@/pages/my/collect/index");
</style>
