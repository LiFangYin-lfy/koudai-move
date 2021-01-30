<template>
  <div class="container">
    <van-nav-bar title="更换LOGO" left-arrow @click-left="goBackFn" class="fixedtop" />
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
        @click="show = true"
        color="linear-gradient(to right, #416FAE, #27508C)"
        style="width:154px"
        round
        class="ck"
      >预览</van-button>
      <van-overlay :show="show" @click="fn">
        <div class="wrapper">
          <div class="block" @click.stop>
            <!-- <img src="../../assets/img/icon_45@2x.png" alt /> -->
            <img :src="url" alt class="IMGS1" />
            <van-swipe :autoplay="3000" class="swipe">
              <van-swipe-item v-for="(image, index) in images" :key="index" class="imgBOX">
                <img :src="image" />
              </van-swipe-item>
            </van-swipe>

            <img src="../../assets/img/icon_46@2x.png" class="cuowu" alt @click="fn" />
            <p class="prompt">
              <span>*</span>请上传正方形LOGO，图⽚不小于148*148。满意预览效果后再付款，虚拟商品不支持退款，请您理解。如遇其他问题，可联系⼩口袋微信：shucai_001，帮您解决！
            </p>
            <van-button color="#27508C" plain round class="btn" @click="togo">确认使用</van-button>
          </div>
        </div>
      </van-overlay>
      <p>
        <span>*</span>请上传正方形LOGO，图片不小于148*148。满意预览效果后再付款，虚拟商品不支持退费，请您理解。如遇其他问题，可联系小口袋微信：shucai_001，帮您解决！
      </p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "changeLogo",
  data() {
    return {
      show: false,
      fileList: [],
      upload: 2,
      url: '',
      images: []
    };
  },
  methods: {
    fn() {
      this.show = !this.show;
    },
    // 回到上一步
    goBackFn() {
      this.$router.go(-1);
    },
    async afterRead(file) {
      var formdata = new FormData();
      formdata.append("file", file.file);
      this.upload = 1
      const { data } = await this.postRequest('api/common/upload', formdata)
      if (data.code == 0) {
        let msg = data.msg
        Toast.fail(msg)
      } else {
        let msg = data.msg
        this.url = data.data.url
        Toast.success(msg)
      }

    },
    togo() {
      sessionStorage.setItem('url', this.url)
      this.$router.push({ path: '/confirmOrder', query: { routeParams: JSON.stringify({ url: this.url }) } })
    },
  }
};
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .change_lg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px;
    padding: 60px 20px 30px;
    box-sizing: border-box;
    background-color: #fff;
    .items_img {
      position: relative;
      .items {
        // z-index: 2;
      }

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
    // 遮罩层
    .wrapper {
      display: flex;
      margin-top: 50px;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      .block {
        width: 307px;
        height: 433px;
        position: relative;
        .swipe {
          width: 100%;
          height: 100%;
          background-color: #fff;
          .imgBOX {
            width: 307px;
            height: 433px;
            .imgs {
              width: 307px;
              height: 433px;
            }
          }
        }

        .IMGS1 {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 36px;
          height: 36px;
          z-index: 2;
        }
        .cuowu {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 20px;
          height: 20px;
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
        .btn {
          width: 154px;
          position: absolute;
          bottom: -160px;
          left: 80px;
        }
      }
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
</style>