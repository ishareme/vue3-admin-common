<template>
    <div class="article-create">
        <el-card>
            <el-input
                class="title-input"
                :placeholder="$t('msg.article.titlePlaceholder')"
                v-model="title"
                maxlength="20"
                clearable
            ></el-input>
            <el-tabs v-model="activeName">
                <el-tab-pane
                    :label="$t('msg.article.markdown')"
                    name="markdown"
                >
                    <Markdown
                        @on-success="onSuccess"
                        :title="title"
                        :detail="detail"
                    ></Markdown>
                </el-tab-pane>
                <el-tab-pane :label="$t('msg.article.richText')" name="editor">
                    <Editor
                        @on-success="onSuccess"
                        :title="title"
                        :detail="detail"
                    ></Editor>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { articleDetail } from '@/api/article';
import Editor from './components/Editor.vue';
import Markdown from './components/Markdown.vue';

const title = ref('');
const activeName = ref('markdown');

const onSuccess = () => {
    title.value = '';
};

// 编辑
const route = useRoute();
const articleId = route.params.id;
const detail = ref({});
const getArticleDetail = async () => {
    try {
        detail.value = await articleDetail(articleId);
        // 标题赋值
        title.value = detail.value.title;
    } catch (error) {
        detail.value = {
            _id: '612afcf2ba2d4031d04d1bff',
            ranking: 1,
            author: 'super-admin',
            title: '测试 富文本',
            desc: '测试 富文本 的内容',
            content: '<p>测试 富文本 的内容</p>',
            publicDate: '1630207218610',
            __v: 0
        };
        title.value = detail.value.title;
    }
};
if (articleId) {
    getArticleDetail();
}
</script>

<style lang="scss" scoped>
.title-input {
    margin-bottom: 20px;
}
</style>
