import Vue from 'vue'
import App from './App.vue'
//导入UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//注册UI
Vue.use(ElementUI);
//导入路由文件
import router from "./router/index.js";
//导入公共css  直接 import 加路径
import  './style/base.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
