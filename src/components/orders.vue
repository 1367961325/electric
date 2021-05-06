<template>
  <div class="good">
    <div class="good_head">
      <el-input
        placeholder="请输入内容"
        class="input-with-select"
        v-model="srh"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search"
        ></el-button>
      </el-input>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe>
      <el-table-column type="index" label="#" width="47"></el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="300"
      ></el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="70"
      ></el-table-column>
      <el-table-column prop="order_pay" label="是否付款" width="100">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.order_pay == 1">已付款</el-tag>
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="update_time"
        label="下单时间"
        width="180"
        :formatter="dateFormat"
      ></el-table-column>
      <el-table-column prop="goods_name" label="操作">
        <template slot-scope="scope">
          <!-- 操作 -->
          <!-- 更改地址 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="addressEdit(scope.row)"
          ></el-button>
          <!-- 物流信息 -->
          <el-button
            type="success"
            icon="el-icon-location-outline"
            @click="logisticsMessage(scope.row)"
          ></el-button>
          <!-- 订单详情 -->
          <el-button
            type="warning"
            icon="el-icon-warning-outline"
            @click="details(scope.row)"
          ></el-button>
          <!-- 修改订单状态 -->
          <el-button
            type="danger"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.pagenum"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 市级联动弹窗 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="formRule">
        <el-form-item label="省市区/县" label-width="100px" prop="address">
          <el-cascader
            :options="form.address"
            v-model="form.address"
            change-on-select
            style="width: 100%"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" label-width="100px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 物流信息弹框 -->
    <el-dialog :visible.sync="dialogFormMessage" title="物流信息">
 <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities.data"
      :key="index"
      :timestamp="activity.ftime">
      {{activity.context}}
    </el-timeline-item>
  </el-timeline>

    </el-dialog>
    <!-- 订单详情弹框 -->
    <el-dialog :visible.sync="dialogFormDetails" title="订单详情" width="70%">
      <el-form>
        <el-form-item label="订单号">
          <el-input v-model="detailsObj.order_number" readonly> </el-input>
        </el-form-item>
        <el-form-item label="发票类型">
          <el-input v-model="detailsObj.order_fapiao_title" readonly>
          </el-input>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table :data="detailsObj.goods" style="width: 100%">
            <el-table-column label="#" type="index"> </el-table-column>
            <el-table-column prop="goods_price" label="商品价格">
            </el-table-column>
            <el-table-column prop="goods_number" label="商品数量">
            </el-table-column>
            <el-table-column prop="goods_total_price" label="商品总价">
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改订单状态弹框 -->
    <el-dialog
      :visible.sync="dialogFormChange"
      title="修改订单状态"
      width="70%"
    >
    <el-form label-position='top'>
        <el-form-item label="订单是否发货">
           <div>
            <el-radio v-model="more.is_send" label="1" border>已经发货</el-radio>
            <el-radio v-model="more.is_send" label="0" border>未发货</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="支付方式">
          <div>
            <el-radio v-model="more.order_pay" label="0" border>未支付</el-radio>
            <el-radio v-model="more.order_pay" label="1" border>支付宝</el-radio>
            <el-radio v-model="more.order_pay" label="2" border>微信</el-radio>
            <el-radio v-model="more.order_pay" label="3" border>银行卡</el-radio>
          </div>
        </el-form-item>
        <el-form-item label="订单价格">
          <el-input v-model="more.order_price"> </el-input>
        </el-form-item>
        <el-form-item label="订单数量">
          <el-input v-model="more.order_number"> </el-input>
        </el-form-item>
        <el-form-item label="支付状态">
          <div>
            <el-radio v-model="more.pay_status" label="0" border>未付款</el-radio>
            <el-radio v-model="more.pay_status" label="1" border>已付款</el-radio>
          </div>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormChange = false">取 消</el-button>
        <el-button type="primary" @click="changeSubmit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { orders } from "../http/axios.js";
import { Message } from "../http/axios.js";
import { moreOrders } from "../http/axios.js";
import { OrdersChange } from "../http/axios.js";
export default {
  props: {},
  data() {
    return {
      activities:[],
      changeRowId:'',
      dialogFormChange: false,
      detailsObj: {},
      dialogFormDetails: false,
      srh: "",
      tableData: [],
      page: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      dialogFormVisible: false,
      dialogFormMessage: false,
      form: {
        name: "",
        address: [],
      },
      formRule: {
        name: [{ required: true, message: "请输入省市区县", trigger: "blur" }],
        address: [
          { required: true, message: "请选择详细地址", trigger: "change" },
        ],
      },
      more: {
        is_send: "",
        order_pay: "",
        order_price: "",
        order_number: "",
        pay_status: "",
      },
    };
  },
  methods: {
    changeSubmit(){
      console.log(this.more);
      OrdersChange(this.changeRowId,this.more).then(res=>{
          console.log(res);
      })
      this.updateList();
        this.dialogFormChange =false;
    },
    handleSizeChange(val) {
      console.log(this.page, val);
      this.page.pagesize = val;
      this.updateList();
    },
    handleCurrentChange(val) {
      this.page.pagenum = val;
      console.log(this.page, val);
      this.updateList();
    },
    // 搜索按钮
    search() {},
    //更改地址
    addressEdit() {
      this.dialogFormVisible = true;
    },
    // 物流信息
    logisticsMessage(row) {
      Message().then((res) => {
        this.activities=res.data;
        console.log(res.data);
      });

      this.dialogFormMessage = true;
    },
    // 订单详情
    details(row) {
      moreOrders(row.order_id).then((res) => {
        console.log(res);
        this.detailsObj = res.data;
      });
      this.dialogFormDetails = true;
    },
    // 修改订单状态
    handleEdit(row) {
      console.log(row);
      moreOrders(row.order_id).then((res) => {
      switch (res.data.is_send) {
        case '否':
          this.more.is_send='0'
          break;
        default:
          this.more.is_send='1'
          break;
      }
      console.log(this.more.is_send);
      this.more.order_pay=res.data.order_pay;
      this.more.order_price=res.data.order_price;
      this.more.order_number=res.data.order_number;
      this.more.pay_status=res.data.pay_status;
      });
      this.changeRowId=row.order_id;
      this.dialogFormChange = true;
    },
    updateList() {
      orders(this.page).then((res) => {
        this.tableData = res.data.goods;
        this.total = res.data.total;
      });
    },
    //时间格式
    dateFormat: function (row, column) {
      var date = row[column.property];

      if (date == undefined) {
        return "";
      }
      return moment(date * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  },
  components: {},
  mounted() {
    orders(this.page).then((res) => {
      this.tableData = res.data.goods;
      this.total = res.data.total;
      console.log(res);
    });
  },
};
</script>

<style scoped lang="less">
.good {
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
    .el-input {
      width: 350px;
    }
  }
}
</style>
