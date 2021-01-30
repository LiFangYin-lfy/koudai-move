<template>
  <div v-html="apply">{{apply}}</div>
</template>

<script>
export default {
  name: "newpage",
  data() {
    return {
      apply: ""
    }
  },
  created() {
    var that = this;
    that.getMoneyFun();
  },
  methods: {
    getMoneyFun() {
      let form = this.$route.query.htmls
      this.apply = form;
      this.$nextTick(() => {
        document.forms[0].submit()
      })
    }
  }
}
</script>

<style scoped>
</style>