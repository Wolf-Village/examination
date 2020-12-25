<!-- 
 * @Name：vus-sphere-progress v1.0.0 球形进度条组件
 * @Site：http://www.vusui.com | https://vusui.github.io
 * @Author：林攀
 * @License：MIT
 -->
<template>
    <!-- 球形波浪 -->
    <view v-if="type=='sphere'" :class="setSphereType" :style="setWidthHeight">
    	<view class="vus-progress-sphere" :style="setWidthHeight">
    		<view class="vus-progress-sphere-inner" :style="{'background-color':color[0]}">
                <!-- 水波纹 -->
                <view class="vus-progress-sphere-water" :class="assignAnim" :style="setSphereWater"></view>
                <!-- 高光 -->
                <view class="vus-progress-sphere-glare"></view>
                <!-- 文本 -->
                <view class="vus-progress-sphere-percent">
                	<text v-if="text" class="vus-progress-sphere-percent-text" :style="setText?text:''">{{assignPercent / 2}}</text>
                    <text v-if="sphere.icon.length" :class="sphere.icon[0]" :style="sphere.icon&&sphere.icon[1]"></text>
                    <slot name="text"></slot>
                </view>
                <!-- 气泡 -->
                <!-- <view v-if="sphere.bubble" v-for="item in sphereBubble" :key="item" class="vus-progress-sphere-bubble" :class="'bubble'+item"></view> -->
    		</view>
    	</view>
    </view>
</template>

<script>
export default {
    name: 'vusSphereProgress',
    props: {
        //进度条类型，球形波浪:sphere,
        type: {
            type: String,
            default: 'sphere',
            validator: val => ['sphere'].indexOf(val) > -1
        },
        // 球形波浪进度专用属性，方法：sphere={bubble:false,icon:['iconfont','style']}
        sphere: {
            type: Object,
            default() {
                return {
                    icon: [],
                    bubble: true
                }
            }
        },
        // 进度百份比
        percent: {
            type: [String, Number],
            default: 0
        },
        // 进度条动画效果 true/false
        anim: {
            type: Boolean,
            default: true
        },
        // 宽度
        width: {
            type: Number,
            default: 200
        },
        // 文本(支持两种写法)
        // text="font-size:20rpx;color:#f00;"
        // :text="true"
        text: {
            type: [Boolean, String],
            default: true
        },
		// 分别为：['背景','底部','顶部'] 
        color: {
            type: Array,
            default: () => {
                return []// ['#333','#c00','#f80']
            }
        }
    },
    data() {
        return {
			sysInfo: uni.getSystemInfoSync(),
            sphereBubble: [1,2,3,4,5],
			assignAnim: '',
            assignPercent: this.percent,
        };
    },
    computed: {
        setSphereType() {
            let percent = this.assignPercent;
            let colorType = 100 / 3;
            if (percent && !isNaN(percent) && percent >= 0) {
                if (percent < colorType * 1) {
                    return 'vus-progress-sphere-red';
                } else  if (percent < colorType * 2) {
                    return 'vus-progress-sphere-orange';
                } else {
                    return 'vus-progress-sphere-green';
                }
            }
        },
        setSphereWater() {
            let percent = this.assignPercent;
            percent = 100 - percent;
            let styles = '';
			// 自定义颜色
            if (this.color.length == 3) {
                styles = `background-image:radial-gradient(${this.color[1]} 15%, ${this.color[2]});`;
            } else if (this.color.length == 2) {
                styles = `background-image:none;background-color:${this.color[1]};`;
            }
            return `top:${percent}%;${styles}`;
        },
        setWidthHeight() {
            if (this.width) {
                // 球形水波动画宽高
                if (this.type == 'sphere') {
                    return `width:${this.width}rpx;height:${this.width}rpx;`
                }
            }
        },
        // 文本类型
        setText() {
            return typeof this.text === 'string';
        }
    },
    created() {
		if (this.type == 'sphere') {
            // 球形水波如果加动画，在IOS下会反复闪现
			if (this.sysInfo.platform !== 'ios' && this.anim) {
                this.assignAnim = 'vus-progress-sphere-anim';
			}
		}
    },
    watch: {
		percent(newVal) {
            this.assignPercent = newVal;
            // 完成时清除进度动画
            if (newVal >= 100) {
                this.assignAnim = '';
            }
        }
	}
};
</script>

<style scoped>
/* 球形波浪:sphere */
.vus-progress-sphere-custom,
.vus-progress-sphere-green,
.vus-progress-sphere-orange,
.vus-progress-sphere-red {
    width: 200rpx;
    height: 200rpx;
    transition: all 1s ease;
}
.vus-progress-sphere {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 0 0 10rpx rgba(0,0,0,0.2);
    transition: all 1s ease;
}
.vus-progress-sphere .vus-progress-sphere-inner {
    width: inherit;
    height: inherit;
    position: relative;
    overflow: hidden;
    background-color: rgba(133,133,133,1);
    transition: all 1s ease;
}
.vus-progress-sphere-water {
    width: 200%;
    height: 200%;
    position: absolute;
    left: -50%;
    border-radius: 40%;
    transition: all 1s ease;
}
.vus-progress-sphere .vus-progress-sphere-water::before,
.vus-progress-sphere .vus-progress-sphere-water::after {
    width: 100%;
    height: 100%;
    background-image: inherit;
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-radius: inherit;
}
.vus-progress-sphere .vus-progress-sphere-water::before {
    opacity: 0.4;
    transform: rotate(15deg) scale(1.05);
}
.vus-progress-sphere .vus-progress-sphere-water::after {
    opacity: 0.2;
    transform: rotate(-25deg) scale(1.07);
}
/* 高光 */
.vus-progress-sphere .vus-progress-sphere-glare {
    width: 200%;
    height: 200%;
    position: absolute;
    top: -140%;
    left: -120%;
    z-index: 6;
    background-color: rgba(255, 255, 255, 0.1);
    transform: rotate(0deg);
    border-radius: 50%;
    transition: all 1s ease;
}
/* 百份比文本 */
.vus-progress-sphere .vus-progress-sphere-percent {
    width: 100%;
    height: 100%;
    line-height: 1.2;
    position: absolute;
	z-index: 5;
	display: flex;
	align-items: center;
	justify-content: center;
    text-align: center;
    flex-direction: column;
    transition: all 1s ease;
}
.vus-progress-sphere .vus-progress-sphere-percent-text {
    width: 100%;
	font-size: 50rpx;
	display: block;
    color: #fff;
	font-weight: 600;
    text-shadow: 0 0 10rpx inherit;
}
.vus-progress-sphere .vus-progress-sphere-percent-icon {}
/* 绿色水波 */
.vus-progress-sphere-green .vus-progress-sphere-water {
    top: 25%;
    background-image: radial-gradient(#2a4 15%, #6df736);
}
/* 橙色水波 */
.vus-progress-sphere-orange .vus-progress-sphere-water {
    top: 50%;
    background-image: radial-gradient(#e83 15%, #f9d534);
}
/* 红色水波 */
.vus-progress-sphere-red .vus-progress-sphere-water {
    top: 75%;
    background-image: radial-gradient(#c00 15%, #ff5050);
}
/* 动画 */
.vus-progress-sphere .vus-progress-sphere-anim {
	animation: VusProgressWater 10s infinite forwards linear;
	-webkit-perspective: 1000;
	-webkit-backface-visibility: hidden;
	-webkit-transform-style: preserve-2d;
}
@keyframes VusProgressWater {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
/* 气泡 */
.vus-progress-sphere .vus-progress-sphere-bubble {
    width: 12rpx;
    height: 12rpx;
    position: absolute;
    left: calc(50% - 6rpx);
    bottom: 0;
    z-index: 4;
    opacity: 0;
    background-color: rgba(255,255,255,.3);
    border-radius: 50%;
}
.vus-progress-sphere .bubble1 {
    animation: VusProgressBubble1 3s linear infinite;
}
.vus-progress-sphere .bubble2 {
    animation: VusProgressBubble2 3s 1s linear infinite;
}
.vus-progress-sphere .bubble3 {
    animation: VusProgressBubble1 3s 2s linear infinite;
}
.vus-progress-sphere .bubble4 {
    animation: VusProgressBubble3 3s 1.5s linear infinite;
}
.vus-progress-sphere .bubble5 {
    animation: VusProgressBubble2 3s .5s linear infinite;
}
@keyframes VusProgressBubble1 {
    0% {
        opacity: 0.5;
        transform: translateY(0);
    }
    50% {
        opacity: 1;
        transform: translateY(-500%);
    }
    100% {
        opacity: 0;
        transform: translateY(-1000%);
    }
}
@keyframes VusProgressBubble2 {
    0% {
        opacity: 0.5;
        transform: translate(0, 0);
    }
    50% {
        opacity: 1;
        transform: translate(-10rpx, -500%) scale(1.5);
    }
    100% {
        opacity: 0;
        transform: translate(-20rpx, -1000%);
    }
}
@keyframes VusProgressBubble3 {
    0% {
        opacity: 0.5;
        transform: translate(0,0);
    }
    50% {
        opacity: 1;
        transform: translate(10rpx, -500%);
    }
    100% {
        opacity: 0;
        transform: translate(20rpx, -1000%);
    }
}
</style>
