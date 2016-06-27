import request from './request.js';
// apidbug
const apidebug = true;
// 获取url参数
function getUrlParam (name) {
  var urlParameters = window.location.href;
  var length = urlParameters.length;
  var ind = urlParameters.indexOf('?');
  urlParameters = urlParameters.substr(ind, length);
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = urlParameters.substr(1).match(reg);
  if (r != null) return (r[2]);
  return null;
}

// 传入参数
function sendParam (data) {
  return request.post('/actOlympic/actConfig/sendParam', data);
}
// appId
function getAppID (data) {
  return request.post('/actOlympic/common/getBaseInfo', data);
}
// JSSDK
function JSSDK (data) {
  return request.post('/actOlympic/common/authJsSDK', data);
}
// 是不是创建过链接
function isFlag (data) {
  return request.post('/actOlympic/actConfig/checkUser', data);
}
// 按门店或者连锁编号查询
function getStore (data) {
  return request.post('/actOlympic/actConfig/getStoreByNo', data);
}
// 生成活动URL
function saveOrUpdateActLink (data) {
  return request.post('/actOlympic/actConfig/saveOrUpdateActLink', data);
}
// 检查该用户是否创建过链接
function queryLinkByUser (data) {
  return request.post('/actOlympic/actConfig/queryLinkByUser', data);
}
function getActLinkById (data) {
  return request.post('/actOlympic/actConfig/getActLinkById', data);
}

export default {
  isFlag,
  apidebug,
  sendParam,
  getUrlParam,
  getAppID,
  getStore,
  JSSDK,
  saveOrUpdateActLink,
  queryLinkByUser,
  getActLinkById
};
