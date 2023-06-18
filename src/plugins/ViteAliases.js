const fs = require('fs')
const path = require("path")


function diffDirAndFile(dirFilesArr = [], basePath = ""){
  const result = {
    dirs:[],
    files:[]
  }
  dirFilesArr.forEach(name => {
    const currentFileState = fs.statSync(path.resolve(__dirname, basePath + "/" + name))
    const idDirectory = currentFileState.isDirectory()
    if(idDirectory){
      result.dirs.push(name)
    }else{
      result.files.push(name)
    }
  })

  return result
}

function getTotalSrcDir(){
  const result = fs.readdirSync(path.resolve(__dirname, '../../src'))
  const diffResult = diffDirAndFile(result, "../../src")
  const resolveAliasesObj = {}
  diffResult.dirs.forEach(dirName => {
    const key = `@${dirName}`
    const absPath = path.resolve(__dirname, "../../src" + '/' + dirName)
    resolveAliasesObj[key] = absPath
  })
  return resolveAliasesObj
}

export default () => {
  return {
    // config 函数返回一个对象，会覆盖全局参数
    // 1、config：vite.config 中的基础配置
    // 2、env 对象
    //    mode：当前开发模式，production、development
    //    command：输入的命令，dev、build
    config(config, env){
      const resolveAliasesObj = getTotalSrcDir()
      return {
        // envPrefix: 'abc'
        resolve: {
          alias: resolveAliasesObj
        }
      }
    } 
  }
}