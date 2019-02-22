import request from '@/utils/request'

export function fetchUsers(query) {
  return request({
    url: '/system/users',
    method: 'get',
    params: query
  })
}

export function fetchOrders(query) {
  return request({
    url: '/system/orders',
    method: 'get',
    params: query
  })
}

export function fetchLogs(query) {
  return request({
    url: '/system/logs',
    method: 'get',
    params: query
  })
}

export function fetchAuths(query) {
  return request({
    url: '/system/auths',
    method: 'get',
    params: query
  })
}
