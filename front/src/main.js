import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAxios from 'vue-axios'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import VueWechatTitle from 'vue-wechat-title';
import router from './router';
import './assets/css/custom.css';
import feather from 'feather-icons';

import axios from 'axios'
axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios

Vue.config.productionTip = false;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.use(VueRouter);
Vue.use(VueWechatTitle);
Vue.use(feather);
Vue.use(VueAxios, axios);
// axios.defaults.baseURL='/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

(Vue.prototype.$datePickerOptions = {
  disabledDate(date) {
    return date && date.valueOf() > Date.now()
  },
})