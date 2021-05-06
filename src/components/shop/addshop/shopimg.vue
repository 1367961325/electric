<template>
  <div>
    <el-upload
      action="http://192.168.1.10:8888/api/private/v1/upload"
      :headers='header'
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-dialog
  title="图片预览"
  :visible.sync="previewVisible"
  width="50%">
 <img :src="previewImgSrc" class='preview'>
</el-dialog>
  </div>


  
</template>

<script>
export default {
  props: {},
  data() {
    return {
      header:{
          Authorization:window.sessionStorage.getItem('token')
        },
      previewImgSrc:'',
      previewVisible:false,
    };
  },
  methods: {
    handlePreview(result) {
      console.log(result);
      this.previewImgSrc = result.response.data.url;
      this.previewVisible = true;
    },
    handleRemove(result) {
      console.log(result);
      // 根据 result.response.data.temp_path 从 addForm.pics 数组中，找到要删除那个对象的索引值
      const index = this.$store.state.addForm.pics.findIndex(
        (item) => item.pic === result.response.data.tmp_path
      );
      // 根据索引删除对应的图片信息对象
      this.$store.state.addForm.pics.splice(index, 1);
            console.log(this.$store.state.addForm);
    },
    // 图片上传成功
    handleSuccess(result) {
      if (result.meta.status === 200) {
        // 把上传成功后，图片的临时路径，保存到 addForm.pics 数组中，作为对象来保存
        this.$store.state.addForm.pics.push({ pic: result.data.tmp_path });

      }
      console.log(this.$store.state.addForm);
    },
  },
  components: {},
};
</script>

<style scoped lang="less">
.preview{
width: 100%;
height: 100%;
}
</style>
