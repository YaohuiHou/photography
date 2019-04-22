<template>
  <form class="my-info">
    <headView fixed="1" title="我的个人信息"></headView>
    <header>
      <figure>
        <img :src="avatar" alt>
        <span>修改</span>
        <em v-if="complete < 100">{{complete}}%</em>
        <input @change="addImgFun" type="file" name="Filedata" class="upimg" accept="image/*">
      </figure>
    </header>
    <ul class="info">
      <li>
        <span>用户名：</span>
        <input type="text" placeholder="请输入您的用户名" maxlength="20" v-model="username">
      </li>
      <li class="city" @click="cityShow = !cityShow">
        <span>地址：</span>
        <em>{{zoons}}</em>
        <i v-if="zoons == ''">请选择您所在的城市地址</i>
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
      <li class="show-phone">
        <span>手机号：</span>
        <input
          type="tel"
          placeholder="请输入手机号"
          maxlength="11"
          v-model="mobile"
          :class="mobileShow ? 'selected' : ''"
        >
        <mt-switch v-model="mobileShow"></mt-switch>
        <p>默认手机号显示，关闭之后其他用户将看不到你的电话信息</p>
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
import axios from "axios";
import XHR from "@/api";
import { Toast } from "mint-ui";
import tagView from "../components/tagView.vue";
import cityView from "../components/cityView.vue";
import headView from "../components/headView.vue";
export default {
  components: { headView, tagView, cityView },
  data() {
    return {
      complete: 100,
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
      content: "",
      zoons: "",
      // 图片添加
      upImgShow: false
    };
  },
  mounted() {
    let tags = localStorage.getItem("TAGSList");
    if (tags) {
      this.tags = JSON.parse(tags);
    }
    this.getUserAllInfo();
    this.$store.commit("ga", { path: "myinfo", dt: "个人详情页" });
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

          if (this.provinceId) {
            this.zoons =
              data.provinceName + "-" + data.cityName + "-" + data.areaName;
          }
          this.tag.split(",").forEach(ele => {
            this.tags.forEach((item, index) => {
              if (item.valueId == ele) {
                item.selected = true;
                this.$set(this.tagsObj, index, item);
                // this.tagsObj[index] = item;
              }
            });
          });
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
      this.cityId = o[1].id;
      this.provinceId = o[0].id;
      this.areaId = o[2].id;
      this.zoons = o[0].name + "-" + o[1].name + "-" + o[2].name;
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
        mobileShow: this.mobileShow ? 1 : 0,
        tag: this.tag,
        content: this.content
      };
      XHR.editUserInfo(obj).then(res => {
        if (res.data.errno == 0) {
          Toast({
            message: "修改成功",
            iconClass: "icon icon-success"
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
      this.complete = 0;
      // 生成base64
      reader.onload = function(res) {
        _this.avatar = this.result;
        console.log(_this.avatar);
      };

      reader.readAsDataURL(file);
      formData.append("file", file);
      axios
        .post(XHR.UploadImg(), formData, {
          onUploadProgress: progressEvent => {
            //原生获取上传进度的事件
            if (progressEvent.lengthComputable) {
              //属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
              //如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
              let complete =
                ((progressEvent.loaded / progressEvent.total) * 100) | 0;
              this.complete = complete;
            }
          }
        })
        .then(res => {
          // 赋值图片路径 并且创建预览
          this.upImgShow = false;
          if (res.data.errno == 0) {
            this.avatar = res.data.data.originalUrl;
            this.complete = 100;
          } else {
            Toast({
              message: res.data.errmsg,
              position: "top",
              duration: 3000
            });
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
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
    margin-top: 45px;
    figure {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      border: 1px solid #eee;
      overflow: hidden;
      margin-right: 20px;
      position: relative;
      span {
        position: absolute;
        right: 0;
        top: 0;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background: #000;
        opacity: 0.5;
      }
      em {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        line-height: 80px;
        text-align: center;
        font-size: 14px;
        z-index: 1;
      }
      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        z-index: 2;
      }
      img {
        width: 100%;
        height: 100%;
        -webkit-object-fit: cover;
        object-fit: cover;
        display: block;
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
      &.show-phone {
        padding-bottom: 30px;
        p {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          line-height: 30px;
          font-size: 10px;
          color: #999;
          border-top: 1px solid #eee;
        }
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
