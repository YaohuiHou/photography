<template>
  <div class="tags-view">
    <h3>职业标签</h3>
    <ul>
      <li
        v-for="(item,index) in tags"
        :key="index"
        :class="item.selected ? 'selected' : ''"
        @click="tagsFun(index)"
      >{{item.name}}</li>
    </ul>
    <i @click="tagShowFun"></i>
  </div>
</template>

<script>
import XHR from "@/api";
export default {
  props: ["tag"],
  data() {
    return {
      tags: [],
      tagObj: {}
    };
  },
  mounted() {
    let tags = localStorage.getItem("TAGSList");
    if (tags) {
      this.tags = JSON.parse(tags);
    } else {
      this.getTypeList();
    }
  },
  methods: {
    // 获取摄影分类
    getTypeList() {
      XHR.getTypeList().then(res => {
        if (res.data.errno == 0) {
          let data = res.data.data;
          let tag = this.tag.split(",");

          data.map(item => {
            item.selected = false;
            tag.forEach(element => {
              if (item.valueId == element.valueId) {
                item.selected = true;
              }
            });
            return item;
          });
          this.tags = data;
          localStorage.setItem("TAGSList", JSON.stringify(this.tags));
        }
      });
    },
    tagsFun(i) {
      this.tags[i].selected = !this.tags[i].selected;
      this.tagObj[i] = this.tags[i];

      this.$emit("tagsObjFun", this.tagObj);
    },
    tagShowFun() {
      this.$emit("tagShowF", false);
    }
  }
};
</script>

<style lang="less">
.tags-view {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  i {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  h3 {
    position: absolute;
    right: 0;
    top: 0;
    width: calc(~"100% - 90px");
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    z-index: 2;
    color: #333;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  ul {
    position: absolute;
    right: 0;
    top: 0;
    width: calc(~"100% - 90px");
    height: 100vh;
    overflow: auto;
    background: #fff;
    z-index: 1;
    box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    padding: 50px 20px 0;
    li {
      border-bottom: 1px solid #eee;
      line-height: 45px;
      padding-left: 10px;
      font-size: 14px;
      color: #666;
      &.selected {
        color: #26a2ff;
        font-size: 16px;
        position: relative;
        font-weight: bold;
        &:after {
          content: "\52fe";
          font-family: "photo font";
          position: absolute;
          right: 0;
          top: 0;
          width: 45px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-size: 12px;
          color: #26a2ff;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
