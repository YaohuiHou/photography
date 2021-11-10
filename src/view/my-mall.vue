<template>
  <div class="my-mall">
    <headView fixed="1" title="我的商城信息"></headView>
    <h2>我的商城：</h2>
    <p>我的商城信息页是展示我个人商城信息，这里是商城首页的展示图，最多只能上传1张美图。</p>
    <photoList :photos="photos" :size="1" @updataImgFun="updataImg" @removeImg="removeImg"></photoList>
    <h2>链接：</h2>
    <p>本网站支持跳转到京东、淘宝等各大网站页面，请输入正确网站地址</p>
    <input class="link" type="text" maxlength="100" v-model="linkUrl" placeholder="请输入商城链接">
    <h2>简介：</h2>
    <p>可以对自己的商城进行详细描述，方便他人了解您的商城信息。</p>
    <div class="textarea">
      <textarea placeholder="请输入对商城的评价与介绍" v-model="content" maxlength="200"></textarea>
    </div>
    <div class="button">
      <mt-button type="primary" size="large" @click="submitFun">提交</mt-button>
    </div>
  </div>
</template>

<script>
import XHR from "@/api";
import { Toast } from "mint-ui";
import photoList from "../components/photoList.vue";
import headView from "../components/headView.vue";
export default {
  components: { headView, photoList },
  data() {
    return {
      photos: [],
      linkUrl: "",
      content: ""
    };
  },
  mounted() {
    this.getMallDetail();
    this.$store.commit("ga", { path: "mymall", dt: "商城" });
  },
  methods: {
    getMallDetail() {
      XHR.getMallDetail().then(res => {
        if (res.data.errno == 0 && res.data.data) {
          this.photos.push(res.data.data.picUrl);
          this.content = res.data.data.desc;
          this.linkUrl = res.data.data.outUrl;
        }
      });
    },
    updataImg(list) {
      this.photos = list;
    },
    removeImg(i) {
      this.photos.splice(i, 1);
    },
    submitFun() {
      if (this.photos.length <= 0) {
        Toast({
          message: "请添加商城图片",
          position: "top",
          duration: 3000
        });
        return;
      }
      if (this.content.trim() == "") {
        Toast({
          message: "请输入商城简介",
          position: "top",
          duration: 3000
        });
        return;
      }
      if (this.linkUrl.trim() == "") {
        Toast({
          message: "请输入商城链接",
          position: "top",
          duration: 3000
        });
        return;
      }

      XHR.saveMallDetail({
        picUrl: this.photos[0],
        desc: this.content,
        outUrl: this.linkUrl
      }).then(res => {
        if (res.data.errno == 0) {
          Toast({
            message: "提交成功",
            position: "bottom",
            duration: 3000
          });
          this.$router.go(-1);
        } else {
          Toast({
            message: "网络有问题，请稍后再试！",
            position: "bottom",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-mall {
  padding: 60px 10px 40px;
  h2 {
    line-height: 30px;
    color: #333;
    font-size: 20px;
  }
  > p {
    padding: 10px 0 20px;
    font-size: 14px;
    color: #666;
  }
  .link {
    width: 100%;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    padding: 5px 10px;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
    border-radius: 4px;
  }
  .textarea {
    overflow: hidden;
    background: #fff;
    padding: 5px 10px;
    textarea {
      width: 100%;
      height: 100px;
      padding: 0;
      line-height: 22px;
      font-size: 14px;
      resize: none;
      border: none;
      outline: none;
    }
  }
  .button {
    margin-top: 50px;
  }
}
</style>
