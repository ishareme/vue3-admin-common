<template>
    <div class="header-search" :class="{ show: isShow }">
        <svg-icon
            className="search-icon"
            icon="search"
            @click.stop="onShowClick"
        ></svg-icon>
        <el-select
            ref="headerSearchSelectRef"
            class="header-search-select"
            v-model="search"
            filterable
            default-first-option
            remote
            :remote-method="querySearch"
            placeholder="search"
            @change="onSelectChange"
        >
            <el-option
                v-for="option in searchOptions"
                :key="option.item.path"
                :label="option.item.title.join(' > ')"
                :value="option.item"
            ></el-option>
        </el-select>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { filterRoutes } from '@/utils/route';
import { generateRoutes } from './FuseData';
import { watchSwitchLang } from '@/utils/i18n';
import { useRouter } from 'vue-router';
// 模糊搜索
import Fuse from 'fuse.js';

// 处理数据源
const router = useRouter();
let searchPool = computed(() => {
    const _filterRoutes = filterRoutes(router.getRoutes());
    return generateRoutes(_filterRoutes);
});
// 搜索库相关
let fuse;
const initFuse = (searchPool) => {
    fuse = new Fuse(searchPool, {
        // 是否按优先级进行排序
        shouldSort: true,
        // 匹配长度超过这个值的才会被认为是匹配的
        minMatchCharLength: 1,
        // 将被搜索的键列表。 这支持嵌套路径、加权搜索、在字符串和对象数组中搜索。
        // name：搜索的键
        // weight：对应的权重
        keys: [
            {
                name: 'title',
                weight: 0.7
            },
            {
                name: 'path',
                weight: 0.3
            }
        ]
    });
};
initFuse(searchPool.value);

const isShow = ref(false);
// search 相关
const search = ref('');
const searchOptions = ref([]);
const onShowClick = () => {
    isShow.value = !isShow.value;
};
// 搜索方法
const querySearch = (query) => {
    if (!query) searchOptions.value = [];
    searchOptions.value = fuse.search(query);
    console.log('[ searchOptions.value ]', searchOptions.value);
};
// 选中option的回调
const onSelectChange = (value) => {
    router.push(value.path);
};

const headerSearchSelectRef = ref(null);
const onClose = () => {
    headerSearchSelectRef.value.blur();
    isShow.value = false;
    searchOptions.value = [];
};
watch(isShow, (value) => {
    if (value) {
        headerSearchSelectRef.value.focus();
        document.body.addEventListener('click', onClose);
    } else {
        document.body.removeEventListener('click', onClose);
    }
});

// 监听语言变化 重新构建数据源
watchSwitchLang(() => {
    searchPool = computed(() => {
        const _filterRoutes = filterRoutes(router.getRoutes());
        return generateRoutes(_filterRoutes);
    });
    initFuse(searchPool.value);
});
</script>

<style lang="scss" scoped>
.header-search {
    font-size: 0 !important;
    margin-right: 16px;
    :deep(.search-icon) {
        cursor: pointer;
        font-size: 18px;
        vertical-align: middle;
    }
    .header-search-select {
        font-size: 18px;
        transition: width 0.2s;
        width: 0;
        overflow: hidden;
        background: transparent;
        border-radius: 0;
        display: inline-block;
        vertical-align: middle;

        :deep(.el-input__inner) {
            border-radius: 0;
            border: 0;
            padding-left: 0;
            padding-right: 0;
            box-shadow: none !important;
            border-bottom: 1px solid #d9d9d9;
            vertical-align: middle;
        }
    }
    &.show {
        .header-search-select {
            width: 210px;
            margin-left: 10px;
        }
    }
}
</style>
