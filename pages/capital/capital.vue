<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-15 16:38:07
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
    <view class="capital-wrap">
        <u-popup v-model="show" :round="10" border-radius="30" mode="bottom" closeable @close="close" @open="open" >
            <view class="capital-box">
                <view>充幣</view>
                <uni-data-select
                        class="conversion-uni-select-box"
                        v-model="value"
                        :localdata="comeInList"
                        style="margin-top:10px"
                        @change="changeHandle"
                        ></uni-data-select>
                <view class="capital-network">
                    <view class="capital-title">充幣網絡</view>
                    <uni-data-select
                        class="conversion-uni-select-box"
                        v-model="value"
                        :localdata="comeInList"
                        @change="changeHandle"
                        ></uni-data-select>
                </view>
                <view class="capital-network">
                    <view class="capital-title">充幣至</view>
                    <uni-data-select
                        class="conversion-uni-select-box"
                        v-model="coinRecharge"
                        :localdata="rechargeList"
                        @change="changeHandle"
                        ></uni-data-select>
                </view>
                <view class="capital-network">
                    <view>充幣地址</view>
                    <view>TFfmadhsadsjdashdsahdhsahCbeX</view>
                    <!-- <u-input
                        placeholder="后置图标"
                        /> -->
                        <!-- <u-input placeholder="请输入集装箱号" border="surround"></u-input>		 -->
                   
                    <!-- <u-input
                        placeholder="后置图标"
                       
                    >
                    <template slot="suffix">
                        <u-icon name="file-text-fill"  />
                    </template>
                </u-input> -->
                </view>
                <view class="capital-warn-wrap">
                    <u-icon name="warning" class="capital-warn-icon"></u-icon>
                    以上充币地址仅接受Trc20中的USDT，充入其他资产将无法找回造成的损失，ORZ对此不承担任何责任。
                </view>
            </view>

        </u-popup>
    </view>
</template>

<script>

export default {
    name:'Capital',
    props:{
        show: {
            type: Boolean,
            default: false
        },
    },
	data() {
		return {
            value:'',
            coinRecharge:'',
            rechargeList:[
                { value: 0, text: "數字資產錢包賬戶" },
				{ value: 1, text: "兌換法幣至賬戶(Card Account 1)" },
				{ value: 2, text: "兌換法幣至賬戶(Card Account 2)" },
            ],
            comeInList:[
				{ value: 0, text: "USDT" },
				{ value: 1, text: "USDT1" },
				{ value: 2, text: "USDT2" },
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
    &-network{
        margin-top:16px;
    }
    &-warn-wrap{
        margin-top:12px;
    }
    &-warn-icon{
        color: #EE9611;
        margin-right: 5px;;
    }
}
</style>


