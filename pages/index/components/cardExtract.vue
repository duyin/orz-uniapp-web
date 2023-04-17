<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-07 16:02:46
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
    <view class="capital-wrap">
        <u-popup v-model="visible" :show="visible" :round="10" border-radius="30" mode="bottom" closeable @close="close" @open="open" >
            <view class="capital-box">
                <view>提取</view>
                <view class="capital-black">
                    
                    <u-icon name="lock-fill" class="capital-black-lock"></u-icon>
                    Your Card is now locked
                </view>
                <view class="capital-network extract-list">
                    <view v-for="item in cardList">
                        <view class="capital-network-img">
                            <u-icon name="account-fill" class="custom-me-img"></u-icon>
                        </view>
                        <view @tap="()=>cardHandle(item.name)">{{ item.text }}</view>
                    </view>
                </view>
                 <view>
                    <view v-for="item in list" class="extract-list">
                        <view>{{ item.backName }}</view>
                        <view>{{ item.amount }}</view>
                    </view>
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

	data() {
		return {
            value:'',
            cardList:[
                {
                    name:'lock',
                    text:'解锁卡'
                },
                {
                    name:'amount',
                    text:'设置额度'
                },
                {
                    name:'atmPasswd',
                    text:'修改ATM密码'
                },
                {
                    name:'logout',
                    text:'注销卡'
                }
            ],
            list:[
                {
                    backName:'Daily ATM Limit',
                    amount:'60,000.00 HKD'
                },
                {
                    backName:'Daily Purchase Limit',
                    amount:'60,000.00 HKD'
                },
              
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
           this.$emit('closeFn')
          // console.log('close');
        },
        listHandle(event,key){
            console.log(event,'taget',event.currentTarget,key)
            const { index } = event.currentTarget.dataset;
            console.log(index,key)
            this.activeIndex = key;
           
           
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
        cardHandle(type){
           switch(type){
            case 'lock':
                this.lockFn()
              break;
            case 'amount':
                this.amountFn()
              break;
            case 'atmPasswd':
                this.atmPasswdFn()
              break;
             case 'logout':
                this.logoutFn()
              break;

           }
        },
        async lockFn(){
            const opt = {
                url: 'api/user/card/unlock',
				method: 'post',
            }
            const params = {
                "cardId":"c3a0322f-e77d-5279-b999-86df5445be1b",
               
            }
            const { data } = await request.httpTokenRequest(opt,params)
			console.log(data,'data')
        },
        async amountFn(){
            const opt = {
                url: 'api/user/card/spending-control',
				method: 'post',
            }
            const params = {
                "cardId":"c3a0322f-e77d-5279-b999-86df5445be1b",
                "dailyPurchaseLimit": 10000,
                "dailyAtmLimit": 5000
            }
            const { data } = await request.httpTokenRequest(opt,params)
			console.log(data,'data')
        },
        async atmPasswdFn(){
            const opt = {
                url: 'api/user/card/cancel',
				method: 'post',
            }
            const params = {
                "cardId":"c3a0322f-e77d-5279-b999-86df5445be1b",
                "reason":"lost" 
            }
            const { data } = await request.httpTokenRequest(opt,params)
			console.log(data,'data')
        },
        async logoutFn(){
            const opt = {
                url: 'api/user/card/cancel',
				method: 'post',
            }
            const params = {
                "cardId":"c3a0322f-e77d-5279-b999-86df5445be1b",
                "reason":"lost" 
            }
            const { data } = await request.httpTokenRequest(opt,params)
			console.log(data,'data')
            console.log('注销')
        },
        changeCollapse(){},
        closeCollapse(){},
        openCollapse(){},
        changeHandle(){}
	}
};
</script>

<style lang="scss" scoped>
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
    &-collapse-title{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    &-collapse-content{
        margin-top: 16px;
    }
    &-collapse-contentBtn{
        width: 139px;
        height: 30px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 24px auto;
        color:#fff;
        cursor: pointer;
        background-color: rgba(8, 8, 8, 1);

    }
    &-collapse-main{
        margin-bottom:24px;
        ::v-deep{
            .uni-collapse-item__title.uni-collapse-item-border{
                border:0;
            }
        }
    }
    &-network{
        margin-top:16px;
    }
    &-warn-wrap{
        margin-top:12px;
    }
    &-collapse-item{
        border: 1px solid #ccc;
        padding: 8px;;
        margin-bottom: 16px;
    }
    &-collapse-item.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
    &-warn-icon{
        color: #EE9611;
        margin-right: 5px;;
    }
}
.extract-list{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 32px);
    margin:16px auto 0;
}
.capital-network{
    text-align: center;
   
    width: calc(100% - 32px);
    margin:40px auto 0;
}
.capital-network-img{
   width: 50px;
   height: 50px;
   border:1px solid #eee;
   border-radius: 50%;
   display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom:8px;
}
.capital-black{
    width: calc(100% - 90px);
    height: 150px;
    background: #000;
    margin:16px auto 0;
    border-radius: 8px;;
    color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // text-align: center;
    // line-height: 150px;;
}
.capital-black-lock{
    color:#fff;
    ::v-deep{
        .uicon-lock-fill{
            color:#fff!important;
        }
    }
}
</style>


