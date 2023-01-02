<template>
    <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex';
import { generateNewStyle } from './utils/theme';

const store = useStore();

// 自定义主题写入
generateNewStyle(store.getters.mainColor);
</script>

<style></style>
