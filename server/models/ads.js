const express = require("express");
const sqlQuery = require("../mysql");
const router = express.Router();

const imgLists = [
  "http://itying.com/images/flutter/1.png",
  "http://itying.com/images/flutter/2.png",
];

// 创建ads表
const createTable = async () => {
  try {
    const sql =
      "create table if not exists ads (id int not null auto_increment, title varchar(255) not null, url varchar(255) not null, primary key (id)) engine=InnoDB default charset=utf8;";
    const res = await sqlQuery(sql);
    console.log("res", res);
    // 插入数据
    const insertSql =
      "insert into ads (title, url) values ('广告1', 'http://itying.com/images/flutter/1.png'), ('广告2', 'http://itying.com/images/flutter/2.png')";
    const insertRes = await sqlQuery(insertSql);
    console.log("insertRes", insertRes);
  } catch (error) {
    console.log("error", error);
  }
};

// createTable();

router.get("/advertising", async (req, res) => {
  const strSql = "select * from ads";
  try {
    const result = await sqlQuery(strSql);
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (error) {
    res.send({
      code: -1,
      message: "失败",
    });
  }
});

module.exports = router;
