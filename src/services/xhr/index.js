import xhr from './httpAxios'

let __PROD__ = false
if (__PROD__) {
  // 通过按照接口格式封装 xhr 函数，以实现基于 Promise 的请求与响应
  // 生产接口
}

/**
 * XHR 请求接口定义
 * @param  {String} options   参数对象
 * @param  {String} data      传参
 * @return {Promise}
 *
 */
export default xhr