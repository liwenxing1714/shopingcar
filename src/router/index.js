import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from "@/views/home/home"
import allpagess from "@/views/classify/allpagess"
import shop_select from "@/views/shopingcar/shop_select"
import user from "@/views/user/user"
Vue.use(Router)
// 解决重复触发一个路由路径时报错的问题
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
export default new Router({
  routes: [
   
    {
      path: '/',
      name: 'home',
      redirect:"home",
      component: home,
      
    },
    {
      path: '/home',
      name: 'home',
      // redirect:"home",
      component: home,
      
    },
    {
      path: '/user',
      name: 'user',
      component: user,
    },
    {
      path: '/shop_select',
      name: 'shop_select',
      component: shop_select,
    },
    {
      path: '/allpagess',
      name: 'allpagess',
      component: allpagess,
    },
  ]
})
