<template>
  <div class="container">
    <van-nav-bar title="订单详情" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="orderdetails" :data="OrderDetails">
      <div class="orders" v-for="(item ,index ) in  OrderDetails" :key="index">
        <div class="order_num">
          <span>订单号:</span>
          <span>{{item.num}}</span>
        </div>
        <div class="order_rig">
          <div class="order_img">
            <img :src="item.image" alt />
            <div class="pos">
              <div class="flash_sale" v-if="item.reduced_price > 0">
                <div class="sale">
                  <span>限时特惠</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order_cont">
            <p>{{item.goods_name}}</p>
            <p>
              下单时间
              <span>{{item.createtime}}</span>
            </p>
          </div>
        </div>
        <div class="pay_way">
          <div class="left_cate"></div>
          <div class="right_">
            <div class="pt">
              <span v-if="item.reduced_price !='免费' " class="span">￥</span>
              <span class="money money2">{{item.reduced_price == 0?item.price :item.reduced_price}}</span>
            </div>
            <del v-if="item.reduced_price  != 0">{{item.price == '免费'? '':'￥'+item.price }}</del>
          </div>
        </div>
        <div class="prompt" v-if="item.newupdatetime">
          <span>*</span>
          <span>{{item.newupdatetime}}</span>
          <span>更新</span>
        </div>
      </div>
      <div class="pay_">
        <div class="store_total public">
          <p>
            共
            <span>{{order.goods_num ? order.goods_num :0}}</span> 件商品
          </p>
          <div class="pt">
            <span class="pt_1" v-if="order.price >0">￥</span>
            <span class="pt_2">{{order.price? order.price :0}}</span>
          </div>
        </div>
        <div class="store_discount public">
          <p>折扣</p>
          <del class="del_l">
            <span class="del_icon">￥</span>
            <span class="del_span">{{order.coupons_price ? order.coupons_price :0}}</span>
          </del>
        </div>
        <div class="pay_total public">
          <p class="p_total">合计</p>
          <div class="heji">
            <span class="icon_heji" v-if="order.pay_total >0">￥</span>
            <span class="heji_money">{{order.pay_total?order.pay_total :0}}</span>
          </div>
        </div>
        <van-button
          color="linear-gradient(to right, #416FAE, #27508C)"
          size="large"
          @click="gotoPay"
          round
        >付款</van-button>
        <!-- <van-button color="linear-gradient(to right, #416FAE, #27508C)" size="large" round>评价</van-button>
        <van-button color="linear-gradient(to right, #416FAE, #27508C)" size="large" round>查看更新</van-button>-->
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant';
export default {
  name: "orderDetails",
  data() {
    return {
      OrderDetails: [],
      order_id: '',
      order: {},
    }
  },
  created() {
    let tem_id = this.$route.query
    this.order_id = tem_id.order_id || ''
    console.log(tem_id);
    this.getOrderDetails()
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    async getOrderDetails() {
      const { data: { data } } = await this.postRequest("api/order/orderInfo", { order_id: this.order_id })
      this.OrderDetails = data.list;
      this.order = data,
        this.pay_type = data.pay_type
      console.log(data, this.pay_type);

    },
    gotoPay() {
      if (this.pay_type == "wechat") {
        this.getSubmitPage()
        console.log(232);
      } else if (this.pay_type == "alipay") {
        this.alipayZFB()
        console.log(231);
      } else {
        // 无余额支付
      }
    },
    async alipayZFB() {   // 支付宝支付
      console.log(22);
      const { data } = await this.postRequest(
        "api/order/orderPay", { order_id: this.order_id }
      )
      console.log(data);
      if (data.code == 1) {
        var { href } = this.$router.resolve({
          path: '/newpage',
          query: {
            htmls: data.result
          }
        });
        window.location.replace(href);
      }

    },
    async getSubmitPage() {  // 微信支付
      const { data: { data } } = await this.postRequest(
        "api/order/orderPay", { order_id: this.order_id }
      );
      let url = data.mweb_url
      window.location.replace(url);

    },
  }
};
</script>

<style scoped lang='less'>
.container {
  height: 100%;
  background-color: #f5f5f5;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .orderdetails {
    width: 100%;
    padding: 60px 16px 16px;
    box-sizing: border-box;
    .orders {
      background-color: #fff;
      border-radius: 8px;
      margin: 8px 0;
      padding: 16px 16px;
      box-sizing: border-box;

      .order_num {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        box-sizing: border-box;
        span {
          color: #666666;
          font-size: 12px;
        }
      }
      .order_rig {
        display: flex;
        .order_img {
          width: 115px;
          height: 71px;
          position: relative;
          img {
            width: 100%;
            border-radius: 6px;
          }
          .pos {
            position: absolute;
            top: 0;
            left: 0;
            // 限时优惠
            .flash_sale {
              top: 0;
              left: 0;
              width: 0;
              height: 0;
              border-top: 32px solid #ff0000;
              border-right: 32px solid transparent;
              border-bottom: 32px solid transparent;
              border-left: 32px solid #ff0000;
              position: relative;
              .sale {
                width: 40px;
                font-weight: bold;
                font-family: 迷你简菱心;
                line-height: 15px;
                color: #fff;
                font-size: 14px;
                position: absolute;
                top: -32px;
                left: -28px;
                transform: rotate(-45deg);
              }
            }
          }
        }
        .order_cont {
          flex: 1;
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          p {
            color: #666666;
            font-size: 16px;
          }
          p:nth-child(2) {
            color: #999999;
            font-size: 12px;
            line-height: 30px;
          }
        }
      }
      .pay_way {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        box-sizing: border-box;
        .left_cate {
          display: flex;
          align-items: center;
          p {
            font-size: 12px;
            color: #fff;
            margin-right: 15px;
          }
        }
        .right_ {
          display: flex;
          align-items: center;
          p {
            font-size: 18px;
            color: #ff0000;
            font-weight: 500;
            span {
              color: #ff0000;
              font-weight: 500;
              font-size: 6px;
            }
          }
          del {
            margin-left: 10px;
            color: #999999;
            font-size: 10px;
          }
        }
      }
      .prompt {
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        span {
          color: #999999;
          font-size: 12px;
          line-height: 30px;
          margin: 0 3px;
        }
        span:nth-child(1) {
          color: #ff0000;
        }
      }
    }
    .pay_ {
      padding: 16px;
      box-sizing: border-box;
      width: 100%;
      position: fixed;
      bottom: 0px;
      right: 0;
      background-color: #fff;

      .public {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          color: #666666;
          font-size: 14px;
          line-height: 30px;
        }
      }
      .store_total {
        .pt {
          .pt_1 {
            font-size: 8px;
            color: #666666;
          }
          .pt_2 {
            font-size: 16px;
            color: #666666;
          }
        }
      }
      .store_discount {
        .del_l {
          .del_icon {
            font-size: 6px;
            color: #666666;
          }
          .del_span {
            font-size: 16px;
            color: #666666;
          }
        }
      }
      .pay_total {
        margin-bottom: 20px;
        .p_total {
          color: #2c2c2c;
          font-size: 16px;
          font-weight: 600;
        }
        .heji {
          .icon_heji {
            font-size: 8px;
            color: #ff0000;
          }
          .heji_money {
            font-size: 16px;
            color: #ff0000;
          }
        }
      }
    }
  }
}
</style>