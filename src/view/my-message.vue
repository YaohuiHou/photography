<template>
  <div class="message">
    <headView fixed="1" title="我的留言页"></headView>
    <div class="list">
      <div class="list1">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10"
        >
          <li v-for="(item,index) in messages" :key="index" @click="gotoLink(item.toId)">
            <p>{{item.content}}</p>
            <span>{{item.addTime}}</span>
          </li>
        </ul>
      </div>
      <div class="nothing" v-show="messages.length <= 0">
        <span>零</span>
        <p>没有发现任何东西~</p>
      </div>
    </div>
  </div>
</template>

<script>
import XHR from "@/api";
import headView from "../components/headView.vue";
export default {
  components: { headView },
  data() {
    return {
      selected: false,
      messages: [],
      page: 1,
      total: 10
    };
  },
  mounted() {
    this.$store.commit("isLogin", true);
    this.loadMore();
    this.$store.commit("ga", { path: "mymess", dt: "留言页" });
  },
  methods: {
    gotoLink(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    },
    // 获取留言列表
    loadMore() {
      if (this.messages.length >= this.total) return;

      if (this.loadMore.disable) return;
      this.loadMore.disable = true;
      XHR.getComment({
        page: this.page,
        limit: 10
      }).then(res => {
        this.loadMore.disable = false;
        if (res.data.errno == 0) {
          if (this.page == 1) {
            this.messages = res.data.data.data;
          } else {
            this.messages = [...this.messages, ...res.data.data.data];
          }

          this.total = res.data.data.count;
          this.page += 1;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.message {
  position: relative;
  width: 100%;
  overflow: hidden;
  .list {
    padding-top: 45px;
    .list1 {
    }
    ul {
      width: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      li {
        min-height: 80px;
        padding: 15px 20px;
        background: #fff;
        margin-bottom: 14px;
        border-radius: 4px;
        box-sizing: border-box;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
        p {
          line-height: 24px;
          font-size: 14px;
          color: #666;
          max-height: 48px;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }
        span {
          display: block;
          line-height: 24px;
          font-size: 12px;
          text-align: right;
          color: #999;
        }
      }
    }
  }
}
.nothing {
  padding-top: 120px;
  span {
    font-family: "photo font";
    display: block;
    line-height: 60px;
    text-align: center;
    font-size: 60px;
    color: #999;
  }
  p {
    padding-top: 20px;
    line-height: 24px;
    font-size: 16px;
    color: #999;
    text-align: center;
  }
}
</style>
