import { LANG, TGAS_VIEW } from '@/constant';
import { getItem, setItem } from '@/utils/storage';
export default {
    namespaced: true,
    state: () => ({
        sidebarOpened: true,
        language: getItem(LANG) || 'zh',
        tagsViewList: getItem(TGAS_VIEW) || []
    }),
    mutations: {
        triggerSidebarOpened(state) {
            state.sidebarOpened = !state.sidebarOpened;
        },
        /**
         * 设置国际化
         */
        setLanguage(state, lang) {
            setItem(LANG, lang);
            state.language = lang;
        },
        /**
         * 添加tags
         */
        addTagsViewList(state, tag) {
            // 处理重复
            const isFind = state.tagsViewList.find(
                (item) => item.path === tag.path
            );
            if (!isFind) {
                state.tagsViewList.push(tag);
                setItem(TGAS_VIEW, state.tagsViewList);
            }
        },
        // 为指定的tag修改title
        changeTagsView(state, { index, tag }) {
            state.tagsViewList[index] = tag;
            setItem(TGAS_VIEW, state.tagsViewList);
        },
        /**
         *
         * @param {*} state
         * @param {*} payload {type: 'other', 'right', 'index'}
         */
        removeTagsView(state, payload) {
            if (payload.type === 'index') {
                state.tagsViewList.splice(payload.index, 1);
            } else if (payload.type === 'other') {
                state.tagsViewList = [state.tagsViewList[payload.index]];
            } else if (payload.type === 'right') {
                state.tagsViewList.splice(
                    payload.index + 1,
                    state.tagsViewList.length - payload.index + 1
                );
            }
            setItem(TGAS_VIEW, state.tagsViewList);
        }
    }
};
