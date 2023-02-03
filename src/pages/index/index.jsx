import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Flight from '../flight/index'
import NoExploit from '../../components/NoExploit'

// 定义tab数据
const DEFAULT_TAB_LIST = [
  { title: '机票', index: 0, tab: 'flight' },
  { title: '火车票', index: 1, tab: 'train' },
  { title: '酒店', index: 2, tab: 'hotel' },
  { title: '汽车票', index: 3, tab: 'bus' },
]


export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // 当前选中的tab
      // eslint-disable-next-line react/no-unused-state
      currentTab: 0,
    }
  }

  // 点击事件
  switchTab (index) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      currentTab: index
    })
  }

  render () {
    const { currentTab } = this.state
    const innerStyle = {
      width: `${100 / DEFAULT_TAB_LIST.length}%`,
      transform: `translateX(${currentTab * 100}%)`
    }
    return (
      <View className="index-container">
        <View className="top">
          <View className="index-tab">
            {
              DEFAULT_TAB_LIST.map((item) => {
                return (
                  <View className={`index_tab_item ${item.tab} ${currentTab === item.index ? 'current' : ''}`} key={item.tab} onClick={()=> this.switchTab(item.index)}>
                    <Text>{item.title}</Text>
                  </View>
                )
              })
            }
          </View>
          <View className="scrollbar" style={innerStyle}></View>
        </View>
        {
          DEFAULT_TAB_LIST[currentTab].tab === 'flight' ? <Flight /> : <NoExploit />
        }


      </View>
    )
  }
}
