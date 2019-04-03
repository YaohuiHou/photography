<template>
  <form class="my-info">
    <header>
      <figure>
        <img :src="avatar" alt>
      </figure>
    </header>
    <ul class="info">
      <li>
        <span>用户名：</span>
        <input type="text" placeholder="请输入您的用户名" maxlength="20" v-model="username">
      </li>
      <li class="city" @click="cityShow = !cityShow">
        <span>地址：</span>
        <em>{{cityName}}</em>
        <i v-if="cityName == ''">请选择您所在的城市地址</i>
      </li>
      <li @click="tagShow = !tagShow" class="tag-item">
        <span>职业标签：</span>
        <div class="tap">
          <em v-for="(item,index) in tagsObj" v-if="item.selected" :key="index">{{item.name}}</em>
          <i v-if="tag == ''">请选择职业标签</i>
        </div>
      </li>
      <li class="textarea">
        <span>从业简介：</span>
        <textarea name id placeholder="输入您的简介，最多200字" maxlength="200" v-model="content"></textarea>
      </li>
      <li>
        <span>手机号：</span>
        <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="mobile">
        <mt-switch v-model="mobileShow"></mt-switch>
      </li>
    </ul>
    <button class="submit" @click="submitFun($event)">提交</button>
    <transition name="left">
      <tagView @tagShowF="tagShowFun" @tagsObjFun="tagsObjFun" :tag="tag" v-show="tagShow"></tagView>
    </transition>
    <transition name="left">
      <cityView @cityShowF="cityShowFun" @changeCityFun="changeCityFun" v-show="cityShow"></cityView>
    </transition>
  </form>
</template>

<script>
import XHR from "@/api";
import tagView from "../components/tagView.vue";
import cityView from "../components/cityView.vue";
export default {
  components: { tagView, cityView },
  data() {
    return {
      cityName: "",
      cityShow: false,
      tagsObjLength: 0,
      tagsObj: {},
      tagShow: false,
      avatar: "",
      mobile: "",
      username: "",
      provinceId: "",
      cityId: "",
      areaId: "",
      mobileShow: false,
      tag: "",
      content: ""
    };
  },
  mounted() {
    this.getUserAllInfo();
  },
  methods: {
    // 获取个人信息
    getUserAllInfo() {
      XHR.getUserAllInfo().then(res => {
        if (res.data.errno == 0) {
          let data = res.data.data;
          this.avatar = data.avatar;
          this.username = data.username;
          this.mobile = data.mobile;
          this.mobileShow = data.mobileShow == 1 ? true : false;
          this.tag = data.tag;
          this.content = data.content;
          this.provinceId = data.provinceId;
          this.cityId = data.cityId;
          this.areaId = data.areaId;
        }
      });
    },
    // 显示tag
    tagShowFun(n) {
      this.tagShow = n;
    },
    cityShowFun(n) {
      this.cityShow = n;
    },
    changeCityFun(o) {
      this.cityId = o.id;
      this.provinceId = o.pid;
      this.cityName = o.name;
    },
    // 提交tag
    tagsObjFun(o) {
      this.tagsObj = o;
      let tag = [];
      for (const key in this.tagsObj) {
        if (this.tagsObj[key].selected) {
          tag.push(this.tagsObj[key].valueId);
        }
      }
      this.tag = tag.join(",");
    },
    // 提交个人中心
    submitFun(e) {
      e.preventDefault();
      let obj = {
        avatar: this.avatar,
        mobile: this.mobile,
        username: this.username,
        provinceId: this.provinceId,
        cityId: this.cityId,
        areaId: this.areaId,
        mobileShow: this.mobileShow,
        tag: this.tag,
        content: this.content
      };
      XHR.editUserInfo(obj).then(res => {
        if (res.data.errno == 0) {
          console.log(res.data);
        }
      });
    }
  }
};
</script>

<style lang="less">
.my-info {
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px 20px;
    background: #fff;
    position: relative;
    margin-bottom: 10px;
    figure {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      border: 1px solid #eee;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .info {
    background: #fff;
    padding: 0 20px;
    li {
      position: relative;
      min-height: 45px;
      line-height: 45px;
      border-bottom: 1px solid #eee;
      color: #333;
      font-size: 14px;
      display: flex;
      flex-direction: row;
      &.tag-item {
        flex-wrap: wrap;
      }
      > span {
        width: 75px;
        font-size: 14px;
        flex-shrink: 0;
      }
      input {
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: #333;
        font-size: 14px;
      }
      .tap {
        width: calc(~"100% - 75px");
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
        padding: 8px 0;
        &:after {
          content: "";
          position: absolute;
          right: 0px;
          top: 50%;
          width: 6px;
          height: 6px;
          border-top: 1px solid #999;
          border-left: 1px solid #999;
          transform: translateY(-50%) rotate(135deg);
        }
        i {
          color: #999;
          height: 28px;
          line-height: 28px;
        }
        em {
          margin-right: 5px;
          padding: 2px 5px;
          font-size: 12px;
          border-radius: 4px;
          background: rgba(63, 158, 255, 0.5);
          color: #fff;
          height: 24px;
          line-height: 24px;
          &:nth-of-type(n + 4) {
            margin-top: 8px;
          }
        }
      }
      &.textarea {
        height: 100px;
        textarea {
          height: 80px;
          line-height: 20px;
          font-size: 14px;
          width: 100%;
          resize: none;
          outline: none;
          padding-top: 8px;
        }
      }
      &.city {
        i {
          color: #999;
          height: 45px;
          line-height: 45px;
        }
        &:after {
          content: "";
          position: absolute;
          right: 0px;
          top: 50%;
          width: 6px;
          height: 6px;
          border-top: 1px solid #999;
          border-left: 1px solid #999;
          transform: translateY(-50%) rotate(135deg);
        }
      }
    }
  }
  .submit {
    display: block;
    width: 80%;
    height: 46px;
    border-radius: 4px;
    background: #26a2ff;
    color: #fff;
    font-size: 18px;
    margin: 40px auto 0;
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
