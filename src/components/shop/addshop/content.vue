<template>
  <div>
    <quill-editor v-model="Form"> </quill-editor>
    <el-button type="primary" @click="submit">添加商品</el-button>
  </div>
</template>

<script>
import { shopSubmit } from "../../../http/axios";
export default {
  props: {},
  data() {
    return {
      Form: "",
      success: false,
    };
  },
  methods: {
    submit() {
      console.log(this.$store.state.Arg);
      if (this.$store.state.Arg != "") {
        this.$store.state.Arg.forEach((item) => {
          const formObj = {
            attr_id: item.attr_id,
            attr_vals: this.$store.state.realArg.toString(),
          };
          this.$store.state.addForm.attrs.push(formObj);
          console.log(formObj);
        });
      }
      console.log(this.$store.state.addForm);
      shopSubmit(this.$store.state.addForm).then((res) => {
        console.log(res);
        if (res.meta.status == 201) {
          this.$message({
            message:res.meta.msg,
            type: "success",
          });
          this.$router.replace("/home/goods");
        } else {
            this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
      console.log(this.$store.state.addForm);
    },
  },
  components: {},
  computed: {},
  updated() {
    this.$store.state.addForm.goods_introduce = this.Form;
    console.log(this.$store.state.addForm.goods_introduce);
    console.log(this.$store.state.addForm);
  },
};
</script>

<style lang="less">
.ql-editor {
  height: 300px;
}
.quill-editor {
  margin-bottom: 15px;
}
</style>
