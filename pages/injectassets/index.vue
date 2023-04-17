<!-- 蓝色简洁登录页面 -->
<template>
	<view class="home-wrap t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<!-- <view class="home-header">
			<view class="home-title">{{ title }}</view>
		</view> -->
		<view class="header-inject home-header">
			<view class="home-header1">
				<view class="home-leftward" @tap="backHandle">
				<u-icon name="arrow-leftward" color="#fff" class="home-leftwardImg"></u-icon>
			   </view>
			   <view class="home-title">{{ title }}</view>
			</view>
			
		</view>

		<view class="home-main">
            <!-- <view class="home-wallet-inject">
              <img :src="walletinject" />
            </view> -->
			<view class="inject-title">请选择您要注入的数字资产：</view>
            <view class="inject-assets">
                <u--input placeholder="按资产搜索" ></u--input>
            </view>
            <view class="home-pay-list">
                <view v-for="(item,index) in list" class="pay-list-item" 
                  @click="(e)=>listHandle(e,index)" 
                  :data-index="index"
                   :class="{active:index===activeIndex}"
                  >
                  <!-- <img :src="" /> -->
                    {{ item.name }}
                </view>
            </view>
            <view class="next-btn" @click="nextHandle">Next</view>
		</view>
		
	</view>
</template>
<script>
import cardImg from '@/static/home/client-card.png'
import request from '@/common/request.js';
import { mapState,mapActions } from "vuex";
// import cardOutlined from '../.././static/home/card-outlined.png'
import bellOutlined from '../.././static/home/bell-outlined.png'
import blockOutlined from '../.././static/home/block-outlined.png'
import editOutlined from '../.././static/home/edit-outlined.png'
import lockOutlined from '../.././static/home/lock-outlined.png'
import slidersOutlined from '../.././static/home/sliders-outlined.png'
import insetOutlined from '../.././static/home/inset-outlined.png'
import underreview from '../.././static/home/underreview.png'
import turndown from '../.././static/home/turndown.png'
import walletinject from '../.././static/home/walletinject.png'

export default {
	data() {
		return {
            current:0,
			cardImg,
            underreview,
            turndown,
            walletinject,
            isCard:false,
			title: '注入请求 - 数字资产',
            value:30,
            status:0,
            activeIndex:0,
            active:false,
            userInfo:{
                status:0
            },
			list:[
                {name:'BTC',img:insetOutlined},
                {name:'ETH',img:lockOutlined},
                {name:'USDC',img:slidersOutlined},
                {name:'USDT',img:bellOutlined},
            ]
		};
	},
	computed: {
		...mapState('app',['token'])
	},
	mounted() {
		this.getUserInfo()
		this.addCoin()
	},
   
	methods: {
		...mapActions('app',['setToken']),
		async addCoin(){
			let opts = {
				url: 'api/user/coinadd',
				method: 'post',
			};
			const { data } = await request.httpTokenRequest(opts,{ "coinKey" :["USDC_ERC20", "USDT_ERC20", "ETH_GOERLI"] })
			console.log(data,'data')
		},
		async getUserInfo(){
			const opt = {
				url: 'api/user/kycstatus',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt)
		    console.log(data)
			this.userInfo = data.result
			this.status = data.result.status
			// if(status>1){
			// 	uni.$u.toast('該用戶已認證!');
			// 	this.isKycAuth = true
			// 	return
			// }
		},
		nextHandle(){
			// uni.$u.toast('正在开发');
			uni.navigateTo({
				url: '../../pages/injectpay/index'
			})
		},
        listHandle(event,key){
            console.log(event,'taget',event.currentTarget,key)
            const { index } = event.currentTarget.dataset;
            console.log(index,key)
            this.activeIndex = key;
        },
		backHandle(){
			uni.navigateTo({
				url: '../../pages/cardoverview/index'
			})
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
		
      
	}
};
</script>
<style lang="scss" scoped>

.home-header1{
	display: flex;
  align-items: center;
  padding-top: 40px;

//   padding-top: 68px;
}
.home-leftwardImg{
		width: 51px;
		height: 32px;
		background: #1F1423;
		border-radius: 13px;
		line-height: 32px;
		text-align: center;
		margin-right:16px;
		font-size: 14px;
		display: flex;
    color: #fff;
    justify-content: center;
	}
.home-pay-list .active{
        border: 1px solid #27FF6A ;
        background: rgba(113,234,255,0.12);
       
    }
.home-pay-list{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-top:48px;
  gap: 10px;
}
.next-btn{
    text-align: center;
    margin: 48px auto;
	height: 44px;
	line-height: 44px;
    border:1px solid #ccc;
    border-radius: 8px;;
    background: #000;
    color:#fff;
}
.pay-list-item{
    border:1px solid #ccc;
    text-align: center;
    border-radius: 6px;;
    padding: 8px 16px;;

}
.inject-assets{
    margin-top:16px;
}
.home-wallet-inject{
 position: relative;
 left:50%;
//  top:-50%;
   margin-left:-75px;
   margin-top:-95px;
}
.inject-title{
    margin-top:48px;
}
.card-assets{
    display: flex;
    margin-top:8px;
}
.card-header-list-left{
    display: flex;
    align-items: center;
}
.slide-box{
    ::v-deep{
        .uni-slider{
            margin:0!important;
        }
    }
   
}
.card-money-text{
    margin-bottom:16px;
    margin-top:8px;
    text-align: center;
    font-size: 18px;;
    font-weight: bold;
}
.arrow-box{
    margin-left:10px;
}
.card-box{
    display: flex;
    justify-content: space-between;
}
.crad-underreview{
    margin: 16px auto;
    text-align: center;
    width: 100%;
}
.pleasewait{
    text-align: center;
}
.card-seconed{
    border-bottom:1px solid #ccc;
    padding-bottom:16px; 
  
}
.card-header-list-right{
    width: 50px;
    height: 50px;
    background: #fff;
    border-radius: 6px;;
}
.card-header-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card-box-seconed{
    margin-top:16px;
}
.card-header-list-leftImg{
    width:50px;;
    height: 50px;
    border-radius: 50%;
    margin-right:16px;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
}
.card-list-wrap{
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    
   
     grid-template-columns: repeat(3, 1fr);
   
 
    // justify-content:center;
    // align-items: center;
    // text-align: center;
}
.card-list{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.card-item-list{
    width: 68px;
    height: 68px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:16px;
    text-align: center;
    color:#fff;
    background: #1F1423;
    border-radius: 50%;
    box-shadow: 0px 3px 9px 0px rgba(77,97,91,0.12);
}
.card-money-warp{
    width: calc(100% - 24px);
    margin:16px auto;
    padding:16px;
    background: #EFEEF3;
    border-radius: 18px;
}
.home-header{
	width: calc(100%);
	padding:0 25px;
	height: 40%;
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
	font-size: 24px;
	// padding-top: 68rpx;;
}
.home{
	&-wrap{
		position: relative;
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
		// height:auto;
		flex:1;
        position: relative;
		// position: absolute;
		// bottom: 0;
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