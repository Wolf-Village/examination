<template>
	<view>
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
		<view v-else class="jincehng-xuan" style="margin: 20px auto; width: 95%;">
			<view class="jincehng-ti jincheng-font">
				<view v-if="detailslits.type=='radio'">[单选]</view>
				<view v-if="detailslits.type=='checkbox'">[多选]</view>
				<view v-if="detailslits.type=='judge'">[判断]</view>
				{{detailslits.name}}
			</view>
			<view class="jincehng-ti" v-for="(item,index) in optionli" :key="index">
				{{item.title}}
			</view>
			<view class="jincehng-ti jincheng-font" v-if="detailslits.type=='radio'">
				正确答案为：{{optionList[detailslits.answer]}}
			</view>
			<view class="jincehng-ti jincheng-font" v-if="detailslits.type=='judge'">
				正确答案为：<text class="text-red">{{detailslits.answer=='true'?'正确':'错误'}}</text>
			</view>
			<view class="jincehng-ti jincheng-font" v-if="detailslits.type=='checkbox'">
				正确答案为：<text v-for="(item,index) in daan" :key="index">{{optionList[item]}}</text>
			</view>
			<view class="jincehng-ti">
				<view class="flex justify-between">
					<view class="jincheng-font text-cyan">题目解析：</view>
					<uni-fav :checked="admin!==''? admin.sign.includes(detailslits.id) : false" class="favBtn margin-right-lg" circle="true"
					 fg-color="#000000" fg-color-checked="#FFFFFF" bg-color="#cacaca" bg-color-checked="#007AFF" @click="onClick"></uni-fav>
				</view>
				<view class="text-grey jincehng-jiexi">
					{{detailslits.explain}}
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		baseUrl
	} from "@/api/index.js"
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				loadModal: true,
				optionList: ['A', 'B', 'C', 'D'],
				detailslits: {},
				optionli: [],
				daan: [],
				admin: "",
				ids: 0
			}
		},
		computed:{
			...mapState(['favBtn'])
			},
		mounted() {
			if (uni.getStorageSync('admin')) {
				this.admin = uni.getStorageSync('admin')
			}else{
				this.admin = ''
			}
		},
		methods: {
			onClick: function() {
				console.log(this.favBtn)
				if(!this.favBtn){
					return false
				}
				this.$store.dispatch('FavBtn',{type:false})
				const topicsListId = +this.ids
				if (this.admin=='') {
					uni.showToast({
						title: '您还没登录',
						icon: 'none'
					})
					return false
				}
				let collectionType = 'add'
				console.log(this.admin.sign)
				if (!this.admin.sign.includes(topicsListId)) {
					collectionType = 'add'
					this.admin.sign.push(topicsListId)
				} else {
					collectionType = 'delete'
					this.admin.sign = this.admin.sign.filter(item => item !== topicsListId)
				}
				const userObj = {
					userid: this.admin.userid,
					topicsListId,
					collectionType
				}
				this.$store.dispatch('collection', userObj)
			}
		},
		onLoad: function(option) {
			const _this = this
			_this.ids = option.id
			const topicId = option.id
			uni.request({
				url: `${baseUrl}/problem/getdata`,
				method: "POST",
				data: {
					"page": 1,
					"id": topicId
				},
				success: ({
					data
				}) => {
					console.log(data)
					this.loadModal = false
					this.detailslits = data.data[0]
					this.optionli = JSON.parse(data.data[0].options)
					this.daan = JSON.parse(data.data[0].answer)
				}
			});
		}
	}
</script>

<style>
	.jincehng-xuan {
		width: 90%;
		margin: 10px auto;
		background: white;
		border-radius: 10px;
		word-wrap: break-word;
		word-break: normal;
	}

	.jincehng-input-box {
		display: flex;
		margin-top: 10px;
		margin: 25px auto;
		width: 90%;

	}

	.jincehng-ti {
		width: 100%;
		padding: 10px;
		font-size: 18px;
		letter-spacing: 3px;
		letter-spacing: 0px;

	}

	.jincheng-font {
		font-weight: bolder;
	}

	.jincehng-jiexi {
		padding: 10px;
	}
</style>
