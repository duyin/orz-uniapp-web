<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-20 17:58:13
 * @FilePath: /orz-uniapp/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 首页 -->
<template>
	<view class="home-wrap">
			<cu-custom class="custom-header" :isBack="true">
				<block slot="backText">返回</block>
				<block slot="content">申请信用卡</block>
			</cu-custom>
			<view class="home-header">
				<view class="home-phone-box">
				</view>
			     <view>*交易規則與費率</view>
			</view>
		    <view>
				<view class="home-apply-credited" @click="stepApplyHandle">申请信用卡</view>
				<view class="home-apply-orz">联系ORZ</view>
			</view>
			<view class="home-apply-fluted">
		       申请流程
			</view>
			<view class="home-transfer-record">
				<view class="home-list">
					<view v-for="(item,index) in listCard" class="home-list-item">
                       <view class="home-list-step">{{ item.step }}</view>
					   <view>{{ item.title }}</view>
					   <view>{{ item.subTitle }}</view>
					</view>
				</view>
			</view>
		</view>
</template>

<script>
	import request from '@/common/request.js';
   
	export default {
		data() {
			return {
				listCard:[
					{
						step:1,
						title:'建立帳戶',
						subTitle:'提交/註冊手機號和郵箱，用於帳戶操作。'
					},
					{
						step:2,
						title:'KYC認證',
						subTitle:'提交一張有效護照或身份證、有效收卡地址。'
					},
					{
						step:3,
						title:'卡上展示姓名',
						subTitle:'提供您想要展示並印在信用卡的展示名稱。'
					},
					{
						step:4,
						title:'郵寄到手',
						subTitle:'提供收卡地址，您獨一無二的信用卡如期而至。'
					},
					
				]
			}
		},
		
		mounted() {
			
		},
		methods: {
			stepApplyHandle(){
				uni.navigateTo({
					url: '../me/creditStep'
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
			margin-bottom:150px;
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
		&-apply-fluted{
			padding-left:16px;
		}
		&-apply-credited{
			width: calc(100% - 28px);
			margin:16px auto;
			text-align: center;
			border-radius: 4px;
			background-color: rgba(37, 37, 38, 1);
			color: rgba(255, 255, 255, 1);
			padding:8px 16px;
		}
		&-apply-orz{
			width: calc(100% - 28px);
			margin:0px auto 16px;
			text-align: center;
			border-radius: 4px;
			background-color:  rgb(187, 182, 182);;
			color: rgb(23, 22, 22);
			padding:8px 16px;
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
		&-list{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&-list-step{
			width: 30px;
			height: 30px;
			display: flex;
			justify-content: center;
			border:1px solid #ccc;
			border-radius: 50%;
			margin:8px auto;
			align-items: center;
		}
		&-footer{
			text-align:center;
			width: calc(100% - 40px);
			margin:24px auto;
		}
	}
</style>
