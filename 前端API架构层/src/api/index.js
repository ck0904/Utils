import axios from 'axios'
import store from '@/store/index.js'
import {
  Message,
  MessageBox,
  Loading
} from 'element-ui'
// const http = {}

let loading // 定义loading变量

function startLoading() { // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    // text: '加载中',
    spinner: 'el-loading-allTime',
    background: 'rgba(255, 255, 255,0.7)'
  })
}

function endLoading() { //使用Element loading-close 方法
  loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
  console.log(needLoadingRequestCount)
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

let service = axios.create({
  timeout: 600000,
  baseURL: process.env.BASE_API
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 添加请求头
    config.headers.Version = "2.1"
    if (store.state.UserToken) {
      config.headers.Authorization = store.state.UserToken
    } else {
      // config.headers.Authorization = window.sessionStorage.getItem('accessToke')
    }
    config.headers.terminalType = 1
    showFullScreenLoading()
    return config
  },
  function(error) {
    // Do something with request error
    Message.error({
      message: '请求超时，请您的检查网络！'
    })
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
    return response;
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器以及异常处理
service.interceptors.response.use(
  response => {
    const res = response.data
    tryHideFullScreenLoading()
    // console.log(res)
    if (res.code == '200') {
      return res
    } else if (res.code == '401') {
      MessageBox.alert('账户信息已变更，请重新登录!', '提示', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        store.commit('LOGIN_OUT')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    } else if (res.code == '402') {
      MessageBox.alert(res.msg, '提示', {
        confirmButtonText: '确定',
        type: 'error'
      }).then(() => {
        window.location.reload();
      })
    } else if (res.code == '403') {
      MessageBox.alert(res.msg, '提示', {
        confirmButtonText: '重新登陆',
        type: 'warning',
        center: 'true'
      }).then(() => {
        store.commit('LOGIN_OUT')
        window.location.reload()
      }).catch(() => {
        store.commit('LOGIN_OUT')
        setTimeout(() => {
          window.location.reload()
        }, 10)
      })
      return Promise.reject(res.msg)
    } else if (res.code == '500') {
      if (res.msg === '请先删除该栏目下的子栏目') {
        Message.error({
          message: '请删除该栏目下的功能！'
        })
        return Promise.reject(res.msg)
      } else {
        Message.error({
          message: res.msg
        })
        return Promise.reject(res.msg)
      }
    } else if (res.code == '100001') {
      return Promise.reject(res.msg)
    } else if (res.msg == '所属公司id不能为空') {
      Message.error({
        message: '请添加公司后进行车牌管理！'
      })
      return Promise.reject(res.msg)
    } else {
      Message.error({
        message: res.msg
      })
      return Promise.reject(res.msg)
    }
  },
  err => {
    if (err && err.response) {
      console.log(err)
      switch (err.response.status) {
        case 400:
          err.message = '请求出错'
          break
        case 401:
          Message.warning({
            message: '账户信息已变更，请重新登录!'
          })
          store.commit('LOGIN_OUT')
          setTimeout(() => {
            window.location.reload()
          }, 1000)
          return
        case 402:
          Message.warning({
            message: err.message
          })
          window.location.reload();
          return
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 500:
          err.message = '服务器端出错'
          break
      }
    } else {
      // window.history.go(0)
      err.message = '连接服务器失败'
    }
    Message.error({
      message: err.message
    })
    console.log(err.message)
    return Promise.reject(err.response)
  }
)
 
export default service
