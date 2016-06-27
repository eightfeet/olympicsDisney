<template>
  <div class="modal-mask" v-show="show" transition="modal">
    <div class="modal-wrapper">
      <div class="modal-container pr">
        <div v-show="closeicon" class="modal-close" v-touch:tap="show = false"></div>
        <div class="modal-header">
          <div class="headerO">
            <slot name="header">
              default header
            </slot>
          </div>
        </div>

        <div class="modal-body">
          <slot name="body">
            default body
          </slot>
        </div>
      </div>
      <div class="modal-footer al-c pdt1">
        <slot name="footer">
          <button class="modal-default-button"
            v-touch:tap="show = false">
            确定
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import coerceBoolean from '../utils/coerceBoolean.js';
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    },
    closeicon: {
      type: Boolean,
      coerce: coerceBoolean,
      default: true
    }
  }
};
</script>

<style lang="less" scopes>
.modal-mask {
position: fixed;
z-index: 9998;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, .5);
display: table;
transition: opacity .3s ease;
}
.modal-header{
  height: 9.5rem;
  background:url(../../images/poptitlebg.png) center bottom no-repeat;
  background-size: cover;
  position: relative;
  border-radius: .75rem;
}
.headerO{
  width: 11.042rem;
  height: 11.042rem;
  line-height:7rem;
  position: absolute;
  background-image:url(../../images/mix.png);
  background-repeat: no-repeat;
  background-size: 53.333rem 47.333rem;
  background-position: -5.5rem -1.208rem;
  left: 50%;
  margin-left: -11.042/2rem;
  top: -11.042/2rem;
}
.modal-close{
  background-image:url(../../images/mix.png);
  background-repeat: no-repeat;
  background-size: 53.333rem 47.333rem;
  background-position: -1rem -3.750rem;
 font-size: 1.5rem;
 position: absolute;
 width: 2.5rem;
 height: 2.5rem;
 line-height: 2.5rem;
 text-align: center;
 right: -1rem;
 top:-4.625rem;
}
.modal-close:before{
  vertical-align: middle;
  color:#ccc;
}
.modal-wrapper {
position: relative;
display: table-cell;
vertical-align: middle;
}

.modal-container {
width:88%;
max-width: 20rem;
margin: 0px auto;
background-color: #fff;
border-radius: .75rem;
box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
transition: all .3s ease;
font-family: Helvetica, Arial, sans-serif;
}

.modal-body {
margin: .8rem auto;
width: 96%;
}

.modal-default-button, button.modal-default-button:active, button.modal-default-button:focus {
background-image: url(../../images/mix.png);
width:17.167rem;
background-size: 53.333rem 47.333rem;
background-position:-1rem -41.333rem;
height: 4rem;
background-color: transparent;
font-size:1.2rem;
font-weight: bold;
color:#ff4b06;
box-shadow: none;
}

/*
* the following styles are auto-applied to elements with
* v-transition="modal" when their visiblity is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter, .modal-leave {
opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
-webkit-transform: scale(1.1);
transform: scale(1.1);
}
</style>
