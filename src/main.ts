// 使用css
import "@style/index.css";
import "@style/index.less";
import "@utils/appendChild";
import "@typeScript/index";

// mock数据
fetch('/api/users', { method: "post" }).then(res=>res.json()).then(res=>{
  console.log(res);
})

console.log("环境变量", import.meta.env);
