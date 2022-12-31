import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'element-plus/dist/index.css';
import './styles/index.scss';
// 导入svgicons
import installIcons from '@/icons';
// 导入路由守卫鉴权
import './permission';

const app = createApp(App);
installIcons(app);
app.use(ElementPlus, { locale }).use(store).use(router).mount('#app');
