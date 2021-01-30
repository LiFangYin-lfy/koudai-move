<template>
  <div class="container">
    <van-nav-bar title="智能客服" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="aptitudeService">
      <div class="chat-list" ref="list">
        <div
          class="chat-item"
          :class="{left:item.name==='xz',right:item.name==='self'}"
          v-for="(item,i) in list"
          :key="i"
        >
          <van-image v-if="item.name==='xz'" fit="cover" round :src="xzAvatar" />
          <div class="chat-pao">{{item.msg}}</div>
          <van-image
            v-if="item.name==='self'"
            fit="cover"
            round
            :src="photo||'https://img.yzcdn.cn/vant/cat.jpeg'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 智能客服
  name: "aptitudeService",
  data() {
    return {
      list: []
    };
  },
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
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .aptitudeService {
    width: 100%;
    padding-top: 60px;
    box-sizing: border-box;
    .chat-list {
      height: 100%;
      overflow-y: scroll;
      .chat-item {
        padding: 10px;
        box-sizing: border-box;
        .van-image {
          vertical-align: top;
          width: 40px;
          height: 40px;
        }
        .chat-pao {
          vertical-align: top;
          display: inline-block;
          min-width: 40px;
          max-width: 70%;
          min-height: 40px;
          line-height: 38px;
          border: 0.5px solid #c2d9ea;
          border-radius: 4px;
          position: relative;
          padding: 0 10px;
          box-sizing: border-box;
          background-color: #e0effb;
          word-break: break-all;
          font-size: 14px;
          color: #333;
          &::before {
            content: "";
            width: 10px;
            height: 10px;
            position: absolute;
            top: 12px;
            border-top: 0.5px solid #c2d9ea;
            border-right: 0.5px solid #c2d9ea;
            background: #e0effb;
          }
        }
      }
    }
  }
}
</style>