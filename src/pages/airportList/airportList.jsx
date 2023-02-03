import { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import "./airportList.scss"
import tools from '@/common/tools'
import { airportCityListReq } from '@/common/api'
import {ERR_MES} from '@/common/constant'
import CityItem from './components/CityItem'

export default class AirportList extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      cityListObj: {}, // 处理之后的城市列表
      // eslint-disable-next-line react/no-unused-state
      letterList: [], // 字母列表
      // eslint-disable-next-line react/no-unused-state
      currentLetter: "A", // 当前选中的字母
    }
  }

  componentDidMount() {
    this.getCityList()
  }

  // 格式化数据
  formatList = (list) => {
    // obj = {
    //   A: [
    //     {},
    //     {}
    //   ],
    //   B: [

    //   ]
    // }
    const obj = {}
    if (list?.length) {
      list.map((ele) => {
        const {firstLetter} = ele
        // 判断obj中是否有以firstLetter为键的属性
        if (!obj[firstLetter]) {
          obj[firstLetter] = []
        }
        obj[firstLetter].push(ele)
      })
    }
    return obj
  }

  //请求数据
  getCityList = () => {
    // loading
    tools.showLoading()
    // 从缓存中获取数据
    const storageList = tools.getStorageSyncWithTime("flightCityList")
    if (storageList?.length) {
      const obj = this.formatList(storageList)
      this.setState({
        cityListObj: obj,
        letterList: Object.keys(obj),
      })
      tools.hideLoading()
      return
    }
    airportCityListReq().then(res => {
    // 缓存数据(20秒)
      tools.setStorageSyncWithTime("flightCityList", res.result, 20)
    // 格式化数据
      const obj = this.formatList(res.result)
      console.log(obj)
      this.setState({
        cityListObj: obj,
        letterList: Object.keys(obj)
      })


    }).catch(err => {
      const { message } = err
      console.log(message)
      tools.showToast(ERR_MES)
    }
    ).finally(() => {
      // 隐藏loading
      tools.hideLoading()
    })
  }

  // 点击字母
  onLetterClick = (letter) => {
    this.setState({
      currentLetter: letter
    })
  }

  render() {
    const { cityListObj, letterList, currentLetter } = this.state
    return (
      <View className="airport-list-container">
        <ScrollView scrollY style={{height: "100vh"}} scrollIntoView={currentLetter} scrollWithAnimation={tools.isAliPay ? false : true}>
          {
            letterList.map((item) => {
              const cityList = cityListObj[item]
              return (
                <CityItem
                  key={item}
                  label={item}
                  cityList={cityList}
                />
              )
            })
          }
        </ScrollView>
        <View className="letter-container">
          {
            letterList.map((item) => {
              return (
                <View
                  key={item}
                  className="letter-item"
                  onClick={() => this.onLetterClick(item)}
                >
                  {item}
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
