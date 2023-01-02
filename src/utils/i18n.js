import i18n from '@/i18n';
import { watch } from 'vue';
import store from '@/store';
export function generateTitle(key) {
    return i18n.global.t(`msg.route.${key}`);
}

// 监听语言的变化
export function watchSwitchLang(...cbs) {
    watch(
        () => store.getters.language,
        () => {
            cbs.forEach((cb) => cb(store.getters.language));
        }
    );
}
