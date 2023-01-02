import variables from '@/styles/variables.module.scss';
import { generateColors } from '@/utils/theme';

// 快捷访问
const getters = {
    token: (state) => state.user.token,
    /**
     *
     * @param {*} state
     * @returns true 表示用户信息存在
     */
    hasUserInfo: (state) => {
        return JSON.stringify(state.user.userInfo) !== '{}';
    },
    userInfo: (state) => state.user.userInfo,

    // cssVar
    cssVar: (state) => ({
        ...variables,
        ...generateColors(state.theme.mainColor)
    }),

    // app
    sidebarOpened: (state) => state.app.sidebarOpened,
    language: (state) => state.app.language,

    // theme
    mainColor: (state) => state.theme.mainColor
};
export default getters;
