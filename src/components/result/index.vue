<style  lang="less" scopes>
.title img{width:90%; max-height:260px; max-width:594px; }
.card{
  width: 24.75rem;
  height: 14.9166rem;
  background-image: url(../../images/card.png);
  background-size: cover;
  margin: 1rem auto;
  div{
    padding-top: 11.6rem;
  }
}
.info{
  line-height: 2rem;
  position: relative;
  i{
    display:inline-block;
    background-image: url(../../images/mix.png);
    width:1.8rem;
    height:1.8rem;
    background-size: 53.333rem 47.333rem;
    background-position:-1rem -0.9rem;
    position: absolute;
    left: 1rem;
  }
}
.rebuild,.rebuild:link,.rebuild:visited,.rebuild:hover{
  color: green;
  border-bottom: 1px solid green;
}
</style>
<template>
  <div>
    <div class="pdt1 pdl1"><div class="logo"></div></div>
    <div class="bgslide fz-l mgt1">
      <span class="green border">恭喜您，{{storename}}</span><br>
      <span class="fz-s" style="color:#333;">
        您的专属活动入口已经生成，可以参与活动了
      </span>
    </div>
    <div class="card">
      <div class="al-c white">
        活动时间：2016年07月10至8月31日
      </div>
    </div>
    <template v-if="link_type == '1'?true:false">
      <div class="al-c">
        <div type="button" class="buttonB" v-touch:tap="handelact">进入活动</div>
        <div type="button" class="buttonB" v-touch:tap="handelenter">配置入口</div>
      </div>
      <div class="maincontent">
        <div class="inpblock info">
          <h3 class="green fwb fz-l">小贴士：</h3>
          <div class="pdl2"><i></i>门店选择错了？<a class="rebuild" v-link="{ name: 'stores'}">点这里重新生成</a></div>
        </div>
      </div>
    </template>
    <template  v-if="link_type == '2'?true:false">
      <div class="maincontent">
        <h3 class="green border pdb1">我的专属活动链接</h3>
        <div class="urlblock">{{url}}</div>
        <p class="green border pdt1">点击框内活动地址，复制链接，在连锁店微信公众号后台设置入口</p>
        <div class="al-c">
          <div type="button" class="buttonA" v-touch:tap="handelenter">配置入口</div>
        </div>
        <div class="inpblock info">
          <h3 class="green fwb fz-l">小贴士：</h3>
          <div class="pdl2"><i></i>门店选择错了？<a class="rebuild" v-link="{name:'chain'}">点这里重新生成</a></div>
        </div>
      </div>
    </template>
    <p>&nbsp;</p>

    <modal :show.sync="showModal" >
      <h3 slot="header" class="fz-ll white al-c pdt2 icon-attention-alt">{{modalTitle}}</h3>
      <div slot="body" class="al-c fz lh-s pdl1 pdr1">
        {{{modalText}}}
        <br>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '../publick/modal.vue';
module.exports = {
  route: {

  },
  methods: {
    handelrebuild () {
      this.$route.router.go('/result');
    },
    handelenter () {
      this.$route.router.go('/enter');
    },
    // 进入活动页面
    handelact () {
      window.location.href = this.url;
    }
  },
  data () {
    return {
      showModal: false,
      modalTitle: '',
      modalText: '',
      url: null,
      link_type: null,
      storename: null
    };
  },
  ready () {
    this.link_type = window.sessionStorage.flag;
    this.url = window.sessionStorage.url;
    this.storename = window.sessionStorage.store_name;
  },
  watch: {
    // 监控下拉项是否改变
    // link_type () {
    //   if (!this.link_type) {
    //     this.modalText = '<p class="pdb1 fz-m pdt1 ba">没有连锁或门店类型</p>';
    //     this.modalTitle = '对不起';
    //     this.showModal = true;
    //   }
    // }
  },
  components: {
    modal
  }
};
</script>
