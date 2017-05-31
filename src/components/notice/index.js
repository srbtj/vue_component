import Notification from '../base/notification/index';

const prefixCls = 'ivu-notice';
const iconPrefixCls = 'ivu-icon';
const noticeKey = 'ivu_notice_key_';
const now = Date.now();
let top;
let name = 0;
let noticeInstance;
let defaultDuration = 1.5;

const iconTypes = {
  'info': 'information-circled',
  'success': 'checkmark-circled',
  'error': 'close-circled',
  'warning': 'android-alert'
}

function getUuid() {
  return `${prefixCls}${name}`;
}

function getNoticeInstance() {
  noticeInstance = noticeInstance || Notification.newInstance({
      prefixCls: prefixCls,
      styles: {
        top: `${top}px`,
        right: 0
      }
    });

  return noticeInstance;
}

function notice(type, options) {
  // 标题
  const title = options.title || '';
  // 描述信息
  const desc = options.desc || '';
  // 唯一标志符
  const keys = options.name || getUuid();
  // 是否有关闭函数
  const onClose = options.onClose || function () {};
  // 是否有延时
  const duration = (options.duration === 0) ? 0 : options.duration || defaultDuration;

  // 获取实例
  const instance = getNoticeInstance();

  let content;

  const with_desc = !desc ? '' : `${prefixCls}-with-desc`;

  if(type === 'normal'){
    content = `
      <div class="${prefixCls}-custom-content ${prefixCls}-with-normal ${with_desc}">
        <div class="${prefixCls}-title">${title}</div>
        <div class="${prefixCls}-desc">${desc}</div>
      </div>
    `;
  }else{
    const iconType = iconTypes[type];
    content = `
      <div class="${prefixCls}-custom-content ${prefixCls}-with-icon ${prefixCls}-with-${type}">
        <span class="${prefixCls}-icon ${prefixCls}-icon-${type}">
           <i class="${iconPrefixCls} ${iconPrefixCls}-${iconType}"></i>
        </span>
        <div class="${prefixCls}-title">${title}</div>
        <div class="${prefixCls}-desc">${desc}</div>
      </div>
    `;
  }


  instance.notice({
    name: keys.toString(),
    styles: {},
    duration: duration,
    transitionName: 'move-notice',
    content: content,
    onClose: onClose,
    closable: true
  });
}
export default {

  open(options){
    return notice('normal', options);
  },
  info(options){
    return notice('info', options);
  },
  success(options){
    return notice('success', options);
  },
  error(options){
    return notice('error', options);
  },
  warning(options){
    return notice('warning', options);
  },
  config(options){
    if(options.top){
      top = options.top;
    }
    if(options.duration || options.duration === 0){
      defaultDuration = options.duration;
    }
  },
  close(name) {
    if(name){
      name = name.toString();
      if(noticeInstance){
        noticeInstance.remove(name);
      }else{
        return false;
      }
    }
  },
  destroy() {
    let instance = noticeInstance;
    noticeInstance = null;
    instance.destroy();
  }
};
