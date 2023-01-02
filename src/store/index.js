import { createStore } from 'vuex';
import app from './modules/app';
import theme from './modules/theme';
import user from './modules/user';
import getters from './getters';

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        app,
        theme,
        user
    },
    getters
});
