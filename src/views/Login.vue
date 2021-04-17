<!--
 * @Descripttion: XXT
 * @version: 1.0
 * @@Company: DCIT-SH
 * @Date: 2021-04-14 15:52:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-16 20:46:10
-->
<template>
    <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="name">
                <el-input placeholder="请输入用户名"  v-model="ruleForm.name" clearable prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input placeholder="请输入密码" v-model="ruleForm.pass" clearable show-password  prefix-icon='el-icon-lock'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm') " >立即登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            ruleForm: {
                name: '',
                pass:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
            this.axios.post('http://localhost:3000/login',{
                username:this.ruleForm.name,
                password:this.ruleForm.pass,
            }).then(res=>{
                let {token} =res.data;
                sessionStorage.setItem('token',token)
                if(res.status==200){
                    this.$router.replace('/index');
                }else{
                    this.$message.error('用户名密码不正确，请重新输入');
                    console.log('error submit!!');
                    return false;
                }                
            })
          } 
        }); 
      },
      
      
      
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
    .el-form{
        width: 45%;
        background-color: #fff;
        border-radius: 10px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        padding: 30px;
        .el-form-item__label{
            text-align: left;
        }
        .el-button--primary {
            margin: 30px 0px 0px 50px;
        }
    }
}
</style>

