<template>
  <div class="container">
    <van-nav-bar title left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="nofound">
      <div class="icon_img">
        <img src="../../assets/img/icon_63@2x.png" alt />
      </div>
      <div class="icon_text">
        <p>呀，这个页面找不到了...</p>
        <p>可能有外星人劫持信号哦，快打开窗户看看！</p>
      </div>
      <div class="tohome_">
        <p>返回首页</p>
        <p>返回上一页</p>
      </div>
      <div class="c">
        <div class="down_title">没找到您要的访问的网页，原因可能如下：</div>
        <div class="txt">
          <p>
            <span>•</span>可能网速过慢，或网络中断
          </p>
          <p>
            <span>•</span>可能页面已被删除
          </p>
          <p>
            <span>•</span>这个网页太受欢迎，太多人在访问
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "nofound",
  data() {
    return {};
  },
  methods: {
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    }
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

  .nofound {
    width: 100%;
    background-color: #f9f9f9;
    padding: 90px 0 73px 0;
    box-sizing: border-box;
    .icon_img {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 253px;
        height: 183px;
      }
    }
    .icon_text {
      margin: 40px 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        color: #2c2c2c;
        font-size: 16px;
        line-height: 50px;
        font-weight: 600;
      }
      p:nth-child(2) {
        color: #999999;
        font-size: 12px;
        line-height: 17px;
      }
    }
    .tohome_ {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 50px 0;
      p {
        color: #416fae;
        font-size: 14px;
        line-height: 20px;
        margin: 0 20px;
      }
    }
    .c {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .down_title {
        font-size: 14px;
        line-height: 24px;
        color: #2c2c2c;
      }
      .txt {
        p {
          align-self: start;
          color: #666666;
          font-size: 12px;
          line-height: 24px;
          span {
            color: #416fae;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>