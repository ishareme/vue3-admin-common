<template>
    <div class="user-info-container">
        <el-card class="print-box">
            <el-button
                type="primary"
                :loading="printLoading"
                v-print="printObj"
                >{{ $t('msg.userInfo.print') }}</el-button
            >
        </el-card>
        <el-card>
            <div class="user-info-box" id="userInfoBox">
                <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>
                <div class="header">
                    <el-descriptions :column="2" border>
                        <el-descriptions-item :label="$t('msg.userInfo.name')">
                            {{ detailData.username }}
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('msg.userInfo.sex')">
                            {{ detailData.gender }}
                        </el-descriptions-item>
                        <el-descriptions-item
                            :label="$t('msg.userInfo.nation')"
                        >
                            {{ detailData.nationality }}
                        </el-descriptions-item>
                        <el-descriptions-item
                            :label="$t('msg.userInfo.mobile')"
                        >
                            {{ detailData.mobile }}
                        </el-descriptions-item>
                        <el-descriptions-item
                            :label="$t('msg.userInfo.province')"
                        >
                            {{ detailData.province }}
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('msg.userInfo.date')">
                            {{ $filter.dateFilter(detailData.openTime) }}
                        </el-descriptions-item>
                        <el-descriptions-item
                            :label="$t('msg.userInfo.remark')"
                            :span="2"
                        >
                            <el-tag
                                class="remark"
                                size="small"
                                v-for="(item, index) in detailData.remark"
                                :key="index"
                            >
                                {{ item }}
                            </el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item
                            :label="$t('msg.userInfo.address')"
                            :span="2"
                        >
                            {{ detailData.address }}
                        </el-descriptions-item>
                    </el-descriptions>
                    <el-image
                        class="avatar"
                        :src="detailData.avatar"
                        :preview-src-list="[detailData.avatar]"
                    ></el-image>
                </div>
                <div class="body">
                    <el-descriptions direction="vertical" :column="1" border>
                        <el-descriptions-item
                            :label="$t('msg.userInfo.experience')"
                        >
                            <ul>
                                <li
                                    v-for="(
                                        item, index
                                    ) in detailData.experience"
                                    :key="index"
                                >
                                    <span>
                                        {{
                                            $filter.dateFilter(
                                                item.startTime,
                                                'YYYY/MM'
                                            )
                                        }}
                                        ----
                                        {{
                                            $filter.dateFilter(
                                                item.endTime,
                                                'YYYY/MM'
                                            )
                                        }}</span
                                    >
                                    <span>{{ item.title }}</span>
                                    <span>{{ item.desc }}</span>
                                </li>
                            </ul>
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('msg.userInfo.major')">
                            {{ detailData.major }}
                        </el-descriptions-item>
                        <el-descriptions-item :label="$t('msg.userInfo.glory')">
                            {{ detailData.glory }}
                        </el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { getUserDetail } from '@/api/userManger';
import { watchSwitchLang } from '@/utils/i18n';
import { ref } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true
    }
});
const detailData = ref({});
const getDetail = async () => {
    try {
        console.log('[ props.id ]', props.id);
        detailData.value = await getUserDetail(props.id);
    } catch (error) {
        detailData.value = {
            role: [
                {
                    id: '1',
                    title: '超级管理员'
                }
            ],
            remark: ['超级管理员', 'BOSS'],
            experience: [
                {
                    startTime: '1538323200000',
                    endTime: '1551369600000',
                    title: '快搭网',
                    desc: '混合开发京东商城'
                },
                {
                    startTime: '1614528000000',
                    endTime: '1625068800000',
                    title: '快搭网',
                    desc: 'uni-app 开发企业级小程序'
                }
            ],
            _id: '612710a0ec87aa543c9c341d',
            id: '0',
            openTime: '1433088000000',
            username: 'super-admin',
            title: '超级管理员',
            mobile: '188xxxx0001',
            avatar: 'http://div.junzher.net/img/logo.5446419a.png',
            gender: '男',
            nationality: '汉',
            address: '北京市朝阳区xx大道 11xx0 号 3 层',
            major: '快速搭建无限可能',
            glory: '海量模板一键部署'
        };
    }
};
getDetail();
watchSwitchLang(getDetail);

// 打印
const printLoading = ref(false);
const printObj = {
    // 打印区域
    id: 'userInfoBox',
    // 打印标题
    popTitle: 'vue3 admin common',
    // 打印前
    beforeOpenCallback() {
        printLoading.value = true;
    },
    // 执行打印
    openCallback() {
        printLoading.value = false;
    }
};
</script>

<style lang="scss" scoped>
.print-box {
    margin-bottom: 20px;
    text-align: right;
}
.user-info-box {
    width: 80%;
    margin: 0 auto;
    .title {
        text-align: center;
        margin-bottom: 18px;
    }
    .header {
        display: flex;
        :deep(.el-descriptions) {
            flex-grow: 1;
        }
        .avatar {
            width: 187px;
            box-sizing: border-box;
            padding: 30px 20px;
            border: 1px solid #ebeef5;
            border-left: none;
        }
        .remark {
            margin-right: 12px;
        }
    }
    .body {
        ul {
            list-style: none;
            li {
                span {
                    margin-right: 62px;
                }
            }
        }
    }
    .foot {
        margin-top: 42px;
        text-align: right;
    }
}
</style>
