// eslint-disable-next-line no-undef
export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/order/order",
    "pages/login/login",
    "pages/airportList/airportList",
    "pages/calendar/calendar",
  ],
  subpackages: [
    {
      root: "pages/flight",
      pages: ["list/list", "detail/detail"],
    },
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "远方",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#7F8389",
    selectedColor: "#5495e6",
    borderStyle: "black",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "./assets/images/index-unselected.png",
        selectedIconPath: "./assets/images/index-selected.png",
      },
      {
        pagePath: "pages/order/order",
        text: "订单",
        iconPath: "./assets/images/order-unselected.png",
        selectedIconPath: "./assets/images/order-selected.png",
      },
    ],
  },
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序位置接口的效果展示",
    },
  },
});
