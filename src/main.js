import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import './styles/index.scss';
import 'element-plus/dist/index.css';
// 导入svgicons
import installIcons from '@/icons';

const app = createApp(App);
installIcons(app);
app.use(ElementPlus, { locale }).use(store).use(router).mount('#app');
