<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import { oneOf } from '../../util/assist';
  const prefixCls = 'ivu-row';
  export default{
    name: 'Row',
    props: {
      type: {
        validator(value){ // 行排列方式
          return oneOf(value, ['flex']);
        }
      },
      justify: { // 弹性而已  主轴对齐方式
        validator(value) {
          return oneOf(value,['start','center','end','space-between','space-around'])
        }
      },
      align: { // 侧轴对齐方式
        validator(value){
          return oneOf(value,['top','middle','bottom'])
        }
      },
      gutter: {
        type: Number,
        default: 0
      },
      className: String
    },
    computed: {
      classes(){
        return [
          {
            [`${prefixCls}`]: !this.type,
            [`${prefixCls}-${this.type}`]: !!this.type,
            [`${prefixCls}-${this.type}-${this.justify}`]: !!this.justify,
            [`${prefixCls}-${this.type}-${this.align}`]: !!this.align,
            [`${this.className}`]: !!this.className
          }
        ]
      },
      styles(){
        let style = {};
        if(this.gutter !== 0){
          style = {
            marginLeft: this.gutter / -2 + 'px',
            marginRight: this.gutter / -2 + 'px'
          };
        }
        return style;
      }
    },
    methods: {
      updateGutter(value){
        this.$children.forEach( (child) => {
          if(value !== 0){
            child.gutter = value;
          }
        });
      }
    },
    watch: {
      gutter(value){
        this.updateGutter(value);
      }
    },
    mounted() {
      this.updateGutter(this.gutter);
    }
  }
</script>

<style lang="less">

</style>
