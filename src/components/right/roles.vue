<template>
  <div>
    <el-card>
      <el-button type="primary" @click="addDialogVisible = true"
        >添加角色</el-button
      >

      <el-table :data="rolesList" border stripe style="width=100%">
        <!-- 展开列 -->
        <el-table-column label="" type="expand">
          <template slot-scope="scope">
            <!-- 展开行内容填充 -->
            <el-row
              v-for="Lv1 in scope.row.children"
              :key="Lv1.id"
              class="centerRow"
            >
              <el-col :span="5">
                <!-- 一级权限 -->
                <el-tag closable @close="removeRight(scope.row, Lv1.id)">{{
                  Lv1.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="Lv2 in Lv1.children"
                  :key="Lv2.id"
                  class="centerRow"
                >
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag
                      closable
                      type="success"
                      @close="removeRight(scope.row, Lv2.id)"
                      >{{ Lv2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      closable
                      type="warning"
                      v-for="Lv3 in Lv2.children"
                      :key="Lv3.id"
                      @close="removeRight(scope.row, Lv3.id)"
                      class="Lv3_tag"
                    >
                      {{ Lv3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引页 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column label="操作" width="350px">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              content="编辑"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="medium"
                @click="searchRole(scope.row.id)"
                >编辑</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="删除"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="medium"
                @click="removeRole(scope.row.id)"
                >删除</el-button
              >
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="medium"
                @click="setRightDialog(scope.row)"
                >分配权限</el-button
              >
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加角色的对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="addDialogClose"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormrules"
        ref="addFormRef"
        label-width="85px"
        color="green"
        class="addform"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRoleForm.roleName" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRoleForm.roleDesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑角色的对话框 -->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="editDialogClose"
    >
      <el-form
        :model="editRoleForm"
        :rules="addRoleFormrules"
        ref="editRoleFormRef"
        label-width="85px"
        color="green"
        class="editForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRoleForm.roleName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRoleForm.roleDesc" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配权限的对话框 -->
    <el-dialog
      title="分配权限"
      :visible.sync="setRightsDialogVisible"
      width="30%"
      @close="setRightDialogClose"
   
    >
    <!-- 权限菜单区域 -->
     <el-tree ref="tree" :data="rightsTree" :props="treeConfig" show-checkbox node-key="id" default-expand-all :default-checked-keys="defkeys" ></el-tree>


      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightsDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="distribute"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {roleList,roleSearch,roleAdd,roleDel,roleEdit} from "../../http/roles"
import {rightTree, rightDel, rightEdit} from "../../http/right"
export default {
  props: {},
  data() {
    return {
      rolesList: [],
      // 控制添加角色对话框的显示和隐藏
      addDialogVisible: false,

      // 控制修改角色对话框的显示和隐藏
      editDialogVisible: false,

      // 控制发布权限对话框的显示和隐藏
      setRightsDialogVisible:false,

      // 添加用户的表单数据
      addRoleForm: {
        roleName: "",
        roleDesc: "",
      },

      // 保存编辑角色的信息
      editRoleForm: {},

      // 添加表单的验证规则对象
      addRoleFormrules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2到 8个字符", trigger: "blur" },
        ],
        roleDesc: [
          { required: false, message: "请填写角色描述", trigger: "blur" },
        ],
      },

      // 保存权限列表树
      rightsTree:[],
      treeConfig:{
        // 下一级别的节点绑定给谁
        children:'children',

        // 显示的文字绑定给谁
        label:'authName'
      },

      //默认选中的节点
      defkeys:[], 

      //保存选择的用户id
      SelectId:'',

      //保存所选项以对象形式
      everage:[],
    };
  },
  methods: {
    // 获得角色列表
    getRoleList() {
    // 获取所有角色列表，用来遍历下拉列表
      roleList()
      .then((res) => {
        if (res.meta.status != 200) {
          this.$message.error("获取数据失败");
        }
        this.rolesList = res.data;
      });
    },

    // 删除角色指定权限
    removeRight(role, rightId) {
      this.$confirm("此操作将永久用户该条权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          rightDel(role.id,rightId).then((res) => {
            if (res.meta.status != 200) {
              this.$message.error("删除角色权限失败");
            }
            this.$message.success("删除角色权限成功");
            this.getRoleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 监听 添加角色对话框的关闭
    addDialogClose() {
      this.$refs.addFormRef.resetFields();
    },

    // 监听 修改角色对话框的关闭
    editDialogClose() {
      this.$refs.editRoleFormRef.resetFields();
    },

    // 确认添加角色之前预校验
    addRole() {
      this.$refs.addFormRef.validate((valid) => {
        if (!valid) return;
        //可以发起添加角色的请求
        roleAdd(this.addRoleForm)
        .then((res) => {
          if (res.meta.status != 201) {
            this.$message.error("添加角色失败");
          }else{
              this.$message.success("添加用户成功");
          }
          this.addDialogVisible = false;
          this.getRoleList();
        });
      });
    },

    //根据id查询角色的信息
    searchRole(id) {
      roleSearch(id)
      .then((res) => {
        if (res.meta.status != 200) {
          this.$message.error("查询角色失败");
        }
        // 保存查询到的信息
        this.editRoleForm = res.data;
        // 打开编辑角色信息的对话框
        this.editDialogVisible = true;
      });
    },

    // 编辑角色之前的预校验
    editRole() {
      this.$refs.editRoleFormRef.validate((valid) => {
        if (valid) {
          roleEdit(this.editRoleForm.roleId,this.editRoleForm).then((res) => {
            if (res.meta.status != 200) {
              this.$message.error("编辑角色失败");
            }
            this.$message.success("编辑角色信息成功");
            this.editDialogVisible = false;
            this.getRoleList();
          });
        }
      });
    },

    // 删除角色
    removeRole(id) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          roleDel(id).then((res) => {
            if (res.meta.status != 200) {
              this.$message.error("删除角色失败");
            }else{
                this.$message.success("删除角色成功");
            }
            this.getRoleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 发布角色权限
    setRightDialog(row){
      // 获取所有权限的数据
      rightTree().then(res=>{
        // 保存权限列表树
        this.rightsTree=res.data;
      })
      this.SelectId=row.id
      this.getLeafKeys(row,this.defkeys);
      this.setRightsDialogVisible=true;
      
    },

    // 通过递归的方式，获取角色下所有三级权限的id，并保存到defkeys数组中
    getLeafKeys(node,arr){
      // 如果当前node 节点不包children，则是三级节点
      if(!node.children){
        arr.push(node.id)
      }else{
        node.children.forEach(item=>{
          this.getLeafKeys(item,arr)
        })
      }
    },


    // 监听权限对话框的关闭事件
    setRightDialogClose(){
      // 清空记录着三级节点的id，解决再次点击存储之前选择节点的bug
      this.defkeys=[];
    },


    // 分配更新好的权限
    distribute(){
      const arr1 = this.$refs.tree.getCheckedKeys() 
      const arr2 = this.$refs.tree.getHalfCheckedKeys() 
      const rids = [...arr1, ...arr2].join(',')
      
        rightEdit(this.SelectId,rids).then(res=>{
          if (res.meta.status !== 200) { 
            return this.$message.error('分配权限失败！') 
            }
          this.$message.success('分配权限成功！')
          this.setRightsDialogVisible=false;
           this.getRoleList();
        })
    }
  },
  mounted() {
    // 获取角色列表
    this.getRoleList();
  },
  components: {},
};
</script>

<style scoped lang="less">
.el-main{
  padding: 20px;
}
.el-table {
  margin-top: 15px;
}
.centerRow {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  .el-col {
    .Lv3_tag {
      margin-right: 10px;
    }
  }
}
</style>
