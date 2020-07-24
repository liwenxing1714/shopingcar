// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store  from "@/store/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//设置axios对象
//import axios from "axios";
import axios from "@/utils/request";//引入axios封装的拦截器对象
Vue.prototype.$axios = axios;//this.$axios


//引入vant
import vant from "vant"
import 'vant/lib/index.css';
Vue.use(vant)


// import { Field } from 'vant';
// import { Button } from 'vant';
// import { Form } from 'vant';
// Vue.use(Field);
// Vue.use(Button);
// Vue.use(Form);
// import { Popup } from 'vant';
// Vue.use(Popup);
// import { Picker } from 'vant';
// Vue.use(Picker);
// import { Image as VanImage } from 'vant';
// Vue.use(VanImage);
// import { Area } from 'vant';
// Vue.use(Area);

// landing显示影藏
// 请求拦截器
axios.interceptors.request.use((config)=>{
  store.state.isLoading=true
  // console.log(config)
  return config
})
// 相应拦截器
axios.interceptors.response.use((response)=>{
  // console.log(response.status)
  if(response.status==200){
    store.state.isLoading=false
    return response
  }

  


})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})