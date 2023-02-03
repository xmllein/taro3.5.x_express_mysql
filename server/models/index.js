module.exports = (app) => {
  // 广告
  app.use("/ads", require("./ads"));
  // 城市
  app.use("/city", require("./airportList"));
  // 航班列表
  app.use("/list", require("./list"));
  // 登录
  app.use(require("./login"));
  // 订单
  app.use("/order", require("./orderList"));
};
