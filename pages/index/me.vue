<!-- 个人中心 -->
<template>
	<view class="components-theme">
	 <view class="me-header"  @click="userHandle">
		<view class="me-header-info">
			<!-- <u-icon name="account-fill" class="me-img"></u-icon> -->
			<u-avatar :src="src" size="32" style="margin-right:8px;"></u-avatar>
			<view class="me-header-text">
               <view>{{ userInfo.name }}</view>
			   <view>{{ userInfo.email }}</view>
			</view>
		</view>
		<view>
			<u-icon name="arrow-right"></u-icon>
		</view>
	 </view>
	 <view class="me-list-wrap">
		<view class="me-list-item" @tap="authKycHandle">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">认证信息</view>
			<view class="me-auth-wrap">
				<text>未认证</text>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="me-list-item">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">账户管理</view>
			<view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="me-list-item" @click="securityHandle">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">安全设置</view>
			<view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="me-list-item">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">邀请分享</view>
			<view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="me-list-item">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">语言设置</view>
			<view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="me-list-item">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">指纹/面容登录</view>
			<view >
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="me-list-item"  @click="aboutHandle">
			<u-icon name="photo" class="me-img"></u-icon><view class="me-title">关于ORZ</view>
			<view>
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
     <view style="height: 110rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
 	import { mapState } from "vuex";
	export default {
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg',
				userList:[
					{
						name:'认证信息',
					}
				]
			}
		},
		watch:{
			topBackGroupImageIndex(val) {
				console.log(val)
				
			}
		},
		computed: {
			...mapState('app',['userInfo'])
		},
		mounted() {
			
		},
		methods: {
			aboutHandle(){
				console.log('9999090')
				uni.navigateTo({
					url: '../me/aboutOrz'
				})
			},
			userHandle(){
				uni.navigateTo({
					url: '../me/aboutMe'
				})
			},
			authKycHandle(){
				// location.href="http://localhost:9527/#/clientkyc?form=duyin"
				uni.navigateTo({
					url: '../me/personkyc'
				})
			},
			securityHandle(){
				uni.navigateTo({
					url: '../me/security'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.me-header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: calc(100% - 24px);
		margin:0 auto;
		padding:24px;
	}
	.me-header-info{
		display: flex;
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
	.me-header-text{
		margin-left:8px;
	}
	.me{
		&-list-wrap{
			margin-top:40rpx;
			width: calc(100% - 24px);
			margin:0 auto;
		}
		&-auth-wrap{
			display: flex;
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
