import Notification from '../base/notification/index';

const prefixCls = 'ivu-message';
const iconFixCls = 'ivu-icon';
const messageKey = 'ivu_message_key_';
let name = 0;
let defaultDuration = 1.5;
let messageInstance;
let top;
const iconTypes = {
  'success': "checkmark-circled",
  'info': 'information-circled',
  'warning': 'android-alert',
  'error': 'close-circled',
  'loading': 'load-c'
};

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
      prefixCls: prefixCls,
      styles: {
        top: `${top}px`
      }
    });

  return messageInstance;
}

function notice(content, duration = defaultDuration, type, onClose) {
  if(onClose){
    onClose = () => {};
  }
  let iconType = iconTypes[type];
  let loadCls = type === 'loading' ? 'ivu-load-loop' : '';
  let instance = getMessageInstance();

  console.log(instance);
  instance.notice({
    name: `${messageKey}${name}`,
    duration: duration,
    transitionName: 'move-up',
    content: `
      <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
        <i class="${iconFixCls} ${iconFixCls}-${iconType} ${loadCls}"></i>
        <span>${content}</span>
      </div>
    `,
    styles: {},
    onClose: onClose
  });


  /**
   * 手动关闭弹框
   *   调用方法： setTimeout( message, duration);
   * **/
  return (function () {
    let target = name++;

    return function () {
      instance.remove(`${messageKey}${target}`);
    }
  })();
}

export default {
  success(content, duration, onClose){
    return notice(content, duration, 'success', onClose);
  },
  info(content, duration, onClose){
    return notice(content, duration, 'info', onClose);
  },
  warning(content, duration, onClose){
    return notice(content, duration, 'warning', onClose);
  },
  error(content, duration, onClose){
    return notice(content, duration, 'error', onClose);
  },
  loading(content, duration, onClose){
    return notice(content, duration, 'loading', onClose);
  },
  destroy(){
    let instance = messageInstance;
    messageInstance = null;
    instance.destroy();
  },
  config(options){
    if(options.top){
      top = options.top;
    }
    if(options.duration){
      defaultDuration = options.duration;
    }
  },

}
