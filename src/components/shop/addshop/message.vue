<template>
  <div>
    <el-form
      :model="ruleForm" 
      :rules="rules"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <label for="ruleForm.price" class="el-form-item__label"
          ><span>*</span>商品价格{{ price }}</label
        >
        <el-input-number
          class="pri"
          v-model="ruleForm.price"
          controls-position="right"
          @change="handleChange"
          :min="1"
        ></el-input-number>
        <div class="el-form-item__error" v-show="istrue">请输入商品价格</div>
      </el-form-item>

      <el-form-item label="商品重量" prop="weight">
        <el-input v-model="ruleForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="商品数量" prop="num">
        <el-input v-model="ruleForm.num"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择商品分类">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
          <el-option label="不明" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      price: "",
      },
      istrue: false,
      rules: {
        name: [
          { required: true, message: "请填写商品名称", trigger: "blur" }
          ],
        price: [
          { required: true, message: "请填写商品价格", trigger: "blur" }
          ],
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
      console.log(value);
    },
  },
};
</script>

<style scoped lang="less">
body .el-form-item label {
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
    height: 50px;
    .el-input__inner {
      text-align: left;
    }
  }
}
</style>
