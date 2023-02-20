<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-20 19:16:31
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
			<view class="home-header-step">
				<u-steps :current="currentIndex">
					<u-steps-item title="身份验证">
					</u-steps-item>
					<u-steps-item title="卡片选择"></u-steps-item>
					<u-steps-item title="账户手机验证"></u-steps-item>
					<u-steps-item title="卡信息"></u-steps-item>
					<u-steps-item title="完成"></u-steps-item>
				</u-steps>
			</view>
		    <view v-if="currentIndex==0" class="home-main">
                <view>身份证件</view>
				<view>選擇您的身份證類型：</view>
				<u-tabs :list="list" 
      :is-scroll="false" bar-width="50" active-color="orange"  :current="count" @change="clickHandle" class="conversion-tabs-list"></u-tabs>
	            <view v-if="count==1">
					<view>上傳三張清晰的身份證照片(正面、背面和手持身份證照片)</view>
					<view class="home-upload-wrap">
						<view class="home-upload-item">
							<view>身份证正面</view>
							<u-upload
								:fileList="fileList1"
								name="1"
								multiple
								:maxCount="10"
							></u-upload>
						</view>
						<view class="home-upload-item">
							<view>身份证反面</view>
							<u-upload
								:fileList="fileList1"
								name="1"
								multiple
								:maxCount="10"
							></u-upload>
						</view>
						<view class="home-upload-item">
							<view>手持证件照片</view>
							<u-upload
								:fileList="fileList1"
								name="1"
								multiple
								:maxCount="10"
							></u-upload>
						</view>
					</view>
					<view>
						<view>收卡地址</view>
						<view>請認真填寫最近居住的有效地址，便於收取信用卡。</view>
						<u--input
						placeholder="國家地區"
						border="surround"
						v-model="value"
						class="home-input-item"
					></u--input>
					<u--input
						placeholder="郵政編碼"
						border="surround"
						v-model="value"
						class="home-input-item"
					></u--input>
					<u--input
						placeholder="詳細地址"
						border="surround"
						v-model="value"
						class="home-input-item"
					></u--input>
					</view>
				</view>
				<view v-if="count==2" class="home-main">
					<view>護照</view>
					<view>上傳護照的清晰照片。</view>
					<view class="home-upload-wrap">
						<view class="home-upload-item">
							<view>護照照片</view>
							<u-upload
								:fileList="fileList1"
								name="1"
								multiple
								:maxCount="10"
							></u-upload>
						</view>
						
					</view>
				</view>
			</view> 
			<view v-if="currentIndex==1" class="home-main">
              <view>ORZ提供的卡</view>
			  <view>使用聯名信用卡，可以享受以下福利和特權</view>
			  <view class="home-step-two-footer">
				<view>溫馨提示：</view>
				<view>1、了解完整使用規則和費率，請參考交易規則與費率。</view>
				<view>2、了解完整的福利詳情，請參考卡福利頁面。</view>
			  </view>
			</view>
			<view class="home-next-wrap" @click="nextHandle">下一步</view>
		</view>
</template>

<script>
	import request from '@/common/request.js';
   
	export default {
		data() {
			return {
				currentIndex:0,
				count:1,
				fileList1:[],
				value:'',
				list:[
					{name:'香港身份證(HKSAR)'},
					{name:'居民身份證(中國)'},
					{name:'護照'}
				],
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
				
			},
			clickHandle(item){
				const {index } = item
  				this.count = index
			},
			nextHandle(){
				if(this.currentIndex==5){
					this.currentIndex = 5
				}
				this.currentIndex = this.currentIndex+1
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
		&-header-step{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 24px;
		    ::v-deep{
				.u-steps-item__wrapper{
					background:#f2f5f9 ;
				}
			}
		}
        &-main{
            padding:24px;
        }
		&-upload-wrap{
			::v-deep{
				.u-upload__button{
					background: #fff;
				}
			}
		}
		&-upload-item{
			margin:24px auto
		}
		&-input-item{
			margin-top:16px;
		}
		&-next-wrap{
			border-radius: 4px;
			background-color: rgba(0, 0, 0,1);
			color: rgba(255, 255, 255, 1);
			padding:8px 16px;
			 width: 180px;
			
			margin: 40px auto;
			text-align: center;
		}
		&-step-two-footer{
			margin-top:150px;
		}
	
	}
</style>
