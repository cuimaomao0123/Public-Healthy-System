<template>
  <div id="home">
  <el-container class="container">
<!--    头部导航栏-->
    <el-header>
      <div class="left">
        <img src="../assets/image/home/logo.png"/>
        <div class="title">公共场所医疗应急防控后台管理系统</div>
      </div>
      <div class="right">
        <ul>
          <li><img src="../assets/image/home/one.svg"/></li>
          <li>
            <el-badge :value="12" class="item">
              <img src="../assets/image/home/two.svg"/>
            </el-badge>
          </li>
          <li>
            <el-badge :value="2" class="item">
              <img src="../assets/image/home/three.svg"/>
            </el-badge>
          </li>
          <li><img src="../assets/image/home/four.svg"/></li>
          <li class="logout"><el-button type="info" plain @click="loginOut">注销</el-button></li>
        </ul>
      </div>
    </el-header>
    <el-container>
<!--      侧栏部分-->
      <el-aside width="230px">
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-home"></i>
              <span>首页</span>
            </template>
            <el-menu-item index="/infoAnalyze">
              <template slot="title">
                <i class="el-icon-search"></i>
                <span>数据分析</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>信息列表</span>
            </template>
              <el-menu-item index="/userList">
                <template>
                  <i class="el-icon-s-custom"></i>
                  <span>用户列表</span>
                </template>
              </el-menu-item>
              <el-menu-item index="/adminList">
                <template>
                  <i class="el-icon-user"></i>
                  <span>管理员信息</span>
                </template>
              </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-unfold"></i>
              <span>疫情管理</span>
            </template>
            <el-menu-item index="/virusControl">
              <template>
                <i class="el-icon-s-unfold"></i>
                <span>流动记录</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-video-camera"></i>
              <span>影像记录</span>
            </template>
            <el-menu-item index="/videoFind">
              <template>
                <i class="el-icon-video-camera"></i>
                <span>影像查询</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-picture"></i>
              <span>图片记录</span>
            </template>
            <el-menu-item index="/pictureFind">
              <template>
                <i class="el-icon-picture"></i>
                <span>图片查询</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>推送内容</span>
            </template>
            <el-menu-item index="/sendInfo">
              <template>
                <i class="el-icon-s-order"></i>
                <span>推送内容</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/authControl">
              <template>
                <i class="el-icon-s-tools"></i>
                <span>权限分配</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
<!--      主体部分，由子组件完成-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data(){
      return{

      }
    },
    created() {

    },
    methods:{
      loginOut(){
        window.sessionStorage.clear()
        this.$message.success('退出登录')
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>
  #home,.container{
    height: 100%;
  }
.el-header{
  display: flex;
  background: rgb(73,128,181);
  justify-content: space-between;
  min-width: 1254px;
}
.left{
  display: flex;
}
.left img{
    width: 65px;
    height: 60px;
    margin-left: 20px;
}
  .title{
    line-height: 60px;
    font-size: 20px;
    color: #ddd;
    margin-left: 25px;
  }
  .right{
    width: 25%;
  }
  .right ul{
    display: flex;
    align-items: center;
  }
.right ul li{
  flex: 1;
}
.right ul li img{
  height: 25px;
}
.right .logout{
 position: relative;
  top: -5px;
}
.el-aside{
  background: rgba(88, 101, 111);
  height: 100%;
}
.el-menu span{
  font-size: 16px;
}
</style>