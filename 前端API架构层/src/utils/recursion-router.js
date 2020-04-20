/**
 *
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由
 */

export function recursionRouter (userRouter = [], allRouter = []) {
    var realRoutes = []
    allRouter.forEach((v, i) => {
        userRouter.forEach((item, index) => {
            // if (item.menuName === v.meta.name) {
            if (item.menuUrl === v.meta.title) {
                if (item.children && item.children.length > 0) {
                    v.children = recursionRouter(item.children, v.children)
                } else {
                    v.children = []
                }
                realRoutes.push(v)
            }
        })
    })
    return realRoutes
}

/**
 *
 * @param {Array} routes 用户过滤后的路由
 *
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 */
export function setDefaultRoute (routes) {
    routes.forEach((v, i) => {
        if (v.children && v.children.length > 0) {
            v.redirect = { name: v.children[0].name }
            setDefaultRoute(v.children)
        }
    })
}

/**
 *
 * @param {Array} permissionList 后台返回的用户权限json
 * @param {Array} realPerms 过滤后的权限列表
 */

export function recursionPermission (permissionList = [], realPerms = []) {
    permissionList.forEach((item, index) => {
        if (item.type !== 3) {
            if (item.children && item.children.length > 0) {
                recursionPermission(item.children, realPerms)
            }
        } else {
            if (item.perms) {
                realPerms.push(item.perms)
            }
        }
    })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
    let per = localStorage.getItem('permission')
    if (per) {
        return (per.split(',') || '[]').indexOf(key) !== -1 || false
    }
}
