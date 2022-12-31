import path from 'path';

// 所有子集路由
const getChildRoutes = (routes) => {
    const result = [];
    routes.forEach((route) => {
        if (route.children && route.children.length) {
            result.push(...route.children);
        }
    });
    return result;
};
const isNull = (data) => {
    if (!data) return true;
    if (JSON.stringify(data) === '{}' || JSON.stringify(data) === []) {
        return true;
    }
    return false;
};
/**
 * 处理脱离层级的路由：某个一级路由为其他子路由，则剔除该一级路由，保留路由层级
 * @param {*} routes router.getRoutes()
 */
export const filterRoutes = (routes) => {
    // 所以的子集路由
    const childrenRoutes = getChildRoutes(routes);
    // 根据子集路由进行查重操作
    return routes.filter((route) => {
        return !childrenRoutes.find((childrenRoute) => {
            return childrenRoute.path === route.path;
        });
    });
};

/**
 * 根据 routes 数据，返回对应 menu 规则数组
 */
export function generateMenus(routes, basePath = '') {
    const result = [];
    // 遍历路由表
    routes.forEach((item) => {
        // 不存在 children && 不存在 meta 直接 return
        if (isNull(item.meta) && isNull(item.children)) return;
        // 存在 children 不存在 meta，进入迭代
        if (isNull(item.meta) && !isNull(item.children)) {
            result.push(...generateMenus(item.children));
            return;
        }
        // 合并 path 作为跳转路径
        const routePath = path.resolve(basePath, item.path);
        // 路由分离之后，存在同名父路由的情况，需要单独处理
        let route = result.find((item) => item.path === routePath);
        if (!route) {
            route = {
                ...item,
                path: routePath,
                children: []
            };

            // icon 与 title 必须全部存在
            if (route.meta.icon && route.meta.title) {
                // meta 存在生成 route 对象，放入 arr
                result.push(route);
            }
        }

        // 存在 children 进入迭代到children
        if (item.children) {
            route.children.push(...generateMenus(item.children, route.path));
        }
    });
    return result;
}
