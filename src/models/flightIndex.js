import dayjs from "dayjs";
// 初始化状态
const INIT_STATE = {
  // 出发城市
  dptCityId: 2,
  dptCityName: "上海",
  // 出发机场
  dptAirportName: "虹桥机场",
  // 到达城市
  arrCityId: 1,
  arrCityName: "北京",
  // 到达机场
  arrAirportName: "大兴机场",
  // 选择的城市类型 1 depart 出发城市 2 arrive 到达城市
  cityType: "depart",
  // 日期
  dptDate: dayjs().format("YYYY-MM-DD"), // 起飞时间
};

export default {
  namespace: "flightIndex",
  state: { ...INIT_STATE },
  reducers: {
    // 更新状态
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
