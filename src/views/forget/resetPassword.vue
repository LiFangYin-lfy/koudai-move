<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="reset">
      <img src="../../assets/img/icon_19@2x.png" alt />

      <div class="content">
        <p>恭喜您！密码重置成功！</p>
      </div>
      <div class="endto">
        <p>
          立即返回
          <a href="#">首页</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "resetPassword",
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  padding: 22px;
  box-sizing: border-box;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .left_arrow {
    display: flex;
    align-items: center;
    margin-top: 40px;
    width: 100%;
    height: 44px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .reset {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 60px;
    box-sizing: border-box;

    img {
      width: 88px;
      height: 88px;
    }
    .content {
      height: 40px;
      margin-top: 30px;
      p {
        font-size: 16px;
        line-height: 40px;
        color: #2c2c2c;
      }
      .endto {
        width: 100%;
        height: 40px;
        a {
          display: block;
          color: #416fae;
          border-bottom: 1px solid #416fae;
        }
      }
    }
  }
}
</style>