<template>
  <div class="container">
    <van-nav-bar title="购物车" class="fixedtop" />
    <div class="cart" v-if="total != 0" :data="cart">
      <div class="c">
        <div
          class="result_all"
          v-for="(item, index) in cart"
          :key="index"
          @click.stop="godetails(item)"
        >
          <div class="cks" @click.stop="selectList(index)">
            <img
              src="../../assets/img/changefang.png"
              v-if="item.is_cloose == 1"
              alt
            />
            <img src="../../assets/img/fang.png" v-else alt />
          </div>
          <div class="orders">
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
                <p class="t_text">{{ item.name }}</p>
              </div>
            </div>
            <div class="pay_way">
              <div class="pt">
                <span class="zhong" v-if="item.reduced_price != 0"
                  >￥{{ item.price }}</span
                >
                <span class="span" v-if="item.price != '免费'">￥</span>
                <span class="money">{{
                  item.reduced_price == 0 ? item.price : item.reduced_price
                }}</span>
              </div>
              <div class="change_del">
                <div
                  class="delimg"
                  @click.stop="deleteStore(item.car_id, item)"
                >
                  <img src="../../assets/img/icon_37@2x.png" alt />
                </div>
                <div class="collectImg" @click.stop="toggleStatus(item)">
                  <img
                    src="../../assets/img/icon_136.png"
                    v-show="item.is_collect == 0"
                    alt
                  />
                  <img
                    src="../../assets/img/icon_38@2x.png"
                    v-show="item.is_collect == 1"
                    alt
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="nomore == true" class="no_more">没有更多了</div>
      </div>
      <div class="down_btn">
        <div class="allcks" @click.stop="clickCheckedAll">
          <img
            src="../../assets/img/changefang.png"
            v-if="all_cloose == 1"
            alt
          />
          <img src="../../assets/img/fang.png" v-else alt />
          <span>全选</span>
        </div>
        <div class="heji">
          <span class="hj">合计：</span>
          <span class="ion" v-if="extra.total > 0">￥</span>
          <span class="span">{{ extra.total ? extra.total : 0 }}</span>
        </div>
        <van-button
          color="linear-gradient(to right, #416FAE, #27508C)"
          style="width: 128px"
          round
          class="ck"
          @click="payOut"
          >结算</van-button
        >
      </div>
    </div>
    <div class="empty" v-else>
      <div class="emptycart">
        <img src="../../assets/img/emptycart.png" alt />
        <p>
          您的购物车暂无商品，
          <span @click="goHome">快去选购吧！</span>
        </p>
      </div>
      <div class="hot_store">
        <div class="hot_title">
          <img src="../../assets/img/hot@2x.png" alt />
          <p>热销商品</p>
        </div>
        <div class="hot_title_" @click="freshed">
          <img src="../../assets/img/icon_41@2x.png" alt />
          <p>换一组</p>
        </div>
      </div>
      <!-- 列表 -->
      <div class="top_four" :data="groomList">
        <div
          class="list"
          v-for="(item, index) in groomList"
          :key="index"
          @click="godetail(item.id)"
        >
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
          <div class="two_text itemname">{{ item.name }}</div>
          <div class="price">
            <div class="people">
              <img src="../../assets/img/icon_eye@2x.png" alt />
              <span>{{ item.view_num }}</span>
            </div>
            <div class="price_red">
              <del v-if="item.reduced_price != 0">{{
                item.price == "免费" ? "" : item.price
              }}</del>
              <span class="iconPrice" v-if="item.price != '免费'">￥</span>
              <span class="span">{{
                item.reduced_price == 0 ? item.price : item.reduced_price
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast, Dialog, List } from 'vant';
Vue.use(List);
export default {
  name: "cart",
  data() {
    return {
      reqParams: {
        car_id: "",
        page: 0,
      },
      value: "",
      result: [],
      all_cloose: 0,
      groomList: [], // 推荐
      cart: [],
      shopId: [],
      car_id: [],
      is_collect: 0, // 0=未收藏  1 收藏
      total: 0,
      carCount: '',
      extra: {},
      loading: false,
      finished: false,
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
        if (that.total != that.cart.length) {
          that.getCartList();
        } else {
          that.nomore = true
        }

      }
    }
    that.getGroomList();
    that.getCartList();
  },
  methods: {
    async getGroomList() {
      const {
        data: { data }
      } = await this.postRequest("api/goods/randGoods");
      this.groomList = data;
    },
    godetails(it) {
      this.$router.push({ path: '/detailsList', query: { goods_id: it.goods_id } })
    },
    godetail(id) {
      this.$router.push({ path: '/detailsList', query: { goods_id: id } })
    },
    async getCartList() {     // 获取购物车列表
      this.reqParams.page++
      let shopCart = JSON.parse(localStorage.getItem('shopCart'))
      let token = JSON.parse(localStorage.getItem('kou_token'))

      if (token) {
        // this.loading = true;
        try {
          const {
            data: { data }
          } = await this.postRequest("api/user/car", this.reqParams);
          console.log(data);
          if (data.list.length != 0) {
            data.list.forEach(item => {
              item.is_cloose = 0
            })
          }
          console.log(data);
          this.cart = this.cart.concat(data.list)
          this.total = data.total
          console.log(this.cart);
        } catch (err) {
          Toast.fail(err.msg)
        }
      } else {  // 没有token
        if (localStorage.getItem('shopCart') != '') {
          if (shopCart != null) {
            shopCart.forEach(item => {
              item.is_cloose = 0
            })
            this.cart = shopCart
            console.log(this.cart);
          }
        }
      }
    },
    async toggleStatus(itm) {    // 添加收藏 取消收藏
      console.log(itm);
      if (itm.is_collect == 1) {
        const {
          data
        } = await this.postRequest("api/sundry/addGoodsCollect", {
          goods_id: itm.goods_id
        });
        console.log(data);
        Toast.success(data.msg);
        if (data.code == 1) {
          this.getCartList()
        }
      } else {
        const {
          data
        } = await this.postRequest("api/sundry/addGoodsCollect", {
          goods_id: itm.goods_id
        });
        console.log(data);
        Toast.success(data.msg);
        if (data.code == 1) {
          this.getCartList()

        }
      }
    },
    deleteStore(id, idd) {  // 删除单件商品
      let that = this
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        Dialog.confirm({
          title: '温馨提示',
          message: '此操作将永久删除该商品, 是否继续?',
        })
          .then(async () => {
            try {
              const { data } = await that.postRequest("api/sundry/delCar", { id: id });
              console.log(data);
              Toast.success("删除成功");
              that.reqParams.page = 1
              that.getCartList();
              that.$forceUpdate()
              that.shopId = []
              that.car_id = []
              that.all_cloose = 0
              that.totalNUM()
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Toast("尚未登录,请先登录")
        for (let i = 0; i < this.cart.length; i++) {
          if (this.cart[i].id == idd.id) {
            this.cart.splice(i, 1)
            this.cart = JSON.parse(JSON.stringify(this.cart))
            localStorage.setItem("shopCart", JSON.stringify(this.cart))
            this.getCartList();
          }
        }
      }
    },
    selectList(send) {   // 单选
      let that = this
      let shopId = that.shopId
      let goodsId = that.car_id
      let list = that.cart
      list.forEach((value, index) => {
        if (send == index) {
          if (value.is_cloose == 0) {
            value.is_cloose = 1
            if (goodsId.indexOf(value.goods_id == -1)) {
              goodsId.push(value.goods_id)
              shopId.push(value.car_id)
            }
          } else {
            value.is_cloose = 0
            let x = shopId.indexOf(value.car_id)
            let k = goodsId.indexOf(value.goods_id)
            if (x != -1) {
              shopId.splice(x, 1)
              goodsId.splice(k, 1)
            }
          }
        }
      })
      if (goodsId.length == list.length) {
        this.all_cloose = 1
      } else {
        this.all_cloose = 0
      }
      that.cart = list
      that.car_id = goodsId
      that.shopId = shopId
      console.log(that.car_id, "car_id");
      console.log(that.shopId, "shopId");

      this.totalNUM()
      this.$forceUpdate()
    },
    clickCheckedAll() { // 全选
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        let that = this;
        let cartID = []
        let shopId = []
        let cartlist = that.cart
        console.log(cartlist, "cartlist");
        if (that.all_cloose == 1) {
          that.all_cloose = 0
          cartlist.forEach(value => {
            value.is_cloose = 0
          })
          cartID = []
          shopId = []
          console.log(cartlist, "cartlist1");
        } else {
          that.all_cloose = 1
          cartlist.forEach(value => {
            value.is_cloose = 1
            cartID.push(value.goods_id)
            shopId.push(value.car_id)
          })
        }
        that.cart = cartlist
        that.car_id = cartID
        that.shopId = shopId
        console.log(that.car_id, "car_id");
        console.log(that.shopId, "shopId");
        that.totalNUM()
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
    async totalNUM() {
      let totalPrice = []
      let cartID = this.car_id
      if (cartID.length != 0) {
        cartID.forEach(item => {
          let storeObj = {}
          storeObj.is_authorize_logo = 2
          storeObj.goods_id = item
          totalPrice.push(storeObj)
        })
      }
      // console.log(totalPrice);
      try {
        const {
          data: { data }
        } = await this.postRequest("api/order/getCarTotal", totalPrice);
        this.extra = data;
        this.total = data.total
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    payOut() {  // 结算
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        if (this.car_id) {
          this.$router.push({
            path: "/confirmOrder",
            query: {
              routeParams: JSON.stringify({ car_id: this.shopId, num: 2,car_idsss:this.car_id,whick:'1' })
            }
          });
        } else {
          Toast.fail('您还未选择商品哦')
        }

      } else {
        Dialog.confirm({
          title: '温馨提示',
          message: '登录之后才可购买',
        })
          .then(() => {
            this.$router.push('/login')
          })
          .catch(() => {

          });


      }
    },
    goHome() {
      this.$router.push('/')
    },
    freshed() {    // 换一组
      this.groomList = [];
      this.getGroomList();
    },
  }
};
</script>



<style scoped lang='less'>
.container {
  width: 100%;
  box-sizing: border-box;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .cart {
    width: 100%;
    min-height: 100%;
    padding: 60px 0 80px;
    box-sizing: border-box;

    .c {
      width: 100%;
      height: 100%;
      padding: 6px 16px;
      // margin-bottom: 100px;
      box-sizing: border-box;

      .result_all {
        padding: 6px 12px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        border-radius: 8px;
        background-color: #fff;
        margin: 6px 0;
        .cks {
          padding: 10px 3px;
          background-color: #fff;
          box-sizing: border-box;
          border-radius: 8px;
          margin: 8px 0;
          img {
            width: 16px;
            height: 16px;
          }
        }
        .orders {
          flex: 1;
          .order_rig {
            display: flex;
            padding: 10px 5px 0;
            box-sizing: border-box;
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
              height: 71px;
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
              }
            }
          }
          .pay_way {
            display: flex;
            align-self: flex-end;
            flex-direction: column;
            align-items: flex-end;
            p {
              color: #ff0000;
              font-size: 20px;
              font-weight: 600;
              line-height: 40px;
            }
            .change_del {
              margin-top: 10px;
              display: flex;
              align-items: center;
              img {
                width: 32px;
                height: 32px;
                margin-left: 30px;
              }
            }
          }
        }
      }
    }

    .currentpae {
      padding: 0 16px;
      box-sizing: border-box;
      background-color: #f9f9f9;
    }
    .no_more {
      width: 100%;
      padding: 20px 0;
      box-sizing: border-box;
      text-align: center;
      font-size: 14px;
      color: #5d5d5d;
    }
    .down_btn {
      width: 100%;
      position: fixed;
      bottom: 50px;
      left: 0;
      height: 54px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #fff;
      .allcks {
        margin: 0 5px;
        display: flex;
        align-items: center;
        img {
          width: 16px;
          height: 16px;
        }
        span {
          margin: 0 0 0 5px;
          font-size: 16px;
          color: #2c2c2c;
        }
      }
      .ck {
      }
      .heji {
        .hj {
          font-size: 16px;
          color: #2c2c2c;
        }

        .ion {
          font-size: 6px;
          color: #ff0000;
          font-weight: 600;
        }
        .span {
          font-size: 16px;
          color: #ff0000;
          font-weight: 600;
        }
      }
    }
  }
  .empty {
    width: 100%;
    padding: 60px 0 50px;
    box-sizing: border-box;
    .emptycart {
      margin-top: 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 100%;
        // height: 110px;
      }
      p {
        margin-top: 20px;
        color: #2c2c2c;
        font-size: 16px;
        line-height: 50px;
        span {
          color: #416fae;
          font-weight: 600;
        }
      }
    }
    .hot_store {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 16px;
      box-sizing: border-box;
      .hot_title {
        display: flex;
        align-items: center;
        img {
          width: 24px;
          height: 24px;
        }
        p {
          margin-left: 10px;
          color: #2c2c2c;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .hot_title_ {
        display: flex;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
        }
        p {
          margin-left: 10px;
          color: #27508c;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
    .top_four {
      padding: 16px 8px 100px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .list {
        height: 180px;
        width: 164px;
        margin: 7px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 6px;
        .order_img {
          width: 164px;
          height: 102px;
          position: relative;
          border-radius: 6px 6px 0 0;

          img {
            width: 100%;
            border-radius: 6px 6px 0 0;
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

        .itemname {
          width: 100%;
          font-size: 14px;
          line-height: 22px;
          text-align: left;
          padding: 0 10px;
          box-sizing: border-box;
        }
        .price {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          padding: 0 10px;
          box-sizing: border-box;
          .people {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 14px;
              height: 14px;
            }
            span {
              margin-left: 3px;
              color: #8c9198;
              font-size: 10px;
            }
          }
          .price_red {
            del {
              color: #ccc;
              font-size: 8px;
              margin-right: 5px;
            }
            .iconPrice {
              font-size: 10px;
              color: #ff0000;
            }
            .span {
              font-size: 16px;
              color: #ff0000;
            }
          }
        }
      }
    }
  }
}
</style>