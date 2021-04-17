<!--
 * @Descripttion: XXT
 * @version: 1.0
 * @@Company: DCIT-SH
 * @Date: 2021-04-14 15:52:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 19:06:13
-->
<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <div class = 'loginImg'>
                <img src ='./../assets/logo.png'></img>
            </div>
            <el-form-item prop="name">
                <el-input placeholder="请输入用户名"  v-model="ruleForm.name" clearable prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="pass">
                <el-input placeholder="请输入密码" v-model="ruleForm.pass" clearable show-password  prefix-icon='el-icon-lock'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm') " >立即登录</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {login} from './../http/axios.js'
export default {
    props: {

    },
    data() {
        return {
            ruleForm: {
                name: 'admin',
                pass:'123456',
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
        //判断是否符合验证规则
          if (valid) {
            var data = {
                un:this.ruleForm.name,
                ps:this.ruleForm.pass,
            }
        //发送登录请求
            login(data).then(res=>{
                console.log(res);
                //判断是否登陆成功
                if(res.meta.status == 200){
                    sessionStorage.setItem('token',res.data.token)
                    this.$router.replace('/home');
                }else{
                    this.$message.error(res.meta.msg);
                    console.log('error submit!!');
                    return false;
                }                
            })
          } 
        }); 
      },
       resetForm(formName) {
        this.$refs[formName].resetFields();
      }

      
    },
    components: {

    },
};
</script>

<style scoped lang="less">
.login{
    width: 100%;
    height: 100%;
    background-color: #ccc;
    display:flex;
    justify-content:center;
    align-items:center;
    .el-form{
        position:relative;
        width: 450px;
        padding: 70px 30px 30px 0px;
        box-sizing:border-box;
        background-color: #fff;
        border-radius: 10px;
        margin:0;
        .el-alert{
            font-size:14px;
        }
        .loginImg{
            position:absolute;
            width:120px;
            height:120px;
            padding:2px;
            border-radius:50%;
            box-sizing:border-box;
            border:2px solid #ccc;
            left:50%;
            top:0;
            transform:translate(-50%,-50%);
            z-index:9;
            background-color:#fff;
            display:flex;
            justify-content:center;
            align-items:center;
            img{
                width:85%;
                height:85%;
                border-radius:50%;
                background-color:#ccc;
                border:1px solid #fff;
            }
        }
        .el-input{
            width:100%;
            margin-left:-28px;
        }
        .el-button--primary {
           margin-left:114px
        }
    }
}
</style>

