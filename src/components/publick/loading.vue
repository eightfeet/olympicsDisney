<style lang="less" scopes>
    @-webkit-keyframes uil-default-anim {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }

    @keyframes uil-default-anim {
        0% {
            opacity: 1
        }
        100% {
            opacity: 0
        }
    }

    .uil-default-css > div:nth-of-type(1) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: -0.5s;
        animation-delay: -0.5s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(2) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: -0.4166666666666667s;
        animation-delay: -0.4166666666666667s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(3) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: -0.33333333333333337s;
        animation-delay: -0.33333333333333337s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(4) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: -0.25s;
        animation-delay: -0.25s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(5) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: -0.16666666666666669s;
        animation-delay: -0.16666666666666669s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(6) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: -0.08333333333333331s;
        animation-delay: -0.08333333333333331s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(7) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(8) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: 0.08333333333333337s;
        animation-delay: 0.08333333333333337s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(9) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: 0.16666666666666663s;
        animation-delay: 0.16666666666666663s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(10) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: 0.25s;
        animation-delay: 0.25s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(11) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: 0.33333333333333337s;
        animation-delay: 0.33333333333333337s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }

    .uil-default-css > div:nth-of-type(12) {
        -webkit-animation: uil-default-anim 1s linear infinite;
        animation: uil-default-anim 1s linear infinite;
        -webkit-animation-delay: 0.41666666666666663s;
        animation-delay: 0.41666666666666663s;
    }

    .uil-default-css {
        position: relative;
        background: none;
        width: 2rem;
        height: 2rem;
    }
    .uil-right-text {
        line-height: 2rem;
        width: 2rem;
        height: 2rem;
    }
    .loadingbg{
      background: rgba(0, 0, 0, 0);
      top:0;
      left: 0;
      right: 0;
      bottom: 0;
      position: fixed;
      z-index: 1000
    }
    .blockloading{
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -4rem;
      margin-left: -0.5rem;
    }
    .loadingtext{position: absolute; width: 100%; text-align: center; top:50%; margin-top: -1.5rem; background-color: rgba(0,0,0,.1); width:5rem; padding:.5rem 1rem; border-radius: 1rem; left:50%; margin-left: -3rem}
</style>
<template>
  <div class="clearfix" v-show="show">
    <div class="loadingbg">
      <div class="pdb2 blockloading">
        <div class='uil-default-css' style='margin:0 auto'>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(0deg) translate(0,-7.2px);transform:rotate(0deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(30deg) translate(0,-7.2px);transform:rotate(30deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(60deg) translate(0,-7.2px);transform:rotate(60deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(90deg) translate(0,-7.2px);transform:rotate(90deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(120deg) translate(0,-7.2px);transform:rotate(120deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(150deg) translate(0,-7.2px);transform:rotate(150deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(180deg) translate(0,-7.2px);transform:rotate(180deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(210deg) translate(0,-7.2px);transform:rotate(210deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(240deg) translate(0,-7.2px);transform:rotate(240deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(270deg) translate(0,-7.2px);transform:rotate(270deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(300deg) translate(0,-7.2px);transform:rotate(300deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
            <div style='top:9.2px;left:11.6px;width:2px;height:6px;background:#7d7d7d;-webkit-transform:rotate(330deg) translate(0,-7.2px);transform:rotate(330deg) translate(0,-7.2px);border-radius:10px;position:absolute;'></div>
        </div>
      </div>
      <div v-show="loadingtext"><div class="loadingtext gray fz-s"><slot></slot></div></div>
    </div>
  </div>
</template>
<script>
import coerceBoolean from '../utils/coerceBoolean.js';

export default {
  props: {
    show: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    loadingtext: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    }
  }
};
</script>
