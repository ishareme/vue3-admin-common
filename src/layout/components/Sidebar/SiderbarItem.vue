<template>
    <el-sub-menu v-if="route.children.length" :index="route.path">
        <template #title>
            <MenuItem
                :title="route.meta.title"
                :icon="route.meta.icon"
            ></MenuItem>
        </template>
        <!-- 循环渲染 -->
        <SiderbarItem
            v-for="item in route.children"
            :key="item.path"
            :route="item"
        ></SiderbarItem>
    </el-sub-menu>
    <el-menu-item v-else :index="route.path">
        <MenuItem :title="route.meta.title" :icon="route.meta.icon"></MenuItem>
    </el-menu-item>
</template>

<script setup>
import MenuItem from './MenuItem.vue';
defineProps({
    route: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped></style>
