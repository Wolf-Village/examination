<template>
	<view class="box-hg">
		<!-- loading动画 -->
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
		<!-- 侧边抽屉 -->
		<view class="cu-modal drawer-modal justify-start" :class="endModalName=='DrawerModalL'?'show':''"  @tap="endHideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:45+'px',height:'calc(100vh - ' + 45 + 'px)'}]">
				<view class="flex justify-around flex-wrap">
					<view class="arrow display-inline" v-for="(item,index) in topicsList.length" @click="selectTopic(index)"  :key="index">
						<view class="content padding margin-top-sm " :class="answerTrueFalse[index]==null?'bg-grey':'bg-blue'" >
							<view>{{index>=9? index +1:'0'+(index +1)}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 确定交卷 -->
		<view class="cu-modal show" v-if="handInPapersModel">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">交卷</view>
				</view>
				<view class="padding-xl">您还有<text class="text-red text-bold">{{topicsList.length-trueAnswerNum-falseAnswerNum}}</text>道题没写,确定要交卷吗？
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="handInPapersModel = false">关闭</button>
						<button class="cu-btn bg-blue margin-left" @tap="handInPapersTrue">提交</button>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 判断对错的弹窗 -->
		<view class="cu-modal show" v-if="!loadModal && modalName">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">该题结果已出</view>
				</view>
				<view class="padding-xl">
					<view v-if="topicsList[index].type==='radio'">
						正确答案为: {{answerOption[topicsList[index].answer]}};<br />
						你的答案为: {{answerOption[selectAnswerList[index]]}};
					</view>
					<view v-if="topicsList[index].type==='judge'">
						正确的答案是: {{topicsList[index].answer?'正确':'错误'}};<br />
						你的选择的是: {{selectAnswerList[index]==='true'?'正确':'错误'}};
					</view>
					<view class=" " v-if="topicsList[index].type==='checkbox'">
						正确的答案是: {{topicsList[index].answer.map(item=>{return answerOption[item]})}};<br />
						你的选择的是: {{selectAnswerList[index].map(item=>{return answerOption[item]})}};
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn line-blue text-blue" @tap="hideModal('close')">关闭</button>
						<button class="cu-btn bg-blue margin-left" @tap="hideModal('next')">下一题</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 题目主体 -->
		<template v-if="!loadModal">
			<view class="overflow-auto">
				<view class="bg-grey flex padding justify-start">
					<view class="padding-sm margin-xs radius">
						<text class="margin-right-sm text-black" v-if="topicsList[index].type==='radio'">[单选] </text>
						<text class="margin-right-sm text-black" v-if="topicsList[index].type==='checkbox'">[多选] </text>
						<text class="margin-right-sm text-black" v-if="topicsList[index].type==='judge'">[判断] </text>
						{{index+1}}、{{topicsList[index].name}}</view>
				</view>
				<view @click="selectAnswerList[index] !==null? showModel:''">
					<!-- 选择题答案样式 -->
					<radio-group class="white100" v-if="topicsList[index].type==='radio'" @change="(e)=>radioChange(e,'radio')">
						<label class="white100 flex padding-lr padding-top align-center" v-for="(items,indexs) in topicsList[index].options"
						 :key="topicsList[index].id+items.title">
							<view class="margin-xs radius">
								<radio :disabled='answerTrueFalse[index]!==null' :value="`${indexs}`" :checked="indexs == selectAnswerList[index]" />
							</view>
							<view class="padding-sm margin-xs radius">{{items.title}}</view>
						</label>
					</radio-group>
					<!-- 判断题答案样式 -->
					<radio-group class="white100" v-if="topicsList[index].type==='judge'" @change="(e)=>radioChange(e,'judge')">
						<label class='flex padding-lr padding-top align-center'>
							<radio :disabled='answerTrueFalse[index]!==null' value="true" :checked="'true'=== selectAnswerList[index]" />正确</label>
						<label class='flex padding-lr padding-top align-center'>
							<radio :disabled='answerTrueFalse[index]!==null' value="false" :checked="'false' === selectAnswerList[index]" />错误</label>
					</radio-group>
					<!-- 多选题答案样式 -->
					<checkbox-group class="white100" v-if="topicsList[index].type==='checkbox'" @change="(e)=>radioChange(e,'checkbox')">
						<label class="white100 flex padding-lr padding-top align-center" v-for="(items,indexs) in topicsList[index].options"
						 :key="topicsList[index].id+items.title">
							<view class="margin-xs radius">
								<checkbox :disabled='answerTrueFalse[index]!==null' :value="`${indexs}`" :checked="selectAnswerList[index].includes(indexs)" />
							</view>
							<view class="padding-sm margin-xs radius">{{items.title}}</view>
						</label>
						<view class="flex justify-center">
							<button class="cu-btn bg-blue white50" @click="checkboxChange">确认答案</button>
						</view>
					</checkbox-group>

				</view>
			</view>
			<!-- 底部统计 -->
			<view class="box-buttom ">
				<view class="flex justify-between">
					<!-- 统计答对数 -->
					<view @click="handInPapers" class=" bg-olive padding-lr-xl padding-tb-sm radius">交卷</view>
					<!-- 统计未答数 -->
					<view @click="clickIndex" class="flex align-center justify-end">
						<view class="radius">
							<text class="text-gray cuIcon-timefill" style="font-size: 25px;"></text>
						</view>
						<view class="radius">未答{{topicsList.length-trueAnswerNum-falseAnswerNum}}题</view>
					</view>
				</view>
				<!-- 分页器 -->
				<uni-pagination class="margin-top-lg" @change="SerialNumber" show-icon="true" pageSize='1' :total="topicsList.length"
				 :current="index+1"></uni-pagination>
			</view>
		</template>
	</view>
</template>

<script>
	import {
		baseUrl
	} from "@/api/index.js"

	export default {
		data() {
			return {
				handInPapersModel:false,
				// 题目序号弹窗的显示
				endModalName: null,
				// loading动画
				loadModal: true,
				// 题库
				topicsList: [],
				// 答案选项
				answerOption: ['A', 'B', 'C', 'D','E','F'],
				// 已选择的答案
				selectAnswerList: new Array(),
				// 录入题目的对错
				answerTrueFalse: [],
				// 当前页
				current: null,
				// 当前显示题目的下标
				index: 0,
				// 弹窗
				modalName: false,
				// 正确答案数
				trueAnswerNum: 0,
				// 错误答案数
				falseAnswerNum: 0,
				// 用户信息
				admin: false,
				// 存储随机出来的题目id
				problemListIndex: []
			}
		},
		mounted() {
			// 生成随机数
			this.rand()
			// 获取题库
			this.requestInterface(1)
			// 获取用户信息
			if (uni.getStorageSync('admin')) {
				this.admin = uni.getStorageSync('admin')
			}
		},
		methods: {
			// 提示交卷事件
			handInPapers:function(){
				this.handInPapersModel = !this.handInPapersModel
			},
			// 交卷事件
			handInPapersTrue:function(){
				uni.redirectTo({
					url:'./finish?'+`true=${this.trueAnswerNum}&false=${this.topicsList.length-this.trueAnswerNum}`
				})
			},
			// 题目选择
			selectTopic:function(index){
				this.index = index
				this.endModalName = null
			},
			// 隐藏弹窗
			endHideModal:function(){
				this.endModalName = null
			},
			// 显示所有题目的序号
			clickIndex:function(){
				this.endModalName = "DrawerModalL"
			},
			// 请求题库
			requestInterface: function() {
				const bbb = this.problemListIndex.slice(0, 50)
				const data = JSON.stringify(bbb)
				uni.request({
					url: baseUrl + '/problem/test',
					data: {
						data
					},
					method: 'POST',
					success: ({
						data
					}) => {
						console.log(data)
						if (data.code === 200) {
							this.loadModal = false;
							const list = data.data.map(item => {
								if (item.type === 'checkbox') {
									this.selectAnswerList.push([])
								} else {
									this.selectAnswerList.push(null)
								}
								this.answerTrueFalse.push(null)
								item.answer = JSON.parse(item.answer)
								item.options = JSON.parse(item.options)
								return item
							})
							this.topicsList.push(...list)
							// console.log(this.topicsList)
						} else {
							console.log(data.msg)
						}
					},
					fail: () => {
						console.log('网络连接错误')
						this.loadModal = false;
					}
				})
			},
			// 弹窗显示
			showModel: function() {
				this.modalName = !this.modalName
			},
			// 存储题目的选择对错
			answerTrueAndFalse: function(whether) {
				if (whether) {
					this.trueAnswerNum += 1
				} else {
					this.falseAnswerNum += 1
				}
				this.answerTrueFalse.splice(this.index, 1, whether)
			},
			// 选择答案的事件
			radioChange: function(e, type) {
				if (type === 'checkbox') {
					e.target.value = e.target.value.map(item => {
						return +item
					})
					this.selectAnswerList.splice(this.index, 1, e.target.value)
				} else {
					this.showModel()
					this.selectAnswerList.splice(this.index, 1, e.target.value)
					const flag = JSON.stringify(this.topicsList[this.index].answer)
					if (e.target.value == flag) {
						console.log('选择正确')
						this.answerTrueAndFalse(true)
					} else {
						console.log('选择错误')

						this.answerTrueAndFalse(false)
					}
				}
			},
			// 多选答案的事件
			checkboxChange: function() {
				const checkboxValue = this.selectAnswerList[this.index]
				const newTrueAnswer = this.topicsList[this.index].answer
				// console.log(this.topicsList[this.index])
				// 返回两个数组的公共部分
				let newList = checkboxValue.filter((val) => {
					return newTrueAnswer.indexOf(val) > -1
				})
				if (this.answerTrueFalse[this.index] !== null) {
					return false
				}
				if (checkboxValue.length !== newList.length) {
					this.showModel()
					this.answerTrueAndFalse(false)

				} else if (newList.length == newTrueAnswer.length) {
					this.showModel()
					this.answerTrueAndFalse(true)
				} else {
					this.showModel()
					this.answerTrueAndFalse(false)

				}
			},
			// 弹窗事件
			hideModal: function(type) {
				if (type === 'close') {
					this.showModel()
				} else if (type === 'next') {
					this.showModel()
					// this.nextPageInterface()
					if (this.index + 1 < this.topicsList.length) {
						this.index += 1
					}
				}
			},
			// 分页器事件
			SerialNumber: function(e) {
				if (e.type == "next") {
					this.index += 1
					this.current = null
				} else {
					this.index -= 1
					this.current = null
				}
			},
			// 随机数
			rand: function() {
				var count = 200;
				var a = new Array();
				for (var i = 0; i < count; i++) {
					a[i] = i + 1;
				}
				a.sort(function() {
					return 0.5 - Math.random();
				});
				this.problemListIndex = a
			}
		}
	}
</script>

<style scoped lang="less">
	.uni-pagination {
		width: 90vw;
	}

	.white100 {
		width: 100vw
	}

	.white50 {
		width: 50%
	}

	.box-hg {
		height: 90vh;
		position: relative;

		.box-buttom {
			width: 90vw;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 15%);

			.uni-pagination {
				width: 100%;
			}
		}
	}

	.overflow-auto {
		overflow: auto;
		height: 80vh;
	}
</style>
