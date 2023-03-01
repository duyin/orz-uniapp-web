/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-07 16:12:00
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-08 12:26:10
 * @FilePath: /node_staking/src/store/modules/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


 const  state =  {
        account: window.sessionStorage.getItem('account') || '',
    };
  const mutations = {
        SET_ACCOUNT: (state, token) => {
            window.sessionStorage.setItem('account',token)
            state.account = token
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
        },
        SET_RATE: (state, val) => {
            state.rate = val
        }
    }
    const actions = {
        setUserInfo({commit}, userInfo) {
           commit('SET_USERINFO', userInfo)
        },
        setAccount({commit}, token) {
           commit('SET_ACCOUNT', token)
        },
        setRate({commit}, val) {
         commit('SET_RATE', val)
        }
    };
export default {
    namespaced: true,
    state,
    actions,
    mutations
  }
  

