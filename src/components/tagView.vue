<template>
  <div class="tags-view">
    <h3>职业标签</h3>
    <ul>
      <li
        @click="activeAll"
        :class="activeSelected == -1 ? 'selected' : ''"
        v-if="type == 'home'"
      >全部</li>
      <li
        v-for="(item,index) in tags"
        :key="index"
        :class="tagClass(index)"
        @click="tagsFun(index)"
      >{{item.name}}</li>
    </ul>
    <div v-if="type == 'home'" class="changeZoon" @click="changeZoon">确认</div>
    <i @click="tagShowFun"></i>
  </div>
</template>

<script>
import XHR from "@/api";
export default {
  props: ["tag", "type"],
  data() {
    return {
      tagsNum: 0,
      tags: [],
      tagObj: {},
      activeSelected: -2,
      nextSelected: -2,
      homeTag: {}
    };
  },
  watch: {
    tagObj(arr) {
      this.tagsNum = 0;
      for (const key in arr) {
        console.log(key);

        if (arr[key].selected) {
          this.tagsNum += 1;
        }
      }
    }
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
    tagClass(i) {
      if (this.tag) {
        this.tag.split(",").map(e => {
          if (this.tags[i].valueId == e) {
            this.tags[i].selected = true;
            // this.tagObj[i] = this.tags[i];
            this.$set(this.tagObj, i, this.tags[i]);
          }
        });
      }

      return this.tags[i].selected ? "selected" : "";
    },
    activeAll() {
      this.homeTag = { name: "全部", valueId: "" };
      this.activeSelected = -1;
      if (this.nextSelected > -1) {
        this.tags[this.nextSelected].selected = false;
      }
      this.nextSelected = this.activeSelected;
    },
    changeZoon() {
      this.$emit("tagsObjFun", this.homeTag);
      this.tagShowFun();
    },
    // 获取摄影分类
    getTypeList() {
      XHR.getTypeList().then(res => {
        if (res.data.errno == 0) {
          let data = res.data.data;
          let tag = [];
          if (this.tag) {
            tag = this.tag.split(",");
          }

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
      if (this.type == "home") {
        if (this.nextSelected > -1) {
          this.tags[this.nextSelected].selected = false;
        }
        this.activeSelected = i;
        this.nextSelected = this.activeSelected;

        this.tags[i].selected = true;

        this.homeTag = this.tags[i];
      } else {
        // 多选
        if (this.tagsNum >= 3 && !this.tags[i].selected) {
          return;
        } else {
          if (this.tags[i].selected) {
            this.tagsNum -= 1;
          } else {
            this.tagsNum += 1;
          }
        }
        this.tags[i].selected = !this.tags[i].selected;
        this.tagObj[i] = this.tags[i];
        this.$emit("tagsObjFun", this.tagObj);
      }
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
    padding: 50px 20px 50px;
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
  .changeZoon {
    position: fixed;
    right: 0;
    bottom: 0;
    width: calc(~"100% - 90px");
    height: 45px;
    color: #fff;
    font-size: 14px;
    line-height: 45px;
    text-align: center;
    background: rgba(63, 158, 255, 0.95);
    z-index: 4;
  }
}
</style>
