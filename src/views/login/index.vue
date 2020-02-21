<template>
  <div class="login-wrap">
    <!-- 左侧登录盒子 -->
    <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box">
        <!-- log -->
        <img class="logo" src="./images/log.png" alt />
        <span class="left-title">黑马面面</span>
        <!-- 竖线 -->
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form ref="loginForm" label-width="43px" :rules="rules" :model="form">
        <!-- 账号 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.password" show-password></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-row>
            <el-col :span="17">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.code"></el-input>
            </el-col>
            <el-col :span="7">
              <!-- 图片不给宽高以自身图片的大小显示  与父元素没有关系 -->
              <img src="./images/code.png" alt class="yzimg" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 默认选项 -->
        <el-form-item prop="agree">
          <div class="agree-box" >
            <el-checkbox class="agree" v-model="form.agree"></el-checkbox>
            <span>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </span>
          </div>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" class="btn-box" @click="doLogin">登录</el-button>
          <el-button type="primary" class="btn-box">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧图片 -->

    <img src="./images/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        password: "",
        code: "",
        agree: false
      },
      rules: 
        {
          phone: [
            { required: true, message: "手机号码不能为空", trigger: "blur" }
          ],
          password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ],
          code: [
            { required: true, message: "验证码不能为空", trigger: "blur" }
          ],
          agree: [
            { pattern: /true/, message: "必须勾选同意用户协议", trigger: "change" }
          ]
        }
      
    };
  },
  methods:{
    doLogin(){
      this.$refs.loginForm.validate(v=>{
        if(v){
          alert('全部通过')
        }
      })
    }
  }

};
</script>

<style  lang="less">
//使用less 要在安装预处理器  在style标签上写lang ="less" 不然不能使用less
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  /* 主轴排列为space-around */
  justify-content: space-around;
  /* 副轴为：center */
  align-items: center;
  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    box-sizing: border-box;
    padding-right: 41px;
    .title-box {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 29px;
      .logo {
        margin-right: 16px;
        width: 22px;
        height: 17px;
      }
      .left-title {
        margin-right: 14px;
        font-size: 22px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .right-title {
        font-size: 21px;
      }
    }
    .yzimg {
      width: 110px;
      height: 42px;
    }
    .agree-box {
      display: flex;
      align-items: center;
      .agree {
        display: flex;

        .el-checkbox__label {
          display: flex;
          // align-items: center;
        }
      }
      span {
        margin-left: 3px;
      }
    }
    .btn-box {
      width: 100%;
      &:nth-child(2) {
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>