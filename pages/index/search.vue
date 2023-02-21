<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-21 18:06:28
 * @FilePath: /orz-uniapp/pages/index/search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="account-home">
      <view class="account-header">
        资金账户
	  </view>
	  <view class="account-title">Tom Inc Treasury</view>
	  <view class="account-list">
        <view class="account-list-item">
			<u-icon name="photo" class="me-img" />
			<view @click="rechargeHandle">
				充值
			</view>
		</view>
		<view class="account-list-item" @click="extractHandle">
			<u-icon name="photo" class="me-img" />
			<view>提取</view>
		</view>
		<view class="account-list-item">
			<u-icon name="photo" class="me-img" />
			<view>兑换</view>
		</view>
		<view class="account-list-item"  @click="transferHandle" >
			<u-icon name="photo" class="me-img" />
			<view>转移</view>
		</view>
		<view class="account-list-item" @click="accountHandle">
			<u-icon name="photo" class="me-img" />
			<view>账单</view>
		</view>
	  </view>
	  <view class="account-main">
		<view class="account-main-title">法币账户 <text class="account-main-subtitle">账户号码: 002-011-5224818-001</text></view>
		<view>
			<view class="account-main-content"  @click="detailHandle">
				<view class="account-main-item">
					<u-icon name="photo" class="me-img" />
					<view class="account-main-text">
						<view>
							USD
						</view>
						<view>USA Dollar</view>
					</view>
				</view>
				<view>
					<text>
						0.00
					</text>
					<view>
						0.00 HKD
					</view>
				</view>
			</view>
			<view class="account-main-content">
				<view class="account-main-item">
					<u-icon name="photo" class="me-img" />
					<view class="account-main-text">
						<view>
							HKD
						</view>
						<view>Hong Kong Dollar</view>
					</view>
				</view>
				<view>
					<text>
						0.00
					</text>
					<view>
						0.00 HKD
					</view>
				</view>
			</view>
		</view>
	  </view>
	  <view class="account-main">
		<view class="account-main-title">数字资产 <text class="account-main-subtitle">账户号码: 002-011-5224818-004</text></view>
		<view>
			<view class="account-main-content">
				<view class="account-main-item">
					<u-icon name="photo" class="me-img" />
					<view class="account-main-text">
						<view>
							USDT
						</view>
						<view>Tether</view>
					</view>
				</view>
				<view>
					<text>
						0.00
					</text>
					<view>
						0.00 HKD
					</view>
				</view>
			</view>
			<view class="account-main-content">
				<view class="account-main-item">
					<u-icon name="photo" class="me-img" />
					<view class="account-main-text">
						<view>
							USDC
						</view>
						<view>USD Coin</view>
					</view>
				</view>
				<view>
					<text>
						0.00
					</text>
					<view>
						0.00 HKD
					</view>
				</view>
			</view>
		</view>
	  </view>
	
	  <view style="height: 120rpx;width: 1rpx;"></view>
	  <capital :show="isCapital" @closeFn="closeFn"/>
	  <extract :visible="isExtract" @closeExtractFn="closeExtractFn"/>
	  <transfer :visible="isTransfer" @closeExtractFn="closeExtractFn"/>
	  
	</view>
</template>

<script>
import capital from '../capital/capital'
import extract from '../capital/extract'
import transfer from '../capital/transfer'
	export default {
		data() {
			return {
				isCapital:false,
				isExtract:false,
				isTransfer:false
			}
		},
		components: { capital,extract,transfer},
		mounted() {

		},
		methods: {
			rechargeHandle(){
				console.log('999')
               this.isCapital = true;
			},
			extractHandle(){
				this.isExtract = true;
			},
			open() {
				// console.log('open');
			},
			closeFn() {
				this.isCapital = false
			},
			closeExtractFn(){
				this.isExtract = false
				this.isTransfer = false
			},
			transferHandle(){
				this.isTransfer = true
			},
			accountHandle(){
				uni.navigateTo({
					url: '../capital/accountbill'
				})
			},
			detailHandle(){
				uni.navigateTo({
					url: '../me/assetsDetail'
				})
                
			}
		}
	}
</script>

<style lang="scss" scoped>
.account{
	&-home{
		width: calc(100% - 24px);
		margin:0 auto;
	}
	&-header{
		padding:16px 0;
       font-weight: bold;
	   font-size: 20px;
	}
	&-title{
		padding-bottom:16px;
		font-weight: bold;
	   font-size: 20px;
	}
	&-list{
		display: flex;
		justify-content: space-around;
		align-items: center;

	}
	&-list-item{
		text-align: center;
		cursor: pointer;
	}
	&-main{
		margin-top:24px;
	}
	&-main-title{
		font-weight: bold;
		margin-bottom:16px;
	}
	&-main-subtitle{
		padding-left:30px;
		font-weight: normal;
	}
	/** account-main **/
	&-main-content{
		display: flex;
		justify-content: space-between;
		align-items: center;
		border:1px solid  #ccc;
		padding:16px;
		border-radius: 8px;
		margin-bottom: 16px;
	}
	&-main-item{
		display: flex;
	}
}
.me-img{
		font-size: 24px;
		margin-right:8px;
		
	}
</style>
