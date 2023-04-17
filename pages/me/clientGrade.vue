<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 15:08:47
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-30 00:28:23
 * @FilePath: /orz-uniapp/pages/me/personkyc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="person-wrap">
		<view class="client-header">
			<!-- <view class="client-leftward">
				<u-icon name="arrow-leftward" color="#fff" class="client-leftwardImg"></u-icon>
			</view>
			 -->
		</view>
		<view class="client-main">
		    <view class="client-success">
               <view class="client-success-image"></view>
			   <view class="client-congratulations">Congratulations</view>
			   <view class="client-apply">我们已经收到你的申请</view>
			   <view class="client-card"></view>
			   <view class="client-box">
				 <view class="client-main-title">
					<text>你的用户等级为</text>
					<text>LV 10</text>
				 </view>
				 <view class="client-metal">金属卡用户将享受 xxxxx</view>
				 <view  class="client-metal">卡费为 500U</view>
			   </view>
			   <view class="client-willing">是否愿意支付 500 U 获取金属卡</view>
			   <view class="client-pay-btn">Pay 500U</view>
			   <view class="client-continue">继续申请免费卡<u-icon name="arrow-rightward" color="#444444" size="16"></u-icon></view>
			</view>

		
		</view>
	</view>
</template>

<script>
import request from '@/common/request.js';
export default {
	data() {
		return {
		
			
			
		};
	},
	mounted() {
		// uni.showLoading({
		// 	title: 'loading...',
		// 		// mask: true
		// 	})
	},
	methods: {
	
		async submit() {
			console.log(this.form,'ff',this)
	
			uni.showLoading({title: 'loading...'})
			
	
			const opt = {
				url: 'api/user/kyc',
				method: 'post',
			}
			this.form.phoneNumber = '+'+this.form.individual.country_calling_code+this.form.phoneNumber;
			const {data} = await request.httpTokenRequest(opt,this.form)
			console.log(data,'data======')
			uni.hideLoading()
			console.log('成功！')
			uni.navigateTo({
				url: '../../pages/index/tabbar'
			})
			// this.$refs.form1.validate().then(async res => {
			// 	const {data} = await request.httpTokenRequest(opts,params)
			// 	uni.$u.toast('校验通过')
			// }).catch(errors => {
			// 	uni.$u.toast('校验失败')
			// })
		}
	},
};
</script>
<style lang="scss" scoped>

.client{
	
	&-header{
		width: 100%;
		height: 400px;
		position: absolute;
		top:0;
		background: url('../../static/home/uni-header.png') no-repeat;
		background-size: 100% 100%;
	}
	&-main{
		width: calc(100%);
		padding:0 25px 40px;
	    margin-top: 90px;
		height: 100vh;
	background: rgba(255,255,255,0.21);
		// position: absolute;
		bottom: 0;
		box-shadow: 0px 0px 11px 0px rgba(121,170,218,0.15);
		border-radius: 40px 40px 0px 0px;
		border: 1px solid #FFFFFF;
		backdrop-filter: blur(10px);
	}
	&-radio-label{
		margin-top:24px;
		font-weight: bold;
       color: #1F1423;
	}
	&-radio-label:last-child{
		border-bottom: 0;;
	}
	&-Income{
		padding-top:22px;
		display: flex;
		align-items: center;
	}
	&-step-number{
		width: 27px;
		height: 27px;
		background: linear-gradient(270deg, #A7CFFF 0%, #97FFE0 100%);
		margin-right:10px;
		border-radius: 50%;
		line-height: 27px;
		font-weight: bold;
		font-size: 16px;
		text-align: center;
	}
	&-step-title{
		font-weight: bold;
		font-size: 20px;
	}
	/***** suc *****/
	&-success{
      display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	&-success-image{
		width: 100px;
		height: 100px;
		margin-top:47px;
		background: url('../../static/home/client-image.png') no-repeat;
		background-size: 100% 100%;
	}
	&-congratulations{
		font-size: 21px;
		font-weight: bold;
		color: #1F1423;
		padding-top:18px;
	}
	&-apply{
		font-weight: 300;
        color: #9C9C9C;
		padding-top:5px;
	}
	&-card{
		width: 178px;
		height: 122px;
		margin-top:48px;
		background: url('../../static/home/client-card.png') no-repeat;
		background-size: 100% 100%;
	}
  &-box{
	width: 325px;
	height: 139px;
	background: linear-gradient(270deg, #A7CFFF 0%, #97FFE0 100%);
	border-radius: 12px;
	margin-top:37px;
	padding:27px;
  }
  &-main-title{
	padding-bottom: 16px;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #979797;

  }
  &-metal{
	margin:8px auto 0;
	font-weight: bold;
  }
  &-willing{
	font-size: 16px;
	margin-top:32px;
	font-weight: 500;
	color: #1F1423;
  }
  &-pay-btn{
	height: 44px;
	background: #1F1423;
	border-radius: 12px;
	font-weight: bold;
	color: #FFFFFF;
	font-size: 16px;
	margin-top:10px;
	width: 100%;
	text-align: center;
	line-height: 44px;;
  }
  &-continue{
	margin:23px auto 35px;
	display: flex;
	font-weight: 500;
color: #1F1423;
	border-bottom: 1px solid #1F1423;
  }
}
.userForm{
  &_header{
    width: 100%;
    height: 25rem;
    // background: url('@/assets/clientkyc/userfrom_head.jpg') no-repeat;
    background-size:100% 100%;
    max-width: 1920px;
    margin:0 auto;
  }
  &_box{
    padding-top:24px;
    background:#fff;
    height:100%;
    color:#000;
    font-size: 14px;

  }
  &_allText{
    font-size: 26px;
    font-weight: bold;
	
	padding-left:25px;
  }
  &_subTitle{
    font-size:26px;
	font-weight: bold;
    padding-left:25px;
	padding-top:31px;
  }
  &_container{
    width: 80%;
    margin:24px auto;
    padding-bottom:24px;

  }

  &_alRequiredText{
    color:#faad14!important;
    line-height: 18px;
    margin-bottom: 10px;
  }
  &_phone_box{
    display: flex;
    flex-direction: row;
  }
  &_vilify{
    width: 200px;
    margin:0 24px;
  }
  &_phoneNumber{
    flex:1;
  }
  &_vilify_text{
    cursor:pointer;

  }
  &_datepicker{
    width:100%;
  }
  &_datepicker_time{
    width:100%;
  }
  &_words{
    word-break: break-all;
  }
  &_link{
    color:#1e80ff
  }
  &_allow{
    display:flex;
    flex-wrap: wrap;
  }
  &_allow_text{
    display:flex;
  }
  &_fileBox{
    // display: flex;
    // align-items: center;
    p{
      margin-right: 16px;;
      display: flex;
    justify-content: center;
    align-items: center;
    }

  }
  &_initBtnBox{
    display:flex;
  }
  &_initBtn{
    color: #fff;
    background-color: #8C1BFF;
    // box-shadow: 0 2px 0 rgb(5 145 255 / 10%);
    height: 40px;
    padding: 6px 40px;
    border-radius: 8px;
    cursor:pointer;
    margin-left:5px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &_sauces2{
    color:#800;
  }

  &_companyImg{
    width: 148px;
    height: 148px;
    object-fit: contain;
    border-radius:6px;

  }
  /*** upload ***/
  &_upload{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    cursor: pointer;
    line-height: 146px;
    // vertical-align: top;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    input[type='file']{
      width: 148px;
      height: 148px;
      position:absolute;
      left:0;
      top:0;
      font-size:0;
      opacity: 0;
      border:0;
    }
  }
  &_companyCase{
    width: 200px;
    height: 200px;
    text-align:center;
    position:relative;
    margin:8px 0;
    &:hover{
      .userForm_companyFile{
        opacity: 1;
      }
    }
  }
  &_companyFile{
    width: 200px;
    height: 200px;
    position:absolute;
    top:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius:6px;
    z-index:99;
    background-color: rgba(0,0,0,.5);
    opacity: 0;
  }
  &_companyMagnifying{

    height:30px;
    width:30px;
    // background: url('@/assets/clientkyc/magnifying.png') no-repeat;
    background-size:100% 100%;
    z-index:9;
    cursor: pointer;
    margin-right: 16px;

    margin-top: 3px;

  }
  &_deleteFile{
    height:30px;
    width:30px;
    // background: url('@/assets/clientkyc/delete.png') no-repeat;
    background-size:100% 100%;
    z-index:9;
    cursor:pointer;
  }
//   &_upload_plus{
//     font-size: 28px;
//     color: #8c939d;
//     display:inline-block;
//     height:32px;
//     width:32px;
// 	margin:0 auto;
// 	::v-deep{
// 		.uicon-plus{
// 			font-size: 32px!important;
// 		}
// 	}
	
    

//   }
  &_dialog_main{
    z-index:100;
  }
  &_dialog_content{

  }
  &_diaMagnifyImg{
    width:100%;
    height:100%;
    object-fit: contain;
  }
  &_companyImgBox{
    display:flex;
    flex-wrap: wrap;
  }
}

.person{
	&-wrap{
		width: calc(100%);
		// height: 100vh;
	    display: flex;
	 flex-direction: column;
	}
}
::v-deep{
	.u-form-item__body__right__content__slot{
		align-items: flex-start;
	}
		.file-count{
			display: none!important;
		}
		.icon-add{
			
		}
}
</style>