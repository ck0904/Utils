export default {
    getScreen: state => {
        if(document.documentElement.offsetWidth > 1024) {//大屏显示
            return true
        }else {//小屏
            return false
        }
    }
}