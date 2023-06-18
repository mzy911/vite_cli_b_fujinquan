const fs = require("fs")
const path = require("path")

export default (options) => {
  return {
    // 拦截 vite 请求
    configureServer(serve){
      // 读取根目录下的 mock 目录
      const mockStat = fs.statSync('mock')
      const isDirectory = mockStat.isDirectory()
      let mockResult = []
      if(isDirectory){
        mockResult = require(path.resolve(process.cwd(), "mock/index.js"))
      }
      
      // 处理中间件
      serve.middlewares.use((req, res, next)=>{
        const matchItem = mockResult.find(mockDescript => mockDescript.url === req.url)
        if(req.url.startsWith('/api')){
          const responseData = matchItem.response(req)
          res.setHeader("Content-Type", "application/json")
          res.end(JSON.stringify(responseData))
        }else{
          next()
        } 
      })
    }
  }
}