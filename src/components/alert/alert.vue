<template>
  <transition name="fade">
    <div :class="wrapClasses" v-if="!closed">
      <span :classes="iconClasses" v-if="showIcon">
        <slot name="icon">
          <Icon :type="iconType"></Icon>
        </slot>
      </span>
      <span :class="messageClasses"><slot></slot></span>
      <span :class="descClasses"><slot name="desc"></slot></span>
      <a :class="closeClasses" v-if="closeable" @click="close">
        <slot name="close">
          <Icon type="ios-close-empty"></Icon>
        </slot>
      </a>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import {Icon} from '../icon';
  import {oneOf} from '../../util/assist';
  const prefixCls = 'ivu-alert';
  export default{
    name: 'Alert',
    props: {
      type: {
        validator(value){
          return oneOf(value, ['success', 'info', 'warning', 'error']);
        },
        default: 'info'
      },
      showIcon: {
        type: Boolean,
        default: false
      },
      closeable: {
        type: Boolean,
        default: false
      },
      /***
       *  顶部公告
       */
      banner: {
        type: Boolean,
        default: false
      }
    },
    components: {
      Icon
    },
    data(){
      return {
        closed: false,
        desc: false
      }
    },
    computed: {
      wrapClasses(){
        return [
          `${prefixCls}`,
          `${prefixCls}-${this.type}`,
          {
            [`${prefixCls}-with-icon`]: this.showIcon,
            [`${prefixCls}-with-desc`]: this.desc,
            [`${prefixCls}-with-banner`]: this.banner
          }
        ];
      },
      iconClasses(){
        return `${prefixCls}-icon`;
      },
      messageClasses(){
        return `${prefixCls}-message`;
      },
      descClasses(){
        return `${prefixCls}-desc`;
      },
      closeClasses(){
        return `${prefixCls}-close`;
      },
      iconType(){
        let type = '';

        switch (this.type) {
          case 'success':
            type = 'success-circled';
            break;
          case 'info':
            type = 'info-circled';
            break;
          case 'warning':
            type = 'warning-circled';
            break;
          case 'error':
            type = 'error-circled';
            break;
        }
        return type;
      }
    },
    methods: {
      close(event){
        this.closed = true;
        this.$emit('onClose', event);
      }
    },
    mounted(){
      this.desc = this.$slots.desc !== undefined;
    }
  }
</script>

<style>

</style>
