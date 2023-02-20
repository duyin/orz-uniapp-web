<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-17 11:02:07
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
   
    <view class="capital-wrap">
        <cu-custom class="custom-header" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">账单</block>
        </cu-custom>
        <view class="capital-tabs-wrap">
            <view>
                <u-tabs :list="billList"  :is-scroll="false" bar-width="50" :current="billCount" 
 @change="clickHandle" class="capital-tabs-list"></u-tabs>
            </view>
            <view class="capital-main">
                暂无记录
            </view>
        </view>
      
    </view>
</template>

<script>
// import uniDataSelect from '@/components/uni-data-select/uni-data-select.vue';
// import uCollapse from '@/components/u-collapse/u-collapse.vue'
export default {
    name:'Capital',
    
//    components:{uCollapse},
	data() {
		return {
            billCount:0,
            billList: [{
                name: '全部',
                }, {
                    name: '入账',
                },
                {
                    name: '转帐',
                },
                {
                    name: '提现',
                },
                {
                    name: '兑换',
                },
                {
                    name: '充值卡账户',
                }
            ],
            value:'',
        }
	},
    mounted() {
        console.log('80808')
    },
	methods: {
        clickHandle(key){
            console.log(key);
            const { index } = key
            this.billCount = index
        },
	}
};
</script>

<style lang="scss" scoped>
.capital{
    &-wrap{
        width: calc(100% - 24px);
		margin:0 auto
    }
    // &-wrap-box{
    //     width: 100%;
      
    // }
    &-tabs-wrap{
		margin-top:24px;
	}
    &-main{
        margin:24px auto;
        text-align: center;
    }
    &-tabs-list{
		background: none !important;
	}
}
</style>


