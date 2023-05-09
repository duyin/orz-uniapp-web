<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 15:08:47
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-04-06 18:00:39
 * @FilePath: /orz-uniapp/pages/me/personkyc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="person-wrap">
		<view class="client-header">
			<view class="client-leftward" @tap="backHandle">
				<u-icon name="arrow-leftward" color="#fff" class="client-leftwardImg"></u-icon>
			</view>
			<view  class="userForm_subTitle">Apply for</view>
		     <view class="userForm_allText">ORZ mastercard</view>
		</view>
		<view class="client-main">
			<u--form
					labelPosition="top"
					:model="form"
					:rules="rules"
					ref="form"
					labelWidth="100%"
			>
				<u-form-item>
					<view class="client-Income">
						<view class="client-step-number">1</view>
						<view class="client-step-text">
							<view class="client-step-title">Income</view>
							<view>Provide your Annual Crypto Income</view>
						</view>
					</view>
				</u-form-item>
				<u-form-item
					label=""
					prop="userLevel"
					ref="item1"
				>
				<u-radio-group 
				v-model="form.userLevel"
				    iconPlacement="right" 
					placement="column"
					borderBottom
					>
				<u-radio 
				        class="client-radio-label"
				        activeColor="#1F1423" 
				        v-for="(item, index) in countryCallList"
						:key="index"
						:label="item.name"
						:name="item.value"
						></u-radio>
			</u-radio-group>
					
				</u-form-item>
				
				<u-form-item>
					<view class="client-Income">
						<view class="client-step-number">2</view>
						<view class="client-step-text">
							<view class="client-step-title">Passport</view>
						</view>
					</view>
				</u-form-item>
			
				<u-form-item class="example-body" prop="front">
					<uni-file-picker limit="1" class="client-file-picker" :sizeType='compressedList' 
						@select="(e)=>select(e,'front')"
						>
						<view class="client-picker-content">
							<view class="client-uploader"></view>
							<view class="client-picker-text">Upload</view>
						</view>
					</uni-file-picker>
					<!-- <uni-file-picker limit="1" class="client-file-picker" :sizeType='compressedList' 
						@select="(e)=>select(e,'end')"
						>
						<view class="client-picker-content">
						<view class="client-camera"></view>
						<view class="client-picker-text">Take a photo</view>
					</view>
					</uni-file-picker> -->
				</u-form-item>
				<u-form-item>
					<view class="client-Income">
						<view class="client-step-number">3</view>
						<view class="client-step-text">
							<view class="client-step-title">Persona</view>
							<view>Contact number for control the card</view>
						</view>
					</view>
				</u-form-item>
				<u-form-item prop="SurName" label="SurName">
					<u--input v-model="form.SurName" placeholder=""></u--input>
				</u-form-item>
				<u-form-item prop="FirstName" label="First Name">
					<u--input v-model="form.FirstName" placeholder=""></u--input>
				</u-form-item>
				<u-form-item prop="phoneNumber" label="Contacr number for control the card">
					<uni-data-select
					class="client-phoneAreaList"
						v-model="form.phoneNumber"
						:localdata="phoneAreaList"
						:clear="false"
					></uni-data-select>
					<u--input v-model="form.phoneAddress" type="number" placeholder="" class="client-phone"></u--input>
				</u-form-item>
				<view class="client-step-title">Mailling Address</view>
				<u-form-item prop="mailingCountry">
					<uni-data-select
					    class="client-phoneAreaList1"
						v-model="form.mailingCountry"
						:localdata="postionList"
						:clear="false"
					></uni-data-select>
				
				</u-form-item>
				<u-form-item prop="address" label="address">
					<u--input v-model="form.address" placeholder="" ></u--input>
				</u-form-item>
				<u-form-item>
					<u-form-item prop="State" label="State">
					<u--input v-model="form.State"  placeholder=""></u--input>
					</u-form-item>
					<u-form-item prop="Country" label="Country"  class="client-phone-country">
						<u--input v-model="form.Country" placeholder=""  ></u--input>
					</u-form-item>
				</u-form-item>
			
				<!-- <u-button @click="submit">提交</u-button> -->
				<view class="orz-btn" @click="submit">Submit</view>
			</u--form>
		</view>
	
	</view>
</template>

<script>
import request from '@/common/request.js';
import { compress } from '@/common/ImageCompression';
import { pathToBase64, base64ToPath } from 'image-tools'

export default {
	data() {
		return {
		    userId:'',
			showSex: false,
		
			fileList:[],
			compressedList:['compressed'],
			fileList6:[],
			postionList:[],
			phoneAreaList:[],
			form:{
				"userId":'',
				"name":"",
				"Country":'',
				"SurName":'',
				"FirstName":'',
				"phoneNumber":"",
				"cryptoIncome":"",
				"userLevel":"", 
				"passPort":{
					"front":"",
					"back":""
				},
				"zipCode":"",
				"phoneAddress":'',
				"phoneCountry":"",
				"mailingCountry":"",
				"address":"",
			},
			countryCallList:[{
				name: 'A. Less than 1,000$',
				value:'A',
				disabled: false
			},
				{
				name: 'B. 1,000$ - 9,999$',
				value:'B',
				disabled: false
				},
				{
				name: 'C. 10,000$ - 99,999$',
				value:'C',
				disabled: false
				}, {
				name: 'D. 100,000$ and more',
				value:'D',
				disabled: false
				}
			],
			
			rules: {
				userLevel:[{required: true,trigger:'change'}],
				phoneNumber:[{required: true,trigger:'blur,change'}],
				mailingCountry:[{required: true,trigger:'blur,change'}],
				Country:[{required: true,trigger:'blur'}],
				SurName:[{required: true,trigger:'blur'}],
				FirstName:[{required: true,trigger:'blur'}],
				zipCode:[{required: true,trigger:'blur'}],
				State:[{required: true,trigger:'blur'}],
				address:[{required: true,trigger:'blur'}],
				// front:[{required: true,trigger:'change'}],
			},
			radio: '',
			switchVal: false
			
		};
	},
	
	mounted() {
	  this.getCityList();
	 this.getUserInfo()
	  this.form.userLevel = ''
	},
	methods: {
		sexSelect(e) {
			this.form.sex = e.name
		},
		
		backHandle(){
			uni.navigateTo({
				url: '../../tn_components/Index/index'
			})
		},
		// 获取上传状态
		select(e,type){
			const blob = e.tempFilePaths[0]
			const that = this;
			switch(type){
				case 'front':
			     pathToBase64(blob)
				.then(base64 => {
					that.form.passPort.front = base64
				}).catch(error => {
					console.error(error)
				})
				break
				case 'back':
				pathToBase64(blob)
				.then(base64 => {
					compress(base64, 1.5, (res) => {
						that.form.passPort.back = res
						console.log(this.form)
						});
				}).catch(error => {
					console.error(error)
				})
				break
				case 'frontPhoto':
					pathToBase64(blob)
					.then(base64 => {
						compress(base64, 1.5, (result) => {
							that.form.passPort.frontPhoto = result
							});
					})
					break
			}
			console.log('选择文件：',e,e.tempFilePaths[0])
			
        },
        // 原理：利用fileReader的readAsDataURL，将blob转为base64
			blobToBase64(blob) {
			return new Promise((resolve, reject) => {
				const fileReader = new FileReader();
				fileReader.onload = (e) => {
				resolve(e.target.result);
				};
				// readAsDataURL
				fileReader.readAsDataURL(blob);
				fileReader.onerror = () => {
				reject(new Error('文件流异常'));
				};
			});
		
				
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},
			
			// 上传成功
			success(e){
				console.log('上传成功')
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			},
		async getCityList(){
			const opt = {
				url: 'api/region/list',
				method: 'get',
			}
			 const {data} = await request.httpTokenRequest(opt)
			 let arr = []
			 let postionArr = []
			 data.result.map(item=>{
				arr.push({text:item.phoneCode,value:item.phoneCode})
				postionArr.push({text:item.regionEN,value:item.regionEN})
			 })
			 this.phoneAreaList = arr
			 this.postionList = postionArr
			 console.log(this.phoneAreaList )
		},
		async getUserInfo(){
			console.log('9099=====>')
			const opt = {
				url: 'api/user/info',
				method: 'post',
			}
			const {data} = await request.httpTokenRequest(opt)
		    console.log(data)
			this.userInfo = data.result
		     this.userId =  data.result.id
			// if(status==4||status==2){
			// 	uni.navigateTo({
			// 		url: '../../pages/cardoverview/index'
			// 	})
			// 	return
			// }else{
			// 	uni.navigateTo({
			// 	url: '../../pages/me/clientApplyKyc'
			// })
			// }
		},
		async submit() {
			const that = this;
			const opt = {
				url: 'api/user/kyc',
				method: 'post',
			}
			// if(!this.form.passPort.front){
			// 	uni.$u.toast('请上传图片!');
			// 	return
			// }
			// if(!this.form.phoneAddress){
			// 	uni.$u.toast('phoneAddress is required!');
			// 	return
			// }
			// if(!this.form.address){
			// 	uni.$u.toast('address is required!');
			// 	return
			// }
			//uni.showLoading({title: 'loading...'})
			that.form.userId = this.userId
		   this.form.phoneNumber= this.form.phoneNumber+' '+this.form.phoneAddress
		  
			// const {data} = await request.httpTokenRequest(opt,this.form)
			// const {data} = await request.httpTokenRequest(opt,that.form)
			// 	console.log(data)
			console.log(this.$refs.form)
			this.$refs.form.validate().then(async (res) => {
				console.log(res,'res')
				if(!res) return;
				uni.showLoading({title: 'loading...'})
				const {data} = await request.httpTokenRequest(opt,that.form)
				console.log(data)
				if(data.code!==200){
					uni.$u.toast(data.message)
					return;
				}
			    uni.$u.toast('校验通过')
				// uni.navigateTo({
				// 	url: '../../pages/cardoverview/index'
				// })
				this.$refs.form.resetFields()
				this.form.address = '';
				this.form.phoneAddress = '';
				uni.hideLoading()
				uni.navigateTo({
					url: '../../pages/cardoverview/index'
				})
			})
		}
	},
};
</script>
<style lang="scss" scoped>
.client-phone-country{
	margin-left:5px;
}
.orz-btn{
    // padding: 8px 16px;
    text-align: center;
    margin: 16px auto;
	height: 44px;
	line-height: 44px;
    border:1px solid #ccc;
    border-radius: 8px;;
    background: #000;
	font-weight: bold;
    color:#fff;
}
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
	    margin-top: 200px;
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
	&-phoneAreaList{
		width: 80px;
	}
	&-address{
		margin-bottom:24px;
	}
	&-Mailling{

	}
	&-phone{
		margin-left:24px;
	}
	&-picker-content{
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	&-file-picker{
		// width: 180px;
		// height: 180px;;
		::v-deep{
			.uni-file-picker__container{
				height: 150px;
				
			}
			.file-picker__box{
				width: 150px;
                height: 100%!important;;
			}
			.file-picker__box-content{
				background: #EFEEF3;
				border-radius: 20px!important;
				width: 150px;
			}
		}
	}
	&-leftwardImg{
		margin-top:58px;
		width: 51px;
		height: 32px;
		background: #1F1423;
		border-radius: 13px;
		line-height: 32px;
		text-align: center;
		margin-left:25px;
		font-size: 14px;
		display: flex;
    color: #fff;
    justify-content: center;
	}
	&-uploader{
		height: 50px;
		width: 50px;
		margin: 0 auto;
		background: url('@/static/home/uploadImg.png') no-repeat;
		background-size:contain;
	}
	&-camera{
		height: 50px;
		width: 50px;
		background: url('@/static/home/camera.png') no-repeat;
		background-size:contain;
		margin: 0 auto;
	}
	&-picker-text{
		padding-top:8px;
		font-weight: bold;
color: #3B3B3B;
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