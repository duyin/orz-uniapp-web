<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-17 11:25:37
 * @FilePath: /orz-uniapp/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 首页 -->
<template>
	<view class="home-wrap">
		<view v-if="curIndex==0">
			<view class="home-header">
			<view class="home-phone-box">
				<!-- <u-icon name="photo" class="me-img" /> -->
				<u-avatar :src="src" size="64" style="margin-right:8px;"></u-avatar>
				<text>Rhett Fang</text>
			</view>
			<view>
				<u-icon name="scan" class="me-scan" />
			</view>
			</view>
			<view class="home-main">
			<view class="home-account-single">
				<view class="home-content">
					<view class="home-account-img">
					<u-icon name="photo" class="me-img" />
				</view>
					<view>
						<view>个人卡账户</view>
						<view>适合与个人用户使用，只能创建一个卡账户，但可以申请多张卡，多张卡共享卡账户余额/额度。</view>
					</view>
				</view>
				<view class="home-single-btn">个人卡账户</view>
			</view>
			<view class="home-account-corporation">
				<view class="home-content">
					<view class="home-account-img">
					<u-icon name="photo" class="me-img" />
				</view>
					<view >
						<view>公司卡账户</view>
						<view>适合与公司用户开设工资卡和用户卡使用，可创建多个卡账户，方便发薪、报销、管理和查看记录。</view>
					</view>
				</view>
				<view class="home-orz-btn">联系ORZ</view>
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
		<applay-card v-if="curIndex==1"/>
	</view>
</template>

<script>
	import request from '@/common/request.js';
    import ApplayCard from './components/ApplayCard.vue';
	export default {
		data() {
			return {
				transferList:[],
				curIndex:1,
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
			}
		},
		components: {ApplayCard},
		mounted() {
			
		},
		methods: {
			
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
		&-transfer-content{
			text-align: center;
			margin-top:5vh
		}
		&-footer{
			text-align:center;
			width: calc(100% - 40px);
			margin:24px auto;
		}
	}
</style>
