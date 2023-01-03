<template>
    <el-dialog
        :title="$t('msg.excel.roleDialogTitle')"
        :model-value="modelValue"
        @close="closed"
    >
        <el-checkbox-group v-model="userRoleTitleList">
            <el-checkbox
                v-for="item in allRoles"
                :key="item.id"
                :label="item.title"
            ></el-checkbox>
        </el-checkbox-group>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closed">
                    {{ $t('msg.universal.cancel') }}
                </el-button>
                <el-button type="primary" @click="onConfirm">
                    {{ $t('msg.universal.confirm') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { getRoleList } from '@/api/role';
import { userRoles, updateRole } from '@/api/userManger';

import { watchSwitchLang } from '@/utils/i18n';
import { ElMessage } from 'element-plus';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

// 所有角色相关
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

// 当前用户角色
const userRoleTitleList = ref([]);
const getUserRoles = async () => {
    try {
        const res = await userRoles(props.userId);
        userRoleTitleList.value = res.role.map((item) => item.title);
    } catch (error) {
        const res = {
            role: [
                {
                    id: '2',
                    title: '管理员'
                }
            ],
            _id: '6124eacc0dafe231304546be'
        };
        userRoleTitleList.value = res.role.map((item) => item.title);
        console.log('[  userRoleTitleList.value]', userRoleTitleList.value);
    }
};

const emits = defineEmits(['update:modelValue', 'updateRole']);
const closed = () => {
    emits('update:modelValue', false);
};
const i18n = useI18n();
const onConfirm = async () => {
    const roles = userRoleTitleList.value.map((title) => {
        return allRoles.value.find((role) => role.title === title);
    });
    try {
        await updateRole(props.userId, roles);
        ElMessage.success(i18n.t('msg.role.updateRoleSuccess'));
        // 通知父组件 角色更新
        emits('updateRole');
    } catch (error) {
        ElMessage.success(i18n.t('msg.role.updateRoleSuccess'));
    }
    closed();
};
watch(
    () => props.userId,
    (value) => {
        if (value) {
            getUserRoles();
        }
    }
);
</script>

<style lang="scss" scoped></style>
