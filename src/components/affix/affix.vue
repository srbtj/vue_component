<template>
  <div>
    <div :class="classes" :style="styles">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const prefixCls = 'ivu-affix';

  /***
   *  获取滚动距离
   * @param target
   * @param top
   * @returns {*}
   */
  function getScroll(target, top) {

    let prop = top ? 'pageYOffset' : 'pageXOffset'; // 设置或返回当前页面相对于窗口显示区右上角 x或y 位置;
    let method = top ? 'scrollTop' : 'scrollLeft';

    let result = target[prop];

    if (typeof result !== 'number') {

      result = window.document.documentElement[method];
    }

    return result;
  }

  /***
   *  获取元素相对于页面的位置
   * @param element
   * @returns {{top: string, left: string}}
   */
  function getOffset(element) {

    let rect = element.getBoundingClientRect();

    /** 获取滚动位置 **/
    let scrollTop = getScroll(window, true);
    let scrollLeft = getScroll(window);

    /** 获取 文档 边框 **/
    let docEl = window.document.body;
    let clientTop = docEl.clientTop || 0;
    let clientLeft = docEl.clientLeft || 0;

    return {
      top: rect.top + scrollTop - clientTop,
      left: rect.left + scrollLeft - clientLeft
    };
  }

  export default {
    name: 'Affix',
    props: {
      offsetTop: {
        type: Number,
        default: 0
      },
      offsetBottom: {
        type: 0
      }
    },
    data(){
      return {
        affix: false,
        styles: {}
      };
    },
    computed: {
      classes(){
        return [{
          [`${prefixCls}`]: this.affix
        }];
      },
      offsetType() {
        let type = 'top';
        if (this.offsetBottom > 0) {
          type = 'bottom';
        }
        return type;
      }
    },
    methods: {
      handleScroll() {
        let affix = this.affix;
        let scrollTop = getScroll(window, true); // 滚动距离
        let elOffset = getOffset(this.$el); // 元素位置信息
        let windowHeight = window.innerHeight; // 屏幕高度
        let elHeight = this.$el.querySelectorAll('div')[0].offsetHeight; //元素高度

        /*** 固定顶部 **/
        if ((elOffset.top - this.offsetTop) < scrollTop && this.offsetType == 'top' && !affix) {
          this.affix = true;
          this.styles = {
            left: `${elOffset.left}px`,
            top: `${this.offsetTop}px`,
            width: `${this.$el.offsetWidth}px`
          }
          this.$emit('on-change', true);
        } else if ((elOffset.top - this.offsetTop) > scrollTop && this.offsetType == 'top' && affix) {
          this.affix = false;
          this.styles = {};

          this.$emit('on-change', false);
        }

        /*** 固定底部 **/
        if ((elOffset.top + this.offsetBottom + elHeight) > (scrollTop + windowHeight) && this.offsetType == 'bottom' && !affix) {
          this.affix = true;
          this.styles = {
            left: `${elOffset.left}px`,
            bottom: `${this.offsetBottom}px`,
            width: `${this.$el.offsetWidth}px`
          }

          this.$emit('on-change', true);
        }else if( (elOffset.top + this.offsetBottom + elHeight) < (scrollTop + windowHeight) && this.offsetType == 'bottom' && affix){
          this.affix = false;
          this.styles = null;

          this.$emit('on-change', false);
        }
      }
    },
    mounted(){
      window.addEventListener('scroll', this.handleScroll, false);
      window.addEventListener('resize', this.handleScroll, false);
    },
    beforeDestroy(){
      window.removeEventListener('scroll', this.handleScroll, false);
      window.removeEventListener('resize', this.handleScroll, false);
    }
  }
</script>

<style>

</style>
