// 仅限模拟数据使用
import axios from "axios"
const mock = axios.create({
    baseURL: ''
});
// 返回状态拦截
mock.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error.response)
    }
)

export default mock