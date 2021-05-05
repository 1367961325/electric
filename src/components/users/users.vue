<!--
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-27 19:12:53
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-05 15:28:14
-->

  <template>
  <div>
    <!-- 搜索框 -->
    <el-row :gutter="20">
    <el-col :span="6">
      <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="queryInfo.query"
        >
        <!-- 搜索按钮 -->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUserList()"
          ></el-button>
        </el-input>
    </el-col>
    <el-col :span="4">
        <el-button type="primary"
        @click="addDialogVisible = true"
          >添加用户</el-button
        >
    </el-col>
  </el-row>
  <!-- 数据表格 -->
  <el-table
    :data="userList"
    height="472"
    border
    style="width: 100%">
    <el-table-column type="index" label="#" width="47"></el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色">
    </el-table-column>
    <el-table-column
      prop="mg_state"
      label="状态">
      <template slot-scope="scope">
        <!-- 开 关 -->
        <el-switch v-model="scope.row.mg_state" 
        @change="stateChanged(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      width="175px"
      >
      <template slot-scope="scope">
            <el-button 
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
            ></el-button
            >
            <el-button
              size="mini"
              type="danger"
               icon="el-icon-delete"
               @click="delUserInfo(scope.row)"
              ></el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="getRoleList(scope.row)"
              ></el-button
            >
      </template>
    </el-table-column>
  </el-table>
      <!-- 分页器 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
     <!-- 弹出添加用户表单 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="resetForm('addFormRef')">
      <el-form ref="addFormRef" :model="addForm" :rules="userFormRules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserInfo">确 定</el-button>
        </span>
    </el-dialog>
      <!-- 弹出编辑用户表单 -->
    <el-dialog title="编辑用户信息" :visible.sync="editDialogVisible" width="50%" @close="resetForm('editFormRef')">
      <el-form ref="editFormRef" :model="editForm" :rules="userFormRules" label-width="70px">
        <el-form-item label="用户名"  prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog
      title="分配角色"
      :visible.sync="setRoleDialogVisible"
      width="30%"
      @close="resetForm('setRoleFormRef')"
    >
      <!-- 主体内容区域 -->
      <el-form ref="setRoleFormRef" :model="roleForm" label-width="100px">
        <el-form-item label="当前的姓名">
          <el-input v-model="roleForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="当前的角色">
          <el-input v-model="roleForm.role_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="分配新角色">
          <el-select v-model="roleId" placeholder="请选择角色">
            <!-- :label 显示文本，:value 选中值 -->
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setRole()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
   </div>
</template>

<script>
import {
    userList,
    userStateChange,
    userAdd,
    userEdit,
    getUserInfo,
    userDel,
    
    } from "../../http/users.js";
import {roleList,roleSet} from "../../http/roles"
export default {
  comments:true,
  props: {},
  data() {
     //验证邮箱的规则
  var checkEmail = (rule, value, cb) => {
    const regEmail = /^\w+@\w+(\.\w+)+$/
    if (regEmail.test(value)) {
      return cb()
    }
    //返回一个错误提示
    cb(new Error('请输入合法的邮箱'))
  }
  //验证手机号码的规则
  var checkMobile = (rule, value, cb) => {
    const regMobile = /^1[34578]\d{9}$/
    if (regMobile.test(value)) {
      return cb()
    }
    //返回一个错误提示
    cb(new Error('请输入合法的手机号码'))
  }
    return {
      userList:[],
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:5
      },
      total:null,
      //控制添加表单显示
      addDialogVisible:false,
      //控制修改表单显示
      editDialogVisible:false,
      // 设置用户角色信息对话框的显示或隐藏
      setRoleDialogVisible: false,
      //添加用户表单数据
      addForm:{
        username:"",
        password:"",
        email:"",
        mobile:""
      },
      editForm:{},
      //表单验证规则
      userFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
            { required: false, message: '请输入邮箱', trigger: 'blur' },
            { validator:checkEmail, message: '邮箱格式不正确，请重新输入', trigger: 'blur'}
        ],
        mobile: [
            { required: false, message: '请输入手机号码', trigger: 'blur' },
            { validator:checkMobile, message: '手机号码不正确，请重新输入', trigger: 'blur'}
        ]
    },
    //角色权限信息
    rolesList:{},
    //被选择的权限信息
    roleForm:{},
    //被选择的用户权限id
    roleId:""
    };
  },
  methods: {
    //获取列表信息
    getUserList(){
      userList(this.queryInfo)
      .then((res) => {
        this.userList = res.data.users;
        this.total = res.data.total;
      });
    },
    //分页器每一页有多少条信息
     handleSizeChange(val) {
        this.queryInfo.pagesize = val;
        this.getUserList();
      },
      // 当前是第多少页
      handleCurrentChange(val) {
        this.queryInfo.pagenum = val;
        this.getUserList();
      },
    //改变账户状态
    
    stateChanged(userInfo){
      userStateChange(userInfo.id,userInfo.mg_state)
      .then((res)=>{
        if(res.meta.status !=200){
          this.$message.error(res.meta.msg)
        }else{
          this.$message.success(res.meta.msg);
        }
        this.getUserList();
      })
    },
    // 添加用户
    addUserInfo(){
        this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        // 可以发起添加用户的请求
        let userInfo = JSON.parse(JSON.stringify(this.addForm))
        userAdd(userInfo)
        .then((res) => {
          if (res.meta.status != 201) {
            this.$message.error(res.meta.msg);
          } else {
            this.$message.success(res.meta.msg);
            // 添加成功，隐藏对话框
            this.addDialogVisible = false;
            // 重新获取列表数据
            this.getUserList();
          }
        });
      });
    },
    // 展示编辑用户的对话框
    showEditDialog(userInfo) {
      getUserInfo(userInfo.id)
      .then((res) => {
        this.editForm = res.data;
        if (res.meta.status != 200) {
          this.$message.error("查询用户信息失败");
        }
      });
      // 弹出编辑用户的对话框
      this.editDialogVisible = true;
    },
    // 编辑用户信息
    editUserInfo(){
      this.$refs.editFormRef.validate((valid) => {
        if (!valid) return;
        // 可以发起修改用户的请求
        let userInfo = JSON.parse(JSON.stringify(this.editForm))
        userEdit(userInfo.id,userInfo)
        .then((res) => {
          if (res.meta.status == 200) {
            this.$message.success("修改用户信息成功");
            this.getUserList();
            this.editDialogVisible = false;
          } else {
            this.$message.error("修改用户信息失败");
          }
        });
      });
    },
    //清空表单
    resetForm(formName){
       this.$refs[formName].resetFields();
    },
    //确认删除
    delUserInfo(userInfo) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userDel(userInfo.id)
          .then((res) => {
            if (res.meta.status == 200) {
              this.$message.success("删除用户成功");
              this.getUserList();
            } else {
              this.$message.error("删除用户失败");
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //获取用户角色
    getRoleList(userInfo) {
      // 保存用户信息
      this.roleForm = userInfo;
      // 获取所有角色列表，用来遍历下拉列表
      roleList().then((res) => {
        this.rolesList = res.data;
      });
      this.setRoleDialogVisible = true;
    },
    //设置用户角色
    setRole(){
      if(this.roleId===""){
        return this.$message.error("请您选择赋予的新角色再保存")
      }
      roleSet(this.roleForm.id,this.roleId)
     .then(res=>{
        if(res.meta.status!=200){
          return this.$message.error('分配角色失败!')
        }
        this.$message.success('分配角色成功')
        this.getUserList()
        this.setRoleDialogVisible=false;
      })
    }
  },
  components: {},
  mounted() {
    //请求数据
    this.getUserList();
  },
};
</script>

<style scoped lang="less">
.el-table{
  margin-top:15px
}
.el-pagination{
  display: flex;
  height: 40px;
  align-items: center;
}
</style>
