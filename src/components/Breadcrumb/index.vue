<template>
    <el-breadcrumb class="breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbData"
                :key="item.path"
            >
                <span
                    class="no-redirect"
                    v-if="index === breadcrumbData.length - 1"
                >
                    {{ generateTitle(item.meta.title) }}
                </span>
                <span v-else class="redirect" @click="handlerClick(item)">
                    {{ generateTitle(item.meta.title) }}
                </span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { generateTitle } from '@/utils/i18n';

const route = useRoute();
// 生成数据数组
const breadcrumbData = ref([]);
const getBreadcrumbData = () => {
    // route.matched 当前路由的标准化路由表
    breadcrumbData.value = route.matched.filter(
        (item) => item.meta && item.meta.title
    );
};
// 监听路由变化
watch(
    route,
    () => {
        getBreadcrumbData();
    },
    {
        immediate: true
    }
);

const router = useRouter();
const handlerClick = (item) => {
    router.push(item.path);
};

const store = useStore();
const linkHoverColor = ref(store.getters.cssVar.menuBg);
</script>

<style lang="scss" scoped>
.breadcrumb {
    font-size: 14px;
    line-height: 50px;
    margin-left: 8px;
    .redirect {
        cursor: pointer;
        color: #666;
        font-weight: bold;
        &:hover {
            color: v-bind(linkHoverColor);
        }
    }
    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
