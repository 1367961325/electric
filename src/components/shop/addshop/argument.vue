<template>
  <div>
    <el-form id='checkform'>
      <el-form-item :label="i.attr_name"  v-for="(i,index) in takeArg"
          :key='index'>
        <el-checkbox
        v-for="(j,ind) in i.attr_vals"
        :key='ind'
        :label="j"
        border
        class='check'
        v-model="someArg"
        @change='change'
        >
        </el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {},
  data() {
    return {
      someArg:[],
    };
  },
  methods: {
    change(){
      this.$store.state.realArg=this.someArg;
      console.log(this.someArg);
      console.log(this.$store.state.Arg);console.log('123');
    }
  },
  // updated() {
  //   
  // },
  components: {},
  mounted() {

  },
  computed: {
    takeArg(){
      console.log(this.$store.state.Arg);
      return this.$store.state.Arg;
    }
  },
};
</script>

<style lang="less">
body .check{
  margin-left: 0px!important;
  margin-bottom: 20px;
}
body .check .el-checkbox__label{
  color: #606266;
}
#checkform .el-form-item__label{
  width: 100%;
  text-align: left;

}
</style>
