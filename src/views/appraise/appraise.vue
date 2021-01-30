<template>
  <div class="container">
    <van-nav-bar title="评价" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="orders">
      <div class="order_rig">
        <div class="order_img">
          <img :src="appraiseList.image" alt />
          <div class="pos">
            <div class="flash_sale" v-if="appraiseList.reduced_price > 0">
              <div class="sale">
                <span>限时特惠</span>
              </div>
            </div>
          </div>
        </div>
        <div class="order_cont">
          <p class="t_text">{{appraiseList.name}}</p>
          <div class="pay_way">
            <div class="pt">
              <span class="span">￥</span>
              <span class="money">{{appraiseList.price}}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="raise">
        <div class="raise_title">
          <p>商品评分</p>
        </div>
        <div>
          <van-rate
            v-model="value"
            allow-half
            :size="25"
            color="#FFC568"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="raise_title">
          <p>评价</p>
        </div>
        <div class="messagecolor">
          <van-field
            v-model="message"
            rows="4"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="分享使用心得,给想买的人一个参考"
            show-word-limit
          />
        </div>
      </div>
    </div>
    <div class="n_btn" @click="publish">
      <van-button color="linear-gradient(to right, #416FAE, #27508C)" round size="large">发表</van-button>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  name: "appraise",
  data() {
    return {
      value: 0,
      message: "",
      appraiseList: {},
      reqParams: {
        score: "", // 评价分数
        content: "", // 评价内容
        goods_id: "", // 商品id
        order_id: "" // 订单id
      }
    };
  },
  created() {
    this.getAppraise()
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    async getAppraise() {
      let item_id = this.$route.query
      this.reqParams.goods_id = item_id.goods_id || ''
      this.reqParams.order_id = item_id.order_id || ''
      const {
        data: { data }
      } = await this.postRequest("api/goods/goodsInfo", { goods_id: item_id.goods_id });
      this.appraiseList = data;
    },
    // 点击发表
    async publish() {
      this.reqParams.score = this.value
      this.reqParams.content = this.message
      const { data } = await this.postRequest("api/evaluate/addEvaluate", this.reqParams)
      // console.log(data);
      if (data.code == 1) {
        Toast.success('发布成功')
        setTimeout(() => {
          this.$router.push({ path: '/myorder', query: { status: 3 } })
        }, 2000);
      } else {
        let msg = data.msg
        Toast.fail(msg)
      }
    }
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
  .orders {
    padding: 64px 12px 12px 12px;
    box-sizing: border-box;
    // background-color: #f5f5f5;
    .order_rig {
      // background-color: #fff;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      border-radius: 8px;
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
            border-radius: 6px 6px 0 0;
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
        justify-content: center;
        p {
          color: #666666;
          font-size: 16px;
        }
        .pay_way {
          margin-top: 30px;
          display: flex;
          align-self: flex-end;
          flex-direction: column;
          p {
            color: #ff0000;
            line-height: 30px;
            font-weight: 600;
          }
        }
      }
    }
    .raise {
      margin-top: 20px;
      padding: 0 20px 20px;
      box-sizing: border-box;
      background-color: #fff;
      .raise_title {
        p {
          font-size: 16px;
          font-weight: 600;
          color: #3d444d;
          line-height: 60px;
        }
      }
    }
  }
  .n_btn {
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    position: fixed;
    bottom: 0px;
    left: 0px;
    background-color: #fff;
  }
}
</style>