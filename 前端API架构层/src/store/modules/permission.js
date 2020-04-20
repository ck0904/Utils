import { fetchPermission, userInfo } from '@/api/login'
import router, { DynamicRoutes } from '@/router/index'
import { recursionRouter, setDefaultRoute, recursionPermission } from '@/utils/recursion-router'
import dynamicRouter from '@/router/dynamic-router'

export default {
    namespaced: true,
    state: {
        permissionList: null, // 所有路由
        sidebarMenu: [], // 导航菜单
        currentMenu: '', // 当前active导航菜单
        /* 用户信息 */
        userAllInfo: {},
        permission: [], // 按钮权限列表
        token: ''
    },
    getters: {},
    mutations: {
        SET_PERMISSION (state, routes) {
            state.permissionList = routes
        },
        CLEAR_PERMISSION (state) {
            state.permissionList = null
        },
        SET_MENU (state, menu) {
            state.sidebarMenu = menu
        },
        CLEAR_MENU (state) {
            state.sidebarMenu = []
        },
        SET_CURRENT_MENU (state, currentMenu) {
            state.currentMenu = currentMenu
        },
        GET_USERINFO (state, allUser) {
            state.userAllInfo = allUser
        },
        PERMISSION (state, permission) {
            state.permission = permission
        }
    },
    actions: {
        async FETCH_PERMISSION ({ commit, state }) {
            let token = sessionStorage.getItem('token')
            let permissionList = await fetchPermission(token)
            // let permissionList = {}

            /*  根据权限筛选出我们设置好的路由并加入到path=''的children */
            let routes = recursionRouter(permissionList.data, dynamicRouter)
            let MainContainer = DynamicRoutes.find(v => v.path === '')
            let children = MainContainer.children
            children.push(...routes)
            /* 生成左侧导航菜单 */
            commit('SET_MENU', children)
            let perms = []
            recursionPermission(permissionList.data, perms)
            localStorage.setItem('permission', perms)
            // 获取按钮权限列表
            commit('PERMISSION', perms)

            /*
                为所有有children的菜单路由设置第一个children为默认路由
                主要是供面包屑用，防止点击面包屑后进入某个路由下的 '' 路由,比如/manage/
                而我们的路由是
                [
                    /manage/menu1,
                    /manage/menu2
                ]
            */
            setDefaultRoute([MainContainer])

            /*  初始路由 */
            let initialRoutes = router.options.routes

            /*  动态添加路由 */
            router.addRoutes(DynamicRoutes)

            /* 完整的路由表 */
            commit('SET_PERMISSION', [...initialRoutes, ...DynamicRoutes])
        },
        aUserInfo ({ commit, state }) {
            let token = sessionStorage.getItem('token')
            return new Promise((resolve, reject) => {
                userInfo(token).then(res => {
                    if (!res.data) {
                        reject(res.msg)
                    } else {
                        commit('GET_USERINFO', res.data)
                        resolve(res)
                    }
                })
            })
        }
    }
}
