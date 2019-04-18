import Vue from 'vue'
import Vuex from 'vuex'
import XHR from '../api'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {}
  },
  // 事件
  mutations: {
    // 调用
    // store.commit('isLogin', 10)
    isLogin(state, type) {
      if (type) {
        if (state.isLogin) return
        XHR.getUserAllInfo().then(res => {
          if (res.data.errno == 0) {
            let data = res.data.data;
            state.userInfo = data
            state.isLogin = true;
          } else {
            state.isLogin = false;
            localStorage.removeItem("UserTokenHas")
          }
        })
      } else {
        state.userInfo = {}
        state.isLogin = false;
      }
    },
    gotoLogin(state) {
      XHR.getUserInfo().then(res => {
        if (res.data.errno == 0) {
          state.isLogin = true;
        } else {
          state.isLogin = false;
          localStorage.removeItem("UserTokenHas")
        }
      });
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