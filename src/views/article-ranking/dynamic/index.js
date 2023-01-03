// 1. 动态列数据
// 2. 被勾选的动态列数据
// 3. table 的列数据

import { watchSwitchLang } from '@/utils/i18n';
import { ref, watch } from 'vue';
import DynamicData from './dynamicData';
//
// 暴露出动态列数据
export const dynamicData = ref(DynamicData());
// 创建 被勾选的动态列数据
export const selectDynamicLable = ref([]);
// 默认全部勾选

const initSelectDynamicLabel = () => {
    selectDynamicLable.value = dynamicData.value.map((item) => item.label);
};
initSelectDynamicLabel();

// 声明table的列数据
export const tableColumns = ref([]);
watch(
    selectDynamicLable,
    (values) => {
        tableColumns.value = [];
        // 遍历列数据 从中筛选
        const selectData = dynamicData.value.filter((item) =>
            values.includes(item.label)
        );
        tableColumns.value.push(...selectData);
    },
    {
        immediate: true
    }
);

watchSwitchLang(() => {
    dynamicData.value = DynamicData();
    initSelectDynamicLabel();
});
