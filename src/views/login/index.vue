<template>
    <div class="login-container">
        <el-form
            ref="loginFormRef"
            class="login-form"
            :model="loginForm"
            :rules="loginRules"
        >
            <div class="title-container">
                <h3 class="title">{{ $t('msg.login.title') }}</h3>
                <LangSelect class="lang-select"></LangSelect>
            </div>
            <el-form-item prop="username">
                <span class="svg-container">
                    <svg-icon icon="user"></svg-icon>
                </span>
                <el-input
                    placeholder="username"
                    name="username"
                    type="username"
                    v-model="loginForm.username"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon="password"></svg-icon>
                </span>
                <el-input
                    placeholder="password"
                    name="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                ></el-input>
                <span class="show-pwd" @click="onChangePwdType">
                    <svg-icon
                        :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
                    ></svg-icon>
                </span>
            </el-form-item>

            <el-button
                type="primary"
                class="login-btn"
                @click="handlerLogin"
                :loading="loading"
                >{{ $t('msg.login.loginBtn') }}</el-button
            >

            <div class="tips" v-html="$t('msg.login.desc')"></div>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import LangSelect from '@/components/LangSelect';

import { validatePassword } from './rules';
import { useI18n } from 'vue-i18n';

// 数据源
const loginForm = ref({
    username: 'super-admin',
    password: '123456'
});
const i18n = useI18n();
// 验证规则
const loginRules = ref({
    username: [
        {
            required: true,
            trigger: 'blur',
            message: i18n.t('msg.login.usernameRule')
        }
    ],
    password: [
        {
            required: true,
            trigger: 'blur',
            validator: validatePassword()
        }
    ]
});

// 处理密码框文本显示
// password text
const passwordType = ref('password');
// 绑定的方法直接声明
const onChangePwdType = () => {
    passwordType.value =
        passwordType.value === 'password' ? 'text' : 'password';
};

// 处理登录
const loading = ref(false);
const store = useStore();
const loginFormRef = ref(null);
const router = useRouter();
const handlerLogin = () => {
    // 1. 表单校验
    loginFormRef.value.validate(async (valid) => {
        try {
            if (!valid) return;
            // 2. 触发登录动作
            loading.value = true;
            await store.dispatch('user/login', loginForm.value);
            loading.value = false;
            // 3. 登录后操作
            router.push('/');
        } catch (error) {
            console.log('[ user/login error ]', error.response);
            loading.value = false;
        }
    });
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_grey: #889aa4;
$light_grey: #eee;
$cursor: #fff;
.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    .login-form {
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 160px 35px 0;
        margin: 0 auto;
        overflow: hidden;

        :deep(.el-form-item) {
            border: 1px solid rgba($color: #fff, $alpha: 0.1);
            background-color: rgba($color: #000, $alpha: 0.1);
            border-radius: 5px;
            color: #454545;
        }

        :deep(.el-input) {
            display: inline-block;
            width: 85%;
            height: 47px;
            input {
                background: transparent;
                border: none;
                border-radius: 0;
                padding: 12px 5px 12px 15px;
                color: $light_grey;
                caret-color: $cursor;
            }
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_grey;
            vertical-align: middle;
            display: inline-block;
        }
        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_grey;
            cursor: pointer;
            user-select: none;
        }
        .title-container {
            position: relative;
            .title {
                font-size: 26px;
                color: $light_grey;
                margin: 0 auto 40px;
                text-align: center;
                font-weight: bold;
            }
        }
        .login-btn {
            width: 100%;
            margin-top: 10px;
        }

        .tips {
            font-size: 16px;
            color: #fff;
            line-height: 25px;
            margin-top: 30px;
        }
        :deep(.lang-select) {
            position: absolute;
            top: 4px;
            right: 0;
            background-color: #fff;
            font-size: 22px;
            padding: 4px;
            border-radius: 4px;
            cursor: pointer;
        }
    }
}
</style>
