import { publicRoutes, privateRoutes } from '@/router';

export default {
    namespaced: true,
    state: {
        // 路由表 初始路由表
        routes: publicRoutes
    },
    mutations: {
        /**
         * 增加路由
         * @param {*} state
         * @param {*} newRoutes
         */
        setRoutes(state, newRoutes) {
            state.routes = [...publicRoutes, ...newRoutes];
        }
    },
    actions: {
        /**
         * 根据权限数据筛选路由
         * @param {*} context
         * @param {*} menus 权限数据
         */
        filterRoutes(context, menus) {
            // 筛选之后，获取到的需要addRoute的路由
            const routes = [];
            menus.forEach((key) => {
                const filterRoute = privateRoutes.filter(
                    (item) => item.name === key
                );
                routes.push(...filterRoute);
            });

            routes.push(
                // 所有不匹配的路由，全部接入404的路由配置
                // 注意：动态路由的时候 该配置必须要在所有路由指定之后
                {
                    path: '/:catchAll(.*)',
                    redirect: '/404'
                }
            );

            context.commit('setRoutes', routes);

            return routes;
        }
    }
};
