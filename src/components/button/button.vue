<template>
  <button :type="htmlType" :class="classes" :disabled="disabled" @click="handleClick">
    <span v-if="showSlot" ref="slot"><slot></slot></span>
  </button>
</template>

<script type="text/ecmascript-6">

  import {oneOf} from '../../util/assist';
  const prefixCls = 'ivu-btn';
  export default{
    name: 'iButton',
    props: {
      type: {
        validator(value){
          return oneOf(value, ['primary', 'success', 'info', 'warning', 'error', 'ghost', 'dashed', 'text'])
        }
      },
      shape: {
        validator(value){
          return oneOf(value, ['circle', 'circle-outline'])
        }
      },
      loading: Boolean,
      disabled: Boolean,
      long: {
        type: Boolean,
        default: false
      },
      htmlType: {
        default: 'button',
        validator(value){
          return oneOf(value, ['button', 'submit', 'reset'])
        }
      }
    },
    data(){
      return {
        showSlot: true
      }
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      }
    },
    computed: {
      classes(){
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-long`]: !!this.long,
            [`${prefixCls}-${this.shape}`]: !!this.shape,
            [`${prefixCls}-${this.size}`]: !!this.size,
            [`${prefixCls}-loading`]: !!this.loading,
            [`${prefixCls}-icon-only`]: !this.showSlot && (!!this.icon || this.loading) // 只显示图片
          }
        ];
      },
      styles(){
        return [];
      }
    },
    mounted(){
      this.showSlot = this.$slots.default !== undefined;
    }
  }
</script>

<style>

</style>
