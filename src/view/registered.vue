<template>
  <form class="registered">
    <label class="username">
      <input type="text" name="username" placeholder="请输入用户名">
    </label>
    <label class="tel">
      <input type="tel" name="username" placeholder="请输入您的手机号">
    </label>
    <label class="password">
      <input type="password" name="username" placeholder="请输入密码">
    </label>
    <label class="new-password">
      <input type="password" name="username" placeholder="请确认您的密码">
    </label>
    <button @click="submitFun($event)">注册</button>
  </form>
</template>

<script>
import XHR from "@/api";
export default {
  methods: {
    submitFun(e) {
      e.preventDefault();
      XHR.userRegister({
        username: "xiaobei1",
        password: "123456",
        mobile: "15503687033"
      }).then(res => {
        console.log(res);
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
    background: #1aad19;
    color: #fff;
    font-size: 18px;
    margin-bottom: 20px;
  }
}
</style>

