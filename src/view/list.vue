<template>
  <div class="list-view">
    <headView></headView>
    <div
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <listItem v-for="(item,index) in list" :key="index" :useritem="item"></listItem>
    </div>
  </div>
</template>

<script>
import XHR from "@/api";
import headView from "../components/headView.vue";
import listItem from "../components/listItem.vue";
export default {
  components: { headView, listItem },
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.loadMore();
    XHR.getUsersDefile(32).then(res => {
      console.log(res);
    });
  },
  methods: {
    loadMore() {
      XHR.getUsersList().then(res => {
        if (res.data.errno == 0) {
          this.list = res.data.data.items;
          console.log(this.list);
        }
      });
    }
  }
};
</script>

<style lang="less">
.list {
  padding: 0 20px;
}
</style>
