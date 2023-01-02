<template>
    <el-dropdown trigger="click" @command="handleSetLanguage">
        <el-tooltip
            class="international hover-effect"
            :content="$t('msg.navBar.lang')"
            :effect="effect"
        >
            <svg-icon icon="language"></svg-icon>
        </el-tooltip>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :disabled="language === 'zh'" command="zh">
                    中文
                </el-dropdown-item>
                <el-dropdown-item :disabled="language === 'en'" command="en">
                    English
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

defineProps({
    effect: {
        type: String,
        default: 'dark',
        validator: function (value) {
            // 这个值必须匹配下列字符串中的一个
            return ['dark', 'light'].indexOf(value) !== -1;
        }
    }
});

const store = useStore();
const language = computed(() => store.getters.language);

// 切换语言的方法
const i18n = useI18n();
defineEmits(['handleSetLanguage']);
const handleSetLanguage = (lang) => {
    i18n.locale.value = lang;
    store.commit('app/setLanguage', lang);
    ElMessage.success(i18n.t('msg.toast.switchLangSuccess'));
};
</script>

<style lang="scss" scoped>
.international {
    display: inline-block;
    font-size: 24px;
    color: #5a5e66;
    vertical-align: text-bottom;
    &.hover-effect {
        cursor: pointer;
    }
}
</style>
