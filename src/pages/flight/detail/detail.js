import { PureComponent } from "react";
import { View, Text, Button, Image, Input } from "@tarojs/components";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import dayjs from "dayjs";
import tools from "@/common/tools";
import { connect } from "react-redux";
import { orderReq } from "@/common/api";
import { ERR_MES } from "@/common/constant";
// 分享到朋友圈
import withShare from "@/common/decorator/withShare";
// 登录
import loginDecorator from "@/components/LoginDecorator";

import "./detail.scss";

@withShare({
  title: "我的行程分你一半，快乐同样分你一半，啦啦啦啦",
  imageUrl:
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180914%2Ff4b0c16e207e4fd0b686bf378a62989c.jpg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633356232&t=99c2f5e1ceb1b611976b1e28608aeee7",
})
@loginDecorator
@connect(({ user }) => ({
  ...user,
}))
export default class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFlightData: {},
      // isChecked: false,
    };
  }

  componentDidMount() {
    const { params } = getCurrentInstance().router;
    this.setState({
      selectedFlightData: {
        ...params,
      },
    });
  }
  // 参数
  // id=1&arrTime=2021-09-05T10:55:00.000Z&airCompanyName=中国国航&airIcon=https://images3.c-ctrip.com/ztrip/airline/CA.png&price=548&dptTimeStr=10:29&arrTimeStr=18:55&dptAirportName=虹桥机场&dptCityName=上海&arrCityName=北京&arrAirportName=大兴机场&dptTime=2023-02-03

  // 订票
  onOrder = () => {
    const { userPhone } = this.props;
    const { selectedFlightData } = this.state;
    tools.doLogin(() => {
      tools.showLoading();
      orderReq({
        userPhone,
        orderInfo: selectedFlightData,
      })
        .then(() => {
          tools
            .showToast({
              title: "预定成功...",
              icon: "loading",
              duration: 2000,
            })
            .then(() => {
              Taro.switchTab({
                url: "/pages/order/order",
              });
            });
        })
        .catch((err) => {
          tools.showToast(err?.data?.mes || ERR_MES);
        })
        .finally(() => {
          tools.hideLoading();
        });
    });
  };

  render() {
    const { selectedFlightData } = this.state;
    // 航班信息
    const {
      airCompanyName,
      airIcon,
      arrAirportName,
      arrTimeStr,
      dptAirportName,
      dptTime,
      dptTimeStr,
      price,
    } = selectedFlightData;

    // 用户信息
    const { userPhone, isLogin, nickName } = this.props;
    return (
      <View className="detail-container">
        <View className="flight-segment">
          <View className="info-head">
            <View className="tag">直飞</View>
            <View className="company-info">
              <Image src={airIcon} className="logo"></Image>
              {`${airCompanyName} ${dayjs(dptTime).format("M月D日")}`}
            </View>
          </View>
          <View className="info-detail">
            <View className="from">
              <View className="time">{dptTimeStr}</View>
              <View className="station">{dptAirportName}</View>
            </View>
            <Image
              className="mid"
              src="https://i.postimg.cc/z3P1QNf1/1.png"
            ></Image>
            <View className="to">
              <View className="time">{arrTimeStr}</View>
              <View className="station">{arrAirportName}</View>
            </View>
          </View>
        </View>
        <View className="passenger-box module-box">
          <Text className="title">乘机人</Text>
          {isLogin ? (
            <View className="name">{nickName}</View>
          ) : (
            <Button className="add-btn name" onClick={tools.doLogin}>
              新增
            </Button>
          )}
        </View>
        <View className="passenger-box module-box">
          <Text className="title">联系手机</Text>
          <View className="phone-box">
            <Text className="num-pre">+86 </Text>
            <Input
              disabled
              placeholder="请输入乘机人手机号"
              value={userPhone}
            ></Input>
          </View>
        </View>
        {/* 测试Taro bug */}
        {/* <Switch
      onChange={this.onSwitchChange}
    ></Switch>
    <View>
      {
        isChecked ? (
          <View className="module-box">
            <Text className="title">保险</Text>
            <View className="insurance-name">
              <Text>人身意外险</Text>
              <Text>¥ 30/人</Text>
            </View>
          </View>
        ) : null
      }
    </View> */}
        <View className="price-item">
          <View className="color-red">
            ¥ <Text className="price color-red">{price}</Text>
          </View>
          <View className="order-btn" onClick={this.onOrder}>
            订
          </View>
        </View>
        <Button className="share-btn" openType="share">
          快将行程分享给好友吧
        </Button>
        {/*  机票底部  */}
        <View className="flight-info"></View>
      </View>
    );
  }
}
