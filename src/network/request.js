import axios from 'axios'

 export function request(config){   //config是对象
     // 1、创建实例
     const instance = axios.create({
         baseURL:'http://3c0900e549.qicp.vip/',
         timeout:5000,
       })
       //2.1、axios拦截器，请求拦截
       instance.interceptors.request.use(config => {
         //携带token信息，请求数据
         const token = window.sessionStorage.getItem('token')
         config.headers['token'] = token
         //2、比如在发送网络请求时显示一个正在请求的图表
         return config
       },err => {
         console.log('请求拦截处发生错误:' + err)
       })
       //2.2响应拦截
       instance.interceptors.response.use(res => {
         // console.log(res)
         return res.data
       },err =>{
         console.log('未拿到响应内容：' + err)
       })
       //3、发送请求
       return instance(config)
 }
