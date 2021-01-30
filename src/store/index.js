import Vue from 'vue'
import Vuex from 'vuex'
// import * as auth from '@/utils/auth'
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  KEY: JSON.parse(localStorage.getItem('koudaishangcheng-key')) || {},
  state: {
    //存放的键值对就是所要管理的状态
    nickname: '请登录',
    money: 0,
    avatar: '',
    pername: '',
    ticket_num: 0,
    level_name: '',
    birthday: '',
    gender: '',
    vip_logo: '',
    storeCount: 0, // 购物车
    shopcount: '' // 购物车数量
  },
  mutations: {
    perUserInfo(state, step) {
      console.log(step, "重新获取信息");
      state.nickname = "欢迎您" + step.nickname
      state.pername = step.nickname
      state.money = step.money
      state.avatar = step.avatar
      state.ticket_num = step.ticket_num
      state.level_name = step.level_name
      state.birthday = step.birthday
      state.gender = step.gender
      state.vip_logo = step.vip_logo
      state.storeCount = step.storeCount
      console.log(state.vip_logo);
    },
    loginoutInfo(state) {
      state.nickname = '请登录'
      state.pername = ''
      state.money = ''
      state.avatar = ''
      state.ticket_num = ''
      state.level_name = ''
      state.birthday = ''
      state.gender = ''
      state.vip_logo = ''
      state.storeCount = ''
    },
    getshopcount(state, step) {
      state.storeCount = step
    }

  },
  actions: {
    userinfo(context, step) {
      context.commit('perUserInfo', step)
      // console.log(step);
    },
    addStoreCount(context, step) {
      context.commit('getshopcount', step)
    },
    loginOutInfo(context) {
      context.commit('loginoutInfo')
    }
  },
  getters: {
    showNum(state) {
      return state.storeCount
    }
  }


})

export default store