const express = require("express");

// 实例化express
const app = express();
const models = require("./models");

// 配置路由
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// 请求体Content-Type: application/json
app.use(express.json());
// 请求体Content-Type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

models(app);

// 监听端口
app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
