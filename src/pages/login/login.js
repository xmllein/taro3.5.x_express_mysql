import { PureComponent } from "react";
import { View, Text, Button, Image, Input } from "@tarojs/components";
import { debounce } from "@/common/utils";
import tools from "@/common/tools";
import { loginReq } from "@/common/api";
import { USER_VALID_TIME, ERR_MES } from "@/common/constant";
import Taro from "@tarojs/taro";
import { connect } from "react-redux";
import "./login.scss";

@connect(({ user }) => ({
  ...user,
}))
export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nickName: "",
      userPhone: "",
      password: "",
    };
  }
  // 输入框防抖
  handleInput = debounce((e, type) => {
    console.log(e, type);
    this.setState({
      [type]: e.detail.value,
    });
  }, 300);

  // 登录
  onLogin = () => {
    const { userPhone, password, nickName } = this.state;
    if (!userPhone || !password || !nickName) {
      return tools.showToast("所有内容必须填写完整～");
    }
    // 验证手机号
    const reg = /^1[3-9]\d{9}$/;
    if (!reg.test(userPhone)) {
      return tools.showToast("请填写正确手机号～");
    }
    tools.showLoading();
    // 登录请求
    loginReq({
      userPhone,
      password,
      nickName,
    })
      .then((res) => {
        const { result } = res;
        tools.setStorageSyncWithTime(
          "userInfo",
          {
            userPhone: result.userPhone,
            nickName: result.nickName,
          },
          USER_VALID_TIME
        );
        this.props.dispatch({
          type: "user/updateState",
          payload: {
            isLogin: !!result.userPhone,
            userPhone: result.userPhone,
            nickName: result.nickName,
          },
        });
        Taro.navigateBack();
      })
      .catch((err) => {
        const { data } = err;
        if (data?.mes) {
          return tools.showToast(data.mes);
        }
        tools.showToast(ERR_MES);
      })
      .finally(() => {
        tools.hideLoading();
      });
  };

  render() {
    return (
      <View className="login-container">
        <View className="login-top">
          <View>你好，</View>
          <View>欢迎登录</View>
        </View>
        <View className="login-box">
          <Input
            type="text"
            className="nick-name input"
            placeholder="请输入昵称"
            placeholderClass="placeholer-class"
            onInput={(e) => this.handleInput(e, "nickName")}
          ></Input>
          <Input
            type="text"
            className="phone input"
            placeholder="请输入手机号"
            placeholderClass="placeholer-class"
            onInput={(e) => this.handleInput(e, "userPhone")}
          ></Input>
          <Input
            type="password"
            className="password input"
            placeholder="请输入密码"
            placeholderClass="placeholer-class"
            onInput={(e) => this.handleInput(e, "password")}
          ></Input>
        </View>
        <Button className="login-btn" onClick={this.onLogin}>
          登录
        </Button>
      </View>
    );
  }
}
