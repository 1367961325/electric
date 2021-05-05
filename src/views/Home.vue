<!--
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:16:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-30 16:32:42
-->
<template>
  <div id="header">
    <el-container class="all">
      <el-header style="height: '58px'">
        <h1>电商后台管理系统</h1>
        <router-link to="/Login"><el-button>退出</el-button></router-link>
      </el-header>
      <el-container class='content'>
        <el-aside width="200px">
          <h2><img src="../assets/img/welcome.png" /></h2>
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
                @click="toright(i, j)"
                ><router-link :to="'/home/' + j.path">
                  <i class="el-icon-menu"></i> {{ j.authName }}</router-link
                ></el-menu-item
              >
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-show="theFirst.authName">
              {{ theFirst.authName }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-show="theSecond.authName">
              {{ theSecond.authName }}
            </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
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
      theFirst: "",
      theSecond: "",
      istrue: false,
    };
  },
  methods: {
    toright(i, j) {
      this.theFirst = i;
      this.theSecond = j;
      console.log(i, j);
    },
  },
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
.all {
  height: 100%;
  .el-header {
    width: 100%;
    top: 0px;
    z-index: 100;
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
  .content{
    overflow: hidden;
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
body {
  .el-main {
    color: #606266;
    padding: 0 2px 0 19px;
    background-color: #eaedf1;
    .el-breadcrumb {
      margin-top: 21px;
      margin-bottom: 17px;
    }
  }
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
