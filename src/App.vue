<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {

  data() {
    return {

    };
  },

  created() {
    // this.IsPC()
  },

  mounted: function () {

  },

  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) != -1) {
          flag = false;
          // break;
        }
      }
      if (flag) {
        window.location.href = 'https://glaforteachers.com/'
      }
      return flag;
    },
  }
};
</script>
<style lang="less">
</style>
