<template>
  <div class="item" @click="gotoLink(useritem.id)">
    <img class="bg" :src="useritem.collection ? useritem.collection : collection">
    <header>
      <figure>
        <img :src="useritem.avatar" alt>
      </figure>
      <div class="info">
        <span>{{useritem.username}}</span>
        <p>{{useritem.content}}</p>
      </div>
    </header>
    <div class="show">
      <span
        class="zoon"
        v-show="useritem.provinceName"
      >{{useritem.provinceName}}-{{useritem.cityName}}-{{useritem.areaName}}</span>
      <span v-show="!useritem.provinceName"></span>
      <div class="other">
        <em v-if="useritem.isStore">商</em>
        <em v-if="useritem.isMaterial">器</em>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["useritem"],
  data() {
    return {
      collection: "//fes.qyerstatic.com/FsgWAf3-MV_UmCNga0GS7Q_TXEiM?imageslim"
    };
  },
  methods: {
    gotoLink(id) {
      this.$router.push({ path: "/detail", query: { id: id } });
    }
  }
};
</script>

<style lang="less">
.item {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px 1px #999;
  border-radius: 6px;
  box-sizing: border-box;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 1;
  }
  header {
    height: 80px;
    display: flex;
    flex-direction: row;
    position: relative;
    z-index: 1;
    figure {
      width: 80px;
      height: 80px;
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
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      span {
        display: block;
        line-height: 30px;
        font-size: 16px;
        color: #fff;
        font-weight: bold;
        margin-bottom: 5px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
      }
      p {
        font-size: 14px;
        line-height: 20px;
        height: 40px;
        color: #fff;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .show {
    height: 50px;
    display: flex;
    position: relative;
    z-index: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .zoon {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: #fff;
      font-size: 12px;
      &:before {
        content: "\5b9a";
        font-family: "photo font";
        display: block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #fff;
      }
    }
    .other {
      display: flex;
      flex-direction: row;
      em {
        font-family: "photo font";
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 18px;
        color: #fff;
        margin-left: 15px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>
