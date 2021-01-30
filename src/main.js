import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import wx from 'weixin-js-sdk' // 引入微信sdk
Vue.prototype.$wx = wx
// 覆盖vant的样式
import '@/style/index.less'

Vue.use(Vant);

import {
    POST
} from './utils/local';
import {
    GET
} from './utils/local';
Vue.prototype.postRequest = POST;
Vue.prototype.getRequest = GET;
Vue.config.productionTip = false;
router.afterEach(() => {
    window.scrollTo(0, 0);
});
wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wx80aae94b645530b0', // 必填，公众号的唯一标识
    timestamp: '', // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '', // 必填，签名，见附录1
    // 必填，需要使用的JS接口列表，所有JS接口列表见官方js接口
    // 这里配置获取地理位置所需要的接口权限
    jsApiList: [
        'checkJsApi',
        'onMenuShareWeibo',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ'
    ]
});

wx.ready(function () {

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
});

wx.error(function () {
    // console.log(res);
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

});
router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) { //匹配前往的路由不存在
        from.name ? next({
            name: from.name
        }) : next('/sos'); // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    } else {
        next(); //如果匹配到正确跳转
    }
});



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')