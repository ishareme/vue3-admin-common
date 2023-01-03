<template>
    <el-dialog
        :title="$t('msg.excel.title')"
        :model-value="modelValue"
        @close="closed"
        with="30%"
    >
        <el-input
            v-model="excelName"
            :placeholder="$t('msg.excel.placeholder')"
        ></el-input>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="closed">{{
                    $t('msg.excel.close')
                }}</el-button>
                <el-button
                    type="primary"
                    @click="onConfirm"
                    :loading="loading"
                    >{{ $t('msg.excel.confirm') }}</el-button
                >
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { watchSwitchLang } from '@/utils/i18n';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getUserManageAllList } from '@/api/userManger';
import { USER_RELATIONS } from './Export2ExcelConstants';
import { dataFilter } from '@/filter';

defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
});
const emits = defineEmits(['update:modelValue']);

// 导出文件名相关
const i18n = useI18n();
const excelName = ref('');
let exportDefaultName = i18n.t('msg.excel.defaultName');
excelName.value = exportDefaultName;
watchSwitchLang(() => {
    exportDefaultName = i18n.t('msg.excel.defaultName');
    excelName.value = exportDefaultName;
});

const closed = () => {
    emits('update:modelValue', false);
};

// 该方法负责将数组转化成二维数组
const formatJson = (headers, rows) => {
    return rows.map((item) => {
        return Object.keys(headers).map((key) => {
            const headerKey = headers[key];
            if (headerKey === 'role') {
                const roles = item[headerKey];
                return JSON.stringify(roles.map((role) => role.title));
            }
            if (headerKey === 'openTime') {
                return dataFilter(item[headerKey]);
            }
            return item[headerKey];
        });
    });
};
// 点击确定按钮
const loading = ref(false);
const onConfirm = async () => {
    loading.value = true;
    let allUser = [];
    try {
        allUser = (await getUserManageAllList()).list;
        closed();
    } catch (error) {
        allUser = [
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
                avatar: 'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png'
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
        ];
    }

    // 导入工具包
    const excel = await import('@/utils/Export2Excel');
    const data = formatJson(USER_RELATIONS, allUser);
    excel.export_json_to_excel({
        // excel表头
        header: Object.keys(USER_RELATIONS),
        // excel数据
        data,
        // 文件名称
        filename: excelName.value || exportDefaultName
    });
    loading.value = false;
    closed();
};
</script>

<style lang="scss" scoped></style>
