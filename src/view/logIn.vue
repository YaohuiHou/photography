<template>
  <form class="login">
    <label class="username">
      <input type="text" name="username" placeholder="请输入用户名">
    </label>
    <label class="password">
      <input type="password" name="username" placeholder="请输入密码">
    </label>
    <button>登录</button>
    <a href="tel:123456" class="forget">忘记密码</a>
    <span class="register">注册</span>
  </form>
</template>

<script>
export default {};
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
    background: #1aad19;
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
