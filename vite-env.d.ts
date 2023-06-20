
// 引入自定义变量
/// <reference types="./vite-env-override.d.ts" />

// 引入vite下声明的客户端变量
/// <reference types="vite/client" />

// ts文件中、全局使用 import.meta.env 会有类型提示
interface ImportMetaEnv {
  readonly VITE_APP_KEY: string;
  readonly VITE_PROXY_TARGET: string;
}
