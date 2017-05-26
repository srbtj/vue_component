import Notification from '../base/notification/index';

let prefixCls = 'ivu-message';
let iconPrefix = 'ivu-icon';
let messageKey = 'ivu_message_key_';
let name = 1;
let defaultDuration = 1.5; // 延时
let top; // 顶部距离
let messageInstance; // 消息实例
let transitionName = 'move-up'; // 动画形式

/****
 *  消息图标类型
 * @type {{info: string, success: string, error: string, warning: string, loading: string}}
 */
const iconTypes = {
  info: 'information-circled',
  success: 'checkmark-circled',
  error: 'close-circled',
  warning: 'android-alert',
  loading: 'load-c'
}

/***
 *  获得 通知实例
 * @returns {*|{component, notice, remove, destroy}}
 */
function getMessageInstance() {
  messageInstance = messageInstance || Notification.netInstance({
      prefixCls: prefixCls , // 'ivu-message',
      styles: {
        top: `${top}px`
      }
    });
  return messageInstance;
}

/****
 *   公共消息方法
 * @param content  消息内容
 * @param duration 消息延时
 * @param type     消息类型
 * @param onClose  消息关闭回调
 */
function notice(content, duration = defaultDuration, type, onClose) {
  if (!onClose) {
    onClose = function () {
    };
  }

  let iconType = iconTypes[type];

  let instance = getMessageInstance();

  instance.notice({
    name: `${messageKey}${name}`, // 每条消息标志
    styles: {}, // 消息样式
    duration: duration,  // 延时
    // 消息内容
    content: `
      <div class="${prefixCls}-custom-content ${prefixCls}-${type}">
        <i class="${iconPrefix} ${iconPrefix}-${iconType}"></i>
        <span>${content}</span>
      </div>
    `,
    transitionName: `${transitionName}`,
    onClose: onClose // 关闭回调
  });

  return (function () {
    let target = name++;
    return function () {
      instance.remove(`${messageKey}${target}`);
    }
  })();
}
/***
 *  对外提供的接口
 */
export default {
  /****
   *  成功
   * @param content  消息内容
   * @param duration 延时
   * @param onClose  关闭消息回调
   */
  success(content, duration, onClose){
    notice(content, duration, 'success', onClose)();
  },
  /****
   *  信息
   * @param content  消息内容
   * @param duration 延时
   * @param onClose  关闭消息回调
   */
  info(content, duration, onClose){
    notice(content, duration, 'info', onClose);
  },
  /****
   *  警告
   * @param content  消息内容
   * @param duration 延时
   * @param onClose  关闭消息回调
   */
  warning(content, duration, onClose){
    notice(content, duration, 'warning', onClose);
  },
  /****
   *  错误
   * @param content  消息内容
   * @param duration 延时
   * @param onClose  关闭消息回调
   */
  error(content, duration, onClose){
    notice(content, duration, 'error', onClose);
  },
  /****
   *  加载中...
   * @param content  消息内容
   * @param duration 延时
   * @param onClose  关闭消息回调
   */
  loading(content, duration, onClose){
    notice(content, duration, 'loading', onClose);
  },
  /****
   *  销毁
   */
  destroy(){
    let instance = getMessageInstance();
    messageInstance = null;
    instance.destroy();
  },
  /****
   *  配置
   * @param props
   *    props =>  duration | top
   */
  config(options){
    if (options.top) {
      top = options.top;
    }
    if (options.duration) {
      defaultDuration = options.duration;
    }
  }
}
