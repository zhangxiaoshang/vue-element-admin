import request from '@/utils/request'

export function fetchUsers(query) {
  return request({
    url: '/system/users',
    method: 'get',
    params: query
  })
}
