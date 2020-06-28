import { request } from './request'

export function loginCheck(username,password) {
  return request({
    url:'heat/login',
    method:'post',
    data:{
      username,
      password
    }
  })
}
