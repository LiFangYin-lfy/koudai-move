<template>
  <div class="container">
    <div class="boxtop">
      <div class="posie">
        <div class="arrow_left" @click="goBackFn">
          <img src="../../assets/img/left_arrow.png" alt />
        </div>
        <van-tabs v-model="active" class="item" @click="obcilid">
          <van-tab
            v-for="(item, index) in tabs"
            :title="item.name"
            :key="index"
          ></van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="top">
      <div class="content_title" id="first">
        <van-swipe @change="onChange" class="swipeIMG">
          <van-swipe-item v-for="(item, index) in images" :key="index">
            <van-image :src="item" alt fit="cover" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ images.length }}
            </div>
          </template>
        </van-swipe>
        <div class="title_">
          <p class="two_text">{{ introduces.name }}</p>
        </div>
        <div class="pay_">
          <div class="pay_price public">
            <p>
              <span class="iconPricre" v-if="introduces.price != '免费'"
                >￥</span
              >
              <span class="sparn">{{
                introduces.reduced_price == 0
                  ? introduces.price
                  : introduces.reduced_price
              }}</span>
              <del v-if="introduces.reduced_price != 0">{{
                introduces.price == "免费" ? "" : "￥" + introduces.price
              }}</del>
            </p>
            <p class="ite">
              浏览量
              {{ introduces.view_num }}
            </p>
          </div>
          <div class="store_total public">
            <p class="itel">年级</p>
            <p class="ite">{{ introduces.grade_name }}</p>
          </div>
          <div class="store_discount public">
            <p class="itel">类别</p>
            <p class="ite oneway">{{ introduces.category_name }}</p>
          </div>
          <div class="pay_total public">
            <p class="itel">文件大小</p>
            <p class="ite">{{ introduces.size }}</p>
          </div>
        </div>
      </div>
      <!-- 子列表 -->
      <div class="content_title" v-if="goods.length > 0">
        <div class="titles">
          <p>此商品包含以下⼦商品</p>
          <p @click="allChildMore">全部 ></p>
        </div>
        <div class="top_four_">
          <div
            class="list"
            v-for="(item1, index2) in goods"
            :key="index2"
            @click="toDetails(item1.id)"
          >
            <div class="order_img">
              <img :src="item1.image" alt />
              <div class="pos">
                <div class="flash_sale" v-if="item1.reduced_price > 0">
                  <div class="sale">
                    <span>限时特惠</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="pubStyle text">{{ item1.name }}</div>
            <div class="price">
              <div class="people">
                <img src="../../assets/img/icon_eye@2x.png" alt />
                <span>{{ item1.view_num }}</span>
              </div>
              <div class="price_red">
                <del v-if="item1.reduced_price != 0">{{
                  item1.price == "免费" ? "" : "￥" + item1.price
                }}</del>
                <span class="iconPrice" v-if="item1.price != '免费'">￥</span>
                <span class="span">{{
                  item1.reduced_price == 0 ? item1.price : item1.reduced_price
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 内容管理 -->
      <div class="cont_title" id="second">
        <p class="contjs">内容介绍</p>
        <div class="listContent" v-html="introduces.content"></div>
      </div>
      <!-- 累计评价 -->
      <div class="cont_raise" id="third">
        <div class="top_num">
          <p class="contjs">
            累计评价
            <span class="nunber">({{ introduces.evaluate_num }})</span>
          </p>
          <p class="all" @click="lookallpraise">全部 ></p>
        </div>
        <div class="star_">
          <div class="star_top">
            <div class="stars" v-if="introduces.good_rate != '暂无评价'">
              <van-rate
                :size="25"
                color="#FF9D3B"
                :value="introduces.score"
                void-icon="star"
                void-color="#eee"
              />
              <p>
                好评率
                <span>{{ introduces.good_rate }}</span>
              </p>
            </div>
            <div class="stars_ele" v-else>{{ introduces.good_rate }}</div>
          </div>
          <div
            class="raise_"
            v-for="(arr, index1) in moreComment"
            :key="index1"
          >
            <div class="raise_item">
              <img :src="arr.avatar" alt />
              <div class="right_item">
                <p>{{ arr.nickname }}</p>
                <div class="good_raise">
                  <van-rate
                    :size="14"
                    color="#FF9D3B"
                    void-icon="star"
                    :value="arr.score"
                    void-color="#eee"
                  />
                  <span>{{ arr.evaluate_default }}</span>
                </div>
              </div>
            </div>
            <div class="good_txt">
              <p>{{ arr.content }}</p>
              <p>{{ arr.createtime }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--相关推荐  -->
      <div class="recommend" id="four">
        <div class="top_r_title">
          <p>相关推荐</p>
          <div class="right_imgs" @click="freshed">
            <img src="../../assets/img/icon_41@2x.png" alt />
            <p>换一组</p>
          </div>
        </div>
        <!-- 列表 -->
        <div class="top_four">
          <div
            class="list"
            v-for="(item, index) in shop_list"
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
            <div class="text pubStyle">{{ item.name }}</div>
            <div class="price">
              <div class="people">
                <img src="../../assets/img/icon_eye@2x.png" alt />
                <span>{{ item.view_num }}</span>
              </div>
              <div class="price_red">
                <del v-if="item.reduced_price > 0">{{
                  item.price == "免费" ? "" : "￥" + item.price
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
      <!-- 弹窗 -->
      <van-overlay :show="up">
        <div class="wrapper" @click.stop="ups">
          <div class="block" @click.stop>
            <!-- <div class="share" @click="wechat">
              <img src="@/assets/img/icon_68@2x.png" alt />
              <p>微信</p>
            </div>-->
            <div class="share" @click="sharefacebook">
              <img src="@/assets/img/icon_69@2x.png" alt />
              <p>Facebook</p>
            </div>
            <div class="share" @click="shareWeibo">
              <img src="@/assets/img/icon_70@2x.png" alt />
              <p>微博</p>
            </div>
          </div>
        </div>
      </van-overlay>
      <!-- 下载弹窗 -->
      <div class="ddr" v-if="downoverlay">
        <!-- <van-overlay :show="downoverlay"> -->
        <div class="wrapper_">
          <div class="block_" @click.stop>
            <div class="down_top">
              <p>下载</p>
              <img
                src="../../assets/img/quit_white.png"
                alt
                @click.stop="downoverlay = false"
              />
            </div>
            <div class="ims">
              <img :src="downloadFile.image" alt />
            </div>
            <div class="box_items">
              <div class="book_title">
                <img src="../../assets/img/icon_56@2x.png" alt />
                <p>资料说明</p>
                <span>(共{{ downloadFile.size }})</span>
              </div>
              <div class="dasded">
                <div class="items"></div>
              </div>

              <div class="list_book">
                <div
                  class="books"
                  v-for="(item, index) in downloaded"
                  :key="index"
                >
                  <img :src="item.logo" alt />
                  <p class="oneway">{{ item.filename }}</p>
                </div>
                <!-- <div
                  class="books"
                  v-for="(item, index) in downloaded"
                  :key="index"
                >
                  <img :src="item.logo" alt />
                  <p class="oneway">{{ item.filename }}</p>
                </div> -->
              </div>
            </div>
            <div class="down_btns">
              <div class="bttns">
                <van-button
                  color="#416FAE"
                  round
                  plain
                  class="vanbutton"
                  @click.stop="downoverlay = false"
                  >取消</van-button
                >
                <van-button
                  class="vanbutton"
                  round
                  @click.stop="loadfile"
                  color="linear-gradient(to right, #416FAE, #27508C)"
                  >下载</van-button
                >
              </div>
            </div>
          </div>
        </div>
        <!-- </van-overlay> -->
      </div>
    </div>
    <div class="btns">
      <div class="bottoms">
        <div class="idv">
          <div class="left_1" @click="toggleStatus">
            <img
              src="../../assets/img/icon_136.png"
              alt
              v-show="is_collect == 0"
            />
            <img
              src="../../assets/img/icon_43@2x.png"
              v-show="is_collect == 1"
              alt
            />
            <p v-show="is_collect == 0" style="color: #666666">未收藏</p>
            <p v-show="is_collect == 1">已收藏</p>
          </div>
          <div class="left_2 left_1" @click="ups">
            <img src="../../assets/img/icon_42@2x.png" alt />
            <!-- <img src="../../assets/img/icon_42@2x.png" alt /> -->
            <p :class="is_share == 1 ? 'is_sharecolor' : ''">分享</p>
          </div>
        </div>
        <div class="c_item" v-if="status == 1">
          <div class="newarr1" v-if="introduces.is_order == 0">
            <van-button
              color="#416FAE"
              plain
              round
              @click="addCart(introduces)"
              class="ck_buttom"
              >加入购物车</van-button
            >
            <van-button
              color="linear-gradient(to right, #416FAE, #27508C)"
              round
              class="ck_buttom"
              @click="buyNow"
              >立即购买</van-button
            >
          </div>
          <div class="newarr1" v-else>
            <van-button
              color="#416FAE"
              plain
              round
              @click="downloadload"
              class="ck_buttom"
              >立即下载</van-button
            >
            <van-button
              color="linear-gradient(to right, #416FAE, #27508C)"
              round
              class="ck_buttom"
              @click="updateNow(introduces)"
              >更换新LOGO</van-button
            >
          </div>
        </div>
        <div class="c_item" v-if="status == 3">
          <div class="newarr2" v-if="introduces.is_order == 0">
            <van-button
              color="#416FAE"
              plain
              round
              @click="addCart(introduces)"
              class="ck_buttom"
              >加入购物车</van-button
            >
            <van-button
              color="linear-gradient(to right, #416FAE, #27508C)"
              round
              class="ck_buttom"
              @click="buyNow"
              >立即购买</van-button
            >
          </div>
          <div class="newarr1" v-else>
            <van-button
              color="#416FAE"
              plain
              round
              @click="downloadload"
              class="ck_buttom"
              >立即下载</van-button
            >
            <van-button
              color="linear-gradient(to right, #416FAE, #27508C)"
              round
              class="ck_buttom"
              @click="updateNow(introduces)"
              >更换新LOGO</van-button
            >
          </div>
        </div>
        <div class="c_item cite" v-show="status == 2">
          <van-button
            color="linear-gradient(to right, #416FAE, #27508C)"
            round
            class="ck_buttom"
            @click.stop="downloadload"
            >立即下载</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import { mapActions } from "vuex"
export default {
  name: "detailsList",
  data() {
    return {
      tabs: [
        { watchId: 1, name: "商品 ", name1: "商品" },
        { watchId: 2, name: "详情 ", name1: "详情" },
        { watchId: 3, name: "评价 ", name1: "评价" },
        { watchId: 4, name: "推荐 ", name1: "推荐" },
      ],
      active: 0,
      current: 0,
      downoverlay: false,
      up: false,
      introduces: {},
      moreComment: [],
      page: 0,
      shop_list: [],
      limit: '',
      shopCart: [],  // 未登录时的空购物车
      goods_id: '',
      num: 1, // 做购物车来源判断   1. 详情 单件 2. 购物车
      goods: [],
      is_collect: '',
      collected: '未收藏',
      status: 1,
      downloadFile: {},
      downloaded: [],
      images: [],
      is_share: 0,
      type: '',
      is_number: true,
      admin_id: '',
    };
  },
  created() {
    const routeParams = this.$route.query;
    this.goods_id = routeParams.goods_id
    this.type = routeParams.type
    this.getIntroduces()
    this.getShop_list();
    this.getlimes()
    let obj = window.location.href
    console.log(obj);
    if (obj.indexOf('&') != -1) {
      let art = obj.substring(obj.lastIndexOf('=') + 1);
      this.admin_id = art
    }
  },
  methods: {
    ...mapActions(['addStoreCount']),
    obcilid(id) {
      if (id == 0) {
        document.getElementById("first").scrollIntoView();
      } else if (id == 1) {
        document.getElementById("second").scrollIntoView();
      } else if (id == 2) {
        document.getElementById("third").scrollIntoView();
      } else if (id == 3) {
        document.getElementById("four").scrollIntoView();
      }
    },
    onChange(index) {
      this.current = index;
    },
    ups() {
      this.up = !this.up;
      if (this.up) {
        this.is_share = 1
      } else {
        this.is_share = 0
      }
    }, // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    toDetails(id) {
      this.$router.push({ path: '/detailsList', query: { goods_id: id } })
    },
    getIntroduces() {  // 获取详情
      this.postRequest('api/goods/goodsInfo', {
        goods_id: this.goods_id
      }).then(res => {
        this.introduces = res.data.data
        this.goods = res.data.data.goods || ''
        this.status = res.data.data.status; // 是否为付费
        this.is_collect = res.data.data.is_collect
        this.images = res.data.data.images
        this.lookallpraise()
      }).catch(err => {
        console.log(err)
        Toast.fail(err.msg)
      })
    },
    lookallpraise() { // 查看更多评论
      this.page++
      this.postRequest("api/evaluate/evaluateList", {
        goods_id: this.goods_id,
        page: this.page
      }).then(res => {
        if (res.data.data.length > 0) {
          this.moreComment = this.moreComment.concat(res.data.data);
          console.log(res);
        } else {
          if (this.page != 1) {
            Toast('没有更多评论了')
          }
        }
      }).catch(err => {
        console.log(err);
        Toast.fail(err.msg)
      })
    },
    DialogLogin() {
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
    },
    freshed() {    // 换一组
      this.shop_list = [];
      this.getShop_list();
    },
    goDetailsList(item) {   // 点击商品，跳转商品详情
      this.goods_id = item.id
      this.getIntroduces()
      window.scrollTo(0, 0);
    },
    richesHandle(data) {   // 富文本处理
      let fn_result = data
      fn_result = fn_result.replace(/()/g, "");
      fn_result = fn_result.replace(/(&nbsp;)/g, "");
      fn_result = fn_result.replace("<html><head><title></title></head><body>", "");
      fn_result = fn_result.replace("</body></html>", "")
      return fn_result;
    },
    buyNow() {      // 立即购买
      // alert(this.admin_id, "admin_id")
      let that = this
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        console.log(that.goods_id);
        that.$router.push({
          path: "/confirmOrder",
          query: {
            routeParams: JSON.stringify({
              goods_id: that.goods_id,
              num: that.num,
              admin_id: that.admin_id  // 用于分销
            })
          }
        });
      } else {
        this.DialogLogin()
      }

    },
    async addCart(item) {  // 加入购物车
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      let shopCart = JSON.parse(localStorage.getItem('shopCart'))
      let shopCartID = JSON.parse(localStorage.getItem('shopCartID'))
      if (token) {
        try {
          const { data } = await this.postRequest("api/sundry/addCar", {
            goods_id: item.id
          })
          if (data.code == 1) {
            Toast.success(data.msg);
            this.getgoucar()
          } else {
            Toast.fail(data.msg);
          }
        } catch (err) {
          Toast.fail(err.msg);
          this.getgoucar()
        }

      } else {
        if (shopCartID) {
          if (shopCartID.indexOf(item.id) == -1) {
            shopCart.push(item)
            shopCartID.push(item.id)
            Toast.success('已放入购物车');
          } else {
            Toast.fail("该商品已添加购物车");
          }
          console.log(shopCart);
          localStorage.setItem('shopCart', JSON.stringify(shopCart))
          localStorage.setItem('shopCartID', JSON.stringify(shopCartID))
        } else {
          let obj = []
          let ary = []
          obj.push(item)
          ary.push(item.id)
          localStorage.setItem("shopCart", JSON.stringify(obj))
          localStorage.setItem("shopCartID", JSON.stringify(ary))
          Toast.success("已放入购物车");
        }

      }

    },
    async toggleStatus() {     // 添加收藏 取消收藏
      let that = this
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        if (that.is_collect == 1) {
          const { data } = await that.postRequest("api/sundry/addGoodsCollect", {
            goods_id: that.goods_id
          })
          if (data.code == 1) {
            Toast.success(data.msg);
            that.is_collect = 0;
            this.getIntroduces()
            // console.log("点击取消", that.is_collect);
          }

        } else {
          const { data } = await that.postRequest("api/sundry/addGoodsCollect", {
            goods_id: that.goods_id
          });
          if (data.code == 1) {
            Toast.success(data.msg);
            that.is_collect = 1;
            this.getIntroduces()
            // console.log("点击状态", that.is_collect);
          }

        }
      } else {
        this.DialogLogin()
      }

    },
    getShop_list() {
      this.postRequest("api/goods/randGoods", {
        limit: this.limit
      }).then(res => {
        // console.log(res.data.data)
        this.shop_list = res.data.data
      }).catch(err => {
        console.log(err)
        Toast.fail(err.msg)
      })
    },
    allChildMore() {
      this.$router.push({ path: '/detailsChildList', query: { goods_id: this.goods_id } })
    },
    wechat() {
      this.visible = !this.visible
    },
    onCopy(e) {     // 点击复制
      console.log(e);
    },
    shareWeibo() {      // 分享到微博
      window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=口袋商品&pic=图片&appkey=微博平台申请的key');
    },
    sharefacebook() {  // 分享facebook
      window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(document.location.href) + '&t=' + encodeURIComponent(document.title), '_blank', 'toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350'); void (0)
    },
    async getgoucar() {
      const {
        data: { data }
      } = await this.postRequest("api/user/car");
      console.log(data);
      this.addStoreCount(data.total)
    },
    async downloadload() {     // 立即下载
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        this.downoverlay = !this.downoverlay;
        const {
          data: { data }
        } = await this.postRequest("api/goods/getGoodsFile", {
          goods_id: this.goods_id
        });
        console.log(this.downloaded);
        this.downloaded = data.list;
        this.downloadFile = data;
        console.log("下载文件详情", data.list, data.list.length);
      } else {
        this.DialogLogin()
      }
    },
    // 弹窗内的文件下载
    async loadfile() {
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        await this.postRequest("api/goods/downloadGoodsFile", { goods_id: this.goods_id })
          .then(res => {
            console.log(res);
            let url = res.data.data;
            window.location.href = "https://glaforteachers.com" + url;
            Toast.success("下载成功");
            this.downoverlay = !this.downoverlay;
          })
          .catch(err => {
            console.log(err);
            Toast.fail("下载失败");
          });
      } else {
        this.DialogLogin()
      }
    },
    // -------------------------------------------
    updateNow(item) {
      let token = JSON.parse(window.localStorage.getItem('kou_token'))
      if (token) {
        let that = this
        let status = item.status
        let goods_id = item.id
        let is_number = this.is_number
        if (is_number) {
          Dialog.confirm({
            title: '温馨提示',
            message: '新LOGO会覆盖旧LOGO，请在更换前及时下载并保存好旧LOGO的教案。若后续教案内容有更新，仅支持重新免费下载最新LOGO版的教案。',
          })
            .then(() => {
              that.$router.push({
                path: "/confirmOrder",
                query: {
                  routeParams: JSON.stringify({
                    goods_id: goods_id,
                    num: that.num,
                    status: status,
                    logo: 2
                  })
                }
              });
            })
            .catch(() => {

            });
        } else {
          Toast.fail('您已达到更换LOGO次数上限')
        }
      } else {
        this.DialogLogin()
      }

    },
    async getlimes() {// 获取更换次数
      try {
        const {
          data: { data }
        } = await this.postRequest("api/order_logo/checkChangeLogo", {
          goods_id: this.goods_id
        });
        console.log(data);
        this.is_number = data
      } catch (err) {
        console.log(err);
        Toast.fail(err.msg)
      }
    },
  }
} 
</script>

<style scoped lang='less'>
.container {
  position: relative;
  .boxtop {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 60px;
    z-index: 100;
    .posie {
      width: 100%;
      display: flex;
      align-items: center;
      height: 60px;
      background-color: #fff;
      padding: 0 16px;
      box-sizing: border-box;

      .arrow_left {
        z-index: 20;
        width: 20px;
        height: 60px;
        display: flex;
        align-items: center;
        img {
          width: 20px;
          height: 20px;
        }
      }
      .item {
        flex: 1;
      }
    }
  }
  .top {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    position: relative;
    background-color: #f5f5f5;

    .content_title {
      width: 100%;
      background-color: #fff;
      .swipeIMG {
        height: 248px;
      }
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
        width: 750px;
        height: 100%;
      }
      .title_ {
        padding: 5px 16px;
        box-sizing: border-box;
        p {
          font-size: 16px;
          // font-weight: 600;
          color: #2c2c2c;
          line-height: 22px;
        }
      }
      .pay_ {
        padding: 6px 16px 16px;
        box-sizing: border-box;
        width: 100%;
        .public {
          width: 100%;
          display: flex;
          align-items: center;
          p {
            color: #999999;
            font-size: 14px;
            line-height: 40px;
          }
          .itel {
            width: 70px;
          }
          .ite {
            flex: 1;
            text-align: right;
            color: #000;
            font-size: 14px;
            line-height: 40px;
          }
        }
        .pay_price {
          p {
            .iconPricre {
              font-size: 14px;
              color: #ff0000;
            }
            .sparn {
              color: #ff0000;
              font-size: 22px;
            }
            del {
              font-size: 14px;
              color: #ccc;
              margin-left: 5px;
            }
          }
          p:nth-child(2) {
            // margin: 0 5px;
          }
        }

        .pay_total {
          p:nth-child(1) {
            font-size: 14px;
          }
        }
      }
    }
    // 子列表
    .content_title {
      // margin-top: 10px;
      width: 100%;

      .titles {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        box-sizing: border-box;

        p {
          font-size: 16px;
          font-weight: 600;
          color: #3d444d;
          line-height: 60px;
        }
        p:nth-child(2) {
          font-size: 16px;
          color: #666666;
          line-height: 60px;
        }
      }
      .top_four_ {
        background-color: #f9f9f9;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding: 0 8px;
        box-sizing: border-box;

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
                border-radius: 6px 0 0 0;
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
                color: #ccc;
                font-size: 8px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
    // 内容介绍
    .cont_title {
      margin-top: 12px;
      padding: 12px 20px;
      box-sizing: border-box;
      width: 100%;
      background-color: #fff;
      .contjs {
        font-size: 16px;
        font-weight: bold;
        color: #3d444d;
        line-height: 28px;
      }
    }
    // 累计评价
    .cont_raise {
      margin-top: 12px;
      padding: 12px 20px;
      box-sizing: border-box;
      background-color: #fff;

      .top_num {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .contjs {
          line-height: 28px;
          font-size: 16px;
          color: #3d444d;
          font-weight: bold;
          .nunber {
            color: #416fae;
          }
        }
        .all {
          color: #999999;
          font-size: 14px;
          line-height: 28px;
        }
      }
      .star_ {
        .star_top {
          height: 60px;
          .stars {
            display: flex;
            align-items: center;
            p {
              font-size: 16px;
              line-height: 30px;
              color: #999999;
              margin: 0 10px;
              span {
                color: #ff0000;
                font-weight: 600;
                font-size: 16px;
                margin-left: 10px;
              }
            }
          }
          .stars_ele {
            font-size: 16px;
            line-height: 30px;
            color: #ff0000;
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
            border-radius: 50%;
          }
          .right_item {
            margin-left: 15px;
            height: 44px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
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
      // margin-top: 20px;
      width: 100%;
      padding: 16px 0 100px;
      box-sizing: border-box;
      .top_r_title {
        padding: 0 20px;
        box-sizing: border-box;
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
        background-color: #f5f5f5;
        padding: 0 8px;
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
                border-radius: 6px 0 0 0;
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
                color: #ccc;
                font-size: 8px;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }

    .wrapper {
      display: flex;
      margin-top: -70px;
      align-items: flex-end;
      justify-content: center;
      height: 100%;
      z-index: 5;
      .block {
        width: 343px;
        height: 81px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        border-radius: 16px;
        .share {
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;

          img {
            width: 36px;
            height: 36px;
          }
          p {
            font-size: 12px;
            line-height: 29px;
            color: #3d444d;
          }
        }
      }
    }
  }
  .ddr {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.6);
    z-index: 106;

    .wrapper_ {
      width: 90%;
      margin: 50px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 5;
      box-sizing: border-box;

      .block_ {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        border-radius: 8px;
        padding: 0 0 10px;
        overflow-x: hidden;
        overflow-y: scroll;

        .down_top {
          background-color: #416fae;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 44px;
          padding: 0 10px;
          box-sizing: border-box;
          border-radius: 7px 7px 0 0;
          p {
            color: #fff;
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
          }
          span {
            color: #666666;
            font-size: 14px;
          }
          img {
            width: 24px;
            height: 24px;
          }
        }
        .ims {
          width: 100%;
          img {
            width: 100%;
            height: 214px;
          }
        }
        .box_items {
          padding: 16px 16px 0;
          box-sizing: border-box;
          width: 100%;
          // flex: 1;
          display: flex;
          flex-direction: column;

          .book_title {
            display: flex;
            align-items: center;
            height: 22px;

            img {
              width: 16px;
              height: 16px;
            }
            p {
              color: #2c2c2c;
              font-size: 16px;
              line-height: 22px;
              margin: 0 10px;
              font-weight: 600;
            }
            p:nth-child(3) {
              color: #999999;
              font-size: 14px;
              line-height: 22px;
            }
          }
          .dasded {
            margin-top: 10px;
            width: 100%;
            height: 0;
            border-bottom: 2px solid #d9e2ef;
            .items {
              width: 80px;
              height: 0;
              border-bottom: 4px solid #416fae;
            }
          }
          .list_book {
            width: 100%;
            height: 200px;
            box-sizing: border-box;
            padding-top: 10px;
            box-sizing: border-box;
            overflow-y: scroll;
            overflow-x: hidden;
            background-color: #fff;

            .books {
              display: flex;
              align-items: center;
              img {
                width: 24px;
                height: 24px;
              }
              p {
                margin-left: 15px;
                color: #666666;
                font-size: 15px;
                line-height: 35px;
              }
            }
          }
        }

        .down_btns {
          position: fixed;
          bottom: 20px;
          left: 0;
          margin: 0 auto;
          width: 100%;

          .bttns {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .vanbutton {
              width: 40%;
              margin: 10px;
            }
          }
        }
      }
    }
  }
  // 按钮组
  .btns {
    padding: 5px 5px;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
    bottom: 0px;
    z-index: 10;
    background-color: #fff;
    .bottoms {
      display: flex;
      align-items: center;
      width: 100%;

      .idv {
        width: 110px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left_1 {
          flex: 1;
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
          p {
            font-size: 12px;
            line-height: 30px;
            color: #666666;
          }
          .is_sharecolor {
            color: #416fae;
          }
        }
      }
      .c_item {
        flex: 1;
        display: flex;
        align-items: center;
        .newarr1 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 64px;
          .ck_buttom {
            flex: 1;
            margin: 0 3px;
          }
        }
        .newarr2 {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .ck_buttom {
            flex: 1;
            margin: 0 3px;
          }
        }
      }
      .cite {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;
        box-sizing: border-box;
        .ck_buttom {
          width: 115px;
        }
      }
    }
  }
}
</style>
<style>
.listContent img {
  display: block;
  margin: 0 auto;
  max-width: 100% !important;
  height: auto !important;
}

.listContent p {
  max-width: 100%;
  word-break: break-all;
  font-size: 16px !important;
}

.listContent span {
  max-width: 100%;
  word-break: break-all;
  font-size: 16px !important;
}

table {
  max-width: 100%;
}
video {
  max-width: 100% !important;
}
</style>