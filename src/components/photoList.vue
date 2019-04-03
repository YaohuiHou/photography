<template>
  <div class="photo">
    <ul>
      <li v-for="(item,index) in photos" :key="index">
        <em class="close" @click="closeFun(index)">&#xe61d;</em>
        <img :src="item">
      </li>
      <li class="upload" v-show="photos.length < size">
        <input
          @change="addImgFun"
          type="file"
          name="Filedata"
          class="upimg"
          accept="image/gif, image/jpeg, image/jpg, image/png"
        >
      </li>
    </ul>
  </div>
</template>

<script>
import XHR from "@/api";
import { MessageBox } from "mint-ui";
export default {
  props: ["photos", "size"],
  data() {
    return {
      // 图片添加
      addImg: false,
      addImgUrl: "",
      upImgShow: false
    };
  },
  methods: {
    closeFun(i) {
      MessageBox.confirm("确定执行此操作?").then(action => {
        this.$emit("removeImg", i);
      });
    },
    // 上传图片
    addImgFun(event) {
      if (this.upImgShow) return;
      this.upImgShow = true;
      var file = event.target.files[0];
      var reader = new FileReader();
      var formData = new FormData();
      let _this = this;

      if (!file.type) {
        var regexp = fileName.match(/\.\w+$/);
        if (regexp && (regexp = regexp[0]))
          file.type = this.mimeTypes[(regexp + "").toLowerCase()];
      }
      // 判断图片不能大于8M
      if (file.size >= 8388608) {
        alert("\u6240\u9009\u56fe\u7247\u4e0d\u80fd\u5927\u4e8e8MB"); //所选图片不能大于8MB
        this.upImgShow = false;
        return;
      }
      // 生成base64
      reader.onload = function(res) {
        _this.addImgUrl = this.result;
        _this.addImg = true;
        // _this.$set('themeValues','themeImg',this.result)
      };

      reader.readAsDataURL(file);
      formData.append("file", file);

      XHR.UploadImg(formData).then(res => {
        // 赋值图片路径 并且创建预览
        this.upImgShow = false;
        console.log(res.data.data.url);

        if (res.data.errno == 0) {
          this.$emit("updataImgFun", res.data.data.url);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.photo {
  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    li {
      position: relative;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      min-height: 100px;
      width: calc(~"33.3% - 7px");
      z-index: 1;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      margin-right: 10px;
      margin-bottom: 14px;
      &:nth-of-type(3n) {
        margin-right: 0;
      }
      &.upload {
        justify-content: center;
        align-items: center;
        position: relative;
        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        &:after {
          display: block;
          content: "\52a0";
          width: 50px;
          height: 50px;
          font-family: "photo font";
          font-size: 40px;
          color: #999;
          text-align: center;
          line-height: 50px;
        }
        &:before {
          background: #fff;
        }
      }
      img {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-object-fit: cover;
        object-fit: cover;
        display: block;
      }
      .close {
        font-family: "photo font";
        position: absolute;
        right: -10px;
        top: -18px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: 24px;
        text-align: right;
        z-index: 2;
      }
      &:before {
        position: absolute;
        left: 0;
        top: 0;
        content: "";
        width: 100%;
        height: 100%;
        background: #efefef
          url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHMAAAApBAMAAAD0eAtEAAAAFVBMV…6gckLD/ysNxoohvv1kba1sjU9lYVmG38+WA/AGzfOG1/QP24+i/flJ+D4AAAAASUVORK5CYII=)
          no-repeat 50% 50%;
        background-size: 58px 20px;
        z-index: -1;
      }
    }
  }
}
</style>
