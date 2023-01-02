<template>
    <div>
        <div class="logo-container">
            <el-avatar
                :size="logoHeight"
                shape="square"
                src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
            ></el-avatar>
            <p v-show="$store.getters.sidebarOpened" class="logo-title">
                Admin
            </p>
        </div>
        <el-scrollbar>
            <SiderbarMenu></SiderbarMenu>
        </el-scrollbar>
    </div>
</template>

<script setup>
import SiderbarMenu from './SiderbarMenu.vue';
const logoHeight = 44;
</script>

<style lang="scss" scoped>
.logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    :deep(.el-avatar) {
        --el-avatar-background-color: none;
    }
    .logo-title {
        margin-left: 10px;
        color: #fff;
        font-weight: bold;
        line-height: 50px;
        font-size: 16px;
        white-space: nowrap;
    }
}
</style>
