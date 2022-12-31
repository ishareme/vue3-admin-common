import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout';

// 公开路由表
const publicRoutes = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    {
        path: '/',
        redirect: '/profile',
        component: layout,
        children: [
            // 个人中心
            {
                path: '/profile',
                name: 'profile',
                component: () =>
                    import(/* webpackChunkName: "profile" */ '@/views/profile'),
                meta: {
                    title: 'profile',
                    icon: 'el-icon-user'
                }
            },
            // 404
            {
                path: '/404',
                name: '404',
                component: () =>
                    import(
                        /* webpackChunkName: "error-page" */ '@/views/error-page/404.vue'
                    )
            },
            // 404
            {
                path: '/401',
                name: '401',
                component: () =>
                    import(
                        /* webpackChunkName: "error-page" */ '@/views/error-page/401.vue'
                    )
            }
        ]
    }
];

// 私有路由表
const privateRoutes = [
    {
        path: '/user',
        component: layout,
        redirect: '/user/manage',
        meta: {
            title: 'user',
            icon: 'personnel'
        },
        children: [
            // 404
            {
                path: '/user/manage',
                name: 'userManage',
                component: () => import('@/views/user-manage'),
                meta: {
                    title: 'userManage',
                    icon: 'personnel-manage'
                }
            },
            {
                path: '/user/role',
                name: 'userRole',
                component: () => import('@/views/role-list'),
                meta: {
                    title: 'userRole',
                    icon: 'role'
                }
            },
            {
                path: '/user/permission',
                name: 'userPermission',
                component: () => import('@/views/permission-list'),
                meta: {
                    title: 'permissionList',
                    icon: 'permission'
                }
            },
            {
                path: '/user/info/:id',
                name: 'userInfo',
                component: () => import('@/views/user-info'),
                meta: {
                    title: 'userInfo'
                }
            },
            {
                path: '/user/import',
                name: 'import',
                component: () => import('@/views/import'),
                meta: {
                    title: 'excelImport'
                }
            }
        ]
    },
    {
        path: '/article',
        component: layout,
        redirect: '/article/ranking',
        meta: { title: 'article', icon: 'article' },
        children: [
            {
                path: '/article/ranking',
                name: 'articleRanking',
                component: () =>
                    import(
                        /* webpackChunkName: "article-ranking" */ '@/views/article-ranking/index'
                    ),
                meta: {
                    title: 'articleRanking',
                    icon: 'article-ranking'
                }
            },
            {
                path: '/article/:id',
                name: 'articleDetail',
                component: () =>
                    import(
                        /* webpackChunkName: "article-ranking" */ '@/views/article-detail/index'
                    ),
                meta: {
                    title: 'articleDetail'
                }
            },
            {
                path: '/article/create',
                name: 'articleCreate',
                component: () =>
                    import(
                        /* webpackChunkName: "article-create" */ '@/views/article-create/index'
                    ),
                meta: {
                    title: 'articleCreate',
                    icon: 'article-create'
                }
            },
            {
                path: '/article/editor/:id',
                name: 'articleEditor',
                component: () =>
                    import(
                        /* webpackChunkName: "article-create" */ '@/views/article-create/index'
                    ),
                meta: {
                    title: 'articleEditor'
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...publicRoutes, ...privateRoutes]
});

export default router;
