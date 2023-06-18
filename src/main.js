// 使用css
import "@style/index.css"
import "@style/index.less"
import "@utils/appendChild"
import '@typeScript/index'



// mock数据
// fetch('/api', { method: "get" }).then(res => {
//   console.log("返回的数据", res);
// })


fetch('/api/users', { method: "post" }).then(res=>res.json()).then(res=>{
  console.log(res); 
})



// import.meta.env.

