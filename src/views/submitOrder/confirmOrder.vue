<template>
  <div class="container">
    <van-nav-bar
      title="确认订单"
      left-arrow
      @click-left="goBackFn"
      class="fixedtop"
    />
    <div class="confirmOrder">
      <div class="row_one">
        <div class="pay_title">
          <img src="../../assets/img/icon_50@2x.png" alt />
          <p>选择付款方式</p>
        </div>
        <div class="pay_box">
          <div class="public chat" @click.stop="weChat">
            <img src="../../assets/img/icon_53@2x.png" v-if="changed1" alt />
            <img src="../../assets/img/yuan.png" v-else alt />
            <img src="../../assets/img/icon_51@2x.png" alt />
            <p>微信</p>
          </div>
          <div class="public zhifubao" @click.stop="aliPay">
            <img src="../../assets/img/icon_53@2x.png" v-if="changed2" alt />
            <img src="../../assets/img/yuan.png" v-else alt />
            <img src="../../assets/img/icon_51@2x(1).png" alt />
            <p>支付宝</p>
          </div>
          <div class="public balance" @click.stop="Balance">
            <img src="../../assets/img/icon_53@2x.png" v-if="changed3" alt />
            <img src="../../assets/img/yuan.png" v-else alt />
            <img src="../../assets/img/icon_52@2x.png" alt />
            <p>
              余额
              <span>{{ money != 0 ? money : "0" }}元</span>
            </p>
          </div>
        </div>
      </div>
      <div class="row_two">
        <div class="pay_title">
          <img src="../../assets/img/set (1)@2x.png" alt />
          <p>选择LOGO设置</p>
        </div>
        <div class="small_prompt">
          <span>*</span>
          <p>
            点预览效果上传LOGO，满意预览效果后再付款，虚拟商品不支持退费，请您理解
          </p>
        </div>
        <div class="change_logo">
          <div class="public_" @click.stop="changeLogo">
            <img src="../../assets/img/icon_53@2x.png" v-if="changed4" alt />
            <img src="../../assets/img/yuan.png" v-else alt />
            <p>授权专属LOGO</p>
            <img
              src="../../assets/img/icon_55@2x.png"
              alt
              @click.stop="dislogicon"
            />
          </div>
          <div
            class="public_"
            :class="disabledfalse == true ? 'disabledTrue' : ''"
            @click="changeKDlogo"
          >
            <img
              src="../../assets/img/icon_53@2x.png"
              v-if="changed5 && disabledfalse == false"
              alt
            />
            <img
              src="../../assets/img/ccc.png"
              v-if="disabledfalse == true && changed4 == true"
              alt
            />
            <img
              src="../../assets/img/yuan.png"
              v-if="changed5 == false && disabledfalse == false"
              alt
            />
            <p>使⽤⼝袋宇宙LOGO</p>
          </div>
          <div class="ck">
            <van-button
              color="linear-gradient(to right, #416FAE, #27508C)"
              style="width: 128px"
              round
              @click="onpreviewlogo"
              >预览效果</van-button
            >
          </div>
        </div>
      </div>
      <div class="detail" v-show="reqParams.num == 1">
        <div class="row_three">
          <div class="order_rig">
            <div class="order_img">
              <img :src="storeListDetail.image" alt />
              <div class="pos">
                <div
                  class="flash_sale"
                  v-if="storeListDetail.reduced_price != 0"
                >
                  <div class="sale">
                    <span>限时特惠</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="order_cont">
              <p class="t_text">{{ storeListDetail.name }}</p>
            </div>
          </div>
          <div class="pay_way">
            <div class="price_red">
              <del v-if="storeListDetail.reduced_price > 0">{{
                storeListDetail.price == "免费"
                  ? ""
                  : "￥" + storeListDetail.price
              }}</del>
              <span class="iconPrice" v-if="storeListDetail.price != '免费'"
                >￥</span
              >
              <span class="span">{{
                storeListDetail.reduced_price == 0
                  ? storeListDetail.price
                  : storeListDetail.reduced_price
              }}</span>
            </div>
            <div class="logo_" @click="onchangestore">
              <img
                src="../../assets/img/changefang.png"
                v-if="changestore"
                alt
              />
              <img src="../../assets/img/fang.png" v-else alt />
              <p>授权专属LOGO（{{ logomoney }}元/个）</p>
              <img
                src="../../assets/img/icon_55@2x.png"
                alt
                @click="dislogicon"
              />
            </div>
          </div>
        </div>
      </div>
      <!--  购物车过来的 -->
      <div class="shopCar" v-show="reqParams.num == 2">
        <div
          class="row_three"
          v-for="(item, index) in storeListShopCar"
          :key="index"
        >
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
            <div class="price_red">
              <del v-if="item.reduced_price > 0">{{
                item.price == "免费" ? "" : "￥" + item.price
              }}</del>
              <span class="iconPrice" v-if="item.price != '免费'">￥</span>
              <span class="span">{{
                item.reduced_price == 0 ? item.price : item.reduced_price
              }}</span>
            </div>
            <div class="logo_" @click.stop="onchange(index)">
              <img
                src="../../assets/img/changefang.png"
                v-if="item.is_authorize_logo == 1"
                alt
              />
              <img src="../../assets/img/fang.png" v-else alt />
              <p>授权专属LOGO（{{ logomoney }}元/个）</p>
              <img
                src="../../assets/img/icon_55@2x.png"
                alt
                @click.stop="dislogItem(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bbx" v-if="showLOGO">
      <van-nav-bar title="更换LOGO" @click-left="goBackFn" class="fixedtop2">
        <template #right>
          <img
            src="@/assets/img/icon_66@2x.png"
            class="cuowu"
            @click.stop="onClickRight"
            alt
          />
        </template>
      </van-nav-bar>
      <div class="wrape">
        <div class="change_lg">
          <div class="items_img">
            <van-uploader
              class="items"
              v-model="fileList"
              upload-text="上传LOGO 长宽比1:1"
              :after-read="afterRead"
              :max-count="1"
            />
          </div>
          <van-button
            @click="fnshowcuowu"
            color="linear-gradient(to right, #416FAE, #27508C)"
            style="width: 154px"
            round
            class="ck"
            >预览</van-button
          >
          <p>
            <span>*</span
            >请上传正方形LOGO，图片不小于148*148。满意预览效果后再付款，虚拟商品不支持退费，请您理解。如遇其他问题，可联系小口袋微信：shucai_001，帮您解决！
          </p>
        </div>
      </div>
    </div>
    <div class="row_four">
      <div class="pay_">
        <div class="store_total public" v-if="logo != 2">
          <p>
            共
            <span>{{ extra.goods_num }}</span> 件商品
          </p>
          <p class="pblack">
            <span class="span">￥</span>
            <span class="money">{{ extra.price }}</span>
          </p>
        </div>
        <div class="store_discount public" v-if="logo != 2">
          <p>优惠券</p>
          <p class="pblack">
            <span class="span" style="font-size: 12px">￥</span>
            <span class="money">{{ extra.face_value }}</span>
          </p>
        </div>
        <div class="store_discount public" v-if="logo != 2">
          <p>折扣</p>
          <span class="del">
            <span class="span">￥</span>
            <span class="money">{{ extra.discount }}</span>
          </span>
        </div>
        <div class="pay_total public">
          <p>合计</p>
          <p class="pt">
            <span class="span" v-if="totalmoney != 0">￥</span>
            <span class="money">{{ totalmoney }}</span>
          </p>
        </div>
        <van-button
          v-if="logo == 2"
          color="linear-gradient(to right, #416FAE, #27508C)"
          size="large"
          round
          @click="submitOrdelogo"
          >提交订单</van-button
        >
        <van-button
          v-else
          color="linear-gradient(to right, #416FAE, #27508C)"
          size="large"
          round
          @click="submitOrder"
          v-model="submit"
          >{{ submit }}</van-button
        >
      </div>
    </div>
    <div class="showpreview" v-if="showcuowu" @click.stop="fnshowcuowu">
      <div class="loading" v-if="url == '' && changed4">
        <van-loading type="spinner" size="48px" color="#416FAE"></van-loading>
      </div>
      <div class="wrappedr" v-else>
        <div class="block" @click.stop>
          <img :src="url" alt class="IMGS1" v-if="url != ''" />
          <van-swipe
            :loop="false"
            class="my_swipe"
            :autoplay="3000"
            v-if="images.length != 0"
            indicator-color="white"
          >
            <van-swipe-item v-for="(item, index) in images" :key="index">
              <img style="width: 100%" :src="item" alt />
            </van-swipe-item>
          </van-swipe>
          <div class="my_swipe" v-else>
            <!-- <img src="../../assets/img/icon_45@2x.png" class="imgs5" alt /> -->
          </div>
          <div class="bittn">
            <van-button color="#27508C" plain round class="btn" @click="togo"
              >确认使用</van-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Toast, Dialog } from 'vant';
export default {
  name: "confirmOrder",
  data() {
    return {
      changestore: true,
      storeListDetail: {},
      storeListShopCar: [],
      extra: {},
      total: '',
      changedStatus: '',  //对提交订单做区分  1.商品详情  2. 购物车   
      data: '',
      car_id: '',
      submit: " 提交订单",
      changed1: true,
      changed2: false,
      changed3: false,
      changed4: true,
      changed5: false,
      show: false,
      images: [],
      reqParams: {
        data: '',
        goods_id: '',
        num: '',
        pay_type: "wechat", // 支付类型 wechat=微信支付  alipay=支付宝,balance=余额支付
        is_authorize_logo: 1, //  是否授权logo
        logo_image: "", //是否授权logo
        coupons_id: "", //优惠券id
        ueer_cpupons_id: "", //用户优惠券id
        coupons_price: "", //优惠券优惠金额
        admin_id: '',
      },
      logomoney: '',
      totalmoney: '',
      listid: [],
      showLOGO: false,
      fileList: [],
      upload: 2,
      url: '',
      id: '',
      showcuowu: false,
      rightText: require('@/assets/img/icon_66@2x.png'),
      money: '',
      status: '',
      logo: 0,
      disabled: false,
      order_logo_id: '',
      previewNum: 1,
      disabledfalse: false,
      newarrayPrice: '',
      whick:'',
    };
  },
  created() {
    let routeParams = JSON.parse(this.$route.query.routeParams);
    console.log(routeParams);
    this.whick = routeParams.whick
    this.reqParams.num = routeParams.num || ''
    this.reqParams.admin_id = routeParams.admin_id
    this.car_id = routeParams.car_id || ''
    this.reqParams.data = routeParams || ''  // 商品详情传过来的参数
    this.reqParams.goods_id = routeParams.goods_id || ''
    this.logo = routeParams.logo
    this.status = routeParams.status
    this.getStoreList();
    if(routeParams.whick){
        this.getimagesList()
    }else {
        this.getimages()
    }
    this.getInformation()
    if (this.logo == 2) {
      this.changelogomoney()
      this.disabledfalse = true

    } else {
      this.changelogomoney()

    }
  },
  methods: {
    goBackFn() {      // 回到上一步
      this.$router.go(-1);
    },
    onchangestore() {  // 商品详情logo切换
      if (this.logo != 2) {
        if (this.changestore) {
          this.changestore = !this.changestore
          this.reqParams.is_authorize_logo = 2
        } else {
          this.changestore = !this.changestore
          this.reqParams.is_authorize_logo = 1
        }
        this.changed4 = !this.changed4
        this.changed5 = !this.changed5
        if (this.changed5) {
          this.url = ''
        }
        this.totalNUM()
      }
    },
    changeLogo() {
      if (this.logo != 2) {
        if (this.reqParams.num != 2) {
          if (this.changed4) {
            this.changestore = !this.changestore
            this.changed4 = !this.changed4
            this.changed5 = !this.changed5
            this.reqParams.is_authorize_logo = 2
          } else {
            this.changestore = !this.changestore
            this.changed4 = !this.changed4
            this.changed5 = !this.changed5
            this.reqParams.is_authorize_logo = 1
          }
        } else {
          if (this.changed4) {
            this.changed4 = !this.changed4
            this.changed5 = !this.changed5
            let list = this.storeListShopCar
            this.dated = []
            let arr = []
            list.forEach(value => {
              // value.is_authorize_logo = 0   尝试
              value.is_authorize_logo = 2
              let obj = {}
              obj.is_authorize_logo = value.is_authorize_logo
              obj.goods_id = value.id
              arr.push(obj)
            })
            this.dated = arr
            this.storeListShopCar = list
          } else if (this.changed5) {
            this.changed4 = !this.changed4
            this.changed5 = !this.changed5
            let list = this.storeListShopCar
            this.dated = []
            let arr = []
            list.forEach(value => {
              value.is_authorize_logo = 1
              let obj = {}
              obj.is_authorize_logo = value.is_authorize_logo
              obj.goods_id = value.id
              arr.push(obj)
            })
            this.dated = arr
            this.storeListShopCar = list
          }
        }
        if (this.changed5) {
          this.url = ''
        }
        this.totalNUM()
      }
    },
    changeKDlogo() {
      if (this.logo != 2) {
        if (this.reqParams.num != 2) {
          if (this.changed5) {
            this.changed5 = !this.changed5
            this.changed4 = !this.changed4
            this.changestore = !this.changestore
            this.reqParams.is_authorize_logo = 1
          } else {
            this.changed5 = !this.changed5
            this.changed4 = !this.changed4
            this.changestore = !this.changestore
            this.reqParams.is_authorize_logo = 2
          }
        } else {
          if (this.changed4) {
            this.changed4 = !this.changed4
            this.changed5 = !this.changed5
            let list = this.storeListShopCar
            this.dated = []
            let arr = []
            list.forEach(value => {
              // value.is_authorize_logo = 0 尝试
              value.is_authorize_logo = 2
              let obj = {}
              obj.is_authorize_logo = value.is_authorize_logo
              obj.goods_id = value.id
              arr.push(obj)
            })
            this.dated = arr
            this.storeListShopCar = list
          } else if (this.changed5) {
            this.changed4 = !this.changed4
            this.changed5 = !this.changed5
            let list = this.storeListShopCar
            this.dated = []
            let arr = []
            list.forEach(value => {
              value.is_authorize_logo = 1
              let obj = {}
              obj.is_authorize_logo = value.is_authorize_logo
              obj.goods_id = value.id
              arr.push(obj)
            })
            this.dated = arr
            this.storeListShopCar = list
          }
        }
        if (this.changed5) {
          this.url = ''
        }
        this.totalNUM()

      }

    },
    async totalNUM() {   // 合计
      let that = this
      let obj = {}
      obj.goods_id = that.reqParams.goods_id
      obj.is_authorize_logo = that.reqParams.is_authorize_logo
      if (that.reqParams.num == 1) {
        try {
          const { data: { data } } = await that.postRequest("api/order/getTotal", { data: obj });
          that.extra = data;
          that.totalmoney = data.total
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("京这里来了that.newarrayPrice", that.newarrayPrice);
        try {
          const { data: { data } } = await that.postRequest("api/order/getTotal", that.dated);
          that.extra = data;
          that.totalmoney = data.total
          that.newarrayPrice = that.dated
          that.dated = []
          console.log(that.newarrayPrice, "newarrayPrice");
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }
    },
    fn() {
      this.show = !this.show;
    },
    async getStoreList() {
      if (this.reqParams.num == 1) {
        const {
          data: { data }
        } = await this.postRequest("api/order/order", { goods_id: this.reqParams.goods_id, is_authorize_logo: 2 });
        this.storeListDetail = data.data;
        this.changedStatus = 1;
        this.reqParams.goods_id = data.data.id
        console.log(data, "详情");
        if (this.logo != 2) {
          this.totalNUM()
        }
      } else {
        let newarrd = []
        let listid = this.listid
        const {
          data: { data }
        } = await this.postRequest("api/order/carOrder", { car_id: this.car_id.join(',') });
        this.changedStatus = 2;
        data.data.forEach((value) => {
          value.is_authorize_logo = 1
          listid.push(value.id)
          value.updownbox = 0
          let ary = {}
          ary.goods_id = value.id
          ary.is_authorize_logo = value.is_authorize_logo
          newarrd.push(ary)
        })
        this.dated = newarrd
        this.listid = listid
        this.id = data.data[0].id
        this.storeListShopCar = data.data;
        console.log(data);
        console.log(this.dated, "dated");
        if (this.logo != 2) {
          this.totalNUM()
        }
      }
    },
    onchange(send) { // 数组数据单选
      let list = this.storeListShopCar
      let listid = this.listid
      this.dated = []
      let newary = []
      list.forEach((item, index) => {
        if (index == send) {
          if (item.is_authorize_logo == 2) {
            item.is_authorize_logo = 1
            if (listid.indexOf(item.id == -1)) {
              listid.push(item.id)
            }
          } else {
            item.is_authorize_logo = 2
            let k = listid.indexOf(item.id)
            if (k != -1) {
              listid.splice(k, 1)
            }
          }
        }
        let onj = {}
        onj.goods_id = item.id
        onj.is_authorize_logo = item.is_authorize_logo
        newary.push(onj)
      })
      if (listid.length == list.length) {
        this.changed4 = true
        this.changed5 = false
      } else if (listid.length != 0) {
        this.changed4 = true
        this.changed5 = false
      } else {
        this.changed4 = false
        this.changed5 = true
      }
      this.dated = newary
      this.storeListShopCar = list
      this.listid = listid
      this.totalNUM()
      this.$forceUpdate()

    },
    onpreviewlogo() {
      if (this.changed4) {
        this.showLOGO = true
        // console.log('走这里了');
        // this.getimages()
      } else if (this.changed5) {
        this.showcuowu = !this.showcuowu
        if(this.whick){
            this.getimagesList()
        }else {
        this.getimages()
        }
      }
    },
    async afterRead(file) {
      var formdata = new FormData();
      formdata.append("file", file.file);
      this.upload = 1
      const { data } = await this.postRequest('api/common/upload', formdata)
      if (data.code == 0) {
        Toast.fail(data.msg)
      } else {
        this.url = data.data.url
        Toast.success(data.msg)
      }
    },
    fnshowcuowu() {
      this.showcuowu = !this.showcuowu
    },
    onClickRight() {
      this.showLOGO = !this.showLOGO
    },
    togo() {  // 确认使用
      console.log(this.url);
      this.reqParams.logo_image = this.url
      this.showLOGO = false
      this.showcuowu = !this.showcuowu
    },
    async submitOrder() {      // 提交订单
      if (this.changedStatus == 1) {
        if (this.reqParams.is_authorize_logo == 1 && this.reqParams.logo_image == '') {
          Toast.fail('请点击预览效果上传LOGO')
        } else {
          const {
            data: { data }
          } = await this.postRequest("api/order/addOrder", this.reqParams);
          this.order_id = data.order_id;
          this.order_num = data.order_num;
        }
      } else {   // 购物车劲来的 
        if (this.changed4) {
          if (this.reqParams.logo_image != '') {
            const {
              data: { data }
            } = await this.postRequest("api/order/addCarOrder", { data: this.newarrayPrice, car_id: this.car_id.join(','), pay_type: this.reqParams.pay_type, logo_image: this.reqParams.logo_image });
            this.order_num = data.order_num;
            this.order_id = data.order_id;
            this.newarrayPrice = [];
          } else {
            Toast.fail('请点击预览效果上传LOGO')
          }
        }
        if (this.changed5) {
          console.log(this.newarrayPrice, "this.newarrayPrice++++++++++");
          const {
            data: { data }
          } = await this.postRequest("api/order/addCarOrder", { data: this.newarrayPrice, car_id: this.car_id.join(','), pay_type: this.reqParams.pay_type, logo_image: this.reqParams.logo_image });
          this.order_num = data.order_num;
          this.order_id = data.order_id;
          this.newarrayPrice = [];
        }

      }
      if (this.reqParams.pay_type == "balance") {      //  订单支付
        await this.postRequest("api/order/orderPay", { order_id: this.order_id })
          .then(res => {
            if (res.data.code == 1) {
              Toast.success(res.data.msg);
              setTimeout(() => {
                this.$router.push({
                  path: "/myorder",
                  query: {
                    status: 3,
                  }
                });
              }, 1300);
              console.log(res.data);
            } else {
              Toast.fail("余额不足");
            }
          });
      } else if (this.reqParams.pay_type == "alipay") {
        this.alipayZFB()
      } else {
        this.getSubmitPage()
      }
    },
    async alipayZFB() {   // 支付宝支付
      const { data: { data } } = await this.postRequest(
        "api/order/orderPay", { order_id: this.order_id }
      )
      var { href } = this.$router.resolve({
        path: '/newpage',
        query: {
          htmls: data.result
        }
      });
      window.location.replace(href);
    },
    async getSubmitPage() {  // 微信支付
      const { data: { data } } = await this.postRequest(
        "api/order/orderPay", { order_num: this.order_num, order_id: this.order_id }
      );
      let url = data.mweb_url
      window.location.replace(url);

    },
    weChat() {
      if (this.changed1) {
        this.changed1 = !this.changed1
      } else {
        this.changed1 = !this.changed1
        this.reqParams.pay_type = 'wechat'
      }
      this.changed2 = false
      this.changed3 = false
      this.submit = "提交订单";

    },
    aliPay() {
      if (this.changed2) {
        this.changed2 = !this.changed2
      } else {
        this.changed2 = !this.changed2
        this.reqParams.pay_type = 'alipay'
      }
      this.changed1 = false
      this.changed3 = false
      this.submit = "提交订单";
    },
    Balance() {
      if (this.changed3) {
        this.changed3 = !this.changed3
      } else {
        this.changed3 = !this.changed3
        this.reqParams.pay_type = 'balance'
      }
      this.changed2 = false
      this.changed1 = false
      this.submit = "提交订单";

    },
     async getimagesList() {
      let idt = ''
      if (this.reqParams.num == 2) {
        idt = this.id
        console.log(this.id);
        console.log(this.dated);
      } else {
        idt = this.reqParams.goods_id
        console.log(idt);
        console.log(this.reqParams);
      }
        const { data } = await this.postRequest('api/goods/getGoodsImages', { goods_id: JSON.parse(this.$route.query.routeParams).car_idsss[0] })
      this.images = data.data
      this.showLOGO = false
      console.log('是这个破玩意儿嘛', data);
    },
    async getimages() {
      let idt = ''
      if (this.reqParams.num == 2) {
        idt = this.id
        console.log(this.id);
        console.log(this.dated);
      } else {
        idt = this.reqParams.goods_id
        console.log(idt);
        console.log(this.reqParams);
      }
      const { data } = await this.postRequest('api/goods/getGoodsImages', { goods_id: this.reqParams.goods_id})
      this.images = data.data
      this.showLOGO = false
      console.log('是这个破玩意儿嘛', data);
    },
    async getInformation() {    
      const {
        data: { data }
      } = await this.postRequest("api/user/getUserInfo");
      this.money = data.money
    },
    async changelogomoney() {
      try {
        const {
          data: { data }
        } = await this.postRequest('api/sundry/getLogoPrice');
        this.logomoney = data;
        if (this.logo == 2) {
          this.totalmoney = data;
        }
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async submitOrdelogo() {
      console.log(this.reqParams);
      let that = this
      if (that.reqParams.logo_image != '') {
        let obj = {}
        obj.goods_id = that.reqParams.goods_id
        obj.logo_image = that.reqParams.logo_image
        obj.pay_type = that.reqParams.pay_type
        console.log(obj);
        try {
          const {
            data
          } = await that.postRequest('api/order_logo/addOrderLogo', obj);
          console.log(data, "创建订单");
          if (data.code == 1) {
            var logoOrder = data.data.order_logo_id
          }
          if (obj.pay_type == 'wechat') {
            console.log(logoOrder, "logoOrder");
            const { data } = await this.postRequest(
              "api/order_logo/orderLogoPay",
              { order_logo_id: logoOrder }
            );
            console.log(data, "wechat");
            if (data.code == 1) {
              let url = data.data.mweb_url
              // window.location.replace(url);
              window.location.href = url;
            } else {
              Toast.fail('支付失败')
            }
          } else if (obj.pay_type == 'balance') {
            await this
              .postRequest("api/order_logo/orderLogoPay", { order_logo_id: logoOrder })
              .then(res => {
                console.log(res.data, "balance");
                if (res.data.code == 1) {
                  Toast.success(res.data.msg);
                  setTimeout(() => {
                    this.$router.push({
                      path: "/myorder",
                      query: {
                        status: 3,
                      }
                    });
                  }, 1500);
                  console.log(res.data);
                } else {
                  Toast.fail(data.msg);
                }
              });

          } else if (obj.pay_type == 'alipay') {
            const { data: { data } } = await this.postRequest(
              "api/order_logo/orderLogoPay", { order_logo_id: logoOrder }
            )
            console.log(data, "alipay");
            var { href } = this.$router.resolve({
              path: '/newpage',
              query: {
                htmls: data.result
              }
            });
            window.location.replace(href);
          }


        } catch (err) {
          console.log(err);
        }
      } else {
        Toast.fail("请先上传您的专属LOGO");
      }
    },
    dislogicon() {
      Dialog.alert({
        message: '授权后可以换上您的专属LOGO，让我们的原创成为您的原创',
        theme: 'round-button',
      }).then(() => {

      });
    },
    dislogItem() {
      Dialog.alert({
        message: '授权后可以换上您的专属LOGO，让我们的原创成为您的原创',
        theme: 'round-button',
      }).then(() => {

      });
    },

  }
}

</script>

<style lang="less" scoped>
.container {
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  .confirmOrder {
    width: 100%;
    background-color: #f5f5f5;
    padding: 76px 16px 16px;
    box-sizing: border-box;
    .pay_title {
      width: 100%;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
      p {
        font-size: 18px;
        line-height: 25px;
        margin-left: 10px;
      }
    }

    .row_one {
      padding: 16px;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 8px;
      .pay_box {
        .public {
          display: flex;
          align-items: center;
          height: 60px;
          img:nth-child(1) {
            width: 16px;
            height: 16px;
          }
          img:nth-child(2) {
            width: 28px;
            height: 28px;
            margin: 0 10px;
          }
          p {
            margin-left: 10px;
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          }
        }
      }
    }
    .row_two {
      padding: 16px;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 8px;
      .small_prompt {
        display: flex;
        margin-top: 20px;
        span {
          color: #ff0000;
          margin: 0 5px;
        }
        p {
          font-size: 13px;
          line-height: 18px;
        }
      }
      .change_logo {
        padding: 12px;
        box-sizing: border-box;
        .public_ {
          display: flex;
          align-items: center;

          height: 50px;
          img {
            width: 16px;
            height: 16px;
          }
          p {
            color: #333333;
            line-height: 20px;
            font-size: 14px;
            margin: 0 10px;
          }
          img:nth-child(3) {
            width: 20px;
            height: 20px;
          }
        }
        .disabledTrue {
          p {
            color: #ccc;
          }
        }
      }
      .ck {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .row_three {
      padding: 16px;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 8px;
      // margin-bottom: 20px;
      .order_rig {
        display: flex;
        // padding: 0 10px 10px;
        box-sizing: border-box;
        .order_img {
          width: 115px;
          position: relative;
          img {
            width: 100%;
            border-radius: 4px;
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
              border-radius: 4px 0 0 0;
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
          p {
            color: #666666;
            font-size: 14px;
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
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 10px;
        box-sizing: border-box;
        width: 100%;
        .price_red {
          text-align: right;
          padding: 5px 0;
          box-sizing: border-box;
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

        .logo_ {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          p {
            color: #416fae;
            font-size: 14px;
            line-height: 17px;
            margin: 0 5px;
          }
          img {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
  .row_four {
    background-color: #fff;
    .pay_ {
      padding: 16px;
      box-sizing: border-box;
      width: 100%;

      .public {
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          color: #666666;
          font-size: 16px;
          line-height: 30px;
        }
        .pblack,
        .del {
          .span {
            font-size: 12px;
          }
          .money {
            font-size: 16px;
          }
        }
      }
      .pay_total {
        margin-bottom: 20px;
        p:nth-child(1) {
          color: #2c2c2c;
          font-size: 16px;
          font-weight: 600;
        }
        p:nth-child(2) {
          color: #ff0000;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  .bbx {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333;
    z-index: 102;
    .fixedtop2 {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      border-bottom: 1px solid #f5f5f5;
      .cuowu {
        width: 20px;
        height: 20px;
      }
    }
    .wrape {
      width: 100%;
      height: 100%;
      background-color: #fff;
      padding-top: 60px;
      box-sizing: border-box;
      .change_lg {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 20px 30px;
        box-sizing: border-box;
        background-color: #fff;
        .items_img {
          position: relative;
          img {
            width: 176px;
            height: 176px;
            z-index: 1;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
        .ck {
          margin-top: 50px;
        }

        p {
          margin-top: 50px;
          font-size: 12px;
          line-height: 21px;
          span {
            color: #ff0000;
          }
        }
      }
    }
  }
  .showpreview {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #333;
    z-index: 103;

    // 遮罩层
    .wrappedr {
      width: 100%;
      display: flex;
      margin-top: 50px;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      .block {
        width: 307px;
        position: relative;
        .my_swipe {
          .imgs5 {
            width: 100%;
          }
        }
        .IMGS1 {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 38px;
          height: 38px;
          z-index: 2;
        }
        .prompt {
          position: absolute;
          bottom: -100px;
          left: 0px;
          font-size: 14px;
          line-height: 20px;
          color: #fff;
          span {
            color: #ff0000;
          }
        }
        .bittn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 30px;
          .btn {
            width: 154px;
          }
        }
      }
    }
    .loading {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 500px;
    }
  }
}
</style>