<template>
  <div class="container">
    <van-nav-bar title="智能客服" left-arrow @click-left="goBackFn" class="fixedtop" />
    <div class="left_per_i" id="scrolldIV">
      <div class="list_index_box" v-for="(item, index) in kcList" :key="index">
        <div class="leftSend" v-if="item.type == 1">
          <div class="ctim">{{currentdate}}</div>
          <div class="list_index">
            <div class="list_index_img">
              <img src="@/assets/img/icon_351.png" alt />
            </div>
            <div class="list_index_txt">
              <img class="leftArrow" src="../../assets/img/left-arrow.png" alt />
              <span style="white-space: pre-wrap;text-align: justify">{{item.content}}</span>
            </div>
          </div>
        </div>
        <div class="leftSend" v-if="item.type == 2">
          <div class="ctim">{{currentdate}}</div>
          <div class="list_index now">
            <div class="list_index_txt_right">
              <span style="white-space: pre-wrap;">{{item.content}}</span>
              <img class="rightArrow" src="../../assets/img/right-arrow.png" alt />
            </div>
            <div class="list_index_img now">
              <img :src="avatar" alt />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="updown">
      <div class="div">
        <div class="reply_box left">
          <img src="../../assets/img/edit.png" alt />
          <img src="../../assets/img/look.png" alt />
        </div>
        <div class="reply_txt">
          <input type="text" placeholder="写回复" v-model="values" @blur="sendText" class="input" />
          <!-- <textarea placeholder="写回复" v-model="values" class="input"></textarea> -->
        </div>
        <div class="right_per_i right" @click="sendText">
          <img src="../../assets/img/fly5396.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "emptyCart",
  data() {
    return {

      kcList: [
        {
          id: 1,
          type: 1,
          content: '嘿，很高兴为您服务，悄悄告诉您：我不是实时在线的人工客服，目前只能回复简单的问题，但是细心的我已经想到您可能会咨询的常见问题！\n \n· 最新活动 \n· 如何购买 \n· 如何换LOGO \n· 如何找订单 \n· 关于口袋宇宙 \n \n输入这些关键词，就能得到我们的解答喽！如果您有急切要解决的问题，可以直接加小助手微信，我们会以最快的速度回复您！\n \n遇到打不开网页的问题，可咨询小助手（微信号：shucai_001）\n遇到网站操作相关问题，可咨询小助手（微信号：shucai_002）',
          img: '',
          // currentdate: ''
        }
      ],
      sending: [], // 发送消息
      keyword: [],
      values: '',
      currentdate: '',
      onpresscTime: false,  //  阻止短时间内连续点击
      avatar: require('@/assets/img/head.png')


    }
  },
  created() {
    this.getUserInfo()
    this.getNowFormatDate()
  },
  methods: {
    async getWechatList() {    // 获取聊天记录
      const { data: { data } } = await this.postRequest({
      })
      this.keyword = data
    },
    goBackFn() {    // 回到上一步
      this.$router.go(-1);
    },

    sendText() {     // 发送消息
      var t = this, i = t.kcList.length + 1;
      if (this.onpresscTime) {
        return
      } else {
        this.onpresscTime = true
        if (t.values) {
          this.getNowFormatDate()
          var obj = {
            id: i,
            img: '',
            type: 2,
            content: t.values,
          }
          t.elInput()
          // var obj1 = {
          //   id: 1,
          //   type: 1,
          //   content: '我是智能客服，有什么可以帮您的吗？',
          //   img: ''
          // }
          t.kcList.push(obj);
          // t.kcList.push(obj1);
          // console.log(t.kcList)
        } else {
          Toast('不能发送空白消息')
        }
        setTimeout(() => {
          this.onpresscTime = false
        }, 1300);

      }


    },
    async elInput() {    //发送
      let that = this
      let obj = this.values;
      that.getNowFormatDate()
      try {
        const { data: { data } } = await that.postRequest(
          "api/service/getService",
          { keyword: obj }
        )
        that.values = '';
        if (data) {
          setTimeout(function () {
            var obj1 = {
              id: 1,
              type: 1,
              content: data,
              img: ''
            }
            that.kcList.push(obj1);
          }, 2000);


        }

      } catch (err) {
        Toast.fail('发送失败')
      }


    },
    //获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var hour = date.getHours();
      var minutes = date.getMinutes();
      // var seconds = date.getSeconds();
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
      }
      // var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + ":" + minutes + ":" + seconds;
      var currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + ":" + minutes;
      this.currentdate = currentdate
      return currentdate;
    },
    async getUserInfo() {
      try {
        const {
          data: { data }
        } = await this.postRequest("api/user/getUserInfo");
        this.avatar = data.avatar
        console.log(data);
      } catch (err) {
        Toast.fail(err)
      }
    },
  }
};
</script>

<style scoped lang='less'>
.container {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-color: #f9f9f9;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }

  .left_per_i {
    padding: 60px 15px 50px;
    box-sizing: border-box;
    .list_index_box {
      width: 100%;
      .leftSend {
        width: 100%;
        .ctim {
          text-align: center;
          margin: 20px auto;
          padding: 3px 10px;
          box-sizing: border-box;
          background-color: #ccc;
          border-radius: 16px;
          font-size: 8px;
          width: 160px;
          color: #fff;
        }
        .list_index {
          width: 100%;
          margin-bottom: 15px;
          display: flex;
          align-items: flex-start;
          .list_index_img {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 18px;
            flex-shrink: 0;
            img {
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .now {
            margin-left: 18px;
            margin-right: 0px;
          }
          .list_index_txt {
            background-color: #ffffff;
            border-radius: 8px;

            padding: 12px;
            box-sizing: border-box;
            min-width: 40px;
            line-height: 1.7;
            font-size: 14px;
            color: #232323;
            position: relative;
            word-break: break-all;

            .leftArrow {
              position: absolute;
              top: 10px;
              left: -14px;
              width: 20px;
              height: 20px;
            }
          }
          .list_index_txt_right {
            background: rgba(65, 111, 174, 1);
            border-radius: 8px;

            padding: 12px;
            box-sizing: border-box;
            min-width: 40px;
            line-height: 1.7;
            font-size: 14px;
            color: #fff;
            word-break: break-all;
            position: relative;
            .rightArrow {
              position: absolute;
              top: 10px;
              right: -13px;
              width: 20px;
              height: 20px;
            }
          }
        }
        .now {
          justify-content: flex-end;
        }
      }
    }
  }

  .updown {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #fff;
    margin-top: 5px;
    height: 48px;
    width: 100%;
    border-top: 1px solid #f5f5f5;
    .div {
      display: flex;
      align-items: center;
      .reply_box {
        height: 50px;
        width: 90px;
        img {
          margin: 13px 10px;
        }
      }
      .reply_txt {
        flex: 1;
        height: 40px;
        .input {
          // padding: 12px 0;
          padding: 0 5px;
          box-sizing: border-box;
          width: 100%;
          border: none;
          height: 40px;
          background-color: #f9f9f9;
        }
      }
      .right_per_i {
        width: 48px;
        height: 48px;
        padding-top: 6px;
        padding-right: 5px;
        box-sizing: border-box;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>