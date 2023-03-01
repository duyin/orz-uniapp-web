/*
 * @Author: 杜印 m18612326243@163.com
 * @Date: 2023-02-07 16:12:00
 * @LastEditors: 杜印 m18612326243@163.com
 * @LastEditTime: 2023-02-09 16:17:25
 * @FilePath: /node_staking/src/store/modules/user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


const  state =  {
    token: '',
    address: '',
    wallet: '',
    link: 'http://127.0.0.1'
}
const mutations =  {
    set_token(state, token) {
        state.token = token
        sessionStorage.token = token
    },
    del_token(state) {
        state.token = ''
        sessionStorage.removeItem('token')
    },
    set_address(state, address) {
        state.address = address
        sessionStorage.address = address
    },
    del_address(state) {
        state.address = ''
        sessionStorage.removeItem('address')
    },
    set_wallet(state, address) {
        state.wallet = address
        sessionStorage.wallet = address
    },
    del_wallet(state) {
        state.wallet = ''
        sessionStorage.removeItem('wallet')
    },
    set_link(state, link) {
        state.link = link
        localStorage.link = link
    },
};
const actions = {};
export default {
namespaced: true,
state,
actions,
mutations
}


