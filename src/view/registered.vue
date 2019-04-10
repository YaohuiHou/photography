<template>
  <form class="registered">
    <label class="username">
      <input type="text" name="username" v-model="username" placeholder="请输入用户名">
    </label>
    <label class="tel">
      <input type="tel" maxlength="11" name="tel" v-model="tel" placeholder="请输入您的手机号">
    </label>
    <label class="password">
      <input type="password" name="password" v-model="password" placeholder="请输入密码">
    </label>
    <label class="new-password">
      <input type="password" name="password2" v-model="password2" placeholder="请确认您的密码">
    </label>
    <button @click="submitFun($event)">注册</button>
  </form>
</template>

<script>
import XHR from "@/api";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      username: "",
      tel: "",
      password: "",
      password2: ""
    };
  },
  methods: {
    submitFun(e) {
      e.preventDefault();
      if (this.username.trim() == "") {
        Toast({
          message: "请输入您的用户名",
          position: "top",
          duration: 3000
        });
        return;
      }
      if (this.password.trim() == "" || this.password2.trim() == "") {
        Toast({
          message: "请输入您的密码",
          position: "top",
          duration: 3000
        });
        return;
      }
      if (this.password.trim() != this.password2.trim()) {
        Toast({
          message: "两次密码需要输入一致",
          position: "top",
          duration: 3000
        });
        return;
      }
      if (
        !/^1(([38]\d)|(4[57])|(5[012356789])|(6[6])|(7[0678])|(9[89]))\d{8}$/.test(
          this.tel.trim()
        )
      ) {
        Toast({
          message: "请输入正确的手机号",
          position: "top",
          duration: 3000
        });
        return;
      }

      if (this.submitFun.disabled) return;
      this.submitFun.disabled = true;
      XHR.userRegister({
        username: this.username,
        password: this.password,
        mobile: this.tel
      }).then(res => {
        this.submitFun.disabled = false;
        if (res.data.errno == 0) {
          localStorage.setItem("UserTokenHas", res.data.data.token);
          Toast({
            message: "注册成功",
            iconClass: "icon icon-success"
          });
          this.$router.go(-1);
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
.registered {
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  padding: 60px 30px;
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
    &.new-password {
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
    margin-bottom: 20px;
  }
}
</style>

