<template>
	<view class="wrap">
		<text v-if="token">文章内容正在加载中。。。</text>
		<view class="title">
			{{title}}
		</view>
		<view class="content">
			<rich-text :nodes="content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				token: true
			};
		},
		onLoad: function(e) {
			uni.request({
				url: 'https://unidemo.dcloud.net.cn/api/news/36kr/' + e.postid,
				method: 'GET',
				data: {},
				success: res => {
					this.title = res.data.title;
					this.content = res.data.content;
					this.token = false
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
</script>

<style scoped>
	.wrap {
		padding: 10upx 2%;
		flex-wrap: wrap;
		background-color: white;
	}

	.title {
		line-height: 2em;
		font-weight: bold;
		font-size: 40upx;
	}

	.content {
		line-height: 2em;
	}
</style>
