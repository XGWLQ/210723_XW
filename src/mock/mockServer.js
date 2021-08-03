/*
使用mockjs提供mock数据接口
 */

import Mock from 'mockjs'
import data from './data.json'

// 定义接口请求数据返回的接口

/*
 记录数据模板。当拦截到匹配 rurl 的 Ajax 请求时 根据数据模板
 template  生成模拟数据，并作为响应数据返回
*/
// 返回goods的接口
Mock.mock('/goods', { code: 0, data: data.goods })
// 返回ratings的接口
Mock.mock('/ratings', { code: 0, data: data.ratings })
// 返回info的接口
Mock.mock('/info', { code: 0, data: data.info })
