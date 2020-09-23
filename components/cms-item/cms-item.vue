<template>
	<view class="media-item" :class="options.nimages_type == 1?'':'flex-direction'" hover-class="media-item-hover" @click="click">
		<view class="media-content" :class="options.nimages_type == 1?'flex-direction justify-between':''">
			<view class="title text-black text-ellipsis">
				{{options.ntitle}}
			</view>
			<view class="info flex align-center margin-top-sm" v-if="options.nimages_type == 1">
				<view class="flex align-center text-sm text-gray margin-right">
					<image :src="options.photo" class="avatar margin-right-xs"></image>
					{{options.nauthor}}
				</view>
				<view class="text-sm text-gray">
					{{ options.nsendtime | showTime }}
				</view>
			</view>
		</view>
		<view class="image-box flex flex-wrap align-center" 
			:class="options.nimages_type == 1?'margin-left-sm image-box1':'margin-top-sm image-box2'" 
			v-if="options.nimages_type != 0"
		>
			<image class="image flex-sub" v-if="options.nimages_type == 1" :src="options.nimages"></image>
			<!-- <view class="image-grid">  :class="{'col-3': options.nimages_type == 3 || options.nimages_type == 6 || options.nimages_type == 9}" v-else-->
			<view class="grid text-center col-3" v-else>
				<view class="grid-image-box" v-for="(source, i) in options.image_list" :key="i">
					<image class="image" :src="source" mode="aspectFill" />
				</view>
			</view>
			<!-- </view> -->
			<!-- <image class="image flex-sub" v-else :src="source" v-for="(source, i) in options.image_list" :key="i" /> -->
		</view>
		<view class="info flex align-center margin-top-sm" v-if="options.nimages_type != 1">
			<view class="flex align-center text-sm text-gray margin-right">
				<image :src="options.photo" class="avatar margin-right-xs"></image>
				{{options.nauthor}}
			</view>
			<view class="text-sm text-gray">
				{{ options.nsendtime | showTime }}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		options: {
			type: Object,
			default: function(e) {
				return {}
			}
		}
	},
	methods: {
		click() {
			this.$emit('click');
		},
		close(e) {
			this.$emit('close');
		}
	}
}
</script>

<style>
.media-item{
	position: relative;
	display: flex;
	padding: 20rpx 30rpx;
}
.media-item::after{
	content: " ";
	width: calc(200% - 120rpx);
	height: 200%;
	position: absolute;
	top: 0;
	left: 30rpx;
	border-radius: inherit;
	transform: scale(0.5);
	transform-origin: 0 0;
	pointer-events: none;
	box-sizing: border-box;
	border-bottom: 1rpx solid rgba(205, 205, 205, 0.5);
}
/* .media-item:last-child::after{
	border: 0;
} */
.media-content{
	display: flex;
	flex: 1;
}
.title{
	font-size: 34rpx;
	font-weight: 500;
	/* color: #000; */
	line-height: 1.4;
}
.info view{
	line-height: 24rpx;
}
.avatar{
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
}
.image-box{
	position: relative;
}
.image-box1{
	width: 208rpx;
	height: 156rpx;
}
.image-box2{
	width: calc(100% + 20rpx);
	left: -10rpx;
}
.image{
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 6rpx;
}
.grid{
	width: 100%;
}
.grid .grid-image-box{
	padding: 0 10rpx 20rpx;
}
.grid.col-3 .grid-image-box{
	height: 180rpx;
}
/* .grid.col-3 .grid-image-box:nth-child(3n+2){
	margin: 0 20rpx 20rpx;
} */
/* .grid.col-2 .grid-image-box .image{
	padding-right: 10rpx;
	padding-bottom: 10rpx;
}
.grid.col-2 .grid-image-box:nth-child(2n) .image{
	padding-right: 0;
}
.grid.col-3 .grid-image-box .image{
	padding-right: 10rpx;
	padding-bottom: 10rpx;
}
.grid.col-3 .grid-image-box:nth-child(3n+2) .image{
	padding-right: 0;
} */
</style>
