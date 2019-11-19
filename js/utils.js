//节流
function throttle(handle,delay){
    var initTime = new Date()
    return function() {
        var _this = this
        var nowTime = new Date()
        var restTime = nowTime - initTime
        if(restTime >= delay) {
            handle.apply(_this, arguments)
            initTime = nowTime
        }
    }
}

//防抖延迟执行
function debounce(handle, delay) {
    var timeout = null
    return function(){
        var _this = this
        var arg = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function(){
            handle.apply(_this, arg)
        },delay)
    }
}

//防抖立即执行
function debounce(handle, await) {
    let timeout
    return function() {
        let _this = this 
        let args = arguments
        if(timeout) clearTimeout(timeout)
        let callNow = !timeout
        timeout = setTimeout(function(){
            timeout = null
        },await)
        if(callNow) handle.apply(_this, args)
    }
}