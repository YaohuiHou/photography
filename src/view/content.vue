<template>
  <div class="content-view">
    <header @click="$router.push('/myinfo')" v-show="$store.state.isLogin">
      <figure>
        <img :src="infoHeadImg" alt>
      </figure>
      <span>{{infoName}}</span>
    </header>
    <header class="header" v-show="!$store.state.isLogin" @click="$router.push('/login')">
      <mt-button type="primary" size="small">登录</mt-button>
    </header>
    <ul class="routes">
      <li v-for="(item,index) in routes" @click="outLink(index)" :key="index">{{item.name}}</li>
      <li @click="outLogin" v-show="$store.state.isLogin">退出</li>
    </ul>
    <footerView :selected="'mine'"></footerView>
  </div>
</template>

<script>
import XHR from "@/api";
import { Toast } from "mint-ui";
import footerView from "../components/footerView.vue";
export default {
  components: { footerView },
  data() {
    return {
      infoHeadImg: "",
      infoName: "",
      logout: false,
      routes: [
        {
          name: "我的作品",
          link: "/myworks"
        },
        {
          name: "我的留言",
          link: "/mymessage"
        },
        {
          name: "我的租赁",
          link: "/equipment"
        },
        {
          name: "我的商城",
          link: "/mymall"
        },
        {
          name: "联系客服",
          link: "/detail?id=33"
        }
      ]
    };
  },
  mounted() {
    this.$store.commit("isLogin", true);
    this.getUserInfo();

    this.$store.commit("ga", { path: "content", dt: "个人中心" });
  },
  methods: {
    // 获取信息
    getUserInfo() {
      if (this.$store.state.isLogin) {
        this.infoHeadImg = this.$store.state.userInfo.avatar;
        this.infoName = this.$store.state.userInfo.username;
        return;
      }
      XHR.getUserInfo().then(res => {
        if (res.data.errno == 0) {
          this.infoHeadImg = res.data.data.info.avatar;
          this.infoName = res.data.data.info.username;
          this.logout = true;
        } else {
          this.logout = false;
        }
      });
    },
    outLink(index) {
      if (index == 4) {
        Toast({
          message: "有任何问题您可以留言或者直接拨打电话联系我！",
          position: "center",
          duration: 4000
        });
        this.$router.push(this.routes[index].link);
        return;
      }
      if (localStorage.getItem("UserTokenHas")) {
        this.$router.push(this.routes[index].link);
      } else {
        Toast({
          message: "您需要先登录",
          position: "bottom",
          duration: 3000
        });
      }
    },
    // 退出登录
    outLogin() {
      XHR.outLogin({ token: localStorage.getItem("UserTokenHas") }).then(
        res => {
          localStorage.removeItem("UserTokenHas");
          this.$store.commit("isLogin", false);
          this.$store.commit("ga", { path: "outlogin", dt: "退出登录" });
          // window.location.reload();
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.content-view {
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 20px;
    background: #fff;
    position: relative;
    margin-bottom: 15px;
    &.header {
      justify-content: center;
      align-items: center;
    }
    figure {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      border: 1px solid #eee;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        -webkit-object-fit: cover;
        object-fit: cover;
        display: block;
      }
    }
    span {
      font-size: 18px;
      color: #333;
    }
  }
  .routes {
    background: #fff;
    padding: 0 20px;
    li {
      position: relative;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      color: #333;
      font-size: 14px;
      &:after {
        content: "";
        position: absolute;
        right: 0px;
        top: 50%;
        width: 6px;
        height: 6px;
        border-top: 1px solid #999;
        border-left: 1px solid #999;
        transform: translateY(-50%) rotate(135deg);
      }
    }
  }
}
</style>
