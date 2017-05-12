<template>
  <i :class="classes" :style="styles"></i>
</template>

<script type="text/ecmascript-6">

  const prefixCls = 'ivu-icon';
  export default{
    name: 'Icon',
    props: {
      type: String, // icon 类型
      color: String,  // 颜色
      size: [Number, String], // 字体大小
      distance: [Number, String] // 左右间距
    },
    computed: {
      classes() {
        return `${prefixCls} ${prefixCls}-${this.type}`;
      },
      styles(){
        let style = {};

        if(this.size){
          style['font-size'] = `${this.size}`;
        }

        if(this.color){
          style['color'] = `${this.color}`;
        }

        if(this.distance){
          style['padding'] = '0 ' + `${this.distance}`
        }
        return style;
      }
    }
  }
</script>

<style>

</style>
