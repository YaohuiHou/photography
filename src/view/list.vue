<template>
  <div class="list-view">
    <header>
      <span
        @click="selectedFun(0)"
        :class="selected1 ? 'selected' : ''"
      >{{zoons == '' ? '位置' : zoons}}</span>
      <span @click="selectedFun(1)" :class="selected2 ? 'selected' : ''">租赁</span>
      <span @click="selectedFun(2)" :class="selected3 ? 'selected' : ''">商城</span>
      <span
        @click="selectedFun(3)"
        :class="selected4 ? 'selected' : ''"
      >{{tagName == '' ? '分类' : tagName}}</span>
    </header>
    <div
      class="list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
    >
      <listItem v-for="(item,index) in list" :key="index" :useritem="item"></listItem>
    </div>
    <div class="nothing" v-show="list.length <= 0">
      <span>零</span>
      <p>没有发现任何东西~</p>
    </div>
    <transition name="left">
      <cityView
        @cityShowF="cityShowFun"
        @changeCityFun="changeCityFun"
        :type="'home'"
        v-show="cityShow"
      ></cityView>
    </transition>
    <transition name="left">
      <tagView @tagShowF="tagShowFun" @tagsObjFun="tagsObjFun" v-show="tagShow" :type="'home'"></tagView>
    </transition>
    <footerView :selected="'hall'"></footerView>
  </div>
</template>

<script>
import XHR from "@/api";
import listItem from "../components/listItem.vue";
import cityView from "../components/cityView.vue";
import footerView from "../components/footerView.vue";
import tagView from "../components/tagView.vue";
export default {
  components: { listItem, cityView, footerView, tagView },
  data() {
    return {
      tagsObj: {},
      tagShow: false,
      tagName: "",
      zoons: "",
      cityShow: false,
      page: 1,
      total: 10,
      selected1: false,
      selected2: false,
      selected3: false,
      selected4: false,
      list: [],
      formData: {
        page: 1
      }
    };
  },
  mounted() {
    this.loadMore();
  },
  methods: {
    selectedFun(n) {
      this.page = 1;
      switch (Number(n)) {
        case 0:
          this.cityShow = !this.cityShow;
          break;
        case 1:
          // 租赁
          this.selected2 = !this.selected2;
          this.formData.isMaterial = this.selected2 ? 1 : 0;
          break;
        case 2:
          // 商城
          this.selected3 = !this.selected3;
          this.formData.isStore = this.selected3 ? 1 : 0;
          break;
        case 3:
          // 商城
          this.tagShow = !this.tagShow;
          break;
      }
      this.loadMore();
    },
    // 加载列表
    loadMore() {
      console.log("-------");

      // 判斷
      if (this.list.length >= this.total) return;

      if (this.loadMore.disable) return;
      this.loadMore.disable = true;
      // {
      // province:省份id，
      // city: 城市id，
      // area: 县id
      // type:  个人标签
      // isStore: 是否有商城
      // isMaterial: 是否有器材
      // page: this.page
      // limit: 每页多少条数据（默认为10）
      // sort: 排序的参数（默认为add_time）
      // order: 正序或倒序(默认为desc）
      // }
      this.formData.page = this.page;
      XHR.getUsersList(this.formData).then(res => {
        this.loadMore.disable = false;
        if (res.data.errno == 0) {
          if (this.page == 1) {
            this.list = res.data.data.items;
          } else {
            this.list = [...this.list, ...res.data.data.items];
          }

          this.total = res.data.data.total;
          this.page += 1;
        }
      });
    },
    // 显示tag
    tagShowFun(n) {
      this.tagShow = n;
    },
    // 提交tag
    tagsObjFun(o) {
      this.formData.type = o.valueId;
      this.tagName = o.name;
      this.selected4 = true;
      this.page = 1;

      this.loadMore();
    },
    cityShowFun(n) {
      this.cityShow = n;
    },
    changeCityFun(o) {
      this.page = 1;
      let arr = ["province", "city", "area"];
      let zoons = [];
      arr.forEach((item, index) => {
        if (o[index]) {
          this.formData[item] = o[index].id;
          zoons.push(o[index].name);
        } else {
          this.formData[item] = "";
        }
      });
      this.zoons = zoons.join("-");
      this.selected1 = !this.selected1;
      console.log(this.formData);

      this.loadMore();
    }
  }
};
</script>

<style lang="less" scoped>
.list-view {
  padding: 65px 20px 55px;
  > header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: row;
    background: #fff;
    box-shadow: 0px 1px 10px 1px rgba(0, 0, 0, 0.2);
    z-index: 2;
    span {
      flex: 1;
      line-height: 45px;
      text-align: center;
      color: #333;
      font-size: 14px;
      border-left: 1px solid #eee;
      &.selected {
        color: #fff;
        background: rgba(63, 158, 255, 0.95);
      }
      &:first-child {
        border: none;
      }
      &:first-child,
      &:last-child {
        position: relative;
        overflow: hidden;
        &:after {
          content: "";
          position: absolute;
          right: 0;
          bottom: 0;
          width: 20px;
          height: 20px;
          background: #666;
          transform: translate3d(10px, 14px, 0) rotate(45deg);
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
.left-enter-active,
.left-leave-active {
  transition: all 0.5s;
}
.left-enter,
.left-leave-active {
  opacity: 0.4;
  transform: translateX(100%);
}
</style>
