<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-21 16:30:37
 * @FilePath: /orz-uniapp/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 首页 -->
<template>
	<view class="home-wrap">
		
			<view class="home-header">
			<view class="home-phone-box">
				<!-- <u-icon name="photo" class="me-img" /> -->
				<u-avatar :src="src" size="32" style="margin-right:8px;"></u-avatar>
				<text>Rhett Fang</text>
			</view>
			<view>
				<u-icon name="scan" class="me-scan" />
			</view>
			</view>
			<view class="home-main">
		       <view class="home-main-title">Card Account</view>
               <view class="home-main-title">Tom Card Treasury</view>
               <view class="home-main-title">0.00 HKD</view>
               <view class="home-card-box">
                <view class="home-card-box-item"  @click="viewHandle">查看所有卡片</view>
                <view class="home-card-box-item" @click="applyHandle">申请卡片</view>
               </view>
               <view class="home-created">
                <view>加密資產信用卡</view>
                <view>多種金融解決方案</view>
                <view class="home-apply-btn">立即申請</view>
               </view>
			</view>
			<view class="home-transfer-record">
				<view class="home-transfer-title">交易记录</view>
				<view v-if="!transferList.length" class="home-transfer-content">
				暂无交易记录
				</view>
			</view>
			<view class="home-footer">
				<view>ORZ Tech</view>
				<view>ORZCash获万事达香港发卡机构KSV银行合作，牌照方发卡</view>
			</view>
			<view style="height: 140rpx;width: 1rpx;"></view>
		</view>
	
	
</template>

<script>
   
	export default {
		data() {
			return {
				transferList:[],
				curIndex:1,
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
			}
		},
		
		mounted() {
			
		},
		methods: {
			applyHandle(){
                uni.navigateTo({
					url: '../me/applyCreditCard'
				})
            },
            viewHandle(){
                uni.navigateTo({
					url: '../me/cardlist'
				})
            }
		},
	};
</script>
<style lang="scss" scoped>
	.me-img{
		width: 30px;
		height: 30px;
		border: 1px solid #000;
		border-radius: 50%;
		display: flex;
        justify-content: center;
		margin-right:16px;
	}
	.me-scan{
		font-size: 20px;
	}
	.home{
		&-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24px;
		}
		&-phone-box{
			display: flex;
			align-items: center;
		}
        &-main{
            padding:24px;
        }
		&-account-single,&-account-corporation{
			border:1px solid #ccc;
			padding: 24px;;
			width: calc(100% - 24px);
			margin:0 auto;
			border-radius: 8px;
			margin-bottom:24px;
		}
		&-content{
			display: flex;
			align-items: center;
		}
		&-account-img{
			// font-size: 24px;
			margin-right:8px;
			border-radius: 50%;
			height: 50px;
			width: 50px;

			
		}
        &-card-box-item{
            border:1px solid #ccc;
            padding:5px 16px;
            border-radius: 6px;
            margin-right:16px;
            margin-top:12px;
            font-size: 12px;;

        }
        &-transfer-title{
            font-weight: bold;
            padding-left:12px;
        }
		&-single-btn,&-orz-btn{
			text-align: center;
			width: 104px;
			height: 30px;
			line-height: 30px;
			border-radius: 4px;
			background-color: rgba(4, 4, 4, 1);
			color: rgba(255, 255, 255, 1);
			margin: 8px auto 0;	
		}
		&-transfer-record{
			margin-top:24px;
			width: calc(100% - 24px);
			margin:0 auto;
		}
        &-card-box{
            display: flex;
        }
		&-transfer-content{
			text-align: center;
			margin-top:5vh
		}
        &-created{
            margin-top:10px;
            border:1px solid #ccc;
            border-radius: 6px;
            padding:24px;
        }
        &-apply-btn{
            color:#205E86;
        }
		&-footer{
			text-align:center;
			width: calc(100% - 40px);
			margin:24px auto;
		}
	}
</style>
