const mockjs = require("mockjs")

const userList = mockjs.mock({
  "data|5":[{
    name:"@cname", // 中文名称
    ename:"@ename",
    "id|+1":1
  }]
})

module.exports = [
  {
    methods: "post",
    url:"/api/users",
    response:({body}) =>{
      return {
        code: 200,
        mas:"success",
        data:userList.data
      }
    }
  }
]