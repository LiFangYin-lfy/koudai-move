<template>
  <div class="container">
    <van-nav-bar
      title="优惠券"
      left-arrow
      @click-left="goBackFn"
      class="fixedtop"
    />
    <div class="coupon_" v-if="couponList.length != 0">
      <div class="coupons" v-for="(item, index) in couponList" :key="index">
        <div class="left_img">
          <img src="../../assets/img/icon_34@2x.png" alt />
          <div class="left_cont">
            <p>
              <span class="span">￥</span>
              <span class="faceValue">{{ item.face_value }}</span>
            </p>
            <p v-if="item.type == 2">
              满 {{ item.full_reduction_value }} 元可用
            </p>
            <p v-if="item.type == 1 && item.type == 1">全场通用</p>
            <p v-if="item.goods_type == 2 && item.type == 1">部分商品可用</p>
          </div>
        </div>
        <div class="right_cont">
          <div class="top_cont">
            <div class="itemname two_text">{{ item.name }}</div>
            <div class="itemend_time">到期时间：{{ item.end_time }}</div>
          </div>
          <div class="down_cont">
            <van-button
              color="linear-gradient(to right, #416FAE, #27508C)"
              class="bens"
              size="small"
              round
              v-if="item.status != 3"
              @click="employ"
              >立即使用</van-button
            >
          </div>
          <img :src="item.image" v-if="item.image != ''" class="itemimg" alt />
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <img src="../../assets/img/empty.png" class="emptyimg" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: "coupon",
  data() {
    return {
      // 初始化优惠券
      couponList: [],
      reqParams: {
        page: 1
      }
    };
  },
  created() {
    this.getCoupon();
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    async getCoupon() {
      try {
        const {
          data: { data }
        } = await this.postRequest("api/user/coupons", this.reqParams);
        this.couponList = data.list;
        this.total = data.total
        console.log(data);
      } catch (err) {
        console.log(err);

      }


    },
    //  立即使用
    employ() {
      // 点击跳转至订单页面
      this.$router.push('/')
    }

  },


}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  min-height: 100%;
  background-color: #f5f5f5;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .coupon_ {
    width: 100%;
    padding: 60px 16px 16px;
    box-sizing: border-box;

    .coupons {
      margin: 20px 0;
      display: flex;
      .left_img {
        width: 125px;
        height: 107px;
        position: relative;
        img {
          width: 100%;
        }
        .left_cont {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          p {
            font-size: 37px;
            color: #fff;
            .span {
              font-size: 30px;
            }
            .faceValue {
              font-size: 48px;
            }
          }
          p:nth-child(2) {
            font-size: 12px;
            color: #fff;
          }
        }
      }
      .right_cont {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        padding: 8px;
        box-sizing: border-box;
        background-color: #fff;
        .top_cont {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .itemname {
            font-size: 16px;
            line-height: 20px;
          }
          .itemend_time {
            font-size: 14px;
            line-height: 20px;
            padding: 5px 0;
            box-sizing: border-box;
            color: #666666;
          }
          .all_platform {
            border: 1px solid #416fae;
            height: 16px;
            width: 50px;
            border-radius: 13px;
            line-height: 20px;
            text-align: center;
          }
        }
        .down_cont {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .bens {
            min-width: 112px;
          }
        }
        img {
          position: absolute;
          right: 0px;
          top: 0px;
          width: 36px;
          height: 36px;
        }
      }
    }
  }
  .empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 250px;
    box-sizing: border-box;
    .emptyimg {
      width: 100px;
      height: 100px;
    }
  }
}
</style>