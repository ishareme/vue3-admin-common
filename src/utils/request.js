import store from '@/store';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { isCheckTimeout } from './auth';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        // 统一注入token
        if (store.getters.token) {
            // 判断token是否过期
            if (isCheckTimeout()) {
                // 退出
                store.dispatch('user/logout');
                ElMessage.error('token失效了');
                return Promise.reject(new Error('token失效了'));
            }
            // 如果token存在 注入token
            config.headers.Authorization = `Bearer ${store.getters.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        const { success, message, data } = response.data;
        // 盘点当前请求是否成功
        // 成功返回解析后的数据
        if (success) {
            return data;
        } else {
            // 失败（请求成功，业务失败） 消息提示
            ElMessage.error(message);
            return Promise.reject(new Error(message));
        }
    },
    // 请求失败
    (error) => {
        // 状态码401的时候token过期
        if (
            error.response &&
            error.response.data &&
            error.response.data.code === 401
        ) {
            // token过期
            store.dispatch('user/login');
        }
        // ElMessage.error(error.message);
        return Promise.reject(new Error(error));
    }
);

export default service;
