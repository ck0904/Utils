export default {
    LOGIN_IN (state, token) {
        state.UserToken = token
    },
    LOGIN_OUT (state) {
        state.UserToken = ''
    },
    toggleNavCollapse (state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList (state, list) { // 面包屑数组
        // console.log('list---提交的面包屑数组')
        // console.log(list)
        state.crumbList = list
    }
}
