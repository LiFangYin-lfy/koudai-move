<template>
  <div class="container">
    <div class="redbao" :data="pluginList">
      <div class="bos">
        <div class="redpub">
          <span class="span1 two_text">{{pluginList.name}}</span>
        </div>
        <div class="redpub_content">
          <div class="ps">
            <span class="icon_1">￥</span>
            <span class="icon_2">{{pluginList.face_value}}</span>
          </div>
        </div>
        <div class="manjian">
          <span class="span2" v-if="pluginList.type ==2 ">满 {{pluginList.full_reduction_value}} 可用</span>
          <span class="span2" v-if="pluginList.type ==1">全场通用</span>
        </div>
      </div>
      <div class="receive_buttom">
        <van-button
          round
          size="large"
          color="linear-gradient(to right, #FBCB38, #FEE622)"
          @click="reseveRed"
        >领取优惠券</van-button>
      </div>
      <div class="button_text">
        <span class="span3">卡券可访问“个人中心>优惠券”查看</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
export default {
  name: 'pluginred',
  data() {
    return {
      pluginList: {},
      coupons_id: '',
      user_coupons_id: '',
    }
  },
  created() {
    let routeParams = this.$route.query
    this.coupons_id = routeParams.coupons_id
    this.user_coupons_id = routeParams.user_coupons_id || ''
    console.log(routeParams, "routeParams");
    let token = window.localStorage.getItem('kou_token')
    if (token) {
      this.getCoupon();
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
    async getCoupon() {
      try {
        const { data: { data } } = await this.postRequest('api/coupons/getCouponsInfo', { coupons_id: this.coupons_id })
        console.log(data);
        this.pluginList = data
      } catch (err) {
        console.log(err);
        Toast.fail(err.msg)
      }

    },
    async reseveRed() {
      let obj = {}
      if (this.user_coupons_id != '') {
        obj.user_coupons_id = this.user_coupons_id
        obj.coupons_id = this.coupons_id
      } else {
        obj.coupons_id = this.coupons_id
      }
      try {
        const { data } = await this.postRequest('api/coupons/getCoupons', obj)
        console.log(data);
        Toast.success(data.msg)
        setTimeout(() => {
          this.$router.push("/coupon");
        }, 1500);
      } catch (err) {
        console.log(err);
        Toast.fail(err.msg)
      }

    },

  },

}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  min-height: 100%;
  background-color: #f7d12e;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-image: url("../../assets/img/redbao.png") no-repeat;

  .redbao {
    width: 100%;
    background: linear-gradient(359deg, #fb2d28 1%, #fd4e45 99%);
    box-shadow: 0px 8px 24px 0px rgba(251, 46, 41, 0.38);
    border-radius: 24px;
    padding: 20px;
    box-sizing: border-box;
    .bos {
      width: 100%;
      background-color: #fff;
      border-radius: 16px;
      padding: 20px;
      box-sizing: border-box;
      .redpub {
        width: 100%;
        .span1 {
          font-size: 18px;
          color: #2c2c2c;
          line-height: 26px;
        }
      }
      .redpub_content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        .ps {
          display: flex;
          align-items: baseline;
          .icon_1 {
            font-size: 30px;
            font-weight: bold;
            color: #f54e46;
          }
          .icon_2 {
            font-size: 54px;
            font-weight: bold;
            color: #f54e46;
          }
        }
      }
      .manjian {
        width: 100%;
        padding: 0px 0 20px;
        box-sizing: border-box;
        text-align: center;
        .span2 {
          font-size: 16px;
          color: #f54e46;
          line-height: 20px;
        }
      }
      .phop {
        width: 100%;
        padding: 15px 0 0;
        box-sizing: border-box;
        text-align: center;
        border-top: dashed 1px #ccc;
        .span4 {
          color: #ccc;
          font-size: 20px;
        }
      }
    }
    .receive_buttom {
      width: 100%;
      font-size: 20px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;

      margin-top: 20px;
    }
    .button_text {
      width: 100%;
      text-align: center;
      color: #fc8280;
      font-family: PingFang SC, PingFang SC-Medium;
      padding: 16px 0;
      box-sizing: border-box;
    }
  }
}
</style>