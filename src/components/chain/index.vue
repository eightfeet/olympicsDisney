<style  lang="less">
.pd{
  padding-top: 12rem;
}
</style>
<template>
  <div>
    <div class="maincontent pdt1">
      <div class="tagtitle">
        <h3>请选择您所属的连锁</h3>
      </div>
      <div class="inpblock">
        <div class="clearfix">
          <div class="inputleft w2 lh-l">连锁编号</div>
          <div class="inputright w7-5">
            <label class="pr">
              <input v-model="storenumber" class="w5" type="text" placeholder="请输入连锁编号">
              <span class="red">＊必填</span>
            </label>
            <button v-touch:tap="handelSearch" style="width:3.3rem" class="fz" type="button">查询</button>
          </div>
        </div>
        <div class="al-c fz-s pdt1 lh-s gray" v-if="!hasstorenumber?true:false">若不知道连锁编号，可联系城市经理<br>
        或致电<a class="gray" href="tel:4000916916">4000-916-916</a></div>
        <div class="al-c fz pdt1 lh-s" v-if="hasstorenumber?true:false">{{superstore}}&nbsp;{{storename}}<br>
          {{province_name+(province_name.length>0?'省':'')+city_name+(city_name.length>0?'市':'')+storeaddress}}
        </div>
      </div>
    </div>

    <div class="maincontent">
      <div class="al-c pd">
        <button class="buttonA" v-touch:tap="handelbuild">生成活动入口</button>
      </div>
    </div>
    <loading :show="showLoading"></loading>
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
import loading from '../publick/loading.vue';
module.exports = {
  route: {

  },
  methods: {
    handelbuild () {
      if (!this.storeid) {
        // 没有门店Id时要求先查询门店
        this.modalText = '<p class="pdb1 fz-m pdt1 ba">请先查询连锁</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        return;
      }
      this.showLoading = true;
      apiRequest.saveOrUpdateActLink({
        link_id: this.link_id,	// 是	string	链接id，如果新建则为空，如果修改则有值
        type: '2',	// 是	string	类型 1：非会员店 2：连锁公众号
        num: this.storenumber	// 否	int	门店或连锁编号
      }).then((res) => {
        this.showLoading = false;
        res.data.code = '1'; // 模拟
        if (res.data.code === '1') {
          if (res.data.data) {
            window.sessionStorage.link_id = res.data.data.link_id ? res.data.data.link_id : '';
            window.sessionStorage.store_name = this.storename;
            window.sessionStorage.flag = '2';
            window.sessionStorage.url = res.data.data.url ? res.data.data.url : '';
            this.$route.router.go('/result');
          } else {
            this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
            this.modalTitle = '对不起';
            this.showModal = true;
            setTimeout((res) => {
              this.$route.router.go('/result');
            }, 2000);
          }
        } else {
          this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
          this.modalTitle = '对不起';
          this.showModal = true;
        }
      }, (res) => {
        this.showLoading = false;
        this.modalText = `<p class="pdb1 fz-m pdt1 ba">status=${res.status}&nbsp;code=${res.data.code}<br>${res.data.msg}</p>`;
        this.modalTitle = '对不起';
        this.showModal = true;
      });
    },
    handelSearch () {
      if (!this.storenumber || this.storenumber.length === 0) {
        console.log(this.storenumber);
        this.modalText = '<p class="pdb1 fz-m pdt1 ba">请先输入连锁编号</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        return false;
      }
      this.showLoading = true;
      apiRequest.getStore({
        num: this.storenumber,
        link_type: '2'
      }).then((res) => {
        this.showLoading = false;
        if (res.data.code === '1') {
          console.log(res.data.data.store_name);
          if (res.data.data.store_type === 'Partner') {
            this.chainname = res.data.data.store_name;
          }
          if (res.data.data.store_type === 'Store') {
            this.storename = res.data.data.store_name;
          }
          this.superstore = res.data.data.super_store_name;
          this.storeid = res.data.data.store_id;
          this.storeaddress = res.data.data.address;
          this.province_name = res.data.data.province_name;
          this.city_name = res.data.data.city_name;
        } else {
          this.modalText = '<h4 class="fwb fz-m">您输入的连锁编号找不到记录<br>请确认后再重新输入</h4><p class="pdt2">如有疑问可联系城市经理或<br>致电<a href="tel:4000916916">4000-916-916</a>';
          this.modalTitle = '对不起';
          this.showModal = true;
          this.dataInit();
        };
      }, (res) => {
        this.showLoading = false;
        this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data}</p>`;
        this.modalTitle = res.status;
        this.showModal = true;
      });
    },
    dataInit () { // 数据初始化
      this.storenumber = '';
      this.hasstorenumber = false;
      this.superstore = null;
      this.storename = null;
      this.storeaddress = null;
      this.chainname = null;
      this.storeid = null;
      this.province_name = null;
      this.city_name = null;
    },
    getActLinkById (linkid) {
      this.showLoading = true;
      apiRequest.getActLinkById({
        link_id: linkid,
        link_type: '2'
      }).then((res) => {
        this.showLoading = false;
        if (res.data.code === '1') {
          console.log('getActLinkById', res.data, res.data.data.super_store_name);
          this.storenumber = res.data.data.store_no;
          this.superstore = res.data.data.super_store_name;
          this.storename = res.data.data.store_name;
          this.storeaddress = res.data.data.address;
          this.storeid = res.data.data.store_id;
          this.username = res.data.data.name;
          this.phone = res.data.data.phone;
          this.province_name = res.data.data.province_name;
          this.city_name = res.data.data.city_name;
        } else {
          console.log('getActLinkById', res);
        }
      }, (res) => {
        this.showLoading = false;
        console.log('getActLinkById', res);
      });
    }
  },
  data () {
    return {
      showModal: false,
      showLoading: false,
      modalTitle: '',
      modalText: '',
      storenumber: null,
      // 是否显示帮助信息
      hasstorenumber: false,
      superstore: null,
      storename: null,
      storeaddress: null,
      chainname: null,
      storeid: null,
      province_name: '',
      city_name: ''
    };
  },
  ready () {
    // 查看是否有linkid
    let SD = window.sessionStorage;
    if (SD.link_id.length > 0 && SD.flag === '2') {
      this.getActLinkById(SD.link_id);
      this.link_id = SD.link_id;
    }
  },
  watch: {
    // 是否显示帮助信息
    storenumber () {
      if (this.storenumber.length > 0) {
        this.hasstorenumber = true;
      } else {
        this.hasstorenumber = false;
      }
    }
  },
  components: {
    modal,
    loading
  }
};
</script>
