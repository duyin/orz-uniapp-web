<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="title">加密资产消费新方案</view>
		<form class="cl">
			<view class="t-a">
				<view class="title">电子邮件*</view>
				<input type="text" placeholder="请输入邮箱"  v-model="loginForm.email" />
			</view>
			<view class="t-a password-box">
				<view class="title">密码</view>
				<!-- <input type="password"  placeholder="请输入密码" v-model="loginForm.passwd" /> -->
				<u-input v-show="isText === true" placeholder="请输入密码" border="none" v-model="loginForm.passwd" class="input_class_pwd" :password="true">
                    <template slot="suffix">
                        <u-icon name="eye-off" @click="isText = false" size="18"></u-icon>
                    </template>
                </u-input>
                <u-input v-show="isText === false" placeholder="请输入密码" border="none" v-model="loginForm.passwd" class="input_class_pwd" :password="false">
                    <template slot="suffix">
                        <u-icon name="eye-fill" @click="isText = true" color="#247CFF"></u-icon>
                    </template>
                </u-input>
			</view>
			
			<button @tap="login()">登 录</button>
		</form>
		<view class="account-text">没有账户?<text class="register" @tap="registerFn">在这里注册</text> <text class="register resetPasswd" @tap="resetPassHandle">忘记密码</text></view>
	    <view>登陸註冊即通過ORZ的使用條例和隱私政策</view>
	</view>
</template>
<script>
import request from '@/common/request.js';
import Cookies from 'js-cookie'
import { mapState,mapActions } from "vuex";
export default {
	data() {

		return {
			title: 'ORZCash', //填写logo或者app名称，也可以用：欢迎回来，看您需求
			second: 60, //默认60秒
			showText: true, //判断短信是否发送
			isText:true,
			loginForm:{
				email:'',
				passwd:'',
				token:Cookies.get('token')||''
			}
		};
	},

	onLoad() {},
	mounted() {
		
	},
	computed: {
		...mapState('app',['token'])
	},
	methods: {
        ...mapActions('app',['setToken']),
		//当前登录按钮操作
		async login() {
			var that = this;
		    if(!this.loginForm.email){
				uni.showToast({ title: '请输入邮箱!', icon: 'none' });
				return;
			}
			if(!this.loginForm.passwd){
				uni.showToast({ title: '请输入密码!', icon: 'none' });
				return;
			}
			const opts = {
				url: 'api/user/login ',
				method: 'post',
			};
			const { data } = await request.httpTokenRequest(opts,this.loginForm)
			console.log(data,'data')
			if(data.code!==200){
				uni.showToast({ title: data.message, icon: 'none' });
				return;
			}
			Cookies.set('token',data.result.token)
			uni.setStorageSync('token',data.result.token)
		
			this.setToken(data.result.token)
			uni.navigateTo({
				url: '../../pages/index/tabbar'
			})
		},
		//获取短信验证码
		getCode() {
			var that = this;
			var interval = setInterval(() => {
				that.showText = false;
				var times = that.second - 1;
				//that.second = times<10?'0'+times:times ;//小于10秒补 0
				that.second = times;
				console.log(times);
			}, 1000);
			setTimeout(() => {
				clearInterval(interval);
				that.second = 60;
				that.showText = true;
			}, 60000);
			//这里请求后台获取短信验证码
			uni.request({
				//......//此处省略
				success: function(res) {
					that.showText = false;
				}
			});
		},
		resetPassHandle(){
			uni.navigateTo({
				url: '../resetRegister/index'
			})
		},
		registerFn(){
			uni.navigateTo({
				url: '../register/index'
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.img-a {
	position: absolute;
	width: 100%;
	top: -150rpx;
	right: 0;
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
	display: flex;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	/* margin-bottom: -200rpx; */
}
.password-box {
	margin-bottom:24px;
    ::v-deep{
        .u-input__content{
            border:1px solid #ccc;
            border-radius: 3px;
            padding:0 10px 0 12px;
            height: 45px;
        }
    }
}
.resetPasswd{
	display: flex;
	flex: 1;
	cursor: pointer;
	justify-content: flex-end;
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
	padding: 300rpx 0 30rpx 0;
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
