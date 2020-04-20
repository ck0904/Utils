export default {
	// 导航菜单是否折叠
	isSidebarNavCollapse: false,
	/* 面包屑导航列表 */
	crumbList: [],
	// 判断当前屏幕是否为小屏
	isMinScreen: false,
	get UserToken() {
		return sessionStorage.getItem('token')
	},
	set UserToken(value) {
		console.log(value)
		sessionStorage.setItem('token', value)
	}
}
