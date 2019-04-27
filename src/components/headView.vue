<template>
  <div :class="['globle-head',fixed ? 'fixed' : '']">
    <span class="left" @click="goback">左</span>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
export default {
  props: ["fixed", "title", "rotate"],
  methods: {
    goback() {
      if (this.rotate) {
        this.$router.push(this.rotate);
        return;
      }
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.globle-head {
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #fff;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  padding: 0 50px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  span {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 14px;
    color: #333;
    font-family: "photo font";
  }
  h3 {
    line-height: 45px;
    width: 100%;
    color: #333;
    font-size: 16px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
  }
}
</style>
