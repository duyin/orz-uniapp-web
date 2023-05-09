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
                <view>设置限制</view>
               
                <view class="title">选择要为卡设置的限制</view>
                <view class="card-setLimits">
                    <uni-data-select
					class="auto-phoneAreaList1"
					v-model="cardValue"
					:localdata="cardList"
					:clear="false"
				/>
                </view>
            <view class="btn-box">
               <view  class="orz-btn orz-btn-autoPay">取消</view>
               <view  class="orz-btn orz-btn-autoPay" @tap="confirmOk">继续</view>
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
            isCollapse:false,
            coinRecharge:'',
            activeIndex:0,
            active:false,
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
        this.getCard();
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
        autoPayment(){
            uni.$u.toast('soon coming!');
        },
        async confirmOk(){
            let opts = {
				url: 'api/user/card/spending-control',
				method: 'post',
			};
            let params = {
                "cardId":this.cardId,
                // "dailyPurchaseLimit": 10000,
                // "dailyAtmLimit": 5000
            }
            console.log(this.cardValue)
            if(!this.cardValue){
                params.dailyPurchaseLimit = 10000
            }else{
                params.dailyAtmLimit = 5000
            }
			const { data } = await request.httpTokenRequest(opts,params)
            console.log(data,'data')
            if(data.code!==200){
                uni.$u.toast('网络异常!'); 
                return;
            }
            uni.$u.toast('successful!');
            this.$emit('closeExtractFn')
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
.view-link{
    color: #f37b1d;
    text-align: right;
    text-decoration: underline;
    padding-top:8px;
}
.title{
    margin-top:40px;
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
    margin-top:30px;
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
            height: 300px;;
        }
    }
}
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
</style>


