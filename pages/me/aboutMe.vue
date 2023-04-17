<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 11:24:10
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-06 16:41:13
 * @FilePath: /orz-uniapp/pages/me/aboutOrz.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- 课程班级 -->
<template>
	<view>
		<cu-custom class="custom-header" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">基本信息</block>
		</cu-custom>
		<view class="custom-wrap">
          <view class="custom-userImg">
                <u-icon name="account-fill" class="custom-me-img"></u-icon>
               
            </view>
            <view class="custom-vision">{{ userInfo.email }}</view>
            <view class="custom-vision">已验证</view>
            <view class="me-list-wrap">
                <view class="me-list-item" @click="visionHandle">
                    <view class="me-title">账户号码</view>
                    <view>
                     {{ userInfo.accountNumber }}
                    </view>
                </view>
                <view class="me-list-item">
                   <view class="me-title">显示姓名</view>
                    <view>
                      {{ userInfo.name }}
                    </view>
                </view>
                <view class="me-list-item">
                   <view class="me-title">电话号码</view>
                    <view>
                      {{ userInfo.phone||'--'}}
                    </view>
                </view>
                <view class="me-list-item">
                   <view class="me-title">地址</view>
                    <view>
                      {{ userInfo.address||'--' }}
                    </view>
                </view>
                <view class="me-list-item">
                   <view class="me-title">注册时间</view>
                    <view>
                      {{ userInfo.createTime }}
                    </view>
                </view>
	        </view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex";
export default {
	data() {
		return {}
	},
	onLoad() {
		
	},
  computed: {
    ...mapState('app',['userInfo'])
  },
	methods: {
		visionHandle(){
			location.href="https://www.orzcash.com/#/clientkyc"
		}
	}
};
</script>

<style lang="scss" scoped>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}

/* #endif */
.custom-header{
    background: #fff;;
}
.custom{
    &-wrap{
        width: calc(100% - 24px);
        margin: 24px auto;
    }
    &-userImg{
        width: 100px;
        height: 100px;
        border:1px solid #ccc;
       font-size: 30px;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    &-vision{
        padding-top:24px;
        text-align: center;
        font-weight: bold;
    }
    &-outLogin{
        height: 30px;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        color:#fff;
        width: calc(100% - 24px);
        margin:24px auto;
        background-color: rgba(31, 31, 31, 1);
    }
}
.me-img{
		width: 30px;
		height: 30px;
		border: 1px solid #000;
		border-radius: 50%;
		display: flex;
        justify-content: center;
		margin-right:16px;
	}
.me{
		&-list-wrap{
			margin-top:40rpx;
			width: calc(100% - 24px);
			margin:0 auto;
		}
		&-list-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			text-align: left;
			height: 30px;
			border-bottom: 1px solid #ccc;
			padding-bottom: 16px;;
			margin-top:24px;
		}
		&-title{
			flex: 1;
		}
	}
</style>

<style lang="scss" scoped>
	
</style>

