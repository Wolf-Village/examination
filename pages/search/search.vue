<template>
  <view style="margin: auto">
    <view class="jincehng-input-box">
      <input class="jincheng-input"
             type="text"
             value=""
             placeholder="输入关键字"
             v-model="searchcontent"
             @input="chone()" />
      <view class="jincheng-search"
            @click="search()">
        搜索
      </view>
    </view>
    <view style="margin: auto;">
      <view class="cu-load load-modal"
            v-if="loadModal">
        <view class="gray-text">加载中...</view>
      </view>
      <view class="margin1"
            v-show="isSistory">
        <view class="flex justify-between">
          <view class="text-orange"
                style="font-size: 14px;line-height: ; ">
            搜索历史
          </view>
          <text class="text-gray cuIcon-deletefill"
                style="font-size: 25px;"
                @click="empty"></text>
        </view>
        <view class="flex flex-wrap">
          <view class="jincehng-ti1 jincheng-font bg-grey round margin-lr-sm margin-top "
                v-for="(item,index) in historyList"
                :key='index'
                @click="history(item)">{{item}}</view>
        </view>
      </view>
      <view class="jincehng-xuan"
            style="    margin: 20px auto;
    width: 95%;"
            v-for="(item,index) in dataa"
            :key='item+index'>
        <view class="jincehng-ti jincheng-font"
              @click="todetails(item.id)">
          <view v-if="item.type=='radio'"
                style="margin-bottom: 1vh;font-weight: 700;">[单选]</view>
          <view v-if="item.type=='checkbox'"
                style="font-weight: 900;">[多选]</view>
          <view v-if="item.type=='judge'"
                style="font-weight: 900;">[判断]</view>
          {{item.name}}
        </view>

      </view>
    </view>

  </view>
</template>
<script>
import { baseUrl } from "@/api/index.js";
export default {
  data() {
    return {
      // 搜索历史是否显示
      isSistory: true,
      // 搜索内容
      searchcontent: "",
      // 判断
      loadModal: false,
      // 题型
      dataa: [],
      // 答案
      optionList: ["A", "B", "C", "D"],
      // 搜索历史
      historyList: [],
    };
  },
  methods: {
    // 搜索框为空时显示搜索历史
    chone() {
      if (this.searchcontent.length == 0) {
        this.isSistory = true;
        this.dataa.length = 0;
        this.dataa.splice(0, this.dataa.length);
      }
    },
    // 搜索历史搜索
    history(text) {
      this.searchcontent = text;
      uni.request({
        url: `${baseUrl}/serach`,
        method: "POST",
        data: {
          text: text,
        },
        success: (res) => {
          // this.searchcontent = "";
          if (res.data.data.length > 0) {
            this.dataa = res.data.data.map((item) => {
              item.options = JSON.parse(item.options);
              return item;
            });
            this.isSistory = false;
          } else {
            uni.showModal({
              title: "提示",
              content: "没有找到符合此条件的内容",
              success: function (res) {
                if (res.confirm) {
                  this.isSistory = true;
                } else if (res.cancel) {
                  this.isSistory = true;
                }
              },
            });
          }

          this.loadModal = false;
        },
      });
    },
    // 清除历史
    empty() {
      this.historyList.length = 0;
      this.historyList.splice(0, this.historyList.length);
      uni.setStorageSync("lishi", []);
    },
    // 搜索接口
    search: function (text) {
      if (this.searchcontent.length >= 1) {
        // 添加
        this.historyList.push(this.searchcontent);
        // 数组去重
        this.historyList = Array.from(new Set(this.historyList));
        uni.setStorageSync("lishi", this.historyList);
        this.loadModal = true;
        uni.request({
          url: `${baseUrl}/serach`,
          method: "POST",
          data: {
            text: this.searchcontent,
          },
          success: (res) => {
						// console.log(res)
            if (res.data.data.length > 0) {
              this.dataa = res.data.data.map((item) => {
                item.options = JSON.parse(item.options);
                return item;
              });
              this.isSistory = false;
            } else {
              uni.showModal({
                title: "提示",
                content: "没有找到符合此条件的内容",
                success: function (res) {
                  if (res.confirm) {
                    this.isSistory = true;
                  } else if (res.cancel) {
                    this.isSistory = true;
                  }
                },
              });
            }

            this.loadModal = false;
          },
        });
      } else {
        uni.showModal({
          title: "提示",
          content: "搜索框内容不能为空",
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          },
        });
      }
    },
    todetails(id) {
      const searchcontent = this.searchcontent;
      uni.navigateTo({
        url: `/pages/search/details?id=` + id,
      });
    },
  },
  onLoad: function () {
    if (uni.getStorageSync("lishi")) {
      this.historyList = uni.getStorageSync("lishi");
    }
  },
};
</script>

<style>
.jincehng-input-box {
  height: 10vh;
  border-bottom: 1px solid #999999;
  background-color: white;
}
.jincheng-input {
  width: 70vw;
  height: 40px;
  background: #fafafa;
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  padding-left: 20px;
  float: left;
  margin-left: 5vw;
  margin-top: 3vh;
  border: 1px solid #999999;
}

.jincheng-search {
  width: 20vw;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: #999999 1px solid;
  margin-top: 3vh;
  border-left: none;
  padding-left: 5vw;
  float: left;
  line-height: 38px;
}

.jincehng-xuan {
  width: 90%;
  margin: 10px auto;
  background: white;
  border-radius: 10px;
  word-wrap: break-word;
  word-break: normal;
}
.jincehng-ti {
  /* padding: 10px; */
  border-radius: 0px !important;
  font-size: 14px;
  padding: 2vh 4vw;
  letter-spacing: 3px;
  letter-spacing: 0px;
}
.justify-between {
  width: 100vw;
  background-color: white;
  padding: 1vh 3vw;
}
.jincehng-ti1 {
  background-color: #dddddd;
  color: grey;
  font-size: 14px;
  padding: 1vh 3vw;
  border-radius: 15px;
}
.text-orange {
  height: 4vh;
  line-height: 4vh;
  width: 100vw;
  color: black;
  background-color: white;
}
.jincheng-font {
  /* font-weight: bolder; */
}

.jincehng-jiexi {
  padding: 10px;
}

.jincheng-flex {
  display: flex;
}
</style>
