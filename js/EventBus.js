//EventBus构造函数
function EventBus() {
	this.listeners = {}
}

//判断是否为函数
function isFunction(fn) {
	return fn && Object.prototype.toString.call(fn) == '[object Function]'
}

//判断是否为字符串
function isString(str) {
	return str && (typeof str == 'string' && Object.prototype.toString.call(str) == '[object String]')
}

function isValid(event, callback) {
	return isString(event)&&isFunction(callback)
}

//监听事件方法
EventBus.prototype.$on = function(event, callback) {
	if(isValid(event, callback)) {
		if(this.listeners[event] && !this.listeners[event].include(callback)) {
			this.listeners[event].push(callback)
		} else {
			this.listeners[event] = callback
		}
	} else {
		console.log('参数不合法或已存在')
	}
}

//触发已经注册过的事件
EventBus.prototype.$emit = function(event, params) {
	if(isString(event) && this.listeners[event]) {
		this.listeners[event].forEach(cb => {
			cb(params)
		})
	}
}

//移除已经注册过的事件
EventBus.prototype.$remove = function(event, callback) {
	if(isString(event) && this.listeners[event]) {
		let index = this.listeners[event].indexOf(callback)
		if(index !== -1) {
			this.listeners[event].splice(index, 1)
		}
	}
}
