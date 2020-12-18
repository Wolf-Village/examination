<template>
	<view class="margin-xl">
		<view class="box-buttom">
			<uni-fav :checked="checked" class="favBtn" circle="true" fg-color="#000000" fg-color-checked="#FFFFFF" bg-color="#cacaca"
			 bg-color-checked="#007AFF" @click="onClick"></uni-fav>
			<uni-pagination class="margin-top-xl" title="标题文字" show-icon="true" total="50" current="2"></uni-pagination>
		</view>
	</view>
</template>

<script>
	import uniPagination from '@/components/uni-pagination/uni-pagination.vue'
	import uniFav from '@/components/uni-fav/uni-fav.vue'
	import {
		baseUrl
	} from "@/api/index.js"
	export default {
		components: {
			uniPagination,
			uniFav
		},
		data() {
			return {
				checked: false,
				list:[]
			}
		},
		mounted() {
			uni.request({
				url: baseUrl + '/problem/test',
				data: {
					data:[1,15,21,2,4,85]
				},
				method: 'POST',
				success: function({data})  {
					console.log(data)
				}
				})
		},
		methods: {
			onClick() {
				this.checked = !this.checked
				// console.log(1234)
			}
		}
	}
</script>

<style scoped lang="less">
	.margin-xl {
		height: 90vh;
		position: relative;
		.box-buttom {
			width: 100%;
			position: absolute;
			bottom: 0;
			.uni-pagination {
				width: 100%;
			}
		}
	}
</style>
