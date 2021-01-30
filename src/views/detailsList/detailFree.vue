<template>
  <div class="container">
    <div class="top">
      <div class="arrow_left" @click-left="goBackFn">
        <img src="../../assets/img/left_arrow.png" alt />
      </div>
      <van-tabs v-model="active" class="item">
        <van-tab title="商品"></van-tab>
        <van-tab title="详情"></van-tab>
        <van-tab title="评价"></van-tab>
        <van-tab title="推荐"></van-tab>
      </van-tabs>
      <div class="content_title">
        <van-swipe @change="onChange">
          <van-swipe-item>
            <img src="../../assets/img/NoPath -store (2).png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../../assets/img/NoPath -store (2).png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../../assets/img/NoPath -store (2).png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../../assets/img/NoPath -store (2).png" alt />
          </van-swipe-item>
          <van-swipe-item>
            <img src="../../assets/img/NoPath -store (2).png" alt />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">{{ current + 1 }}/5</div>
          </template>
        </van-swipe>
        <div class="title_">
          <p>封面是书的脸面,起保护书,起保护书页和装饰封里也叫封二即封面的里面封</p>
        </div>
        <div class="pay_">
          <div class="pay_price public">
            <p>免费</p>
            <p>
              浏览量
              <span>346565</span>
            </p>
          </div>
          <div class="store_total public">
            <p>年级</p>
            <p>一年级</p>
          </div>
          <div class="store_discount public">
            <p>类别</p>
            <p>自然哦ing都</p>
          </div>
          <div class="pay_total public">
            <p>文件大小</p>
            <p>4MB</p>
          </div>
        </div>
      </div>
      <!-- 内容管理 -->
      <div class="cont_title">
        <p>内容介绍</p>
        <img src="../../assets/img/NoPath -222@2x.png" alt />
      </div>
      <!-- 累计评价 -->
      <div class="cont_raise">
        <div class="top_num">
          <p>
            累计评价
            <span>(23565)</span>
          </p>
          <p>全部 ></p>
        </div>
        <div class="star_">
          <div class="star_top">
            <van-rate
              v-model="value"
              :size="25"
              color="#FF9D3B"
              void-icon="star"
              void-color="#eee"
            />
            <p>
              好评率
              <span>97%</span>
            </p>
          </div>
          <div class="raise_">
            <div class="raise_item">
              <img src="../../assets/img/NoPath.png" alt />
              <div class="right_item">
                <p>小环零二</p>
                <div class="good_raise">
                  <van-rate
                    v-model="value"
                    :size="14"
                    color="#FF9D3B"
                    void-icon="star"
                    void-color="#eee"
                  />
                  <span>非常好</span>
                </div>
              </div>
            </div>
            <div class="good_txt">
              <p>航拍又称空拍、空中摄影或航空摄影，是指从空中拍摄地球地貌，获得俯视图。</p>
              <p>2020-05-21 22:46:31</p>
            </div>
          </div>
        </div>
      </div>
      <!--相关推荐  -->
      <div class="recommend">
        <div class="top_r_title">
          <p>相关推荐</p>
          <div class="right_imgs">
            <img src="../../assets/img/icon_41@2x.png" alt />
            <p>换一组</p>
          </div>
        </div>
        <!-- 列表 -->
        <div class="top_four">
          <div class="list">
            <img src="../../assets/img/NoPath -store (2).png" alt />
            <div class="text">剑桥少儿 YLE START...</div>
            <div class="price">
              <div class="people">
                <img src="../../assets/img/icon_eye@2x.png" alt />
                <span>225</span>
              </div>
              <div class="price_red">
                <span>￥75</span>
              </div>
            </div>
          </div>
          <div class="list">
            <img src="../../assets/img/NoPath -store (2).png" alt />
            <div class="text">剑桥少儿 YLE START...</div>
            <div class="price">
              <div class="people">
                <img src="../../assets/img/icon_eye@2x.png" alt />
                <span>225</span>
              </div>
              <div class="price_red">
                <span>￥75</span>
              </div>
            </div>
          </div>
          <div class="list">
            <img src="../../assets/img/NoPath -store (2).png" alt />
            <div class="text">剑桥少儿 YLE START...</div>
            <div class="price">
              <div class="people">
                <img src="../../assets/img/icon_eye@2x.png" alt />
                <span>225</span>
              </div>
              <div class="price_red">
                <span>￥75</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="left_1">
          <img src="../../assets/img/icon_43@2x.png" alt />
          <p>已收藏</p>
        </div>
        <div class="left_2 left_1">
          <img src="../../assets/img/icon_42@2x.png" alt />
          <p>分享</p>
        </div>
        <van-button color="#416FAE" plain round style="width:112px" class="ck">加入购物车</van-button>
        <van-button
          color="linear-gradient(to right, #416FAE, #27508C)"
          style="width:112px"
          round
          class="ck"
        >立即购买</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailFree",
  data() {
    return {
      active: 0,
      current: 0,
      value: 5
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    getDetailFree() {

    },

    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  .top {
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #f5f5f5;
    .arrow_left {
      img {
        position: absolute;
        left: 10px;
        top: 10px;
        // z-index: 2;
        width: 20px;
        height: 20px;
      }
    }

    .item {
      width: 100%;
    }
    .content_title {
      width: 100%;
      background-color: #fff;
      .custom-indicator {
        position: absolute;
        right: 5px;
        bottom: 5px;
        padding: 2px 5px;
        box-sizing: border-box;
        font-size: 12px;
        background: rgba(0, 0, 0, 0.1);
      }
      img {
        width: 100%;
        height: 100%;
      }
      .title_ {
        padding: 16px;
        box-sizing: border-box;
        p {
          font-size: 20px;
          font-weight: 600;
          color: #2c2c2c;
          line-height: 30px;
        }
      }
      .pay_ {
        padding: 16px;
        box-sizing: border-box;
        width: 100%;
        .public {
          display: flex;
          justify-content: space-between;
          align-items: center;
          p {
            color: #999999;
            font-size: 14px;
            line-height: 40px;
          }
        }
        .pay_price {
          p {
            color: #ff0000;
            font-size: 22px;
          }
          p:nth-child(2) {
            color: #666666;
            font-size: 14px;
            margin: 0 5px;
            span {
              color: #2c2c2c;
            }
          }
        }

        .store_discount {
          p:nth-child(2) {
            color: #2c2c2c;
          }
        }
        .store_total {
          p:nth-child(2) {
            color: #000;
            font-size: 16px;
          }
        }
        .pay_total {
          p:nth-child(1) {
            color: #2c2c2c;
            font-size: 16px;
          }
          p:nth-child(2) {
            color: #000;
            font-size: 16px;
          }
        }
      }
    }
    // 内容介绍
    .cont_title {
      margin-top: 10px;
      width: 100%;
      padding: 16px;
      box-sizing: border-box;
      background-color: #fff;
      p {
        font-size: 16px;
        font-weight: 600;
        color: #3d444d;
        line-height: 60px;
      }
      img {
        width: 100%;
      }
    }
    // 累计评价
    .cont_raise {
      padding: 16px;
      box-sizing: border-box;
      background-color: #fff;
      .top_num {
        display: flex;
        justify-content: space-between;
        align-items: center;

        p {
          margin: 0 15px;
          line-height: 30px;
          font-size: 16px;
          color: #000;
        }
        p:nth-child(2) {
          color: #999999;
          font-size: 14px;
          line-height: 30px;
        }
      }
      .star_ {
        .star_top {
          padding-left: 30px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          height: 80px;
          p {
            font-size: 16px;
            line-height: 30px;
            color: #999999;
            margin: 0 10px;
            span {
              color: #ff0000;
              font-weight: 600;
              font-size: 22px;
              margin-left: 10px;
            }
          }
        }
      }
      .raise_ {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .raise_item {
          display: flex;
          align-items: center;
          img {
            width: 44px;
            height: 44px;
          }
          .right_item {
            margin-left: 15px;
            p {
              font-size: 16px;
              color: #333333;
              font-weight: 600;
            }
            .good_raise {
              display: flex;
              align-items: center;
              span {
                color: #999999;
                margin-left: 10px;
              }
            }
          }
        }
        .good_txt {
          margin-top: 10px;
          p:nth-child(1) {
            font-size: 14px;
            line-height: 30px;
            color: #666666;
          }
          p:nth-child(2) {
            font-size: 10px;
            line-height: 30px;
            text-align: right;
            color: #666666;
            // margin-right: 20px;
          }
        }
      }
    }
    // 相关推荐
    .recommend {
      margin-top: 20px;
      background-color: #fff;
      width: 100%;
      padding: 16px 8px;
      box-sizing: border-box;
      margin-bottom: 100px;
      .top_r_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 40px;
        p {
          font-size: 16px;
          color: #2c2c2c;
          font-weight: 600;
        }
        .right_imgs {
          display: flex;
          align-items: center;
          img {
            width: 16px;
            height: 16px;
          }
          p {
            margin-left: 5px;
            color: #27508c;
            font-size: 16px;
          }
        }
      }
      .top_four {
        background-color: #f9f9f9;
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
          img {
            width: 164px;
            height: 102px;
          }
          .text {
            width: 100%;
            font-size: 14px;
            line-height: 22px;
            text-align: center;
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
                margin-left: 10px;
                color: #8c9198;
                font-size: 10px;
              }
            }
            .price_red {
              span {
                font-size: 16px;
                color: #ff0000;
              }
            }
          }
        }
      }
    }
    // 按钮组
    .btns {
      padding: 5px 16px;
      box-sizing: border-box;
      width: 100%;
      position: fixed;
      bottom: 0px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #fff;
      .left_1 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
        }
        p {
          font-size: 12px;
          line-height: 30px;
          color: #416fae;
        }
      }
      .left_2 {
        margin: 0 10px;
        p {
          font-size: 12px;
          line-height: 30px;
          color: #666666;
        }
      }
    }
  }
}
</style>