<template>
  <div>
    <div class="good">
      <div class="good_head">
        <el-alert
          title="注意，只允许为三级分类设置相关参数！"
          type="warning"
          show-icon
        >
        </el-alert>
        <el-form>
          <el-form-item>
            <div class="block">
              <span class="demonstration">选择商品分类：</span>
              <el-cascader
                v-model="value"
                :options="options"
                @change="handleChange"
                :props="prop"
              >
              </el-cascader>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 参数 -->
          <el-tab-pane label="动态参数" name="first">
            <el-button type="primary" @click="argument"> 添加参数 </el-button>
            <el-table :data="manyTableData" style="width: 100%" border>
              <el-table-column label="" width="60" prop="" type="expand">
                <template slot-scope="scope">
                  <el-tag
                    v-for="(i, index) in scope.row.attr_vals"
                    :key="index"
                    closable
                     @close="tagClose(i,scope.row)"
                  >
                    {{ i }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="#" width="60" type="index">
              </el-table-column>
              <el-table-column label="参数名称" width="500" prop="attr_name">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <!-- 属性 -->
          <el-tab-pane label="静态属性" name="second">
            <el-button type="primary" @click="property"> 添加属性 </el-button>
            <el-table :data="onlyTableData" style="width: 100%" border>
              <el-table-column label="" width="60" prop="" type="expand">
                <template slot-scope="scope">
                  <el-tag
                    v-for="(i, index) in scope.row.attr_vals"
                    :key="index"
                    closable
                    @close="tagClose(i,scope.row)"
                  >
                    {{ i }}
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    >+ New Tag</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column label="#" width="60" type="index">
              </el-table-column>
              <el-table-column label="属性名称" width="500" prop="attr_name">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <el-dialog
          :title="'添加' + type"
          :visible.sync="dialogVisible"
          width="30%"
          @close="handleClose"
        >
          <el-form
            :model="addForm"
            :rules="addFormRules"
            ref="addRuleRef"
            label-width="80px"
          >
            <el-form-item :label="type" prop="name">
              <el-input v-model="addForm.attr_name"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { shopType } from "../../http/axios.js";
import { shopArg } from "../../http/axios.js";
import { shopPro } from "../../http/axios.js";
import { addArg } from "../../http/axios.js";
import { delArg } from "../../http/axios.js";
import { changeArg } from "../../http/axios.js";
import { changeTag } from "../../http/axios.js";
export default {
  props: {},
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      dialogVisible: false,
      type: "",
      options: [],
      value: [],
      activeName: "first",
      prop: {
        label: "cat_name",
        value: "cat_id",
      },
      addForm: {
        attr_name: "",
        attr_sel: "",
      },
      addFormRules: {
        name: { required: true, message: "不能为空", trigger: "blur" },
      },
      manyTableData: [],
      onlyTableData: [],
      tableData: [],
      changeForm: {
        attr_name: "",
        attr_sel: "",
      },
      changeTag:{
        attr_name: "",
        attr_sel: "",
        attr_vals: "",
      }
    };
  },
  methods: {
    //关闭标签
    tagClose(i,data){
      data.attr_vals.splice(data.attr_vals.indexOf(i), 1);
      this.changeTag.attr_vals=data.attr_vals.toString();
      this.changeTag.attr_name=data.attr_name;
      if(this.activeName== "first"){
        this.changeTag.attr_sel='many';
        console.log(data);
        console.log(this.changeTag);
        changeTag(data.cat_id,data.attr_id,this.changeTag).then(res=>{
        console.log(res);
      })
      }else{
        this.changeTag.attr_sel='only';
        console.log(data);
        console.log(this.changeTag);
        changeTag(data.cat_id,data.attr_id,this.changeTag).then(res=>{
        console.log(res);
      });
      }
      console.log(i);
    },
     showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
    handleInputConfirm() {
        this.inputVisible = false;
        this.inputValue = '';
      },
    add() {
      this.dialogVisible = false;
      if (this.activeName == "first") {
        console.log(this.addForm);
        this.addForm.attr_sel = "many";
        addArg(this.cateId, this.addForm).then((res) => {
          if (res.meta.status == 201) {
            this.$message({
              message: "添加参数成功！",
              type: "success",
            });
            this.getParamsList();
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
          console.log(res);
        });
      } else {
        this.addForm.attr_sel = "only";
        addArg(this.cateId, this.addForm).then((res) => {
          if (res.meta.status == 201) {
            this.$message({
              message: "添加属性成功！",
              type: "success",
            });
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }

          console.log(res);
          this.getParamsList();
        });
      }
      this.$refs.addRuleRef.resetFields();
    },
    argument() {
      this.dialogVisible = true;
      this.type = "动态参数";
    },
    property() {
      this.dialogVisible = true;
      this.type = "静态属性";
    },
    showTagInput(row) {
      row.tagInputVisible = true;
      //  this.$nextTick(() => { this.$refs.saveTagInput.$refs.input.focus()
      //   })
    },
    //关闭添加窗口
    handleClose() {
      this.$refs.addRuleRef.resetFields();
    }, //选择商品分类
    handleChange(val) {
      console.log(val);
      console.log(this.value);
      if (this.value.length !== 3) {
        this.value = [];
        this.manyTableData = [];
        this.onlyTableData = [];
      } else {
        this.getParamsList();
      }
    },

    //tabs标签
    handleClick() {},
    //请求
    getParamsList() {
      console.log(this.cateId);
      shopArg({ cateId: this.cateId }).then((res) => {
        res.data.forEach((item) => {
          // 把字符串的可选项，分割为数组，重新赋值给attr_vals
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        this.manyTableData = res.data;
        // this.addForm.attr_name=res.data
        console.log(res.data);
      });
      shopPro({ cateId: this.cateId }).then((res) => {
        res.data.forEach((item) => {
          // 把字符串的可选项，分割为数组，重新赋值给attr_vals
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
        this.onlyTableData = res.data;
        console.log(this.onlyTableData);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.changeForm.attr_name = row.attr_name;
      this.changeForm.attr_sel = "many";
      this.changeForm.attr_vals = row.attr_vals.toString();

      changeArg(row.cat_id, row.attr_id, this.changeForm).then((res) => {
        console.log(res);
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      delArg(row.cat_id, row.attr_id).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.$message({
            message: "删除成功！",
            type: "success",
          });
          this.getParamsList();
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
  },
  components: {},
  mounted() {
    shopType().then((res) => {
      this.options = res.data;
      console.log(res);
      console.log(this.options);
    });
  },
  computed: {
    cateId() {
      if (this.value.length === 3) {
        return this.value[this.value.length - 1];
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped lang="less">
body {
  .good {
    background-color: #fff;
    padding: 20px 20px 22px 20px;
    margin-bottom: 80px;
    margin-right: 2px;
    border-bottom: 1px solid #cbcdd1;
    border-left: 1px solid #e6e9ed;
    border-radius: 3px;
    .good_head {
      .block {
        margin-top: 10px;
        .demonstration {
          font-size: 18px;
        }
        .el-cascader {
          width: 218px;
        }
      }
    }
    .content {
      .el-table {
        margin-top: 20px;
        .new {
          height: 40px;
          font-size: 16px;
        }
        .el-tag {
          margin-right: 20px;
          margin-bottom: 20px;
        }
      }
    }
  }
}

  .input-new-tag {
    width: 90px;
    margin-bottom: 4px;
  }
</style>
