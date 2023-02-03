import { PureComponent } from "react";
import Taro from "@tarojs/taro";
import {
  SwiperItem,
  View,
  Text,
  Button,
  Swiper,
  Image,
} from "@tarojs/components";
import { connect } from "react-redux";
import "./index.scss";
import Tab from "../../../components/Tab";
import NoExploit from "@/components/NoExploit";
import { adsReq } from "@/common/api";
import dayjs from "dayjs";
import tools from "@/common/tools";

const FLIGHT_TABS = [
  {
    label: "单程",
    id: 0,
  },
  {
    label: "多程",
    id: 1,
  },
  {
    label: "往返",
    id: 2,
  },
];

@connect(({ flightIndex }) => ({
  ...flightIndex,
}))
export default class FlightIndex extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      adList: [], // 广告列表
    };
  }

  // 请求数据
  componentDidMount() {
    adsReq().then((res) => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        adList: res.result || [],
      });
    });
    // 获取经纬度
    // this.getLocationInfo();
    // https://developers.weixin.qq.com/miniprogram/dev/api/location/wx.getLocation.html

    // 获取设置好的权限
    Taro.getSetting({}).then((res) => {
      console.log(res);
      if (res.authSetting["scope.userInfo"] === true) {
        Taro.getUserInfo().then((info) => {
          console.log(info);
        });
      }
    });
  }
  // 点击选项卡
  handleTabClick = (id) => {
    console.log(id);
  };
  // swiper切换
  handleTabChange = (id) => {
    console.log(id);
  };

  // 选择城市
  chooseFlightCity = (type) => {
    this.props.dispatch({
      type: "flightIndex/updateState",
      payload: {
        cityType: type,
      },
    });
    // 注意：使用app.config.js中注册的绝对路径，需要加/
    Taro.navigateTo({
      url: "/pages/airportList/airportList",
    });
  };

  // 选择日期
  chooseFlightDate = () => {
    Taro.navigateTo({
      url: "/pages/calendar/calendar",
    });
  };

  /**
   * 获取经纬度
   * @{param}
   */
  getLocationInfo = () => {
    Taro.getFuzzyLocation({
      type: "gcj02",
    })
      .then((res) => {
        const { latitude, longitude } = res;
        console.log("latitude", latitude);
        console.log("longitude", longitude);
        // this.getCity({ latitude, longitude });
      })
      .catch(() => {
        console.log("位置获取失败~");
        tools.showToast("位置获取失败~");
      });
  };

  // 跳转到列表
  onLinkList = () => {
    const {
      arrCityName,
      arrCityId,
      arrAirportName,
      dptCityId,
      dptCityName,
      dptAirportName,
      dptDate,
    } = this.props;

    tools.navigateTo({
      url: "/pages/flight/list/list",
      data: {
        arrCityName,
        arrCityId,
        arrAirportName,
        dptCityId,
        dptCityName,
        dptAirportName,
        dptDate,
      },
    });
  };

  render() {
    const { adList } = this.state;
    const { arrCityName, dptCityName, dptDate } = this.props;
    return (
      <View className="flight-container">
        {/* top */}
        <View className="flight-top">
          <Tab
            tabList={FLIGHT_TABS}
            className="flight-index-tab"
            onTabClick={this.handleTabClick}
            onChange={this.handleTabChange}
          >
            <SwiperItem>
              <View className="item station">
                <View
                  className="cell from"
                  onClick={() => this.chooseFlightCity("depart")}
                >
                  {dptCityName}
                </View>
                <Text className="icon-zhihuan iconfont"></Text>
                <View
                  className="cell to"
                  onClick={() => this.chooseFlightCity("arrive")}
                >
                  {arrCityName}
                </View>
              </View>
              <View className="item date" onClick={this.chooseFlightDate}>
                {dayjs(dptDate).format("M月D日")}
              </View>
              <Button className="search-btn" onClick={this.onLinkList}>
                机票查询
              </Button>
            </SwiperItem>

            {/* 多程 */}
            <SwiperItem>
              <NoExploit className="no-data" />
            </SwiperItem>
            {/* 往返 */}
            <SwiperItem>
              <NoExploit className="no-data" />
            </SwiperItem>
          </Tab>
        </View>
        {/* swiper */}
        <View className="alipay-swiper" style={{ margin: "15px" }}>
          <Swiper className="advs-banner-bd" autoplay circular interval={3000}>
            {adList.map((item) => {
              return (
                <SwiperItem className="item" key={item.url}>
                  <Image src={item.url} className="img" />
                </SwiperItem>
              );
            })}
          </Swiper>
        </View>
        {/* 机票底部 */}
        <View className="flight-info"></View>
      </View>
    );
  }
}
