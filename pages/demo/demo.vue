<template>
	<view class="Cms padding-lr" v-if="cmsList.length > 0">
		<view
			class="Cms-content padding-tb flex align-center justify-start"
			v-for="(item, index) in cmsList"
			:key="item.ntitle"
			data-item="item"
			@tap.stop.prevent="goCmsdetail(item)"
			:class="item.nimages_type == 3 ? 'Cms-top-type' : ''"
		>
			<!-- 一类资讯 -->
			<view class="Cms-left Wt" v-if="item.nimages_type == 0">
				<view class="Cms-left-title">{{ item.ntitle }}</view>
				<view class="Cms-left-user">
					<image class="Cms-left-usericon" lazy-load :src="item.photo" mode="scaleToFill"></image>
					<view class="Cms-left-txt">{{ item.nauthor }}</view>
					<view class="Cms-left-txt">{{ item.nsendtime | showTime }}</view>
				</view>
			</view>
			<view class="Cms-left" v-if="item.nimages_type == 1">
				<view class="Cms-left-title">{{ item.ntitle }}</view>
				<view class="Cms-left-user">
					<image class="Cms-left-usericon" lazy-load :src="item.photo" mode="scaleToFill"></image>
					<view class="Cms-left-txt">{{ item.nauthor }}</view>
					<view class="Cms-left-txt">{{ item.nsendtime | showTime }}</view>
				</view>
			</view>
			<image v-if="item.nimages_type == 1" class="Cms-right" lazy-load :src="item.nimages" mode="scaleToFill"></image>
			<!-- 三类资讯 -->
			<view class="Cms-top" v-if="item.nimages_type == 3">
				<view class="Cms-top-title">{{ item.ntitle }}</view>
				<view class="Cms-top-img">
					<image class="Cms-top-imglist" lazy-load :src="item.nimages[0]" mode="scaleToFill"></image>
					<image class="Cms-top-imglist" lazy-load :src="item.nimages[1]" mode="scaleToFill"></image>
					<image class="Cms-top-imglist" lazy-load :src="item.nimages[2]" mode="scaleToFill"></image>
				</view>
			</view>
			<view class="Cms-bottom-user" v-if="item.nimages_type == 3">
				<image class="Cms-left-usericon1" lazy-load :src="item.photo" mode="scaleToFill"></image>
				<view class="Cms-left-txt1" style="margin-right: 15px;">{{ item.nauthor }}</view>
				<view class="Cms-left-txt1">{{ item.nsendtime | showTime }}</view>
			</view>
		</view>
		<uni-load-more :status="status"></uni-load-more>
	</view>
</template>

<script>
</script>

<style>
</style>
