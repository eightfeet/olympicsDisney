<style lang="less">
  @import "less/main.less";
  .view {
    transition: all .5s ease;
  }
  .settransition-enter, .settransition-leave {
    opacity: 0;
    transform: translate3d(20px, 0, 0);
  }
  body{
      background-image: url(./images/bg.jpg);
      background-size:cover;
      background-position: center;
  }

</style>

<template>
  <div>
    <!-- keep-alive 不用缓存页面-->
    <router-view class="view" transition="settransition"  transition-mode="out-in"></router-view>
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
import apiRequest from './components/publick/apirequest.js';
import modal from './components/publick/modal.vue';
export default {
  replace: false,
  methods: {
    getParam () {
      if (apiRequest.getUrlParam('code') && apiRequest.getUrlParam('state')) {
        this.code = apiRequest.getUrlParam('code');
        this.state = apiRequest.getUrlParam('state');
      } else {
        // 如果没有获取到url上的参数
        console.log('非法进入页面获取参数失败');
        this.modalText = '<p class="pdb1 fz-m pdt1">参数获取失败,重新授权</p>';
        this.modalTitle = '对不起';
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
          window.location.href = 'http://wx-test.by-health.com/wechatBH/oauth2?state=f9abc470339b11e6815e0050569f4cfd';
        }, 2000);
      }
    },
    sendParam (aug) {
      return new Promise((resolve, reject) => {
        apiRequest.sendParam(aug).then((res) => {
          // res.data.code = '1'; // 模拟
          if (res.data.code === '1') {
            resolve(res);
          } else {
            reject(res);
          };
        }, (res) => {
          reject(res);
          // resolve(res); // 模拟
        });
      });
    },
    // 获取appID
    getAppID () {
      apiRequest.getAppID().then((res) => {
        if (res.data.code === '1') {
          this.wx.appId = res.data.data.appId;
          this.shareUrl = res.data.data.share_url;
        } else {
          this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
          this.modalTitle = res.data.code;
          this.showModal = true;
        };
      }, (res) => {
        this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data}</p>`;
        this.modalTitle = res.status;
        this.showModal = true;
      });
    },
    fetchJssdk (aug) {
      return new Promise((resolve, reject) => {
        apiRequest.JSSDK(aug).then((res) => {
          if (res.data) {
            this.wx.appId = res.data.appId;
            this.wx.timestamp = res.data.timestamp;
            this.wx.nonceStr = res.data.nonceStr;
            this.wx.signature = res.data.signature;
            resolve(res);
          } else {
            reject(res);
          }
          console.log('获取授权信息如下', this.wx);
          // this.productImg = res
        }, (res) => {
          // 接口失败
          this.showlistLoading = false;
          this.modalText = 'Jssdk请求失败';
          this.showModal = true;
          reject(res);
        });
      });
    },
    wxSet () {
      window.wx.ready(() => {
        window.wx.onMenuShareTimeline({
          title: '奥运迪斯尼', // 分享标题
          link: this.shareUrl, // 分享链接
          imgUrl: 'http://wx-test1.by-health.com/web/trialCenter/css/img/share.jpg', // 分享图标
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
        });
        window.wx.onMenuShareAppMessage({
          title: '奥运迪斯尼', // 分享标题
          desc: '奥运迪斯尼',
          link: this.shareUrl, // 分享链接
          imgUrl: 'http://wx-test1.by-health.com/web/trialCenter/css/img/share.jpg', // 分享图标
          success: function () {
              // 用户确认分享后执行的回调函数
          },
          cancel: function () {
              // 用户取消分享后执行的回调函数
          }
        });
        window.wx.hideMenuItems({
          menuList: [
            'menuItem:share:appMessage',
            'menuItem:share:timeline',
            'menuItem:share:qq',
            'menuItem:share:weiboApp',
            'menuItem:favorite',
            'menuItem:share:facebook',
            'menuItem:share:QZone'
          ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
        });
      });
    },
    isFlag (aug) {
      apiRequest.isFlag().then((res) => {
        // res.data.code = '1'; // 模拟
        if (res.data.code === '1') {
          console.log(res.data.code);
          window.sessionStorage.flag = res.data.data.flag ? res.data.data.flag : '';
          window.sessionStorage.link_id = res.data.data.link_id ? res.data.data.link_id : '';
          window.sessionStorage.store_name = res.data.data.store_name ? res.data.data.store_name : '';
          window.sessionStorage.store_type = res.data.data.store_type ? res.data.data.store_type : '';
          window.sessionStorage.url = res.data.data.url ? res.data.data.url : '';
          console.log('测试页面', window.sessionStorage);
          // if (res.data.data) {
          //   if (res.data.data.flag === '0') {
          //     console.log('0：还没有创建链接');
          //   }
          if (res.data.data.flag !== '0') {
            console.log('1：非会员店');
            this.$route.router.go('/result');
          }
          // }
        } else {
          this.modalText = `<p class="pdb1 fz-m pdt1 ba">${res.data.msg}</p>`;
          this.modalTitle = '对不起';
          this.showModal = true;
        }
      }, (res) => {
        this.modalText = `<p class="pdb1 fz-m pdt1 ba">status=${res.status}&nbsp;code=${res.data.code}<br>${res.data.msg}</p>`;
        this.modalTitle = '对不起';
        this.showModal = true;
      });
    }
  },
  data () {
    return {
      state: null,
      code: null,
      modalText: null,
      modalTitle: null,
      showModal: false,
      shareUrl: null,
      wx: {
        appId: null, // 必填，公众号的唯一标识
        timestamp: null, // 必填，生成签名的时间戳
        nonceStr: null, // 必填，生成签名的随机串
        signature: null // 必填，签名，见附录1
      }
    };
  },
  ready () {
    // 获取code state
    this.getParam();
    // 获取AppID
    this.getAppID();
    // 发送参数
    if (this.state && this.code) {
      this.sendParam({
        state: this.state,
        code: this.code
      }).then((res) => {
        console.log('1、成功发送参数后获取微信appId和其他授权信息授权');
        let url = window.location.href;
        let ind = window.location.href.indexOf('#');
        this.fetchJssdk({
          url: url.substr(0, ind),
          appId: this.wx.appId
        }).then(() => {
          console.log('1.1、获取微信授权信息后config微信');
          window.wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this.wx.appId, // 必填，公众号的唯一标识
            timestamp: this.wx.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.wx.nonceStr, // 必填，生成签名的随机串
            signature: this.wx.signature, // 必填，签名，见附录1
            jsApiList: ['onMenuShareAppMessage', 'hideMenuItems', 'onMenuShareTimeline']
          });
        }).then(() => {
          console.log('1.2、设置微信');
          this.wxSet();
        });
        // console.log('成功了才怪', res);
      }).catch((res) => {
        // 如果没有获取到url上的参数
        console.log('非法进入页面获取参数失败', res);
        this.modalText = `<p class="pdb1 fz-m pdt1">${res.data.msg}</p>`;
        this.modalTitle = '对不起';
        this.showModal = true;
        setTimeout(() => {
          this.showModal = false;
          // window.location.href = 'http://wx-test.by-health.com/wechatBH/oauth2?state=f9abc470339b11e6815e0050569f4cfd';
        }, 2000);
      }).then(() => {
        console.log('2、检查是否创建过url');
        this.isFlag();
      });
    }
  },
  components: {
    modal,
    apiRequest
  }
};
</script>
