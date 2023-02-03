import { PureComponent } from "react";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import { View, Text } from "@tarojs/components";

import "./index.scss";

@connect(({ flightIndex }) => ({
  ...flightIndex,
}))
export default class CityItem extends PureComponent {
  // 点击城市
  onCityClick = (cityInfo) => {
    // 判断类型
    const { cityType } = this.props;
    const { cityId, cityName, airportName } = cityInfo;

    // 更新城市
    this.props.dispatch({
      type: "flightIndex/updateState",
      payload:
        cityType === "depart"
          ? {
              dpCityId: cityId,
              dpCityName: cityName,
              dpAirportName: airportName,
            }
          : {
              arrCityId: cityId,
              arrCityName: cityName,
              arrAirportName: airportName,
            },
    });

    // 返回上一页
    Taro.navigateBack();
  };

  render() {
    const { label, cityList } = this.props;
    return (
      <View className="list-item" id={label}>
        <Text className="label">{label}</Text>
        {cityList.map((item) => {
          return (
            <View
              key={item.id}
              className="name"
              onClick={() => this.onCityClick(item)}
            >
              {`${item.cityName} (${item.airportName})`}
            </View>
          );
        })}
      </View>
    );
  }
}
