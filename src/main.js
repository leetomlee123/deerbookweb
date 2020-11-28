import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// import Antd from 'ant-design-vue';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import router from './router/router'
import store from './store/index'

// import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
    // baseURL: 'http://localhost:8081/v1/',
    baseURL: 'http://23.91.100.230:8081/v1/',

});
Vue.prototype.$http2 = axios.create({
    // baseURL: 'http://localhost:8081/v1/',
    baseURL: 'http://23.91.100.230:8081/',

});
// Vue.use(Antd);
// 路由守卫


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.path) {
        if (window._hmt) {
            window._hmt.push(['_trackPageview', '/#' + to.fullPath])
        }
    }
    if (to.name == "me") {
        store.commit('fixBottom', true)
    } else {
        store.commit('fixBottom', false)
    }
    next()
})


