<style lang="less">

  .winnerbanner{
    width: 100%;
  	background-color: #fff;
  	-webkit-box-shadow: 0 2px 2px rgba(241,245,255,.75);
  	-moz-box-shadow: 0 2px 2px rgba(241,245,255,.75);
  	box-shadow: 0 2px 2px rgba(241,245,255,.75);
  }

  .prdbox{
    padding: .5rem 0;
  }
  .prdbox img{
    display: block;
    width: 8rem;
    height: 8rem;
  }
  .prdtitle{
    vertical-align: middle;
    width: 10.5rem;
    padding-top: 3rem;
    padding-left:1rem;
  }

</style>
<template>
  <div class="winnerbanner">
    <div class="maincontent clearfix">
      <div class="prdbox fl">
        <slot name="pic">无产品图片</slot>
      </div>
      <div class="prdtitle fl">
        <slot name="title">无产品标题</slot>
      </div>
      <slot name="flag"></slot>
    </div>
    <div class="maincontent">
      <slot name="tag"></slot>
    </div>
  </div>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';
module.exports = {
  props: {
    show: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    }
  }
};
</script>
