import Mock from 'mockjs'
import { param2Obj } from '@/utils'

export default {
  getUsers: (config) => {
    const List = []
    const count = 100

    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        uid: '@increment',
        email: '@email',
        phone: '18601627' + '@uid',
        reg_time: '@datetime',
        recharge_addr: '查看',
        state: '登录正常 交易正常 提现正常'
      }))
    }

    const { email, page, limit } = param2Obj(config.url)
    const mockList = List.filter(item => {
      if (email && item.email.indexOf(email) === -1) {
        return false
      } else {
        return true
      }
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },

  getOrders: (config) => {
    const List = []
    const count = 100

    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        id: '0000' + '@increment',
        uid: '@increment',
        type: ['买入', '卖出'][Math.floor(Math.random() * 2)],
        state: ['新订单', '已撤单', '完全成交'][Math.floor(Math.random() * 3)],
        time: '@datetime',
        volume: '0.0817BTC',
        price: '3978.51USDT',
        amount: '325.044267USDT',
        trade_volume: '0BTC',
        trade_amount: '0USDT',
        avg_price: '0USDT'
      }))
    }

    const { symbol, type, state, uid, id, page, limit } = param2Obj(config.url)
    const mockList = List.filter(item => {
      if (symbol && symbol !== item.symbol) return false
      if (type && type !== item.type) return false
      if (state && state !== item.state) return false
      if (id && id !== item.id) return false
      if (uid && uid !== item.uid) return false
      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },

  getLogs: (config) => {
    const List = []
    const count = 100

    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        uid: '@increment',
        nickname: '@first',
        phone: '1860162' + '@integer(1000, 9999)',
        'api|1': [
          '/api/users',
          '/api/orders',
          '/api/logs'
        ],
        'type|1': ['添加', '删除', '修改', '登录'],
        ip: '@ip',
        time: '@datetime',
        mark: '@sentence(3, 5)'
      }))
    }

    const { api, type, page, limit } = param2Obj(config.url)
    const mockList = List.filter(item => {
      if (api && api !== item.api) return false
      if (type && type !== item.type) return false

      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  },
  getAuths: (config) => {
    const List = []
    const count = 8

    for (let i = 0; i < count; i++) {
      List.push(Mock.mock({
        uid: '@increment',
        email: '@email',
        phone: '1860162' + '@integer(1000, 9999)',
        time: '@datetime',
        update: '@datetime',
        name: '@cname',
        'state|1': ['未审核', '通过', '未通过', '未认证']
      }))
    }

    const { api, type, page, limit } = param2Obj(config.url)
    const mockList = List.filter(item => {
      if (api && api !== item.api) return false
      if (type && type !== item.type) return false

      return true
    })

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      total: mockList.length,
      items: pageList
    }
  }
}
