import { userInfo } from '@/api/login'

export default {
    state: {
        /* 用户信息 */
        userAllInfo: {}
    },
    mutations: {
        GET_USERINFO (state, allUser) {
            state.userAllInfo = allUser
        }
    },
    actions: {
        UserInfo ({ commit, state }) {
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
