<!--
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:16:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 19:04:57
-->
<template>
  <div id="header">
    <el-container>
      <el-header style="height: '58px'">
        <h1>电商后台管理系统</h1>
        <router-link to="/Login"><el-button>退出</el-button></router-link>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <h2><img src="../assets/img/welcome.png" alt="" /></h2>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#333744"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu
              :index="String(i.id)"
              v-for="(i, index) in list"
              :key="index"
            >
              <template slot="title">
                <i><img :src="imgs[index]" /></i>
                <span>{{ i.authName }}</span>
              </template>
              <el-menu-item
                :index="String(j.id)"
                v-for="(j, ind) in i.children"
                :key="ind"
                ><router-link :to="'/Home/' + j.path"
                  ><i class="el-icon-menu"></i> {{ j.authName }}</router-link
                ></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menusList } from "./../http/axios.js";
export default {
  props: {},
  data() {
    return {
      list: [],
      imgs: [
        require("../assets/img/人.png"),
        require("../assets/img/盒子.png"),
        require("../assets/img/商城.png"),
        require("../assets/img/订单.png"),
        require("../assets/img/数据.png"),
      ],
    };
  },
  methods: {},
  components: {},
  mounted() {
    menusList().then((res) => {
      this.list = res.data;
      console.log(res);
      console.log(res.data);
    });
  },
};
</script>

<style scoped lang="less">
#header {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  font-size: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  h1 {
    line-height: 58px;
    color: #fff;
  }
  .el-button {
    padding: 14px 21px;
    font-size: 19px;
    color: #fff;
    background-color: #909399;
    border: 0px;
  }
}

.el-aside {
  background-color: #333744;
  color: #333;
  line-height: 200px;
  h2 {
    height: 24px;
    background-color: #4a5064;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body {
  .el-menu {
    border: 0;
    .el-menu-item {
      padding: 0;
      padding-left: 30px !important;
      .router-link-active {
        color: #409eff;
      }
      a {
        i {
          margin-right: 10px;
          img {
            width: 14px;
            height: 14px;
          }
        }
        display: flex;
        align-items: center;
        color: white;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
      }
    }
  }
  .el-container {
    height: 100%;
  }
  .el-menu-vertical-demo {
    .el-submenu__title {
      display: flex;
      justify-content: space-between;
      i {
        margin-right: 11px;
        img {
          width: 14px;
          height: 12px;
        }
      }
    }
  }
}
</style>
