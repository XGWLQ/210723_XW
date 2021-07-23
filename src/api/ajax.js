
/*
ajax 请求函数模块
返回的是一个Premise对象 (异步返回的数据是: response.data)
*/
import axios from 'axios'

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-unused-vars
    let promise
    if (type === 'GET') {
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    // 内部先调用一个直接拿到数据返回出去
    promise.then((response) => {
      // 返回的是数据 而不是response
      resolve(response.data)
    }
    ).catch((error) => {
      reject(error)
    })
  })
}
