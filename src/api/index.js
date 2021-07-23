/*
包含N个接口的 请求模块
返回值是：Promise对象
*/
import ajax from './ajax'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => { ajax(`/position/${geohash}`) }

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoods = () => { ajax('/index_category') }

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqStores = ({longitude, latitude}) => { ajax('/shops', {longitude, latitude}) }

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchStore = () => { ajax() }

// [5、获取一次性验证码](#5获取一次性验证码)<br/>
export const reqOneVerCode = () => { ajax() }

// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqLogin = () => { ajax() }

// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqMesVerCode = () => { ajax() }

// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqPhoneVerCode = () => { ajax() }

// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserMes = () => { ajax() }

// [10、用户登出](#10用户登出)<br/>
export const reqExit = () => { ajax() }
