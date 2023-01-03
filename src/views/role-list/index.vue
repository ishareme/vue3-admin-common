<template>
    <div class="">
        <el-card>
            <el-table :data="allRoles" border width="100%">
                <el-table-column
                    :label="$t('msg.role.index')"
                    type="index"
                    width="120"
                >
                </el-table-column>
                <el-table-column :label="$t('msg.role.name')" prop="title">
                </el-table-column>
                <el-table-column :label="$t('msg.role.desc')" prop="describe">
                </el-table-column>
                <el-table-column
                    :label="$t('msg.role.action')"
                    prop="action"
                    width="260"
                    #default="{ row }"
                >
                    <el-button
                        v-permission="['distributePermission']"
                        type="primary"
                        size="mini"
                        @click="onDistributePermissionClick(row)"
                    >
                        {{ $t('msg.role.assignPermissions') }}
                    </el-button>
                </el-table-column>
            </el-table>
        </el-card>

        <DistributePermission
            v-model="visible"
            :roleId="selectRoleId"
        ></DistributePermission>
    </div>
</template>

<script setup>
import { getRoleList } from '@/api/role';
import { watchSwitchLang } from '@/utils/i18n';
import { ref, watch } from 'vue';
import DistributePermission from './components/DistributePermission';

const allRoles = ref([]);
const getRoles = async () => {
    try {
        allRoles.value = await getRoleList();
    } catch (error) {
        allRoles.value = [
            {
                id: '1',
                title: '超级管理员',
                describe: '唯一账号，可以操作系统所有功能'
            },
            {
                id: '2',
                title: '管理员',
                describe: '由超管指定，可以为多个，协助超管管理系统'
            },
            {
                id: '3',
                title: '人事经理',
                describe: '主管人事相关业务'
            },
            {
                id: '4',
                title: '销售经理',
                describe: '主管销售相关业务'
            },
            {
                id: '5',
                title: '保安队长',
                describe: '主管安保相关业务'
            },
            {
                id: '6',
                title: '员工',
                describe: '普通员工'
            }
        ];
    }
};
getRoles();
watchSwitchLang(getRoles);

const visible = ref(false);
const selectRoleId = ref('');
const onDistributePermissionClick = (row) => {
    visible.value = true;
    selectRoleId.value = row.id;
};

watch(visible, (value) => {
    if (!value) selectRoleId.value = '';
});
</script>

<style lang="scss" scoped></style>
