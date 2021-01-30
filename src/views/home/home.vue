<template>
  <div class="container">
    <div class="s_">
      <div class="fixedtop">
        <div class="logo">
          <img src="@/assets/img/logo@2x.png" alt />
          <div class="ck">
            <van-search
              v-model="value"
              shape="round"
              @focus="goSearch"
              placeholder="请输入搜索关键词"
            />
          </div>
        </div>
      </div>
      <div class="home_">
        <div class="top_one" :data="loop">
          <van-swipe class="my_swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item
              v-for="(item, index) in loop"
              :key="index"
              @click="onclickBanner(item)"
            >
              <img :src="item.image" alt />
            </van-swipe-item>
          </van-swipe>
        </div>
        <!-- 分类 年级-->
        <div class="top_two">
          <div class="classes public" @click="classes_down_box">
            <div class="public_title" :class="{ ind: active1 }">年级</div>
            <img src="../../assets/img/icon_down@2x(1).png" alt />
          </div>
          <div class="category public" @click="category_down_box">
            <div class="public_title" :class="{ ind: active2 }">分类</div>
            <img src="../../assets/img/icon_down@2x(1).png" alt />
          </div>
          <div class="price public" @click.stop="price_down_box">
            <div class="public_title" :class="{ ind: active3 }">价格</div>
            <img src="../../assets/img/icon_down@2x(1).png" alt />
          </div>
          <!-- 下拉框  年级-->
          <div class="classes_down_box" v-if="show" :data="classList">
            <div class="classes_list">
              <div
                class="all_class"
                @click="ckcheckALL"
                :class="checkedGrageAll == true ? 'activeStyle' : ''"
              >
                <span>全部</span>
              </div>
              <div
                class="all_class one"
                v-for="(item, index) in classList"
                :key="index"
                @click.stop="classItem(item, index)"
                :class="item.ckcheck == true ? 'activeStyle' : ''"
              >
                <span>{{ item.name }}</span>
              </div>
            </div>
            <div class="sure_btn" @click.stop="gradeTrue">确定</div>
          </div>
          <!-- 下拉框  分类 -->
          <div class="category_down_box" v-if="show_up" :data="category">
            <div class="category_list">
              <div
                class="public_cate"
                v-for="(item, index) in category"
                :key="index"
                @click.stop="goPublicTitleCate(item, index)"
                :class="cateAct == index ? 'actived' : ''"
              >
                <div class="public_title_cate">{{ item.name }}</div>
                <img src="../../assets/img/icon_down@2x(1).png" alt />
                <div class="category_down_box_list" v-if="show_cate">
                  <div class="_list">
                    <div
                      class="all_list"
                      @click.stop="onclickCateALL"
                      :class="checkedCateAll == true ? 'actives' : ''"
                    >
                      <span>全部</span>
                    </div>
                    <div
                      class="list_one"
                      v-for="(items, index1) in list"
                      :key="index1"
                      @click.stop="clickChangeCate(items, index1)"
                      :class="items.ckcheck == true ? 'actives' : ''"
                    >
                      <span>{{ items.name }}</span>
                    </div>
                  </div>
                  <div class="sure_btn" @click.stop="cateTrue">确定</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 下拉框  价格 -->
          <div class="price_down_box" v-if="show_price" :data="priceList">
            <div class="price_list">
              <div
                class="all_price"
                v-for="(item, index) in priceList"
                :key="index"
                @click.stop="priceChangeitem(item, index)"
                :class="item.ckcheck == true ? 'active' : ''"
              >
                <span>{{ item.name }}</span>
                <img
                  src="../../assets/img/icon_hot@2x.png"
                  v-if="item.is_hot == 1"
                  alt
                />
              </div>
            </div>
            <div class="sure_btn" @click.stop="priceTrue">确定</div>
          </div>
        </div>
        <!-- 分类列表 -->
        <div class="top_three">
          <div class="box">
            <div class="look" @click="selliu">
              <div class="lookleft" :class="{ itt: select_1 }">浏览量</div>
              <div class="lookright">
                <img src="../../assets/image/topsanjiao.png" alt />
                <img src="../../assets/image/downsanjiao.png" alt />
              </div>
            </div>

            <div class="look" @click="seltime">
              <div class="lookleft" :class="{ itt: select_2 }">上架时间</div>
              <div class="lookright">
                <img src="../../assets/image/topsanjiao.png" alt />
                <img src="../../assets/image/downsanjiao.png" alt />
              </div>
            </div>

            <div class="look" @click="selprice">
              <div class="lookleft" :class="{ itt: select_3 }">价格</div>
              <div class="lookright">
                <img src="../../assets/image/topsanjiao.png" alt />

                <img src="../../assets/image/downsanjiao.png" alt />
              </div>
            </div>

            <div class="look" @click="seltable">
              <div class="lookleft" :class="{ itt: select_4 }">教学进程表</div>
              <div class="lookright">
                <img src="../../assets/image/topsanjiao.png" alt />
                <img src="../../assets/image/downsanjiao.png" alt />
              </div>
            </div>
          </div>
        </div>
        <!-- 列表 -->
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          offset="10"
        > -->
        <div class="top_four" v-if="homeList.length != 0">
          <div
            class="list"
            v-for="(item, index) in homeList"
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
                <del v-if="item.reduced_price != 0">{{
                  item.price == "免费" ? "" : "￥" + item.price
                }}</del>
                <span class="iconPrice" v-if="item.price != '免费'">￥</span>
                <span class="span">{{
                  item.reduced_price == 0 ? item.price : item.reduced_price
                }}</span>
              </div>
            </div>
          </div>
          <div v-if="nomore == true" class="no_more">没有更多了</div>
        </div>
        <div class="elseimg" v-else>
          <img src="../../assets/img/img404.png" alt v-if="it_cloose == true" />
        </div>
        <!-- </van-list> -->
        <!-- 底部 -->
        <div class="top_five">
          <div class="photos">
            <div class="small_box">
              <div class="foot" @click="clickeEnterpublic">
                <img src="../../assets/img/icon_4.png" alt />
                <span>公众号</span>
              </div>
              <div class="foot" @click="zhuanpage">
                <img src="../../assets/img/icon_3.png" alt />
                <span>粉丝专页</span>
              </div>
              <div class="foot" @click="kecheng">
                <img src="../../assets/img/icon_2.png" alt />
                <span>线上课程</span>
              </div>
              <div class="foot" @click="faweibo">
                <img src="../../assets/img/icon_1.png" alt />
                <span>新浪微博</span>
              </div>
              <div class="foot" @click.stop="clickMiniProgramenter">
                <img src="../../assets/img/icon_5.png" alt />
                <span>小程序</span>
              </div>
            </div>
          </div>
          <!-- 备案内容 -->
          <div class="record" :data="footbox">
            <p v-for="item in footbox" :key="item">{{ item }}</p>
          </div>
        </div>
        <!--小智 -->
        <div class="top_six" @click.stop="goToAsh">
          <div class="ash">
            <div class="ash_ash">
              <img src="../../assets/img/icon_07@2x.png" alt />
            </div>
          </div>
        </div>
        <!-- 弹窗 -->
        <van-overlay :show="up">
          <div class="wrapper">
            <div class="block">
              <img :src="popup.image" alt />
              <!-- <img :src="popup.qrcode" alt /> -->
              <img
                src="../../assets/img/icon_66@2x.png"
                alt
                @click.stop
                @click="up = false"
              />
            </div>
          </div>
        </van-overlay>
      </div>
      <van-overlay :show="outpublic">
        <div class="wrapperwecode" @click.stop="clickOutpublic">
          <div class="block">
            <img :src="wechatcode1" alt />
          </div>
        </div>
      </van-overlay>
      <van-overlay :show="miniProgram">
        <div class="wrapperwecode" @click.stop="clickMiniProgramout">
          <div class="block">
            <img :src="codePublic" alt />
          </div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      show: false,
      show_up: false,
      show_price: false,
      show_cate: false,
      index: 0,
      up: false,
      show1: false,
      value: "",
      popup: {}, // 回顾2019
      homeList: [],  //列表
      loop: [], // 轮播
      category: [],
      categoryChildList: [],
      priceList: [],    // 价格
      classList: [],    //  班级列表
      checkList: [], // 价格点击选中
      gradeList: [], // 班级点击选中
      cateList: [],  //分类点击选中
      list: [],
      reqParams: {
        // response_type: "comment",
        keyword: "", // 关键字搜索
        grade: "", // 年级id
        category: "", // 分类id
        price: "", //价格筛选
        view_num: "", //	浏览量排序 1=降序,2=升序
        createtime: "", //	上架时间排序 1=降序,2=升序
        price_type: "", // 价格排序 1=降序,2=升序
        type: "", //	教学进程表
        offset: 0, // 页数
        page: 6
      },
      footbox: [],
      select_1: false,   // 浏览量
      select_2: false,
      select_3: false,
      select_4: false,
      outpublic: false,
      miniProgram: false,
      codePublic: '',
      wechatcode1: '',
      type: '',
      active1: false,
      active2: false,
      active3: false,
      checkedGrageAll: false,
      checkedPriceAll: false,
      checkedCateAll: false,
      cateAct: '',
      total: 0,
      loading: false,
      finished: false,
      it_cloose: false,
      nomore: false,

    };
  },
  created() {
    let that = this;
    this.popupIMG()
    this.getLoop();
    this.getHomeList()
    this.getClassList();
    this.getCategory();
    this.getPriceList();
    this.getfootbox()

    window.onscroll = function () {
      // scrollTop 滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      // windowHeight 可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // scrollHeight 滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      // 滚动条到底部的条件
      // alert(windowHeight + scrollTop)
      // alert(scrollHeight)
      if (scrollTop + windowHeight >= scrollHeight) {
        // 加载数据
        if (that.total != that.homeList.length) {
          that.getHomeList();
        } else {
          that.nomore = true
        }
      }
    }
  },
  methods: {
    async popupIMG() {  // 回顾2019
      const { data: { data } } = await this.postRequest('api/sundry/getActivity')
      if (data.length != 0) {
        this.up = !this.up
        this.popup = data
        this.url = data.url
      }
    },
    getHomeList() {  // 首页列表 
      this.reqParams.offset++;

      console.log(this.reqParams.offset);
      this.postRequest('api/index/goodsList', this.reqParams).then(res => {
        this.total = res.data.data.total
        this.homeList = this.homeList.concat(res.data.data.list);
        if (res.data.data.list.length == 0) {
          this.it_cloose = true
        }
        console.log(this.homeList, "this.homeList");
      }).catch(err => {
        console.log(err);
      })
    },
    goSearch() {
      this.$router.push('/search')
    },
    getLoop() {  // 轮播列表 
      this.postRequest('api/sundry/getSlide').then(res => {
        this.loop = res.data.data
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    },
    async getfootbox() {
      try {
        const { data: { data } } = await this.postRequest('api/sundry/getBottom')
        // console.log(data);
        this.footbox = data
      } catch (err) {
        console.log(err);
      }
    },
    getClassList() {  // 班级列表 
      this.postRequest('api/sundry/getGrade').then(res => {
        this.classList = res.data.data
        for (let i = 0; i < this.classList.length; i++) {
          this.classList[i].ckcheck = false
        }
      }).catch(err => {
        console.log(err);
      })
    },
    onclickBanner(it) {
      this.loop.forEach(item => {
        if (item.id == it.id) {
          window.location.href = item.url
        }
      })
    },
    async getCategory() {  // 分类列表 
      const { data: { data } } = await this.postRequest('api/sundry/getCategory')
      console.log(data, "分类列表");
      this.category = data
      for (let i = 0; i < this.category.length; i++) {
        this.category[i].ckcheck = false
      }
    },
    getPriceList() {  // 价格列表 
      this.postRequest('api/sundry/getPrice').then(res => {
        // console.log(res, "价格列表");
        this.priceList = res.data.data
        for (let i = 0; i < this.priceList.length; i++) {
          this.priceList[i].ckcheck = false
        }
      }).catch(err => {
        console.log(err);

      })
    },
    leavePrice() {  // 离开价格下拉页
      this.show_price = !this.show_price;
    },
    goDetailsList(item) {
      this.$router.push({ path: "/detailsList", query: { goods_id: item.id } })
    },
    classes_down_box() {  // 班级
      this.show = !this.show;
      this.show_price = false
      this.show_up = false
      this.active1 = !this.active1
      this.active2 = false
      this.active3 = false
    },
    category_down_box() {  // 分类
      this.show_up = !this.show_up;
      this.show = false;
      this.show_price = false
      this.active2 = !this.active2
      this.active1 = false
      this.active3 = false
    },
    price_down_box() {  // 价格
      this.show_price = !this.show_price;
      this.show = false;
      this.show_up = false;
      this.active3 = !this.active3
      this.active1 = false
      this.active2 = false

    },
    classItem(grade, i) {  //年级点击选中
      this.classList[i].ckcheck = !this.classList[i].ckcheck
      if (this.classList[i].ckcheck == true) {
        this.gradeList.push(grade.id)
        this.gradeList = JSON.parse(JSON.stringify(this.gradeList))
        console.log(this.gradeList, "追加");
      } else {
        for (let i = 0; i < this.gradeList.length; i++) {
          if (this.gradeList[i] == grade.id) {
            this.gradeList.splice(i, 1)
            this.gradeList = JSON.parse(JSON.stringify(this.gradeList))
            console.log(this.gradeList, "删除");
          }
        }
      }
      if (this.gradeList.length == this.classList.length) {
        this.checkedGrageAll = true
      } else {
        this.checkedGrageAll = false
      }
      this.$forceUpdate()
      this.reqParams.grade = this.gradeList.join(',')
      console.log(this.reqParams.grade);

    },
    ckcheckALL() {  // 年级全选
      let that = this
      let list = []
      let gradeid = []
      list = that.classList
      let gradeList = []
      if (that.checkedGrageAll) {
        this.checkedGrageAll = !this.checkedGrageAll
        list.forEach(item => {
          item.ckcheck = false;
        })
        that.reqParams.grade = ''
        that.classList = list
        console.log(list, "list");
      } else {
        this.checkedGrageAll = !this.checkedGrageAll
        list.forEach(item => {
          if (!item.ckcheck) {
            item.ckcheck = true;
          }
          gradeid.push(item.id)
        })
        that.classList = list
        let gradeA = gradeid.join(',')
        console.log(gradeid, 'gradeid');
        console.log(gradeA, 'gradeA');
        that.reqParams.grade = gradeA
      }
      that.gradeList = gradeList
      console.log(gradeList, "gradeList");
    },
    priceChangeitem(idd, i) {        // 价格点击选中
      this.priceList[i].ckcheck = !this.priceList[i].ckcheck
      if (this.priceList[i].ckcheck == true) {
        this.checkList.push(idd.id)
        this.checkList = JSON.parse(JSON.stringify(this.checkList))
        console.log(this.checkList, "追加");
      } else {
        for (let i = 0; i < this.checkList.length; i++) {
          if (this.checkList[i] == idd.id) {
            this.checkList.splice(i, 1)
            this.checkList = JSON.parse(JSON.stringify(this.checkList))
            console.log(this.checkList, "删除");
          }
        }
      }
      if (this.checkList.length == this.priceList.length) {
        this.checkedPriceAll = true
      } else {
        this.checkedPriceAll = false
      }
      this.$forceUpdate()
      this.reqParams.price = this.checkList.join(',')
      this.getHomeList()
    },
    onclickPriceALL() {  // 价格全选
      let that = this
      let list = []
      list = that.priceList
      let checkList = []
      if (that.checkedPriceAll) {
        this.checkedPriceAll = !this.checkedPriceAll
        list.forEach(item => {
          item.ckcheck = false;
        })
        that.priceList = list
      } else {
        this.checkedPriceAll = !this.checkedPriceAll
        list.forEach(item => {
          if (!item.ckcheck) {
            item.ckcheck = true;
          }
          checkList.push(item.id)
        })
        that.priceList = list
      }
      that.checkList = checkList
    },
    clickChangeCate(item, i) {  // 分类点击选中
      this.list[i].ckcheck = !this.list[i].ckcheck
      if (this.list[i].ckcheck == true) {
        this.cateList.push(item.id)
        this.cateList = JSON.parse(JSON.stringify(this.cateList))
        console.log(this.cateList, "追加");
      } else {
        for (let i = 0; i < this.cateList.length; i++) {
          if (this.cateList[i] == item.id) {
            this.cateList.splice(i, 1)
            this.cateList = JSON.parse(JSON.stringify(this.cateList))
            console.log(this.cateList, "删除");
          }
        }
      }
      if (this.cateList.length == this.list.length) {
        this.checkedCateAll = true
      } else {
        this.checkedCateAll = false
      }
      this.$forceUpdate()

      this.reqParams.category = this.cateList.join(',')
    },
    onclickCateALL() {  // 分类全选
      let that = this
      let list = []
      list = that.list
      let cateList = []
      if (that.checkedCateAll) {
        this.checkedCateAll = !this.checkedCateAll
        list.forEach(item => {
          item.ckcheck = false;
        })
        that.list = list
      } else {
        this.checkedCateAll = !this.checkedCateAll
        list.forEach(item => {
          if (!item.ckcheck) {
            item.ckcheck = true;
          }
          cateList.push(item.id)
        })
        that.list = list
      }
      that.cateList = cateList
    },
    gradeTrue() {  //  班级确认按钮
      this.reqParams.offset = 1
      this.homeList = []
      this.getHomeList()
      this.show = !this.show
    },
    cateTrue() {  // 分类确认按钮
      this.reqParams.offset = 1
      this.homeList = []
      this.getHomeList()
      this.show_up = !this.show_up
    },
    priceTrue() {// 价格确认按钮
      this.reqParams.offset = 1
      this.homeList = []
      this.show_price = !this.show_price
      this.getHomeList()
    },
    goPublicTitleCate(item, index) {    // 分类列表下的列表
      this.cateAct = index
      this.checkedCateAll = false
      this.list = item.child
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].ckcheck = false
      }
      this.show_cate = !this.show_cate;
    },
    goToAsh() {
      this.$router.push('/emptyCart')
    },
    selliu() {     // 浏览量筛选
      if (this.reqParams.view_num == 1) {
        this.reqParams.view_num = 2;
        this.select_1 = !this.select_1;
      } else if (this.reqParams.view_num == 2) {
        this.reqParams.view_num = 1;
        this.select_1 = !this.select_1;
      } else if (this.reqParams.view_num == '') {
        this.select_1 = true;
        this.reqParams.view_num = 2;
      }
      this.reqParams.createtime = "";
      this.reqParams.price_type = "";
      this.reqParams.type = "";
      this.select_2 = "";
      this.select_3 = '';
      this.select_4 = '';
      this.reqParams.offset = 1
      this.homeList = []
      this.getHomeList()
    },
    seltime() {    // 上架时间
      if (this.reqParams.createtime == 1) {
        this.reqParams.createtime = 2;
        this.select_2 = !this.select_2;
      } else if (this.reqParams.createtime == 2) {
        this.reqParams.createtime = 1;
        this.select_2 = !this.select_2;
      } else if (this.reqParams.createtime == '') {
        this.select_2 = true;
        this.reqParams.createtime = 2;
      }
      this.reqParams.view_num = "";
      this.reqParams.price_type = "";
      this.reqParams.type = "";
      this.select_1 = "";
      this.select_3 = '';
      this.select_4 = '';
      this.reqParams.offset = 1
      this.homeList = []
      this.getHomeList()

    },
    selprice() {     // 价格
      if (this.reqParams.price_type == 1) {
        this.reqParams.price_type = 2;
        this.select_3 = !this.select_3;
      } else if (this.reqParams.price_type == 2) {
        this.reqParams.price_type = 1;
        this.select_3 = !this.select_3;
      } else if (this.reqParams.price_type == '') {
        this.select_3 = true;
        this.reqParams.price_type = 2;
      }
      this.reqParams.view_num = "";
      this.reqParams.createtime = "";
      this.reqParams.type = "";
      this.select_1 = "";
      this.select_2 = '';
      this.select_4 = '';
      this.reqParams.offset = 1
      this.homeList = []
      this.getHomeList()
    },
    seltable() {  // 教学进程表
      console.log(this.select_4);
      if (this.select_4) {
        this.select_4 = !this.select_4;
        this.reqParams.type = 0;
      } else {
        this.select_4 = !this.select_4;
        this.reqParams.type = 1;
      }
      this.select_1 = "";
      this.select_2 = '';
      this.select_3 = '';
      this.reqParams.offset = 1
      this.homeList = []
      this.getHomeList()
    },
    clickOutpublic() {
      this.outpublic = !this.outpublic;
    },
    clickMiniProgramout() {
      this.miniProgram = !this.miniProgram;
    },
    async clickeEnterpublic() {    // 点击公共号
      this.outpublic = !this.outpublic;
      const { data } = await this.postRequest("api/sundry/getQrcode", { type: 2 });
      this.wechatcode1 = data.data;
    },
    async clickMiniProgramenter() {    // 小程序
      this.miniProgram = !this.miniProgram;
      const { data } = await this.postRequest("api/sundry/getQrcode", { type: 3 });
      this.codePublic = data.data;
    },
    // 分享到微博
    shareWeibo() {
      window.open('http://service.weibo.com/share/share.php?url=' + document.location.href + '?sharesource=weibo&title=口袋商品&pic=图片&appkey=微博平台申请的key');
    },
    zhuanpage() {
      window.open('https://www.facebook.com/MsVeGeRocks')
    },
    kecheng() {
      window.open('https://wxf374733b0b997f5d.h5.xiaoe-tech.com')
    },
    faweibo() {
      window.open('https://weibo.com/u/2638915523')

    },

  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .s_ {
    .fixedtop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      z-index: 10;

      .logo {
        width: 100%;
        height: 64px;
        display: flex;
        align-items: center;
        padding: 12px 16px;
        box-sizing: border-box;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .ck {
          width: 100%;
          margin-left: 20px;
          input {
            width: 100%;
            height: 64px;
          }
        }
      }
    }

    .home_ {
      //   轮播图
      width: 100%;
      padding-top: 65px;
      box-sizing: border-box;
      .top_one {
        width: 100%;
        height: 140px;
        position: relative;
        .my_swipe {
          height: 140px;
          width: 100%;
          .van-swipe-item {
            width: 100%;
            height: 140px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .img_title {
          width: 194px;
          height: 100px;
          z-index: 1;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          .title {
            height: 40px;
            p {
              color: #fff;
              font-size: 22px;
              font-family: "FZLanTingHei-H-GBK";
              font-weight: 400;
              text-align: center;
            }
          }
          .title_text {
            color: #fff;
            font-size: 5px;
            text-align: center;
          }
          .crossing {
            width: 50px;
            height: 4px;
            background-color: #fff;
            margin: 10px auto;
          }
        }
      }
      .top_two {
        margin: 10px 0;
        width: 100%;
        height: 40px;
        display: flex;
        background-color: #fff;
        position: relative;
        .public {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          border-right: 1px solid #e8e9ec;
          padding: 2px 0;
          box-sizing: border-box;
          .public_title {
            font-size: 14px;
            color: #2c2c2c;
          }
          img {
            margin-left: 5px;
            width: 7px;
            height: 7px;
          }
          .ind {
            color: #416fae;
          }
        }

        .price {
          border-right: none;
        }
        // 下拉弹窗 班级
        .classes_down_box {
          width: 100%;
          position: absolute;
          top: 42px;
          left: 0;
          background-color: #fff;
          padding: 20px;
          box-sizing: border-box;
          z-index: 2;
          .classes_list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .all_class {
              min-width: 100px;
              padding: 5px 20px;
              height: 28px;
              box-sizing: border-box;
              border-radius: 13px;
              background-color: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 5px;
            }
            .one {
              height: 28px;
              min-width: 100px;
              border-radius: 13px;
              border: 1px solid #f5f5f5;
              background-color: #f5f5f5;
            }
            .activeStyle {
              color: #27508c;
              border: 1px solid #416fae;
            }
          }
          .sure_btn {
            margin-top: 30px;
            width: 343px;
            height: 44px;
            color: #fff;
            text-align: center;
            line-height: 44px;
            background-color: #416fae;
            border-radius: 20px;
          }
        }
        // 下拉弹窗  分类
        .category_down_box {
          position: absolute;
          top: 42px;
          left: 0;
          width: 100%;
          background-color: #fff;
          z-index: 2;
          .category_list {
            width: 100%;
            padding-top: 20px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            // justify-content: center;
            .public_cate {
              width: 125px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              .public_title_cate {
                font-size: 14px;
              }
              img {
                margin-left: 5px;
                width: 7px;
                height: 7px;
              }
            }
            .actived {
              color: #416fae;
            }
          }
        }
        // 下拉弹窗 分类的下拉弹窗
        .category_down_box_list {
          position: absolute;
          top: 95px;
          left: 0;
          width: 100%;
          background-color: #fff;
          padding: 20px;
          box-sizing: border-box;
          z-index: 1220;
          ._list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .all_list {
              min-width: 100px;
              margin: 5px;
              padding: 5px 20px;
              box-sizing: border-box;
              height: 28px;
              border-radius: 13px;
              background-color: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #000000;
            }
            .list_one {
              padding: 5px 20px;
              box-sizing: border-box;
              margin: 5px;
              min-width: 100px;
              height: 28px;
              border-radius: 13px;
              border: 1px solid #f5f5f5;
              background-color: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #000;
            }
            .actives {
              border: 1px solid #416fae;
              color: #416fae;
            }
          }
          .sure_btn {
            margin-top: 30px;
            width: 343px;
            height: 44px;
            color: #fff;
            text-align: center;
            line-height: 44px;
            background-color: #416fae;
            border-radius: 20px;
          }
        }
        // 下拉弹窗 价格
        .price_down_box {
          width: 100%;
          position: absolute;
          top: 42px;
          left: 0;
          background-color: #fff;
          padding: 20px;
          box-sizing: border-box;
          z-index: 2;
          .price_list {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            .all_price {
              margin: 5px;
              min-width: 99px;
              height: 28px;
              border-radius: 13px;
              background-color: #f5f5f5;
              display: flex;
              align-items: center;
              justify-content: center;
              position: relative;
              img {
                width: 32px;
                height: 16px;
                position: absolute;
                right: -10px;
                top: -6px;
              }
            }
            .active {
              border: 1px solid #416fae;
              color: #416fae;
            }
          }
          .sure_btn {
            margin-top: 20px;
            width: 100%;
            height: 44px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #416fae;
            border-radius: 20px;
          }
        }
      }
      .top_three {
        height: 40px;

        .box {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 40px;
          .look {
            height: 100%;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            .lookleft {
              height: 100%;
              font-size: 12px;
              color: #999999;
              line-height: 40px;
            }
            .itt {
              color: #416fae;
            }
            .lookright {
              width: 10px;
              height: 100%;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              img {
                width: 6px;
                height: 6px;
              }
            }
          }
        }
      }
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
                text-align: left;
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
      .no_more {
        width: 100%;
        padding: 20px 0;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        color: #5d5d5d;
      }
      .elseimg {
        width: 100%;
        padding: 16px 16px 0;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
      .currentpae {
        padding: 0 16px;
        box-sizing: border-box;
        background-color: #f9f9f9;
      }
      .top_five {
        background-color: #f9f9f9;
        padding: 10px 16px 80px;
        box-sizing: border-box;
        .photos {
          .small_box {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: center;
            .foot {
              width: 100px;
              height: 40px;
              margin: 5px;
              background-color: #fff;
              border: 1px #ccc solid;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 24px;
                height: 24px;
              }
              span {
                padding-left: 5px;
                box-sizing: border-box;
                color: black;
                font-size: 12px;
              }
            }
          }
        }
        .record {
          margin-top: 16px;
          p {
            color: #5d5d5d;
            text-align: center;
          }
          p:nth-child(1) {
            line-height: 30px;
          }
          p:nth-child(2) {
            line-height: 30px;
            // margin: 10px 0;
          }
          p:nth-child(3) {
            line-height: 30px;
          }
        }
      }
      .top_six {
        position: fixed;
        right: 5px;
        bottom: 80px;
        .ash {
          margin-top: 15px;
          .ash_ash {
            width: 48px;
            height: 48px;
            img {
              width: 48px;
              height: 48px;
            }
          }
        }
      }
      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        z-index: 5;

        .block {
          width: 343px;
          height: 215px;
          position: relative;
          img:nth-child(1) {
            width: 100%;
          }
          img:nth-child(2) {
            width: 45px;
            height: 45px;
            position: absolute;
            top: 112px;
            left: 148px;
          }
          img:nth-child(3) {
            width: 21px;
            height: 21px;
            position: absolute;
            top: 10px;
            right: 10px;
          }
        }
      }
    }

    .wrapperwecode {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      .block {
        width: 240px;
        height: 240px;
        background-color: #fff;
        img {
          width: 100%;
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
</style>