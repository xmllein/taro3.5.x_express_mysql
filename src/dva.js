// dva 入口文件
import { create } from "dva-core";

// dva 实例
let app;

// state树对象
let store;

// 改变state树的方法
let dispatch;

const createApp = (opt) => {
  // 创建dva实例
  app = create(opt);
  // 如果有插件，就注册插件
  if (opt && opt.plugins) {
    opt.plugins.forEach((plugin) => plugin(app));
  }

  // 确保每次调用createApp都会返回同一个dva实例
  if (!global.registered) {
    opt.models.forEach((model) => app.model(model));
  }
  global.registered = true;

  // 运行dva实例
  app.start();

  // 获取state树
  store = app._store;
  // 用户函数返回store，确保每次调用全新的store
  app.getStore = () => store;

  // 获取dispatch方法
  dispatch = store.dispatch;
  app.getDispatch = () => dispatch;

  // 返回dva实例
  return app;
};

export default createApp;
