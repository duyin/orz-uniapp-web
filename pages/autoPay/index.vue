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
        <u-popup v-model="visible" :show="visible" :round="10" border-radius="30" mode="bottom" closeable @close="close" @open="open" >
            <view class="capital-box">
                <view class="autoPay-header">
                    <view>还款</view>
                     <view>自动还款启用</view>
                </view>
                <view class="autoPay-item">
                    <view>未付账单</view>
                    <view>
                       <view>0.00 HKD</view>
                       <view>≈ 0.00 USD</view>
                    </view>
                </view>
                <view class="autoPay-item">
                    <view>利率</view>
                    <view>
                       <view>每天 0.05 %</view>
                    </view>
                </view>
                <view class="autoPay-item-last">
                    <view>
                    <view>上次还款</view>
                    <view>(2023-04-18)</view>
                    </view>
                    <view>
                        <view>6435.48 HKD</view>
                       <view class="view-link">查看还款</view>
                    </view>
                </view>
                <view class="orz-btn orz-btn-autoPay" @tap="autoPayment">
                    自动还款
                </view>
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
            rechargeList:[
                { value: 0, text: "數字資產錢包賬戶" },
				{ value: 1, text: "兌換法幣至賬戶(Card Account 1)" },
				{ value: 2, text: "兌換法幣至賬戶(Card Account 2)" },
            ],
            comeInList:[
                { value: 0, text: "USDT" },
                { value: 1, text: "USDT1" },
                { value: 2, text: "USDT2" },
            ],
            tagList:[
                {
                    backName:'银行转账',
                    title:'可取款货币：HKD、USD、CNH、SGD等'
                },
                {
                    backName:'现场取款',
                    title:'可取款货币：HKD、USD、CNH、SGD等'
                },
                {
                    backName:'中国银联',
                    title:'可取款货币：CNH'
                }
            ]
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
.view-link{
    color: #f37b1d;
    text-align: right;
    text-decoration: underline;
    padding-top:8px;
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
.autoPay-item-last{
    display: flex;
    justify-content: space-between;
    margin:16px auto;
  
}
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
</style>


