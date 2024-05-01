import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import request from './utils/request';
import './assets/css/global.css'

//这一行配置 Vue.js，在生产模式下不显示生产提示。它禁用了在浏览器控制台中显示开发提示。
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.request = request;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
