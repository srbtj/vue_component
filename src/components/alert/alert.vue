<template>
  <transition name="fade">
    <div :class="wrapClasses" v-if="!closed">
      <!-- alert 图标 -->
      <span :class="iconClasses" v-if="showIcon">
      <slot name="icon">
        <Icon :type="iconType"></Icon>
      </slot>
    </span>
      <!-- alert 消息 -->
      <span :class="messageClasses"><slot></slot></span>
      <!-- alert 消息描述 -->
      <span :class="descClasses"><slot name="desc"></slot></span>
      <!-- alert 关闭框 -->
      <a :class="closeClasses" v-if="closable" @click="close">
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
    components: {
      Icon
    },
    props: {
      type: {
        validator(value){
          return oneOf(value, ['info', 'success', 'warning', 'error']);
        },
        default: 'info'
      },
      /***
       *  是否显示图片
       */
      showIcon: {
        type: Boolean,
        default: false
      },
      /**
       *  是否关闭 alert
       */
      closable: {
        type: Boolean,
        default: false
      },
      /**
       *  是否顶部显示
       */
      banner: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        closed: false,
        desc: false
      }
    },
    computed: {
      wrapClasses() {
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
      messageClasses(){
        return `${prefixCls}-message`;
      },
      descClasses(){
        return `${prefixCls}-desc`;
      },
      closeClasses(){
        return  `${prefixCls}-close`;
      },
      iconClasses(){
        return `${prefixCls}-icon`
      },
      iconType(){
        let iconType = '';
        switch (this.type) {
          case 'info':
            iconType = 'information-circled';
            break;
          case 'success':
            iconType = 'checkmark-circled';
            break;
          case 'warning':
            iconType = 'android-alert';
            break;
          case 'error':
            iconType = 'close-circled';
            break;
        }
        return iconType;
      }
    },
    methods:{
      close(e){
        this.closed = true;
        this.$emit('onClose',e);
      }
    },
    mounted(){
      this.desc = this.$slots.desc !== undefined;
    }
  }
</script>

<style>

</style>
