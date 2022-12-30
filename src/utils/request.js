import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000
});

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
        // ElMessage.error(error.message);
        return Promise.reject(new Error(error));
    }
);

export default service;
