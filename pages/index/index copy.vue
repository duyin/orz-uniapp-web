<!-- 首页 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">首页</block>
		</cu-custom>

		<!-- <add-tip :tip="tip" :duration="duration" /> -->
		<view class="header">
			<view class="prepaid-title">Prepaid Card Account</view>
			<view class="prepaid-account">卡账户余额（HKD）</view>
			<view class="prepaid-money">0.00 HKD</view>
		</view>
		<!-- banner图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500"
						duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.imageUrl" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="transfer-wrap">
          <view v-for="item in transferList">{{ item.name }}</view>
		</view>
		<view class="home-footer">
           <view class="home-footer-title">交易记录</view>
		   <view v-for="item in transferKycList">
              <view class="list-item">
				 <view>
					<view>{{ item.firstTitle }}</view>
					<view>{{ item.time }}</view>
				 </view>
				 <view>
					{{ item.account }}
				 </view>
			  </view>
		   </view>
		</view>
		<!-- 流量主-腾讯广告 -->
		<!-- <ad unit-id="adunit-961458988ac9ad8b" ad-intervals="30"></ad> -->

		<!-- 导航栏 -->


		<view style="height: 140rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
	import request from '@/common/request.js';
	import addTip from '../../components/wxcomponents/struggler-uniapp-add-tip/struggler-uniapp-add-tip.vue';
	export default {
		components: {
			addTip
		},
		data() {
			return {
				tip: '点击「添加小程序」，下次访问更便捷',
				duration: 1,

				scrollTop: 0,
				old: {
					scrollTop: 0
				},

				bannerList: [{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner3.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner1.png'
					},
					{
						imageUrl: 'https://cdn.zhoukaiwen.com/zjx_banner2.png'
					}
				],
				transferList:[
					{
						img:'',
						name:'充值'
					},
					{
						img:'',
						name:'转账'
					},
					{
						img:'',
						name:'跨境速汇'
					},
					{
						img:'',
						name:'账单'
					}
				],
				transferKycList:[
					{
						img:'',
						firstTitle:'KFC - SHOP 197 TSIMSHATSUI HKG',
						time:'2023-1-31 00:46:47',
						account:'69.00HKD'
					},
					{
						img:'',
						firstTitle:'KFC - SHOP 197 TSIMSHATSUI HKG',
						time:'2023-1-31 00:46:47',
						account:'69.00HKD'
					},
					{
						img:'',
						firstTitle:'KFC - SHOP 197 TSIMSHATSUI HKG',
						time:'2023-1-31 00:46:47',
						account:'69.00HKD'
					},
					{
						img:'',
						firstTitle:'KFC - SHOP 197 TSIMSHATSUI HKG',
						time:'2023-1-31 00:46:47',
						account:'69.00HKD'
					}
				]
			};
		},
		watch: {},
		mounted() {
			console.log(this.projectList);
			// this.getData();
			
			
			// 在页面中定义插屏广告
			let interstitialAd = null
			
			// 在页面onLoad回调事件中创建插屏广告实例
			
			// 在适合的场景显示插屏广告
			if (interstitialAd) {
			  interstitialAd.show().catch((err) => {
			    console.error(err)
			  })
			}
			// 插屏广告结束
		},
		methods: {
			getData() {
				console.log('数据加载');
				let opts = {
					url: 'api/project/list',
					method: 'get'
				};
				uni.showLoading({
					title: '加载中'
				});
				request.httpRequest(opts).then(res => {
					console.log(res);
					uni.hideLoading();
					// if (res.statusCode == 200) {
					// 	this.projectList = res.data.data;
					// } else {
					// 	this.projectList = [];
					// }
				});
			},
			scroll: function(e) {
				console.log(e);
				this.old.scrollTop = e.detail.scrollTop;
			},
			goCategorieslist: function(e) {
				// console.log(e.currentTarget.dataset.mid)
				if (e.currentTarget.dataset.mid == 1 || e.currentTarget.dataset.mid == 2) {
					uni.navigateTo({
						url: '../timeline?mid=' + e.currentTarget.dataset.mid
					});
				} else if (e.currentTarget.dataset.mid == 3) {
					uni.navigateTo({
						url: '../../os_project/index'
					});
				} else if (e.currentTarget.dataset.mid == 4) {
					this.$emit('ShowNews', 'news')
					console.log('文章资讯')

				}
			},
			goProjectList() {
				uni.navigateTo({
					url: '../project/list'
				});
			},
			goProject(id) {
				uni.navigateTo({
					url: '../project/project?id=' + id
				});
			},
			goVideo() {
				uni.navigateTo({
					url: '../video'
				});
			},
			goAboutUs(){
				uni.navigateTo({
					url: '../me/about_us'
				})
			}
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
			},
		},
	};
</script>
<style lang="scss" scoped>
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
	.header{
		padding:24px;
	}
	.transfer-wrap{
		display: flex;
		margin-top:40px;
		justify-content: space-around;
	}
	.home-footer{
		width: calc(100% - 24px);
		margin:24rpx auto;
	}
	.home-footer-title{
      padding-bottom:16px;
	}
	.list-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom:16px;
		border-bottom:1px solid #ccc;
		padding-bottom:8px;
	}
</style>
