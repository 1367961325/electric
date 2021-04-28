<template>
  <div class="categories">
    <div class="good">
      <div class="good_head">
        <el-button type="primary" class="add_shop" @click="add">
          添加分类
        </el-button>
      </div>
      <div class="content">
        <tree-table
          :data="list"
          :columns="columns"
          border
          :selection-type="false"
          :expand-type="false"
          show-index
          index-text="#"
          class="tree-table"
        >
          <!-- 操作的模板列 -->
          <!-- 排序的模板列 -->
          <!-- 是否有效的模板列 -->
          <template slot="isok" slot-scope="scope">
            <i
              class="el-icon-success"
              style="color: #20b2aa"
              v-if="scope.row.cat_deleted === false"
            ></i>
            <i class="el-icon-error" style="color: #f92672" v-else></i>
          </template>
          <template slot="level" slot-scope="scope">
            <el-tag v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.cat_level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-else>三级</el-tag>
          </template>
          <template slot="isdowhat" slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="change(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row)"
              >删除</el-button
            >
          </template>
        </tree-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <!-- 添加商品的弹出框 -->
        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
          <el-form
            :model="addlist"
            label-position="left"
            label-width="80px"
            :rules="rules"
            ref="addTrue"
          >
            <el-form-item label="分类名称" prop="cat_name" label-width="80px">
              <el-input v-model="addlist.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" label-width="80px">
              <el-cascader
                v-model="value"
                :options="addTypeList"
                @change="handleChange"
                style="width: 100%"
                change-on-select
                clearable
                :props="prop"
              >
              </el-cascader>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog> 
        
        
        <!-- 编辑弹窗 -->
        <el-dialog title="修改分类" :visible.sync="dialogChange">
          <el-form :model="form" ref='changeForm' :rules="changeRule">
            <el-form-item label="活动名称" label-width="80px"  prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChange=false">取 消</el-button>
            <el-button type="primary" @click="changeSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { typeList } from "../../http/axios";
import { typeDel } from "../../http/axios";
import { typeAdd } from "../../http/axios";
import { typeCha } from "../../http/axios";
export default {
  data() {
    return {
      form:{
        name:'',
      },
      dialogChange:false,
      prop: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      value: "",
      options: [],
      list: [],
      total: 0,
      pagenum: 1,
      pagesize: 10,
      dialogFormVisible: "120px",
      dialogFormVisible: false,
      type: "",
      changeRule:
       { name: [ { required: true, message: '请输入分类名称', trigger: 'blur' }]}
    ,
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          prop: "cat_deleted",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          prop: "cat_level",
          type: "template",
          template: "level",
        },
        {
          label: "操作",
          type: "template",
          template: "isdowhat",
        },
      ],
      addlist: {
        cat_pid: "",
        cat_name: "",
        cat_level: "",
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
      addTypeList: [],
      changeName:'',
    };
  },
  methods: {
    /**
     * 修改提交按钮
     */
    changeSubmit(){
      this.$refs.changeForm.validate((valid)=>{
          if(valid){
            console.log(this.changeId,this.form.name);
                typeCha(this.changeId,{cat_name:this.form.name}).then(res=>{
                  this.newList();
                  this.$message({
                  message: '添加成功！',
                  type: 'success'
                });
              this.dialogChange=false;
              })
            }
        })
    },



    /**
     * 级联选择器变化时触发函数
     */
    handleChange(val) {
      console.log(val);
      if (val.length == 2) {
        this.addlist.cat_pid = val[1];
        this.addlist.cat_level = 2;
      } else if (val.length == 1) {
        this.addlist.cat_pid = val[0];
        this.addlist.cat_level = 1;
      } else {
        this.addlist.cat_pid = 0;
        this.addlist.cat_level = 0;
      }
      console.log(this.addlist);
    },

    /**
     * 添加分类
     */
    add() {
      typeList({
        pagenum: "",
        pagesize: "",
        type: 2,
      }).then((res) => {
        console.log(res);
        this.addTypeList = res.data;
      });
      this.dialogFormVisible = true;
    },
    /**
     * 点击确认添加按钮的提交函数
     */
    submit() {
      this.$refs.addTrue.validate((valid) => {
        if (valid) {
          typeAdd(this.addlist).then((res) => {
            console.log(res);
          });
          this.newList();
          this.$message({
          message: '添加成功！',
          type: 'success'
        });
          this.dialogFormVisible = false;
        }
        console.log(valid);
      });
      console.log(this.addlist);
      /**
       * 添加分类
       */
    },

    /**
     * 编辑按钮的点击事件
     */
    change(row) {
      this.dialogChange = true;
      console.log(row);
      this.changeId=row.cat_id;
    },
    /**
     * 删除按钮的点击事件
     */
    del(row) {
      console.log(row);
      typeDel(row.cat_id).then((res) => {
        if (res.meta.status == 200) {
          this.$message({
            showClose: true,
            message: "删除成功",
            type: "success",
          });

          this.newList();
        } else {
          this.$message({
            showClose: true,
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pagenum = val;
      this.newList();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(val);
      this.newList();
    },

    newList() {
      typeList({
        pagenum: this.pagenum,
        pagesize: this.pagesize,
        type: this.type,
      }).then((res) => {
        this.list = res.data.result;
        this.total = res.data.total;
        console.log(res);
      });
    },
  },
  components: {},
  mounted() {
    /**
     *获取商品列表数据
     */
    typeList({
      pagenum: this.pagenum,
      pagesize: this.pagesize,
      type: this.type,
    }).then((res) => {
      this.list = res.data.result;
      this.total = res.data.total;

      console.log(res);
    });
  },
};
</script>

<style lang="less">
.categories h1 {
  font-size: 100px;
}
.categories .good {
  background-color: #fff;
  padding: 20px 20px 22px 20px;
  margin-bottom: 80px;
  margin-right: 2px;
  border-bottom: 1px solid #cbcdd1;
  border-left: 1px solid #e6e9ed;
  border-radius: 3px;
  .good_head {
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    .add_shop {
      width: 98px;
      height: 40px;
      border: 0;
    }
  }
  .content {
    .el-form-item__label {
      text-align: right;
    }
  }
}
</style>
