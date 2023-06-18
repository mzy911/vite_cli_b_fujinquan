import { defineConfig, loadEnv } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProdConfig from './vite.prod.config'



const envResolver = {
  // vite dev | vite serve
  "serve": () => {
    console.log('开发环境');
    return Object.assign({}, viteBaseConfig, viteDevConfig)
  },
  // vite build
  "build": () => {
    console.log('生产环境');
    return Object.assign({}, viteBaseConfig, viteProdConfig)
  },
 
}


export default defineConfig(({ command, mode, ssrBuild }) => {
  // 参数解析
  // 1、command：脚本指令，dev、build
  // 2、mode：开发模式, development、production、可以自定义字段

  // console.log('当前环境', process.env);
  console.log('脚本', command);

 
  // loadEnv作用：用来加载 .env 配置文件
  // loadEnv接受三个参数，返回所有挂在的环境变量
  // 1、开发模式：development、production、可自定义( npm run dev --mode hahaha)
  // 2、路径：process.cwd() 当前程序运行的跟目录(相对于电脑盘的绝对路径)
  // 3、配置文件的前缀、根据 mode 自动配置文件：默认为 .env 例如：.env.development、.env.production
  const env = loadEnv(mode, process.cwd(), '')

  // console.log('浏览器获取环境变量', env.VITE_APP_KEY);
  // console.log('前端获取环境变量', import.meta.env);

  // 返回最终 config
  return envResolver[command]()
})