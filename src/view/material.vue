<template>
  <div class="material">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <a :href="item.url" target="_blank">
          <h3>{{item.name}}</h3>
          <figure :style="item.bgcolor ? 'background-color:'+item.bgcolor : ''">
            <img :src="item.img">
          </figure>
          <p>{{item.content}}</p>
        </a>
      </li>
    </ul>
    <p class="hint">如有更多优秀的摄影学习网站，可以在个人中心联系客服，直接留言就可以哦~</p>
    <footerView :selected="'data'"></footerView>
  </div>
</template>

<script>
import footerView from "../components/footerView.vue";
export default {
  components: { footerView },
  data() {
    return {
      list: [
        {
          url: "https://www.uisdc.com/",
          name: "优设网",
          img:
            "https://image.uisdc.com/wp-content/uploads/2018/02/uisdc-logo.png",
          bgcolor: "#ff5a00",
          content:
            "优设网-优秀设计联盟(SDC)，是国内优秀的设计师学习平台，拥有海量优质设计文章，包含了PS教程，AI教程，UI设计，网页设计，排版教程等。而且网站每天整合和推荐的内容很不错，有大量与摄影相关的内容，并且还有丰富的资源下载。"
        },
        {
          url: "https://unsplash.com/",
          name: "Unsplash",
          img:
            "https://img.zcool.cn/community/013e4d5864bffda801219c77d294e1.jpg",
          content:
            "一个免费的图片网站，你可以下载上面的图片进行使用，甚至包括商业使用，它会定期更新一些经过编辑筛选的图片。Upsplash 也是一款常驻系统菜单栏的小应用，安装完成后会在菜单栏中出现一个照相机的 icon。应用定义了四个全局快捷键分别用来切换壁纸、加入黑名单、查看当前壁纸、保存当前壁纸。"
        },
        {
          url: "https://m.fengniao.com/",
          name: "蜂鸟网",
          img:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556369267101&di=c16335497eaef1a428b335c32472304d&imgtype=0&src=http%3A%2F%2Fpic22.nipic.com%2F20120806%2F10651092_112110319101_2.jpg",
          content:
            "蜂鸟网的受众群覆盖整个中国大陆、港澳台及全球华人聚居区，主要由摄影爱好者、摄影发烧友、专业摄影师和大量影像行业及相关行业的从业者组成。蜂鸟微课堂设置多种摄影课程，为大家讲解方方面面的摄影知识技巧，课程将由浅入深的讲解相机的操作及使用，各种摄影门类的拍摄技法以及闪灯、配件的运用，希望通过学习交流帮助大家增长摄影“姿势”。"
        },
        {
          url: "http://ww.xitek.com/",
          name: "色影无忌",
          img:
            "https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=3054935758,1550450565&fm=85&s=4B12E0025A9B0BE91EA85514000080B0",
          content:
            "色影无忌是中文影像生活门户，发布及时的影像和摄影行业动态新闻和权威的器材评测和产品资讯，提供高质量的摄影作品发布，摄影技巧交流与分享，拥有活跃度极高的摄影论坛，全球最完整的器材库，摄影器材购买和交易平台，以及汽车、旅游、音响等影像生活内容"
        },
        {
          url: "https://www.poco.cn",
          name: "POCO网",
          img:
            "//static-c.pocoimg.cn/project/poco_new_pc/prod/online/image/page/custom/help/i/logo_58d5b3f.png",
          content:
            "广州数联软件技术有限公司POCO网是03年成立，目前国内最大的以原创图片为核心的分享社区。分享近4亿张原创图片，平均每日新增20万张上传图片；聚合1.1亿优质网友。公司总部位于广州，并设有北京、上海分公司。"
        },
        {
          url: "http://m.699pic.com/",
          name: "摄图网",
          img: "//static.699pic.com/images/index/logo2.png",
          content:
            "摄图网是一家专注于正版摄影高清图片素材免费下载的图库作品网站,提供手绘插画,海报,ppt模板,科技,城市,商务,建筑,风景,美食,家居,外景,背景等好看的图片设计素材大全可供下载。摄图摄影师5000+入驻并进行交流成长，百万图片量和设计师在这里找到满意的图片素材和设计灵感!专注于免费摄影图和插画，为中小企业，自媒体，设计师，运营等提供优质的服务！"
        },
        {
          url: "https://tuchong.com/",
          name: "图虫网",
          img:
            "https://s1.tuchong.com/content-image/201811/593630647c81d83dd63ecd6d53989c84.png",
          content:
            "发现基于共同兴趣的同好，鼓励原创和分享精神 除了美好的摄影和技能，我们更在意影像背后价值观的认同。图虫网是500多万摄影师入驻的优质摄影图片分享社区，下属纪实、风光、人像、生态、黑白、器材、佳能、尼康、宾得等几十个专业摄影社区。海量的照片、相册和图博全部由摄影师共同管理和维护。"
        },
        {
          url: "https://www.heiguang.com",
          name: "黑光网",
          img: "https://www.heiguang.com/statics/20180101/img/logo_new.png",
          content:
            "黑光网为中国影楼行业提供了全方位的专业服务，包括人才服务（招聘求职）、行业资讯、摄影、化妆、数码、管理、图库等众多专业频道。 经过多年的发展，黑光网已经成为黑光集团旗下最具影响力的子事业部，是中国影楼行业专业内容提供商和专业平台服务商，在行业内具有领先的影响力。"
        },
        {
          url: "https://zhuanlan.zhihu.com/p/24911339",
          name: "免费的高品质图片网站",
          img:
            "https://pic1.zhimg.com/v2-aef9fe25f87768fe6a7b57570a072c4e_1200x500.jpg",
          content:
            "越来越多的网站也开始提供超高品质的免费图片，有一些还提供了Premium选项，付费用户可以享受更多的权益，比如Death to the Stock Photo，免费用户仅能通过邮箱接收免费图片，如果需要在网站上查看和下载所有图片则需要付费了。"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.material {
  padding: 10px 20px 60px;
  ul {
    li {
      margin-bottom: 20px;
      padding: 10px 15px;
      background: #fff;
      border-radius: 4px;
      h3 {
        line-height: 36px;
        font-size: 16px;
        font-weight: bold;
      }
      figure {
        margin: 10px;
        min-height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          margin: 0 auto;
        }
      }
      p {
        font-size: 14px;
      }
    }
  }
  .hint {
    line-height: 20px;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
}
</style>
