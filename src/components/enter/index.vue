<style  lang="less" scopes>
.title img{width:90%; max-height:260px; max-width:594px; }
.buttonstore{
  width: 23.500rem;
  height:7.708rem;
  background-image: url(../../images/mix.png);
  background-size: 53.333rem 47.333rem;
  background-position:-1rem -16.167rem;
  margin: 0 auto;
  margin-top: 1rem;
}
.buttonchain{
  width: 23.500rem;
  height:7.708rem;
  background-image: url(../../images/mix.png);
  background-size: 53.333rem 47.333rem;
  background-position:-1rem -25.708rem;
  margin: 0 auto;
  margin-top: 1rem;
}
</style>
<template>
  <div>
    <div class="pdt1 pdl1"><div class="logo"></div></div>
    <div class="title al-c">
      <img src="../../images/title.png" alt="">
    </div>
    <div class="maincontent fz pdt1 al-c">此入口仅限非会员店生成活动专用已安装营养管家App的店员，可直接登陆App参与活动</div>
    <div class="bgslide fz-l mgt1 green border">想要参加活动 ? 赶快生成您的专属<br>活动入口</div>
    <div class="buttonstore" v-touch:tap="handelstore"></div>
    <div class="buttonchain" v-touch:tap="handelchain"></div>
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
import apiRequest from '../publick/apirequest.js';
module.exports = {
  route: {

  },
  methods: {
    sessionData (res) {
      window.sessionStorage.link_id = res.data.data.link_id ? res.data.data.link_id : '';
      window.sessionStorage.store_name = res.data.data.store_name ? res.data.data.store_name : '';
      window.sessionStorage.store_type = res.data.data.link_type ? res.data.data.link_type : '';
      window.sessionStorage.url = res.data.data.url ? res.data.data.url : '';
    },
    handelstore () {
      apiRequest.queryLinkByUser({
        link_type: '1'
      }).then((res) => {
        if (res.data.code === '1') {
          if (res.data.data.has_created === '0') { // 没创建过
            window.sessionStorage.flag = '0';
            this.$route.router.go('/stores');
          }
          if (res.data.data.has_created === '1') { // 已创建过
            window.sessionStorage.flag = '1';
            this.$route.router.go('/result');
          }
          this.sessionData(res);
        } else {
          this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
          this.modalTitle = '对不起';
          this.showModal = true;
        }
        // this.$route.router.go('/stores');
      }, (res) => {
        this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
        this.modalTitle = '对不起';
        this.showModal = true;
      });
    },
    handelchain () {
      apiRequest.queryLinkByUser({
        link_type: '2'
      }).then((res) => {
        if (res.data.code === '1') {
          if (res.data.data.has_created === '0') { // 没创建过
            window.sessionStorage.flag = '0';
            this.$route.router.go('/chain');
          }
          if (res.data.data.has_created === '1') { // 已创建过
            window.sessionStorage.flag = '2';
            this.$route.router.go('/result');
          }
          this.sessionData(res);
        } else {
          this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
          this.modalTitle = '对不起';
          this.showModal = true;
        }
      }, (res) => {
        this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
        this.modalTitle = '对不起';
        this.showModal = true;
      });
    }
  },
  data () {
    return {
      showModal: false,
      modalTitle: '',
      modalText: ''
    };
  },
  ready () {
  },
  watch: {
    // 监控下拉项是否改变
  },
  components: {
    modal
  }
};
</script>
