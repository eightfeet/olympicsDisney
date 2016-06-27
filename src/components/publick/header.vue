<template>
  <div
    class="headerbar al-c lh-ll bgcyan pa pr"
  >
    <span
      class="
        {{lefticonname}}
        {{lefticon?'show':'hide'}}
        tapBox leftTap"
      v-touch:tap="handlerlefticon"
    >
    </span>
    <span
      class="
        {{righticonname}}
        {{righticon?'show':'hide'}}
        tapBox rightTap"
      v-touch:tap="handlerrighticon"
    >
    </span>
    <slot></solt>
  </div>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';
export default {
  props: {
    textsize: {
      type: Number,
      default: 1
    },
    textcolor: {
      type: String
    },
    lefticon: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    lefticonname: {
      type: String,
      default: ''
    },
    handlerlefticon: {
      type: Function,
      default: () => false
    },
    righticon: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    righticonname: {
      type: String,
      default: ''
    },
    handlerrighticon: {
      type: Function,
      default: () => false
    }
  },
  ready () {
    console.log('this', this);
  }
};
</script>

<style lang="less">
//返回
.headerbar {
    width: 100%;
    z-index: 100;
    top: 0;
    .tapBox{
        width: 3rem;
        height: 3rem;
        line-height:3rem;
        display: inline-block;
        position: absolute;
        top:0;
        display: none;
    }
    .leftTap{
      left: 0;
    }
    .rightTap{
      right: 0;
    }
}
</style>
