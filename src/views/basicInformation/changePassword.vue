<template>
  <div class="container">
    <van-nav-bar
      left-arrow
      @click-left="goBackFn"
      title="修改密码"
      class="fixedtop"
    />
    <div class="password_pass">
      <p>修改密码</p>
      <span></span>
    </div>
    <div class="psd">
      <div class="item_txt">
        <label for="旧密码" class="publicpass">旧密码</label>
        <input
          type="password"
          placeholder="请输入旧密码"
          v-model="password"
          @blur="registerPassjiu"
        />
      </div>
      <div class="item_txt">
        <label for="新密码" class="publicpass">新密码</label>
        <input
          type="password"
          placeholder="确认密码"
          v-model="jiuPassword"
          @blur="registerPass"
        />
      </div>
      <div class="item_txt">
        <label for="新密码" class="publicpass">新密码</label>
        <input
          type="password"
          placeholder="确认密码"
          v-model="newPassword"
          @blur="registerPass2"
        />
      </div>

      <div class="bted">
        <van-button
          round
          size="large"
          color="linear-gradient(to right, #416FAE, #27508C)"
          @click="submitForm"
          >保存</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "changePassword",
  data() {
    return {
      password: "",
      jiuPassword: "",
      newPassword: "",
      psd: false,
    };
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    registerPassjiu() {   // 密码验证
      console.log(this.password);
      let value = this.password
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
    registerPass() {   // 密码验证
      console.log(this.jiuPassword);
      let value = this.jiuPassword
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
      console.log(this.newPassword);
      let value = this.newPassword
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
      let jiuPassword = this.jiuPassword
      let newPassword = this.newPassword
      if (jiuPassword == '' || newPassword == '') {
        Toast('密码不能为空')
      } else if (jiuPassword == newPassword) {
        Toast('√ 两次输入的密码相同')
        this.psd = true
      } else {
        this.psd = false
        Toast('两次输入的密码不相同')
      }
    },
    async submitForm() {
      let obj = {}
      obj.oldpassword = this.password
      obj.password = this.jiuPassword
      obj.repassword = this.newPassword
      if (this.password && this.psd == true) {
        const { data } = await this.postRequest(
          "api/user/changepwd", obj
        );
        if (data.code == 1) {
          console.log(data);
          let msg = data.msg
          Toast.success(msg);
          localStorage.removeItem('account');
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000);
        } else {
          let msg = data.msg
          Toast.fail(msg);
        }
      } else if (this.password == '') {
        Toast('旧密码不能为空')
      } else if (this.psd == false) {
        Toast('两次输入的新密码不相同')
      }



    }
  }
};
</script>

<style scoped lang='less'>
.container {
  padding: 16px;
  box-sizing: border-box;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .password_pass {
    padding-top: 80px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    // background-color: #ccc;
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
  .psd {
    padding: 20px 16px;
    box-sizing: border-box;
    .publicpass {
      width: 100px;
      text-align: center;
      margin-right: 20px;
      color: #3d444d;
    }
    .pass {
      line-height: 40px;
      border-bottom: 1px solid #eeeeee;
    }

    .item_txt {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eeeeee;
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
      }
      input::-webkit-input-placeholder {
        color: #ccc;
        font-size: 14px;
      }
      p {
        color: #416fae;
        width: 100px;
        font-size: 12px;
      }
    }
    .bted {
      margin-top: 30px;
    }
  }
}
</style> 