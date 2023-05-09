/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-07 16:12:00
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-03-01 16:17:58
 * @FilePath: /node_staking/src/store/modules/app.js
* @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Cookies from 'js-cookie'
import { getLanguage } from '@/lang/index'
const state = {
    device: 'desktop',
    openNav: false,
    token:Cookies.get('token')||'',
    userInfo:uni.getStorageSync('userInfo')||{},
    language: getLanguage()
};
const mutations = {

    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    TOGGLE_NAV: (state, value) => {
        state.openNav = value
    },
    SET_TOKEN: (state, token) => {
        Cookies.set('token', token)
    },
    SET_LANGUAGE: (state, language) => {
        state.language = language
        Cookies.set('language', language)
    },
    SET_CONNECT_ADDRESS:(state, address)=> {
        state.connectAddress = address
    },
    SET_USERINFO:(state, userInfo)=> {
        state.userInfo = userInfo
    }
};
const  actions = {
    toggleDevice({commit}, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setLanguage({ commit }, language) {
     commit('SET_LANGUAGE', language)
    },
    toggleNav({commit}, value) {
        return  new Promise((resolve,reject)=>{
            commit('TOGGLE_NAV', value)
            resolve()
        })
    },
    setToken({ commit }, token) {
        commit('SET_TOKEN', token)
     },
    setConnectAddress({commit}, address) {
        commit('SET_CONNECT_ADDRESS', address)
    },
    setUserInfo({commit}, userInfo) {
        commit('SET_USERINFO', userInfo)
    },
}

 export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
