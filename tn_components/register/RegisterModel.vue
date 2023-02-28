<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-28 11:49:50
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
    <view class="capital-wrap">
        <u-popup v-model="show" :show="show" :round="10" border-radius="30" mode="bottom" closeable @close="close" @open="open" >
            <view class="capital-box">
                <view>账户资产和名称</view>
                <view class="capital-warn-wrap">选择账户资产、输入账户名称</view>
                <view>账户资产</view>
                <!-- <uni-data-select
                        class="conversion-uni-select-box"
                        v-model="value"
                        :localdata="comeInList"
                        style="margin-top:10px"
                        @change="changeHandle"
                        ></uni-data-select> -->
                        <uni-data-checkbox mode="tag" multiple v-model="checkbox3" :localdata="hobby"></uni-data-checkbox>
              <view class="capital-warn-wrap">
                账户名称
              </view>
              <view>
                <u-input type="text" name="code" maxlength="50" placeholder="请输入账户名称" />
              </view>
              <view class="orz-btn" @click="registerAjax">注 册</view>
            </view>

        </u-popup>
    </view>
</template>

<script>
import request from '@/common/request.js';
export default {
    name:'Capital',
    props:{
        show: {
            type: Boolean,
            default: false
        },
        form:{
            type: Object,
            default: {}
        }
    },
	data() {
		return {
            value:'',
            coinRecharge:'',
            flag:true,
            checkbox3: [0,1],
            hobby: [{
					text: 'USD',
					value: 0
				}, {
					text: 'HKD',
					value: 1
				}],
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
        console.log('80808',this.show,)
    },
	methods: {
        open() {
          // console.log('open');
        },
        close() {
           this.$emit('closeFn')
          // console.log('close');
        },
        async registerAjax(){
            const opts = {
                url: 'api/user/register',
				method: 'post',
            }
            const { data } = await request.httpRequest(opts,this.$props.form)
           console.log(data,'data')
           if(data.code==200){
               uni.showToast({ title: '注册成功', icon: 'none' });
               setTimeout(()=>{
                    this.$emit('closeFn');
                    uni.navigateTo({
                        url: '../login/index1'
                    })
               },1000)
           }
        },
        changeHandle(){},
	}
};
</script>

<style lang="scss" scoped>
.orz-btn{
    padding: 8px 16px;
    text-align: center;
    margin: 24px auto;
    border:1px solid #ccc;
    border-radius: 8px;;
    background: #000;
    color:#fff;
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
    &-network{
        margin-top:16px;
    }
    &-warn-wrap{
        margin-top:12px;
        margin-bottom: 12px;
    }
    &-warn-icon{
        color: #EE9611;
        margin-right: 5px;;
    }
}
</style>


