import Mock from 'mockjs'
import { param2Obj } from '@/utils'

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

export default {
  getUsers: (config) => {
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
  getPv: () => ({
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: (config) => {
    const { id } = param2Obj(config.url)
    for (const article of List) {
      if (article.id === +id) {
        return article
      }
    }
  },
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
