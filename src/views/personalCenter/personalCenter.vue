<template>
  <div class="container">
    <van-nav-bar title="个人中心" left-arrow class="fixedtop" />
    <!-- <div class="left_name_top" :data="userInfo"> -->
    <div class="left_name_top">
      <div class="header">
        <div class="head">
          <!-- <img :src="userInfo.vip_logo" alt /> -->
          <img src="../../assets/img/NoPath -(247)@2x.png" alt />
        </div>
        <!-- <p>{{userInfo.nickname}}</p> -->
        <p>张小北</p>
      </div>
      <!-- 奖章medal  -->
      <div class="medal">
        <!-- <p>{{userInfo.level_name}}</p> -->
        <img src="../../assets/img/icon_21@2x.png" alt />
        <p>普通</p>
        <img src="../../assets/img/icon_20@2x.png" alt />
      </div>
      <!--  余额和优惠券 -->
      <div class="coupon_sum">
        <div class="coupon" @click="goToCoupon">
          <span>优惠券</span>
          <!-- <span>{{userInfo.level}}</span> -->
          <span>3</span>
        </div>
        <div class="sum">
          <span>余额</span>
          <span>222</span>
          <!-- <span>{{userInfo.money}}</span> -->
        </div>
      </div>
    </div>
    <!-- 列表信息 -->
    <div class="list_">
      <div class="list_1">
        <img src="../../assets/img/icon_25@2x.png" alt />
        <div class="content_">
          <span>账户信息</span>
        </div>
        <img src="../../assets/img/zhuanxiang_icon@2x.png" alt />
      </div>
      <div class="list_1" @click="order">
        <img src="../../assets/img/icon_24@2x.png" alt />
        <div class="content_">
          <span>我的订单</span>
        </div>
        <img src="../../assets/img/zhuanxiang_icon@2x.png" alt />
      </div>
      <div class="list_1" @click="collect">
        <img src="../../assets/img/icon_23@2x.png" alt />
        <div class="content_">
          <span>我的收藏</span>
        </div>
        <img src="../../assets/img/zhuanxiang_icon@2x.png" alt />
      </div>
      <div class="list_1" @click="cart">
        <img src="../../assets/img/icon_22@2x.png" alt />
        <div class="content_">
          <span>我的购物车</span>
        </div>
        <img src="../../assets/img/zhuanxiang_icon@2x.png" alt />
      </div>
      <div class="list_1">
        <img src="../../assets/img/icon_21@2x.png" alt />
        <div class="content_">
          <span>公共号</span>
        </div>
        <img src="../../assets/img/zhuanxiang_icon@2x.png" alt />
      </div>
    </div>
    <!--小智 -->
    <div class="top_six" @click.stop="goToAsh">
      <div class="ash">
        <div class="ash_ash">
          <img src="../../assets/img/icon_07@2x.png" alt />
        </div>
        <!-- <div class="dialogue" v-if="up">
          <div class="dialogue_top_box">
            <div class="top_dialogue">
              <img src="../../assets/image/pic_ai.png" alt />
              <span>智能客服</span>
              <span>知识渊博的之鞥问答机器人</span>
            </div>
            <div class="left_per_i">
              <div class="head_icon">
                <img src="../../assets/image/pic——aihead.png" alt />
              </div>
              <div class="chat_per_txt">
                <p>借IBM银行智能客服工具,打造全天候个性化银行服务,仅需少量人工客服成本便可实现.即刻登录IBM官方网站,探索数字时代下的人性化服务借IBM银行智能客服工具,打造全天候个性化银行服务,仅需少量人工客服成本便可实现.即刻登录IBM官方网站,探索数字时代下的人性化服务借IBM银行智能客服工具,打造全天候个性化银行服务,仅需少量人工客服成本便可实现.即刻登录IBM官方网站,探索数字时代下的人性化服务借IBM银行智能客服工具,打造全天候个性化银行服务,仅需少量人工客服成本便可实现.即刻登录IBM官方网站,探索数字时代下的人性化服务借IBM银行智能客服工具,打造全天候个性化银行服务,仅需少量人工客服成本便可实现.即刻登录IBM官方网站,探索数字时代下的人性化服务</p>
              </div>
            </div>
          </div>
          <div class="updown clearfix">
            <div class="reply_box left">
              <img src="../../assets/image/look.png" alt />
              <img src="../../assets/image/edit.png" alt />
            </div>
            <div class="reply_txt left">
              <input type="text" placeholder="写回复" />
            </div>
            <div class="right_per_i right">
              <img src="../../assets/image/fly5396.png" alt />
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>
 
<script>
// import local from "@/utils/local";
export default {
  // 我的个人信息
  name: 'personalCenter',
  data() {
    return {
      userInfo: "",
      //   headers: {
      //     Authorization: `Bearer ${local.getUser().token}`
      //   }
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const {
        data: { data }
      } = await this.$http.post("api/user/getUserInfo");
      this.userInfo = data;
      // console.log(data);
    },
    // 点击优惠券
    goToCoupon() {
      this.$router.push("/coupon");
    },
    // 点击我的账户
    account() {
      // 跳转到基本信息页面
      this.$router.push("/information");
    },
    // 跳转到我的订单
    order() {
      this.$router.push("/order");
    },
    // 跳转到我的收藏
    collect() {
      this.$router.push("/collect");
    },
    // 跳转到我的购物车
    cart() {
      this.$router.push("/cart");
    },
    goToAsh() {
      this.$router.push('/emptyCart')
    },
  }
};
</script>    
<style scoped lang='less'>
.container {
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  // 左侧部分

  .left_name_top {
    padding: 60px 20px 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #f5f5f5;
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
        }
      }
      p {
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
      .coupon {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-right: 1px solid #ccc;
        span:nth-child(1) {
          font-size: 14px;
          color: #ccc;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #ffa200;
          font-weight: bold;
        }
      }
      .sum {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        span:nth-child(1) {
          font-size: 14px;
          color: #ccc;
        }
        span:nth-child(2) {
          font-size: 16px;
          color: #ff5823;
        }
      }
    }
  }

  // 列表信息
  .list_ {
    margin-top: 30px;

    .list_1 {
      line-height: 50px;
      border-bottom: 1px solid #f5f5f5;
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
    right: 20px;
    bottom: 60px;
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

      // ---------------------------------------------------------
      //  智能客服对话框
      // .dialogue {
      //   width: 704px;
      //   height: 655px;
      //   position: absolute;
      //   right: 70px;
      //   bottom: 50px;
      //   background-color: #fbf8fb;
      //   z-index: 5000;
      //   .dialogue_top_box {
      //     background-color: #fff;
      //     height: 600px;
      //     .top_dialogue {
      //       width: 704px;
      //       height: 60px;
      //       line-height: 60px;
      //       // border: 1px solid #ccc;

      //       background-color: #416fae;
      //       position: relative;
      //       img {
      //         position: absolute;
      //         bottom: 0;
      //         left: 0;
      //       }
      //       span:nth-child(2) {
      //         color: #fff;
      //         font-size: 34px;
      //         margin-left: 150px;
      //       }
      //       span:nth-child(3) {
      //         color: #fff;
      //         margin-left: 10px;
      //       }
      //     }
      //     .left_per_i {
      //       position: relative;
      //       height: 486px;
      //       .head_icon {
      //         position: relative;
      //         img {
      //           position: absolute;
      //           left: 20px;
      //           top: 20px;
      //         }
      //       }
      //       .chat_per_txt {
      //         width: 376px;
      //         height: 192px;
      //         padding: 16px;
      //         box-sizing: border-box;
      //         background-color: #edf0fa;
      //         position: absolute;
      //         left: 114px;
      //         top: 50px;
      //         p {
      //           line-height: 16px;
      //           height: 161px;
      //           font-size: 14px;
      //           color: #2c2c2c;
      //           overflow: hidden;
      //           // text-overflow: ellipsis;
      //           display: -webkit-box;
      //           -webkit-box-orient: vertical;
      //           -webkit-line-clamp: 10;
      //         }
      //       }
      //     }
      //   }

      //   .updown {
      //     background-color: #fff;
      //     margin-top: 5px;
      //     height: 50px;
      //     width: 100%;
      //     .reply_box {
      //       height: 50px;
      //       width: 90px;

      //       img {
      //         margin: 10px 10px;
      //       }
      //     }
      //     .reply_txt {
      //       input {
      //         float: left;
      //         outline: none;
      //         display: block;
      //         height: 50px;
      //         border-style: none;
      //         width: 560px;
      //       }
      //     }
      //   }
      // }
    }
  }
}
</style>