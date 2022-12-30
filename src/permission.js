import router from './router';
import store from './store';

// 白名单
// 用户没有登录的时候也能进入的页面
const WHITE_LIST = ['/login'];

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
    // 1. 用户已经登录 不允许进入 login
    // 2. 用户未登录， 只允许进入 login
    if (store.getters.token) {
        // 用户已经登录 不允许进入 login
        if (to.path === '/login') {
            next('/');
        } else {
            next();
        }
    } else {
        // 用户未登录， 只允许进入 login
        if (WHITE_LIST.indexOf(to.path) > -1) {
            next();
        } else {
            next('/login');
        }
    }
});
