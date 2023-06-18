// 需要安装类型声明
import {forEach} from "lodash"

const mainArr = ['a', 'b', 'c']
let sre = ''
forEach(mainArr, (ele)=>{
  sre += ele
})

console.log('str', sre)