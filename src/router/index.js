import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../components/Login')
const Home = () => import('../components/Home')
const InfoAnalyze = () => import('../views/InfoAnalyze')
const UserList = () => import('../views/UserList')
const AdminList = () => import('../views/AdminList')
const VirusControl = () => import('../views/VirusControl')
const VideoFind = () => import('../views/VideoFind')
const PictureFind = () => import('../views/PictureFind')
const SendInfo = () => import('../views/SendInfo')
const AuthControl = () => import('../views/AuthControl')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  },
  {
    path: '/Home',
    component:Home,
    redirect: '/infoAnalyze',
    children:[{
      path:'/infoAnalyze',
      component:InfoAnalyze
    },
      {
        path:'/userList',
        component:UserList
      },
      {
        path:'/adminList',
        component:AdminList
      },
      {
        path:'/virusControl',
        component:VirusControl
      },
      {
        path:'/videoFind',
        component:VideoFind
      },
      {
        path:'/pictureFind',
        component:PictureFind
      },
      {
        path:'/sendInfo',
        component:SendInfo
      },
      {
        path:'/authControl',
        component:AuthControl
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
  //to将要访问的路径
  //from代表从哪来
  //next是个函数，代表放行
  if(to.path == '/login') return next() //直接放行
  //获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})
export default router
