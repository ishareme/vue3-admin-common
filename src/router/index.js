import { createRouter, createWebHashHistory } from 'vue-router';
import layout from '@/layout';
const publicRoutes = [
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login')
    },
    {
        path: '/',
        component: layout
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRoutes
});

export default router;
