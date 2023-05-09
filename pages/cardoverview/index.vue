<!-- 蓝色简洁登录页面 -->
<template>
	<view class="home-wrap t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="home-header">
			<view class="home-title">{{ title }}</view>
            <view class="crad-underreview" v-if="status==2">
                <img :src="underreview" alt="">
                <view class="pleasewait">
                    <view>待审核</view>
                    <view>Please wait</view>
                </view>
            </view>
            <view class="crad-underreview" v-if="status==4">
                <img :src="turndown" alt="">
                <view class="pleasewait">
                    <view>很抱歉..</view>
                    <view>Sorry…</view>
                </view>
            </view>
		     <!-- <view class="home-mastercard">Mastercard</view> -->
			 <view class="card-img-box" v-if="status==3">
                <view class="card-header-list">
                    <view class="card-header-list-left">
                        <view class="card-header-list-leftImg">
                            <img src="https://cdn.uviewui.com/uview/album/1.jpg" />
                        </view>
                        <view>
                            <view>{{ userName +'****'+cardInfo.cardNumber.slice(-4) }}</view>
                             <view>ORZ Mastercard</view>
                        </view>
                       
                    </view>
                    <view class="card-header-list-right" @click="()=>handle('0')"></view>
                </view>
                <view class="card-money-text">0.00 USD</view>
				<img :src="cardImg" alt="" class="cardImg">
			 </view>
		</view>
		<view class="home-main">
			<view class="card-system-info">
                <view class="card-system-info-title">
					{{ !isText?'**** **** **** '+cardInfo.cardNumber.slice(-4):cardInfo.cardNumber }}
					<u-icon name="eye-off" @click="()=>handleEye(true)" v-if="!isText" size="18" color="#1b1b1b"></u-icon>
                    <u-icon name="eye-fill" @click="()=>handleEye(false)"  v-if="isText" color="#1b1b1b"></u-icon>
				</view>
				<view>{{ userName }}</view>
			</view>
			<view class="card-list-wrap">
                <view v-for="item in cardList" class="card-list" @click="()=>handle(item.id)">
                   <view class="card-item-list">
                    <img :src="item.img" />
                   </view>
                   {{ item.name }}
                </view>
            </view>
            <view class="card-money-warp">
               <view class="card-money-title">
				<view  class="card-money-over">卡账户余额（USD）</view>
                <!-- <view class="auto-asset" @tap="autoPayHandle">自动还款启用</view> -->
				<!-- <view class="auto-asset">自动还款启用</view> -->
			   </view>
               <view class="card-hkd">{{ addressBalanceInfo.addressBalance }} USD</view>
               <!-- <view class="card-usd">≈ {{ addressBalanceInfo.addressBalance }}  USDT</view> -->
               <!-- <u-slider v-model="value" class="slide-box"></u-slider> -->
			   <!-- <u-line-progress :percentage="value" activeColor="#0081ff" class="slide-box"></u-line-progress> -->
               <view class="card-box">
                <view>本月累计消费额</view>
                <view>3，000.00 USD</view>
               </view>
			   <view class="card-box">
                <view>每日现金提现金额</view>
                <view>30，000.00 USD</view>
               </view>
			   <view class="card-box">
                <view>每日消费限制</view>
                <view>100，000.00 USD</view>
               </view>
               <!-- <view class="card-assets">查看资产价比<u-icon name="arrow-rightward" class="arrow-box"></u-icon></view> -->
            </view>
            <!-- <view class="card-money-warp">
               <view class="title">本月支出</view>
               <view class="card-hkd card-seconed">0.00 USD</view>
           
               <view class="card-box card-box-seconed">
                <view>每日现金提现限额</view>
                <view>30，000  USD</view>
               </view>
               <view class="card-box">
                <view>每日消费限额</view>
                <view>30，000 USD</view>
               </view>
            </view> -->
			<view class="footer">
				<view class="footer-header">
					<view>交易记录</view>
					<view>
						<uni-data-select
							class="client-phoneAreaList1"
							v-model="statusValue"
							:localdata="statusList"
							@change="changeHandle"
							:clear="false"
						/>
					</view>
				</view>
				<view>
					<view v-for="item in list" class="footer-list">
					 <view class="footer-left">
						<view class="footer-left-txHash">{{item.txHash.slice(0,4)+'****'+item.txHash.slice(-4)}}</view>
						<view>{{ userWalletAddressShInfo ==item.destinationAddress?'转入':'转出'}}</view>
					 </view>
					  <view>{{ Number(item.txAmount).toFixed(4) +(" "+item.coinKey) }}</view>
					</view>
				</view>
				
			</view>
		</view>
		<autoPay :visible="isAutoPay" v-if="isAutoPay" @closeExtractFn="closeFn"/>
		<setlimits  :visible="isSetLimits"  v-if="isSetLimits" @closeExtractFn="closeFn"/>
		<changecard :visible="isChangeCrad"  v-if="isChangeCrad"  @closeExtractFn="closeFn" />
		<pinPassword :visible="isPinPassword"  v-if="isPinPassword" @closeExtractFn="closeFn" />
		<notion :visible="isNotion"  v-if="isNotion" @closeExtractFn="closeFn" />
		<regular  :visible='isRegular'  v-if="isRegular"  @closeExtractFn="closeFn"/>
		<u-modal :show="showIssue" confirmText="激活/卡列表" cancelText="取消" showCancelButton @confirm="confirmActive" @cancel="cancelActive">
			<view class="slot-content">
				是否跳转卡片列表页进行激活？
				<!-- <u--form
					labelPosition="left"
					:model="issueForm"
					ref="form"
				
					labelWidth="80px"
			>
				<u-form-item prop="cvc" label="CVC">
					<u--input v-model="issueForm.cvc" placeholder=""></u--input>
				</u-form-item>
			
			</u--form> -->
			</view>
		</u-modal>
	</view>
</template>
<script>
import cardImg from '@/static/home/cardoverview.png'
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
import autoPay from '@/pages/autoPay'
import setlimits from '@/pages/setlimits'
import changecard from '@/pages/changecard'
import pinPassword from '@/pages/pinPassword'
import notion from '@/pages/notion'
import regular from '@/pages/regular'
export default {
	data() {
		return {
            current:0,
			cardImg,
            underreview,
            turndown,
            isCard:false,
			title: 'Card',
			isText:false,
            value:30,
            status:0,
			isAutoPay:false,
			isSetLimits:false,
			isChangeCrad:false,
			isPinPassword:false,
			isNotion:false,
			isRegular:false,
			statusValue:'',
			showIssue:false,
			copyList:[],
			cardInfo:{
				cardNumber:''
			},
			issueForm:{
				cardSuffix:'',
				cvc:''
			},
			addressBalanceInfo:{},
		    statusList:[
			    {  
				   text:'全部',
				    value:'all'
				},
				{  
				   text:'处理中',
				  value:'padding'
				},
				{  
				   text:'成功',
				    value:'success'
				},
				{  
				   text:'取消',
				    value:'cancel'
				}
			],
			list:[],
            userInfo:{
                status:0
            },
			userWalletAddressShInfo:'',
			userName:'',
			cardListArr:[],
			cardList:[
                {name:'充值',img:insetOutlined,id:'0'},
                {name:'锁卡限额',img:lockOutlined,id:'1'},
                {name:'定期存款',img:slidersOutlined,id:'2'},
                {name:'通知设定',img:bellOutlined,id:'3'},
                {name:'ATM密码',img:editOutlined,id:'4'},
                {name:'更换卡',img:blockOutlined,id:'5'}
            ]
			
		};
	},
	components:{
		autoPay,
		setlimits,
		changecard,
		pinPassword,
		notion,
		regular
	},
	computed: {
		...mapState('app',['token'])
	},
	mounted() {
		console.log('888888')
		this.getTranslation()
		this.getUserInfo()
		this.addCoin()
		this.getBalance();
		// this.getCoinBalanceList()
		this.getUserInfoName();
		this.getList()
	},
   
	methods: {
		...mapActions('app',['setToken']),
		
		async getUserInfo(){
			const opt = {
				url: 'api/user/kycstatus',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt)
		    console.log(data)
			this.userInfo = data.result
			this.status = data.result.status
			if(this.status==3){
				
				// this.getCardIssue()
				let opts = {
					url: 'api/user/kycpass',
					method: 'post',
				};
				const  data1 = await request.httpTokenRequest(opts,{})
				const issueCard = localStorage.getItem('issue')
			    console.log(issueCard,'issueCard')
				  if(!this.cardListArr.length){
					this.getCardIssue()
				  }
			}
		},
		handleEye(type){
          this.isText = type

        },
		async getList(){
			let opts = {
				url: 'api/user/card/get',
				method: 'get',
			};
			const { data } = await request.httpTokenRequest(opts)
            console.log(data.result,'data get',data.code)
			if(data.code!==200){
				return;
			}
		  
			this.cardInfo = data.result[0]
			this.cardListArr = data.result
			const isActive = this.cardListArr.every(item=>item.status!=='pending-activation');
			console.log(isActive,'isActive')
			if(!isActive){
				this.showIssue = true
			}
		},
		async getUserInfoName(){
			const opts = {
				url: 'api/user/info ',
				method: 'post',
			}
			const { data } = await request.httpTokenRequest(opts)
			console.log(data.result,'data')
			if(data.code!==200){
				uni.showToast({ title: data.msg, icon: 'none' });
				return;
			}
			this.userName = data.result.name||'--'
			this.userWalletAddressShInfo = data.result.userWalletAddressSh
			
		},
		cancelActive(){
          this.showIssue = false
		},
		changeHandle(type){
         console.log(type,'val===>')
		 
		 if(type=='success'){
			this.list = this.copyList.filter(item=>item.transactionSubStatus=='CONFIRMED') 
		 }else if(type=='padding'){
			this.list = this.copyList.filter(item=>item.transactionSubStatus!=='CONFIRMED') 
			
		 }else{
			this.list = this.copyList
		 }

		},
		handle(id){
         if(id=='0'){
			uni.navigateTo({
				url: '../../pages/injectpay/index'
			})
		 }
		
		 if(id=='1'){
			this.isSetLimits = true;
		 }
		 if(id=='4'){
			this.isPinPassword = true;
		 }
		 if(id=='2'){
			this.isRegular = true
		 }
		 if(id=='3'){
			this.isNotion = true;
		 }
		 if(id=='5'){
			this.isChangeCrad = true;
		 }
		},
		autoPayHandle(){
			this.isAutoPay = true;
		},
		async getCardIssue(){
			let opts = {
				url: 'api/user/card/issue',
				method: 'post',
			};
				const params = {
				"type": "virtual",
				"productId": "600",
				"embossedName":"OrzCash",
				"cardSuffix":this.issueForm.cardSuffix,   //这个参数暂时保持未空，有值会发卡不成功
				"xid":"",
				"cardaccountid":'',
				}
			const { data } = await request.httpTokenRequest(opts,params)
			console.log(data,'data')
			this.getList()
		},
	
		async confirmActive(){
			const issueCard = localStorage.getItem('issue')
			console.log(issueCard,'issueCard')
		
			if(+issueCard==1){
				uni.navigateTo({
					url: '../me/cardlist'
				})
			}else{
				this.getCardIssue()
			}
		},
		closeFn(){
           this.isAutoPay = false
		   this.isSetLimits = false;
		   this.isChangeCrad = false;
		   this.isPinPassword = false
		   this.isNotion = false;
		   this.isRegular = false;
		},
		async addCoin(){
			let opts = {
				url: 'api/user/coinadd',
				method: 'post',
			};
			const { data } = await request.httpTokenRequest(opts,{ "coinKey" :["USDC_ERC20", "USDT_ERC20", "ETH_GOERLI"] })
			console.log(data,'data',data.result)
			
			
		},
		async getTranslation(){
			const opt = {
				url: 'api/user/coinTransactionList',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt,{})
			if(data.code!==200){
				return;
			}
			this.list = data.result
			this.copyList = JSON.parse(JSON.stringify(data.result))
		},
		async getBalance(){
			const opt = {
				url: 'api/user/coinBalance',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt,{coinKey:'ETH_GOERLI'})
		    console.log(data)
			this.addressBalanceInfo=data.result
		},
		async getCoinBalanceList(){
			//api/user/coinBalanceList
			const opt = {
				url: 'api/user/coinBalanceList',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt)
		    console.log(data)
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
.card-money-over{
	text-align: center;
	margin:0 auto;
}
.card-system-info-title{
	display: flex;
	justify-content: center;
	align-items: end;
}
.card-system-info{
	text-align: center;
	margin-top:24px;
}
.client-phoneAreaList1{
	width: 150px;
}
.footer-left-txHash{
	width: 100%;
	overflow: scroll;
}
.footer{
	margin:24px auto 100px;
}
.footer-left{
	width: 150px;
}
.footer-list{
	display: flex;
	margin-top:24px;
	// align-items: center;
	justify-content: space-between;
}
.footer-header{
	display: flex;
	margin-top:24px;
	justify-content: space-between;
	align-items: center;
}
.auto-asset{
	color:#5677fc;
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
	margin:16px auto;
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
	margin-top:12px;
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
	background: url('../../static/home/qrcode-icon.png') no-repeat;
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
	text-align: center;
}
.home-header{
	width: calc(100%);
	padding:0 25px;
	height: 40%;
	background: url('../../static/home/uni-header.png') no-repeat;
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
	padding-top: 68rpx;;
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
.card-money-title{
	margin-top:8px;
	margin-bottom:8px;
	display: flex;
	justify-content: space-between;
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