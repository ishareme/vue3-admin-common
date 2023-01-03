import request from '@/utils/request';

// 获取用户列表
export const getUserManageList = (data) => {
    return request({
        url: '/user-manage/list',
        params: data
    });
};

// 批量上传用户数据
export const userBatchImport = (data) => {
    return request({
        url: '/user-manage/batch/import',
        method: 'POST',
        data
    });
};

// 删除指定数据
export const deleteUser = (id) => {
    return request({
        url: `/user-manage/delete/${id}`
    });
};

// 获取所有员工列表
export const getUserManageAllList = () => {
    return request({
        url: '/user-manage/all-list'
    });
};

// 获取用户详情
export const getUserDetail = (id) => {
    return request({
        url: `/user-manage/detail/${id}`
    });
};
