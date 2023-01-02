<template>
    <div
        class="app-wrapper"
        :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
    >
        <!-- 左侧 -->
        <Sidebar
            id="guide-sidebar"
            class="sidebar-container"
            :style="{
                backgroundColor: $store.getters.cssVar.menuBg
            }"
        ></Sidebar>
        <div class="main-container">
            <!-- 顶部 -->
            <div class="fixed-header">
                <Navbar></Navbar>
                <TagsView id="guide-tags"></TagsView>
            </div>
            <!-- 内容区 -->
            <AppMain></AppMain>
        </div>
    </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar/index.vue';
import AppMain from './components/AppMain.vue';
import TagsView from '@/components/TagsView';
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
    @include clearfix;
    @include relative;
    &.hideSidebar {
        .fixed-header {
            width: calc(100% - #{$hideSideBarWidth});
        }
    }
    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        width: calc(100% - #{$sideBarWidth});
        z-index: 9;
        transition: all #{$sideBarDuration};
    }
}
</style>
