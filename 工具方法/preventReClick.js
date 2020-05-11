import Vue from 'vue'

const preventReClick = Vue.directive('preventReclick',{
	inserted: function(el, binding) {
		if(!el.disabled) {
			el.disabled = true
			setTimeout(() =>{
				el.disabled = false
			}, binding.value || 30000)
		}
	}
})

export {preventReClick}

//在main.js中引入
// import preventReClick from './plugins/directives.js'

//在按钮上添加v-preventReClick
// <el-button size="small" type="primary" @click="handleSave()" v-preventReClick="1000">保存</el-button>
// <el-button size="small" type="primary" @click="handleSave()" v-preventReClick>保存</el-button>