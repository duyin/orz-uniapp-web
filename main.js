/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2022-12-24 18:52:18
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-28 16:33:52
 * @FilePath: /orz-uniapp-web/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App'
import "uview-ui/theme.scss";
// 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom)

import uniDataSelect from './components/uni-data-select/uni-data-select.vue'
Vue.component('uni-data-select', uniDataSelect)
import VueClipBoard from 'vue-clipboard2'
import store from './store'
import i18n from './lang'

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);
Vue.use(VueClipBoard)
// Vue.use(uniDataSelect)
Vue.config.productionTip = false
// set ElementUI lang to EN
Vue.use(uView, {
    // size: Cookies.get('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
  })
App.mpType = 'app'

const app = new Vue({
    ...App,
    store,
    i18n
})
app.$mount()
