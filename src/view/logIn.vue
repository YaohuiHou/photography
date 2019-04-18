<template>
  <form class="login">
    <label class="username">
      <input type="text" name="username" v-model="username" placeholder="请输入用户名" maxlength="20">
    </label>
    <label class="password">
      <input type="password" name="password" v-model="password" placeholder="请输入密码" maxlength="16">
    </label>
    <button @click="submitFun($event)">登录</button>
    <em class="forget" @click="forget">忘记密码</em>
    <span class="register" @click="$router.push('/register')">注册</span>
  </form>
</template>

<script>
import XHR from "@/api";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    console.log(this.$router);
  },
  methods: {
    // 忘记密码
    forget() {
      if (this.username == "") {
        Toast({
          message: "请输入正确的用户名,方便获取密码",
          position: "top",
          duration: 3000
        });
      }
      MessageBox.confirm(
        "为了确保您的信息安全，会由管理员通知您的正确密码，是否联系管理员?"
      ).then(action => {
        if (action == "confirm") {
          XHR.getPassword({
            username: this.username
          }).then(res => {
            if (res.data.errno == 0) {
              window.open("tel:17710096910");
            }
          });
        }
      });
    },
    submitFun(e) {
      e.preventDefault();
      if (this.password == "" || this.username == "") {
        Toast({
          message: "请输入正确的用户名和密码",
          position: "top",
          duration: 3000
        });
      }

      if (this.submitFun.disabled) return;
      this.submitFun.disabled = true;
      XHR.userLogin({
        username: this.username,
        password: this.password
      }).then(res => {
        this.submitFun.disabled = false;
        if (res.data.errno == 0) {
          localStorage.setItem("UserTokenHas", res.data.data.token);
          Toast({
            message: "登录成功",
            iconClass: "icon icon-success"
          });
          this.$router.go(-1);
          this.$store.commit("isLogin", true);
        } else {
          Toast({
            message: res.data.errmsg,
            position: "top",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  padding: 100px 30px;
  label {
    display: block;
    height: 46px;
    border: 1px solid #eee;
    box-sizing: border-box;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
    padding: 3px 20px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 4px;
    &.password {
      margin-bottom: 40px;
    }
    input {
      width: 100%;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      color: #333;
    }
  }
  button {
    display: block;
    width: 100%;
    height: 46px;
    border-radius: 4px;
    background: #26a2ff;
    color: #fff;
    font-size: 18px;
  }
  .forget {
    float: right;
    margin-top: 20px;
    color: #666;
    font-size: 14px;
    text-decoration: underline;
  }
  .register {
    position: absolute;
    bottom: 40px;
    left: 30px;
    width: calc(~"100% - 60px");
    height: 46px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #666;
    color: #666;
    line-height: 44px;
    text-align: center;
    font-size: 18px;
  }
}
</style>
