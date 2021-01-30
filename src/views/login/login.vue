<template>
  <div class="container">
    <van-nav-bar title left-arrow @click-left="goBackFn" class="fixedtop" />
    <van-tabs v-model="active" class="vanTab">
      <van-tab title="登录"></van-tab>
      <van-tab title="注册"></van-tab>
    </van-tabs>
    <div class="titleRegister" v-if="active == 1">
      <form action class="register_form">
        <div class="item_txt">
          <img src="../../assets/img/icon_mail@2x.png" alt />
          <input
            type="text"
            placeholder="请输入邮箱"
            @blur="validEmail"
            v-model="email"
          />
        </div>
        <div class="item_txt">
          <img src="../../assets/img/icon_lock@2x.png" alt />
          <input
            type="password"
            placeholder="请输入密码"
            maxlength="16"
            minlength="6"
            v-model="pass"
            @blur="registerPass"
          />
        </div>
        <div class="item_txt">
          <img src="../../assets/img/icon_lock@2x.png" alt />
          <input
            type="password"
            placeholder="确认密码"
            maxlength="16"
            minlength="6"
            v-model="password"
            @blur="registerPass2"
          />
        </div>
        <div class="item_txt">
          <img src="../../assets/img/icon_18@2x.png" alt />
          <input type="text" placeholder="邮箱验证码" v-model="secode" />
          <p @click="checkCode">{{ counted }}</p>
        </div>
      </form>
      <div class="btn_sure">
        <van-button
          round
          size="large"
          color="linear-gradient(to right, #416FAE, #27508C)"
          @click="register"
          >注册</van-button
        >
      </div>
      <div class="toGister">
        <p>已有账号？</p>
        <span @click="goLogin">快去登录</span>
      </div>
    </div>
    <div class="login" v-else>
      <div class="from_card">
        <form action>
          <div class="login_email">
            <img src="../../assets/img/icon_mail@2x.png" alt />
            <input
              type="text"
              placeholder="请输入邮箱"
              placeholder-class="add"
              @blur="validEmail"
              v-model="email"
            />
          </div>
          <div class="login_password">
            <img src="../../assets/img/icon_lock@2x.png" alt />
            <input
              type="password"
              placeholder="请输入密码"
              maxlength="16"
              minlength="6"
              v-model="password"
              @blur="validPass"
            />
          </div>
        </form>
        <div class="rember">
          <div class="remember_pass" @click="isShow">
            <img src="../../assets/img/changefang.png" alt v-if="remember" />
            <img src="../../assets/img/icon_01@2x.png" alt v-else />
            <span>记住密码</span>
          </div>
          <div class="forget_pass" @click="toForgetPage">
            <span>忘记密码</span>
          </div>
        </div>
        <div class="btn_sure" @click="submitLogin">
          <van-button
            round
            size="large"
            color="linear-gradient(to right, #416FAE, #27508C)"
            >登录</van-button
          >
        </div>
        <div class="toGister">
          <p>还没有账号？</p>
          <span @click="goRegister">快去注册</span>
        </div>
      </div>
    </div>
    <div class="publicStyle">
      <div class="member" :data="VIPlist">
        <div class="menber_title">
          <img src="../../assets/img/icon_17@2x.png" alt />
        </div>
        <div class="content_" v-for="(item, index) in VIPlist" :key="index">
          <img :src="item.image" alt />
          <p>{{ item.name }}:{{ item.describe }}</p>
        </div>
        <div class="end_content">
          <p><span>*</span>会员有效期为30天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
import {
  Toast
} from 'vant';
// import * as auth from '@/utils/auth'
import { mapActions } from "vuex"
const Base64 = require('js-base64').Base64
export default {
  name: "login",
  data() {
    return {
      active: 2,
      index: 0,
      email: '',  //lfy6511@163.com
      name: '',
      password: '',      // lfy6511@163.com lfy333666
      remember: false,
      pass: '',
      secode: '',
      count: '',
      counted: '发送验证码',
      VIPlist: [],
      registered: false,
      isDisable: false,//防止多次提交
      reqParams: {
        appid: 'wx80aae94b645530b0',
        scope: 'snsapi_login',
        redirect_uri: encodeURI(window.location.href),
        state: 'STATE',
        login_type: 'jssdk',
        self_redirect: false,
        myWindow: '',
      },
      wait: 0,

    };
  },
  created() {
    // 在页面加载时从cookie获取登录信息
    let email = this.getCookie("email")
    let remember = this.getCookie("remember")
    let password = Base64.decode(this.getCookie("password"))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (remember) {
      this.email = email
      this.password = password
      this.remember = remember
    }
    console.log(email, password,);
    let routeParams = this.$route.query.wait || ''
    if (routeParams != '') {
      this.wait = routeParams
    }
    this.getVIP()
    if (this.active != 1) {
      this.getAccount()
    }
  },
  methods: {
    ...mapActions(['userinfo']),
    wechatlogin() {  // 微信登录
      console.log(this.reqParams);
      var appid = this.reqParams.appid, redirect_uri = this.reqParams.redirect_uri;
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx80aae94b645530b0&redirect_uri=https://m.glaforteachers.com/login&scope=snsapi_login&state=STATE#wechat_redirect'

    },
    getAccount() {
      let account = JSON.parse(localStorage.getItem('account'))
      if (account) {
        this.email = account.email
        this.password = account.password
      }
    },
    validEmail() {  // 邮箱验证
      console.log(this.email);
      let value = this.email
      if (value === '') {
        Toast('请正确填写邮箱地址');
      } else {
        if (value !== '') {
          var reg = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          if (!reg.test(value)) {
            Toast('请输入有效的邮箱地址');
          }
        }
      }
    },
    validPass() {   // 密码验证
      console.log(this.password);
      let value = this.password
      if (value === '') {
        Toast('请输入密码');
      } else {
        if (value !== '') {
          var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
          if (!pwdReg.test(value)) {
            Toast('请输入6-16位的密码，需包含数字、字母');
          }
        }
      }
    },
    async getUserInfo() {
      let userInfo = []
      const {
        data: { data }
      } = await this.postRequest("api/user/getUserInfo");
      userInfo = data;
      console.log(data);
      this.userinfo(userInfo);
    },
    async submitLogin() {   // 登录
      try {
        if (this.email && this.password) {
          const { data } = await this.postRequest('api/user/login', { email: this.email, password: this.password })
          console.log(data);
          if (data.code == 1) {
            localStorage.setItem('kou_token', JSON.stringify(data.data.token));
            Toast.success(data.msg)
            this.getUserInfo()
            this.setUserInfo()
            if (localStorage.getItem('shopCartID') != null) {
              localStorage.removeItem('shopCartID');
              localStorage.removeItem('shopCart');
            }
            this.$router.back(-1);
          } else {
            Toast.fail(data.msg)
          }
        } else {
          Toast.fail('邮箱或密码错误')
        }
      } catch (err) {
        console.log(err);
        alert(JSON.stringify(err))
        // Toast.fail(JSON.stringify(err))
      }

    },
    toForgetPage() {
      // 跳转至忘记密码页面
      this.$router.push("/forget");
    },
    isShow() { // 记住密码
      this.remember = !this.remember
    },
    setUserInfo() {         // 储存表单信息
      if (this.remember) {
        this.setCookie("email", this.email)
        // base64加密密码
        let password = Base64.encode(this.password)
        this.setCookie("remember", this.remember)
        this.setCookie("password", password)
      } else {
        this.setCookie("email", "")
        this.setCookie("password", "")
      }
    },
    getCookie(key) {  // 获取cookie
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    setCookie(cName, value, expiredays) {      // 保存cookie
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie = cName + '=' + decodeURIComponent(value) +
        ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
    },
    goBackFn() {  // 回到上一步
      this.$router.go(-1);
    },
    goRegister() {
      this.active = 1
    },
    async getVIP() {
      const {
        data: { data }
      } = await this.postRequest("api/user/getUserSystem")
      this.VIPlist = data
      // console.log(data);
    },
    // ----------------------------------------     注册页面     --------------------------------------
    registerPass() {   // 密码验证
      console.log(this.pass);
      let value = this.pass
      if (value === '') {
        Toast('密码不能为空');
      } else {
        if (value !== '') {
          var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
          if (!pwdReg.test(value)) {
            Toast('请输入6-16位的密码，需包含数字、字母');
          }
        }
      }
    },
    registerPass2() {   // 密码验证2
      console.log(this.password);
      let value = this.password
      if (value === '') {
        Toast('密码不能为空');
      } else {
        if (value !== '') {
          var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;//8到16位数字与字母组合
          if (!pwdReg.test(value)) {
            Toast('请输入6-16位的密码，需包含数字、字母');
          } else {
            this.validatePassword()
          }
        }
      }
    },
    validatePassword() {
      let pass = this.pass
      let password = this.password
      if (pass == '' || password == '') {
        Toast('密码不能为空')
      } else if (pass == password) {
        Toast('√ 两次输入的密码相同')
        this.registered = true
      } else {
        this.registered = false
        Toast('两次输入的密码不相同')
      }
    },
    checkCode() {  // 发送验证码
      if (this.email != '') {
        if (this.isDisable) {
          return
        } else {
          this.isDisable = true;  //点击后禁用该按钮
          this.getRequest("api/ems/send", {
            email: this.email,
          }).then(res => {
            if (res.code == 0) {
              let msg = res.msg
              Toast(msg)
            } else {
              let msg = res.msg
              Toast(msg)
            }
          })
          const TIME_COUNT = 60;
          this.count = TIME_COUNT;
          this.counted = "已发送" + this.count + '秒'
          if (!this.timer) {
            this.code_show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
                this.counted = "已发送" + this.count + '秒';
              } else {
                this.code_show = true;
                clearInterval(this.timer);
                this.counted = '发送验证码'
                this.timer = null;
                this.buttonText = "";
                this.isDisable = false;
              }
            }, 1000);
          }
        }
      } else {
        Toast.fail('未输入邮箱')
      }
    },
    goLogin() {
      this.active = 2
    },
    register() {
      let obj = {}
      obj.email = this.email
      obj.password = this.pass
      obj.repassword = this.password
      obj.captcha = this.secode
      console.log(obj);
      if (this.email && this.secode && this.registered) {
        this.postRequest("api/user/register", obj)
          .then(res => {
            if (res.data.code == 1) {
              let msg = res.data.msg
              Toast.success(msg);
              setTimeout(() => {
                this.active = 2
              }, 2000);
            } else {
              let msg = res.data.msg
              Toast.fail(msg);
            }

          })
          .catch(err => {
            console.log(err);
            Toast.fail(err.msg)
          });
      } else if (this.email == '') {
        Toast.fail('邮箱不能为空')
      } else if (this.registered == '') {
        Toast.fail('两次密码不相同')
      } else if (!this.secode) {
        Toast.fail('验证码不能为空')
      }
    },


  }
};
</script> 

<style scoped lang='less'>
.container {
  width: 100%;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .vanTab {
    width: 100%;
    padding-top: 80px;
    box-sizing: border-box;
  }
  .left_arrow {
    display: flex;
    align-items: center;
    margin-top: 40px;
    width: 100%;
    height: 44px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .login {
    width: 100%;
    padding: 0 41px 40px;
    box-sizing: border-box;
    margin-top: 30px;
    .from_card {
      .login_email {
        height: 64px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bdc4ce;
        img {
          width: 20px;
          height: 20px;
        }
        input {
          margin-left: 20px;
          border: 0;
          outline: none;
          background-color: rgba(0, 0, 0, 0);
          flex: 1;
        }
      }
      .login_password {
        height: 64px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bdc4ce;
        img {
          width: 20px;
          height: 20px;
        }
        input {
          margin-left: 20px;
          border: 0;
          outline: none;
          background-color: rgba(0, 0, 0, 0);
          flex: 1;
        }
        .add {
          color: crimson;
          font-size: 12px;
        }
      }
      .rember {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .remember_pass {
          display: flex;
          align-items: center;
          span {
            color: #999999;
            font-size: 12px;
            margin-left: 5px;
          }
          img {
            width: 12px;
            height: 12px;
          }
        }
        .forget_pass {
          color: #416fae;
          font-size: 12px;
        }
      }
      .btn_sure {
        margin-top: 60px;
        width: 100%;
      }
      .toGister {
        margin-top: 10px;
        text-align: center;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        p {
          font-size: 12px;
        }
        span {
          color: #416fae;
          font-size: 12px;
        }
      }
    }
    .add {
      color: crimson;
      font-size: 5px;
    }
  }
  .titleRegister {
    width: 100%;
    padding: 0 41px 40px;
    box-sizing: border-box;
    margin-top: 30px;
    .register_form {
      .item_txt {
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #bdc4ce;
        justify-content: center;
        height: 64px;
        img {
          width: 20px;
          height: 20px;
        }
        input {
          width: 100%;
          border-style: none;
          text-indent: 10px;
          height: 64px;
        }
        input::-webkit-input-placeholder {
          color: #ccc;
          font-size: 14px;
          height: 64px;
        }
        p {
          color: #416fae;
          width: 150px;
          font-size: 12px;
          text-align: center;
          line-height: 64px;
        }
      }
    }

    .btn_sure {
      margin-top: 60px;
      width: 100%;
    }
    .toGister {
      margin-top: 10px;
      text-align: center;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: center;
      p {
        font-size: 12px;
      }
      span {
        color: #416fae;
        font-size: 12px;
      }
    }
  }
  .publicStyle {
    padding: 0 41px 41px;
    box-sizing: border-box;

    .divider_ {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 44px;
        height: 44px;
      }
      .dete {
        margin: 50px 0;
        border-color: #707070;
      }
    }
    .member {
      width: 100%;
      .menber_title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 166px;
          height: 25px;
        }
      }
      .content_ {
        display: flex;
        align-items: center;
        height: 60px;

        img {
          width: 18px;
          height: 22px;
        }
        p {
          margin-left: 15px;
          font-size: 12px;
          line-height: 17px;
          color: #666666;
        }
      }
      .end_content {
        width: 100%;
        p {
          text-align: center;
          font-size: 12px;
          color: #ccc;
          span {
            color: #ff0000;
          }
        }
      }
    }
  }
}
</style>