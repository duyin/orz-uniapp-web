<!-- 蓝色简洁登录页面 -->
<template>
	<view class="home-wrap t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="home-header">
            <view class="home-leftward" @tap="backHandle">
				<u-icon name="arrow-leftward" color="#fff" class="home-leftwardImg"></u-icon>
			</view>
			<view class="home-title">{{ title }}</view>
		     <view class="home-mastercard">ORZ MasterCard</view>
			 <view class="card-img-box">
				<img :src="cardImg" alt="" class="cardImg">
			 </view>
		</view>
		<view class="home-main">
            <view class="home-card-title">
                <view class="home-card-text">金属卡用户将享受 xxxxx</view>
                <view class="home-card-text">卡费为 500U</view>
            </view>
            <view class="home-main-step">
                    <u-steps current="1"  inactiveColor="#000" activeColor="#000" class="home-step-box">
                        <u-steps-item title="KYC 审核" ></u-steps-item>
                        <u-steps-item title="开户确认" ></u-steps-item>
                        <u-steps-item title="邮寄卡片" ></u-steps-item>
                    </u-steps>
            </view>
            <view class="orz-btn" @click="RegisterHandle" >Ok</view>
		</view>
	
	</view>
</template>
<script>
import cardImg from '@/static/home/client-card.png'
import request from '@/common/request.js';
import Cookies from 'js-cookie'
import { mapState,mapActions } from "vuex";
export default {
	data() {
		return {
            current:0,
			cardImg,
			title: 'Applying for you',
           
			loginForm:{
				email:'',
				code:'',
				type:'apply'
			},
			
		};
	},
	computed: {
		...mapState('app',['token'])
	},
	methods: {
		...mapActions('app',['setToken']),
		async RegisterHandle(){
			// let opts = {
			// 	url: 'api/user/kycpass',
			// 	method: 'post',
			// };
			// const { data } = await request.httpTokenRequest(opts,{})
			// console.log(data,'data')
			uni.navigateTo({
					url:'../../pages/cardoverview/index'
				})
				
		}
	}
};
</script>
<style lang="scss" scoped>
.home-header{
	width: calc(100%);
	padding:0 25px;
	height:35%;
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
	padding-top: 24px;;
    text-align: center;
}
.home{
	&-wrap{
		position: relative;
		height: 100vh;
        // overflow: hidden;
		display: flex;
		flex-direction: column;
	}
	&-mastercard{
		font-size: 18px;
		font-weight: bold;
        color: #171717;
		// padding-top:30px;
        padding-bottom:30px;
        text-align: center;
	}
    &-leftwardImg{
		margin-top:24px;
		width: 51px;
		height: 32px;
		background: #1F1423;
		border-radius: 13px;
		line-height: 32px;
		text-align: center;
		// margin-left:25px;
		font-size: 14px;
		display: flex;
        color: #fff;
        justify-content: center;
	}
	&-main{
		width: calc(100%);
		padding:0 25px;
		height: inherit;
		 flex:1;
		//  position: absolute;
		// bottom: 0;
		background: rgba(255,255,255,0.21);
		box-shadow: 0px 0px 11px 0px rgba(121,170,218,0.15);
		border-radius: 40px 40px 0px 0px;
		border: 1px solid #FFFFFF;
		backdrop-filter: blur(10px);
       
	}
    &-card-title{
        padding-top:116px;
        padding-left:24px;
    }
    &-step-box{
        margin-top:91px;
        // flex-direction: column;
    }
    &-card-text::before{
        content: "\25CF"; /* Unicode 码点，表示一个实心圆 */
        color: #000; /* 圆心的颜色 */
        transform: scale(0.6);
        display: inline-block; /* 让圆心与文字在同一行 */
        vertical-align: middle; /* 让圆心垂直居中对齐 */
        margin-right: 0px; /* 圆心与文字的间距 */
    }
    &-main-step{
        // height: 300px;
        // background: #fff;
        // position: relative;
        margin-top:24px;
    //     position: relative;
    // left: -24px;
        ::v-deep{
            // .u-steps-item--column{
            //     padding-bottom: 100px!important;
            // }
            // .u-steps-item--column:last-child{
            //     padding-bottom: 8px!important;
            // }
            .u-steps-item__line--row{
                // height: 80px!important;;
                // top: 40px!important;;;
                width: 70px!important;;;
                left: 73px!important;;;
            }
            .u-steps-item__wrapper{
                background: transparent;
            }
            // .u-text__value--tips{
            //     color:#000!important;
            // }
            // .u-text__value--content{
            //     color:#000!important;
            // }
            // .u-steps--column{
              
            // }
            // .u-steps-item__line--column{
            //     height: 100%;
            // }
        }
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
	
}


.orz-btn{
    // padding: 8px 16px;
    text-align: center;
    margin: 40px auto;
	height: 44px;
	line-height: 44px;
    // border:1px solid #ccc;
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

</style>
<style>
  .u-steps-item__wrapper{
        /* background: transparent; */
       
    }
    .u-steps--column{
       
    }
    .u-steps-item__line--column{
        height: 100%;
    }
</style>