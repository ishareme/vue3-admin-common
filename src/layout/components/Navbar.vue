<template>
    <div class="navbar">
        <div class="left-menu">
            <Hamburger></Hamburger>
            <Breadcrumb id="guide-breadcrumb"></Breadcrumb>
        </div>
        <div class="right-menu">
            <Guide></Guide>
            <HeaderSearch></HeaderSearch>
            <Screenfull></Screenfull>
            <ThemePicker></ThemePicker>
            <LangSelect class="lang-select"></LangSelect>
            <!-- 头像 -->
            <el-dropdown class="avatar-container" trigger="click">
                <div class="avatar-wrapper">
                    <el-avatar
                        shape="square"
                        :size="40"
                        :src="$store.getters.userInfo.avatar"
                    ></el-avatar>
                    <i class="el-icon-s-tools"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <router-link to="/">
                            <el-dropdown-item>{{
                                $t('msg.navBar.home')
                            }}</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item divided @click="handlerLogout">{{
                            $t('msg.navBar.logout')
                        }}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import Hamburger from '@/components/Hamburger';
import Breadcrumb from '@/components/Breadcrumb';
import LangSelect from '@/components/LangSelect';
import ThemePicker from '@/components/ThemeSelect';
import Screenfull from '@/components/Screenfull';
import HeaderSearch from '@/components/HeaderSearch';
import Guide from '@/components/Guide';

const store = useStore();
const handlerLogout = () => {
    store.dispatch('user/logout');
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, $alpha: 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-menu {
        display: flex;
        align-items: center;
    }
    .right-menu {
        display: flex;
        align-items: center;
        justify-content: right;
        padding-right: 16px;
        :deep(.avatar-container) {
            cursor: pointer;
            .avatar-wrapper {
                position: relative;
            }
        }
    }
    :deep(.lang-select) {
        margin-right: 16px;
    }
    :deep(.el-avatar) {
        --el-avatar-background-color: none;
    }
}
</style>
