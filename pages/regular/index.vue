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
                <view>定期存款</view>
               
                <view class="regular-title">
                  <view>stablecoin2</view>
                  <view>年化利率：7.2%</view>
                </view>
                <view class="regular-risk">
                    <view>低风险</view>
                    <view>首发热销</view>
                    <view>可赎回</view>
                    <view>现金理财</view>
                </view>
                <view class="regular-over">
                    <view>
                        剩余可用额度 > 1,000 USD
                    </view>
                    <view class="regular-shopping-btn">
                        <view>2,000 USD</view>
                        <view>起购</view>
                    </view>
                </view>
               
            </view>
            <view class="soonComing">coming soon!</view>
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
        changeCollapse(){},
        closeCollapse(){},
        openCollapse(){},
        changeHandle(){}
	}
};
</script>

<style lang="scss" scoped>
.soonComing{
    text-align: center;
   
    font-size: 24px;
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    display: flex;
    padding-top: 150px;
    justify-content: center;
    color:#fff;
    background: rgba(0, 0, 0, .8);
}
.regular-shopping-btn{
    background: #ccc;
    padding:8px 16px;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.regular-title{
    display: flex;
    margin-top:24px;
    justify-content: space-between;
}
.regular-risk{
    display: flex;
    justify-content: space-around;
    // color:#4483AD;
    margin-top:16px;
}
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
.regular-over{
    display: flex;
    margin-top:24px;
    justify-content: space-between;
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


