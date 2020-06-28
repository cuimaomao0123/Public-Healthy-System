import { request } from './request'

//获取用户列表
export function userList(pagesize){
  return request({
    url:'heat/paging',
    params:pagesize
  })
}

//查询单条用户信息（根据姓名查询）
export function searchUser(name) {
  return request({
    url:'heat/search',
    params:{
      name
    }
  })
}

//删除用户
export function deleteUser(id) {
  return request({
    url:'heat/users/' + id,
    method:'delete'
  })
}

//添加用户
export function addUserList(info) {
  return request({
    url:'heat/users',
    method:'post',
    data:info
  })
}

//编辑用户
export function editUserList(info) {
  return request({
    url:'/heat/users/' + info.id,
    method:'put',
    data:info
  })
}

