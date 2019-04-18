<template>
  <div class="equipment">
    <headView fixed="1" title="我的租赁信息"></headView>
    <h2>我的器材：</h2>
    <p>上传自己的器材照片，方便其他有意向用户查看，最多只能上传6张美图。</p>
    <photoList :photos="photos" :size="6" @updataImgFun="updataImg" @removeImg="removeImg"></photoList>
    <h2>简介：</h2>
    <p>可以描述自己的器材简介，包括产品的信息，使用年限，有无损坏，方便他人全面了解。最多200字</p>
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
import headView from "../components/headView.vue";
export default {
  components: { headView, photoList },
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

<style lang="less" scoped>
.equipment {
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
