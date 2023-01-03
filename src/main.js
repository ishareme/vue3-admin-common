import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import en from 'element-plus/lib/locale/lang/en';
import 'element-plus/dist/index.css';
import './styles/index.scss';
// 导入svgicons
import installIcons from '@/icons';
// 导入路由守卫鉴权
import './permission';
// 全局属性
import installFilter from '@/filter';

const app = createApp(App);
installIcons(app);
installFilter(app);
app.use(ElementPlus, {
    locale: store.getters.language === 'en' ? en : zhCn
})
    .use(store)
    .use(router)
    .use(i18n)
    .mount('#app');
