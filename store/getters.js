const getters = {
    //app全局控制
    device: state => state.app.device,
    openNav: state => state.app.openNav,

    //用户信息

    userInfo:state=>state.user.userInfo,
    account: state => state.user.account

}
export default getters
