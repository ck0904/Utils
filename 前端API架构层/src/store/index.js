import Vue from 'vue'
import Vuex from 'vuex'

// 分解导入
import state from './state.js'
import getters from './getters'
import modules from './modules'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    modules,
    actions,
    mutations
})
