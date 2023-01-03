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

// 删除文章
export const deleteArticle = (articleId) => {
    return request({
        url: `/article/delete/${articleId}`
    });
};

// 获取文章详情
export const articleDetail = (articleId) => {
    return request({
        url: `/article/${articleId}`
    });
};
