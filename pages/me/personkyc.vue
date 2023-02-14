<!--
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 15:08:47
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-14 17:18:42
 * @FilePath: /orz-uniapp/pages/me/personkyc.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view class="">
		11
		<!-- <u--form :model="form" ref="uForm">
			<u-form-item label="姓名" prop="name">
				<u-input v-model="form.name" />
			</u-form-item>
		</u--form> -->
		<!-- <u-button @click="submit">提交</u-button> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入姓名',
						trigger: ['blur', 'change']
					}
				]
			}
		};
	},
	methods: {
		submit() {
			// this.$refs.uForm.validate().then(res => {
			// 	uni.$u.toast('校验通过')
			// }).catch(errors => {
			// 	uni.$u.toast('校验失败')
			// })
		}
	},
};
</script>