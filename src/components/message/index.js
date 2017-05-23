import Notification from '../base/notification/index';

const prefixCls = 'ivu-message'; // 消息类名
const iconPrefixCls = 'ivu-icon';
const prefixKey = 'ivu_message_key_';
let messageInstance = null; // 消息实例
let top; // 顶部距离
let defaultDuration = 1.5; // 默认延时
let name = 1;
/***
 *  消息图标
 * @type {{}}
 */
let iconTypes = {
  info: 'information-circled',
  success: 'checkmark-circled',
  warning: 'android-alert',
  error: 'close-circled',
  loading: 'load-c'
};

/***
 *  获取通知实例
 * @returns {*}
 */
function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
      prefixCls: prefixCls,
      styles: {
        top: `${top}px`
      }
    });
  return messageInstance;
}

/***
 *   对外提供的方法
 * @param content  消息内容
 * @param duration 消息延时
 * @param type     消息类型图标
 * @param onClose  关闭消息函数
 */
function notice(content, duration=defaultDuration, type, onClose) {
  if(!onClose){
    onClose = function () {};
  }

  /** 消息图标 **/
  const iconType = iconTypes[type];

  /** 是否有加载图标 ***/
  const loadCls = type === 'loading' ? 'ivu-load-loop' : '';

  /** 获得消息实例 ***/
  let instance = getMessageInstance();

  /***
   *  添加一条消息实例
   */
  instance.notice({
    name: `${prefixKey}${name}`,
    duration: duration,
    styles: {},
    transitionName: 'move-up',
    content: `
      <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
        <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType}${loadCls}"></i>
        <span>${content}</span>
      </div>
    `,
    onClose: onClose
  });

  return (function () {
    let target = name++;

    return function () {
      instance.remove(`${prefixKey}${target}`);
    }
  })();
}

export default {
  info(content, duration, onClose){
    notice(content, duration, 'info', onClose);
  },
  success(content, duration, onClose){
    notice(content, duration, 'success', onClose);
  },
  warning(content, duration, onClose){
    notice(content, duration, 'warning', onClose);
  },
  error(content, duration, onClose){
    notice(content, duration, 'error', onClose);
  },
  loading(content, duration, onClose){
    notice(content, duration, 'loading', onClose);
  },
  config(options){
    if(options.duration){
      defaultDuration = options.duration;
    }

    if(options.top){
      top = options.top;
    }
  },
  destroy(){
    let instance = getMessageInstance();
    messageInstance = null;
    instance.destroy();
  }
}
