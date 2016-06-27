<style  lang="less" scopes>
.title img{width:90%; max-height:260px; max-width:594px; }
.welcome{
  width: 21.7rem;
  max-width: 580px;
  max-height: 345px;
  height: 12.9375rem;
  background-image: url(../../images/welcome.png);
  -webkit-background-size: cover;
  background-size: cover;
  margin: 1rem auto;
}
</style>
<template>
  <div>
    <div class="pdt1 pdl1"><div class="logo"></div></div>
    <div class="title al-c">
      <img src="../../images/title.png" alt="">
    </div>
    <div class="welcome"></div>
    <div class="al-c">
      <div class="buttonA">活动内容</div>
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
