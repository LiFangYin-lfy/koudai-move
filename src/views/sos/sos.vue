<template>
  <div class="container">
    <van-nav-bar title left-arrow class="fixedtop" @click-left="goBackFn" />
    <div class="errimg">
      <img src="../../assets/img/icon_63@2x.png" alt />
    </div>
    <div class="title">呀，这个页面找不到了...</div>
    <div class="title2">可能有外星人劫持信号哦，快打开窗户看看！</div>
    <div class="s_stop">
      <div class="lefthome" @click="gotohome">返回首页</div>
      <div class="lefthome" @click="goBackFn">返回上一页</div>
    </div>
    <div class="down">
      <div class="downtitle">内容没找到您要的访问的网页，原因可能如下：</div>
      <div class="down_s">
        <div class="icoon"></div>
        <div class="icontent">可能网速过慢，或网络中断</div>
      </div>
      <div class="down_s">
        <div class="icoon"></div>
        <div class="icontent">可能页面已被删除</div>
      </div>
      <div class="down_s">
        <div class="icoon"></div>
        <div class="icontent">这个网页太受欢迎，太多人在访问</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sos",
  data() {
    return {

    }
  },
  created() {

  },
  methods: {
    goBackFn() {
      this.$router.go(-2)
    },
    gotohome() {
      this.$router.push('/')
    },
  }


}
</script>

<style scoped lang='less'>
.container {
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .errimg {
    width: 100%;
    margin-top: 60px;
    padding: 30px 60px 30px;
    box-sizing: border-box;

    img {
      width: 100%;
    }
  }
  .title {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    text-align: center;
    font-size: 18px;
    color: #2c2c2c;
  }
  .title2 {
    width: 100%;
    padding: 5px 0;
    text-align: center;
    box-sizing: border-box;
    color: #999999;
    font-size: 14px;
  }
  .s_stop {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 30px 30px;
    box-sizing: border-box;
    .lefthome {
      font-size: 14px;
      color: #416fae;
    }
  }
  .down {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    .downtitle {
      width: 100%;
      font-size: 14px;
      color: #2c2c2c;
      text-align: center;
      margin-bottom: 5px;
    }
    .down_s {
      width: 100%;
      display: flex;
      align-items: center;

      padding: 8px 0 8px 90px;
      box-sizing: border-box;
      .icoon {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #416fae;
      }
      .icontent {
        font-size: 12px;
        color: #666666;
        margin-left: 5px;
      }
    }
  }
}
</style>