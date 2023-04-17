
// const baseUrl = 'https://cdn.zhoukaiwen.com/';
// const baseUrl = 'https://www.zhoukaiwen.com/';
let baseUrl;
import Cookies from 'js-cookie'
// 不带token请求
const httpRequest = (opts, data) => {
	if(opts.type == 2){
		baseUrl = 'https://dev.orzcash.com/';
	}else{
		baseUrl = 'https://dev.orzcash.com/';
	}
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		data: data,
		method: opts.method,
		header: opts.method == 'get' ? {
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		} : {
			'X-Requested-With': 'XMLHttpRequest',
			'Content-Type': 'application/json; charset=UTF-8'
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				resolve(res[1])
			}
		).catch(
			(response) => {
				reject(response)
			}
		)
	})
	return promise
};

//带Token请求
const httpTokenRequest = (opts, data) => {
	if(opts.type == 2){
		baseUrl = 'https://dev.orzcash.com/';
	}else{
		baseUrl = 'https://dev.orzcash.com/';
	}
	uni.onNetworkStatusChange(function(res) {
		if (!res.isConnected) {
			uni.showToast({
				title: '网络连接不可用！',
				icon: 'none'
			});
		}
		return false
	});
	let token = Cookies.get('token') || uni.getStorageSync('token')||'';
	console.log(token,'token');
	// hadToken()
	// if (token == '' || token == undefined || token == null) {
	// 	uni.showToast({
	// 		title: '账号已过期，请重新登录',
	// 		icon: 'none',
	// 		complete: function() {
	// 			uni.reLaunch({
	// 				url: '/pages/login/index1'
	// 			});
	// 		}
	// 	});
	// } else {
		let httpDefaultOpts = {
			url: baseUrl + opts.url,
			data: data,
			method: opts.method,
			header: opts.method == 'get' ? {
				'X-Access-Token': token,
				'X-Requested-With': 'XMLHttpRequest',
				"Accept": "application/json",
				"Content-Type": "application/json; charset=UTF-8"
			} : {
				'X-Access-Token': token,
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json; charset=UTF-8'
			},
			dataType: 'json',
		}
		let promise = new Promise(function(resolve, reject) {
			uni.request(httpDefaultOpts).then(
				(res) => {
					if (res[1].data.code == 200) {
						resolve(res[1])
					} else {
						console.log('90909===',res[1].statusCode)
						if (res[1].statusCode == 5000 || res[1].statusCode == 401) {
							console.log('8080****')
							uni.navigateTo({
								url: '../tn_components/Index/index'
							});
							uni.clearStorageSync();
						} else {
							resolve(res[1])
							// uni.showToast({
							// 	title: '' + res[1].data.message,
							// 	icon: 'none'
							// })
						}
					}
				}
			).catch(
				(response) => {
					reject(response)
				}
			)
		})
		return promise
	// }
	// let token = uni.getStorageSync('token')
	//此token是登录成功后后台返回保存在storage中的

};

// 拦截器
const hadToken = () => {
	let token = uni.getStorageSync('token');

	if (token == '' || token == undefined || token == null) {
		uni.showToast({
			title: '账号已过期，请重新登录',
			icon: 'none',
			complete: function() {
				uni.reLaunch({
					url: '../tn_components/Index/index'
				});
			}
		});
		return false;
	}
	return true
}
export default {
	baseUrl,
	httpRequest,
	httpTokenRequest,
	hadToken
}
