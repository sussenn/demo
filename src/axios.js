import axios from 'axios'
import { getToken } from '@/composables/auth'
import { toast } from '@/composables/util'
import { useStore } from 'vuex'

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 1000,
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'application/json',
    'Accept': 'application/json;charset=UTF-8'
  }
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 添加token
  const token = getToken()
  if (token) {
    config.headers["token"] = token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 2003 非法token
  if (response.data.code == 2003) {
    const store = useStore()
    // 退出登录
    store.dispatch("logout")
      .finally(() => localtion.reload())
  }

  toast("请求失败", "error")
  return Promise.reject(error);
});

export default instance