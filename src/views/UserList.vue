<template>
  <div id="userList">
<!--    面包屑-->
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/infoAnalyze' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>信息列表</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
<!--    中心卡片区域-->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入被搜索人姓名" v-model="name"
                    clearable @clear="getAllUserList(pageAndSize)">
            <el-button slot="append" icon="el-icon-search"
                       @click="getOneUserList(name)"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="newUser">添加用户</el-button>
        </el-col>
      </el-row>
<!--      表格区域-->
      <el-table
        :data="tableData" stripe border style="width: 100%">
        <el-table-column type="index" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="80"></el-table-column>
        <el-table-column prop="age" label="年龄" width="80"></el-table-column>
        <el-table-column prop="identity" width="220" label="身份证号"></el-table-column>
        <el-table-column prop="address" width="150" label="地址"></el-table-column>
        <el-table-column prop="iphone"  width="150" label="手机号"></el-table-column>
        <el-table-column prop="createTime" width="200" label="登记时间"></el-table-column>
        <el-table-column prop="go" label="14天内是否去过高风险地区"></el-table-column>
        <el-table-column prop="contact" label="14天内是否接触高风险人群"></el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="dealDialogVisible(scope.row.name)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="openConfirmBox(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加用户的内容区-->
      <el-dialog title="添加新用户" :visible.sync="dialogAddVisible" width="40%">
        <el-form ref="add_form" :model="addFormInfo" :rules="addFormRules" label-position="left">
          <el-form-item label="姓名:" label-width="80px" prop="name">
            <el-input v-model="addFormInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" label-width="80px" prop="sex">
            <el-input v-model="addFormInfo.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄:" label-width="80px" prop="age">
            <el-input v-model="addFormInfo.age"></el-input>
          </el-form-item>
          <el-form-item label="身份证:" label-width="80px" prop="identity">
            <el-input v-model="addFormInfo.identity"></el-input>
          </el-form-item>
          <el-form-item label="地址:" label-width="80px" prop="address">
            <el-input v-model="addFormInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" label-width="80px" prop="iphone">
            <el-input v-model="addFormInfo.iphone"></el-input>
          </el-form-item>
          <el-form-item label="近14天是否去过高风险地区:" label-width="200px" prop="go">
            <el-input v-model="addFormInfo.go"></el-input>
          </el-form-item>
          <el-form-item label="近14天是否接触过高风险人群:" label-width="220px" prop="contact">
            <el-input v-model="addFormInfo.contact"></el-input>
          </el-form-item>
          <el-form-item label="登记时间:" label-width="80px">
            <el-input v-model="addFormInfo.createTime" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
              <el-button @click="resetFields">取 消</el-button>
              <el-button type="primary" @click="addConfirm">确 定</el-button>
        </span>
      </el-dialog>
      <!--  编辑用户的内容区-->
      <el-dialog title="编辑用户信息" :visible.sync="dialogEditVisible" width="35%">
        <el-form ref="edit_form" :model="editFormInfo" :rules="editFormRules" label-position="left">
          <el-form-item label="姓名:" label-width="80px">
            <el-input v-model="editFormInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别:" label-width="80px">
            <el-input v-model="editFormInfo.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="年龄:" label-width="80px">
            <el-input v-model="editFormInfo.age" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证:" label-width="80px">
            <el-input v-model="editFormInfo.identity" disabled></el-input>
          </el-form-item>
          <el-form-item label="地址:" label-width="80px" prop="address">
            <el-input v-model="editFormInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" label-width="80px" prop="iphone">
            <el-input v-model="editFormInfo.iphone"></el-input>
          </el-form-item>
          <el-form-item label="是否去过高危地区:" label-width="220px" prop="go">
            <el-input v-model="editFormInfo.go"></el-input>
          </el-form-item>
          <el-form-item label="是否接触高危人群:" label-width="220px" prop="contact">
            <el-input v-model="editFormInfo.contact"></el-input>
          </el-form-item>
          <el-form-item label="登记时间:" label-width="80px">
            <el-input v-model="editFormInfo.createTime" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer">
         <el-button @click="dialogEditVisible = false">取 消</el-button>
         <el-button type="primary" @click="editConfirm">确 定</el-button>
        </span>
      </el-dialog>
<!--      分页区域-->
      <el-pagination
        :background=true
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageAndSize.page"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="pageAndSize.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import { userList,searchUser,deleteUser,addUserList,editUserList } from '../network/userList'
  import { dealTime } from "../utils/utils";

  export default {
    name: "UserList",
    data(){
      //自定义新增用户信息时的表单效验规则
     const addSexCheck = (rule,value,callback) => {
       if(!/^男$|^女$/.test(value)){
         callback(new Error('性别只能填：男或女'))
       }else {
         callback()
       }
     };
     //自定义年龄效验规则
      const addAgeCheck = (rule,value,callback) => {
        if(!/^((1[0-5])|[1-9])?\d$/.test(value)){
          callback(new Error('抱歉，年龄格式为0~159岁'))
        }else {
          callback()
        }
      }
      //自定义身份证效验规则
      const addIdentityCheck = (rule,value,callback) => {
        if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)){
          callback(new Error('抱歉，身份证输入有误，请检查'))
        }else{
          callback()
        }
      }
      //自定义手机号效验规则
      const iphoneCheck = (rule,value,callback) => {
        if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(value)){
          callback(new Error('抱歉，手机号码有误'))
        }else {
          callback()
        }
      }
      //自定义go项的表单效验规则
      const goAndContactCheck = (rule,value,callback) => {
        if(!/^是$|^否$/.test(value)){
          callback(new Error('抱歉，此项只能填是或否'))
        }else {
          callback()
        }
      }
      return{
        name:null,
        tableData:[],
        pageAndSize:{
          page:1,
          size:5
        },
        pageTotal:null,   //总页数
        totalNumber:null,  //总条数
        dialogEditVisible:false,
        dialogAddVisible:false,
        editFormInfo:{},
        addFormInfo:{},
        //添加新用户时表单效验规则
        addFormRules:{
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
          ],
          sex:[
            { required: true,message:'请输入性别', trigger: 'blur' },
            {validator: addSexCheck, trigger: 'blur'}
          ],
          age:[
            { required: true,message:'请输入年龄', trigger: 'blur' },
            {validator: addAgeCheck, trigger: 'blur'}
          ],
          identity:[
            { required: true,message:'请输入身份证号码', trigger: 'blur' },
            {validator: addIdentityCheck, trigger: 'blur'}
          ],
          address:[
            { required: true, message: '请输入地址', trigger: 'blur' },
            { min: 4, message: '最小长度为4个字符', trigger: 'blur' }
          ],
          iphone:[
            { required: true, message:'请输入手机号码', trigger: 'blur' },
            {validator: iphoneCheck, trigger: 'blur'}
          ],
          go:[
            { required: true, message:'请填写此项', trigger: 'blur' },
            {validator: goAndContactCheck, trigger: 'blur'}
          ],
          contact:[
            { required: true, message:'请填写此项', trigger: 'blur' },
            {validator: goAndContactCheck, trigger: 'blur'}
          ]
        },
        //编辑用户信息时的表单验证
        editFormRules:{
          address:[
            { required: true, message: '请输入地址', trigger: 'blur' },
            { min: 4, message: '最小长度为4个字符', trigger: 'blur' }
          ],
          iphone:[
            { required: true, message:'请输入手机号码', trigger: 'blur' },
            {validator: iphoneCheck, trigger: 'blur'}
          ],
          go:[
            { required: true, message:'请填写此项', trigger: 'blur' },
            {validator: goAndContactCheck, trigger: 'blur'}
          ],
          contact:[
            { required: true, message:'请填写此项', trigger: 'blur' },
            {validator: goAndContactCheck, trigger: 'blur'}
          ]
       }
      }
    },
    created() {
      //页面创建出来先获取hash
      this.pageAndSize.page = parseInt(this.getHash()) || 1
      this.getAllUserList(this.pageAndSize)
    },
    methods:{
      //处理时间戳方法
      timeChange(time){
       return dealTime(time)
      },
      //发送网络请求，获取用户列表
     async getAllUserList(pagesize){
       const {data:res}  = await userList(pagesize)
       this.tableData = res.content
       for(let i=0;i<this.tableData.length;i++){
         this.tableData[i].createTime = this.timeChange(parseInt(this.tableData[i].createTime))
         this.tableData[i].go = this.tableData[i].go === true?'是':'否'
         this.tableData[i].contact = this.tableData[i].contact === true?'是':'否'
       }
       this.pageTotal = res.totalPages
       this.totalNumber = res.totalElements
     },
      handleSizeChange(size){
        this.pageAndSize.size = size
        this.getAllUserList(this.pageAndSize)
      },
      //当前页数发生改变，存储hash
      handleCurrentChange(currentPage){
        // this.pageAndSize.page = currentPage
        this.setHash(currentPage)
        this.pageAndSize.page = parseInt(this.getHash())
        // console.log(this.pageAndSize);
        this.getAllUserList(this.pageAndSize)
      },
      //点击删除时，弹出确认窗口（该方法防止手残误删）
      openConfirmBox(id){
       this.$confirm('此操作将永久删除用户信息,是否继续','重要提示',{
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.deleteUserList(id)
       }).catch(() => {
         this.$message({
           type:'info',
           message:'已取消删除'
         })
       })
      },
      //发送网络请求，查询单条用户信息
      async getOneUserList(name){
       const {data:res} = await searchUser(name)
        if(res == null){
          this.$message.info('抱歉查询失败，用户不存在')
          return
        }else{
          this.tableData = []
          this.tableData.push(res)
          this.tableData[0].createTime = this.timeChange(parseInt(this.tableData[0].createTime))
          this.tableData[0].go = this.tableData[0].go === true?'是':'否'
          this.tableData[0].contact = this.tableData[0].contact === true?'是':'否'
          this.$message.success('恭喜，查询成功！')
        }
      },
      //发送网络请求， 删除单个用户
      async deleteUserList(id){
       const { data:res } = await deleteUser(id)
        if(!(JSON.stringify(res) === '{}')){
          await this.getAllUserList(this.pageAndSize)
          this.$message.success('恭喜，删除成功!!')
        }else {
          this.$message.info('抱歉，删除失败')
          return
        }
      },
      //处理编辑用户的盒子是否显示
      async dealDialogVisible(name){
        this.dialogEditVisible = true
        //同时发送网络请求，获取准备编辑的该用户的信息
      const {data:res} = await searchUser(name)
        this.editFormInfo = res
        this.editFormInfo.createTime = this.timeChange(parseInt(this.editFormInfo.createTime))
        this.editFormInfo.go = this.editFormInfo.go === true?'是':'否'
        this.editFormInfo.contact = this.editFormInfo.contact === true?'是':'否'
      },
      //编辑用户，发送网络请求方法
      editUser(info){
       return editUserList(info)
      },
      //编辑用户，效验完成后发送网络请求完成编辑
      editConfirm(){
        this.$refs.edit_form.validate(async valid => {
          if(valid){
            //表单效验通过，发送网络请求
          const {data:res} = await this.editUser({
            id:this.editFormInfo.id,
            name:this.editFormInfo.name,
            sex:this.editFormInfo.sex,
            age:this.editFormInfo.age,
            identity:this.editFormInfo.identity,
            address:this.editFormInfo.address,
            iphone:this.editFormInfo.iphone,
            go:this.editFormInfo.go == '是'?true:false,
            contact:this.editFormInfo.contact == '是'?true:false,
            createTime:new Date().getTime()
            })
            this.$message.success('恭喜，数据更新成功！！')
            this.dialogEditVisible = false
           await this.getAllUserList(this.pageAndSize)
          }else{
            this.$message.info('抱歉，表单填写有误，请核查再提交')
            return
          }
        })
      },
      //新建用户按钮
      newUser(){
       this.dialogAddVisible = true
        this.getCurrentTime()
      },
      //真正新增用户，发送网络请求的方法
      addNewUser(info){
       return addUserList(info)
      },
      //添加用户时，点击取消，重置表单所填内容
      resetFields(){
       this.$refs.add_form.resetFields()
        this.dialogAddVisible = false
      },
      //获取当前时间方法,并且转换成自己希望的时间格式
      getCurrentTime(){
        let curTime = this.timeChange(new Date().getTime())
        //新增用户时将时间自动获取过来
        this.addFormInfo.createTime = curTime
      },
      //点击确定按钮，确认添加新用户
      addConfirm(){
        this.$refs.add_form.validate(async valid => {
         if(valid){
           //表单验证全部通过后发送网络请求，真正提交数据
          const {data:res} = await this.addNewUser({
            name:this.addFormInfo.name,
            sex:this.addFormInfo.sex,
            age:this.addFormInfo.age,
            identity:this.addFormInfo.identity,
            address:this.addFormInfo.address,
            iphone:this.addFormInfo.iphone,
            go:this.addFormInfo.go == '是'?true:false,
            contact:this.addFormInfo.contact == '是'?true:false,
            createTime:new Date().getTime()
          })
           this.$message.success('恭喜，添加成功！！')
           this.resetFields()
          await this.getAllUserList(this.pageAndSize)
         }else{
           this.$message.info('抱歉，表单填写有误，请核查再提交！')
           return
         }
        })
      },
      //种下hash,用于存储页面
      setHash(number){
        window.location.hash = number
      },
      //获取hash
      getHash(){
        return window.location.hash.substring(1)
      }
    }
  }
</script>
<style>
  .el-table td,.el-table th{
    text-align: center !important;
  }
</style>

<style scoped>
  .el-breadcrumb{
    font-size: 16px;
  }
 .el-card{
  margin-top: 20px;
}
  .el-table{
    margin-top: 20px;
  }
  .el-pagination{
    margin-top: 20px;
  }
</style>