<template>
  <div>
    <div class="good">
      <div style="margin-top: 15px" class="good_head">
        <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
        <el-steps
          :active="Number(message)"
          align-center
          finish-status="success"
        >
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="block">
        <el-tabs
          :tab-position="tabPosition"
          v-model="message"
          :before-leave="eee"
        >
          <el-tab-pane label="基本信息" name="0"
            ><Message></Message
          ></el-tab-pane>
          <el-tab-pane label="商品参数" name="1"
            ><Argument></Argument
          ></el-tab-pane>
          <el-tab-pane label="商品属性" name="2"
            ><Property></Property
          ></el-tab-pane>
          <el-tab-pane label="商品图片" name="3"
            ><Shopimg></Shopimg
          ></el-tab-pane>
          <el-tab-pane label="商品内容" name="4"
            ><Content></Content
          ></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./addshop/message.vue";
import Argument from "./addshop/argument.vue";
import Property from "./addshop/property.vue";
import Shopimg from "./addshop/shopimg.vue";
import Content from "./addshop/content.vue";
import { shopArg } from "../../http/axios.js";
import { shopPro } from "../../http/axios";
export default {
  props: {},
  data() {
    return {
      tabPosition: "left",
      message: "0",
      arg: [],
      From: {},
    };
  },
  methods: {
    eee(activeName) {
      if (activeName >= 1) {
        let whatFrom = this.$store.state.addForm;
        if (whatFrom.goods_name == undefined || whatFrom.goods_name == "") {
          this.$message.error("顺手把商品名写上如何");
          return false;
        } else if (
          whatFrom.goods_price == undefined ||
          whatFrom.goods_price == ""
        ) {
          this.$message.error("你不写价格让我很难搞");
          return false;
        } else if (
          whatFrom.goods_number == undefined ||
          whatFrom.goods_number == ""
        ) {
          this.$message.error("请填上商品的数量");
          return false;
        } else if (
          whatFrom.goods_cat == undefined ||
          whatFrom.goods_cat.length == 0
        ) {
          this.$message.error("我笨笨的，不知道改分到哪一类，帮帮我好吗？");
          return false;
        } else if (
          whatFrom.goods_weight == undefined ||
          whatFrom.goods_weight == ""
        ) {
          this.$message.error("商品多重呢，我又不是秤，不写让我怎么搞");
          return false;
        }
      }
      if (activeName == 1) {
        shopArg({ cateId: this.$store.state.cateId[2] }).then((res) => {
          console.log('参数',res.data);
          res.data.forEach((item) => {
            item.attr_vals =
              item.attr_vals.length === 0 ? [] : item.attr_vals.split(" ");
              console.log(item.attr_vals);
              
          });
          this.$store.state.Arg = res.data;
        });
      }
      if (activeName == 2) {
        shopPro({ cateId: this.$store.state.cateId[2]}).then(
          (res) => {
            console.log('属性',res.data)
            this.$store.state.attrs_pro=res.data;
            console.log(this.$store.state.cateId[2]);
            console.log(res);
            res.data.forEach(item=>{
            const formObj={
                attr_id:item.attr_id,
                attr_vals:item.attr_vals,
            }
            console.log(formObj);
            this.$store.state.addForm.attrs.push(formObj);
            })
          }
        );
      }
    },
  },
  computed: {
    catename() {
      console.log(this.$store.state.cateName[2]);
      if (this.$store.state.cateName.length == 3) {
        return this.$store.state.cateName[2];
      } else {
        return this.$store.state.cateName[1];
      }
    },
  },
  components: {
    Message,
    Argument,
    Property,
    Shopimg,
    Content,
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
      .el-steps {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
        margin-bottom: 23px;
      }
    }
    .block {
      margin-top: 17px;
    }
  }
}
</style>
