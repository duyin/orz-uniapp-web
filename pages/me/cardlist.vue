<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-21 16:33:38
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
	<view>
		<cu-custom class="custom-header" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">View All Cards</block>
		</cu-custom>
		<view class="custom-wrap">
		  <view v-for="item in list" class="custom-item">
            <view class="custom-header">
				<view class="custom-header-left"></view>
				<view class="custom-header-right">
					<view>{{ item.backName }}</view>
					<view>{{ item.title }}</view>
				</view>
			</view>
			<view class="custom-footer-item">
				<view class="custom-footer-left">
					<view>{{ item.balanceName }}</view>
					<view>{{ item.balanceMoney }}</view>
				</view>
				<view class="custom-footer-right">
					<view>{{ item.cardLimit }}</view>
					<view>{{ item.CardLimitMoney }}</view>
				</view>
			</view>
		  </view>
            
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list:[
				{
					backName:'**** **** 3035',
					title:'ORZ WORLD MASTERCARD',
					balanceName:'Card Balance',
					balanceMoney:'0.00 HKD',
					cardLimit:'Card Limit',
					CardLimitMoney:'0.00 HKD'
				},
				{
					backName:'**** **** 3036',
					title:'ORZ WORLD MASTERCARD',
					balanceName:'Card Balance',
					balanceMoney:'0.00 HKD',
					cardLimit:'Card Limit',
					CardLimitMoney:'0.00 HKD'
				},
				{
					backName:'**** **** 3037',
					title:'ORZ WORLD MASTERCARD',
					balanceName:'Card Balance',
					balanceMoney:'0.00 HKD',
					cardLimit:'Card Limit',
					CardLimitMoney:'0.00 HKD'
				},
				{
					backName:'**** **** 3038',
					title:'ORZ WORLD MASTERCARD',
					balanceName:'Card Balance',
					balanceMoney:'0.00 HKD',
					cardLimit:'Card Limit',
					CardLimitMoney:'0.00 HKD'
				}

			]
		}
	},
	onLoad() {
		
	},
	computed: {
	
	},
	methods: {
		visionHandle(){
			location.href="https://www.orzcash.com/#/clientkyc"
		}
	}
};
</script>

<style lang="scss" scoped>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}

/* #endif */

.custom{
    &-wrap{
        width: calc(100% - 24px);
        margin: 24px auto;
    }
    &-userImg{
        width: 100px;
        height: 100px;
        border:1px solid #ccc;
       font-size: 30px;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-header{
     display: flex;
	 border-bottom: 1px solid #ccc;
	 padding-bottom:8px;
	}
	&-item{
		border:1px solid #ccc;
		border-radius: 8px;
		padding: 16px;
		margin-top:16px;

	}
	&-header-left{
		width: 100px;
		height: 40px;
		background: red;;
		border-radius: 6px;
		margin-right:8px;
	}
	&-footer-item{
		display: flex;
		justify-content: space-between;
		margin-top:8px;
	}
}
.me-img{
		width: 30px;
		height: 30px;
		border: 1px solid #000;
		border-radius: 50%;
		display: flex;
        justify-content: center;
		margin-right:16px;
	}
.me{
		&-list-wrap{
			margin-top:40rpx;
			width: calc(100% - 24px);
			margin:0 auto;
		}
		&-list-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: left;
			height: 30px;
			border-bottom: 1px solid #ccc;
			padding-bottom: 16px;;
			margin-top:24px;
		}
		&-title{
			flex: 1;
		}
	}
</style>

<style lang="scss" scoped>
	
</style>

