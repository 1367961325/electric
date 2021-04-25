<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
      label-position='top'
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price" type='number' min='1'></el-input>
      </el-form-item>

      <el-form-item label="商品重量" prop="weight">
        <el-input v-model="ruleForm.weight" type='number'></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num" type='number'></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="region">
        
        <div class="block">
          <span class="demonstration"></span>
          <el-cascader
            ref='cascaderAdd'
            :options="options"
            @change="handleChange"
            :props='props'
          >
          </el-cascader>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { shopType } from "../../../http/axios.js";
// import { shopArgR } from "../../../http/axios.js";
export default {
  data() {
    return {
      ruleForm: {
        num:'',
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        resource: "",
        desc: "",
        price: "",
      },
      props:{
        label:'cat_name', 
        value: 'cat_id',
      },
      options:[],
      cateId:'',
      catename:'',
      istrue: false,
      rules: {
        name: [{ required: true, message: "请填写商品名称", trigger: "blur" }],
        price: [{ required: true, message: "请填写商品价格", trigger: "blur",
        min:1 }],
        weight: [
          { required: true, message: "请填写商品重量", trigger: "blur" },
        ],
        num: [{ required: true, message: "请填写商品数量", trigger: "blur" }],
        region: [
          { required: true, message: "请选择商品分类", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
     this.cateId=value;
      this.catename=this.$refs['cascaderAdd'].getCheckedNodes()[0].pathLabels;
      console.log(this.catename);
      console.log(this.cateId);
      this.$store.state.cateId=this.cateId;
      this.$store.state.addForm.goods_cat=this.cateId.toString();
      console.log(this.$store.state.addForm.goods_cat);
      console.log(this.$store.state.cateId);
    },
  },
  computed:{
    cate(){
     this.$store.state.cateId= this.cateId;
     this.$store.state.cateName= this.catename;
      console.log(this.$store.state.cateId);
      console.log(this.$store.state.cateName);
      return this.$store.state.cateId;
    }

  },
  mounted() {
    shopType()
      .then((res) => {
        this.options=res.data;
        // console.log(res);
      });

      
  },
  updated() {
    console.log(this.ruleForm);
    console.log(this.$store.state.addForm);
    this.$store.state.addForm.goods_name=this.ruleForm.name;
    this.$store.state.addForm.goods_price=this.ruleForm.price;
    this.$store.state.addForm.goods_weight=this.ruleForm.weight;
    this.$store.state.addForm.goods_number=this.ruleForm.num;
    console.log(this.$store.state.addForm.goods_cat.length);
  },
};
</script>

<style lang="less">
body .demo-ruleForm .el-form-item label {
  width: 100%;
  text-align: left;
  span {
    line-height: 19px;
    color: red;
    margin-right: 4px;
  }
}
.el-select {
  width: 100%;
}
.pri {
  width: 100%;
  .el-input {
    .el-input__inner {
      text-align: left;
    }
  }
}
</style>
