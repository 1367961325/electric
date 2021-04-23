<template>
  <div>
    <div class="good">
      <div style="margin-top: 15px" class="good_head">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model="p"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <el-button type="primary" class="add_shop" @click='add'>添加商品</el-button>
      </div>
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column type="index" label="#" width="47"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="580">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)" width="94">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量" width="69">
        </el-table-column>
        <el-table-column
          prop="add_time"
          :formatter="dateFormat"
          label="创建时间"
          width="150"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
              <span
                ><i class="el-icon-warning"></i
                >此操作将永久删除商品，是否继续？</span
              >
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { shopList } from "../../http/axios.js";
import { shopDel } from "../../http/axios.js";
export default {
  props: {},
  data() {
    return {
      tableData: [],
      pagenum: 1,
      pagesize: 10,
      total: "",
      p: "",
      dialogVisible: false,
      iswhat: "",
      edit: "",
      del: "",
      innerVisible: "",
    };
  },
  methods: {
    //时间格式
    dateFormat: function (row, column) {
      var date = row[column.property];

      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    //elementui自带函数
    handleEdit(index, row) {
      this.edit = row;
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.del = row;
      this.dialogVisible = true;

      console.log(index, row);
    },
    //每页包含条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      shopList({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        (res) => {
          console.log(this.pagenum);
          this.tableData = res.data.goods;
          console.log(res);
        }
      );
    },
    //当前页数
    handleCurrentChange(val) {
      this.pagenum = val;
      shopList({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
        (res) => {
          console.log(this.pagenum);
          this.tableData = res.data.goods;
          console.log(res);
        }
      );
      console.log(this.pagenum);
      console.log(`当前页: ${val}`);
    },
    //删除取消
    cancel() {
      this.dialogVisible = false;
    },
    //删除确定
    confirm() {
      this.innerVisible = true;
      shopDel(this.del.goods_id).then((res) => {
        console.log(res);
        shopList({ pagenum: this.pagenum, pagesize: this.pagesize }).then(
          (res) => {
            console.log(this.pagenum);
            this.tableData = res.data.goods;
            this.total = res.data;
            console.log(res);
          }
        );
      });
      this.dialogVisible = false;
    },
    //添加商品跳转
    add(){
        this.$router.replace('/home/addShop');
    }
  },
  components: {},
  mounted() {
    //请求数据
    shopList({ pagenum: 1, pagesize: 10 }).then((res) => {
      this.tableData = res.data.goods;
      this.total = res.data;
      console.log(res.data);
    });
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
    .block {
      margin-top: 17px;
    }
    .good_head {
      display: flex;
      align-items: center;
      padding-bottom: 15px;
    }
    .input-with-select {
      width: 347px;
      margin: 0px 21px 0px 0px;
      height: 40px;
      button {
        height: 40px;
      }
    }
    .add_shop {
      width: 98px;
      height: 40px;
      border: 0;
    }
  }
}

body .is-leaf .cell {
  color: #fff;
}
body {
  .el-dialog__body {
    span {
      font-size: 14px;
      display: flex;
      align-items: center;
      .el-icon-warning {
        font-size: 25px;
        color: #e6a23c;
        margin-right: 10px;
      }
    }
  }
}
</style>
