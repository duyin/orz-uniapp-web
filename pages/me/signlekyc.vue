<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-14 17:21:39
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
	<view class="single-kyc">
        <view class="single-wrap">
           用户类型
        </view>
        <view>
            <u-tabs :list="list1" :current="count" @change="clickHandle" class="single-tabs-list"></u-tabs>
        </view>
        <!-- <personkyc v-if="count==0"/> -->
	</view>
</template>

<script>
import personkyc from "./personkyc.vue"
export default {
	data() {
		return {
            count: 0,
            list1:[
               {
                    name: '個人',
                }, {
                    name: '香港有限公司',
                },
                {
                    name: '海外有限公司',
                },
                {
                    name: '新加坡公司',
                },
                {
                    name: '獨資經營者',
                },
                {
                    name: '合夥企業',
                },
                {
                    name: '大陸公司',
                }
            ]
        }
	},
    // components: { personkyc },
	onLoad() {
		
	},
	computed: {
	
	},
	methods: {
		clickHandle(key){
         this.count = key;
        }
	}
};
</script>



<style lang="scss" scoped>
	.single{
        &-kyc{
            width: calc(100% - 24px);
            margin:0 auto;
            padding:24px;
        }
        &-tabs-list{
            background: none !important;
        }
    }
</style>

