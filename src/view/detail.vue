<template>
  <div class="detail" v-show="dataInfo">
    <headView fixed="1" title="详情页" rotate="/"></headView>
    <transition name="opacity">
      <div class="load" v-if="loading">
        <div class="load-header">
          <div class="load-figure"></div>
          <div class="load-info">
            <span class="load-name"></span>
            <span class="load-city"></span>
          </div>
        </div>
        <ul class="load-tags">
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <p class="load-content"></p>
      </div>
    </transition>
    <div class="header" v-if="dataInfo.info">
      <figure>
        <img :src="dataInfo.info.avatar" alt>
      </figure>
      <div class="info">
        <span class="name">{{dataInfo.info.username}}</span>
        <span
          v-if="dataInfo.info.provinceName"
          class="zone"
        >{{dataInfo.info.provinceName}}-{{dataInfo.info.cityName}}-{{dataInfo.info.areaName}}</span>
      </div>
      <a class="tel" :href="'tel:'+dataInfo.info.mobile" v-if="dataInfo.info.mobileShow">话</a>
    </div>
    <ul class="taps">
      <li v-for="(item,index) in tagsObj" v-if="item.selected" :key="index">{{item.name}}</li>
    </ul>
    <p class="content" v-if="dataInfo.info && dataInfo.info.content">{{dataInfo.info.content}}</p>
    <div class="my-works" v-if="dataInfo.collection">
      <h3>我的作品</h3>
      <div class="swiper-container works" id="works">
        <div class="swiper-wrapper">
          <div v-for="(item, index) in dataInfo.collection" :key="index" class="swiper-slide">
            <img v-lazy="item">
          </div>
        </div>
        <div class="swiper-pagination" id="pagination1"></div>
      </div>
      <!-- <p>这里是简介，这里是简介，这里是简介，这里是简介，这里是简介，</p> -->
    </div>
    <div class="my-equipment" v-if="dataInfo.material">
      <h3>我的器材</h3>
      <p>{{dataInfo.material.content}}</p>
      <div class="swiper-container equipment" id="equipment" v-if="dataInfo.material">
        <div class="swiper-wrapper">
          <div v-for="(item, index) in dataInfo.material.picUrls" :key="index" class="swiper-slide">
            <img :src="item">
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-show="dataInfo.material">
      <!-- <label for="map" class="map">
        <input type="text" maxlength="40" placeholder="请输入您要搜索的地址" id="map" v-model="mapValue">
        <span @click="soMap">搜索</span>
      </label>-->
      <div id="container"></div>
    </div>
    <div class="my-mall" v-if="dataInfo.store">
      <h3>我的商城</h3>
      <a
        :href="dataInfo.store.outUrl.indexOf('http') == 0 ? dataInfo.store.outUrl : '//'+dataInfo.store.outUrl"
        class="goto"
        target="_blank"
      >
        <img :src="dataInfo.store.picUrl" alt>
        <p>{{dataInfo.store.desc}}</p>
      </a>
    </div>
    <div class="my-message">
      <h3>留言</h3>
      <p>这里可以畅所欲言，所有留言内容只有你自己和版主可以看到哦！不用担心会有其他用户看到私密性的话题，例如询问手机号或者其他交流。</p>
      <ul v-if="messages.length > 0">
        <li
          v-for="(item,index) in messages"
          :key="index"
          :class="item.fromId == mineId ? 'right' : 'left'"
          @click="gotoComment(item.fromId)"
        >
          <div v-if="item.fromId != mineId">
            <figure>
              <img :src="item.fromInfo.avatar">
            </figure>
            <div class="info">
              <em>{{item.fromInfo.username}}</em>
              <p>
                <i>@{{item.toInfo.username}}：</i>
                {{item.content}}
              </p>
              <span>{{item.addTime}}</span>
            </div>
          </div>
          <!-- 发出的信息 -->
          <div v-if="item.fromId == mineId">
            <div class="info">
              <em>{{item.fromInfo.username}}</em>
              <p>
                <i>@{{item.toInfo.username}}：</i>
                {{item.content}}
              </p>
              <span>{{item.addTime}}</span>
            </div>
            <figure>
              <img :src="item.fromInfo.avatar">
            </figure>
          </div>
        </li>
      </ul>
      <div class="nothing" v-else @click="gotoComment(0)">
        <span>空</span>
        <em>快来留言哟~</em>
      </div>
    </div>
    <!-- 悬浮 -->
    <span class="question" @click="gotoComment(0)">提问</span>
    <transition name="fade">
      <div class="toast-view" v-show="toastShow">
        <form>
          <textarea maxlength="100" v-model="textContent" name placeholder="请输入你想对我说的话~"></textarea>
          <mt-button type="primary" @click="userComment($event)">提交</mt-button>
        </form>
        <i @click="toastShow = false"></i>
      </div>
    </transition>
  </div>
</template>

<script>
import XHR from "@/api";
import { Toast, MessageBox } from "mint-ui";
import headView from "../components/headView.vue";
import { clearInterval } from "timers";
export default {
  components: { headView },
  data() {
    return {
      loading: true,
      toId: 0,
      mineId: 0,
      userId: "",
      textContent: "",
      tags: [],
      tagsObj: {},
      toastShow: false,
      dataInfo: {},
      messages: [],
      mapValue: "",
      local: null,
      map: null
    };
  },
  mounted() {
    this.swiperFun();
    let tags = localStorage.getItem("TAGSList");
    if (tags) {
      this.tags = JSON.parse(tags);
    } else {
      this.getTypeList();
    }

    this.userId = this.$route.query.id;
    this.getDetail(this.$route.query.id);
    this.getComment();
    this.$store.commit("isLogin", true);

    this.$store.commit("ga", { path: "detail", dt: "详情页" });
  },
  methods: {
    swiperFun() {
      if (!this.isInclude("swiper.min.js")) {
        var script = document.createElement("script"); //1、创建元素
        script.src = "./static/swiper.min.js";
        var body = document.querySelector("body"); //2、找到父级元素
        body.appendChild(script);
        console.log("添加");
      }
    },
    isInclude(name) {
      var es = document.querySelectorAll("script");
      es.forEach(item => {
        item.getAttur;
      });
      for (var i = 0; i < es.length; i++) {
        if (es[i]["src"].indexOf(name) != -1) return true;
      }

      return false;
    },
    // soMap() {
    //   if (this.mapValue == "") {
    //     Toast({
    //       message: "搜索地址不能为空",
    //       position: "top",
    //       duration: 3000
    //     });
    //   } else {
    //     console.log(this.mapValue);

    //     this.local.search(this.mapValue); // 创建标注
    //     this.map.addOverlay(this.local);
    //   }
    // },
    // 地图
    myMap() {
      let map = new BMap.Map("container");
      map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
      let local = new BMap.LocalSearch(map, {
        renderOptions: { map: map, panel: "results" }
      });
      local.search(
        this.dataInfo.info.provinceName +
          this.dataInfo.info.cityName +
          this.dataInfo.info.areaName
      ); // 创建标注
      console.log(local);

      map.addOverlay(local);
      setTimeout(() => {
        map.setZoom(14);
      }, 500);
    },
    getDetail(id) {
      XHR.getUsersDefile({ otherUser: id }).then(res => {
        if (res.data.errno == 0) {
          this.loading = false;
          this.dataInfo = res.data.data;
          let tag = res.data.data.info.tag;
          tag.split(",").forEach(ele => {
            this.tags.forEach((item, index) => {
              if (item.valueId == ele) {
                item.selected = true;
                this.$set(this.tagsObj, index, item);
              }
            });
          });
          if (this.isInclude("./static/swiper.min.js")) {
            setTimeout(() => {
              this.newSwiper();
              this.myMap();
            }, 400);
          } else {
            setTimeout(() => {
              this.newSwiper();
              this.myMap();
            }, 1000);
          }
        }
      });
    },
    newSwiper() {
      let swiper = new Swiper("#works", {
        speed: 300,
        pagination: "#pagination1",
        paginationElement: "span"
      });
      let swiper2 = new Swiper("#equipment", {
        speed: 500,
        spaceBetween: 6,
        loop: true
      });
    },
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
    // 获取留言列表
    getComment() {
      XHR.getmyComment({
        otherUser: this.userId,
        page: 1,
        limit: 40,
        sort: "add_time",
        order: "asc"
      }).then(res => {
        if (res.data.errno == 0) {
          if (this.$store.state.isLogin) {
            this.mineId = this.$store.state.userInfo.id;
          }
          this.messages = res.data.data.data;
        }
      });
    },
    // 提交留言
    userComment(e) {
      e.preventDefault();
      if (this.textContent.trim() == "") {
        Toast({
          message: "请输入留言内容",
          position: "top",
          duration: 3000
        });
      }
      if (this.userComment.disable) return;
      this.userComment.disable = true;

      XHR.userComment({
        toId: this.toId,
        topicId: this.userId,
        content: this.textContent
      }).then(res => {
        this.userComment.disable = false;
        if (res.data.errno == 0) {
          Toast({
            message: "发布留言成功",
            iconClass: "icon icon-success"
          });
          this.toastShow = false;
          this.textContent = "";
          this.getComment();
        }
      });
    },
    // 提问
    gotoComment(toId) {
      if (localStorage.getItem("UserTokenHas")) {
        this.toastShow = true;
        this.toId = toId == 0 ? this.userId : toId;
        console.log(this.toId);
      } else {
        MessageBox.confirm("您需要先登录?").then(action => {
          if (action == "confirm") {
            this.$router.push("/login");
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.container {
  width: 100%;
  padding: 10px 20px;
  margin: 20px 0;
  box-sizing: border-box;
  position: relative;
  background: #fff;
  .map {
    position: relative;
    margin-bottom: 10px;
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      display: block;
      width: 100%;
      line-height: 30px;
      padding: 0 10px;
      box-sizing: border-box;
      background: #fff;
      border-radius: 4px;
      font-size: 14px;
      border: 1px solid #eee;
    }
    span {
      flex-shrink: 0;
      margin-left: 20px;
      display: block;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      border-radius: 6px;
      background: rgba(63, 158, 255, 1);
    }
  }
  #container {
    width: 100%;
    height: 250px;
    box-shadow: 0px 0px 10px 1px #eee;
  }
}
.detail {
  padding-top: 45px;
  .load {
    position: fixed;
    left: 0;
    top: 45px;
    width: 100%;
    height: calc(~"100vh - 45px");
    background: #f3f4f5;
    z-index: 8;
    .load-header {
      height: 200px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0px 0px 10px 1px #999;
      display: flex;
      flex-direction: row;
      padding: 20px;
      box-sizing: border-box;
      align-items: center;
      position: relative;
      .load-figure {
        width: 160px;
        height: 160px;
        border-radius: 6px;
        box-shadow: 0px 0px 10px 1px #999;
        overflow: hidden;
        background: #eee;
        flex-shrink: 0;
        opacity: 0.2;
      }
      .load-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        span {
          display: block;
          height: 28px;
          font-size: 24px;
          margin-bottom: 10px;
          background: #999;
          opacity: 0.1;
          &.load-name {
            width: 72px;
          }
          &.load-city {
            width: 180px;
          }
        }
      }
    }
    .load-tags {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 20px 20px;
      li {
        margin-right: 10px;
        width: 66px;
        height: 28px;
        background: #999;
        opacity: 0.1;
        border-radius: 4px;
      }
    }
    .load-content {
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      margin: 20px 20px;
      height: 180px;
    }
  }
  .header {
    height: 200px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0px 0px 10px 1px #999;
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    figure {
      width: 160px;
      height: 160px;
      border-radius: 6px;
      box-shadow: 0px 0px 10px 1px #999;
      overflow: hidden;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        -webkit-object-fit: cover;
        display: block;
      }
    }
    .info {
      width: 100%;
      padding-left: 10px;
      box-sizing: border-box;
      overflow: hidden;
      span {
        display: block;
        width: 100%;
        text-align: right;
        color: #333;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.name {
          font-weight: bold;
          line-height: 28px;
          font-size: 24px;
          margin-bottom: 10px;
        }
        &.zone {
          font-size: 16px;
          line-height: 24px;
          color: #666;
        }
      }
    }
    .tel {
      position: absolute;
      right: 20px;
      bottom: 20px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-family: "photo font";
      color: rgba(63, 158, 255, 0.7);
      font-size: 24px;
      border-radius: 50%;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
      animation: rotate 1s linear infinite;
    }
  }
  .taps {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px 20px;
    li {
      margin-right: 10px;
      padding: 2px 5px;
      font-size: 14px;
      border-radius: 4px;
      background: rgba(63, 158, 255, 0.5);
      color: #fff;
      height: 24px;
      line-height: 24px;
    }
  }
  .content {
    margin: 20px 20px;
    padding: 10px;
    color: #333;
    line-height: 24px;
    font-size: 14px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10px 1px rgba(255, 255, 255, 0.9);
    border-radius: 8px;
  }
  .my-works {
    padding: 20px 0;
    h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    .works {
      width: 100%;
      height: 280px;
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.6);
      position: relative;
      .swiper-wrapper {
        position: relative;
        width: 1000%;
        .swiper-slide {
          float: left;
          width: 10%;
          height: 280px;
          position: relative;
          overflow: hidden;
          border-radius: 8px;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            -webkit-object-fit: cover;
            display: block;
          }
        }
      }
    }
    .swiper-pagination {
      position: absolute;
      left: 0;
      bottom: 30px;
      width: 100%;
      height: 4px;
      display: flex;
      flex-direction: row;
      justify-content: center;

      .swiper-pagination-bullet {
        display: block;
        margin: 0 3px;
        width: 14px;
        height: 4px;
        border-radius: 2px;
        background: rgba(0, 0, 0, 0.7);

        &.swiper-pagination-bullet-active {
          width: 14px;
          background: #fff;
        }
      }
    }
    p {
      margin: 0 30px;
      padding: 10px;
      border-radius: 6px;
      background: #fff;
      color: #333;
      line-height: 24px;
      font-size: 14px;
      position: relative;
      z-index: 2;
      top: -20px;
    }
  }
  .my-equipment {
    width: 100%;
    overflow: hidden;
    h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    p {
      color: #333;
      line-height: 24px;
      font-size: 14px;
      padding: 0px 20px 20px;
    }
    .equipment {
      width: 300px;
      height: 180px;
      margin: 0 auto;

      .swiper-wrapper {
        position: relative;
        width: 1000%;

        .swiper-slide {
          float: left;
          width: 10%;
          border-radius: 10px;
          box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          position: relative;
          border-radius: 8px;
          height: 180px;
          z-index: 2;
          background: #eee;
          transition: all 0.6s;
          img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            -webkit-object-fit: cover;
            display: block;
          }
          &.swiper-slide-next,
          &.swiper-slide-prev {
            transform: scale(0.9);
            opacity: 0.8;
          }
          &.swiper-slide-next {
            transform: translate3d(-40px, 0, 0) scale(0.9);
            z-index: 1;
          }
          &.swiper-slide-prev {
            transform: translate3d(40px, 0, 0) scale(0.9);
          }
        }
      }
    }
  }
  .my-mall {
    padding: 20px;
    h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .goto {
      display: block;
      position: relative;
      border-radius: 6px;
      height: 200px;
      overflow: hidden;
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        -webkit-object-fit: cover;
        display: block;
      }
      p {
        width: 100%;
        padding: 20px 10px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
        color: #fff;
        line-height: 20px;
        font-size: 14px;
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
      }
    }
  }
  .my-message {
    padding: 20px 20px 40px;
    h3 {
      line-height: 28px;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    > p {
      font-size: 12px;
      color: #666;
      line-height: 20px;
      margin-bottom: 20px;
    }
    ul {
      overflow: hidden;
      li {
        background: #fff;
        border-radius: 8px;
        margin-bottom: 10px;
        padding: 10px;
        overflow: hidden;
        > div {
          display: flex;
          flex-direction: row;
        }
        figure {
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 50%;
          flex-shrink: 0;
          img {
            width: 100%;
            height: 100%;
            -webkit-object-fit: cover;
            object-fit: cover;
            display: block;
          }
        }
        .info {
          width: 100%;
          em {
            font-size: 14px;
            line-height: 20px;
            color: #333;
            display: block;
            margin-bottom: 5px;
          }
          span {
            font-size: 10px;
            line-height: 18px;
            color: #999;
            display: block;
            text-align: right;
          }
          p {
            line-height: 24px;
            font-size: 14px;
            margin-bottom: 5px;
            i {
              opacity: 0.7;
            }
          }
        }
        &.left {
          width: 86%;
          box-sizing: border-box;
          float: left;
          figure {
            margin-right: 10px;
          }
        }
        &.right {
          width: 86%;
          box-sizing: border-box;
          float: right;
          background: rgba(63, 158, 255, 0.7);
          figure {
            margin-left: 10px;
          }
          .info {
            em {
              color: #fff;
              text-align: right;
            }
            p {
              color: #fff;
            }
            span {
              color: #f5f5f5;
              text-align: left;
            }
          }
        }
      }
    }
    .nothing {
      display: flex;
      flex-direction: column;
      span {
        font-family: "photo font";
        font-size: 60px;
        line-height: 60px;
        display: block;
        text-align: center;
        color: #999;
        margin-bottom: 14px;
      }
      em {
        display: block;
        text-align: center;
        line-height: 12px;
        color: #666;
      }
    }
  }
  .question {
    position: fixed;
    right: 10px;
    bottom: 40px;
    width: 50px;
    line-height: 50px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    color: #333;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    box-shadow: 0px 0px 10px 1px #999;
    z-index: 10;
  }
  .toast-view {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
    i {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
    }
    form {
      background: #fff;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding: 20px 20px 15px;
      box-sizing: border-box;
      z-index: 1;
      textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #eee;
        resize: none;
        outline: none;
        padding: 10px;
        box-sizing: border-box;
        font-size: 14px;
        line-height: 20px;
        display: block;
        margin-bottom: 10px;
      }
      button {
        float: right;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.2s;
}
.opacity-enter,
.opacity-leave-active {
  opacity: 0;
}
@keyframes rotate {
  0%,
  50%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}
</style>
