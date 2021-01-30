import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/home/home')
const User = () => import('@/views/user/user')
const Cart = () => import('@/views/cart/cart')
const Login = () => import('@/views/login/login')
const Register = () => import('@/views/login/register')
const Forget = () => import('@/views/forget/forget')
const ResetPassword = () => import('@/views/forget/resetPassword')
const PersonalCenter = () => import('@/views/personalCenter/personalCenter')
const BasicInformation = () => import('@/views/basicInformation/basicInformation')
const ChangePassword = () => import('@/views/basicInformation/changePassword')
const Myorder = () => import('@/views/myorder/myorder')
const Mycollect = () => import('@/views/mycollect/mycollect')
const Appraise = () => import('@/views/appraise/appraise')
const Coupon = () => import('@/views/coupon/coupon')
const OrderDetails = () => import('@/views/myorder/orderDetails')
const AptitudeService = () => import('@/views/aptitudeService/aptitudeService')
const NoPublic = () => import('@/views/aptitudeService/Nopublic')
const DetailsList = () => import('@/views/detailsList/detailsList')
const EmptyCart = () => import('@/views/cart/emptyCart')
const ChangeLogo = () => import('@/views/changeLogo/changeLogo')
const SubmitOrder = () => import('@/views/submitOrder/submitOrder')
const ConfirmOrder = () => import('@/views/submitOrder/confirmOrder')
const DetailFree = () => import('@/views/detailsList/detailFree')
const DetailsChild = () => import('@/views/detailsList/detailsChild')
const DetailsChildList = () => import('@/views/detailsList/detailsChildList')
const Nofound = () => import('@/views/nofound/nofound')
const Newpage = () => import('@/views/submitOrder/newpage')
const Search = () => import('@/views/search/search')
const SearchResult = () => import('@/views/search/searchResult')
const Pluginred = () => import('@/views/coupon/pluginred')
const Sos = () => import('@/views/sos/sos')


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [{
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/user',
            name: 'user',
            component: User
        }, {
            path: '/cart',
            name: 'cart',
            component: Cart
        }]
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/register',
        name: 'register',
        component: Register
    }, {
        path: '/forget',
        name: 'forget',
        component: Forget
    }, {
        path: '/resetPassword',
        name: 'resetPassword',
        component: ResetPassword
    }, {
        path: '/personalCenter',
        name: 'personalCenter',
        component: PersonalCenter
    }, {
        path: '/basicInformation',
        name: 'basicInformation',
        component: BasicInformation
    }, {
        path: '/changePassword',
        name: 'changePassword',
        component: ChangePassword
    }, {
        path: '/myorder',
        name: 'myorder',
        component: Myorder
    }, {
        path: '/mycollect',
        name: 'mycollect',
        component: Mycollect
    }, {
        path: '/appraise',
        name: 'appraise',
        component: Appraise
    }, {
        path: '/coupon',
        name: 'coupon',
        component: Coupon
    }, {
        path: '/orderDetails',
        name: 'orderDetails',
        component: OrderDetails
    }, {
        path: '/aptitudeService',
        name: 'aptitudeService',
        component: AptitudeService
    }, {
        path: '/Nopublic',
        name: 'Nopublic',
        component: NoPublic
    }, {
        path: '/detailsList',
        name: 'detailsList',
        component: DetailsList
    }, {
        path: '/emptyCart',
        name: 'emptyCart',
        component: EmptyCart
    }, {
        path: '/changeLogo',
        name: 'changeLogo',
        component: ChangeLogo
    }, {
        path: '/submitOrder',
        name: 'submitOrder',
        component: SubmitOrder
    }, {
        path: '/confirmOrder',
        name: 'confirmOrder',
        component: ConfirmOrder
    }, {
        path: '/detailFree',
        name: 'detailFree',
        component: DetailFree
    }, {
        path: '/detailsChild',
        name: 'detailsChild',
        component: DetailsChild
    }, {
        path: '/detailsChildList',
        name: 'detailsChildList',
        component: DetailsChildList
    }, {
        path: '/nofound',
        name: 'nofound',
        component: Nofound
    }, {
        path: '/newpage',
        name: 'newpage',
        component: Newpage
    }, {
        path: '/search',
        name: 'search',
        component: Search
    }, {
        path: '/searchResult',
        name: 'searchResult',
        component: SearchResult
    }, {
        path: '/pluginred',
        name: 'pluginred',
        component: Pluginred
    }, {
        path: '/sos',
        name: 'sos',
        component: Sos
    }




]

const router = new VueRouter({
    mode: 'history',
    routes,
    // 指定该钩子函数，返回坐标值即可
    // scrollBehavior(to, from, savedPosition) {

    //     return {
    //         x: 0,
    //         y: 0
    //     }
    // }
})

export default router