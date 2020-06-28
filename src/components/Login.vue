<template>
  <div class="login">
   <div class="box">
     <div class="title">2020公共场所医疗应急防御检测系统</div>
     <el-form ref="myform" status-icon :rules="formRules" :model="formInfo" label-width="70px">
       <el-form-item label="用户名" prop="name">
         <el-input type="text" v-model="formInfo.name" placeholder="请输入用户名"></el-input>
       </el-form-item>
       <el-form-item label="密码" prop="password">
         <el-input type="password" v-model="formInfo.password" placeholder="请输入密码"></el-input>
       </el-form-item>
       <el-form-item>
         <el-checkbox label="已阅读《管理员条例》" v-model="formInfo.checkbox" name="type"></el-checkbox>
       </el-form-item>
       <el-form-item>
         <el-button @click="login" class="formLogin" type="primary">登录</el-button>
         <el-button @click="resetForm" class="formReset" type="info">重置</el-button>
       </el-form-item>
     </el-form>
   </div>
  </div>
</template>

<script>
  import  { loginCheck } from "../network/login";

  export default {
  name: 'Login',
  data(){
    //自定义验证规则
    var ownerUsercheck = (rule,value,callback) => {
      if(/[^\w]/g.test(value)){
        return callback(new Error('用户名只能为数字、字母组成'))
      }else{
        callback()
      }
    }
    return{
      //表单数据
      formInfo: {
        name:'cuimaomao',
        password:'cuimaomao123',
        checkbox:false
      },
      //表单验证规则
      formRules:{
        name:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' },
          //再加上自定义验证规则
          {validator: ownerUsercheck, trigger: 'blur'}
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '密码长度应 8 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
    methods:{
    //重置表单对象
    resetForm(){
      this.$refs.myform.resetFields();
    },
    login(){
     this.$refs.myform.validate(async valid => {
       if(!valid){
         return this.$message.info('用户名/密码格式错误')
       } else if(!this.formInfo.checkbox){
         return this.$message.info('请勾选《管理员条例》')
       }else{
         //可以发送网络请求啦
       const res = await this.logincheck(this.formInfo.name,this.passWord)
       if(res.code == 0){
         //存下登录验证后接收到的token
         this.$message.success('恭喜，登录成功')
         window.sessionStorage.setItem('token',res.data.token)
         await this.$router.replace('/home');
       }else if(res.code == 4){
         return this.$message.error('抱歉，用户名/密码错误，登录失败')
        }else{
         return this.$message.info('抱歉，网络验证失败')
       }
       }
     })
    },
    //网络请求方法
    logincheck(username,password){
     return loginCheck(username,password)
    }
  },
    //计算属性，用于密码md5加密
    computed:{
      passWord:function () {
        return this.$md5(this.formInfo.password)
      }
    }
}
</script>


<style scoped>
  .login{
    height: 100%;
    background: url("../assets/image/login.jpg") no-repeat center;
    z-index: -1;
  }
  .box{
    height: 350px;
    width: 450px;
    background: rgba(255,255,255,.7);
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 15px;
  }
  .title{
    width: 100%;
    background: #f0f4fb;
    text-align: center;
    font-size: 20px;
    line-height: 60px;
    border-radius: 15px;
    color: #927e7e;
  }
  .el-form{
    padding-top: 40px;
    width: 95%;
  }
  .el-checkbox{
    color: #927e7e;
  }
  .formLogin{
    width: 100px;
    margin-right: 60px;
  }
  .formReset{
    width: 100px;
  }
</style>
