<style  lang="less">
</style>
<template>
  <div>
    <div class="maincontent pdt1">
      <div class="tagtitle">
        <h3>请选择您所属的门店</h3>
      </div>
      <div class="inpblock">
        <div class="clearfix">
          <div class="inputleft w2 lh-l">门店编号</div>
          <div class="inputright w7-5">
            <label class="pr">
              <input v-model="storenumber" class="w5" type="text" placeholder="请输入门店编号">
              <span class="red">＊必填</span>
            </label>
            <button v-touch:tap="handelSearch" style="width:3.3rem" class="fz" type="button">查询</button>
          </div>
        </div>
        <div class="al-c fz-s pdt1 lh-s gray" v-if="!hasstorenumber?true:false">若不知道门店编号，可联系城市经理<br>
或致电<a class="gray" href="tel:4000916916">4000-916-916</a></div>
        <div class="al-c fz pdt1 lh-s" v-if="hasstorenumber?true:false">{{superstore}}&nbsp;{{storename}}<br>
          {{province_name+(province_name.length>0?'省':'')+city_name+(city_name.length>0?'市':'')+storeaddress}}
        </div>
      </div>
    </div>
    <div class="bgslide fz mgt1 green border">继续完善您的个人资料<br>
协助消费者进行抽奖</div>
    <div class="maincontent pdt-5">
      <div class="inpblock">
        <div class="clearfix">
          <div class="inputleft w2 lh-l">姓&emsp;名</div>
          <div class="inputright w7-5">
            <label class="pr">
              <input v-model="username" class="w7" type="text" placeholder="请输入您的姓名">
              <span class="red">＊必填</span>
            </label>
          </div>
        </div>
        <div class="clearfix pdt-5">
          <div class="inputleft w2 lh-l">手机号码</div>
          <div class="inputright w7-5">
            <label class="pr">
              <input v-model="phone" class="w7" type="tel" placeholder="请输入您的手机号码">
              <span class="red">＊必填</span>
            </label>
          </div>
        </div>
      </div>
      <div class="al-c pdt1">
        <button class="buttonA" v-touch:tap="handelbuild">生成活动入口</button>
      </div>
    </div>
    <modal :show.sync="showModal" >
      <h3 slot="header" class="fz-ll white al-c pdt2 icon-attention-alt">{{modalTitle}}</h3>
      <div slot="body" class="al-c fz lh-s pdl1 pdr1">
        {{{modalText}}}
        <br>
      </div>
    </modal>
    <loading :show="showLoading"></loading>
  </div>
</template>

<script>
import apiRequest from '../publick/apirequest.js';
import modal from '../publick/modal.vue';
import loading from '../publick/loading.vue';
module.exports = {
  route: {

  },
  methods: {
    handelbuild () {
      if (!this.storeid) {
        // 没有门店Id时要求先查询门店
        // this.$route.router.go('/result');
        this.modalText = '<p class="pdb1 fz-m pdt1 ba">请先查询门店</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        return;
      }
      if (!this.username || this.username.length <= 0) {
        // 没有门店Id时要求先查询门店
        this.modalText = '<p class="pdb1 fz-m pdt1 ba">请输入您的姓名</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        return;
      }
      if (!(/^1\d{10}$/.test(this.phone))) {
        // 手机号码验证
        this.modalText = '<p class="pdb1 fz-m pdt1 ba">请写正确的手机号码</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        return;
      }
      this.showLoading = true;
      apiRequest.saveOrUpdateActLink({
        link_id: this.link_id,	// 是	string	链接id，如果新建则为空，如果修改则有值
        type: '1',	// 是	string	类型 1：非会员店 2：连锁公众号
        num: this.storenumber,	// 否	int	门店或连锁编号
        name: this.username,	// 否	string	名称
        phone: this.phone	// 否	string	手机号
      }).then((res) => {
        this.showLoading = false;
        res.data.code = '1'; // 模拟
        if (res.data.code === '1') {
          console.log('success', res);
          if (res.data.data) {
            window.sessionStorage.link_id = res.data.data.link_id ? res.data.data.link_id : '';
            window.sessionStorage.store_name = this.storename;
            window.sessionStorage.flag = '1';
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
      console.log(this.storenumber);
      if (!this.storenumber || this.storenumber.length === 0) {
        this.modalText = '<p class="pdb1 fz-m pdt1 ba">请先输入门店编号</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        return false;
      }
      this.showLoading = true;
      apiRequest.getStore({
        num: this.storenumber,
        link_type: '1'
      }).then((res) => {
        this.showLoading = false;
        if (res.data.code === '1') {
          // console.log(3333333);
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
          this.modalText = '<h4 class="fwb fz-m">您输入的门店编号找不到记录<br>请确认后再重新输入</h4><p class="pdt2">如有疑问可联系城市经理或<br>致电<a href="tel:4000916916">4000-916-916</a>';
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
      this.username = null;
      this.phone = null;
      this.province_name = null;
      this.city_name = null;
    },
    getActLinkById (linkid) {
      this.showLoading = true;
      apiRequest.getActLinkById({
        link_id: linkid,
        link_type: '1'
      }).then((res) => {
        this.showLoading = false;
        if (res.data.code === '1') {
          console.log('getActLinkById', res.data);
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
      storeid: null,
      username: null,
      phone: null,
      hasstorenumber: false,
      chainname: null,
      storename: null,
      superstore: null,
      storeaddress: null,
      province_name: '',
      city_name: ''
    };
  },
  ready () {
    // 查看是否有linkid
    let SD = window.sessionStorage;
    if (SD.link_id.length > 0 && SD.flag === '1') {
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
    apiRequest,
    loading
  }
};
</script>
