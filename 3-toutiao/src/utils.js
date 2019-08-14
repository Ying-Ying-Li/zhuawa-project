/***
 * @file utils
 * @author liyingying
 * @param {Object} url请求参数
 * @returns  {Promise} 请求的Promise任务对象
 * 
 */

 export const request = params => {
     let requestParam = {
         ...params,
         method: (params.method && params.method.toUpperCase()) || 'Get'
     }

     return fetch(
                requestParam.url,
                requestParam
            )
             .then(res => res.json())
 }