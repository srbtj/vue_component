<template>
  <transition :name="transitionName">
    <div :class="classes" :style="styles">
      <div :class="[baseClass + '-content']" ref="content" v-html="content"></div>
      <a :class="[baseClass + '-close']" @click="close" v-if="closable">
        <i class="ivu-icon ivu-icon-ios-close-empty"></i>
      </a>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default{
    name: 'Notice',
    props: {
      prefixCls: {
        type: String,
        default: ''
      },
      duration: {
        type: Number,
        default: 1.5
      },
      content: {
        type: String,
        default: ''
      },
      styles: {
        type: Object,
        default: function () {
          return {
            right: '50%'
          }
        }
      },
      closable: {
        type: Boolean,
        default: false
      },
      className: {
        type: String
      },
      name: {
        type: String,
        required: true
      },
      transitionName: {
        type: String
      },
      onClose: {
        type: Function
      }
    },
    data(){
      return {
        withDesc: false
      };
    },
    computed: {
      baseClass(){
        return `${this.prefixCls}-notice`;
      },
      classes(){
        return [
          this.baseClass,
          {
            [`${this.className}`]: !!this.className,
            [`${this.baseClass}-closable`]: this.closable,
            [`${this.baseClass}-with-desc`]: this.withDesc
          }
        ]
      }
    },
    methods:{
      close(){

      }
    }
  }
</script>

<style>

</style>
