<template>
  <div class="container">
    <van-nav-bar title left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="reset" v-if="show == true">
      <img src="../../assets/img/icon_19@2x.png" alt />

      <div class="content">
        <p>恭喜您！密码重置成功！</p>
      </div>
      <div class="endto" @click="goHome">
        <span class="item">立即返回</span>
        <span class="pnsa">首页</span>
      </div>
    </div>
    <div class="forget_page" v-else>
      <div class="forget_pass">
        <p>忘记密码</p>
        <span></span>
      </div>
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
          <img src="../../assets/img/icon_18@2x.png" alt />
          <input type="text" placeholder="邮箱验证码" v-model="secode" />
          <p @click="checkCode">{{ counted }}</p>
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
      </form>
      <div class="btn_sure">
        <van-button
          @click="preview"
          round
          size="large"
          color="linear-gradient(to right, #416FAE, #27508C)"
          >重置密码</van-button
        >
      </div>
      <van-divider dashed class="vanDivider dete" />
      <div class="member" :data="VIPlist">
        <div class="menber_title">
          <img src="../../assets/img/icon_17@2x.png" alt />
        </div>
        <div class="content_" v-for="(item, index) in VIPlist" :key="index">
          <img :src="item.image" alt />
          <p>{{ item.name }}:{{ item.describe }}</p>
        </div>
        <div class="end_content">
          <p><span>*</span> 会员有效期为30天</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Toast
} from 'vant';
export default {
  name: "forget",
  data() {
    return {
      email: '',  //lfy6511@163.com
      password: '',
      pass: '',
      secode: '',
      count: '',
      counted: '发送验证码',
      VIPlist: [],
      show: false,
      psd: false,
      event: 'reset',
      isDisable: false,//防止多次提交
    };
  },
  created() {
    this.getVIP()
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    async getVIP() {
      const {
        data: { data }
      } = await this.postRequest("api/user/getUserSystem")
      this.VIPlist = data
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
        Toast('√两次输入的密码相同')
        this.psd = true
      } else {
        this.psd = false
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
            event: this.event
          }).then(res => {
            console.log(res);
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
          this.isDisabled = true;
          if (!this.timer) {
            // this.count = TIME_COUNT;
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
        Toast.fail('未填写邮箱')
      }

    },
    preview() {
      let obj = {}
      obj.email = this.email
      obj.password = this.pass
      obj.repassword = this.password
      obj.captcha = this.secode
      console.log(obj);
      if (this.email && this.secode && this.psd) {
        this.postRequest("api/user/forgetpwd", obj)
          .then(res => {
            console.log(res.data.code);
            if (res.data.code == 1) {
              console.log(res);
              // this.show = !this.show;
              Toast.success(res.data.msg)
              this.$router.back(-1)

            } else {
              // Toast.fail(res.data.msg)
            }

          })
          .catch(err => {
            console.log(err);
            Toast.fail("重置不成功");
          });
      } else if (this.email == '') {
        Toast.fail('邮箱不能为空')
      } else if (this.secode == '') {
        Toast.fail('验证码不能为空')
      } else if (!this.psd) {
        Toast.fail('两次密码不相同')
      }
    },
    goHome() {
      this.$router.push('/')
    },

  },

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

  .forget_page {
    width: 100%;
    padding: 80px 41px 100px;
    box-sizing: border-box;

    .forget_pass {
      width: 100%;
      height: 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 16px;
        color: #416fae;
        line-height: 28px;
      }
      span {
        display: block;
        width: 64px;
        height: 2px;
        border-bottom: 1px solid #416fae;
      }
    }
    .register_form {
      margin-top: 30px;
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
      margin: 60px 0;
      width: 100%;
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
  .reset {
    margin-top: 150px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 100px;
    box-sizing: border-box;
    img {
      width: 88px;
      height: 88px;
    }
    .content {
      height: 40px;
      margin-top: 30px;
      p {
        font-size: 16px;
        line-height: 40px;
        color: #2c2c2c;
      }
    }
    .endto {
      height: 40px;
      .item {
        font-size: 14px;
        color: #2c2c2c;
      }
      .pnsa {
        color: #416fae;
        font-size: 14px;
        border-bottom: 1px solid #416fae;
      }
    }
  }
}
</style>