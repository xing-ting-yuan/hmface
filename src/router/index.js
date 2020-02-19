import Vue from 'vue'
//导入路由
import VueRouter from 'vue-router'
//导入主见
import login from '../views/login/index.vue'

//注册路由
Vue.use(VueRouter)

//准备组件

//设置路由规则
const routes  = [
    { path:'/',
      component:login
    },
]

//创建路由对象
const router = new VueRouter ({
    routes
})
export default router