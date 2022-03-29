"use strict";

import axios from "axios";

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  timeout: 15000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// request 拦截器
//挂载请求拦截器 (相当于请求的预验证，请求到达服务器之前先验证这次请求)
_axios.interceptors.request.use(config => {
    //为请求头添加对象，添加token验证的Authorization字段
    // if(store.state.token){//添加token信息在请求中
    //   config.headers.Authorization = store.state.token
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response 响应拦截器
_axios.interceptors.response.use(response => {
    const code = response.status;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default _axios;
