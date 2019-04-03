<template>
  <mt-tabbar v-model="selected">
    <mt-tab-item id="hall" @click="gotoLink('hall')">
      <i slot="icon" class="hall">厅</i>
      大厅
    </mt-tab-item>
    <mt-tab-item id="mine" @click="gotoLink('mine')">
      <i slot="icon" class="mine">人</i>
      我的
    </mt-tab-item>
  </mt-tabbar>
</template>

<script>
import { Tabbar, TabItem } from "mint-ui";
export default {
  data() {
    return {
      selected: "hall"
    };
  },
  methods: {
    gotoLink(name) {
      console.log(name);

      this.$store.commit("isLogin");
    }
  }
};
</script>

<style lang="less" scoped>
.mint-tab-item {
  .mint-tab-item-icon {
    width: 24px;
    height: 24px;
    margin: 0 auto 5px;
    i {
      height: 18px;
      display: block;
      font-family: "photo font";
      font-size: 18px;
      color: #999;
      font-weight: bold;
    }
  }
  &.is-selected {
    .mint-tab-item-icon {
      i {
        color: #26a2ff;
      }
    }
  }
}
</style>
