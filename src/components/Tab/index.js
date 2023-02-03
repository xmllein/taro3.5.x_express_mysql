import { PureComponent } from "react";
import { View, Swiper } from "@tarojs/components";

import "./index.scss";

export default class Tab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // 默认选中第一个
      // eslint-disable-next-line react/no-unused-state
      currentId: 0,
    };
  }

  // 组件挂载完成
  componentDidMount() {
    // 用户自定义初始化选项卡
    const { initTab, tabList } = this.props;
    // 默认
    if (initTab === undefined) {
      this.setState({
        currentId: tabList?.[0]?.id,
      });
    } else {
      this.setState({
        currentId: initTab,
      });
    }
  }

  // 点击选项卡
  handleClick = (id) => {
    this.setState({
      currentId: id,
    });
    // 传递给父组件
    this.props.onTabClick?.(id);
  };

  // swiper切换
  handleChange = (e) => {
    const id = e.detail.current;
    this.setState(
      {
        currentId: id,
      },
      () => {
        // 传递给父组件
        this.props.onchange?.(id);
      }
    );
  };

  render() {
    const { className, tabList, children } = this.props;
    const { currentId } = this.state;
    const innerStyle = {
      width: `${100 / tabList?.length}%`,
      transform: `translateX(${currentId * 100}%)`,
    };
    return (
      <View className={`tab-container ${className}`}>
        <View className="tab-bar">
          {/* 选项卡 */}
          {tabList?.map((item) => {
            return (
              <View
                className={`tab-item ${currentId === item.id ? "active" : ""}`}
                key={item.id}
                onClick={() => this.handleClick(item.id)}
              >
                {item.label}
              </View>
            );
          })}
          <View className="scroll-bar" style={innerStyle}></View>
        </View>
        {/* 选项卡内容 */}
        <Swiper
          current={currentId}
          className="tab-content"
          onChange={this.handleChange}
        >
          {children}
        </Swiper>
      </View>
    );
  }
}
