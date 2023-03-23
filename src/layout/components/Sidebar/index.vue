<template>
    <div>
        <div class="logo-container" @click="onLogoClick">
            <el-avatar
                :size="logoHeight"
                shape="square"
                src="http://div.junzher.net/img/logo.5446419a.png"
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
import { useRouter } from 'vue-router';
import SiderbarMenu from './SiderbarMenu.vue';
const logoHeight = 44;

const router = useRouter();
const onLogoClick = () => {
    router.push('/');
};
</script>

<style lang="scss" scoped>
.logo-container {
    height: v-bind(logoHeight) + 'px';
    padding: 10px 0 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
