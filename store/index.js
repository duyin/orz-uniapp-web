/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-07 16:12:00
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-08 12:27:58
 * @FilePath: /node_staking/src/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
// import app from './modules/app'
// import user from './modules/user'
// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
Vue.use(Vuex)
console.log(modules,'modules')
const store = new Vuex.Store({
    modules,
    getters
})

export default store
