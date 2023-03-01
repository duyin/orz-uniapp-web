<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-22 10:55:59
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
			<view v-if="currentIndex==2" class="home-main">
              <view>手机号码验证</view>
			  <view>输入您的手机号码，点击“发送验证码“以通过短信接收。</view>
			  <view>
				<view
					class="u-demo-block__content"
					style="margin-top: 15px;"
				>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u--input placeholder="手机号码">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input placeholder="手机号码">
					<!-- #endif -->
						<template slot="suffix">
							<u-code
								ref="uCode"
								@change="codeChange"
								seconds="20"
								changeText="X秒重新获取"
							></u-code>
							<u-button
								@tap="getCode"
								:text="tips"
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
			  </view>
			  <view class="home-step-three-footer">
				<view>输入发送到您手机号码的授权码。</view>
				<u-code-input v-model="codeValue"></u-code-input>
			  </view>
			</view>
			<view v-if="currentIndex==3" class="home-main">
              <view>您申请流程接近完成！</view>
			  <view>输入持卡人希望出现在卡上的姓名和他/她的手机号码（用于安全验证）。</view>
			  <view>
				<view>卡上名称：</view>
				<view>
					<u--input
						placeholder="Tom"
						border="surround"
						v-model="value"
						class="home-input-item"
					></u--input>
				</view>
				<view>手机号码：</view>
				<view>
					<u--input
						placeholder="Tom"
						border="surround"
						v-model="value"
						class="home-input-item"
					></u--input>
				</view>
				<view>交付方式：</view>
				<uni-data-select
				    class="conversion-uni-select-box"
					v-model="payValue"
					:localdata="payList"
					
					></uni-data-select>
			  </view>
			  <view class="home-step-four-footer">
				<u-checkbox
					:customStyle="{marginBottom: '8px'}"
				
				>
				
				</u-checkbox>
				<text>选中同意框，并确认您已完全阅读、理解、接受并同意本协议的条款和条件ORZ万事达信用卡持卡人协议。</text>
			  </view>
			</view>
			<view  v-if="currentIndex==4" class="home-main">
				<view class="home-step-header">
					<u-icon name="checkbox-mark" class="me-img"></u-icon>
					<view class="home-step-subtitle">恭喜，您已申请完成！等待审核。</view>
					<view class="home-step-content">一旦您的ORZ信用卡申请获得批准，您将在交付时收到我们的短信通知。如果您有任何疑问或顾虑，请随时通过电话或邮箱您的客户经理或ORZ官方联系。</view>
					<view class="home-apply-addition">申请附加卡</view>
				</view>
			</view>
			<view class="home-next-wrap"  @click="nextHandle">{{currentIndex==4?'返回首页':'下一步'}}</view>
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
				codeValue:'',
				tips: '',
				tipValue: '',
				payValue:'',
				payList:[
				{ value: 0, text: "到我的账户地址" },
				{ value: 1, text: "到我的账户地址1" },
				{ value: 2, text: "到我的账户地址12" },
				],
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
				
				
				if(this.currentIndex==4){
					this.currentIndex = 4
				}else{
					this.currentIndex = this.currentIndex+1
				}
			},
			codeChange(text) {
				this.tips = text;
			},
		getCode() {
			if (this.$refs.uCode.canGetCode) {
			// 模拟向后端请求验证码
			uni.showLoading({
				title: '正在获取验证码'
			})
			setTimeout(() => {
				uni.hideLoading();
				// 这里此提示会被this.start()方法中的提示覆盖
				uni.$u.toast('验证码已发送');
				// 通知验证码组件内部开始倒计时
				this.$refs.uCode.start();
			}, 2000);
			} else {
			uni.$u.toast('倒计时结束后再发送');
			}
		},
		change(e) {
			console.log('change', e);
		}
		},
	};
</script>
<style lang="scss" scoped>
	.me-img{
		width: 50px;
		height: 50px;
		border: 1px solid #000;
		border-radius: 50%;
		display: flex;
        justify-content: center;
		align-items: center;
		margin: 0 auto;
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
		&-step-header{
			text-align: center;
		}
		&-step-subtitle{
			font-weight: bold;
			margin-top:10px;
		}
		&-step-content{
			margin-top: 40px;;
		}
		&-apply-addition{
			padding:10px 24px;
			border:1px solid #ccc;
			border-radius: 20px;
			width: 140px;;
			margin: 40px auto 0;
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
		&-step-three-footer{
			margin-top:50px;
		}
		&-step-four-footer{
			display: flex;
		}
	
	}
</style>
