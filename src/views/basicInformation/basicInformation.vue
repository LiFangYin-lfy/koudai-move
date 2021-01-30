<template>
  <div class="container">
    <van-nav-bar title="基本信息" left-arrow @click-left="goBackFn" class="fixedtop" />
    <!-- 基本信息 -->
    <van-form>
      <div class="information">
        <div class="n_name">
          <label for="昵称" class="pet_name">
            昵称
            <span>*</span>
          </label>
          <input type="text" placeholder="请输入昵称" v-model="myUserInfo.nickname" />
        </div>
        <div class="n_gender n_name">
          <label for="性别" class="pet_name">性别</label>
          <div class="chag">
            <div class="gender_1" @click="boyClick">
              <div class="icon_img">
                <img src="../../assets/img/changefang.png" v-if="boyCheck" alt />
                <img src="../../assets/img/fang.png" v-else alt />
              </div>
              <div class="nam">男</div>
            </div>
            <div class="gender_0" @click="girlClick">
              <div class="icon_img">
                <img src="../../assets/img/changefang.png" v-if="girlCheck" alt />
                <img src="../../assets/img/fang.png" v-else alt />
              </div>
              <div class="nam">女</div>
            </div>
          </div>
        </div>
        <div class="n_birthday n_name">
          <label for="生日" class="pet_name">生日</label>
          <van-cell v-model="myUserInfo.birthday" type="single" @click="show = true" />
          <van-calendar
            v-model="show"
            @confirm="onConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          />
          <van-icon name="arrow" />
        </div>
        <div class="n_mailbox n_name">
          <label for="邮箱" class="pet_name">邮箱</label>
          <input type="text" placeholder="请输入邮箱" disabled v-model="myUserInfo.email" />
        </div>
        <div class="n_password">
          <div class="small_ti">(仅设置⼀次不可修改)</div>
          <div class="password n_name">
            <label for="密码" class="pet_name">密码</label>
            <input type="password" placeholder="请输入密码" />
            <span @click="goChangePassword" class="xiugai">修改</span>
          </div>
        </div>
        <div class="n_head">
          <label for="头像照片" class="head">头像照片</label>
          <div class="vc">
            <van-uploader
              class="a-card"
              multiple
              v-model="fileList"
              :after-read="afterRead"
              :max-count="1"
              :max-size="4 * 1024 * 1024"
            />
          </div>
          <div class="n_readonly">
            <!-- <label for class="readonly"></label> -->
            <span>*</span>
            <p>（仅支持JPG、PNG、GIF、BMP格式，文件小于4M）</p>
          </div>
        </div>
      </div>
      <!-- 保存按钮 -->
      <div class="n_btn">
        <van-button
          color="linear-gradient(to right, #416FAE, #27508C)"
          @click="confirmImage"
          size="large"
        >保存</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "basicInformation",
  data() {
    return {
      show: false,
      boyCheck: true,
      girlCheck: false,
      userInfo: {},
      nickname: '',
      fileList: [],
      myUserInfo: {
        avatar: "", //上传头像
        nickname: "", // 用户名
        gender: 1, // 性别
        birthday: "" // 生日
      },
      url: '',
      minDate: new Date(1970, 1, 1),
      maxDate: new Date()
    };
  },
  created() {
    this.getInformation()
  },
  methods: {
    goChangePassword() {
      this.$router.push('/changePassword');
    },
    goBackFn() {   // 回到上一步
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.myUserInfo.birthday = this.formatDate(date);
    },
    async getInformation() {
      const {
        data: { data }
      } = await this.postRequest("api/user/getUserInfo");
      this.userInfo = data;
      this.myUserInfo.nickname = data.nickname
      this.myUserInfo.birthday = data.birthday
      this.myUserInfo.gender = data.gender
      this.myUserInfo.avatar = data.avatar
      this.myUserInfo.email = data.email
      if (data.gender == 0) {
        this.myUserInfo.gender = 0;
      } else {
        this.myUserInfo.gender = 1;
      }
    },
    async afterRead(file) {
      var formdata = new FormData();
      formdata.append("file", file.file);
      this.upload = 1
      console.log(file.file);
      const { data } = await this.postRequest('api/common/upload', formdata)
      if (data.code == 0) {
        let msg = data.msg
        Toast.fail(msg)
      } else {
        let msg = data.msg
        this.url = data.data.url
        console.log(this.url);
        Toast.success(msg)
      }

    },
    async confirmImage() {       // 保存数据
      let obj = {}
      obj.avatar = this.url
      obj.nickname = this.myUserInfo.nickname
      obj.gender = this.myUserInfo.gender
      obj.birthday = this.myUserInfo.birthday
      try {
        const { data } = await this.postRequest("api/user/profile", obj);
        if (data.code == 1) {
          Toast.success("保存成功");
          setTimeout(() => {
            this.$router.push('/user')
          }, 1700);
        }
      } catch (err) {
        Toast.fail(err.msg);
      }
    },
    girlClick() {
      if (this.boyCheck) {

        this.boyCheck = !this.boyCheck
        this.girlCheck = !this.girlCheck
        this.myUserInfo.gender = 0
      } else {


        this.girlCheck = !this.girlCheck
        this.boyCheck = !this.boyCheck
        this.myUserInfo.gender = 1


      }
    },
    boyClick() {
      if (this.girlCheck) {
        this.boyCheck = !this.boyCheck
        this.girlCheck = !this.girlCheck
        this.myUserInfo.gender = 1
      } else {
        this.boyCheck = !this.boyCheck
        this.girlCheck = !this.girlCheck
        this.myUserInfo.gender = 0


      }
    },
  }
};
</script>

<style scoped lang='less'>
.container {
  // background-color: #f9f9f9;
  width: 100%;
  height: 100%;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .information {
    padding: 60px 20px 20px;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    margin-bottom: 100px;
    .pet_name {
      width: 80px;
      line-height: 50px;
      padding-left: 20px;
      box-sizing: border-box;
      font-size: 15px;
      display: flex;
    }

    input {
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      text-indent: 10px;
      border-style: none;
    }
    .n_name {
      display: flex;
      align-items: center;
      height: 60px;
      border-bottom: 1px solid #eeeeee;
      .pet_name {
        padding-left: 0;
        box-sizing: border-box;
        span {
          color: red;
          padding-right: 2px;
          box-sizing: border-box;
        }
      }
    }
    .n_gender {
      .chag {
        width: 100%;
        display: flex;
        align-items: center;
        padding-left: 10px;
        box-sizing: border-box;
        .gender_1 {
          display: flex;
          align-items: center;
          .icon_img {
            width: 16px;
            height: 16px;
            img {
              width: 100%;
            }
          }
          .nam {
            font-size: 14px;
            margin-left: 10px;
          }
        }
        .gender_0 {
          display: flex;
          align-items: center;
          margin-left: 20px;
          .icon_img {
            width: 16px;
            height: 16px;
            img {
              width: 100%;
            }
          }
          .nam {
            font-size: 14px;
            margin-left: 10px;
          }
        }
      }
    }
    .n_password {
      display: flex;
      flex-direction: column;
      align-self: start;
      .small_ti {
        color: #a4afb7;
        font-size: 11px;
        line-height: 24px;
      }
      .password {
        justify-content: space-between;
        span {
          display: block;
          width: 60px;
          text-align: center;
          font-size: 15px;
          color: #416fae;
        }
      }
    }
    .n_head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-self: start;
      // margin-bottom: 30px;
      padding-bottom: 80px;
      box-sizing: border-box;
      .head {
        width: 160px;
        line-height: 40px;

        box-sizing: border-box;
        font-size: 15px;
      }
      .a-card {
        // padding-left: 100px;
        margin: 0 auto;
        box-sizing: border-box;
      }
      .n_readonly {
        display: flex;
        padding-left: 20px;
        box-sizing: border-box;
        span {
          display: block;
          color: red;
        }
        p {
          color: #ccc;
          font-size: 12px;
        }
      }
    }
  }
  .n_btn {
    width: 100%;
    padding: 5px 20px 5px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
  }
}
</style>