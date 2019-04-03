import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
  },
  // 事件
  mutations: {
    // 调用
    // store.commit('isLogin', 10)
    isLogin(state) {
      console.log(state);
    }
  },
  actions: {
    isLogin(context) {
      // context.commit('isLogin')
      console.log(123);
    }
  }
})

export default store