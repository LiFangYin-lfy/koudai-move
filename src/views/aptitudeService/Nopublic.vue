<template>
  <div class="container">
    <van-nav-bar title="公众号" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="Nopublic" v-if="wechatcode1!=''">
      <img :src="wechatcode1" alt />
      <p>长按识别二维码，关注口袋宇宙</p>
    </div>
    <div class="loading" v-else>
      <van-loading type="spinner" size="48px" color="#416FAE"></van-loading>
    </div>
  </div>
</template>

<script>
// import { Loading } from 'vant';
export default {
  name: "Nopublic",
  data() {
    return {
      wechatcode1: '',
      type: ''
    }

  },
  created() {
    this.getclickeEnterpublic()
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    async getclickeEnterpublic() {    // 点击公共号
      const { data } = await this.postRequest("api/sundry/getQrcode", { type: 2 });
      // setTimeout(() => {
      this.wechatcode1 = data.data;
      console.log(data);
      // }, 1500);


    },
  }

};
</script>

<style scoped lang='less'>
.container {
  background-color: #f9f9f9;
  height: 100%;
  width: 100%;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .Nopublic {
    padding: 64px 16px 16px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      margin-top: 100px;
      width: 256px;
      height: 256px;
    }
    p {
      font-size: 18px;
      line-height: 40px;
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