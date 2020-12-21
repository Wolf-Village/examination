<template>
  <view>
    <!-- 轮播图 -->
    <view class="swiperBox">
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
      >
        <swiper-item v-for="item in imgList" :key="item.id" class="swiperImg"
          ><image :src="item.url"></image
        ></swiper-item>
      </swiper>
    </view>
    <!-- 新闻 -->
    <view class="news">
      <view class="title">最近新闻</view>
      <view class="news-item">
        <view
          class="padding-xl radius shadow shadow-lg bg-white margin-top news-fu flex justify-between"
          v-for="item in dlist"
          :key="item._id"
          @click="opennews"
          :data-postid="item.post_id"
        >
          <image :src="item.cover" mode=""></image>
          <view class="news-text">
            <p class="news-title">{{ item.title }}</p>
            <p class="news-times">{{ item.author_name }}</p>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      autoplay: true,
      interval: 2000,
      duration: 500,
      indicatorDots: true,
      dlist: [],
      imgList: [
        {
          id: "1",
          url: "http://91mlearning.com/Upload/Info/root//2014_04/HTML5.jpg",
        },
        {
          id: "2",
          url:
            "https://atts.w3cschool.cn/attachments/cover/cover_css.png?t=1579664257&imageView2/1/w/150/h/84",
        },
        {
          id: "3",
          url:
            "https://pic4.zhimg.com/v2-757212b6ecac206528be7c3e7e0ed135_1440w.jpg?source=172ae18b",
        },
      ],
    };
  },
  onLoad() {
    uni.request({
      url: "https://unidemo.dcloud.net.cn/api/news",
      method: "GET",
      data: {},
      success: (res) => {
        this.dlist = res.data;
        this.token = false;
      },
      fail: () => {},
      complete: () => {},
    });
  },
  methods: {
    opennews(e) {
      console.log(e.currentTarget.dataset.postid);
      uni.navigateTo({
        url: "./newsdate?postid=" + e.currentTarget.dataset.postid,
      });
    },
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
  },
};
</script>

<style lang="less">
/* 轮播 */
.swiper {
  width: 100%;
  height: 150px;

  .swiperImg {
    width: 100%;
    height: 100%;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.z-list {
  border-radius: 15px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 5px 25.92px 1.08px rgba(200, 200, 200, 0.22);
  margin: 40px auto;
  width: 95%;
  height: 80px;
  padding-top: 1px;
  .z-h {
    width: 85%;
    height: 100%;
    margin: 2% auto;
  }
  .z-left {
    width: 50%;
    height: 95%;
    float: left;
    text:nth-child(1) {
      display: -webkit-box;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    text:nth-child(2) {
      display: block;
      font-size: 10px;
      margin-top: 5px;
      color: #cccccc;
    }
  }
  .z-right {
    width: 40%;
    height: 85%;
    border-radius: 15px;
    overflow: hidden;
    float: right;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
/* 新闻 */
.title {
  width: 80%;
  margin: 20px auto 0 auto;
  font-size: 20px;
  font-family: 微软雅黑;
}
.news-fu {
  width: 90%;
  height: 80px;
  margin: 20px auto;
  padding: 10px;
  background: no-repeat;
  background-size: 100% 100%;
  image {
    width: 35%;
    height: 100%;
  }

  .news-text {
    width: 60%;
    .news-title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .news-times {
      line-height: 35px;
      color: grey;
      font-size: 1px;
    }
  }
}
</style>
