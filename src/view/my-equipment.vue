<template>
  <div class="equipment">
    <h2>我的器材：</h2>
    <p>作品集合是体现自己摄影技术的表现，最多只能上传6张美图。</p>
    <photoList :photos="photos" :size="6" @updataImgFun="updataImg" @removeImg="removeImg"></photoList>
    <h2>简介：</h2>
    <p>作品集合是体现自己摄影技术的表现。最多200字</p>
    <div class="textarea">
      <textarea placeholder="请输入对器材的评价与介绍" v-model="content" maxlength="200"></textarea>
    </div>
    <div class="button" @click="submitFun">
      <mt-button type="primary" size="large">提交</mt-button>
    </div>
  </div>
</template>

<script>
import XHR from "@/api";
import { Toast } from "mint-ui";
import photoList from "../components/photoList.vue";
export default {
  components: { photoList },
  data() {
    return {
      photos: [],
      content: ""
    };
  },
  mounted() {
    this.getMaterial();
  },
  methods: {
    getMaterial() {
      XHR.getMaterial().then(res => {
        if (res.data.errno == 0 && res.data.data) {
          this.photos = res.data.data.picUrls;
          this.content = res.data.data.content;
        }
      });
    },
    updataImg(url) {
      this.photos.push(url);
    },
    removeImg(i) {
      this.photos.splice(i, 1);
    },
    submitFun() {
      if (this.photos.length <= 0) {
        Toast({
          message: "请添加器材图片",
          position: "top",
          duration: 3000
        });
        return;
      }
      if (this.content.trim() == "") {
        Toast({
          message: "请输入器材简介",
          position: "top",
          duration: 3000
        });
        return;
      }

      XHR.saveMaterial({
        picUrls: this.photos,
        content: this.content
      }).then(res => {
        if (res.data.errno == 0) {
          Toast({
            message: "提交成功",
            position: "bottom",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.equipment {
  padding: 20px 10px 40px;
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
  .textarea {
    width: 100%;
    overflow: hidden;
    background: #fff;
    padding: 5px 10px;
    box-sizing: border-box;
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
