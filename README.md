// 0、浏览器支持 ESM
// 0.1 天然支持 html、css、js 文件
// 0.2、对于js文件
//     只加载 "/"、 "./"、"../"
//     不识别 import、require 不会自动去查找 node_modules 下的包，一个包可能应用成千上万个包
// 0.4、webapck
//     a、将 EMS、commonjs 都转为 webpack.require() 自己的模式加载
//     b、webpack 先进行整体的构建，再开启一个服务器
//     c、vite 先启动一个服务器，再依据入口依次加载依赖模块



// 1、针对于非相对路径：esm、commonjs
// 1.1、vite会做路径补全：
//     /node_modules/.vite/deps/lodash.js
// 1.2、依赖预构建
//    a、使用 esbuild 都转化为 esm 的方式，放到 /node_modules/.vite/deps...
//    b、内部使用时，直接引入 /node_modules/.vite/deps...
//    c、解决了网络多包传输的问题：common、esm 直接转我 var ...
//       例如：export {defaule as a} from './a' 
//       转为：function a(){}



// 2、vite 语法提示问题
// 2.1、使用 defineConfig 包裹
// import { defineConfig } from 'vite'
// export default defineConfig({
//   // ...
// })
// 2.2、使用 defineConfig 包裹
// /** @type {import('vite').UserConfig} */
// export default {
//   // ...
// }



// 3、环境变量：vite中内置了 dotenv 插件
// 3.1 服务器端
// 3.1.1 Vite 默认是不加载 .env 文件
// 3.1.2 Vite 导出的 loadEnv 函数来加载指定的 .env 文件
// 3.1.3 配置环境的文件介绍
//     .env：所有环境都用到的环境变量
//     .env.development：开发环境下用到的环境变量
//     .env.production：生产环境下用到的环境变量
// 3.2 客户端
// 3.2.1 使用 import.meta.env 获取环境变量
// 3.2.2 默认禁止手动注入参数，需要手动处理
//       a：添加前缀：vite_APP_KEY
//       b：自定义前缀：envPrefix:"ENV"




// 4、处理css文件，天生支持css
// 4.1 css模块化
//   a、服务器端直接使用 fs 模块读取 index.css 文件内容
//   b、创建一个 style 标签，插入到 html 中
//   c、css文件中的内容会直接被替换为js脚本（方便热更新、css模块化）
//   d、使用 cssmodule 解决样式覆盖的问题
// 4.2 自定义配置 less、sass
// 4.3 配置 postcss



// 5、加载静态资源：raw、url
// 5.1 import * from '*?raw' 
// 5.2 配置别名


// 6、自定义插件


// 7、结合ts
// 7.1 天生支持ts
// 7.2 结合 vite-plugin-checker



// 8、vite性能优化





