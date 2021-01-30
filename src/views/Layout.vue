<template>
  <div class="container">
    <div class="my-wrapper">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :badge="storeCount" to="/cart">
        <span>购物车</span>
        <template #icon="props">
          <img :src="props.active ? icon.active_ : icon.inactive_" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>个人中心</span>
        <template #icon="props">
          <img :src="props.active ? icon.active_l : icon.inactive_l" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant';
export default {
  name: "layout",
  data() {
    return {
      value: "",
      active: 0,
      storeCount: 0,
      icon: {
        active:
          "http://qiniu.w.glocalize-asia.com/uploads/20200710/092c1878acf010e5e1b994c2c57b18dd.png",
        inactive:
          "http://qiniu.w.glocalize-asia.com/uploads/20200710/538398e093d4f52074cd444c20da3b28.png",
        active_:
          "http://qiniu.w.glocalize-asia.com/uploads/20200710/e82ea3957c43bac6e97f02b1f1949808.png",
        inactive_:
          "http://qiniu.w.glocalize-asia.com/uploads/20200710/f7481c56babf1e58dd6ffc2c743c6721.png",
        active_l:
          "http://qiniu.w.glocalize-asia.com/uploads/20200710/20987920c5a2a93868478589c13257b9.png",
        inactive_l:
          "http://qiniu.w.glocalize-asia.com/uploads/20200710/14075906218cbb82946acc7e24c17197.png"
      }
    };
  },
  computed: {
  },

  created() {
    let token = JSON.parse(window.localStorage.getItem('kou_token'))
    if (token) {
      this.onSearch()
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
  methods: {
    async onSearch() {
      const {
        data: { data }
      } = await this.postRequest("api/user/car", { page: 1 });
      this.storeCount = data.total
      console.log(this.storeCount);
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  min-height: 100%;
  background-color: #f5f5f5;

  .my-wrapper {
    width: 100%;
    min-height: 100%;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
  img {
    width: 24px;
    height: 24px;
  }
}
</style>