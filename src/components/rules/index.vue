<style  lang="less" scopes>
.title img{width:90%; max-height:260px; max-width:594px; }
.inpblock ul{padding-left:2rem; padding-right: 1rem;}
.inpblock ul li{text-indent:-1.5rem; line-height:1.5rem; margin-bottom:1rem }
.inpblock ul li h4{padding-bottom:.5rem }
</style>
<template>
  <div>
    <div class="pdt1 pdl1"><div class="logo"></div></div>
    <div class="title al-c">
      <img src="../../images/title.png" alt="">
    </div>
    <div class="maincontent">
      <div class="inpblock">
        <ul>
          <li><h4>1、活动时间:</h4>2016年7月26日</li>
          <li><h4>2、活动内容:</h4>2016年7月26日2016年7月26日2016年7月26日2016年7月26日</li>
        </ul>
      </div>
      <div class="inpblock mgt1">
        <ul>
          <li><h5>注意:</h5></li>
          <li>1、2016年7月26日2016年7月26日2016年7月26日2016年7月26日</li>
          <li>2、2016年7月26日2016年7月26日2016年7月26日2016年7月26日</li>
        </ul>
      </div>
    </div>
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
