<template>
  <div class="tags">
    <h3>选择省市</h3>
    <ul>
      <li v-for="(item,index) in province" :key="index">
        <span @click="getCity(index)">{{item.name}}</span>
        <div class="city" v-if="item.selected">
          <em
            v-for="(city,i) in citys[activeSelected]"
            :key="i"
            :class="city.selected ? 'selected' : '1'"
            @click="changeCity(i)"
          >{{city.name}}</em>
          <mt-spinner color="#26a2ff" type="fading-circle" v-if="!citys[activeSelected]"></mt-spinner>
        </div>
      </li>
    </ul>
    <i @click="cityShowFun"></i>
  </div>
</template>

<script>
import XHR from "@/api";
export default {
  props: [],
  data() {
    return {
      province: [],
      citys: [],
      nextSelected: -1,
      activeSelected: -1,
      selectCity: []
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    // 获取省份
    getCityList() {
      XHR.getCityList({ pid: 0 }).then(res => {
        if (res.data.errno == 0) {
          let data = res.data.data;
          data.map(item => {
            item.selected = false;
            return item;
          });
          this.province = data;
        }
      });
    },
    // 获取城市
    getCity(index) {
      let item = this.province[index];
      this.activeSelected = index;
      this.province[this.activeSelected].selected = true;
      if (this.nextSelected != -1) {
        this.province[this.nextSelected].selected = false;
      }
      this.nextSelected = this.activeSelected;
      XHR.getCityList({ pid: item.id }).then(res => {
        if (res.data.errno == 0) {
          let citys = res.data.data;
          citys.map(item => {
            item.selected = false;
            return item;
          });
          this.$set(this.citys, index, citys);
        }
      });
    },
    // 选中城市
    changeCity(i) {
      this.citys[this.activeSelected][i].selected = true;
      if (this.selectCity.length > 0) {
        this.citys[this.selectCity[0]][this.selectCity[1]].selected = false;
      }
      this.selectCity = [this.activeSelected, i];

      this.$emit("changeCityFun", this.citys[this.activeSelected][i]);
      this.cityShowFun();
    },
    cityShowFun() {
      this.$emit("cityShowF", false);
    }
  }
};
</script>

<style lang="less">
.tags {
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
      line-height: 45px;
      padding-left: 10px;
      font-size: 14px;
      color: #666;
      span {
        display: block;
        line-height: 45px;
      }
      .city {
        border-bottom: 1px solid #eee;
        padding-left: 20px;
        em {
          display: block;
          line-height: 45px;
          font-size: 14px;
          color: #666;
          border-bottom: 1px solid #eee;
          &.selected {
            color: #26a2ff;
            font-size: 16px;
            font-weight: bold;
          }
          &:last-child {
            border: none;
          }
        }
      }
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
.mint-spinner-fading-circle {
  margin: 10px auto;
}
</style>
