/*
包含N个接口的 请求模块
返回值是：Promise对象
*/
import ajax from './ajax'
const BASE_URL = '/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) => { return ajax(`${BASE_URL}/position/${geohash}`) }

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodLists = () => { return ajax(BASE_URL + '/index_category') }

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = ({ longitude, latitude }) => { return ajax(BASE_URL + '/shops', { longitude, latitude }) }

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
export const reqSearchShops = (geohash, keyword) => { return ajax(BASE_URL + '/search_shops', { geohash, keyword }) }

// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = ({ name, pwd, captcha }) => { return ajax(BASE_URL + '/login_pwd', { name, pwd, captcha }, 'POST') }

// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone) => { return ajax(BASE_URL + '/sendcode', { phone }) }

// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSms = (phone, code) => { return ajax(BASE_URL + '/login_sms', { phone, code }, 'POST') }

// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserMes = () => { return ajax(BASE_URL + '/userinfol') }

// [10、用户登出](#10用户登出)<br/>
export const reqLogout = () => { return ajax(BASE_URL + '/logout') }
