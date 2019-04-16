<template>
  <div class="message">
    <!-- <header>
      <span :class="[selected?'':'selected']" @click="selected = false">回复</span>
      <span :class="[selected?'selected':'']" @click="selected = true">留言</span>
    </header>-->
    <div class="list">
      <div class="list1">
        <ul
          v-infinite-scroll="loadMore1"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li v-for="i in 20">{{i}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: false
    };
  },
  mounted() {
    this.loadMore();
  },
  methods: {
    loadMore() {
      console.log(213);
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  position: relative;
  width: 100%;
  overflow: hidden;
  header {
    background: #fff;
    height: 45px;
    display: flex;
    flex-direction: row;
    span {
      flex: 1;
      text-align: center;
      line-height: 45px;
      color: #333;
      font-size: 14px;
      &.selected {
        background: #26a2ff;
        color: #fff;
      }
      &:last-child {
        border-left: 1px solid #eee;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: row;
    transition: all 0.6s;
    &.l1 {
      transform: translate3d(0, 0, 0);
    }
    &.l2 {
      transform: translate3d(-50%, 0, 0);
    }
    .list1,
    .list2 {
      width: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    ul {
      width: 100%;
      padding: 0 15px;
      box-sizing: border-box;
      li {
        height: 80px;
        background: #fff;
        margin-top: 14px;
        border-radius: 4px;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
