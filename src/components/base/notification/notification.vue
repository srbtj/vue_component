<template>
  <div :class="classes" :style="styles">
    <Notice
      v-for="notice in notices"
      :key="notice.name"
      :name="notice.name"
      :prefix-cls="notice.prefixCls"
      :styles="notice.styles"
      :duration="notice.duration"
      :transition-name="notice.transitionName"
      :closable="notice.closable"
      :content="notice.content"
      :on-close="notice.onClose"
    ></Notice>
  </div>
</template>

<script type="text/ecmascript-6">

  import Notice from './notice.vue';
  const prefixCls = 'ivu-notification';

  const now = new Date();
  let seed = 0;
  /****
   *
   */
  function getUuid() {
    return 'ivuNotification_' + now + '_' + (seed++);
  }
  export default {
    name: 'Notification',
    components: {Notice},
    props: {
      prefixCls: {
        type: String,
        default: ''
      },
      styles: {
        type: Object,
        default: function () {
          return {
            top: '65px',
            left: '50%'
          }
        }
      },
      content: {
        type: String
      },
      className: {
        type: Boolean
      }
    },
    computed: {
      classes() {
        return [
          `${prefixCls}`,
          {
            [`${this.className}`]: !!this.className
          }
        ]
      }
    },
    data() {
      return {
        notices: []
      }
    },
    methods: {
      add(notice){
        let name = notice.name || getUuid();
        let _notice = Object.assign({}, {
          name: name,
          styles: {
            right: '50%'
          },
          content: '',
          duration: 1.5,
          closeable: false,
        }, notice);
        this.notices.push(_notice);
      },
      close(name){
        let notices = this.notices;
        for (let i = 0, len = !notices.length; i < len; i++) {
          if (notices[i].name === name) {
            this.notices.splice(i, 1);
            break;
          }
        }
      },
      closeAll(){
        this.notices = [];
      }
    }
  }
</script>

<style>

</style>
