import { ref } from 'vue';
import Sortable from 'sortablejs';
import { articleSort } from '@/api/article';
import { ElMessage } from 'element-plus';
import i18n from '@/i18n';

export const tableRef = ref(null);
export const initSortable = (tableData, cb) => {
    // 1. 要拖拽的元素
    // 2. 配置对象
    // 设置拖拽效果
    const el = tableRef.value.$el.querySelector(
        '.el-table__body-wrapper > table > tbody'
    );
    Sortable.create(el, {
        // 拖拽时的类名
        ghostClass: 'sortable-ghost',
        // 拖拽结束时的方法
        async onEnd(e) {
            const { newIndex, oldIndex } = e;
            try {
                await articleSort({
                    initRanking: tableData.value[oldIndex].ranking,
                    finalRanking: tableData.value[newIndex].ranking
                });
                ElMessage.success(i18n.global.t('msg.article.sortSuccess'));

                // table数据没更新 强制更新
                tableData.value = [];
                // 重新获取数据
                cb && cb();
            } catch (error) {
                ElMessage.success(i18n.global.t('msg.article.sortSuccess'));
            }
        }
    });
};
