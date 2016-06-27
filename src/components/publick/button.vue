<template>
  <button
  v-bind:class="{
    mainbtn:true,
    iconfl:iconfixedleft,
    iconfr:iconfixedright,
    pr:true,
    style_green:stylegreen,
    style_blue:styleblue,
    style_red:stylered,
    shadow:setshadow,
    outline:setoutline
  }"
  v-bind:style="{
    height:setheight+'rem',
    width:setwidth+'rem',
    borderRadius:borderradius+'rem',
    fontSize:setfontsize+'rem',
    opacity:setopacity
    }"
  >
    <slot></solt>
  </button>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';
export default {
  props: {
    iconfixedleft: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    iconfixedright: {
      type: Boolean,
      coerce: coerceBoolean,
      default: false
    },
    setshadow: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    },
    setstyle: {
      type: String,
      default: 'a'
    },
    setheight: {
      type: String,
      default: 'auto'
    },
    setwidth: {
      type: String,
      default: 'auto'
    },
    setfontsize: {
      type: String,
      default: '1'
    },
    stylegreen: {
      type: Boolean,
      default: true
    },
    styleblue: {
      type: Boolean,
      default: false
    },
    stylered: {
      type: Boolean,
      default: false
    },
    borderradius: {
      type: String,
      default: '0.3'
    },
    setopacity: {
      type: String,
      default: '1'
    },
    setoutline: {
      type: Boolean,
      coerce: coerceBoolean,
      default: 'false'
    }
  },
  ready () {
    const small = this.small;
    if (small) {
      this.big = false;
    }
    if (this.setstyle === 'green') {
      this.stylegreen = true;
      this.styleblue = false;
      this.stylered = false;
    }
    if (this.setstyle === 'blue') {
      this.stylegreen = false;
      this.styleblue = true;
      this.stylered = false;
    }
    if (this.setstyle === 'red') {
      this.stylegreen = false;
      this.styleblue = false;
      this.stylered = true;
    }
  }
};
</script>

<style lang="less">
//## Gray and brand colors for use across Bootstrap.

//## Gray and brand colors for use across Bootstrap.

@gray-base:              #000;
@gray-darker:            lighten(@gray-base, 13.5%); // #222
@gray-dark:              lighten(@gray-base, 20%);   // #333
@gray:                   lighten(@gray-base, 33.5%); // #555
@gray-light:             lighten(@gray-base, 46.7%); // #777
@gray-lighter:           lighten(@gray-base, 93.5%); // #eee


//==Coloured
//
@cyan:                      #48c5c7;
@red:                      #e10000;
@orange:                   #ffaf00;
@white:                  #fff;
@blue:                    #007bed;
@green:                      #42ca31;



.cyan{color:                    @green; }
.red{ color:                      #e10000;}
.orange{ color:                   #feb028;}
.white{ color:                  #fff;}
.gray{color:#a7a7a7}
.blue{color: @blue;}

a.cyan:hover,a.cyan:visited,a.cyan:link{color: @green;}




//==Fontsize
//
@fz-s:              .833rem;  // 20 px
@fz:                 1rem; // 24 px
@fz-m:            1.16rem; // 28 px
@fz-ml:           1.25rem; // 30 px
@fz-l:              1.333rem; //  32 px
@fz-ll:             1.5rem; //  36px


  //==btn
  .style_green{
    background-color:lighten(@green, 10%);
    color:@white;
    //border: 1px solid @green !important;
    &:active{
          color:@white;
         background:@green;
         border: 1px solid @green;
    }&:focus{
      border: 1px solid @green;
      outline:none;
      color:@white;
    }
  }
  .style_green.shadow{
    -webkit-box-shadow: 0 0.2rem 0.2rem rgba(172,225,161,.75);
  	-moz-box-shadow: 0 0.2rem 0.2rem rgba(172,225,161,.75);
  	box-shadow: 0 0.2rem 0.2rem rgba(172,225,161,.75);
  }
  .style_green.outline{
    border: 1px solid @green;
    color: @green !important;
    background-color: #fff;
    &:active{
         color:@white !important;
         background:@green;
         border: 1px solid @green;
    }&:focus{
      border: 1px solid @green;
      outline:none;
      color:@white;
    }
  }


  //==btn
  .style_blue{
    background-color:lighten(@blue, 10%);
    color:@white;
    //border: 1px solid @blue !important;
    &:active{
         background:@blue;
         border: 1px solid @blue;
    }&:focus{border: 1px solid @blue;outline:none;}
  }
  .style_blue.shadow{
    -webkit-box-shadow: 0 0.2rem 0.2rem rgba(172,199,255,.75);
  	-moz-box-shadow: 0 0.2rem 0.2rem rgba(172,199,255,.75);
  	box-shadow: 0 0.2rem 0.2rem rgba(172,199,255,.75);
  }
  .style_blue.outline{
    border: 1px solid @blue;
    color: @blue !important;
    background-color: #fff;
    &:active{
         color:@white !important;
         background:@blue;
         border: 1px solid @blue;
    }&:focus{
      border: 1px solid @blue;
      outline:none;
      color:@white;
    }
  }

  //==btn
  .style_red{
    background-color:lighten(@red, 10%);
    color:@white;
    //border: 1px solid @red !important;
    &:active{
         background:@red;
         border: 1px solid @red;
    }&:focus{border: 1px solid @red;outline:none;}
  }
  .style_red.shadow{
    -webkit-box-shadow: 0 0.2rem 0.2rem rgba(255,206,177,.75);
  	-moz-box-shadow: 0 0.2rem 0.2rem rgba(255,206,177,.75);
  	box-shadow: 0 0.2rem 0.2rem rgba(255,206,177,.75);
  }
  .style_red.outline{
    border: 1px solid @red;
    color: @red !important;
    background-color: #fff;
    &:active{
         color:@white !important;
         background:@red;
         border: 1px solid @red;
    }&:focus{
      border: 1px solid @red;
      outline:none;
      color:@white;
    }
  }



  .mainbtn{
      text-align: center;
      width: 100%;
      font-weight: bold;
      font-size: @fz;
      display: block;
      min-height: 2.6rem;
  }
  .mainbtn:before{
    vertical-align: middle;
    text-align: center;
  }
  a.mainbtn,a.mainbtn_disable,a.mainbtn_b{  }

  .iconfl:before{
    position: absolute;
    vertical-align: middle;
    text-align: center;
    left: 1rem;
    height:1rem;
    line-height: 1rem;
    top: 50%;
    margin-top:-0.5rem;
  }
  .al-l{
    padding-left:1rem;
    text-align: left;
  }
  .al-r{
    padding-right:1rem;
    text-align: right;
  }
  .iconfr:before{
    position: absolute;
    vertical-align: middle;
    text-align: center;
    right: 1rem;
    height:1rem;
    line-height: 1rem;
    top: 50%;
    margin-top:-0.5rem;
  }


</style>
