import i18n from '@/i18n';
export function generateTitle(key) {
    return i18n.global.t(`msg.route.${key}`);
}
