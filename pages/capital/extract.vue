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
                <view>提取</view>
                <view>法币转账、提取现金、数字资产等。</view>
              
                <view class="capital-network">
                    <view class="capital-title">香港账户</view>
                    <!-- <u-collapse
                        @change="changeCollapse"
                        @close="closeCollapse"
                        @open="openCollapse"
                        accordion
                    >
                        <u-collapse-item
                        title="文档指南"
                        name="Docs guide"
                        >
                        <text class="u-collapse-content">涵盖uniapp各个方面，给开发者方向指导和设计理念，让您茅塞顿开，一马平川</text>
                        </u-collapse-item>
                    </u-collapse> -->
                    <view class="capital-collapse-main">
                    <uni-collapse :accordion="true">  
                        <uni-collapse-item>  
                            <template #title>
                                <div class="capital-collapse-title">
                                    <p>法定货币</p>
                                    <p>002-011-5224818-001</p> 
                                </div>
                            </template>
                            <view class="capital-collapse-content">
                               <view class="capital-collapse-list">
                                    <view class="capital-collapse-ul">
                                        <view v-for="(item, index) in tagList"
                                           @click="(e)=>listHandle(e,index)" 
                                           :class="{active:index===activeIndex}" 
                                           class="capital-collapse-item"
                                            :key="index"
                                            :data-index="index"
                                            >
                                           <p>{{item.backName}}</p>
                                           <p>{{item.title}}</p>
                                        </view>
                                    </view>
                               </view>
                               <view class="capital-collapse-contentBtn" @tap="confirmOk">继续</view>
                            </view>  
                        </uni-collapse-item>  
                    </uni-collapse>
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
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
</style>


