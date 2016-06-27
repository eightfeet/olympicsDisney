import Vue from 'vue';
const API_BASE = '';
const REQ_HEADER = {'Content-Type': 'application/x-www-form-urlencoded'};

function isObject (obj) {
  return obj !== null && typeof obj === 'object';
}

function pushEncodedKeyValuePair (pairs, key, val) {
  if (Array.isArray(val)) {
    val.forEach((v) => {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  } else {
    pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
  }
}

function serializeObject (obj) {
  if (!isObject(obj)) return obj;
  let pairs = [];
  for (let key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      pushEncodedKeyValuePair(pairs, key, obj[key]);
    }
  }
  return pairs.join('&');
}

function get (url, data) {
  return Vue.http.get(`${API_BASE}${url}`, data, {
    headers: REQ_HEADER
  });
}

function post (url, params) {
  return Vue.http.post(`${API_BASE}${url}`, serializeObject(params), {
    headers: REQ_HEADER
    // data:
  });
}

export default {
  get,
  post
};
