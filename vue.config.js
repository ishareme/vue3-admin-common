const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        plugins: [new NodePolyfillPlugin()]
    },
    chainWebpack(config) {
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
    },
    devServer: {
        proxy: {
            // 地址中包含 /api 的时候
            '/api': {
                target: 'https://api.imooc-admin.lgdsunday.club/',
                // 跨域
                changeOrigin: true
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            codeType: '1672377159',
            icode: 'J908417ABEFE2F0F1'
        }
    }
});
