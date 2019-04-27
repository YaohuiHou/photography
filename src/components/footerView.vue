<template>
  <footer>
    <span @click="gotoLink('/')" :class="selected == 'hall' ? 'selected' : ''">
      <i slot="icon" class="hall">厅</i>
      大厅
    </span>
    <span @click="gotoLink('/material')" :class="selected == 'data' ? 'selected' : ''">
      <i slot="icon" class="data">资</i>
      摄影圈
    </span>
    <span @click="gotoLink('/content')" :class="selected == 'mine' ? 'selected' : ''">
      <i slot="icon" class="mine">人</i>
      我的
    </span>
  </footer>
</template>

<script>
import { Tabbar, TabItem } from "mint-ui";
export default {
  props: ["selected"],
  data() {
    return {};
  },
  methods: {
    gotoLink(name) {
      this.$router.push(name);
    }
  }
};
</script>

<style lang="less" scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 55px;
  z-index: 10;
  display: flex;
  flex-direction: row;
  background: #fff;
  box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.2);
}
span {
  flex: 1;
  text-align: center;
  font-size: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  i {
    width: 24px;
    height: 24px;
    margin: 0 auto 10px;
    height: 18px;
    display: block;
    font-family: "photo font";
    font-size: 18px;
    color: #999;
    font-weight: bold;
  }
  &.selected {
    color: #26a2ff;
    i {
      color: #26a2ff;
    }
  }
}
</style>
