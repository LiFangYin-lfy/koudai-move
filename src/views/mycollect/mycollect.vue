<template>
  <div class="container">
    <van-nav-bar
      title="我的收藏"
      left-arrow
      @click-left="goBackFn"
      class="fixedtop"
    />
    <van-search
      v-model="value"
      class="vansearch"
      shape="round"
      placeholder="请输入要搜索的关键词"
      @search="onSearch"
    />
    <div class="order_list" :data="mycollect" v-if="total != 0">
      <div class="result_all" v-for="(item, index) in mycollect" :key="index">
        <div class="cks" @click.stop="selectList(index)">
          <img
            src="../../assets/img/changefang.png"
            v-if="item.is_cloose == 1"
            alt
          />
          <img src="../../assets/img/fang.png" v-else alt />
        </div>
        <div class="orders" @click="goDetails(item.goods_id)">
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
              <p>
                下单时间：
                <span>{{ item.createtime }}</span>
              </p>
            </div>
          </div>
          <div class="pay_way">
            <del v-if="item.reduced_price != 0">{{
              item.price == "免费" ? "" : "￥" + item.price
            }}</del>
            <div class="pt payWay">
              <span class="span" v-if="item.price != '免费'">￥</span>
              <span class="money">{{
                item.reduced_price == 0 ? item.price : item.reduced_price
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="nomore == true" class="no_more">没有更多了</div>
    </div>
    <div class="empty" v-else>
      <img src="../../assets/img/empty.png" class="emptyimg" alt />
    </div>

    <div class="btn_all" v-if="mycollect.length != 0">
      <div class="allcks" @click.stop="clickCheckedAll">
        <img src="../../assets/img/changefang.png" v-if="all_cloose == 1" alt />
        <img src="../../assets/img/fang.png" v-else alt />
        <span>全选</span>
      </div>
      <div class="cst_button">
        <van-button
          color="#416FAE"
          plain
          round
          class="ck_button"
          @click="delAllItem"
          >删除</van-button
        >
        <van-button
          color="linear-gradient(to right, #416FAE, #27508C)"
          round
          class="ck_button"
          @click="addAllCart"
          >加入购物车</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast, Dialog, List } from 'vant';
Vue.use(List);
export default {
  name: "mycollect",
  data() {
    return {
      value: "",
      result: [],
      mycollect: [],
      carID: [],
      car_id: [],   //goods_id
      reqParams: {
        goods_id: "",
        keyword: "",
        page: 0,
      },
      all_cloose: 0,
      total: 0,
      loading: false,
      finished: false,
      nomore: false
    };
  },
  created() {
    this.getMycollect();
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
        if (that.total != that.mycollect.length) {
          that.getMycollect();
        } else {
          that.nomore = true
        }

      }
    }
  },
  methods: {
    checkAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    },
    goBackFn() {   // 回到上一步
      this.$router.go(-1);
    },
    goDetails(id) {
      this.$router.push({ path: '/detailsList', query: { goods_id: id } })
    },
    async getMycollect() {  // 获取收藏
      this.reqParams.page++
      try {
        const {
          data: { data }
        } = await this.postRequest("api/user/collect", this.reqParams);
        if (data.total != 0) {
          data.list.forEach(item => {
            item.is_cloose = 0
          });
        } else {
          if (this.reqParams.keyword != '') {
            Toast.fail('没有找到相匹配的内容')
          }
        }
        // this.loading = false;
        this.mycollect = this.mycollect.concat(data.list);
        this.total = data.total
        console.log(data);
      } catch (err) {
        Toast.fail(err.msg)
      }

    },
    onSearch(val) {
      this.reqParams.keyword = val
      this.getMycollect();
    },
    async addAllCart() {  //  复选框加入购物车
      let carID = this.car_id.join(',')
      const { data } = await this.postRequest("api/sundry/addCar", { goods_id: carID });
      console.log(data);
      if (data.code == 1) {
        let msg = data.msg
        Toast.success(msg)
      } else {
        let msg = data.msg
        Toast.fail(msg)
      }
    },
    delAllItem() {  // 复选框删除
      console.log(this.carID);
      let id = this.carID.join(',')
      console.log(id);
      Dialog.confirm({
        title: '温馨提示',
        message: '确认要删除吗？',
      })
        .then(async () => {
          const { data } = await this.postRequest("api/sundry/delGoodsCollect", { id: id });
          console.log(data);
          if (data.code == 1) {
            let msg = data.msg
            Toast.success(msg)
          }
          this.reqParams.page = 1;
          this.getMycollect()
        })
        .catch((err) => {
          Toast.fail(err)
        });
      this.$forceUpdate()

    },
    selectList(send) {   // 单选
      let that = this
      let goodsId = that.car_id
      let carId = that.carID
      let list = that.mycollect
      list.forEach((value, index) => {
        if (index == send) {
          if (value.is_cloose == 0) {
            value.is_cloose = 1
            if (goodsId.indexOf(value.goods_id) == -1) {
              goodsId.push(value.goods_id)
              carId.push(value.id)
            }
          } else {
            value.is_cloose = 0
            if (goodsId.indexOf(value.goods_id) != -1) {
              let x = goodsId.indexOf(value.goods_id)
              let k = goodsId.indexOf(value.id)
              goodsId.splice(x, 1)
              carId.splice(k, 1)
            }
          }

        }
      })
      that.car_id = goodsId
      that.carID = carId
      that.mycollect = list
      if (carId.length == that.mycollect.length) {
        that.all_cloose = 1
      } else {
        that.all_cloose = 0
      }
      console.log(this.car_id, this.carID);
      // this.$forceUpdate()

    },
    clickCheckedAll() { // 全选
      let that = this;
      let carID = []
      let car_id = []
      let cartlist = that.mycollect
      if (that.all_cloose == 1) {
        that.all_cloose = 0
        cartlist.forEach(value => {
          value.is_cloose = 0
        })
        that.car_id = []
        that.carID = []
      } else {
        that.all_cloose = 1
        cartlist.forEach(value => {
          value.is_cloose = 1
          car_id.push(value.goods_id)
          carID.push(value.id)
        })
      }
      that.mycollect = cartlist
      that.carID = carID
      that.car_id = car_id
      console.log(this.car_id, this.carID);
    },

  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .vansearch {
    padding-top: 70px;
    box-sizing: border-box;
  }
  .order_list {
    width: 100%;
    padding: 6px 16px 106px;
    box-sizing: border-box;
    background-color: #f5f5f5;
    min-height: 100%;

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
        box-sizing: border-box;
        background-color: #fff;

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
          width: 100%;
          display: flex;
          padding: 10px 5px 10px;
          box-sizing: border-box;
          .order_img {
            width: 115px;
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
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 0 10px;
          box-sizing: border-box;

          del {
            margin-right: 10px;
            color: #999999;
            font-size: 10px;
          }
        }
      }
    }
    .currentpae {
      // width: 100%;
      padding: 0 16px;
      box-sizing: border-box;
      background-color: #f9f9f9;
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

  .empty {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 150px;
    box-sizing: border-box;
    .emptyimg {
      width: 100px;
      height: 100px;
    }
  }

  .btn_all {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
    box-sizing: border-box;

    .cst_button {
      flex: 1;
      display: flex;
      align-items: center;
      .ck_button {
        width: 40%;
        margin: 0 10px;
      }
    }
    .allcks {
      width: 80px;
      margin: 0 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
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
  }
}
</style>