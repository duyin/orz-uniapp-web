<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-02 17:09:16
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
    <view class="capital-wrap">
        <u-popup v-model="visible" :show="visible" :round="10" border-radius="30" mode="bottom" closeable @close="close" @open="open" >
            <view class="capital-box">
                <view class="edit-title">修改交易密码</view>
                <view>交易密码仅在转账、跨境支付、提现时使用</view>
                <view class="capital-network">
                    <view class="capital-title">邮箱</view>
                    <view
					class="u-demo-block__content"
					style="margin-top: 15px;"
				>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u--input placeholder="请输入邮箱"  v-model="transferForm.email" disabled>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input placeholder="请输入邮箱" v-model="transferForm.email" disabled>
					<!-- #endif -->
						<template slot="suffix">
							<u-code
								ref="uCode"
								@change="codeChange"
								seconds="60"
								changeText="X秒重新获取"
							></u-code>
							<u-button
								@tap="getCode"
								:text="tips"
                                class="getBtn"
								type="success"
								size="mini"
							></u-button>
						</template>
					<!-- #ifndef APP-NVUE -->
					</u--input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				   </view> 
                   <view class="t-a verify">
                        <view class="title">验证码</view>
                        <u--input type="text" placeholder="请输入验证码" v-model="transferForm.code" />
                    </view>
                    <view class="t-a verify">
                        <view class="title">交易密码</view>
                        <u-code-input v-model="transferForm.transferPasswd" :maxlength="6"></u-code-input>
                    </view>
                    <view @tap="submitHandle" class="transferSubmit">提 交</view>
                </view>
            </view>

        </u-popup>
    </view>
</template>

<script>
import request from '@/common/request.js';
export default {
    name:'EditEmail',
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
        const that = this;
        console.log(that)
		return {
            value:'',
            isCollapse:false,
            coinRecharge:'',
            activeIndex:0,
            active:false,
            second:60,
            showText:false,
            tips: '',
		    tipValue: '',
            transferPasswd:'',
            transferForm:{
                email:that.$store.state.app.userInfo.email,
                code:'',
                transferPasswd:''
            }
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
         
        },
        codeChange(text) {
            this.tips = text;
        },
        listHandle(event,key){
            console.log(event,'taget',event.currentTarget,key)
            const { index } = event.currentTarget.dataset;
            console.log(index,key)
            this.activeIndex = key;
           
           
        },
        //获取短信验证码
		async getCode() {
			if (this.$refs.uCode.canGetCode) {
                // 模拟向后端请求验证码
                // uni.showLoading({
                //     title: '正在获取验证码'
                // })
                // uni.hideLoading();
                this.$refs.uCode.start();
               
                let opts = {
					url: 'api/email/code',
					method: 'post',
				};
			
                const { data } = await request.httpRequest(opts,{email: this.transferForm.email,type:'tradpasswd'})
                console.log(data,'data')
                setTimeout(() => {
                   
                    // 这里此提示会被this.start()方法中的提示覆盖
                    uni.$u.toast('验证码已发送');
                    // 通知验证码组件内部开始倒计时
                   
                }, 2000);
                // if (res.statusCode == 200) {
				// 		this.message = res.data.data.length;
				// 	} else {
				// 		console.log('数据请求错误～');
				// 	}
                
			} else {
			uni.$u.toast('倒计时结束后再发送');
			}
		},
        async submitHandle(){
            const opts = {
				url: 'api/user/tradpasswd',
				method: 'post',
			};
			const { data } = await request.httpTokenRequest(opts,this.transferForm)
			console.log(data,'data')
            if(data.code!==200){
                uni.showToast({ title: data.msg, icon: 'none' });
                return;
            }
            this.$emit('closeFn')
        }
	}
};
</script>

<style lang="scss" scoped>
.edit-title{
    font-weight: bold;
    padding-bottom:8px;
}
.transferSubmit{
    width: 139px;
    height: 30px;
    border-radius: 4px;
    background-color: rgba(8, 8, 8, 1);
    color: rgba(255, 255, 255, 1); 
    text-align: center;
    line-height: 30px;;
    margin: 16px auto; 
}
.capital{
    &-box{
        height: 400px;
        padding:12px;
        border-radius: 30px 30px 0px 0px;
      
    }
    &-title{
        font-weight: bold;
       
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
    }
    &-network{
        margin-top:16px;
    }
    &-warn-wrap{
        margin-top:12px;
    }
    &-collapse-item{
        border: 1px solid #ccc;
        padding: 16px;;
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

.title{
    margin:12px auto;
}
.active{
        border: 1px solid #4483AD;
        color:#4483AD
    }
</style>


