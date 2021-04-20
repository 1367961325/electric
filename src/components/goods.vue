<template>
  <div>我是good</div>
</template>

<script>
import {shopList} from '../http/axios.js'
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {


  },
  mounted(){
shopList().then(res=>{

  console.log(res);
})
  }
};
</script>

<style scoped lang="less">
</style>
