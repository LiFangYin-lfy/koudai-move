<template>
  <div class="container">
    <van-nav-bar
      title="我的订单"
      left-arrow
      class="fixedtop"
      @click-left="goBackFn"
    />
    <div class="toporder">
      <van-search
        v-model="value"
        shape="round"
        @search="onSearch"
        class="van_search"
        placeholder="请输入要搜索的关键词"
      />
      <div class="change_status" :data="OrderList">
        <van-tabs v-model="active" swipeable @click="titleIndex">
          <van-tab v-for="index in list" :title="index" :key="index"></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="list_order">
      <div
        class="orders"
        v-for="(items, index1) in OrderList"
        :key="index1"
        @click.stop="goOrderDetails(items)"
      >
        <div class="order_num">
          <div class="left_num">
            <span>订单号:</span>
            <span>{{ items.num }}</span>
          </div>
          <div class="pay_status">{{ items.status_name }}</div>
        </div>
        <div class="order_rig">
          <div class="order_img">
            <img :src="items.image" alt />
            <div class="pos">
              <div class="flash_sale" v-if="items.reduced_price > 0">
                <div class="sale">
                  <span>限时特惠</span>
                </div>
              </div>
            </div>
          </div>
          <div class="order_cont">
            <p class="t_text">{{ items.goods_name }}</p>
            <p>
              下单时间：
              <span class="soan">{{ items.createtime }}</span>
            </p>
          </div>
        </div>
        <div class="pay_way">
          <div class="stategeng">
            <div class="update_npo" v-if="items.newupdatetime != ''">
              <span class="span1">*</span>
              <span class="span2">{{ items.newupdatetime }}</span>
              <span class="span2">更新</span>
            </div>
          </div>
          <div class="pt pt2">
            <span class="span" v-if="items.pay_total > 0">￥</span>
            <span class="money">{{ items.pay_total }}</span>
          </div>
        </div>
        <div class="bott">
          <van-button
            v-if="looked == 0 && items.status_name == '待评价'"
            round
            style="min-width: 90px"
            color="linear-gradient(to right, #416FAE, #27508C)"
            size="small"
            class="vanbtn"
            @click.stop="goclickdown(items)"
            >下载</van-button
          >
          <van-button
            round
            style="min-width: 90px; margin-left: 10px"
            color="linear-gradient(to right, #416FAE, #27508C) "
            size="small"
            class="vanbtn"
            @click.stop="goChange(items)"
            >{{
              items.status_name == "已完成" ? "下载" : items.status_name
            }}</van-button
          >
        </div>
      </div>
      <div v-if="nomore == true" class="no_more">没有更多了</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast, List } from 'vant';
Vue.use(List);
export default {
  name: "myorder",
  data() {
    return {
      list: ["全部订单", "待付款", "待评价", "可下载"],
      value: "",
      active: 0,
      OrderList: [],
      order_id: '',
      reqParams: {
        status: 0, // 状态:-1=已取消,1=待支付,2=待评价,3=下载
        page: 0,
        keyword: "" // 关键字搜索
      },
      looked: 0,
      loading: false,
      finished: false,
      total: 0,
      nomore: false,
    };

  },
  created() {
    let that = this
    window.onscroll = function () {
      // scrollTop 滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      if (scrollTop + windowHeight >= scrollHeight) {
        // 加载数据
        if (that.total != that.OrderList.length) {
          that.getOrder();
        } else {
          that.nomore = true
        }

      }
    }
    // console.log(this.$route.query.status);
    // console.log(typeof (this.$route.query.status) === 'string' ? true : false);
    const routerParams = JSON.parse(this.$route.query.status);
    console.log(routerParams);
    if (routerParams == 3) {
      this.reqParams.status = 10
    }
    this.active = routerParams
    this.getOrder()
  },

  methods: {
    goBackFn() {      // 回到上一步
      this.$router.go(-1);
    },
    goChange(item) {
      //  去付款
      if (item.status == 1) {
        if (item.pay_type == "wechat") {
          this.order_id = item.id
          this.getSubmitPage()
        } else if (item.pay_type == "alipay") {
          this.order_id = item.id
          this.alipayZFB()
        }
      } else if (item.status == 2) {
        if (item.status_name == '待评价') {
          // 去评价
          this.$router.push({
            path: "/appraise",
            query: {
              goods_id: item.goods_id,
              order_id: item.id
            }
          });
        } else {
          this.goclickdown(item)
        }
      } else if (item.status == 3) {
        this.goclickdown(item)
      }
    },
    async alipayZFB() {   // 支付宝支付
      const { data } = await this.postRequest(
        "api/order/orderPay", { order_id: this.order_id }
      )
      console.log(data);
      if (data.code == 1) {
        var { href } = this.$router.resolve({
          path: '/newpage',
          query: {
            htmls: data.data.result
          }
        });
        window.location.replace(href);
      }

    },
    async getSubmitPage() {  // 微信支付
      const { data: { data } } = await this.postRequest(
        "api/order/orderPay", { order_id: this.order_id }
      );
      console.log(data);
      let url = data.mweb_url
      // console.log(url);
      window.location.replace(url);

    },
    goOrderDetails(items) {
      console.log(items);
      this.$router.push({
        path: '/detailsList',
        query: {
          goods_id: items.goods_id,
          type: items.type,
        }
      })
    },
    async getOrder() {  // 获取订单
      let that = this
      that.reqParams.page++
      try {
        const {
          data: { data }
        } = await this.postRequest("api/user/order", this.reqParams);
        this.OrderList = this.OrderList.concat(data.list);
        this.OrderList_ = data;
        this.total = data.total
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    titleIndex(title) {
      if (title == 0) {
        this.reqParams.status = 0;
        this.looked = 0
      } else if (title == 1) {
        this.looked = 1
        this.reqParams.status = 1;
      } else if (title == 2) {
        this.looked = 2
        this.reqParams.status = 2;
      } else if (title == 3) {
        this.looked = 3
        this.reqParams.status = 10
      }
      this.getOrder();

    },
    onSearch(val) {
      this.reqParams.keyword = val
      console.log(val);
      this.getOrder()
    },
    async goclickdown(item) {
      let id = item.goods_id
      try {
        const { data } =
          await this.postRequest("api/goods/downloadGoodsFile", { goods_id: id })
        console.log(data);
        let url = data.data;
        window.location.href = "https://glaforteachers.com" + url;
        console.log(url, "url");
        Toast.success('下载成功')
      } catch (err) {
        Toast.fail(err.data.msg)
      }
    },
  }
};
</script>

<style scoped lang='less'>
html,
body {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
}
.container {
  width: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
  .toporder {
    width: 100%;
    position: fixed;
    top: 60px;
    left: 0;
    z-index: 100;
    background-color: #fff;
    .van_search {
      width: 100%;
    }
    .change_status {
      background-color: #fff;
      width: 100%;
    }
  }
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .list_order {
    width: 100%;
    padding: 160px 16px 16px;
    box-sizing: border-box;

    .orders {
      background-color: #fff;
      border-radius: 8px;
      margin: 8px 0;
      padding: 20px 20px;
      box-sizing: border-box;

      .order_num {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;
        box-sizing: border-box;

        .left_num {
          span {
            color: #666666;
            font-size: 12px;
          }
        }
        .pay_status {
          color: #416fae;
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
          p:nth-child(2) {
            color: #999999;
            font-size: 12px;
            .soan {
              color: #999999;
              font-size: 12px;
            }
          }
        }
      }
      .pay_way {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 15px 0 5px 0;
        box-sizing: border-box;
        .stategeng {
          flex: 1;
          .update_npo {
            .span2 {
              font-size: 12px;
              color: #999999;
            }
            .span1 {
              font-size: 12px;
              color: #ff0000;
              margin-right: 3px;
            }
          }
        }
        .pt2 {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: baseline;
          // align-items: center;
        }
      }
      .bott {
        width: 100%;
        text-align: right;
        // .vanbtn {
        // }
      }
    }
    .no_more {
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      color: #5d5d5d;
    }
  }
}
</style>