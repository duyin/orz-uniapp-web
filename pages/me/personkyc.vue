<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 15:08:47
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-10 10:45:38
 * @FilePath: /orz-uniapp/pages/me/personkyc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="person-wrap">
		<view  class="userForm_subTitle">Client Information From | 客户审查表格</view>
		<div class="userForm_allText">All field are Required 必須填寫全部欄位</div>
		<u--form
				labelPosition="top"
				:model="form"
				:rules="rules"
				ref="form"
				labelWidth="100%"
		>
			<u-form-item
					label="Last Name 姓"
					prop="form.individual.lastName"
					ref="item1"
			>
				<u--input v-model="form.individual.lastName" placeholder="Last Name 姓"></u--input>
			</u-form-item>
			<u-form-item
					label="First Name 名"
					prop="form.individual.firstName"
					ref="item1"
			>
				<u--input v-model="form.individual.firstName" placeholder="First Name 名"></u--input>
			</u-form-item>
			<u-form-item
				label="Country calling code 國際電話區號"
				prop="form.individual.country_calling_code"
				ref="item1"
			>
			<u-radio-group
				v-model="form.individual.country_calling_code"
				placement="column"
			>
				<u-radio
				:customStyle="{marginBottom: '8px'}"
				v-for="(item, index) in countryCallList"
				:key="index"
				:label="item.name"
				:name="item.name"
				
				>
				</u-radio>
			</u-radio-group>
		</u-form-item>
			<u-form-item
					label="Email 電郵"
					prop="email"
					ref="item1"
			>
				<u--input v-model="form.individual.email" placeholder="Email 電郵"></u--input>
			</u-form-item>
			<u-form-item
					label="Mobile No. 手機號碼 e.g. 91234567"
					prop="phoneNumber"
					ref="item1"
			>
				<u--input v-model="form.phoneNumber" placeholder="Mobile No. 手機號碼 e.g. 91234567"></u--input>
			</u-form-item>
			<u-form-item
					label="Mailing Address 通信地址"
					prop="position"
					ref="item1"
			>
				<u--input v-model="form.individual.position" placeholder="Mailing Address 通信地址"></u--input>
			</u-form-item>
			<u-form-item
					label="ID number 證件號碼"
					prop="number"
					ref="item1"
			>
				<u--input v-model="form.individual.document.number" placeholder="ID number 證件號碼"></u--input>
			</u-form-item>
			<u-form-item
					label="Gender 性別 (M/F)"
					prop="form.gender"
					ref="item1"
			>
				<!-- <u--input
						v-model="form.individual.gender"
						disabled
						placeholder="请选择性别"
						
				></u--input> -->
				<uni-data-select
				v-model="form.gender"
				:localdata="actions"
				
			></uni-data-select>
			</u-form-item>
			<u-form-item label="Document type 证件类型" prop="doc_type">
			
					<uni-data-select
						v-model="form.individual.document.type"
						:localdata="typeList"
						
					></uni-data-select>
				
			</u-form-item>
			<u-form-item
					label="Annual income 年收入"
					prop="annualIncome"
					ref="item1"
			>
				<u--input v-model="form.individual.annualIncome" placeholder="Annual income 年收入"></u--input>
			</u-form-item>
			<u-form-item
					label="Occpation 职业"
					prop="occupation"
					ref="item1"
			>
				<u--input v-model="form.individual.occupation" placeholder="Occpation 职业"></u--input>
			</u-form-item>
			<u-form-item
					label="Date of birth 出生日期"
					prop="dateOfBirth"
					ref="item1"
			>
				<uni-datetime-picker type="date" v-model="form.individual.dateOfBirth" />
			</u-form-item>
			<u-form-item
					label="Expiration date of certificate 证件到期时间"
					prop="dateExpiry"
					ref="item1"
			>
				<uni-datetime-picker type="date" v-model="form.individual.document.expiryDate" />
			</u-form-item>
			<u-form-item
				label="Nationality/Region 國籍/地區"
				prop="country"
				ref="item1"
			>
			<u-radio-group
				v-model="form.individual.document.country"
				placement="column"
			>
				<u-radio
				:customStyle="{marginBottom: '8px'}"
				v-for="(item, index) in radiolist1"
				:key="index"
				:label="item.name"
				:name="item.name"
				
				>
				</u-radio>
			</u-radio-group>
		</u-form-item>
			<u-form-item
					label="Your source of funds 你的資金來源"
					prop="source"
					ref="item1"
			>
					<u-checkbox-group
					v-model="form.individual.source"
					placement="column"
					
				>
					<u-checkbox
						:customStyle="{marginBottom: '8px'}"
						v-for="(item, index) in checkboxList1"
						:key="index"
						:label="item.name"
						:name="item.name"
					>
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="Expected trade volume per year 每年預期交易金額" prop="expected_trade_volume">
			
			<uni-data-select
				v-model="form.individual.expected_trade_volume"
				:localdata="yearList"
				
			></uni-data-select>
		
			</u-form-item>
			<u-form-item>
				<view>
					<view class="userForm_allText">ID document 證件圖像</view>
					<view>· Please make sure the image is clear. 請確保圖像清晰</view>
					<view>· Just accept PDF, PNG, JPG and JPEG. 只接受 PDF, PNG, JPG及JPEG</view>
					<view>· Size limit: 10MB. 檔案大小限制是 10MB</view>
					
				</view>
			</u-form-item>
			
			<view class="example-body">
				<uni-file-picker limit="1" title="身份证正面" 
				@select="(e)=>select(e,'front')"
				></uni-file-picker>
			</view>
			<view class="example-body">
				<uni-file-picker limit="1" title="身份证反面" @select="(e)=>select(e,'back')"></uni-file-picker>
			</view>
			<view class="example-body">
				<uni-file-picker limit="1" title="手持身份证" @select="(e)=>select(e,'frontPhoto')"></uni-file-picker>
			</view>
			<u-form-item class="userForm_words">
					<u-checkbox-group v-model="form.individual.ketchup">
						<u-checkbox  class="userFrom-ketchup" />
					</u-checkbox-group>
				I hereby declare and confirm that all information provided in this application form is true, accurate and
                complete to the best of my information, knowledge and belief.
			</u-form-item>
			<view className="userForm_allow">
			  <span>I acknowledge and agree to  </span>
				<a target="_blank" class="userForm_link">
					General terms of anti-money laundering (AML) and counter-financing of terrorism (CFT).
				</a>
				
			</view>
			<view>我特此聲明並確認本申請表中提供的所有資料都是真實，準確和完整的。</view>
			<view class="userForm_allow">
				<span>我明白並同意</span>
				<a target="_blank" class="userForm_link">
					一般反洗錢及防止恐怖份子融資政策。
				</a>
			</view>
			
			<u-form-item class="userForm_words">
				<u-checkbox-group
               v-model="form.individual.ketchupBox"
        >
				<u-checkbox class="userFrom-ketchup-box" />
				</u-checkbox-group>
				I declare that the fiat currency and/or cryptocurrency in the transactions with ORZCash are legally
				obtained, and the exchanged cryptocurrency and/or fiat currency will be legally used.
			</u-form-item>

			<view>本人謹此聲明，與ORZCash的法定貨幣及/或加密貨幣為合法所得，所兌換成的加密貨幣及/或法定貨幣亦是作合法所用。</view>
			<u-button @click="submit">提交</u-button>
		</u--form>
	
	</view>
</template>

<script>
import request from '@/common/request.js';
import { compress } from '@/common/ImageCompression';
import { pathToBase64, base64ToPath } from 'image-tools'
export default {
	data() {
		return {
		
			showSex: false,
			fileList:[],
			fileList6:[],
			
			form:{
				name: "",
				phoneNumber:"",
				identityType:"",
				gender:'',
				individual:{
					dateOfBirth: "",
					firstName: "",
					lastName:"",
					annualIncome:"",
					email:"",
					occupation: "",
					position:"",
					country_calling_code:'',
					document:{
						type: "",
						front: "",
						back: "",
						frontPhoto:'',
						number: "",
						country: "",
						expiryDate: ""
					}
			    },
			    accountType: "prepaid",
				currency:"USD"
			},
			countryCallList:[{
				name: '852',
				disabled: false
			},
				{
				name: '853',
				disabled: false
				},
				{
				name: '86',
				disabled: false
				}, {
				name: 'Other 其他',
				disabled: false
				}
			],
			radiolist1: [{
				name: 'Hong Kong 香港',
				disabled: false
			},
				{
				name: 'Macau 澳門',
				disabled: false
				},
				{
				name: 'Mainland China 中國大陸',
				disabled: false
				}, {
				name: 'Other 其他',
				disabled: false
				}
			],
			checkboxList1: [{
                    name: 'Salary 薪金',
                    disabled: false
                },
                {
                    name: 'Properties income 物業收入',
                    disabled: false
                },
                {
                    name: 'Savings 儲蓄',
                    disabled: false
                },
				{
                    name: 'Company profits 公司利潤',
                    disabled: false
                },
				{
                    name: 'Personal investment profits 個人投資利潤',
                    disabled: false
                },
				{
                    name: 'Others 其他',
                    disabled: false
                }
            ],
			typeList:[
			  { value: 'passport', text: "passport" },
			  { value: 'drivers-license', text: "drivers-license" },
			  { value:'national-id', text: "national-id" },
			],
			yearList:[
			  { value: 'HKD 0 - 200,000', text: "HKD 0 - 200,000" },
			  { value: 'HKD 200,001 - 600,000', text: "HKD 200,001 - 600,000" },
			  { value:'HKD 600,001 - 1,000,000', text: "HKD 600,001 - 1,000,000" },
			],
			actions: [{
				text: 'M',
				value: 'M', 
				},
				{
					text: 'F',
					value: 'F', 
				}
			],
			rules: {
				last_name: [{
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				}],
				first_name:[{required: true}],
				email:[{required: true}],
				phone_number:[{required: true}],
				position:[{required: true}],

				doc_number:[{required: true}],
				annual_income:[{required: true}],
				occupation:[{required: true}],
				country:[{required: true}],
				country_calling_code:[{required: true}],
				gender: [{
					type: 'string',
					max: 1,
					required: true,
					message: '请选择男或女',
					trigger: ['blur', 'change']
				}],
			},
			radio: '',
			switchVal: false
			
		};
	},
	mounted() {
		// uni.showLoading({
		// 	title: 'loading...',
		// 		// mask: true
		// 	})
	},
	methods: {
		sexSelect(e) {
			this.form.sex = e.name
		},
		// 获取上传状态
		select(e,type){
			const blob = e.tempFilePaths[0]
			const that = this;
			switch(type){
				case 'front':
			     pathToBase64(blob)
				.then(base64 => {
					that.form.individual.document.front = base64
				}).catch(error => {
					console.error(error)
				})
				break
				case 'back':
			
				pathToBase64(blob)
				.then(base64 => {
					compress(base64, 1.5, (res) => {
						that.form.individual.document.back = res
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
							that.form.individual.document.frontPhoto = result
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
    font-size: 16px;
  
	margin:5px auto;
	padding-left:14px;
  }
  &_subTitle{
    font-size:18px;
	font-weight: bold;
    text-align: center;
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
    cursor:pointer;
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
		width: calc(100% - 40px);
		margin:24px auto
	}
}
::v-deep{
	.u-form-item__body__right__content__slot{
		align-items: flex-start;
	}
}
</style>