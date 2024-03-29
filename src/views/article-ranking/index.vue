<template>
    <div class="article-ranking-container">
        <el-card class="header">
            <div class="dynamic-box">
                <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
                <el-checkbox-group v-model="selectDynamicLable">
                    <el-checkbox
                        v-for="(item, index) in dynamicData"
                        :label="item.label"
                        :key="index"
                    >
                        {{ item.label }}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </el-card>
        <el-card>
            <el-table ref="tableRef" :data="tableData" border width="100%">
                <el-table-column
                    v-for="(item, index) in tableColumns"
                    :key="index"
                    :label="item.label"
                    :prop="item.prop"
                >
                    <template
                        v-if="item.prop === 'publicDate'"
                        #default="{ row }"
                    >
                        {{ $filter.relativeTime(row.publicDate) }}
                    </template>
                    <template v-if="item.prop === 'action'" #default="{ row }">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="onShowClick(row)"
                        >
                            {{ $t('msg.article.show') }}
                        </el-button>
                        <el-button
                            type="danger"
                            size="mini"
                            @click="onRemoveClick(row)"
                        >
                            {{ $t('msg.article.remove') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[5, 10, 50, 100, 200]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script setup>
import { getArticleList, deleteArticle } from '@/api/article';
import { watchSwitchLang } from '@/utils/i18n';
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, onActivated, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { dynamicData, selectDynamicLable, tableColumns } from './dynamic';
import { tableRef, initSortable } from './sortable';

// 数据相关
const tableData = ref([]);
const page = ref(1);
const size = ref(10);
const total = ref(10);

const getListData = async () => {
    try {
        const result = await getArticleList({
            page,
            size
        });
        tableData.value = result.list;
        total.value = result.total;
    } catch (error) {
        const result = {
            list: [
                {
                    _id: '612a198d218e733440da07e6',
                    ranking: 1,
                    title: 'ESLint + Git Hooks',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '编码规范'
                },
                {
                    _id: '612a198d218e733440da07ec',
                    ranking: 2,
                    title: 'Tags View',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '便签快捷导航功能'
                },
                {
                    _id: '612a198d218e733440da07e4',
                    ranking: 3,
                    title: 'Element-Plus',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '基于 Vue 3.0 的桌面端组件库'
                },
                {
                    _id: '612a198d218e733440da07ea',
                    ranking: 4,
                    title: '侧边栏',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '根据路由动态生成的 Menu 菜单'
                },
                {
                    _id: '612a198d218e733440da07eb',
                    ranking: 5,
                    title: '动态面包屑',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '动态生成的面包屑数据'
                },
                {
                    _id: '612a198d218e733440da07e8',
                    ranking: 6,
                    title: '权限验证',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '页面权限、功能权限、动态权限、权限配置'
                },
                {
                    _id: '612a198d218e733440da07e5',
                    ranking: 7,
                    title: 'vue-element-admin',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '后台前端解决方案'
                },
                {
                    _id: '612a198d218e733440da07e3',
                    ranking: 8,
                    title: 'Vue3 + 全家桶',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '项目基于最新的vue3全家桶进行开发'
                },
                {
                    _id: '612a198d218e733440da07e9',
                    ranking: 9,
                    title: '功能引导',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '对用户的功能引导'
                },
                {
                    _id: '612a198d218e733440da07e7',
                    ranking: 10,
                    title: '架构设计',
                    author: 'Sunday',
                    publicDate: '1629099597000',
                    desc: '架构设计'
                }
            ],
            total: 20,
            page: '1',
            size: '10'
        };
        tableData.value = result.list;
    }
};
getListData();
watchSwitchLang(getListData);
onActivated(getListData);
onMounted(() => {
    initSortable(tableData, getListData);
});

const i18n = useI18n();
const router = useRouter();
// 点击查看
const onShowClick = (row) => {
    router.push(`/article/${row._id}`);
};
// // 点击删除
const onRemoveClick = async (row) => {
    try {
        await ElMessageBox.confirm(
            i18n.t('msg.article.dialogTitle1') +
                row.title +
                i18n.t('msg.article.dialogTitle2'),
            {
                type: 'warning'
            }
        );
        await deleteArticle(row._id);
        ElMessage.success(i18n.t('msg.article.removeSuccess'));
        getListData();
    } catch (error) {
        ElMessage.success(i18n.t('msg.article.removeSuccess'));
    }
};

// 分页
const handleSizeChange = (currentSize) => {
    size.value = currentSize;
    getListData();
};
const handleCurrentChange = (currentPage) => {
    page.value = currentPage;
    getListData();
};
</script>

<style lang="scss" scoped>
.article-ranking-container {
    .header {
        margin-bottom: 20px;
        .dynamic-box {
            display: flex;
            align-items: center;
            .title {
                margin-right: 20px;
                font-size: 14px;
                font-weight: bold;
            }
        }
    }

    :deep(.el-table__row) {
        cursor: pointer;
    }

    .pagination {
        margin-top: 20px;
        text-align: center;
    }
}

:deep(.sortable-ghost) {
    opacity: 0.6;
    color: #fff;
    background: #304156;
}
</style>
