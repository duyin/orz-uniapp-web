<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-13 19:47:13
 * @FilePath: /orz-uniapp/pages/index/news.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!-- TabBar 文章资讯 -->
<template>
	<view class="conversion-wrap">
		<view class="conversion-header">
			兑换
		</view>
		<view class="conversion-tabs-wrap">
           <view class="conversion-tabs-title">买卖外币和数字资产</view>
		   <view class="conversion-tabs-box">
			<!-- <u-sticky> -->
				<u-tabs :list="list1" :current="count" @change="clickHandle" class="conversion-tabs-list"></u-tabs>
			<!-- </u-sticky> -->
		   </view>
		</view>
		<view class="conversion-comeIn">
           <view>买入</view>
		   <view class="conversion-comeIn-box">
				<view class="conversion-uni-select-box">
				<uni-data-select
				    class="conversion-uni-select-box"
					v-model="value"
					:localdata="comeInList"
					@change="changeHandle"
					/>
				</view>
					<view>
					<view>100</view>
					<view>数字资产账户</view>
				</view>
		   </view>
		</view>
		<view class="conversion-sale">
			<view>卖出</view>
			<view  class="conversion-comeIn-box">
				<view class="conversion-uni-select-box">
				<uni-data-select
				    class="conversion-uni-select-box"
					v-model="value2"
					:localdata="comeInList"
					@change="changeHandle"
					/>
				</view>
				<view>
					<view>794.28</view>
					<view>香港账户</view>
				</view>
		   </view>
		</view>
		<view class="conversion-footer">
			<view class="conversion-footer-item">
				<text>金额</text>
				<text>794.28 HKD -> 100.000000 USDT</text>
			</view>
			<view class="conversion-footer-item">
				<text>报价</text>
				<text>1 USDT = 7.942828 HKD</text>
			</view>
			<view class="conversion-footer-item">
				<text>2023-1-31 17:27:59</text>
				<text>1 USDT = 1.000000 USD</text>
			</view>
		</view>
		<view class="conversion-enough">您没有足够的HKD购买USDT，您最多可以卖出0HKD。</view>
		<view class="conversion-comeUse">买入 100 USDT</view>
		<view>*当您确认做出买入/卖出的指示时，即表示您将以供应商提供的价格执行兑换，并同意承担相关风险。</view>
		<view style="width: 1rpx;height: 150rpx;"></view>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	import uniDataSelect from '@/components/uni-data-select/uni-data-select.vue';
	console.log(uniDataSelect,'uniDataSelect')
	export default {
		data() {
			return {
				count:0,
				 list1: [{
                    name: '买入',
                }, {
                    name: '卖出',
                }],
				value:'',
				value2:'',
				comeInList:[
				{ value: 0, text: "USDT" },
				{ value: 1, text: "USDT1" },
				{ value: 2, text: "USDT2" },
				]
			};
		},
		components:{uniDataSelect},
		mounted() {
			
		},
		filters: {
			formatDate(value) {
				if (value == undefined) {
					return;
				}
				// let date = new Date(value * 1000);
				let date = new Date(value);
				//时间戳为10位需*1000，时间戳为13位的话不需乘1000
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM; //月补0
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d; //天补0
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h; //小时补0
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m; //分钟补0
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s; //秒补0
				// return y + '-' + MM + '-' + d; //年月日	 + ' ' + h + ':' + m
				return y + '-' + MM + '-' + d; //年月日时分秒
			}
		},
		methods: {
			clickHandle(key){
				console.log(key);
				this.count = key
			},
			changeHandle(){

			}
		}
	}
</script>

<style lang="scss" scoped>
.conversion{
	&-wrap{
		width: calc(100% - 24px);
		margin:0 auto
	}
	&-header{
		padding:24px;
		text-align: center;
	}
	&-tabs-wrap{
		margin-top:24px;
	}
	&-tabs-box{
		margin-top:16px;
	}
	&-tabs-list{
		background: none !important;
	}
	&-footer{
		width: calc(100% - 24px);
		margin:24px auto 0;
	}
	&-footer-item{
		display: flex;
		justify-content: space-between;
	}
	&-uni-select-box {
		width: 150px;
		margin: 8px 0;
		
	}
	&-comeIn,&-sale{
		border:1px solid #ccc;
		border-radius: 8px;
		padding: 12px;
		margin-bottom:12px;
	}
	&-comeIn-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	&-enough{
		text-align: center;
		margin-top: 24px;
		color:red;
	}
	&-comeUse{
		width: 361px;
		height: 43px;
		border-radius: 20px;
		background-color: rgba(8, 8, 8, 1);
		text-align: center;
		line-height: 43px;
		margin:24px auto;
		color:#fff;
	}
}
</style>
