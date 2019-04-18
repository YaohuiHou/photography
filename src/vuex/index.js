import Vue from 'vue'
import Vuex from 'vuex'
import XHR from '../api'
import axios from "axios";
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
    },
    ga(state, o) {

      axios.get('https://www.google-analytics.com/collect?v=1&_v=j73&a=294311963&t=pageview&_s=1&dl=https%3A%2F%2Fwww.goodwell.top%2F' + o.path + '&ul=zh-cn&de=UTF-8&dt=' + o.dt + '&sd=24-bit&sr=375x667&vp=375x667&je=0&_u=AACAAUAB~&jid=&gjid=&cid=191417466.1555511177&tid=UA-138563770-1&_gid=1898414148.1555511177&gtm=2ou430&z=182834176')
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