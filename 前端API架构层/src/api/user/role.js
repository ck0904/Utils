import api from '../index'
import {SORT_BY_CREATETIME_OPTIONS} from '../default-options'
import {paramsFilter} from '@/utils/help'
import {namespace} from './index'
const feature = 'role'

// 添加角色
export const addRole = params => api.post(`/${namespace}/${feature}/add`, paramsFilter(params));
// 删除角色
export const deleteRole = id => api.deletes(`/${namespace}/${feature}/delete`, { id });
// 更新角色
export const updateRole = params => api.put(`/${namespace}/${feature}/update`, paramsFilter(params));
// 条件查询角色
export const findRoles = params => api.get(`/${namespace}/${feature}/find`, paramsFilter(params));
// 查询所有角色，不传参调用find接口代表查询所有角色
export const getAllRoles = () => findRoles();
// 获取角色详情
export const getRoleDetail = id => api.get(`/${namespace}/${feature}/detail`, { id });
// 分页查询角色
export const getRolePage = params => api.get(`/${namespace}/${feature}/page`, paramsFilter({...SORT_BY_CREATETIME_OPTIONS, ...params}));
// 搜索角色
export const searchRole = params => params.keyword ? api.get(`/${namespace}/${feature}/search`, paramsFilter(params)) : getRolePage(params);
