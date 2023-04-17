<!-- 蓝色简洁登录页面 -->
<template>
	<view class="home-wrap t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="home-header">
			<view class="home-title">{{ title }}</view>
		     <view class="home-mastercard">Mastercard</view>
			 <view class="card-img-box">
				<img :src="cardImg" alt="" class="cardImg">
			 </view>
		</view>
		<view class="home-main">
			<form class="cl home-form">
				<view class="t-a home-email" label="Email Address">
					<view class="title">Email Address</view>
					<input type="text" placeholder="Provide your Email"  v-model="loginForm.email" />
				</view>
				<view class="t-a">
				<view class="title">Verification code</view>
                <view
					class="u-demo-block__content home-verification "
					style="margin-top: 15px;"
				>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u--input placeholder="Enter the verification code"  v-model="loginForm.code">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input placeholder="Enter the verification code" v-model="loginForm.code">
					<!-- #endif -->
						<template slot="suffix">
							<u-code
								ref="uCode"
								@change="codeChange"
								seconds="60"
								changeText="X秒重新获取"
								start-text="Get the code"
								end-text="try again"
							></u-code>
							<u-button
								@tap="getCode"
								:text="tips"
								start-text="Get the code"
								end-text="try again"
                                class="home-getBtn"
								type="success"
								size="mini"
							></u-button>
						</template>
					<!-- #ifndef APP-NVUE -->
					</u--input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</view>
				<view class="home-robort">I am not a robort<u-switch activeColor="#1F1423" v-model="robortValue" @change="switchChange"></u-switch></view>
				<view class="home-grecaptcha-wrap" v-if="robortValue">
					<view id="grecaptcha" class="g-recaptcha" data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" data-size="normal"></view>
				</view>
				
				<!-- <input type="text" placeholder="请输入邮箱" v-model="form.email" /> -->
			</view>
			<view class="orz-btn" @click="RegisterHandle" v-if="!isKycAuth">Apply / Login</view>
			<view class="orz-btn-green" v-if="isKycAuth">Apply / Login</view>
             <!-- <view class="orz-btn" @click="LoginHandle">Login</view> -->
			</form>
		</view>
		
	</view>
</template>
<script>
import cardImg from '@/static/home/home-card.png'
import request from '@/common/request.js';
import Cookies from 'js-cookie'
import { mapState,mapActions } from "vuex";
export default {
	data() {
		return {
            current:0,
			cardImg,
			title: 'ORZ CASH',
			tips: 'Get the code',
		    tipValue: '',
			robortValue:false,
			robortToken:'',
			isKycAuth:false,
			reBotType:'register',
			loginForm:{
				email:'',
				code:'',
				type:'apply'
			},
			userInfo:{},
			rules: {
			
				front:[{required: true,trigger:'blur,change'}],
			},
            list5: [
                    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
                    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
                ],
		};
	},
	computed: {
		...mapState('app',['token'])
	},
	mounted() {
		this.ctGrecaptcha()
		// this.getUserInfo()
	},
   
	methods: {
		...mapActions('app',['setToken']),
		async getUserInfo(){
			const opt = {
				url: 'api/user/kycstatus',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt)
		    console.log(data)
			this.userInfo = data.result
			const { status } = data.result
		    console.log(status,'kycStatus')
			if(status==4||status==2 || status==3){
				uni.navigateTo({
					url: '../../pages/cardoverview/index'
				})
				
				return
			}else{
				uni.navigateTo({
					url: '../../pages/me/clientApplyKyc'
				})
			}
			
		},
		ctGrecaptcha(){
			let script = document.createElement('script');
			script.src = 'https://www.google.com/recaptcha/api.js?hl=en&render=explicit';
			document.getElementsByTagName('body')[0].appendChild(script);
		},
	    loadedFn(){
			const that = this;
			if(!window.grecaptcha){
               this.ctGrecaptcha()
			}
			window.grecaptcha.render('grecaptcha', {
				sitekey:'6LdwLkMlAAAAAItedUFux9GNYR13HjKQF3GEkRT_',
				callback: that.submit,
				'theme' :'dark',
				expiredCallback:this.expiredCallback,
				errorCallback:this.errorCallback
			})
		},
		errorCallback(){
			console.log('token 失效')
		},
		expiredCallback(){
			console.log('过期回调')
			window.grecaptcha.execute();
		},
		codeChange(text) {
            this.tips = text;
        },
		submitCallback(token){
		  	const opts = {
				url: 'api/user/rebot',
				method: 'post'
			};
			const {data} = request.httpRequest(opts,{recaptchatoken:token});
			console.log(data,'dta')
		},
		switchChange(val){
			if(val){
				this.loadedFn();
			}
		},
        submit(token){
			this.robortToken = token;
			let opts = {
					url: 'api/user/rebot',
					method: 'post'
				};
			const {data} = request.httpRequest(opts,{recaptchatoken: this.robortToken});
			console.log(data,'data')
		},
		async getCode() {
			const res = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
			if(!this.robortValue){
				uni.$u.toast('請使用人機驗證!');
				return
			};
			if(!this.loginForm.email){
				uni.$u.toast('郵箱地址不能為空!');
				return
			}
            if(!res.test(this.loginForm.email)){
				uni.$u.toast('郵箱格式不正確!');
				return
			}
			if (this.$refs.uCode.canGetCode) {
                this.$refs.uCode.start();
                let opts = {
					url: 'api/email/code',
					method: 'post',
				};
                const { data } = await request.httpRequest(opts,{email: this.loginForm.email,type:'apply'})
                console.log(data,'data')
				if(data.code!==200){
					this.reBotType='login'
				    this.loginForm.code = ''
					this.tips = 'Get the code';
					uni.$u.toast('请获取登录验证码验证！');
					this.$refs.uCode.reset();
					return;
				}
			} else {
			  uni.$u.toast('倒计时结束后再发送');
			}
		},
		dotHandle(event,index){
         console.log(event,index)
         this.current = index
        },
       async RegisterHandle(){
		    if(!this.robortToken){
				uni.$u.toast('请完成人机校验功能！');
				return;
			};
			if(!this.loginForm.email) {
				uni.$u.toast('邮箱地址不能为空！');
				return;
			};
			if(!this.loginForm.code){
				uni.$u.toast('验证码不能为空！');
				return;
			}
			let opts = {
				url: 'api/user/register',
				method: 'post',
			};
			const { data } = await request.httpRequest(opts,this.loginForm)
			console.log(data,'data')
			// this.token = data.result.token
		
			if(data.code!==200){
				uni.$u.toast('网络异常！');
				 return;
			}
			Cookies.set('token',data.result.token)
			uni.setStorageSync('token',data.result.token)
			this.setToken(data.result.token)
			this.getUserInfo()
		
        },
        // async LoginHandle(){
		// 	if(!this.robortToken){
		// 		uni.$u.toast('請完成人機效驗！');
		// 		return;
		// 	};
		// 	if(!this.loginForm.email) {
		// 		uni.$u.toast('郵箱地址不能為空');
		// 		return;
		// 	};
		// 	if(!this.loginForm.code){
		// 		uni.$u.toast('驗證碼不能為空！');
		// 		return;
		// 	}
		// 	const opts = {
		// 		url: 'api/user/login ',
		// 		method: 'post',
		// 	};
		// 	const { data } = await request.httpTokenRequest(opts,this.loginForm)
		// 	console.log(data,'data')
		// 	if(data.code!==200){
		// 		uni.showToast({ title: data.message, icon: 'none' });
		// 		return;
		// 	}
		// 	Cookies.set('token',data.result.token)
		// 	uni.setStorageSync('token',data.result.token)
		// 	this.setToken(data.result.token)
		// 	this.getUserInfo()
		   
		// 	uni.navigateTo({
		// 		url: '../../pages/me/clientApplyKyc'
		// 	})
        //     // uni.navigateTo({
        //     //     url: '../login/index1'
        //     // })
        // }
	}
};
</script>
<style lang="scss">
.home-header{
	width: calc(100%);
	padding:0 25px;
	height: 50%;
	background: url('../.././static/home/uni-header.png') no-repeat;
	background-size:100% 100% ;
}
.cardImg{
	width: 100%;
	height: 100%;
	object-fit: contain;
}
.home-title{
	font-weight: bold;
    color: #171717;
	font-size: 30px;
	padding-top: 68rpx;;
}
.home{
	&-wrap{
		// position: relative;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	&-mastercard{
		font-size: 22px;
		font-weight: bold;
        color: #171717;
		padding-top:10px;
	}
	&-main{
		width: calc(100%);
		padding:0 25px;
		height:auto;
		flex:1;
		// position: absolute;
		bottom: 0;
		background: rgba(255,255,255,0.21);
		box-shadow: 0px 0px 11px 0px rgba(121,170,218,0.15);
		border-radius: 40px 40px 0px 0px;
		border: 1px solid #FFFFFF;
		backdrop-filter: blur(10px);
	}
	&-form{
		margin-top:25px;
		color: #C7C7C7;
	}
	&-email{
		margin-top:25px;
	}
	&-verification{
		// width: 200px;
	}
	&-getBtn{
		padding:10px 20px;
	}
	&-robort{
		font-weight: bold;
        color: #000000;
		padding-top:30px;
		display: flex;
		justify-content: space-between;
	}
	&-grecaptcha-wrap{
		margin:16px auto 0;
	    display: flex;
	}
}

::v-deep{
		.u-switch__node{
			background-color:#27FF6A;
		}
		// .u-switch__bg,.u-switch{
		// 	background-color: #171717!important;
		// }
	}

.img-a {
	position: absolute;
	width: 100%;
	top: 50rpx;
	right: 0;
}
.swiper-box{
    /* margin-top:40px; */
}
.orz-btn{
    // padding: 8px 16px;
    text-align: center;
    margin: 16px auto;
	height: 44px;
	line-height: 44px;
    border:1px solid #ccc;
    border-radius: 8px;;
    background: #000;
    color:#fff;
}
.orz-btn-green{
	text-align: center;
    margin: 16px auto;
	height: 44px;
	line-height: 44px;
    border:1px solid #ccc;
    border-radius: 8px;;
    background: #ccc;
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
   width: 100%;
	color: #000;
}

.t-login button {
	font-size: 28rpx;
	// background: #5677fc;
	// color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	// box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}
.u-button--success{
	background-color: transparent;
    border-color: transparent;
	font-weight: bold;
color: #1F1423;
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
// @media screen and (max-width: (768px - 1px)) {
   
// 	 #rc-anchor-alert{
//       display: none
// 	 }
// }
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
	.g-recaptcha{
		display: flex;
		margin:0 auto;
	}
</style>