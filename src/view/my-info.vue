<template>
  <form class="my-info">
    <header>
      <figure>
        <img src="https://placehold.it/80x80" alt>
      </figure>
    </header>
    <ul class="info">
      <li>
        <span>用户名：</span>
        <input type="text" placeholder="请输入您的用户名">
      </li>
      <li class="city">
        <span>地址：</span>
        <em>北京</em>
      </li>
      <li>
        <span>职业标签：</span>
        <div class="tap">
          <em>标签1</em>
          <em>标签2</em>
        </div>
      </li>
      <li class="textarea">
        <span>从业简介：</span>
        <textarea name id placeholder="输入您的简介，最多200字" maxlength="200"></textarea>
      </li>
      <li>
        <span>手机号：</span>
        <input type="tel" placeholder="请输入手机号" maxlength="11">
        <button>是否可见</button>
      </li>
    </ul>
    <button class="submit">提交</button>
  </form>
</template>

<script>
export default {};
</script>

<style lang="less">
.my-info {
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 20px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
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
      }
    }
  }
  .info {
    background: #fff;
    padding: 0 20px;
    li {
      position: relative;
      height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      color: #333;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      span {
        width: 75px;
        font-size: 14px;
        flex-shrink: 0;
      }
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #333;
      }
      .tap {
        display: flex;
        flex-direction: row;
        align-items: center;
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
        em {
          margin-right: 5px;
          padding: 2px 5px;
          font-size: 12px;
          border-radius: 4px;
          background: rgba(63, 158, 255, 0.5);
          color: #fff;
          height: 24px;
          line-height: 24px;
        }
      }
      &.textarea {
        height: 100px;
        textarea {
          height: 80px;
          line-height: 20px;
          font-size: 14px;
          width: 100%;
          resize: none;
          outline: none;
          padding-top: 8px;
        }
      }
      &.city {
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
  .submit {
    display: block;
    width: 80%;
    height: 46px;
    border-radius: 4px;
    background: #1aad19;
    color: #fff;
    font-size: 18px;
    margin: 40px auto 0;
  }
}
</style>
