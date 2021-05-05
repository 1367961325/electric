<!--
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-05-04 21:13:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-04 21:34:32
-->
<template>
  <div>
    <el-card>
      <!-- 权限列表表格 -->
      <el-table :data="rightsList" border stripe style="width=100%">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag size="medium" v-if="scope.row.level == 0">一级</el-tag>
            <el-tag type="success" size="medium" v-else-if="scope.row.level == 1"
              >二级</el-tag
            >
            <el-tag type="warning" size="medium" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {rightList} from "../../http/right.js"
export default {
  props: {},
  data() {
    return {
      // 保存权限列表的数据
      rightsList: [],
    };
  },
  methods: {
    getRightsList() {
      rightList()
      .then((res) => {
        this.rightsList = res.data;
      });
    },
  },
  mounted() {
    this.getRightsList();
  },

  components: {},
};
</script>

<style scoped lang="less">
.el-main{
  padding: 20px;
}
</style>
