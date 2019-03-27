<template>
  <div class="content-view">
    <header>
      <figure>
        <img src="https://placehold.it/80x80" alt>
      </figure>
      <span>这是我的名字</span>
    </header>
    <ul class="routes">
      <li v-for="(item,index) in routes" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          name: "我的作品",
          link: ""
        },
        {
          name: "我的留言",
          link: ""
        },
        {
          name: "我的租赁",
          link: ""
        },
        {
          name: "我的商城",
          link: ""
        },
        {
          name: "退出",
          link: ""
        }
      ]
    };
  }
};
</script>

<style lang="less">
.content-view {
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 20px;
    background: #fff;
    position: relative;
    margin-bottom: 15px;
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
