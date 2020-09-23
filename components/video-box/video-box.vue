<template>
    <view class="myimgDV">
        <view v-if="imgPicList.length>0" class='receiveimage flex justify'>
            <block v-for="(item,ind) in imgPicList" :key="ind">
            <video class="imgitem" :style="{width:imgwidth,height:imgheight}"
                :class="imgboxtype==0?'onepic':imgboxtype==1?'doublepic':imgboxtype==2?'triplepic':''" :src="item"
                :mode="imgboxtype==0?'widthFix':imgboxtype==1?'aspectFill':imgboxtype==2?'aspectFill':''"
                ></video>
				<!-- @tap.stop.prevent="previewpic(item,imgPicList)" -->
            <!-- {width:(imgboxtype==0?'':imgwidth),height:(imgboxtype==0?'':imgwidth),padding:(imgboxtype==0?'':imgpad)} -->
            </block>
        </view>
    </view>
</template>

<script>
export default {
	name: 'videoBox',
    data() {
        return {
            imgPicList: [],
            imgboxtype: 0,
            imgwidth: 0,
            imgpad: 0,
            imgheight: ''
        }
    },
    props: {
        imgList: {
            type: Array
        },
        num: {
            type: Number,
            default: 0
        },
        pad: {
            type: Number,
            default: 0
        }
    },
    methods: {
        // 图片预览
        previewpic(cind, clist) {
            console.log(cind);
            console.log(clist);
            uni.previewImage({
                urls: clist,
                current: cind,
                indicator: 'default'
            });
        },
        getheight() {
            const query = uni.createSelectorQuery().in(this).select('.imgitem');
            uni.createSelectorQuery().select('.imgitem').boundingClientRect(res => {
                // console.log('reac', res)
                if (this.num == 1) {
                    this.imgheight = '340rpx';
                } else if (this.num == 2 || this.num == 4) {
                    this.imgheight = 173 + 'px';
                } else {
                    this.imgheight = 113 + 'px';
                }
            }).exec()
        }
    },
    mounted() {
        
        this.imgPicList = this.imgList;
        // console.log(this.imgPicList.length);
        if (this.num == 1) {
            this.imgboxtype = 0;
            this.imgwidth = 100 + '%';
        } else if (this.num == 2 || this.num == 4) {
            this.imgboxtype = 1;
            this.imgwidth = 49 + '%';
        } else if (this.num == 3 || this.num > 4) {
            this.imgboxtype = 2;
            this.imgwidth = 32 + '%';
        }
        this.$nextTick(function () {
            this.getheight();
        })
    }
}
</script>

<style lang="scss">
.myimgDV {
    .flex {
        display: flex;
    }
    .justify {
        justify-content: space-between;
        &::after {
            content: "";
            flex: auto;
        }
    }
    .receiveimage {
        margin-top: 16rpx;
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .onepic {
            width: 100%;
            // height: 188rpx;
            // height: auto;
            margin-bottom: 16rpx;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
        .doublepic {
            // width: 340rpx;
            // height: 340rpx;
            margin-right: 12rpx;
            margin-bottom: 12rpx;
            &:nth-child(2n) {
                margin-right: 0;
            }
        }
        .triplepic {
            // width: 222rpx;
            // height: 222rpx;
            margin-right: 12rpx;
            margin-bottom: 12rpx;
            &:nth-child(3n) {
                margin-right: 0;
            }
        }
    }
}
</style>
