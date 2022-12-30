// 导入所有的svg图标
// 完成svgicon 全局注册
import SvgIcon from '@/components/SvgIcon';
// https://webpack.docschina.org/guides/dependency-management/#requirecontext
const svgRequire = require.context('./svg', false, /\.svg$/);
// 此时返回一个 Require 函数   可以接收一个request的参数  用于require的导入
// 此导出函数有三个属性：resolve, keys, id。
// resolve 是一个函数，它返回 request 被解析后得到的模块 id。
// keys 也是一个函数，它返回一个数组，由所有可能被此 context module 处理的请求（译者注：参考下面第二段代码中的 key）组成。
// 改函数提供三个属性   可以通过 svgRequire.keys() 获得所有的svg的图标
// 遍历图标  把图标作为request 参数传入到 svgRequire 导入的函数中  完成本地svg图标的导入
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon));

export default (app) => {
    app.component('svg-icon', SvgIcon);
};
