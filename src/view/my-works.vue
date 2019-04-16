<template>
  <div class="works">
    <headView fixed="1" title="我的作品信息"></headView>
    <h2>我的作品：</h2>
    <p>作品集合是体现自己摄影技术的表现，最多只能上传6张美图。</p>
    <photoList :photos="photos" :size="6" @updataImgFun="updataImg" @removeImg="removeImg"></photoList>
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
      photos: []
    };
  },
  mounted() {
    this.getMyWorks();
  },
  methods: {
    getMyWorks() {
      XHR.getMyWorks().then(res => {
        if (res.data.errno == 0 && res.data.data) {
          this.photos = res.data.data;
        }
      });
    },
    updataImg(url) {
      this.photos.push(url);
    },
    removeImg(i) {
      console.log(i);

      this.photos.splice(i, 1);
    },
    submitFun() {
      if (this.photos.length <= 0) return;

      XHR.updateMyWorks({
        collect: this.photos
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
.works {
  padding: 60px 10px 40px;
  h2 {
    line-height: 30px;
    color: #333;
    font-size: 20px;
  }
  > p {
    padding: 10px 0 30px;
    font-size: 14px;
    color: #666;
  }
  .button {
    margin-top: 50px;
  }
}
</style>
