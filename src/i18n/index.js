import { createI18n } from 'vue-i18n';
import store from '@/store';

import mZhLocale from './lang/zh';
import mEnLocale from './lang/en';
const messages = {
    en: {
        msg: {
            ...mEnLocale
        }
    },
    zh: {
        msg: {
            ...mZhLocale
        }
    }
};

const getLanguage = () => {
    return store && store.getters && store.getters.language
        ? store.getters.language
        : 'zh';
};

const i18n = createI18n({
    // 使用composition api
    legacy: false,
    // 全局使用t函数
    globalInjection: true,
    locale: getLanguage(),
    messages,
    warnHtmlMessage: false
});

export default i18n;
