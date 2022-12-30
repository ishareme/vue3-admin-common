module.exports = {
    // 表示当前目录为根目录  eslint规则讲被限制到该目录下
    root: true,
    // 表示eslint的检测环境
    env: {
        // 在node环境启动eslint检测
        node: true,
        // vue defineProps 等等 全局
        'vue/setup-compiler-macros': true
    },
    // eslint中基础配置需要继承的配置
    extends: ['plugin:vue/vue3-essential', '@vue/standard'],
    // 解析器
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    // 需要修改的启动规则及其各自的错误级别
    /**
     * 错误级别分为三种
     * off 或 0 关闭规则
     * warn 或 1 开启规则  使用警告级别的错误  不会导致程序退出
     * error 或 2 开启规则 使用错误级别的错误  程序会退出
     */
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'space-before-function-paren': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/valid-v-slot': [
            'off',
            {
                allowModifiers: false
            }
        ],
        'comma-dangle': 'off',
        semi: ['error', 'always'],
        indent: ['error', 4],
        quotes: 'off'
    }
};
