<template>
  <div class="container">
    <van-nav-bar title="搜索" left-arrow class="fixedtop" @click-left="goBackFn" />
    <van-search
      v-model="value"
      class="van_search"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch2">搜索</div>
      </template>
    </van-search>
    <div class="hotsearch" :data="hotcr">
      <div class="itek">热门搜索</div>
      <div class="hotList" v-for="(item , index) in hotcr " :key="index">
        <div class="names" @click="onSearch(item.name)">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      value: '',
      hotcr: [],
    }
  },
  created() {
    this.getHotci()
  },
  methods: {
    goBackFn() {      // 回到上一步
      this.$router.go(-1);
    },
    onSearch(obj) {
      this.$router.push({ path: '/searchResult', query: { keyword: obj } })
    },
    onSearch2() {
      let obj = this.value
      this.$router.push({ path: '/searchResult', query: { keyword: obj } })
    },
    async getHotci() {
      const {
        data: { data }
      } = await this.postRequest('api/sundry/getHotSearch');
      this.hotcr = data
    },

  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  .paddingleft {
    // padding-left: 0 16px;
    // box-sizing: border-box;
  }
  .fixedtop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
  }
  .van_search {
    width: 100%;
    padding-top: 70px;
    box-sizing: border-box;
  }
  .hotsearch {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;

    .itek {
      width: 100%;
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .hotList {
      width: 100%;

      .names {
        color: #2c2c2c;
        line-height: 30px;
        height: 30px;
      }
    }
  }
}
</style>