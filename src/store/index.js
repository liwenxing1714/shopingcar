import Vue from 'vue'
import Vuex from 'vuex'
// import vuexPersistence from 'vuex-persist'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// const vuexLocal = new vuexPersistence({
//     key: "vuex1",
//     storage: window.localStorage
// });

const store = new Vuex.Store({
    // 全局状态
    state:{
       isLoading:false,
      arr:[1,2,2,2],
      shopcar:[]
    },
    // 同步方法集合
    mutations:{
       addCont(state,obj){
         state.shopcar.unshift(obj)
       }
    },
    actions:{
      
    },
    getters:{},
    modules:{},
   //  plugins  :  [  vuexLocal.plugin  ]
   plugins: [createPersistedState()]
});

export default store;