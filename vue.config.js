/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-14 18:17:54
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-31 15:46:22
 * @FilePath: /orz-uniapp-web/vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */ 
module.exports = {  
    transpileDependencies:['uview-ui','@dcloudio/uni-ui'],
    // '/': {
    //     target: 'https://dev.orzcash.com',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/': 'https://dev.orzcash.com'
    //     }
    //   },
	 configureWebpack: {
	 		plugins: []
	 	}
}