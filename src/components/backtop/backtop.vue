<template>
  <div :class="classes" :style="styles" @click="back">
    <slot>
      <div :class="innerClass">
        <i class="ivu-icon ivu-icon-chevron-up"></i>
      </div>
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">

  import { scrollTop } from '../../util/assist';
  const prefixCls = 'ivu-backtop';
  export default {
    name: 'BackTop',
    props: {
      height: {
        type: Number,
        default: 300
      },
      bottom: {
        type: Number,
        default: 30
      },
      right: {
        type: Number,
        default: 30
      },
      duration: {
        type: Number,
        default: 1000
      }
    },
    computed: {
      classes(){
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-show`]: this.backTop
          }
        ];
      },
      styles() {
        return {
          right: `${this.right}px`,
          bottom: `${this.bottom}px`
        }
      },
      innerClass() {
        return `${prefixCls}-inner`;
      }
    },
    data(){
      return {
        backTop: false
      };
    },
    methods: {
      handleScroll() {
        this.backTop = window.pageYOffset >= this.height;
      },
      back() {
        /***
         *  el : 滚动元素
         *  from : 起点
         *  end: 终点
         *  duration : 运动时间
         */
        scrollTop(window, document.body.scrollTop, 0, this.duration);
        this.$emit('on-click');
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleScroll, false);
    },
    beforeDefault() {
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('resize', this.handleScroll, false);
    }
  }
</script>

<style>

</style>
