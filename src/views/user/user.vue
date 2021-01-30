<template>
  <div class="container">
    <van-nav-bar title="个人中心" class="fixedtop" />
    <div class="personal">
      <div class="left_name_top">
        <div class="header">
          <div class="head">
            <img :src="avatar" v-if="avatar != ''" alt />
            <img src="@/assets/img/head.png" v-else alt />
          </div>
          <p>{{ userInfo.nickname }}</p>
        </div>
        <!-- 奖章medal  -->
        <div class="medal">
          <img :src="vip_logo != '' ? vip_logo : viplogo" alt />
          <p>{{ level_name != "" ? level_name : "普通会员" }}</p>
          <img src="@/assets/img/icon_20@2x.png" @click="ondislogicon" alt />
        </div>
        <!--  余额和优惠券 -->
        <div class="coupon_sum">
          <div class="coupon" @click="goToCoupon">
            <span>优惠券：</span>
            <span>{{ ticket_num == 0 ? "0" : ticket_num }}</span>
          </div>
          <div class="sum">
            <span>余额：</span>
            <span>{{ money == 0 ? "0" : money }}</span>
          </div>
        </div>
      </div>
      <!-- 列表信息 -->
      <div class="list_">
        <div class="list_1" @click="account">
          <img src="@/assets/img/icon_25@2x.png" alt />
          <div class="content_">
            <span>账户信息</span>
          </div>
          <img src="@/assets/img/zhuanxiang_icon@2x.png" alt />
        </div>
        <div class="list_1" @click="order">
          <img src="@/assets/img/icon_24@2x.png" alt />
          <div class="content_">
            <span>我的订单</span>
          </div>
          <img src="@/assets/img/zhuanxiang_icon@2x.png" alt />
        </div>
        <div class="list_1" @click="collect">
          <img src="@/assets/img/icon_23@2x.png" alt />
          <div class="content_">
            <span>我的收藏</span>
          </div>
          <img src="@/assets/img/zhuanxiang_icon@2x.png" alt />
        </div>
        <div class="list_1" @click="cart">
          <img src="@/assets/img/icon_22@2x.png" alt />
          <div class="content_">
            <span>我的购物车</span>
          </div>
          <img src="@/assets/img/zhuanxiang_icon@2x.png" alt />
        </div>
        <div class="list_1" @click="Nopublic">
          <img src="@/assets/img/icon_21@2x.png" alt />
          <div class="content_">
            <span>公众号</span>
          </div>
          <img src="@/assets/img/zhuanxiang_icon@2x.png" alt />
        </div>
        <div class="list_1" @click="logoout">
          <img src="@/assets/img/loginout.png" alt />
          <div class="content_">
            <span>登出</span>
          </div>
          <img src="@/assets/img/zhuanxiang_icon@2x.png" alt />
        </div>
      </div>
      <!--小智 -->
      <div class="top_six" @click.stop="goToAsh">
        <div class="ash">
          <div class="ash_ash">
            <img src="@/assets/img/icon_07@2x.png" alt />
          </div>
        </div>
      </div>
      <div
        class="popdowlist"
        @click.stop="ondislogicon"
        v-if="dislogicon"
      ></div>
      <div class="popdown" v-if="dislogicon">
        <div class="is">
          <div class="text">{{ RightCenter }}</div>
          <div class="btm">
            <button class="btm_button" @click.stop="ondislogicon">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Toast, Dialog } from 'vant';
export default {
  // 我的个人信息
  name: "user",
  data() {
    return {
      userInfo: {},
      money: '',
      avatar: '',
      vip_logo: '',
      level_name: '',
      ticket_num: '',
      viplogo: require('@/assets/img/icon_04@2x.png'),
      VIPlist: [],
      RightCenter: '',
      dislogicon: false
    };
  },
  created() {
    let token = JSON.parse(window.localStorage.getItem('kou_token'))
    console.log(token);
    if (token) {
      this.getUserInfo();
    } else {
      Dialog.confirm({
        title: '温馨提示',
        message: '您尚未登陆，请先登录',
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          Toast('登录后才可访问')
        })
    }

  },
  methods: {
    async getUserInfo() {
      try {
        const {
          data: { data }
        } = await this.postRequest("api/user/getUserInfo");
        this.userInfo = data;
        this.avatar = data.avatar
        this.money = data.money
        this.vip_logo = data.vip_logo
        this.level_name = data.level_name
        this.ticket_num = data.ticket_num
        this.getVIP()
      } catch (err) {
        Toast.fail(err.msg)
      }
    },
    goToCoupon() {    // 点击优惠券 
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        this.$router.push("/coupon");
      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '您尚未登陆，请先登录',
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            Toast('登录后才可访问')
          });
      }

    },
    account() {   // 点击我的账户
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        this.$router.push("/basicInformation");
      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '您尚未登陆，请先登录',
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            Toast('登录后才可访问')
          });
      }

    },
    // 跳转到我的订单
    order() {
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token != null) {
        this.$router.push({ path: "/myorder", query: { status: 0 } })
      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '您尚未登陆，请先登录',
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            Toast('登录后才可访问')
          });
      }

    },
    // 跳转到我的收藏
    collect() {
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        this.$router.push("/mycollect");
      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '您尚未登陆，请先登录',
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            Toast('登录后才可访问')
          });
      }

    },
    // 跳转到我的购物车
    cart() {
      this.$router.push("/cart");
    },
    Nopublic() {
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        this.$router.push("/Nopublic");
      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '您尚未登陆，请先登录',
        })
          .then(() => {
            this.$router.push("/login");
          })
          .catch(() => {
            Toast('登录后才可访问')
          });
      }


    },
    logoout() {
      let token = JSON.parse(localStorage.getItem('kou_token'))
      if (token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '确认要登出吗？',
        })
          .then(() => {
            this.logoout2()
          })
          .catch(() => {
          })
      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '您已退出登录！是否要登录',
        })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {
          })
      }



    },
    logoout2() {
      try {
        this.getRequest("api/user/logout").then(res => {
          if (res.code == 1) {
            Toast.success(res.msg)
            localStorage.removeItem('kou_token');
            this.$router.push('/login')
          } else {
            Toast.fail(res.data.msg)
          }

        });
      } catch (err) {
        Toast.fail(err.msg)
      }
    },
    goToAsh() {
      this.$router.push('/emptyCart')
    },
    async getVIP() {
      try {
        const {
          data: { data }
        } = await this.postRequest("api/user/getUserSystem")
        this.VIPlist = data
        console.log(data);
        data.forEach(item => {
          if (item.name == this.level_name) {
            this.RightCenter = item.describe
          }
        });
        console.log(this.RightCenter);
      } catch (err) {
        Toast.fail(err.msg)
      }
    },
    ondislogicon() {
      this.dislogicon = !this.dislogicon
    },
  }
};
</script>    
<style scoped lang='less'>
.container {
  min-height: 100%;
  width: 100%;
  position: relative;
  margin-bottom: 60px;
  // background-color: #cccfff;

  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .personal {
    width: 100%;
    padding-top: 80px;
    box-sizing: border-box;
    .left_name_top {
      padding: 20px 20px 0;
      box-sizing: border-box;
      .header {
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        .head {
          width: 96px;
          height: 96px;
          img {
            width: 100%;
            border-radius: 50%;
          }
        }
        p {
          padding: 10px 0 0;
          box-sizing: border-box;
          font-size: 16px;
        }
      }
      // 奖章
      .medal {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          color: #87b4e4;
          margin: 0 5px;
        }
        img {
          width: 11px;
          height: 14px;
        }
        img:nth-child(3) {
          width: 12px;
          height: 12px;
        }
      }
      // 优惠券 和 余额
      .coupon_sum {
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #fff;
        box-sizing: border-box;

        .coupon {
          flex: 1;
          display: flex;
          align-items: baseline;
          justify-content: center;
          border-right: 1px solid #ccc;

          span:nth-child(1) {
            font-size: 14px;
            color: #ccc;
          }
          span:nth-child(2) {
            margin-left: 4px;
            font-size: 14px;
            color: #ffa200;
            font-weight: bold;
          }
        }
        .sum {
          flex: 1;
          display: flex;
          align-items: baseline;
          justify-content: center;

          span:nth-child(1) {
            font-size: 14px;
            color: #ccc;
          }
          span:nth-child(2) {
            margin-left: 4px;
            font-size: 14px;
            color: #ff5823;
          }
        }
      }
    }

    // 列表信息
    .list_ {
      margin-top: 30px;
      padding-bottom: 50px;
      box-sizing: border-box;

      .list_1 {
        line-height: 50px;
        border-bottom: 1px solid #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        .content_ {
          flex: 1;
          padding-left: 20px;
          box-sizing: border-box;
        }
        img {
          width: 16px;
          height: 16px;
        }
        img:nth-child(3) {
          width: 8px;
          height: 12px;
        }
      }
    }
    // 小智
    .top_six {
      position: fixed;
      right: 5px;
      bottom: 80px;
      .ash {
        margin-top: 15px;
        .ash_ash {
          width: 48px;
          height: 48px;
          img {
            width: 48px;
            height: 48px;
          }
        }
      }
    }
    .popdowlist {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.7);
    }
    .popdown {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 16px;
      box-sizing: border-box;

      .is {
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        border-radius: 12px;

        .text {
          width: 100%;
          font-size: 16px;
        }
        .btm {
          width: 100%;
          padding-top: 20px;
          box-sizing: border-box;
          text-align: center;
          .btm_button {
            width: 80%;
            height: 44px;
            background: linear-gradient(to right, #416fae, #27508c);
            color: #fff;
            padding: 0;
            font-weight: 400;
            text-align: center;
            border-radius: 8px;
            border: none;
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>