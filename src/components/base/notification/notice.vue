<template>
  <transition :name="transitionName">
    <div :class="classes" :style="styles">
      <!-- 显示内容 -->
      <div :class="[baseClass + '-content']" ref="content" v-html="content"></div>
      <!-- 关闭按钮 -->
      <a :class="[baseClass + '-close']" @click="close" v-if="closable">
        <i class="ivu-icon ivu-icon-ios-close-empty"></i>
      </a>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  export default {
    name: 'Notice',
    props: {
      prefixCls: {
        type: String,
        default: ''
      },
      transitionName: {
        type: String
      },
      name: {  // 每个 notice 的标志
        type: String,
        required: true
      },
      className: {
        type: String,
        default: ''
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
      duration: {
        type: Number,
        default: 1.5
      },
      onClose: {
        type: Function
      },
      closable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      baseClass(){
        return `${this.prefixCls}-notice`;
      },
      classes() {
        return [
          this.baseClass,
          {
            [`${this.className}`]: !!this.className
          }
        ]
      }
    },
    data() {
      return {
        withDesc: false
      }
    },
    methods: {
      clearCloseTimer() {
        if(this.closeTimer){
          clearTimeout(this.closeTimer);
          this.closeTimer = null;
        }
      },
      close() {
        this.clearCloseTimer();

        this.$parent.close(this.name);
      }
    },
    mounted() {
      this.clearCloseTimer();
      // 隔多少秒关闭通知
      if(this.duration !== 0){
        let root = this;
        this.closeTimer = setTimeout(function () {
          root.close();
        }, this.duration * 1000);
      }
    },
    beforeDestroy() {
      this.clearCloseTimer();
    }
  }
</script>

<style>

</style>
