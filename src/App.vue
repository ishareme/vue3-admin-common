<template>
    <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex';
import { watchSwitchLang } from './utils/i18n';
import { generateNewStyle } from './utils/theme';

const store = useStore();

// 自定义主题写入
generateNewStyle(store.getters.mainColor);

watchSwitchLang(() => {
    if (store.getters.token) {
        store.dispatch('user/getUserInfo');
    }
});
</script>

<style></style>
