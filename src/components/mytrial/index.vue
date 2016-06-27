<style  lang="less">
</style>
<template>
  <div>
    <!-- 头部banner -->
    <div class="mt_bg pr">
      <select class="setselect" v-model="selectChange">
        <option v-for="option in selectOptions" v-bind:value="option.value">{{ option.text }}</option>
      </select>
      <div class="facebox"><img :src="userPic" alt="" /></div>
      <div class="name al-c">{{ userName }}</div>
    </div>
    <div class="pdt1">
      <div class="maincontent mt_list">
        <div class="clearfix pdb1 repeatblock" track-by="$index" v-for="item in mytraillist">
          <div class="fl mt_w1">
            <div class="line" v-show="hideLine" :class="{lastheight: lastItem == $index }">&nbsp;</div>
            <div v-if="item.status == '1'" class="mt_icon_no icon-no"></div>
            <div v-if="item.status != '1'" class="mt_icon_yes icon-yes"></div>
          </div>
          <div class="fl mt_w20 clearfix">
            <div class="listbox fz-m">
              {{item.product_name}}
              <p v-if="item.status == '0'" class="pdt-5 green fz-s">待审核</p>
              <p v-if="item.status == '1'" class="pdt-5 green fz-s">试用申领失败</p>
              <p v-if="item.status == '2'" class="pdt-5 green fz-s">产品待发货</p>
              <p v-if="item.status == '3'" class="pdt-5 green fz-s">试用报告未提交</p>
              <p v-if="item.status == '4'"  class="pdt-5 green fz-s">试用报告待提交</p>
              <p v-if="item.status == '5'" class="pdt-5 green fz-s">试用报告已提交</p>
            </div>
            <div class="fr pdt1">
              <buttonbar
                v-if="item.status == '4'"
                v-touch:tap="handlePub(item.product_id)"
                class="mgb1 mytrial fz-m"
                setwidth="7">
                写心得
              </buttonbar>
              <buttonbar
                v-if="item.status == '5'"
                v-touch:tap="handleExperience(item.product_id)"
                class="mgb1 mytrial fz-m"
                setwidth="7">
                查看心得
              </buttonbar>
            </div>
          </div>
        </div>
        <div v-show="noData" class="al-c gray pdt3 fz-s">暂无数据</div>
      </div>
      <listloading v-show="showlistLoading"></listloading>
    </div>
    <modal :show.sync="showModal" >
      <h3 slot="header" class="fz-ll cyan al-c pdt2 icon-attention-alt"></h3>
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
  </div>
</template>

<script>
import buttonbar from '../publick/button.vue';
import listloading from '../publick/listloading.vue';
import apirequest from '../publick/apirequest.js';
import modal from '../publick/modal.vue';
module.exports = {
  route: {

  },
  methods: {
    fetchList (aug) {
      if (this.fetchData) { // 开始请求
        this.fetchData = false; // 关闭请求
        this.showlistLoading = true; // 显示loading
        apirequest.userApplyhistory(aug).then((data) => {
          // 成功返回
          this.showlistLoading = false;
          if (data.data.code === '0') {
            // 填充数据
            this.$set('newPage', data.data.data.rows);
            this.mytraillist = this.mytraillist.concat(this.newPage);
            // 回填总页数
            this.totalSize = data.data.data.total;
            this.lastItem = this.mytraillist.length - 1;
            // 回填当前页值
            this.currentPage = data.data.data.pageNo;
          } else {
            // 错误后弹出窗口
            this.showModal = true;
            this.modalText = data.data.msg;
          }
          if (this.mytraillist.length === 0) {
            this.noData = true;
          } else {
            this.noData = false;
          }
          if (this.mytraillist.length === 1) {
            this.hideLine = false;
          } else {
            this.hideLine = true;
          }
        },
        (data) => {
          // 接口失败
          this.showlistLoading = false;
          this.showModal = true;
          this.modalText = data.data.msg;
        }).then(
          this.fetchData = true // 开启请求
        );
      }
    },
    pageInit () { // 初始化页面
      this.fetchData = true;
      this.mytraillist = [];
      this.currentPage = 1;
      this.noData = false;
    },
    handleOk () {
      this.showModal = false;
    },
    handlePub (prdid) {
      this.$route.router.go(`/pubexperience/${prdid}/${this.openId}`);
    },
    handleExperience (prdid) {
      this.$route.router.go(`/experience/${prdid}/${this.openId}`);
    }

  },
  data () {
    return {
      newPage: [],
      mytraillist: [],
      showlistLoading: false,
      noData: false,
      showModal: false,
      modalText: '',
      // 这里存一下当前页码
      currentPage: 1,
      pageSize: 8,
      openId: this.$route.params.openId, // oTNbpjtgUfm2dDIyOBfh7VnpC-OA
      productId: this.$route.params.productId,
      totalSize: null,
      fetchData: true,
      lastItem: null,
      hideLine: true,
      // 下拉选择
      selectChange: '0,1,2,3,4,5',
      selectOptions: [
        { text: '全部', value: '0,1,2,3,4,5' },
        { text: '申领失败', value: '1' },
        { text: '申领成功', value: '2,3,4,5' }
      ],
      // 用户信息
      userPic: '',
      userName: ''
    };
  },
  ready () {
    apirequest.getUserinfo({openId: this.openId}).then((data) => {
      // 成功返回
      if (data.data.data) {
        this.userName = data.data.data.nick_name;
        this.userPic = data.data.data.head_img_url;
      }
    },
    (data) => {
      // 接口失败
      console.log(data);
    });
    this.fetchList({
      openId: this.openId,
      pageNo: this.currentPage,
      status: this.selectChange,
      pageSize: this.pageSize
    });
    let __this = this;
    // 滚动事件
    window.onscroll = function () {
      let scrollTop = document.body.scrollTop;
      let scrollHeight = document.body.scrollHeight;
      let windowHeight = window.innerHeight;
      if (scrollTop + windowHeight === scrollHeight) {
        // 确定是否还能翻页
        if (__this.totalSize < (__this.currentPage * __this.pageSize)) {
          __this.fetchData = false;
        }
        // 开始翻页
        __this.fetchList({
          openId: __this.openId,
          pageNo: __this.currentPage + 1,
          status: __this.selectChange,
          pageSize: __this.pageSize
        });
      }
    };
    // this.mytraillist.push(temp, temp1, temp2, temp3)
  },
  router: {
    ready () {
      this.fetchList({
        openId: this.openId,
        pageNo: this.currentPage,
        status: this.selectChange,
        pageSize: this.pageSize
      });
    }
  },
  watch: {
    // 监控下拉项是否改变
    selectChange () {
      // 初始化
      this.pageInit();
      // 重新请求
      this.fetchList({
        openId: this.openId,
        pageNo: this.currentPage,
        status: this.selectChange,
        pageSize: this.pageSize
      });
    }
  },
  components: {
    buttonbar,
    listloading,
    modal
  }
};
</script>
