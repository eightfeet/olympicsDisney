<style lang="less"></style>
<template>
  <div>
    <div class="tabbar">
      <div class="maincontent">
        <ul class="clearfix">
          <li class="w5 fl al-c">
            <span>本期试用</span>
          </li>
          <li class="w5 fl al-c">
            <span class="current">往期试用</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="w3-3-3">
      <buttonbar
        v-touch:tap="handlerSubRouter"
        class="mgb1 w3"
        setstyle="b">
        详细
      </buttonbar>
    </div>
    <div v-show="show" transition="test">
      transition测试
    </div>
    <modal :show.sync="showModal" >
      <h3 slot="header" class="fz-ll blue al-c pdt2 icon-attention-alt">失败</h3>
      <div slot="body" class="al-c fz lh-s pdt1 pdb1 pdl1 pdr1">
        {{modalText}}
        <br>
      </div>
      <div slot="footer" class="pdt1">
        <div class="clearfix w9-2 mcenter">
          <div class="w2-5 fl">&nbsp;</div>
          <div class="w5 fl">
            <buttonbar
              v-touch:tap="handleOk"
              class="mgb1 icon-ok">
              确定
            </buttonbar>
          </div>
          <div class="w2-5 fl">&nbsp;</div>
        </div>
      </div>
    </modal>
    <div class="footerbar">
      <buttonbar
        v-touch:tap="handelT"
        class="mgb1 icon-user mytrial fz-m"
        setwidth="13"
        setfontsize="1.2"
        setheight="3"
        setstyle="b">
        我的试用
      </buttonbar>
    </div>
  </div>
</template>

<script>
import buttonbar from '../publick/button.vue';
import modal from '../publick/modal.vue';
module.exports = {
  methods: {
    handlerSubRouter () {
      this.$route.router.go('./pubexperience/72/oTNbpjtgUfm2dDIyOBfh7VnpC-OA');
    },
    handelT () {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },
  data () {
    return {
      message: 'message默认数据',
      val: 'this is val!',
      show: true,
      showModal: true,
      modalText: '这是个测试'
    };
  },
  components: {
    buttonbar,
    modal
  }
};
</script>
