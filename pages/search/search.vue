<template>
  <view style="margin: auto; width: 95%">
    <view class="jincehng-input-box">
      <input
        class="jincheng-input"
        type="text"
        value=""
        placeholder="输入关键字"
        v-model="searchcontent"
      />
      <view
        class="text-red cu-btn round lines-red jincheng-search"
        @click="search()"
      >
        搜索
      </view>
    </view>
    <view style="margin: auto; width: 95%">
      <view class="cu-load load-modal" v-if="loadModal">
        <view class="gray-text">加载中...</view>
      </view>
      <view class="margin" v-show="isSistory">
        <view class="flex justify-between" style="width: 94%">
          <view class="text-orange" style="font-size: 20px"> 搜索历史 </view>
          <text
            class="text-gray cuIcon-deletefill"
            style="font-size: 25px"
            @click="empty"
          ></text>
        </view>
        <view class="flex flex-wrap">
          <view
            class="jincehng-ti jincheng-font bg-grey round margin-lr-sm margin-top"
            v-for="(item, index) in historyList"
            :key="index"
            @click="history(item)"
            >{{ item }}</view
          >
        </view>
      </view>
      <view
        class="jincehng-xuan"
        style="margin: 20px auto; width: 95%"
        v-for="(item, index) in dataa"
        :key="item + index"
      >
        <view class="jincehng-ti jincheng-font" @click="todetails(item.id)">
          <view v-if="item.type == 'radio'">[单选]</view>
          <view v-if="item.type == 'checkbox'">[多选]</view>
          <view v-if="item.type == 'judge'">[判断]</view>
          {{ item.name }}
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
    // 搜索历史搜索
    history(text) {
      console.log(text);
      uni.request({
        url: `${baseUrl}/serach`,
        method: "POST",
        data: {
          text: text,
        },
        success: (res) => {
          this.searchcontent = "";
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
            this.searchcontent = "";
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
    if (!uni.getStorageSync("lishi")) {
      this.historyList = uni.getStorageSync("lishi");
    }
  },
};
</script>

<style>
.jincheng-input {
  width: 85%;
  height: 40px;
  background: #fafafa;
  border-bottom-left-radius: 18px;
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-right-radius: 18px;
  padding-left: 20px;
  margin-right: 25px;
  border: 1px solid red;
}

.jincheng-search {
  width: 80px;
  height: 38px;
  font-size: 18px;
  margin-right: 10px;
  font-weight: bolder;
}

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
  width: 95%;
}

.jincehng-ti {
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

.jincheng-flex {
  display: flex;
}
</style>
