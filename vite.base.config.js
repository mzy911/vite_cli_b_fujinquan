import { options } from "less"
import path from "path"
import { defineConfig } from 'vite'
import { viteMockServe } from "vite-plugin-mock"
import checker from 'vite-plugin-checker'
import viteCompression from 'vite-plugin-compression';
import importToCDN from 'vite-plugin-cdn-import'
import postcssPresetEnv from "postcss-preset-env"

// 自动按照 src 下的目录，动态生成别名 @/component
// import { ViteAliases } from 'vite-aliases'
// 手写 ViteAliases
import MyViteAliases from './src/plugins/ViteAliases'
import MyViteHtml from "./src/plugins/ViteHtml"
import MyViteMock from "./src/plugins/ViteMock"



export default defineConfig({
  // 客户端获取 .env 内声明的环境变量
  // 1、默认前缀为'VITE_'
  // 2、可以自定义
  // 3、不遵守规则是获取不到的
  envPrefix: "VITE_",


  // vite项目运行前会进行预构建, 手动配置某些库不进行依赖预构建
  optimizeDeps: {
    exclude: []
  },


  resolve: {
    // 读取文件优先级
    extensions: [".js", ".ts", ".vue", "jsx", "tsx", "json"],
    // 配置静态文件别称
    alias: {
      "@": path.resolve(__dirname, './src'),
      "@style": path.resolve(__dirname, './src/common/style/'),
      "@image": path.resolve(__dirname, './src/common/image/'),
    }
  },

  // 静态文件的路径，不会处理直接copy的文件
  // publicDir:'/public',
  server: {
    proxy: {
      "/api1": {
        target: "https://www.360.com", // https://www.360.com/api
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 重写路径
      }
    }
  },


  css: {
    // css 模块化相关配置
    modules: {
      // 转换后类名的现实方式：camelCase、camelCaseOnly、dashes、dashesOnly
      localsConvention: 'camelCase',
      // 是否给 *.model.css 文件开启模块化：local、global
      scopeBehaviour: 'local',
      // 禁止某些文件开启模块化
      globalModulePaths: ["./common/style/common.module.css"],
      // 自定义生成文件名称的规则
      generateScopedName: "[name]_[local]_[hash:5]",
      // "盐"：默认根据类名生成h ash、可以自定义
      hashPrefix: "AAAA",
    },

    // css 预处理器相关配置
    preprocessorOptions: {
      // 只要安装 less 就可以直接使用sass语法
      less: {
        // 只计算带有括号的值 (100 / 2)
        math: "always",
        // 定义全局变量
        // 1、在less文件内定义变量： @mainColor
        // 2、在其他 less 文件内直接使用 @mainColor 变量
        globalVars: {
          mainColor: 'red'
        },
      },
      // 只要安装 sass 就可以直接使用sass语法
      sass: {

      }
    },

    // 是否开启文件索引：开发环境用来检测错误位置
    devSourcemap: false,

    // 配置 postcss
    // 或者使用 postcss.config.js 配置文件
    postcss: {
      plugins: [
        postcssPresetEnv()
      ]
    }
  },


  // 打包构建
  build: {
    // 关闭压缩
    "minify": false,

    // 配置构建策略
    rollupOptions: {
      // 多入口打包
      // input:{
      //   main: path.resolve(__dirname, "./index.html"),
      //   product:path.resolve(__dirname, "./producgt.html")
      // },
      output: {
        assetFileNames: "[hash].[name].[ext]", // ext：文件占位符
        // 分组打包
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vender"
          }
        }
      },

      // 打包的时候，将某些第三方包排出在外(页面加载时使用CDN)
      external: []
    },

    // 小于4k，base64
    assetsInlineLimit: 40960,

    // 打包后的根目录，默认为 dist
    outDir: "dist",

    // 打包后存储静态文件的文件夹名称
    assetsDir: "static",

    // 每次构建是否清楚 dist 下文件
    emptyOutDir: true,

  },


  // 使用插件
  plugins: [
    // 自定义静态资源路径
    // ViteAliases(),
    MyViteAliases(),
    MyViteHtml({
      inject: {
        data: {
          title: '首页'
        }
      }
    }),

    // MyViteMock(),
    viteMockServe({
      mockPath: 'mock', // 自定义文件夹名称，默认下根目录下
      // localEnabled: command == 'serve'
    }),



    // 开启压缩，gz
    // 1、服务器读取 gzip 文件，需要设置请求头 content-encoding:gzip
    // 2、浏览器发现 gzip 会自动解压
    viteCompression(),


    // 可以在工作线程中运行TypeScript, VLS, vue-tsc, ESLint, Stylelint
    checker({ typescript: true }),


    // 使用cdn
    importToCDN({
      // 等同于：external:['lodash']
      modules: [
        {
          name: 'lodash',
          var: '_', // 报漏的全局名称
          path: `https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js`,
        },
      ],
    }),


    // 自定义插件毁掉函数( 钩子函数 )
    {
      config(options) {
        // console.log('插件配置', options);
      },
      configureServer(server) {
        console.log("配置服务器");
      },
      transformIndexHtml(html) {
        console.log("转译html");
      },
      configResolved(options) {
        // console.log("整个配置文件解析完成之后触发的钩子", options);
      },
      // 预览服务
      configurePreviewServer(server) {

      },
      //  *********** 获取rollup相关的配置，跟上面的函数功能基本一一对应  ***********  
      options(rollupOptions) {
        // console.log('rollupOptions', rollupOptions);
      },
      buildStart(fullOptions) {
        // console.log("整个配置文件解析完成之后触发的钩子", options);
      }
    },
    // postcssPresetEnv()
  ],

})

