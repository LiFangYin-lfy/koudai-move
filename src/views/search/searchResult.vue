<template>
  <div class="container">
    <van-nav-bar title="搜索结果" left-arrow class="fixedtop" @click-left="goBackFn" />
    <div class="top_four" v-if="resultList.length !=0">
      <div
        class="list"
        v-for="(item,index) in resultList"
        :key="index"
        @click="goDetailsList(item)"
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
    <div class="empty" v-else>
      <img src="@/assets/img/empty.png" class="emptyimg" alt />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'searchResult',
  data() {
    return {
      resultList: [],
      reqParams: {
        keyword: "", // 关键字搜索
        grade: "", // 年级id
        category: "", // 分类id
        price: "", //价格筛选
        view_num: "", //	浏览量排序 1=降序,2=升序
        createtime: "", //	上架时间排序 1=降序,2=升序
        price_type: "", // 价格排序 1=降序,2=升序
        type: "", //	教学进程表
        offset: 1, // 页数
        page: 12
      },
    }
  },
  created() {
    this.reqParams.keyword = this.$route.query.keyword
    this.getResult()
  },
  methods: {
    goBackFn() {      // 回到上一步
      this.$router.go(-1);
    },
    goDetailsList(it) {
      // console.log(it);
      this.$router.push({ path: '/detailsList', query: { goods_id: it.id } })
    },
    async getResult() {
      try {
        const {
          data: { data }
        } = await this.postRequest("api/index/goodsList", this.reqParams);
        console.log(data);
        if (data.list.length > 0) {
          this.resultList = data.list;
        } else {
          Toast.fail("未查询到内容");
          this.resultList = data.list
          setTimeout(() => {
            this.$router.go(-1);
          }, 1300);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .top_four {
    background-color: #f9f9f9;
    width: 100%;
    padding: 64px 8px 8px;
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
}
</style>