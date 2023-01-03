import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout';
import UserManage from './modules/UserManage';
import RoleList from './modules/RoleList';
import Permission from './modules/Permission';
import Article from './modules/Article';
import ArticleCreate from './modules/ArticleCreate';
import store from '@/store';

// 公开路由表
export const publicRoutes = [
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
export const privateRoutes = [
    UserManage,
    RoleList,
    Permission,
    Article,
    ArticleCreate
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: [...publicRoutes]
});

/**
 * 初始化路由表
 */
export const resetRouter = () => {
    if (
        store.getters.userInfo &&
        store.getters.userInfo.permission &&
        store.getters.userInfo.permission.menus
    ) {
        const menus = store.getters.userInfo.permission.menus;
        menus.forEach((menu) => {
            router.removeRoute(menu);
        });
    }
};

export default router;
