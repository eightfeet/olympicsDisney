export function configRouter (router) {
  // normal routes
  router.map({
    // 入口
    '/': {
      component: require('./components/enter/index.vue')
    },
    // 入口
    '/enter': {
      component: require('./components/enter/index.vue')
    },
    // 门店
    '/stores': {
      name: 'stores',
      component: require('./components/stores/index.vue')
    },
    // 连锁
    '/chain': {
      name: 'chain',
      component: require('./components/chain/index.vue')
    },
    // 结果页
    '/result': {
      component: require('./components/result/index.vue')
    },
    // 规则页
    '/rules': {
      component: require('./components/rules/index.vue')
    },
    // 结果页
    '/trailers': {
      component: require('./components/trailers/index.vue')
    },
    // 找不到页面
    '*': {
      component: require('./components/not-found.vue')
    }
  });
  router.afterEach((transition) => {
    console.log('成功浏览到: ' + transition.to.path);
    window.wx.ready(() => {
      window.wx.hideMenuItems({
        menuList: [
          'menuItem:share:appMessage',
          'menuItem:share:timeline',
          'menuItem:share:qq',
          'menuItem:share:weiboApp',
          'menuItem:favorite',
          'menuItem:share:facebook',
          'menuItem:share:QZone'
        ] // 隐藏菜单功能不能一次完成，所以在路由时再调用
      });
    });
  });
}
