<template>
  <div class="container">
    <van-nav-bar title="商品列表" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="childlist" :data="goods">
      <div class="top_four">
        <div class="list" v-for="(item,index) in goods" :key="index" @click="goDetailsList(item)">
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
          <div class="text pubStyle">{{item.name}}</div>
          <div class="price">
            <div class="people">
              <img src="../../assets/img/icon_eye@2x.png" alt />
              <span>{{item.view_num}}</span>
            </div>
            <div class="price_red">
              <del v-if="item.reduced_price != 0">{{item.price == '免费'? '':'￥'+item.price }}</del>
              <span class="iconPrice" v-if="item.price != '免费'">￥</span>
              <span class="span">{{item.reduced_price == 0?item.price :item.reduced_price}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailsChildList",
  data() {
    return {
      goods: []
    };
  },
  created() {
    this.getIntroduces()
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    getIntroduces() {  // 获取详情
      this.goods_id = this.$route.query.goods_id
      this.postRequest('api/goods/goodsInfo', {
        goods_id: this.goods_id
      }).then(res => {
        this.goods = res.data.data.goods || ''
        // console.log(res.data.data);
      }).catch(err => {
        console.log(err)
      })
    },
    goDetailsList(item) {
      this.$router.push({ path: "/detailsList", query: { goods_id: item.id } });
    },
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
  .childlist {
    width: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    .top_four {
      background-color: #f9f9f9;
      width: 100%;
      padding: 8px;
      box-sizing: border-box;
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

        .text {
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
            .span {
              font-size: 16px;
              color: #ff0000;
            }
            del {
              margin-right: 5px;
              color: #999999;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>