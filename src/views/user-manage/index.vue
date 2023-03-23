<template>
    <div class="user-manage-container">
        <el-card class="header">
            <div>
                <el-button
                    v-permission="['importUser']"
                    type="primary"
                    @click="onImportExcelClick"
                >
                    {{ $t('msg.excel.importExcel') }}</el-button
                >
                <el-button type="success" @click="onToExcelClick">
                    {{ $t('msg.excel.exportExcel') }}
                </el-button>
            </div>
        </el-card>
        <el-card>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="#" type="index"></el-table-column>
                <el-table-column
                    :label="$t('msg.excel.name')"
                    prop="username"
                ></el-table-column>
                <el-table-column
                    :label="$t('msg.excel.mobile')"
                    prop="mobile"
                ></el-table-column>
                <el-table-column :label="$t('msg.excel.avatar')" align="center">
                    <template v-slot="{ row }">
                        <el-image
                            class="avatar"
                            :src="row.avatar"
                            :preview-src-list="[row.avatar]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('msg.excel.role')">
                    <template #default="{ row }">
                        <div v-if="row.role && row.role.length > 0">
                            <el-tag
                                v-for="item in row.role"
                                :key="item.id"
                                size="mini"
                            >
                                {{ item.title }}</el-tag
                            >
                        </div>
                        <div v-else>
                            <el-tag size="mini">
                                {{ $t('msg.excel.defaultRole') }}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :label="$t('msg.excel.openTime')">
                    <template #default="{ row }">
                        {{ $filter.dateFilter(row.openTime) }}
                    </template>
                </el-table-column>
                <el-table-column
                    :label="$t('msg.excel.action')"
                    fixed="right"
                    with="300"
                >
                    <template #default="{ row }">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="onShowClick(row._id)"
                        >
                            {{ $t('msg.excel.show') }}
                        </el-button>
                        <el-button
                            v-permission="['distributePermission']"
                            type="info"
                            size="mini"
                            @click="onShowRoleClick(row._id)"
                        >
                            {{ $t('msg.excel.showRole') }}
                        </el-button>
                        <el-button
                            v-permission="['removeUser']"
                            type="danger"
                            size="mini"
                            @click="onRemoveClick(row)"
                        >
                            {{ $t('msg.excel.remove') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                class="pagination"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="size"
                :page-sizes="[2, 5, 10, 20]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            >
            </el-pagination>
            <el-pagination></el-pagination>
        </el-card>

        <Export2Excel v-model="exportToExcelVisible"></Export2Excel>

        <RolesDialog
            :user-id="selectUserId"
            v-model="roleDialogVisible"
            @updateRole="getListData"
        ></RolesDialog>
    </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue';
import { getUserManageList, deleteUser } from '@/api/userManger';
import { watchSwitchLang } from '@/utils/i18n';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElMessage, ElMessageBox } from 'element-plus';
import Export2Excel from './components/Export2Excel';
import RolesDialog from './components/Roles.vue';

// 数据相关
const tableData = ref([]);
const total = ref(0);
const page = ref(1);
const size = ref(2);
const getListData = async () => {
    try {
        const result = await getUserManageList({
            page: page.value,
            size: size.value
        });
        tableData.value = result.list;
        total.value = result.total;
    } catch (error) {
        const result = {
            list: [
                {
                    role: [
                        {
                            id: '1',
                            title: '超级管理员'
                        }
                    ],
                    _id: '612710a0ec87aa543c9c341d',
                    id: '0',
                    openTime: '1433088000000',
                    username: 'super-admin',
                    mobile: '188xxxx0001',
                    avatar: 'http://div.junzher.net/img/logo.5446419a.png'
                },
                {
                    role: [
                        {
                            id: '2',
                            title: '管理员'
                        }
                    ],
                    _id: '612710a0ec87aa543c9c341e',
                    id: '1',
                    username: 'admin',
                    openTime: '1559318400000',
                    mobile: '188xxxx0002',
                    avatar: 'https://img4.sycdn.imooc.com/61110c2b0001152907400741-140-140.jpg'
                }
            ],
            total: 7,
            page: '1',
            size: '2'
        };
        tableData.value = result.list;
        total.value = result.total;
    }
};

const handleSizeChange = (currentSize) => {
    size.value = currentSize;
    getListData();
};
const handleCurrentChange = (currentPage) => {
    page.value = currentPage;
    getListData();
};

// excel
const router = useRouter();
const onImportExcelClick = () => {
    router.push('/user/import');
};
// 导出
const exportToExcelVisible = ref(false);
const onToExcelClick = () => {
    exportToExcelVisible.value = true;
};

// 查看用户详情
const i18n = useI18n();
const onShowClick = (id) => {
    router.push(`/user/info/${id}`);
};
// 查看用户角色
const roleDialogVisible = ref(false);
const selectUserId = ref('');
const onShowRoleClick = (id) => {
    roleDialogVisible.value = true;
    selectUserId.value = id;
};
watch(roleDialogVisible, (value) => {
    if (!value) selectUserId.value = '';
});
const onRemoveClick = async (row) => {
    try {
        await ElMessageBox.confirm(
            i18n.t('msg.excel.dialogTitle1') +
                row.username +
                i18n.t('msg.excel.dialogTitle2'),
            {
                type: 'warning'
            }
        );
        await deleteUser(row._id);
        ElMessage.success(i18n.t('msg.excel.removeSuccess'));
        getListData();
    } catch (error) {
        ElMessage.success(i18n.t('msg.excel.removeSuccess'));
        getListData();
    }
};

getListData();
watchSwitchLang(getListData);
onActivated(getListData);
</script>

<style lang="scss" scoped>
.user-manage-container {
    .header {
        margin-bottom: 22px;
        text-align: right;
    }
    :deep(.avatar) {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }

    :deep(.el-tag) {
        margin-right: 6px;
    }

    .pagination {
        margin-top: 20px;
        text-align: center;
    }
}
</style>
