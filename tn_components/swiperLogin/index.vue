<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="title">加密资产消费新方案</view>
		<view class="swiper-box">
            <u-swiper
                :list="list5"
                @change="e => current = e.current"
                :autoplay="false"
                :current="current"
        >
            <view
                    slot="indicator"
                    class="indicator"
            >
                <view
                        class="indicator__dot"
                     
                        v-for="(item, index) in list5"
                        @click="(event)=>dotHandle(event,index)"
                        :key="index"
                        :class="[index === current && 'indicator__dot--active']"
                >
                </view>
            </view>
        </u-swiper>
        </view>
        <view class="orz-btn" @click="RegisterHandle">Register a orz account</view>
        <view class="orz-btn" @click="LoginHandle">Login  orz account</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
            current:0,
			title: 'ORZCash', //填写logo或者app名称，也可以用：欢迎回来，看您需求
            list5: [
                    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                ],
		};
	},
	onLoad() {},
	methods: {
		dotHandle(event,index){
         console.log(event,index)
         this.current = index
        },
        RegisterHandle(){
            uni.navigateTo({
                url: '../register/index'
            })
        },
        LoginHandle(){
            uni.navigateTo({
                url: '../login/index1'
            })
        }
	}
};
</script>
<style>
.img-a {
	position: absolute;
	width: 100%;
	top: 50rpx;
	right: 0;
}
.swiper-box{
    margin-top:40px;
}
.orz-btn{
    padding: 8px 16px;
    text-align: center;
    margin: 24px auto;
    border:1px solid #ccc;
    border-radius: 8px;;
    background: #000;
    color:#fff;
}
.register-header{
    display: flex;
}
.register-left{
    margin-right:8px;
}
.title{
	margin-top:8px;
	margin-bottom:8px;
}
.register{
	color:#5677fc;
	cursor: pointer;
}
.account-text{
	margin-top:8px;
	margin-bottom: 8px;;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	/* margin-bottom: -200rpx; */
}
.t-login {
	width: 650rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}

.t-login input {
	padding: 0 20rpx 0 24rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 6rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	/* left: 40rpx; */
	top: 28rpx;
	/* border-right: 2rpx solid #dedede; */
	margin-right: 20rpx;
}
.t-login .t-a .line{
	width: 2rpx;
	height: 40rpx;
	background-color: #dedede;
	position: absolute;
	top: 28rpx;
	left: 98rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 100rpx 0 30rpx 0;
	font-weight: bold;
}
.t-login .t-b2 {
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 120rpx 0;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 200rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
<style lang="scss">
.indicator {
        @include flex(row);
        justify-content: center;
        &__dot {
             height: 10px;
             width: 10px;
             border-radius: 100px;
             background-color: rgba(255, 255, 255, 0.35);
             margin: 0 5px;
             transition: background-color 0.3s;
    
            &--active {
                 background-color: #ffffff;
             }
        }
    }

    .indicator-num {
        padding: 2px 0;
        background-color: rgba(0, 0, 0, 0.35);
        border-radius: 100px;
        width: 35px;
        @include flex;
        justify-content: center;

        &__text {
             color: #FFFFFF;
             font-size: 12px;
         }
    }
</style>