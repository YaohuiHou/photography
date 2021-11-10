<template>
  <div class="citys-view">
    <h3>选择省市</h3>
    <ul>
      <li v-if="type == 'home'">
        <span @click="activeAll" :class="activeSelect ? 'selected' : ''">全部</span>
      </li>
      <li v-for="(item,index) in province" :key="index">
        <span
          @click="getCity(index)"
          :class="activeSelected == index ? 'selected' : ''"
        >{{item.name}}</span>
        <div class="city" v-if="item.selected">
          <div v-for="(city,i) in citys[activeSelected]" :key="i" class="em" @click="changeCity(i)">
            <em @click="getArea(index,i)" :class="selectMe == i ? 'selected' : ''">{{city.name}}</em>
            <ol v-if="selectMe == i">
              <li
                v-for="(area,e) in areas"
                :key="e"
                :class="area.selected ? 'selected' : ''"
                @click="changeArea(e)"
              >{{area.name}}</li>
            </ol>
          </div>
          <mt-spinner color="#26a2ff" type="fading-circle" v-if="!citys[activeSelected]"></mt-spinner>
        </div>
      </li>
    </ul>
    <div v-if="type == 'home'" class="changeZoon" @click="changeZoon">确认</div>
    <i @click="cityShowFun"></i>
  </div>
</template>

<script>
import XHR from "@/api";
export default {
  props: ["type"],
  data() {
    return {
      activeSelect: false,
      selectMe: -1,
      province: [],
      citys: [],
      nextSelected: -1,
      activeSelected: -1,
      selectCity: [],
      areas: [],
      atCitySelected: 0,
      submitData: []
    };
  },
  mounted() {
    this.getCityList();
  },
  methods: {
    activeAll() {
      this.activeSelect = !this.activeSelect;
      this.submitData = [{ id: "", name: "位置" }];
      this.province[this.nextSelected].selected = false;
      if (this.activeSelect) {
        this.activeSelected = -1;
        this.selectMe = -1;
      }
    },
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
      this.submitData = [];
      this.submitData[0] = item;

      this.activeSelected = index;
      this.activeSelect = false;
      this.province[this.activeSelected].selected = true;
      if (this.nextSelected != -1) {
        this.province[this.nextSelected].selected = false;
        // this.activeSelected = -1;
        this.selectMe = -1;
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
    getArea(index, i) {
      let item = this.citys[this.activeSelected][i];
      this.selectMe = i;
      this.submitData[1] = item;

      // this.citys[this.activeSelected][i].selected = true;
      XHR.getCityList({ pid: item.id }).then(res => {
        if (res.data.errno == 0) {
          let areas = res.data.data;
          areas.map(item => {
            item.selected = false;
            return item;
          });
          this.areas = areas;
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

      this.atCitySelected = i;
      // this.$emit("changeCityFun", this.citys[this.activeSelected][i]);
      // this.cityShowFun();
    },
    // 选中县
    changeArea(i) {
      this.areas.forEach((e, n) => {
        e.selected = false;
        if (n == i) {
          e.selected = true;
        }
      });
      this.submitData[2] = this.areas[i];

      this.$emit("changeCityFun", this.submitData);
      this.cityShowFun();
    },
    cityShowFun() {
      this.$emit("cityShowF", false);
    },
    changeZoon() {
      this.$emit("changeCityFun", this.submitData);
      this.cityShowFun();
    }
  }
};
</script>

<style lang="less">
.citys-view {
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
    width: calc(~"100% - 60px");
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
  > ul {
    position: absolute;
    right: 0;
    top: 0;
    width: calc(~"100% - 60px");
    height: 100vh;
    overflow: auto;
    background: #fff;
    z-index: 1;
    box-shadow: 1px 1px 100px 4px rgba(0, 0, 0, 0.7);
    box-sizing: border-box;
    padding: 50px 20px 45px;
    > li {
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
        .em {
          display: block;
          line-height: 45px;
          font-size: 14px;
          color: #666;
          border-bottom: 1px solid #eee;
          em {
            display: block;
            line-height: 45px;
            font-size: 14px;
          }
          &.selected {
            color: #26a2ff;
            font-size: 16px;
            font-weight: bold;
          }
          ol {
            padding-left: 20px;
            background: #f5f5f5;
          }
          &:last-child {
            border: none;
          }
        }
      }
    }
  }
  .selected {
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
  .changeZoon {
    position: fixed;
    right: 0;
    bottom: 0;
    width: calc(~"100% - 60px");
    height: 45px;
    color: #fff;
    font-size: 14px;
    line-height: 45px;
    text-align: center;
    background: rgba(63, 158, 255, 0.95);
    z-index: 4;
  }
}
.mint-spinner-fading-circle {
  margin: 10px auto;
}
</style>
