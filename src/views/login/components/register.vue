<template>
  <!-- :visible.sync  控制对话框是否显示 true 为显示 false 不显示 -->
  <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules">
      <!-- 昵称 -->
      <el-form-item label="昵称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <!--邮箱  -->
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 手机 -->
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 图形码 -->
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img" @click="getNewCode" :src="picCodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 倒计时不为0禁用按钮
              倒计时不为0，代表还有倒计时在数，所以按钮就不能被点，不能被点就是要禁用他
             -->
            <el-button   @click="getPhoneCode"   :disabled="sec !=0" > {{sec==0? '获取用户验证码' :'还有'+ sec + '秒'}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导包
import axios from "axios";
export default {
  data() {
    return {
      //倒计时的秒数
      sec: 0,
      //图片验证码请求地址
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //是否显示对话框
      dialogFormVisible: true,
      // 设置文字宽度
      formLabelWidth: "65px",
      //跟表单元素双向绑定的对象
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        rcode: ""
      },
      //规则对象
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],

        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/, message: "邮箱格式不正确", trigger: "change" } ],

        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {  pattern: /0?(13|14|15|18|17)[0-9]{9}/,  message: "手机格式不正确",  trigger: "change"}],

        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 12, message: "长度为5-12位", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    //图片点击事件
    //  浏览器发送请求，发现是刚才请求过的，它就不会发送请求，而是将上次的请求的的结果再次拿过来用
    //这个就是浏览器的缓存问题
    //解决方案： 1.随机数   2.时间戳 （用的多） 从1970年1月1日 到现在过去多少秒
    getNewCode() {
      //随机数
      // this.picCodeUrl=process.env.VUE_APP_URL + "/captcha?type=sendsms&num=" + Math.random()
      //时间戳
      this.picCodeUrl = process.env.VUE_APP_URL + "/captcha?type=sendsms&num=" + Date.now();
    },
    getPhoneCode() {
      this.sec = 60;
      //计时器 如果不是箭头函数  this 就是指向window
      let timerId = setInterval(() => {
        this.sec--;
        //如果计时器为0 ,就停止计时器
        if (this.sec == 0) {
          clearInterval(timerId);
        }
      }, 1000);
      //发请求获取手机验证码
      //axios如果发跨域请求，默认不会携带cookie
      axios({
        url: process.env.VUE_APP_URL + "/sendsms",
        method: "post",
        data: {
          phone: this.form.phone,
          code: this.form.imgCode
        },
        //允许带cookie 
         withCredentials:true
      }).then(res => {
        window.console.log('手机验证码',res);
        if(res.data.code == 200){
          alert('获取 到的验证码为:' +res.data.data.captcha );
        }else{
          alert(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, rgb(1, 197, 251), rgb(20, 149, 253));

  .el-dialog__title {
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(254, 254, 254, 1);
  }
}

.img {
  width: 100%;
}
</style>