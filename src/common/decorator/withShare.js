const withShare = (opts) => {
  // 返回react高阶组件
  /**
   * WrapperComponet withShare包裹的组件
   * @{param}
   */
  return (WrapperComponet) => {
    class MyComponent extends WrapperComponet {
      onShareAppMessage() {
        console.log(this.props);
        return {
          ...opts,
          // 页面路径，必须是以 / 开头的完整路径
          path: `/${this.props.tid}`,
        };
      }
    }

    return MyComponent;
  };
};

export default withShare;
