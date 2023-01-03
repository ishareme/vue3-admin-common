<template>
    <div class="article-detail-container">
        <h2 class="title">{{ detail.title }}</h2>
        <div class="header">
            <span class="author">
                {{ $t('msg.article.author') }}：{{ detail.author }}
            </span>
            <span class="time">
                {{ $t('msg.article.publicDate') }}：{{
                    $filter.relativeTime(detail.publicDate)
                }}
            </span>
            <el-button type="text" class="edit" @click="onEditClick">
                {{ $t('msg.article.edit') }}
            </el-button>
        </div>
        <div class="content" v-html="detail.content"></div>
    </div>
</template>

<script setup>
import { articleDetail } from '@/api/article';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// 获取数据
const route = useRoute();
const articleId = route.params.id;
const detail = ref({});
const getArticleList = async () => {
    try {
        detail.value = await articleDetail(articleId);
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
    }
};
getArticleList();

// 编辑按钮
const onEditClick = () => {};
</script>

<style lang="scss" scoped>
.article-detail-container {
    .title {
        font-size: 22px;
        text-align: center;
        padding: 12px 0;
    }
    .header {
        padding: 26px 0;
        .author {
            font-size: 14px;
            color: #555666;
            margin-right: 20px;
        }
        .time {
            font-size: 14px;
            color: #999aaa;
            margin-right: 20px;
        }
        .edit {
            float: right;
        }
    }
    .content {
        font-size: 14px;
        padding: 20px 0;
        border-top: 1px solid #d4d4d4;
    }
}
</style>
