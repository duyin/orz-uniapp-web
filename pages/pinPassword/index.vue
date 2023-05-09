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
                <view>更改ATM PIN密码</view>
               
                <view class="title">输入新的6位ATM PIN密码</view>
               <view class="pin-box">
                <view>输入ATM PIN码</view>
                <view class="show-pin">
                    <view class="show-pin-text">显示PIN码</view> 
                    <u-icon name="eye-off" @click="()=>handleEye(true)" v-if="!isText" size="18"></u-icon>
                    <u-icon name="eye-fill" @click="()=>handleEye(false)"  v-if="isText" ></u-icon>
                </view>
               </view>
               <u-code-input v-model="pinPass" mode="box" :dot="isDot"></u-code-input>
               <view class="title-review">重新输入ATM PIN密码</view>
               <u-code-input v-model="newPinPass" mode="box" ></u-code-input>
            <view class="check-text">
                <view class="item-check"><u-icon name="checkmark-circle-fill"  size="16"></u-icon>无3个或3个以上连续重复号码</view>
                <view class="item-check"><u-icon name="checkmark-circle-fill"  size="16"></u-icon>输入的PIN码都匹配</view>
            </view>
            <view class="btn-box">
               <view  class="orz-btn orz-btn-autoPay">返回</view>
               <view  class="orz-btn orz-btn-autoPay" @tap="submitHandle">继续</view>
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
            pinPass:'',
            newPinPass:'',
            isCollapse:false,
            isDot:true,
            coinRecharge:'',
            activeIndex:0,
            active:false,
            isText:false,
            cardValue:0,
            cardId:'',
            cardList:[
               { value: 0, text: "设置ATM取款限额" },
				{ value: 1, text: "设置卡限额" },
            ],
           
        }
	},
    mounted() {
        console.log('80808')
        this.getCard()
        const res = /^(?!.*(\d)(?:\D*\1){2})\d+$/
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
        async getCard(){
            let opts = {
                url: 'api/user/card/get',
                method: 'get',
            };
            const { data } = await request.httpTokenRequest(opts)
            console.log(data,'data')
            this.cardId = data.result[0].id
        },
        async submitHandle(){
            if(this.newPinPass!==this.pinPass){
                uni.$u.toast('二次密码不一致!');
                return
            }
            let opts = {
				url: 'api/user/card/change-pin',
				method: 'post',
			};
            const params = {
                    "cardId":this.cardId,
                    "pin":this.newPinPass
                }

            const { data } = await request.httpTokenRequest(opts,params)
            console.log(data,'data')
            if(data.code==200){
                uni.$u.toast('修改成功！');
            }
        },
        handleEye(type){
          this.isText = type
          this.isDot = !type
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
        changeCollapse(){},
        closeCollapse(){},
        openCollapse(){},
        changeHandle(){}
	}
};
</script>

<style lang="scss" scoped>
.pin-box{
    display: flex;
    justify-content: space-between;
    margin:16px auto;
}
.show-pin-text{
    margin-right:8px;
}
.check-text{
    margin-top:16px;
}
.view-link{
    color: #f37b1d;
    text-align: right;
    text-decoration: underline;
    padding-top:8px;
}
.title{
    margin-top:24px;
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
.show-pin{
    display: flex;
    margin-right:16px;
}
.item-check{
    display: flex;
}
.orz-btn-autoPay{
  
    width: 100%;
}
.orz-btn-autoPay:first-child{
    margin-right:16px;
    background: #ccc;
    color:#000;
}
.title-review{
    margin: 16px auto;
}
.autoPay-header{
    display: flex;
    justify-content: space-between;
    margin-top:40px;
}
.autoPay-item{
    display: flex;
    justify-content: space-between;
    margin:16px auto 24px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;;
}
.card-setLimits{
    margin-top:24px;
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
            // height: 300px;;
        }
    }
}
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
</style>


