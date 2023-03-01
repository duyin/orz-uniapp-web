<!-- 蓝色简洁登录页面 -->
<template>
	<view class="t-login">
		<!-- 页面装饰图片 -->
		<!-- <image class="img-a" src="https://zhoukaiwen.com/img/loginImg/2.png"></image>
		<image class="img-b" src="https://zhoukaiwen.com/img/loginImg/3.png"></image> -->
		<!-- 标题 -->
		<view class="t-b">{{ title }}</view>
		<view class="title">加密资产消费新方案</view>
		<form class="cl">
            <view class="register-header">
                <view class="register-left">
                    <view>名字</view>
                    <input type="text" name="firstName" placeholder="请输入名字" maxlength="11" v-model="form.firstName" />
                </view>
                <view>
                    <view>姓氏</view>
                    <input type="text" name="lastName" placeholder="请输入姓氏" maxlength="11" v-model="form.lastName" />
                </view>
            </view>
			<view class="t-a">
				<view class="title">电子邮件*</view>
                <view
					class="u-demo-block__content"
					style="margin-top: 15px;"
				>
					<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
					<!-- #ifndef APP-NVUE -->
					<u--input placeholder="请输入邮箱"  v-model="form.email">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input placeholder="请输入邮箱" v-model="form.email">
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
				<!-- <input type="text" placeholder="请输入邮箱" v-model="form.email" /> -->
			</view>
            <view class="t-a">
				<view class="title">验证码</view>
				<input type="text" placeholder="请输入验证码" v-model="form.emailCode" />
			</view>
			<view class="t-a password-box">
				<view class="title">密码</view>
				<!-- <u-input :type="{isText?'text':'password'}" placeholder="请输入密码" v-model="form.passwd" >
                    <template slot="suffix">
                        <u-icon :name="{isText?'eye-fill':'eye'}" @click="!isText" color="#247CFF"></u-icon>
                    </template>
                </u-input> -->

                <u-input v-show="isText === true" placeholder="请再次输入密码" border="none" v-model="form.passwd" class="input_class_pwd" :password="true">
                    <template slot="suffix">
                        <u-icon name="eye-off" @click="isText = false" size="18"></u-icon>
                    </template>
                </u-input>
                <u-input v-show="isText === false" placeholder="请再次输入密码" border="none" v-model="form.passwd" class="input_class_pwd" :password="false">
                    <template slot="suffix">
                        <u-icon name="eye-fill" @click="isText = true" color="#247CFF"></u-icon>
                    </template>
                </u-input>


			</view>
			<view class="t-a password-box">
				<view class="title">确认密码</view>
				<!-- <input type="password" placeholder="请输入密码" v-model="form.confirmPasswd" /> -->
                <u-input v-show="isConfirmText === true" placeholder="请再次输入密码" border="none" v-model="form.confirmPasswd" class="input_class_pwd" :password="true">
                    <template slot="suffix">
                        <u-icon name="eye-off" @click="isConfirmText = false" size="18"></u-icon>
                    </template>
                </u-input>
                <u-input v-show="isConfirmText === false" placeholder="请再次输入密码" border="none" v-model="form.confirmPasswd" class="input_class_pwd" :password="false">
                    <template slot="suffix">
                        <u-icon name="eye-fill" @click="isConfirmText = true" color="#247CFF"></u-icon>
                    </template>
                </u-input>
			</view>
            <view class="t-a">
				<view class="title">邀请码（选填）</view>
				<input type="number"  maxlength="6" placeholder="请输入密码" v-model="form.code" />
			</view>
			<button @tap="login()">继 续</button>
		</form>
		<register-model :show="isRegister" @closeFn="closeFn" :form="form"/>
		
	</view>
</template>
<script>
import RegisterModel from './RegisterModel.vue';
import request from '@/common/request.js';
export default {
	data() {
		return {
			title: 'ORZCash', //填写logo或者app名称，也可以用：欢迎回来，看您需求
			second: 60, //默认60秒
			showText: true, //判断短信是否发送
            isRegister:false,
            tips: '',
		    tipValue: '',
            isText:true,
            isConfirmText:true,
            form:{
                firstName: "",
                lastName:"",
                email: "",
                code: "",
                confirmPasswd:"",
                passwd: "",
                emailCode:""
            }
		};
	},
    components:{RegisterModel},
	onLoad() {},
	methods: {
        closeFn(){
            this.isRegister = false;
        },
		//当前登录按钮操作
		login() {
			for(let key in this.form){
                console.log(key,'key')
                if(!this.form[key] && key!=="code"){
                    uni.showToast({ title: '有未填写项', icon: 'none' });
                    return;
                }
            }
            const pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            if(!pattern.test(this.form.email)){
                uni.showToast({ title: '请输入正确的邮箱地址', icon: 'none' });
                return;
            }
            if(this.form.confirmPasswd!==this.form.passwd){
                uni.showToast({ title: '密码输入不一致!', icon: 'none' });
                return;
            }
            const res = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\._])[0-9a-zA-Z!@#$%^&*,\\._]{8,12}$/
            if(!res.test(this.form.passwd)){
                uni.showToast({ title: '必须包含数字字母大小写特殊符号', icon: 'none' });
                return;
            }
            this.isRegister= true
		},
		codeChange(text) {
            this.tips = text;
        },
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
				// request.httpRequest(opts).then(res => {
				// 	// console.log(res);
				// 	uni.hideLoading();
				// 	if (res.statusCode == 200) {
				// 		this.message = res.data.data.length;
				// 	} else {
				// 		console.log('数据请求错误～');
				// 	}
				// });
                const { data } = await request.httpRequest(opts,{email: this.form.email,type:'register'})
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
	}
};
</script>
<style lang="scss">
.img-a {
	position: absolute;
	width: 100%;
	top: -150rpx;
	right: 0;
}
.register-header{
    display: flex;
}
.register-left{
    margin-right:8px;
}
.title{
	margin-top:8px;
	margin-bottom:8px;
}
.register{
	color:#5677fc;
	cursor: pointer;
}
.account-text{
	margin-top:8px;
	margin-bottom: 8px;;
}
.img-b {
	position: absolute;
	width: 50%;
	bottom: 0;
	left: -50rpx;
	/* margin-bottom: -200rpx; */
}
.t-login {
	width: 650rpx;
	margin: 0 auto;
	font-size: 28rpx;
	color: #000;
}
.password-box {
    ::v-deep{
        .u-input__content{
            border:1px solid #ccc;
            border-radius: 3px;
            padding:0 10px 0 12px;
            height: 45px;
        }
    }
}
.t-login button {
	font-size: 28rpx;
	background: #5677fc;
	color: #fff;
	height: 90rpx;
	line-height: 90rpx;
	border-radius: 50rpx;
	box-shadow: 0 5px 7px 0 rgba(86, 119, 252, 0.2);
}
.t-login  .getBtn{
    height: 30px;;
    border:none;
}

.t-login input {
	padding: 0 20rpx 0 24rpx;
	height: 90rpx;
	line-height: 90rpx;
	margin-bottom: 50rpx;
	background: #f8f7fc;
	border: 1px solid #e9e9e9;
	font-size: 28rpx;
	border-radius: 6rpx;
}

.t-login .t-a {
	position: relative;
}

.t-login .t-a image {
	width: 40rpx;
	height: 40rpx;
	position: absolute;
	/* left: 40rpx; */
	top: 28rpx;
	/* border-right: 2rpx solid #dedede; */
	margin-right: 20rpx;
}
.t-login .t-a .line{
	width: 2rpx;
	height: 40rpx;
	background-color: #dedede;
	position: absolute;
	top: 28rpx;
	left: 98rpx;
}

.t-login .t-b {
	text-align: left;
	font-size: 46rpx;
	color: #000;
	padding: 50rpx 0 30rpx 0;
	font-weight: bold;
}
.t-login .t-b2 {
	text-align: left;
	font-size: 32rpx;
	color: #aaaaaa;
	padding: 0rpx 0 120rpx 0;
}

.t-login .t-c {
	position: absolute;
	right: 22rpx;
	top: 22rpx;
	background: #5677fc;
	color: #fff;
	font-size: 24rpx;
	border-radius: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	padding: 0 25rpx;
}

.t-login .t-d {
	text-align: center;
	color: #999;
	margin: 80rpx 0;
}

.t-login .t-e {
	text-align: center;
	width: 250rpx;
	margin: 80rpx auto 0;
}

.t-login .t-g {
	float: left;
	width: 50%;
}

.t-login .t-e image {
	width: 50rpx;
	height: 50rpx;
}

.t-login .t-f {
	text-align: center;
	margin: 100rpx 0 0 0;
	color: #666;
}

.t-login .t-f text {
	margin-left: 20rpx;
	color: #aaaaaa;
	font-size: 27rpx;
}

.t-login .uni-input-placeholder {
	color: #000;
}

.cl {
	zoom: 1;
}

.cl:after {
	clear: both;
	display: block;
	visibility: hidden;
	height: 0;
	content: '\20';
}
</style>
