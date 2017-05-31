<template>
  <div :class="classes" :style="styles">
    <Notice
      v-for="notice in notices"
      :key="notice.name"
      :name="notice.name"
      :prefix-cls="prefixCls"
      :content="notice.content"
      :styles="notice.styles"
      :duration="notice.duration"
      :transition-name="notice.transitionName"
      :onClose="notice.onClose"
      :closable="notice.closable"
    >
    </Notice>
  </div>
</template>

<script type="text/ecmascript-6">

  import Notice from './notice.vue';
  const prefixCls = 'ivu-notification';

  const now = Date.now();
  let seed = 0;
  // 获得 通知唯一标志符
  function getUuid() {
    return 'ivuNotification_' + now + '_' + (seed++);
  }
  export default {
    name: 'Notification',
    components: {Notice},
    props: {
      prefixCls: {
        type: String,
        default: prefixCls
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
      className: {
        type: String
      }
    },
    computed: {
      classes() {
        return [
          `${this.prefixCls}`,
          {
            [`${this.className}`]: !!this.className
          }
        ];
      }
    },
    data() {
      return {
        notices: []
      };
    },
    methods: {
      add(noticeOpts){
        let name = noticeOpts.name || getUuid();

        var _notice = Object.assign({}, {
          name: name,
          duration: 1.5,
          styles: {
            right: '50%'
          },
          content: '',
          closable: false,
          onClose: function () {
          }
        }, noticeOpts);

        this.notices.push(_notice);
      },
      close(name){
        let notices = this.notices;
        for (let i = 0, len = notices.length; i < len; i++) {
          if (notices[i].name === name) {
            this.notices.splice(i, 1);
            break;
          }
        }
      },
      closeAll() {
        this.notices = [];
      }
    }
  }
</script>

<style>

</style>
