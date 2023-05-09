<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-06 16:34:42
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
    <view class="capital-wrap">
        <u-popup v-model="visible" :show="visible"  :round="10" border-radius="30" mode="bottom" closeable @close="close" @open="open" >
            <view class="capital-box">
                <view>通知设定</view>
               
                <view class="notion-title">
                    <view>3-D 验证码通知方式:</view>
                    <view class="notion-code">什么是3-D验证码？</view>
                </view>
               <view class="notion-item">
                 <view>短信</view>
                 <view class="notion-switch">
                    <text class="notion-switch-text">{{ !msgValue?'开':'关' }}</text>
                    <u-switch v-model="msgValue" @change="msgChange"></u-switch>
                 </view>
               </view>
               <view class="notion-content">
                  大多数网络商家会要求客户在网上购物进行3-D安全验证，关闭3-D验证码通知可能会让您的交易无法顺利进程。
               </view>
               <view class="notion-title">
                    <view>通知</view>
                    <view class="notion-code-title">
                        <view class="notion-msg">短信</view>
                        <view class="notion-email">电子邮件</view>
                    </view>
                </view>
                <view class="notion-item">
                 <view>本地交易</view>
                 <view class="notion-switch">
                    <u-switch v-model="localSwitch.localMsgValue" @change="()=>msgChange('localMsgValue')" class="notion-localMsg"></u-switch>
                    <u-switch v-model="localSwitch.localEmailValue" @change="()=>msgChange('localEmailValue')"></u-switch>
                 </view>
               </view>
               <view class="notion-item">
                 <view>海外交易</view>
                 <view class="notion-switch">
                    <u-switch v-model="overseas.overMsgValue" @change="()=>msgChange('overMsgValue')" class="notion-localMsg"></u-switch>
                    <u-switch v-model="overseas.overEmailValue"  @change="()=>msgChange('overEmailValue')"></u-switch>
                 </view>
               </view>
               <view class="notion-item">
                 <view>ATM取款</view>
                 <view class="notion-switch">
                    <u-switch v-model="atmSwitch.atmMsgValue" @change="()=>msgChange('atmMsgValue')" class="notion-localMsg"></u-switch>
                    <u-switch v-model="atmSwitch.atmEmailValue" @change="()=>msgChange('atmEmailValue')"></u-switch>
                 </view>
               </view>
               <view class="notion-content notion-content-attention">
                  <view class="warning-box"><u-icon name="warning-fill"  class="warning-Fill" color="#e89d60" size="16"></u-icon>注意：</view>
                  交易通知可提高客户对未授权交易的警觉性。故此，我们强烈建议您将其启用，您如果无法及时呈报未授权交易，您将需承担所有相应费用。
               </view>
            <view class="btn-box">
               <view  class="orz-btn orz-btn-autoPay">取消</view>
               <view  class="orz-btn orz-btn-autoPay">套用</view>
            </view>
                <!-- <view class="orz-btn orz-btn-autoPay" @tap="autoPayment">
                    继续
                </view> -->
            </view>

        </u-popup>
    </view>
</template>

<script>
import request from '@/common/request.js';
export default {
    name:'Capital',
    props:{
        visible: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        visible: {
            handler(visible, old) {
                if(visible){
                    this.isCollapse = true;
                    console.log(visible,'visible')
                }
            },
            immediate: true,
            deep: true
        },
    },
//    components:{uCollapse},
	data() {
		return {
            value:'',
            msgValue:true,
            isCollapse:false,
            localSwitch:{
                localMsgValue:false,
                localEmailValue:false,
            },
            overseas:{
                overMsgValue:false,
                overEmailValue:false,
            },
            atmSwitch:{
                atmMsgValue:false,
                atmEmailValue:false,
            },
            coinRecharge:'',
            activeIndex:0,
            active:false,
            cardValue:0,
            cardList:[
               { value: 0, text: "设置ATM取款限额" },
				{ value: 1, text: "设置卡限额" },
            ],
           
        }
	},
    mounted() {
        console.log('80808')
    },
	methods: {
        open() {
          // console.log('open');
        },
        close() {
           this.$emit('closeExtractFn')
        },
        listHandle(event,key){
            console.log(event,'taget',event.currentTarget,key)
            const { index } = event.currentTarget.dataset;
            console.log(index,key)
            this.activeIndex = key;
           
           
        },
        autoPayment(){
            uni.$u.toast('soon coming!');
        },
        async confirmOk(){
            let opts = {
				url: 'api/user/transfer/create',
				method: 'post',
			};
            const params = {
                "amount": 10,
                "asset": "USD",
                "destinationUserId":"7e82d1dd-3438-48fd-80e9-26d8c51d56bc",
                "description":"",
                "xid":"test01",
            }
			const { data } = await request.httpTokenRequest(opts,params)
            console.log(data,'data')
           //  
        },
        msgChange(type){

        }
	}
};
</script>

<style lang="scss" scoped>
.warning-Fill{
    margin-right:5px;
}
.view-link{
    color: #f37b1d;
    text-align: right;
    text-decoration: underline;
    padding-top:8px;
}

.notion-title{
    display: flex;
    margin-top:24px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    padding-bottom:8px;
}
.notion-code{
    color:#4483AD
}
.warning-box{
    display: flex;
}
.notion-msg{
    margin-right:16px;
}
.notion-code-title{
    display: flex;
}
.notion-item{
    display: flex;
    justify-content: space-between;
    margin-top:16px;
    ::v-deep{
         .u-switch__node{
            background: #fff;
         }
    }
}
.title{
    margin-top:40px;
}
.notion-switch{
    display: flex;
    align-items: center;
}
.notion-switch-text{
    margin-right:8px;
    vertical-align: middle;
}
.notion-localMsg{
    margin-right:16px;
}
.capital{
    &-box{
        height: 400px;
        padding:12px;
        border-radius: 30px 30px 0px 0px;
      
    }
    &-title{
        font-weight: bold;
        padding-bottom: 8px;
    }
    
}
.orz-btn-autoPay{
   
    width: 100%;
}
.orz-btn-autoPay:first-child{
    margin-right:16px;
    background: #ccc;
    color:#000;
}
.autoPay-header{
    display: flex;
    justify-content: space-between;
    margin-top:40px;
}
.autoPay-item{
    display: flex;
    justify-content: space-between;
    margin:16px auto 30px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;;
}
.card-setLimits{
    margin-top:24px;
}
.notion-content{
    width: 100%;
    background: #ece6e6;
    margin-top:16px;
    border-radius: 6px;
    padding:8px 16px;
}
.btn-box{
    display: flex;
    margin-top:16px;
}
.autoPay-item-last{
    display: flex;
    justify-content: space-between;
    margin:16px auto;
  
}
.capital-wrap{
    ::v-deep{
        .u-slide-up-enter-active{
            height: 600px;;
        }
    }
}
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
    .notion-content-attention{
    background: #f1ccae;;
}
</style>


