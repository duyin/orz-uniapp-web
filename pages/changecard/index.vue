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
                <view>更换卡</view>
               
                <view class="title">为防止欺诈性交易，一旦您要求更换旧卡，就会暂停使用您的旧卡。</view>
                <img :src="cardImg" alt="" class="cardImg">
                <view>更换原因</view>
                <view class="btn-box">
                    <view  class="orz-btn orz-btn-autoPay" :class="{activeBlock:block=='lost'}" @tap="()=>handleClick('lost')">它丢失 / 被盗</view>
                    <view  class="orz-btn orz-btn-autoPay" :class="{activeBlock:block=='broken'}" @tap="()=>handleClick('broken')">它坏了</view>
                </view>
                <view class="attention-btn">
                    <view>注意</view>
                    <view>1.您的实体卡将立即停止工作。</view>
                    <view>2.请与在线商户更新卡的详细信息，包括您想使用的ORZ卡进行的在线和离线服务。</view>
                    <view>3.我们将收取HKD50.0更换费</view>
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
import cardImg from '@/static/home/client-card.png'
export default {
    name:'changeCrad',
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
            block:'broken',
            cardImg,
            cardList:[
               { value: 0, text: "设置ATM取款限额" },
				{ value: 1, text: "设置卡限额" },
            ],
           
        }
	},
    mounted() {
        console.log('80808')
        this.getCard()
    },
	methods: {
        open() {
          // console.log('open');
        },
        close() {
           this.$emit('closeExtractFn')
        },
        handleClick(type){
          this.block = type
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
        async getCard(){
				
            let opts = {
                url: 'api/user/card/get',
                method: 'get',
            };
            const { data } = await request.httpTokenRequest(opts)
            console.log(data,'data')
            this.cardId = data.result[0].id
        },
        async confirmOk(){
            let opts = {
				url: 'api/user/card/changecard',
				method: 'post',
			};
            const params = {
                "type": "virtual",
                "productId": "600",
                "embossedName":"OrzCash",
                "cardId": this.cardId,
                "reason": this.block
            }
			const { data } = await request.httpTokenRequest(opts,params)
            console.log(data,'data')
            if(data.code==200){
                uni.$u.toast('修改成功！');
            }
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
.cardImg{
    margin:16px auto;
    width: 90%;
    display: flex;
}
.view-link{
    color: #f37b1d;
    text-align: right;
    text-decoration: underline;
    padding-top:8px;
}
.title{
    margin-top:16px;
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
.orz-btn-autoPay{
    margin-right:16px;
    background: #ccc;
    color:#000;
}
.autoPay-header{
    display: flex;
    justify-content: space-between;
    margin-top:24px;
}
.activeBlock{
   background: #000;
   color:#fff;
}
.autoPay-item{
    display: flex;
    justify-content: space-between;
    margin:16px auto 12px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;;
}
.card-setLimits{
    margin-top:24px;
}
.btn-box{
    display: flex;
  
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
             max-height: 600px;
            //  overflow-y: scroll;
        }
    }
}
.attention-btn{
   
}
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
</style>


