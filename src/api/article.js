import request from '@/utils/request';

// 获取所有文章
export const getArticleList = (data) => {
    return request({
        url: '/article/list',
        params: data
    });
};

// 修改文章排序
export const articleSort = (data) => {
    return request({
        url: '/article/sort',
        data,
        method: 'POST'
    });
};
