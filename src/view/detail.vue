<template>
  <div class="detail" v-show="dataInfo">
    <headView title="详情页"></headView>
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
    <div class="my-mall" v-if="dataInfo.store">
      <h3>我的商城</h3>
      <a :href="dataInfo.store.outUrl" class="goto">
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
          <p>{{item.content}}</p>
          <span>{{item.addTime}}</span>
        </li>
      </ul>
      <div class="nothing" v-else @click="gotoComment">
        <span>空</span>
        <em>快来留言哟~</em>
      </div>
    </div>
    <!-- 悬浮 -->
    <span class="question" @click="gotoComment">提问</span>
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
export default {
  components: { headView },
  data() {
    return {
      toId: 0,
      mineId: 0,
      userId: "",
      textContent: "",
      tags: [],
      tagsObj: {},
      toastShow: false,
      dataInfo: {},
      messages: [],
      worksInfos: [
        "http://fes.qyerstatic.com/Fm978lERTjkvzeID3IGxI249BKTn?imageslim",
        "http://fes.qyerstatic.com/Fhq5aV-3hV7TvvXEsspccWTtxcYj?imageslim",
        "http://fes.qyerstatic.com/Fhq5aV-3hV7TvvXEsspccWTtxcYj?imageslim",
        "http://fes.qyerstatic.com/Fhq5aV-3hV7TvvXEsspccWTtxcYj?imageslim",
        "http://fes.qyerstatic.com/Fm978lERTjkvzeID3IGxI249BKTn?imageslim"
      ]
    };
  },
  mounted() {
    this.$store.commit("isLogin", true);

    let tags = localStorage.getItem("TAGSList");
    if (tags) {
      this.tags = JSON.parse(tags);
    } else {
      this.getTypeList();
    }

    this.userId = this.$route.query.id;
    this.getDetail(this.$route.query.id);
    this.getComment();
  },
  methods: {
    getDetail(id) {
      XHR.getUsersDefile({ otherUser: id }).then(res => {
        if (res.data.errno == 0) {
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
          console.log(this.tags, this.tagsObj);

          setTimeout(() => {
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
            // swiper2.slideTo(1, 300, false);
          }, 400);
        }
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
      let toId = this.toId == 0 ? this.userId : this.toId;
      console.log(toId);

      XHR.userComment({
        toId: this.userId,
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
        this.toId = toId ? toId : 0;
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
.detail {
  .header {
    height: 200px;
    border-radius: 0 0 8px 8px;
    box-shadow: 0px 0px 10px 1px #999;
    display: flex;
    flex-direction: row;
    padding: 20px;
    box-sizing: border-box;
    align-items: center;
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
      span {
        display: block;
        text-align: right;
        color: #333;
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
      margin-bottom: 10px;
    }
    ul {
      overflow: hidden;
      li {
        background: #fff;
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 10px;
        overflow: hidden;
        p {
          line-height: 24px;
          font-size: 14px;
          margin-bottom: 5px;
        }
        span {
          font-size: 12px;
          color: #999;
        }
        &.left {
          width: 80%;
          box-sizing: border-box;
          float: left;
        }
        &.right {
          width: 80%;
          box-sizing: border-box;
          float: right;
          background: rgba(63, 158, 255, 0.7);
          p {
            color: #fff;
          }
          span {
            float: right;
            color: #f5f5f5;
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
</style>
