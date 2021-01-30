// 导出一个配置好的axios提供给main挂载
import axios from 'axios'
import {
    Toast
} from 'vant';
import router from '@/router'
import JSONBIG from 'json-bigint'

// 对axios进行配置
// baseURL  作用：设置基准地址（前面一段相同的地址）
axios.defaults.baseURL = 'https://glaforteachers.com/';

axios.defaults.transformResponse = [(data) => {
    // 后台的原始数据   理想情况 json字符串
    // 后台可能没有任何响应内容  data 值是 null
    try {
        return JSONBIG.parse(data)
    } catch (e) {
        return data
    }
}]

let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; //配置请求头
// console.log(token);
// 请求拦截器
axios.interceptors.request.use(config => {
    let token = JSON.parse(window.localStorage.getItem('kou_token'))
    if (token) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.token = token || '';
        //也可以这种写法
        // config.headers['token'] = token;
    }
    return config;
}, err => {
    Toast.fail('请求超时');
    return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => {
    if (res.data) {
        return Promise.resolve(res);
    } else {
        Toast.fail("登录信息已失效，请重新登录");
        router.push('/login');
        return Promise.reject(res);
    }
}, err => {
    console.log(err, '响应失败')
    const status = err.response.status
    // 2. 判断401
    if (status == 401) {
        Toast.fail('该页面登录后才可访问')
        console.log(err);
    } else if (status === 404) {
        router.push('/sos')
    } else if (err.response.code === 0) {
        return router.push('/sos')
    }
    return Promise.reject(err)
})


let baseURL = '';
// 通用方法
export const POST = (url, params) => {
    return axios.post(`${baseURL}${url}`, params).then(res => res)
}

export const GET = (url, params) => {
    return axios.get(`${baseURL}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PUT = (url, params) => {
    return axios.put(`${baseURL}${url}`, params).then(res => res)
}

export const DELETE = (url, params) => {
    return axios.delete(`${baseURL}${url}`, {
        params: params
    }).then(res => res.data)
}

export const PATCH = (url, params) => {
    return axios.patch(`${baseURL}${url}`, params).then(res => res.data)
}

export default axios