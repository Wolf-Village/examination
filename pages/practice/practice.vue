<template>
  <view class="box-hg">
    <!-- loading动画 -->
    <view class="cu-load load-modal"
          v-if="loadModal">
      <view class="gray-text">加载中...</view>
    </view>
    <!-- 判断对错的弹窗 -->
    <view class="cu-modal show"
          v-if="!loadModal && modalName">
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
          <view class=" "
                v-if="topicsList[index].type==='checkbox'">
            正确的答案是: {{topicsList[index].answer.map(item=>{return answerOption[item]})}};<br />
            你的选择的是: {{selectAnswerList[index].map(item=>{return answerOption[item]})}};
          </view>
        </view>
        <view class="cu-bar bg-white justify-end">
          <view class="action">
            <button class="cu-btn line-blue text-blue"
                    @tap="hideModal('close')">关闭</button>
            <button class="cu-btn bg-blue margin-left"
                    @tap="hideModal('next')">下一题</button>
          </view>
        </view>
      </view>
    </view>
    <!-- 题目主体 -->
    <template v-if="!loadModal">
      <view class="overflow-auto">
        <view class="bg-grey flex padding justify-start">
          <view class="padding-sm margin-xs radius">
            <text class="margin-right-sm text-black"
                  v-if="topicsList[index].type==='radio'">[单选] </text>
            <text class="margin-right-sm text-black"
                  v-if="topicsList[index].type==='checkbox'">[多选] </text>
            <text class="margin-right-sm text-black"
                  v-if="topicsList[index].type==='judge'">[判断] </text>
            {{index+1}}、{{topicsList[index].name}}
          </view>
        </view>
        <view @click="selectAnswerList[index] !==null? showModel:''">
          <!-- 选择题答案样式 -->
          <radio-group class="white100"
                       v-if="topicsList[index].type==='radio'"
                       @change="(e)=>radioChange(e,'radio')">
            <label class="white100 flex padding-lr padding-top align-center"
                   v-for="(items,indexs) in topicsList[index].options"
                   :key="topicsList[index].id+items.title">
              <view class="margin-xs radius">
                <radio :disabled='answerTrueFalse[index]!==null'
                       :value="`${indexs}`"
                       :checked="indexs == selectAnswerList[index]" />
              </view>
              <view class="padding-sm margin-xs radius">{{items.title}}</view>
            </label>
          </radio-group>
          <!-- 判断题答案样式 -->
          <radio-group class="white100"
                       v-if="topicsList[index].type==='judge'"
                       @change="(e)=>radioChange(e,'judge')">
            <label class='flex padding-lr padding-top align-center'>
              <radio :disabled='answerTrueFalse[index]!==null'
                     value="true"
                     :checked="'true'=== selectAnswerList[index]" />正确
            </label>
            <label class='flex padding-lr padding-top align-center'>
              <radio :disabled='answerTrueFalse[index]!==null'
                     value="false"
                     :checked="'false' === selectAnswerList[index]" />错误
            </label>
          </radio-group>
          <!-- 多选题答案样式 -->
          <checkbox-group class="white100"
                          v-if="topicsList[index].type==='checkbox'"
                          @change="(e)=>radioChange(e,'checkbox')">
            <label class="white100 flex padding-lr padding-top align-center"
                   v-for="(items,indexs) in topicsList[index].options"
                   :key="topicsList[index].id+items.title">
              <view class="margin-xs radius">
                <checkbox :disabled='answerTrueFalse[index]!==null'
                          :value="`${indexs}`"
                          :checked="selectAnswerList[index].includes(indexs)" />
              </view>
              <view class="padding-sm margin-xs radius">{{items.title}}</view>
            </label>
            <view class="flex justify-center">
              <button class="cu-btn bg-blue white50"
                      @click="checkboxChange">确认答案</button>
            </view>
          </checkbox-group>

        </view>
        <!-- 答案解析 -->
        <view class="padding"
              v-if="answerTrueFalse[index] !== null">
          <view class="text-orange text-xl">解析:</view>
          <view class="text-gray text-df"
                style="text-indent: 2rem;">{{topicsList[index].explain}}</view>
        </view>
      </view>
      <!-- 底部统计 -->
      <view class="box-buttom ">
        <view class="flex col-3">
          <!-- 收藏按钮 -->
          <uni-fav :checked="admin? admin.sign.includes(topicsList[index].id) : false"
                   class="favBtn margin-right-lg"
                   circle="true"
                   fg-color="#000000"
                   fg-color-checked="#FFFFFF"
                   bg-color="#cacaca"
                   bg-color-checked="#007AFF"
                   @click="onClick"></uni-fav>
          <!-- 统计答对数 -->
          <view class="flex flex-sub align-center justify-center">
            <view class="radius">
              <text class="text-blue cuIcon-roundcheckfill"
                    style="font-size: 25px;"></text>
            </view>
            <view class="radius">{{trueAnswerNum}}</view>
          </view>
          <!-- 统计答错数 -->
          <view class="flex flex-sub align-center justify-center">
            <view class="radius">
              <text class="text-red cuIcon-roundclosefill"
                    style="font-size: 25px;"></text>
            </view>
            <view class="radius">{{falseAnswerNum}}</view>
          </view>
          <!-- 统计未答数 -->
          <view class="flex flex-twice align-center justify-end">
            <view class="radius">
              <text class="text-gray cuIcon-timefill"
                    style="font-size: 25px;"></text>
            </view>
            <view class="radius">未答{{100-trueAnswerNum-falseAnswerNum}}题</view>
          </view>
        </view>
        <!-- 分页器 -->
        <uni-pagination class="margin-top-lg"
                        @change="SerialNumber"
                        show-icon="true"
                        pageSize='1'
                        :total="topicsList.length"
                        :current="index+1"></uni-pagination>
      </view>
    </template>
  </view>
</template>

<script>
import { baseUrl } from "@/api/index.js";
import uniPagination from "@/components/uni-pagination/uni-pagination.vue";

export default {
  components: { uniPagination },
  data() {
    return {
      // 是否显示解析
      problemAnalysis: false,
      // 收藏按钮是否选中
      checked: false,
      // loading动画
      loadModal: true,
      // 题库
      topicsList: [],
      // 答案选项
      answerOption: ["A", "B", "C", "D"],
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
      // 当前题的类型
      myclss: "",
    };
  },
  onLoad(options) {
    this.myclass = options.myclass;
    this.requestInterface(1);
    if (uni.getStorageSync("admin")) {
      this.admin = uni.getStorageSync("admin");
    }
  },
  methods: {
    // 请求题库
    requestInterface: function (page) {
      uni.request({
        url: baseUrl + "/problem/getdata",
        data: {
          page,
          myclass: this.myclass,
        },
        method: "POST",
        success: ({ data }) => {
          if (data.code === 200) {
            // console.log(data)
            this.loadModal = false;
            const list = data.data.map((item) => {
              if (item.type === "checkbox") {
                this.selectAnswerList.push([]);
              } else {
                this.selectAnswerList.push(null);
              }
              this.answerTrueFalse.push(null);
              item.answer = JSON.parse(item.answer);
              item.options = JSON.parse(item.options);
              return item;
            });
            this.topicsList.push(...list);
            // console.log(this.topicsList)
          } else {
            console.log(data.msg);
          }
          console.log(data);
          if (data.data.length == 0) {
            uni.showToast({
              title: "没有更多题目",
              icon: "none",
            });
          }
        },
        fail: () => {
          console.log("网络连接错误");
          this.loadModal = false;
        },
      });
    },
    // 请求下一页的题目数据
    nextPageInterface: function () {
      const topicsListLen = this.topicsList.length;
      const page = Math.ceil(topicsListLen / 10);
      if (this.index + 1 == topicsListLen - 1 && topicsListLen < 100) {
        console.log("请求数据");
        this.requestInterface(page + 1);
      }
    },
    // 弹窗显示
    showModel: function () {
      this.modalName = !this.modalName;
    },
    // 存储题目的选择对错
    answerTrueAndFalse: function (whether) {
      if (whether) {
        this.trueAnswerNum += 1;
      } else {
        this.falseAnswerNum += 1;
      }
      this.answerTrueFalse.splice(this.index, 1, whether);
    },
    // 选择答案的事件
    radioChange: function (e, type) {
      if (type === "checkbox") {
        e.target.value = e.target.value.map((item) => {
          return +item;
        });
        this.selectAnswerList.splice(this.index, 1, e.target.value);
      } else {
        this.showModel();
        this.selectAnswerList.splice(this.index, 1, e.target.value);
        const flag = JSON.stringify(this.topicsList[this.index].answer);
        if (e.target.value == flag) {
          console.log("选择正确");
          this.answerTrueAndFalse(true);
        } else {
          console.log("选择错误");

          this.answerTrueAndFalse(false);
        }
      }
    },
    // 多选答案的事件
    checkboxChange: function () {
      const checkboxValue = this.selectAnswerList[this.index];
      const newTrueAnswer = this.topicsList[this.index].answer;
      // 返回两个数组的公共部分
      let newList = checkboxValue.filter((val) => {
        return newTrueAnswer.indexOf(val) > -1;
      });
      if (this.answerTrueFalse[this.index] !== null) {
        return false;
      }
      if (checkboxValue.length !== newList.length) {
        this.showModel();
        this.answerTrueAndFalse(false);
      } else if (newList.length == newTrueAnswer.length) {
        this.showModel();
        this.answerTrueAndFalse(true);
      } else {
        this.showModel();
        this.answerTrueAndFalse(false);
      }
    },
    // 弹窗事件
    hideModal: function (type) {
      if (type === "close") {
        this.showModel();
      } else if (type === "next") {
        this.showModel();
        this.nextPageInterface();
        if (this.index + 1 < this.topicsList.length) {
          this.index += 1;
        }
      }
    },
    // 分页器事件
    SerialNumber: function (e) {
      if (e.type == "next") {
        this.nextPageInterface();
        this.index += 1;
        this.current = null;
      } else {
        this.index -= 1;
        this.current = null;
      }
    },
    // 收藏按钮
    onClick: function () {
      const topicsListId = this.topicsList[this.index].id;
      if (!this.admin) {
        uni.showToast({
          title: "您还没登录",
          icon: "none",
        });
        return false;
      }
      let collectionType = "add";
      if (!this.admin.sign.includes(topicsListId)) {
        collectionType = "add";
        this.admin.sign.push(topicsListId);
      } else {
        collectionType = "delete";
        this.admin.sign = this.admin.sign.filter(
          (item) => item !== topicsListId
        );
      }
      const userObj = {
        userid: this.admin.userid,
        topicsListId,
        collectionType,
      };
      this.$store.dispatch("collection", userObj);
    },
  },
};
</script>

<style scoped lang="less">
.uni-pagination {
  width: 90vw;
}

.white100 {
  width: 100vw;
}

.white50 {
  width: 50%;
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
