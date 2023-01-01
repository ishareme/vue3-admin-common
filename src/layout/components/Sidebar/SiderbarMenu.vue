<template>
    <!-- uniqueOpened 只能打开一个 -->
    <el-menu
        :uniqueOpened="true"
        :background-color="$store.getters.cssVar.menuBg"
        :text-color="$store.getters.cssVar.menuText"
        :active-text-color="$store.getters.cssVar.menuActiveText"
        :default-active="activeMenu"
        :collapse="!$store.getters.sidebarOpened"
        router
    >
        <SiderbarItem
            v-for="item in routes"
            :key="item.path"
            :route="item"
        ></SiderbarItem>
    </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { filterRoutes, generateMenus } from '@/utils/route';
import SiderbarItem from './SiderbarItem.vue';
const router = useRouter();
const routes = computed(() => {
    const _filterRoutes = filterRoutes(router.getRoutes());
    return generateMenus(_filterRoutes);
});

// 默认激活项
const route = useRoute();
const activeMenu = computed(() => {
    const { path } = route;
    return path;
});
</script>

<style lang="scss" scoped></style>
