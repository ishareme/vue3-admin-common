<template>
    <div class="markdown-container">
        <div id="markdown-box"></div>
        <div class="bottom">
            <el-button type="primary" @click="onSubmitClick">
                {{ $t('msg.article.commit') }}
            </el-button>
        </div>
    </div>
</template>

<script setup>
import MKEditor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/zh-cn';
import { useStore } from 'vuex';
import { onMounted, watch } from 'vue';
import { watchSwitchLang } from '@/utils/i18n';
import { commitArticle, editArticle } from './commit';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    detail: {
        type: Object
    }
});
const emits = defineEmits(['onSuccess']);

const store = useStore();

let mkEditor;
let el;
onMounted(() => {
    el = document.querySelector('#markdown-box');
    initEditor();
});
const initEditor = () => {
    mkEditor = new MKEditor({
        // el
        el,
        height: '500px',
        // 样式
        previewStyle: 'vertical',
        language: store.getters.language === 'zh' ? 'zh-CN' : 'en'
    });
    mkEditor.getMarkdown();
};
const onSubmitClick = async () => {
    if (props.detail && props.detail._id) {
        // 编辑文章
        await editArticle({
            id: props.detail._id,
            title: props.title,
            content: mkEditor.getHTML()
        });
    } else {
        // 创建文章
        await commitArticle({
            title: props.title,
            content: mkEditor.getHTML()
        });
    }

    mkEditor.reset();
    emits('onSuccess');
};

watchSwitchLang(() => {
    // 语言切换重新创建
    if (!el) return;
    const html = mkEditor.getHTML();
    mkEditor.destroy();
    initEditor();
    mkEditor.setHTML(html);
});

// 编辑相关
watch(
    () => props.detail,
    (val) => {
        if (val && val.content) {
            mkEditor.setHTML(val.content);
        }
    },
    {
        immediate: true
    }
);
</script>

<style lang="scss" scoped>
.markdown-container {
    .bottom {
        margin-top: 20px;
        text-align: right;
    }
}
</style>
