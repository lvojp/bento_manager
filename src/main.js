import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from "vue-analytics";

// Analytics
Vue.use(VueAnalytics, {
    id: 'UA-66236933-2',
    router
})

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
