<template>
  <div class="container">
    <van-nav-bar title="订单" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="my_orders">
      <div class="row_one">
        <img src="../../assets/img/icon_19@2x.png" alt />
        <p>订单提交成功！</p>
      </div>
      <div class="row_two">
        <div class="two_img">
          <p>距离二维码过期还剩</p>
          <van-count-down :time="time" format="ss" ref="countDown" @finish="finish" />
          <p>秒,过期后请刷新页面重新获取二维码。长按二维码保存</p>
        </div>
        <img :src="url" alt />
        <img src="../../assets/img/icon_49@2x.png" alt />
        <p>请使用微信扫一扫扫描二维码支付</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "submitOrder",
  data() {
    return {
      time: 60 * 1000,
      successImg: true,
      reqParams: {
        order_id: "",
        order_num: "",
        is_authorize_logo: ""
      },
      submitPage: {},
      url: "",
    };
  },
  mounted() {
    this.getSubmitPage();
    if (localStorage.getItem('orderId') == this.reqParams.order_id && localStorage.getItem('isTrue')) {
      // console.log(111);
    } else {
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      // token = token.split('"');
      // token = token[1];s
      this.url =
        "https://glaforteachers.com/api/order/orderPay/order_id" +
        "/" +
        this.reqParams.order_id +
        "/" +
        "token" +
        "/" +
        token;
      this.successImg = false
    }

  },
  methods: {

    goBackFn() {    // 回到上一步
      this.$router.go(-1);
    },
    finish() {
      Toast('二维码已失效');
      setTimeout(() => {
        // this.reset()
      }, 1300);
    },
    reset() { // 重置倒计时
      this.$refs.countDown.reset();
    },
    async getSubmitPage() {
      const routerParams = this.$route.query;
      this.reqParams.order_id = routerParams.order_id;
      this.reqParams.order_num = routerParams.order_num;
      const { data: { data } } = await this.postRequest(
        "api/order/orderPay",
        this.reqParams
      );
      // window.location.replace(url);
      console.log(data);
      let url = data.mweb_url
      console.log(url);
      window.location.replace(url);
      console.log(this.reqParams.order_id);
    },
    async getcheckOrder() {
      var t = this;
      const { data: { data } } = await this.$http.post(
        "api/order/checkOrder", { order_num: this.reqParams.order_num }
      );
      console.log(data);

      if (data == true) {
        this.successImg = !this.successImg
        localStorage.setItem('isTrue', true)
        localStorage.setItem('orderId', t.reqParams.order_id)
        clearInterval(this.timer);
        setTimeout(function () {
          t.$router.push('/order')
        }, 400)
      }
      console.log(data);

    }
  }
};
</script>

<style lang="less" scoped>
.container {
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .my_orders {
    width: 100%;
    padding: 76px 16px 16px;
    box-sizing: border-box;

    .row_one {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
      img {
        width: 88px;
        height: 88px;
      }
      p {
        margin-top: 20px;
        color: #2c2c2c;
        font-size: 16px;
        line-height: 42px;
        font-weight: 600;
      }
    }
    .row_two {
      padding: 16px;
      box-sizing: border-box;
      background-color: #f4f5f9;
      border-radius: 6px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .two_img {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 200px;
        p {
          color: #666666;
          line-height: 24px;
          font-size: 14px;
          text-align: center;
        }
      }
      img {
        width: 184px;
        height: 184px;
      }
      img:nth-child(3) {
        width: 126px;
        height: 155px;
        margin-top: 30px;
      }
      p:nth-child(4) {
        margin: 30px 0;
        font-size: 16px;
        line-height: 32px;
        color: #666666;
      }
    }
  }
}
</style>
